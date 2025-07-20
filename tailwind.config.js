/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-600
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // slate-800
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-600
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-50
          foreground: 'var(--color-secondary-foreground)' // slate-800
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-50
          foreground: 'var(--color-muted-foreground)' // slate-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // amber-500
          foreground: 'var(--color-accent-foreground)' // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-800
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-800
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-600
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)' // white
        },
        trust: {
          DEFAULT: 'var(--color-trust)', // indigo-500
          foreground: 'var(--color-trust-foreground)' // white
        },
        surface: 'var(--color-surface)', // slate-50
        'text-secondary': 'var(--color-text-secondary)', // slate-500
        conversion: {
          DEFAULT: 'var(--color-conversion)', // red-600
          foreground: 'var(--color-conversion-foreground)' // white
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        headline: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        cta: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'value-prop': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'cta': ['16px', { lineHeight: '1.5', fontWeight: '600' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      gridTemplateColumns: {
        'golden': '1.618fr 1fr',
        'hero': '60% 40%',
        'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))',
        'responsive-cards': 'repeat(auto-fit, minmax(280px, 1fr))'
      },
      animation: {
        'commerce-pulse': 'commerce-pulse 2s infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        'commerce-pulse': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      boxShadow: {
        'commerce-card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'commerce-modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'commerce-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'commerce-button': '0 8px 25px rgba(37, 99, 235, 0.15)'
      },
      backdropBlur: {
        'commerce': '8px'
      },
      transitionTimingFunction: {
        'commerce': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      zIndex: {
        'header': '50',
        'sidebar': '40',
        'modal': '60',
        'toast': '70'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}