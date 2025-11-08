import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full">
      <div className="container mx-auto px-4 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} AI Voice Generator. All rights reserved.</p>
        <p className="mt-1">Powered by Google Gemini</p>
      </div>
    </footer>
  );
};