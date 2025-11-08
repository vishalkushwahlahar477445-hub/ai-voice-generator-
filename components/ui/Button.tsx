import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-100 ${className || ''}`}
    >
      {children}
    </button>
  );
};