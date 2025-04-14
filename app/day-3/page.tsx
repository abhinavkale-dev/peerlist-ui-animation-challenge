"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from "@/components/ui/BackButton";
import Breadcrumb from "@/components/ui/Breadcrumb";

type TaskKey = 'groceries' | 'existence' | 'swiftUI';

interface TaskState {
  groceries: boolean;
  existence: boolean;
  swiftUI: boolean;
}

interface LoadingState {
  groceries: boolean;
  existence: boolean;
  swiftUI: boolean;
}

export default function Day3() {
  const [tasks, setTasks] = useState<TaskState>({
    groceries: false,
    existence: false,
    swiftUI: true,
  });
  
  const [loading, setLoading] = useState<LoadingState>({
    groceries: false,
    existence: false,
    swiftUI: false,
  });

  const toggleTask = (task: TaskKey) => {
    setLoading((prev) => ({ ...prev, [task]: true }));
 
    setTimeout(() => {
      setTasks((prev) => ({ ...prev, [task]: !prev[task] }));
      setLoading((prev) => ({ ...prev, [task]: false }));
    }, 800);
  };

  // Improved animations with smoother transitions
  const checkboxVariants = {
    checked: { 
      scale: [0.9, 1.05, 1],
      borderRadius: "2px",
      transition: { 
        duration: 0.5, 
        ease: [0.19, 1.0, 0.22, 1.0],
        times: [0, 0.7, 1],
        borderRadius: { duration: 0 }
      } 
    },
    unchecked: { 
      scale: 1,
      borderRadius: "2px",
      x: [0, -3, 3, -2, 2, 0],  
      transition: { 
        scale: { duration: 0.4, ease: "easeOut" },
        x: { duration: 0.5, ease: "easeInOut", times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
        borderRadius: { duration: 0 }
      } 
    },
    tap: { 
      scale: 0.85,
      borderRadius: "2px",
      transition: { 
        duration: 0.15, 
        ease: "easeInOut",
        borderRadius: { duration: 0 }
      } 
    }
  };

  const textVariants = {
    unchecked: { 
      x: [0, 5, -5, 3, -3, 0],  
      transition: { 
        x: { duration: 0.6, ease: [0.4, 0, 0.2, 1], times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
        opacity: { duration: 0.4, ease: "easeOut" }
      } 
    },
    checked: { 
      x: [-10, 0],
      transition: { 
        x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, // Improved easing curve
        opacity: { duration: 0.4, ease: "easeOut" }
      } 
    }
  };

  const strikethroughVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%',
      transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } // Custom cubic bezier for smoother animation
    }
  };

  const checkMarkVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { 
      opacity: 1, 
      pathLength: 1,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } // Improved spring-like effect
    }
  };

  const borderAnimationVariants = {
    initial: { pathLength: 0, pathOffset: 0 },
    animate: { 
      pathLength: 1,
      pathOffset: 0,
      transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } // Custom easing
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black relative p-4">
      <div className="absolute top-4 right-4">
        <BackButton />
      </div>
      
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <Breadcrumb />
      </div>
      
      <h1 className="text-2xl font-bold text-white mb-6">Day 3: Animated Checkboxes</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm w-80">
        <div className="space-y-3">
          {(Object.entries(tasks) as [TaskKey, boolean][]).map(([task, checked]) => {
            const wasChecked = checked && !loading[task];
            const isBeingUnchecked = loading[task] && checked;
            
            return (
              <div
                key={task}
                className="flex items-center space-x-3 cursor-pointer rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => !loading[task] && toggleTask(task)}
              >
                <div className="relative">
                  <div className="w-5 h-5 bg-gray-50 dark:bg-gray-700 rounded-[2px]" />

                  {loading[task] && (
                    <svg className="absolute inset-0 w-5 h-5" viewBox="0 0 20 20">
                      <motion.rect
                        x="1" 
                        y="1" 
                        width="18" 
                        height="18" 
                        rx="2"
                        ry="2"
                        fill="none"
                        stroke="#6366f1" 
                        strokeWidth="2"
                        strokeLinecap="round"
                        variants={borderAnimationVariants}
                        initial="initial"
                        animate="animate"
                      />
                    </svg>
                  )}
                  
                  <motion.div
                    style={{ borderRadius: "2px" }}
                    className={`absolute inset-0 rounded-[2px] flex items-center justify-center border-2 transition-colors ${
                      loading[task] 
                        ? 'border-transparent' 
                        : checked 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300 dark:border-gray-600'
                    }`}
                    variants={checkboxVariants}
                    animate={isBeingUnchecked ? 'unchecked' : checked ? 'checked' : 'unchecked'}
                    whileTap={!loading[task] ? "tap" : undefined}
                    initial={false}
                  >
                    <AnimatePresence>
                      {wasChecked && (
                        <motion.svg
                          key="check"
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, scale: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
                        >
                          <motion.path
                            variants={checkMarkVariants}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
                
                <div className="relative overflow-hidden">
                  <motion.span
                    className={`text-base font-medium inline-block ${wasChecked ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}
                    animate={{ opacity: loading[task] ? 0.7 : 1 }}
                    variants={textVariants}
                    initial={false}
                  >
                    {task === 'groceries' && 'Buy groceries'}
                    {task === 'existence' && 'Contemplate existence'}
                    {task === 'swiftUI' && 'Learn SwiftUI'}
                  </motion.span>
                  
                  <AnimatePresence>
                    {wasChecked && (
                      <motion.div 
                        className="absolute left-0 top-1/2 h-0.5 bg-gray-400 dark:bg-gray-500 -translate-y-1/2 origin-left"
                        variants={strikethroughVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 