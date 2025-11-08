
import React from 'react';

export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0 1 20 10M20 20l-1.5-1.5A9 9 0 0 0 4 14" 
        />
    </svg>
);
