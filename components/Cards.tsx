"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const challenges = [
  {
    day: 1,
    title: "Gooey Filter Menu",
    path: "/day-1",
  },
  {
    day: 2,
    title: "Dynamic Transaction Status Indicator",
    path: "/day-2",
  },
];

export default function Cards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = document.querySelectorAll('.card-animation');
    
    cards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center items-center flex-wrap gap-8 max-w-4xl mx-auto my-24">
      {challenges.map((challenge) => (
        <Link
          href={challenge.path}
          key={challenge.day}
          className={`
            card-animation block group rounded-xl overflow-hidden shadow-lg
            hover:shadow-xl w-72 h-52
          `}
          style={{ 
            opacity: 0, 
            transform: 'translateY(50px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <div className="bg-gray-100 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600 rounded-xl h-full flex flex-col justify-center gap-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center duration-300">
              {challenge.title}
            </h3>

            <div className="flex justify-center overflow-hidden">
              <span className="text-white font-medium inline-flex items-center bg-indigo-600 dark:bg-indigo-700 px-4 py-2 rounded-lg transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-md">
                Live Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}