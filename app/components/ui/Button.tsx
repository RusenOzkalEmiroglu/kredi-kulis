'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ===== Button Component Types =====
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

// ===== Button Component =====
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    
    // Base classes for all buttons
    const baseClasses = cn(
      // Layout & Display
      'inline-flex items-center justify-center gap-2',
      'relative overflow-hidden',
      
      // Typography
      'font-medium text-center',
      'whitespace-nowrap',
      
      // Borders & Radius
      'border border-transparent rounded-lg',
      
      // Transitions & Animations
      'transition-all duration-200 ease-out',
      'transform-gpu',
      
      // Focus & Accessibility
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      
      // Touch & Interaction
      'touch-manipulation select-none',
      'active:scale-95',
      
      // Full width option
      fullWidth && 'w-full'
    );
    
    // Variant-specific styles
    const variantClasses = {
      primary: cn(
        'bg-primary text-white shadow-sm',
        'hover:bg-primary-dark hover:shadow-md',
        'focus:ring-primary/50',
        'disabled:bg-gray-300 disabled:text-gray-500'
      ),
      secondary: cn(
        'bg-secondary text-white shadow-sm',
        'hover:bg-blue-600 hover:shadow-md',
        'focus:ring-secondary/50',
        'disabled:bg-gray-300 disabled:text-gray-500'
      ),
      ghost: cn(
        'bg-transparent text-primary border-primary',
        'hover:bg-primary hover:text-white hover:shadow-sm',
        'focus:ring-primary/50',
        'disabled:border-gray-300 disabled:text-gray-400'
      ),
      danger: cn(
        'bg-danger text-white shadow-sm',
        'hover:bg-red-600 hover:shadow-md',
        'focus:ring-danger/50',
        'disabled:bg-gray-300 disabled:text-gray-500'
      ),
      success: cn(
        'bg-success text-white shadow-sm',
        'hover:bg-green-600 hover:shadow-md',
        'focus:ring-success/50',
        'disabled:bg-gray-300 disabled:text-gray-500'
      )
    };
    
    // Size-specific styles
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[40px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]',
      xl: 'px-8 py-4 text-xl min-h-[56px]'
    };
    
    // Loading spinner component
    const LoadingSpinner = () => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
      </motion.div>
    );
    
    // Render icon with proper positioning
    const renderIcon = () => {
      if (loading) return <LoadingSpinner />;
      if (!icon) return null;
      
      return (
        <span className={cn(
          'flex items-center',
          iconPosition === 'right' && 'order-1'
        )}>
          {icon}
        </span>
      );
    };
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...props}
      >
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        
        {/* Button content */}
        {renderIcon()}
        
        <span className={cn(
          'flex items-center',
          loading && 'opacity-0'
        )}>
          {children}
        </span>
        
        {iconPosition === 'right' && renderIcon()}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps };
