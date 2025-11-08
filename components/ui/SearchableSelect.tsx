import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ChevronUpDownIcon } from '../icons/ChevronUpDownIcon';
import { MagnifyingGlassIcon } from '../icons/MagnifyingGlassIcon';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  id?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({ id, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setSearchTerm('');
  });
  
  useEffect(() => {
    if (isOpen) {
        inputRef.current?.focus();
    }
  }, [isOpen]);

  const selectedOption = useMemo(() => options.find(option => option.value === value), [options, value]);

  const filteredOptions = useMemo(() =>
    options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ), [options, searchTerm]
  );

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full pl-3 pr-10 py-2.5 text-base border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 text-left"
      >
        <span className="block truncate">{selectedOption?.label || 'Select an option'}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md border-0 bg-white dark:bg-slate-700/50 py-1.5 pl-10 pr-4 text-slate-900 dark:text-slate-100 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 rounded-md hover:bg-blue-500 hover:text-white ${
                    value === option.value ? 'text-white bg-blue-600' : 'text-slate-900 dark:text-slate-200'
                  }`}
                >
                  <span className="block truncate">{option.label}</span>
                </li>
              ))
            ) : (
                <li className="cursor-default select-none relative py-2 pl-3 pr-9 text-slate-500">
                    No results found.
                </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};