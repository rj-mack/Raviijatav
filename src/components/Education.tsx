/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { EDUCATION_HISTORY } from "../data";

interface TimelineCardProps {
  entry: typeof EDUCATION_HISTORY[0];
  index: number;
  key?: number;
}

function TimelineCard({ entry, index }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });
  const isEven = index % 2 === 0;

  // Render index symbols for aesthetic purposes
  const icons = [
    <GraduationCap className="text-[#00f5ff]" size={18} />,
    <Award className="text-[#bf00ff]" size={18} />,
    <BookOpen className="text-[#00f5ff]" size={18} />
  ];

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col md:flex-row items-center w-full mb-12 last:mb-0 ${
        isEven ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Floating Center Timeline Pulse Dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
        <div className="w-5 h-5 rounded-full bg-[#050510] border-2 border-[#00f5ff] relative flex items-center justify-center">
          {/* Animated pulsing ripple circle */}
          <span className="absolute inset-0 rounded-full border border-[#00f5ff]/60 animate-ping opacity-75" />
          <div className="w-2 h-2 rounded-full bg-[#bf00ff]" />
        </div>
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{
          opacity: 0,
          x: window.innerWidth < 768 ? 40 : (isEven ? -60 : 60)
        }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-[calc(100%-48px)] ml-12 md:ml-0 md:w-[calc(50%-40px)] p-6 rounded-2xl glass-panel relative hover:shadow-[0_0_25px_rgba(191,0,255,0.06)] hover:-translate-y-1.5 transition-all duration-300 group`}
      >
        {/* Futuristic Card Header accents */}
        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              {icons[index % icons.length]}
            </div>
            <span className="font-mono text-[10px] tracking-widest text-[#00f5ff] uppercase">
              SECTOR {index + 1} // ACADEMICS
            </span>
          </div>
          <span className="font-mono text-xs text-[#bf00ff] font-semibold bg-[#bf00ff]/5 border border-[#bf00ff]/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(191,0,255,0.05)]">
            {entry.yearRange}
          </span>
        </div>

        {/* Institution and Degree */}
        <h4 className="font-display text-lg font-bold text-white mb-1 group-hover:text-[#00f5ff] transition-colors">
          {entry.institution}
        </h4>
        <h5 className="font-sans text-sm font-semibold text-[#7986a0] mb-4">
          {entry.degree}
        </h5>

        {/* GPA Grade Info Tag */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 font-mono text-xxs text-[#e8eaf6] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00f5ff]" />
          {entry.grade}
        </div>

        {/* Supporting Description */}
        <p className="font-sans text-xs leading-relaxed text-[#7986a0]">
          {entry.description}
        </p>

        {/* Ambient Bottom Right Hover Grid Indicator */}
        <div className="absolute bottom-2 right-2 opacity-5 font-mono text-[8px] uppercase tracking-widest select-none select-none pointer-events-none text-white">
          VERIFIED PROTOCOL SYSTEM // STATUS 200
        </div>
      </motion.div>
    </div>
  );
}

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="education" className="relative w-full py-24 bg-[#050510]">
      {/* Visual background lights */}
      <div className="absolute top-[30%] left-[10%] w-80 h-80 bg-[#00f5ff]/3 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[10%] w-80 h-80 bg-[#bf00ff]/3 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="font-display font-medium text-[#7986a0] text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
            03 / HISTORICAL BLOCKS
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-normal uppercase relative pb-4">
            EDUCATION PATHWAY
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full shadow-[0_0_10px_#00f5ff]" />
          </h3>
        </div>

        {/* Vertical Timeline Framework */}
        <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
          {/* Central Vertical Neon Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#00f5ff] via-[#bf00ff] to-[#00f5ff] opacity-40 z-10" />

          {/* Core Mapping of Educational Milestones */}
          <div className="relative">
            {EDUCATION_HISTORY.map((entry, index) => (
              <TimelineCard key={index} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
