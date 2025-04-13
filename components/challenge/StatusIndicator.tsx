"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StatusType = "analyzing" | "safe" | "warning";

const STATUS_SEQUENCE: StatusType[] = [
  "analyzing",
  "safe",
  "analyzing",
  "warning",
];

const statusData = {
  analyzing: {
    text: "Analyzing Transaction",
    textColor: "rgb(59 130 246)",
    iconColor: "rgb(59 130 246)",
    bgColor: "rgb(239 246 255)",
  },
  safe: {
    text: "Transaction Safe",
    textColor: "rgb(34 197 94)",
    iconColor: "rgb(34 197 94)",
    bgColor: "rgb(220 252 231)",
  },
  warning: {
    text: "Transaction Warning",
    textColor: "rgb(239 68 68)",
    iconColor: "rgb(239 68 68)",
    bgColor: "rgb(254 242 242)",
  },
};

const StatusIndicator = () => {
  const [status, setStatus] = useState<StatusType>("analyzing");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [textWidth, setTextWidth] = useState<Record<StatusType, number>>({
    analyzing: 0,
    safe: 0,
    warning: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % STATUS_SEQUENCE.length;
      const nextStatus = STATUS_SEQUENCE[nextIndex];

      if (
        (status === "analyzing" && nextStatus === "safe") ||
        (status === "analyzing" && nextStatus === "warning")
      ) {
        setDirection("forward");
      } else {
        setDirection("backward");
      }

      setIndex(nextIndex);
      setStatus(nextStatus);
    }, 3000);

    return () => clearInterval(timer);
  }, [index, status]);

  useEffect(() => {
    const measureTextWidth = (text: string, font: string): number => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
      }
      return 0;
    };

    const newWidths: Record<StatusType, number> = {
      analyzing: measureTextWidth(
        "Analyzing Transaction",
        "500 18px -apple-system, BlinkMacSystemFont, sans-serif"
      ),
      safe: measureTextWidth(
        "Transaction Safe",
        "500 18px -apple-system, BlinkMacSystemFont, sans-serif"
      ),
      warning: measureTextWidth(
        "Transaction Warning",
        "500 18px -apple-system, BlinkMacSystemFont, sans-serif"
      ),
    };

    setTextWidth(newWidths);
  }, []);

  const textVariants = {
    hiddenForward: { x: 30, opacity: 0 },
    hiddenBackward: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exitForward: { x: -30, opacity: 0 },
    exitBackward: { x: 30, opacity: 0 },
  };

  const renderIcon = () => {
    switch (status) {
      case "analyzing":
        return (
          <motion.div
            key="loader"
            initial={{
              opacity: 0,
              scale: 0.5,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            transition={{
              duration: 0.05,
              opacity: { duration: 0.15 },
              scale: { duration: 0.15 },
            }}
            className="w-full h-6"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              }}
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke={statusData[status].iconColor}
                strokeWidth="3"
                strokeDasharray="60"
                strokeDashoffset="20"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>
        );
      case "safe":
        return (
          <motion.div
            key="check"
            initial={{
              opacity: 0,
              scale: 0.5,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            transition={{
              duration: 0.05,
              opacity: { duration: 0.15 },
              scale: { duration: 0.15 },
            }}
            className="w-full h-6"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill={statusData[status].iconColor}
              />
              <path
                d="M8 12L11 15L16 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        );
      case "warning":
        return (
          <motion.div
            key="warning"
            initial={{
              opacity: 0,
              scale: 0.5,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            transition={{
              duration: 0.05,
              opacity: { duration: 0.15 },
              scale: { duration: 0.15 },
            }}
            className="w-full h-6"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                x: [0, 0, -2, 2, -2, 2, 0],
              }}
              transition={{
                x: {
                  duration: 0.7,
                  times: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
                  ease: "easeInOut",
                },
              }}
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill={statusData[status].iconColor}
              />
              <path
                d="M12 8V12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="16" r="1" fill="white" />
            </motion.svg>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="rounded-full py-3 px-6 inline-flex items-center gap-3 mx-auto"
      style={{
        backgroundColor: statusData[status].bgColor,
      }}
      animate={{
        width: `auto`,
      }}
      transition={{
        width: { type: "spring", stiffness: 300, damping: 30 },
      }}
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0 relative">
        <AnimatePresence initial={true} mode="sync">
          {renderIcon()}
        </AnimatePresence>
      </div>

      <motion.div
        className="relative h-7 flex items-center overflow-hidden"
        animate={{
          width: textWidth[status] + 10,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 30 },
        }}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={status}
            initial={
              direction === "forward" ? "hiddenForward" : "hiddenBackward"
            }
            animate="visible"
            exit={direction === "forward" ? "exitForward" : "exitBackward"}
            variants={textVariants}
            style={{ color: statusData[status].textColor }}
            className="text-lg font-medium whitespace-nowrap absolute"
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              duration: 0.0,
              delay: 0.01,
              opacity: { duration: 0.1 },
            }}
          >
            {statusData[status].text}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default StatusIndicator;