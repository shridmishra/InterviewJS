import React from 'react';

const buttonVariants = {
  variant: {
    default: 'bg-yellow-500 text-black hover:bg-yellow-500/90',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50',
  },
  size: {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 rounded-md px-3',
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none ${buttonVariants.variant[variant]} ${buttonVariants.size[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;