"use client";

import React from 'react'
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

function Header() {
  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="hidden sm:block w-24">
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-4">
            <div className="hidden sm:flex items-center">
              <div className="relative">
                <Image 
                  src="/peerlist.png" 
                  alt="Peerlist Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <span className="mx-2">x</span>
              <div className="relative">
                <Image 
                  src="/acerternity.png" 
                  alt="Aceternity Logo" 
                  width={40} 
                  height={40}
                  className="object-contain rounded-lg"
                  style={{ clipPath: 'circle(45%)' }}
                />
              </div>
            </div>
            
            <h1 className="text-base sm:text-xl md:text-2xl text-center sm:text-left max-w-[300px] sm:max-w-none">
                (Peerlist <span className="text-xs sm:text-sm">x</span> Aceternity) UI Animation Challenge
            </h1>
          </div>
          
          <div className="w-auto sm:w-24 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
    </div>
  )
}

export default Header