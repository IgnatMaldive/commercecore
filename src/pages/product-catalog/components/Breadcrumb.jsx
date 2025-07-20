import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <Link 
        to="/homepage" 
        className="hover:text-foreground commerce-transition flex items-center"
      >
        <Icon name="Home" size={16} className="mr-1" />
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Icon name="ChevronRight" size={14} className="text-border" />
          {item.href ? (
            <Link 
              to={item.href} 
              className="hover:text-foreground commerce-transition"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;