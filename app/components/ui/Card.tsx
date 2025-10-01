'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===== Card Component Types =====
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
  children: React.ReactNode;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// ===== Card Component =====
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    hover = false,
    interactive = false,
    className,
    children,
    onClick,
    ...props
  }, ref) => {
    
    // Base classes for all cards
    const baseClasses = cn(
      // Layout & Display
      'relative overflow-hidden',
      
      // Borders & Radius
      'rounded-xl',
      
      // Transitions
      'transition-all duration-300 ease-out',
      'transform-gpu',
      
      // Interactive states
      interactive && 'cursor-pointer',
      onClick && 'cursor-pointer'
    );
    
    // Variant-specific styles
    const variantClasses = {
      default: cn(
        'bg-white border border-gray-200',
        hover && 'hover:shadow-md hover:border-gray-300'
      ),
      elevated: cn(
        'bg-white shadow-md',
        hover && 'hover:shadow-xl hover:-translate-y-1'
      ),
      outlined: cn(
        'bg-transparent border-2 border-primary',
        hover && 'hover:bg-primary/5 hover:border-primary-dark'
      ),
      gradient: cn(
        'bg-gradient-to-br from-primary to-secondary text-white',
        hover && 'hover:from-primary-dark hover:to-blue-600'
      ),
      glass: cn(
        'glass-effect text-gray-900',
        hover && 'hover:backdrop-blur-md'
      )
    };
    
    // Padding classes
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10'
    };
    
    // Animation variants for motion
    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: hover ? { 
        y: -4, 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      } : {},
      tap: interactive ? { scale: 0.98 } : {}
    };
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={onClick}
        {...props}
      >
        {/* Shimmer effect for interactive cards */}
        {(interactive || onClick) && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
        
        {children}
      </motion.div>
    );
  }
);

// ===== Card Header Component =====
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 pb-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

// ===== Card Content Component =====
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1', className)}
      {...props}
    >
      {children}
    </div>
  )
);

// ===== Card Footer Component =====
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between pt-4 mt-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

// ===== Card Title Component =====
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-none tracking-tight',
        'text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

// ===== Card Description Component =====
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'text-sm text-gray-600 leading-relaxed',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);

// Set display names
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
};

export type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps
};
