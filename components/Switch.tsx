"use client";

import React, { forwardRef } from 'react';

interface SwitchRootProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
}

export function Root({ checked, onCheckedChange, children }: SwitchRootProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className={`relative inline-flex h-6 w-11 items-center rounded-full 
        outline-none focus:outline-none select-none
        transition-colors ${
        checked ? 'bg-gray-500' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      onClick={() => onCheckedChange(!checked)}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <span 
        className={`absolute transition-transform duration-300 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      >
        {children}
      </span>
    </button>
  );
}

export const Thumb = forwardRef<
  HTMLDivElement,
  { children?: React.ReactNode }
>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg select-none"
    >
      {children}
    </div>
  );
});

Thumb.displayName = 'Switch.Thumb'; 