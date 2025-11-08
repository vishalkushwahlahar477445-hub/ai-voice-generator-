import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => (
  <select
    {...props}
    className={`block w-full pl-3 pr-10 py-2.5 text-base border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 ${className || ''}`}
  >
    {children}
  </select>
);

type OptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;
export const Option: React.FC<OptionProps> = ({ children, ...props }) => (
  <option {...props} className="dark:bg-slate-800">{children}</option>
);