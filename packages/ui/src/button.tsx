"use client";

import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  style?: CSSProperties;
}

export const Button = ({ 
  children, 
  className = "", 
  appName, 
  type = "button",
  disabled = false,
  onClick,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  style
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (appName) {
      alert(`Hello from your ${appName} app!`);
    }
  };

  const baseStyles: CSSProperties = {
    fontWeight: 600,
    borderRadius: '0.5rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    fontSize: '1rem',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    opacity: disabled ? 0.7 : 1,
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  };

  // Size variations
  const sizeStyles: Record<string, CSSProperties> = {
    small: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    large: { padding: '1rem 2rem', fontSize: '1.125rem' }
  };

  // Variant styles
  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: 'white'
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6'
    },
    danger: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    success: {
      backgroundColor: '#10b981',
      color: 'white'
    }
  };
  // Hover styles for inline variant styles
  // Using a separate object because we can't use pseudo-selectors in inline styles
  const hoverVariantStyles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: '#2563eb'
    },
    secondary: {
      backgroundColor: '#4b5563'
    },
    outline: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    },
    danger: {
      backgroundColor: '#dc2626'
    },
    success: {
      backgroundColor: '#059669'
    }
  };
  // Combined styles
  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant]
  };

  // For hover effects, using className instead of inline styles
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'outline': return 'btn-outline';
      case 'danger': return 'btn-danger';
      case 'success': return 'btn-success';
      default: return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'btn-small';
      case 'medium': return 'btn-medium';
      case 'large': return 'btn-large';
      default: return 'btn-medium';
    }
  };

  const buttonClasses = [
    'custom-button',
    getVariantClass(),
    getSizeClass(),
    fullWidth ? 'btn-full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      <button
        type={type}
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled}
        style={combinedStyles}
      >
        {children}
      </button>
      
      <style>{`
        .custom-button {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          outline: none;
        }
        
        .custom-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:hover:not(:disabled) {
          background-color: #2563eb !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
        }
        
        .btn-secondary:hover:not(:disabled) {
          background-color: #4b5563 !important;
          transform: translateY(-2px);
        }
        
        .btn-outline:hover:not(:disabled) {
          background-color: rgba(59, 130, 246, 0.1) !important;
        }
        
        .btn-danger:hover:not(:disabled) {
          background-color: #dc2626 !important;
          transform: translateY(-2px);
        }
        
        .btn-success:hover:not(:disabled) {
          background-color: #059669 !important;
          transform: translateY(-2px);
        }
        
        .custom-button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .btn-full-width {
          width: 100%;
        }
      `}</style>
    </>
  );
};
