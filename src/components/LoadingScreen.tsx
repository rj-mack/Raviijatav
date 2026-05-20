/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DEVELOPER_NAME } from "../data";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fill progress from 0 to 100% over 2.1 seconds
    const duration = 2100;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Timeout to trigger the fadeout and main content reveal active after 2.5 seconds
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow exit transition to complete
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loading-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] text-[#e8eaf6]"
        >
          {/* Futuristic grid scanline lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#150030_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
          
          <div className="relative text-center px-4 max-w-md w-full">
            {/* Cyber Logo / Initial Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-t-2 border-b-2 border-l border-r border-[#00f5ff] font-display text-2xl font-bold bg-[#050510]/80 shadow-[0_0_15px_rgba(0,245,255,0.3)] select-none"
            >
              AV
            </motion.div>

            {/* Glitch text effect header */}
            <div className="relative mb-6">
              <h1 
                className="font-display font-extrabold text-2xl sm:text-3xl tracking-[0.2em] text-[#00f5ff] glow-cyan uppercase"
                style={{ content: DEVELOPER_NAME }}
              >
                {DEVELOPER_NAME}
              </h1>
              
              {/* Fake glitch layers */}
              <div 
                className="absolute inset-0 font-display font-extrabold text-2xl sm:text-3xl tracking-[0.2em] text-[#bf00ff] opacity-75 select-none animate-[glitch_1s_infinite_linear] pointer-events-none"
                style={{ clipPath: 'inset(40% 0 60% 0)' }}
              >
                {DEVELOPER_NAME}
              </div>
            </div>

            {/* Sub-status label */}
            <p className="font-mono text-xs tracking-widest text-[#7986a0] mb-8 uppercase">
              Initializing Quantum System Interface...
            </p>

            {/* Static outer bar */}
            <div className="relative w-full h-1.5 bg-[#14142b] rounded-full overflow-hidden border border-[rgba(255,255,255,0.05)] shadow-inner">
              {/* Moving filling neon status bar */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] shadow-[0_0_10px_#00f5ff]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic visual percentage indicator */}
            <div className="mt-4 flex justify-between font-mono text-xs text-[#7986a0]">
              <span className="uppercase tracking-wide">Interface Core</span>
              <span className="text-[#00f5ff] font-bold">{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
