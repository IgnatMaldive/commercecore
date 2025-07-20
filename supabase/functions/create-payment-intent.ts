import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: corsHeaders
        });
    }

    try {
        // Get the authorization token from the request headers
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            throw new Error('Missing Authorization header');
        }

        // Extract the token from the Authorization header
        const token = authHeader.replace('Bearer ', '');

        // Create a Supabase client
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');
        const supabase = createClient(supabaseUrl, supabaseKey, {
            global: { headers: { Authorization: authHeader } }
        });

        // Create a Stripe client
        const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
        const stripe = new Stripe(stripeKey);

        // Get the request body
        const requestData = await req.json();
        const { cartItems, shippingInfo, subtotal, shipping, tax, total } = requestData;

        // Validate input data
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            throw new Error('Cart is empty or invalid');
        }
        if (!shippingInfo) {
            throw new Error('Shipping information is required');
        }
        if (typeof subtotal !== 'number' || typeof shipping !== 'number' || typeof tax !== 'number' || typeof total !== 'number') {
            throw new Error('Invalid price calculations');
        }

        // Get user information from the JWT token if authenticated
        const { data: { user }, error: userError } = await supabase.auth.getUser(token);
        if (userError) {
            console.log('Error getting user:', userError.message);
        }

        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100),
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            description: 'CommerceCore Purchase',
            statement_descriptor: 'CommerceCore',
            metadata: {
                user_id: user?.id || 'anonymous',
                order_details: JSON.stringify({
                    items: cartItems.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    }))
                })
            }
        });

        // Create order in the database
        const { data: order, error } = await supabase.from('orders').insert({
            user_id: user?.id,
            payment_intent_id: paymentIntent.id,
            payment_status: 'pending',
            status: 'pending',
            subtotal: subtotal,
            shipping_cost: shipping,
            tax_amount: tax,
            total_amount: total,
            shipping_address: shippingInfo,
            created_at: new Date().toISOString()
        }).select();

        if (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }

        // Insert order items
        if (order && order.length > 0) {
            const orderId = order[0].id;
            const orderItems = cartItems.map((item) => ({
                order_id: orderId,
                product_id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
            const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
            if (itemsError) {
                throw new Error(`Error creating order items: ${itemsError.message}`);
            }
        }

        // Return the payment intent client secret
        return new Response(JSON.stringify({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            orderId: order && order.length > 0 ? order[0].id : null
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message
        }), {
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json'
            },
            status: 400
        });
    }
});