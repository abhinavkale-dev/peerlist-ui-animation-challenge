"use client";

import { useRef } from 'react';
import { flushSync } from 'react-dom';
import * as Switch from './Switch';
import { IconMoon, IconSun } from './Icons';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const handleToggle = async (isDark: boolean) => {
    // Prevent multiple rapid toggles
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    /**
     * Return early if View Transition API is not supported
     * or user prefers reduced motion
     */
    if (
        !ref.current ||
        !document.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggleTheme(isDark);
      isAnimating.current = false;
      return;
    }

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          toggleTheme(isDark);
        });
      });

      await transition.ready;

      const { top, left, width, height } = ref.current.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRadius = Math.hypot(
        Math.max(left, right),
        Math.max(top, bottom),
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );

      await transition.finished;
    } finally {
      isAnimating.current = false;
    }
  };

  return (
    <div className="relative z-10">
      <Switch.Root checked={isDarkMode} onCheckedChange={handleToggle}>
        <Switch.Thumb ref={ref}>
          {isDarkMode ? <IconSun /> : <IconMoon />}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
} 