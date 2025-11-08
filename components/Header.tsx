import React from 'react';
import { SoundWaveIcon } from './icons/SoundWaveIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/70 dark:bg-slate-800/70 shadow-sm sticky top-0 z-10 backdrop-blur-lg border-b border-slate-900/10 dark:border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <SoundWaveIcon className="w-7 h-7 text-blue-500" />
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight">
            AI Voice Generator
          </h1>
        </div>
      </div>
    </header>
  );
};