import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Cpu, BadgeAlert, Layers, Activity } from "lucide-react";
import { TECHNICAL_SKILLS, SOFT_SKILLS } from "../data";

// Helper component for SVG Circular Ring
interface SkillRingProps {
  name: string;
  percentage: number;
  trigger: boolean;
  key?: number;
}

function getTechLogo(name: string) {
  const norm = name.toLowerCase();

  // 1. React / Native
  if (norm.includes("react") || norm.includes("native")) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 text-[#00f5ff] fill-none stroke-current animate-[spin_20s_linear_infinite]" strokeWidth="1.2">
        <circle cx="0" cy="0" r="2.05" fill="#00f5ff" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    );
  }

  // 2. NextJS
  if (norm.includes("next")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-white fill-current">
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm31.7 93.7L57.2 46.1v34.4h-6.7V37.6h6.7l35 48.1v-48h6.7v56h-3.2z"/>
      </svg>
    );
  }

  // 3. TypeScript
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#3178c6] fill-current rounded">
        <rect width="128" height="128" rx="16" fill="#3178c6" />
        <path d="M102.5 98.3c-1.5 1-3.4 1.8-5.8 2.5-2.4.7-5 1-7.8 1-4.2 0-7.8-.9-10.7-2.6-2.9-1.7-5-4.2-6.5-7.4-1.4-3.2-2.1-7.2-2.1-11.9v-7.2h8.3v7.3c0 3.3.4 5.9 1.1 7.8.8 1.9 2 3.3 3.6 4.2 1.6.9 3.6 1.4 6.1 1.4 1.8 0 3.3-.2 4.5-.6s2.1-.9 2.7-1.5c.6-.6.9-1.3.9-2.1 0-.9-.3-1.6-1-2.1-.7-.5-1.7-1-3.2-1.4-1.4-.4-3.2-.8-5.4-1.2l-5.4-1c-3.1-.6-5.8-1.5-7.9-2.7-2.1-1.2-3.8-2.9-4.9-5.1-1.1-2.2-1.7-4.9-1.7-8.1 0-3.8 1-7.1 3.1-9.9 2.1-2.8 5.1-4.9 9-6.3 3.9-1.4 8.5-2.1 13.8-2.1s9.5.6 13 1.9c3.5 1.3 6 3.1 7.5 5.5s2.2 5.2 2.2 8.4V62h-8.3v-1.1c0-2.3-.4-4.2-1.1-5.6s-1.8-2.4-3.2-3c-1.4-.6-3.2-.9-5.5-.9-2.2 0-4.1.2-5.4.7s-2.3 1.1-2.9 1.8c-.6.7-.9 1.5-.9 2.5 0 .8.3 1.5.9 2.1.6.6 1.6 1.1 2.9 1.5 1.3.4 3 .8 5.2 1.2l5.4 1c3.5.6 6.4 1.6 8.7 2.9 2.3 1.3 4 3.1 5.1 5.4s1.7 5.1 1.7 8.3c-.1 4-.1 7.4-2.1 10.1zM58.9 44.5h-15v47.5h-8.5V44.5h-15V37h38.5v7.5z" fill="#ffffff" />
      </svg>
    );
  }

  // 4. JavaScript
  if (norm.includes("javascript") || norm === "js") {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#f7df1e] fill-current rounded">
        <rect width="128" height="128" rx="16" fill="#f7df1e" />
        <path d="M75 100c1.8 0 3.5-.3 5-1 1.5-.7 2.8-1.8 3.8-3.2s1.5-3.2 1.5-5.3c0-2-.5-3.7-1.5-5.2-1-1.4-2.5-2.5-4.5-3.2-2-.7-4.5-1.3-7.5-1.8l-5-1c-2.5-.5-4.5-1-6-1.5s-2.6-1.2-3.3-2c-.7-.8-1-2-1-3.5 0-1.5.5-2.7 1.5-3.7s2.5-1.5 4.5-1.8c2-.3 4.5-.5 7.5-.5 3.5 0 6.5.3 9 .8s4.5 1.3 6 2.3V66c-2-1.5-4.5-2.5-7.5-3s-6.5-.8-10.5-.8c-4 0-7.5.4-10.5 1.2s-5.3 2-7 3.8-2.5 4.1-2.5 7c0 3 .7 5.3 2.1 7s3.5 3 6.4 4c2.9 1 6.4 1.7 10.5 2.2l5 1c3.5.7 6 1.3 7.5 2s2.5 1.5 3 2.5c.5 1 .8 2.2.8 3.5 0 2-.7 3.5-2 4.7s-3 2-5 2.5-4.5.7-7.5.7c-4.5 0-8.5-.4-12-1.2s-6.5-2-9-3.8V97c2.5 2 5.5 3.5 9 4.3 3.5.8 7.5 1.2 11.5 1.2zM45 103V63h-8.5v40H45z" fill="#000000" />
      </svg>
    );
  }

  // 5. Node.js
  if (norm.includes("node")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#339933] fill-current">
        <path d="M117.4 34.3L70.3 7c-3.9-2.2-8.7-2.2-12.6 0L10.6 34.3c-3.9 2.2-6.3 6.4-6.3 11v54.5c0 4.6 2.4 8.7 6.3 11l47.1 27.2c3.9 2.2 8.7 2.2 12.6 0l47.1-27.2c3.9-2.2 6.3-6.4 6.3-11V45.3c0-4.6-2.4-8.8-6.3-11z M64 116.2c-1.3 0-2.6-.3-3.7-1l-40.4-23.3c-2.3-1.3-3.7-3.8-3.7-6.5V38.9c0-2.7 1.4-5.2 3.7-6.5l40.4-23.3c1.1-.6 2.4-1 3.7-1s2.6.3 3.7 1l40.4 23.3c2.3 1.3 3.7 3.8 3.7 6.5v46.5c0 2.7-1.4 5.2-3.7 6.5l-40.4 23.3c-1.1.7-2.4 1-3.7 1z"/>
        <path d="M60.5 45h-6.2v30h6.2V45z M85.5 45c-4.5 0-8.2 3.7-8.2 8.2v13.6c0 4.5 3.7 8.2 8.2 8.2s8.2-3.7 8.2-8.2V53.2c-.1-4.5-3.8-8.2-8.2-8.2z M87.5 66.8c0 1.1-.9 2-2 2s-2-.9-2-2V53.2c0-1.1.9-2 2-2s2 .9 2 2v13.6z"/>
      </svg>
    );
  }

  // 6. Python
  if (norm.includes("python")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 fill-current">
        <path fill="#3776ab" d="M64 5.5c-15.3 0-16.1.6-22 3.2-5.4 2.4-9.3 6.7-11.1 12.1-.9 2.6-1.1 4.7-1.1 9.8v8.4h35v5h-49c-5.5 0-9.8 4.3-11.4 9.1-1.8 5.6-1.9 12-.6 17.5 1.2 5.2 4.4 9.6 9.4 11.2 2.7.9 4.3.9 10 .9h5v-6.9c0-11 9-20 20-20H84v-9.1c0-10.4-8.5-19-19-19H64V5.5zm-15.5 8c1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5z"/>
        <path fill="#ffd343" d="M64 122.5c15.3 0 16.1-.6 22-3.2 5.4-2.4 9.3-6.7 11.1-12.1.9-2.6 1.1-4.7 1.1-9.8v-8.4H63.2v-5H112c5.5 0 9.8-4.3 11.4-9.1 1.8-5.6 1.9-12 .6-17.5-1.2-5.2-4.4-9.6-9.4-11.2-2.7-.9-4.3-.9-10-.9h-5.2v6.9c0 11-9 20-20 20h-35v9.1c0 10.4 8.5 19 19 19H64v8.4zm15.5-8c1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5z"/>
      </svg>
    );
  }

  // 7. Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#06b6d4] fill-current">
        <path d="M33 55c5.33-8 12.67-11.33 22-10 5.33.76 9.14 4.67 13.71 9.33C76 61.32 83 68.32 95 67c5.33-1 9-5 11-12-5.33 8-12.67 11.33-22 10-5.33-.76-9.14-4.67-13.71-9.33C64.57 48.68 57.57 41.68 45.57 43c-5.33 1-9 5-11 12zm-22 22c5.33-8 12.67-11.32 22-10 5.33.76 9.14 4.67 13.71 9.33C54 83.32 61 90.32 73 89c5.33-1 9-5 11-12-5.33 8-12.67 11.32-22 10-5.33-.76-9.14-4.67-13.71-9.32C42.57 70.68 35.57 63.68 23.57 65c-5.33 1-9 5-11 12z"/>
      </svg>
    );
  }

  // 8. Docker
  if (norm.includes("docker")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#2496ed] fill-current">
        <path d="M125 56.6c-1.1-.3-2.8-.5-4.6-.5-1.5 0-3 .1-4.1.3-.4-.9-1-2.2-1.8-3.4-.6-.8-1.5-1.4-2.6-1.4h-5.9v-7.3c0-.8-.7-1.5-1.5-1.5h-8.8v-8.8c0-.8-.7-1.5-1.5-1.5h-8.8c-.8 0-1.5.7-1.5 1.5v8.9h-8.8c-.8 0-1.5.7-1.5 1.5v7.3H63c-.8 0-1.5.7-1.5 1.5v8.8H51.2v-8.8c0-.8-.7-1.5-1.5-1.5h-8.8v-8.8c0-.8-.7-1.5-1.5-1.5h-8.8c-.8 0-1.5.7-1.5 1.5v8.9H20.3c-.8 0-1.5.7-1.5 1.5v7.3h-8.4c-.8 0-1.5.7-1.5 1.5v8.8H1.5c-.8 0-1.5.7-1.5 1.5v8.8c0 14.1 8 26.3 19.8 32.2 4.1 2 8.6 3.1 13.4 3.1 27.2 0 49.3-21.7 49.9-48.7h35.8c1.8 0 3.3-1.1 3.9-2.7.3-.8.4-1.7.3-2.5l23.5-23.7c1.4-1.4.3-3.8-1.7-3.9z"/>
      </svg>
    );
  }

  // 9. AWS / Cloud
  if (norm.includes("cloud") || norm.includes("aws")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#ff9900] fill-current">
        <path d="M96 52c-1.1-.3-2.5-.5-3.8-.5C83.5 51.5 76 56 71.4 62c-2.8-5-7.8-8.5-13.8-8.5-6.5 0-12 4-14.3 9.7C41 62 38.6 61.5 36 61.5c-11 0-20 9-20 20s9 20 20 20h60c9 0 16-7 16-16 0-7.3-5-13.5-11.8-15.3-.2-.2-.2-.2-.2-.2z"/>
      </svg>
    );
  }

  // 10. HTML
  if (norm.includes("html")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#e34f26] fill-current">
        <path d="M11 17.5l10.3 115.6L63.9 144l42.6-10.9L117 17.5H11zm85.8 33.7H43.1l1.5 16.2h44.3l-3.3 34.6-21.6 5.8-21.6-5.8-1.4-15.6h15.9l.8 8.6 6.3 1.7 6.3-1.7 1-10.5H35.2L31 35.1h67.4l-1.6 16.1z"/>
      </svg>
    );
  }

  // 11. CSS
  if (norm.includes("css")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#1572b6] fill-current">
        <path d="M11 17.5l10.3 115.6L63.9 144l42.6-10.9L117 17.5H11zm85.8 33.7H35.4l1.4 16.2h47.2l-3.3 34.6-21.6 5.8-21.6-5.8-1.4-15.6H51l.8 8.6 6.3 1.7 6.3-1.7 1-10.5H32.4L28.2 35.1h70.2l-1.6 16.1z"/>
      </svg>
    );
  }

  // 12. Git / Github
  if (norm.includes("git") || norm.includes("github")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#f05032] fill-current">
        <path d="M125 61L67 3a8.5 8.5 0 00-12 0L3 55a8.5 8.5 0 000 12l58 58a8.5 8.5 0 0012 0l52-52a8.5 8.5 0 000-12zM80 67a6.5 6.5 0 01-5-6V50a6.5 6.5 0 00-6.5-6.5h-5.9v-5.6l5.3-5.3A6.5 6.5 0 1173 38V49a6.5 6.5 0 0110 5.6V61a6.5 6.5 0 01-3 6z"/>
      </svg>
    );
  }

  // 13. Database / SQL / Postgres / MongoDB
  if (norm.includes("db") || norm.includes("sql") || norm.includes("mongo") || norm.includes("postgres") || norm.includes("prisma")) {
    return (
      <svg viewBox="0 0 128 128" className="w-8 h-8 text-[#336791] fill-current">
        <path d="M64 8C35.3 8 12 18.7 12 32v16c0 13.3 23.3 24 52 24s52-10.7 52-24V32c0-13.3-23.3-24-52-24zm0 24c-22.1 0-40-7.2-40-16s17.9-16 40-16 40 7.2 40 16-17.9 16-40 16zm40 32c0 4.4-17.9 8-40 8s-40-3.6-40-8V47.4c7.6 5.4 22.4 8.6 40 8.6s32.4-3.2 40-8.6V64zm0 24c0 4.4-17.9 8-40 8s-40-3.6-40-8V71.4c7.6 5.4 22.4 8.6 40 8.6s32.4-3.2 40-8.6V88z"/>
      </svg>
    );
  }

  // SCALABLE GENERIC MONOGRAM GRAPHIC:
  const words = name.trim().split(/[\s/+\-&]+/);
  let monogram = "";
  if (words.length >= 2 && words[0] && words[1]) {
    monogram = (words[0][0] + words[1][0]).toUpperCase();
  } else if (name.trim().length > 0) {
    monogram = name.trim().substring(0, 2).toUpperCase();
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <span className="font-mono text-base font-extrabold text-[#00f5ff] tracking-tighter text-shadow-glow leading-none uppercase">
        {monogram}
      </span>
      <span className="font-mono text-[7px] text-[#7986a0] mt-1 tracking-widest uppercase">
        DEV
      </span>
    </div>
  );
}

function SkillRing({ name, percentage, trigger }: SkillRingProps) {
  const [currentVal, setCurrentVal] = useState(0);
  
  // Circle geometry properties
  const radius = 38;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius; // ~238.76

  useEffect(() => {
    if (!trigger) return;
    
    // Animate percentage text counter
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / percentage), 15);
    
    const timer = setInterval(() => {
      start += 2;
      if (start >= percentage) {
        setCurrentVal(percentage);
        clearInterval(timer);
      } else {
        setCurrentVal(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [percentage, trigger]);

  // Compute animated dashoffset
  const dashOffset = trigger 
    ? circumference - (currentVal / 100) * circumference 
    : circumference;

  return (
    <div className="flex flex-col items-center p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-[#00f5ff]/20 hover:shadow-[0_0_20px_rgba(0,245,255,0.05)] transition-all duration-300">
      <div className="relative w-24 h-24 mb-4">
        {/* SVG concentric progress loops */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Base track circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Main animated glowing progress loop */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#cyanPurpleGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          {/* Defines gradient specifically */}
          <defs>
            <linearGradient id="cyanPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#bf00ff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating tech stack logo inside the circular animation loop */}
        <div className="absolute inset-0 flex items-center justify-center p-2 select-none">
          {getTechLogo(name)}
        </div>
      </div>

      <span className="font-sans text-xs font-bold text-center tracking-wider text-[#e8eaf6] uppercase truncate max-w-full mb-2">
        {name}
      </span>
      
      {/* Dynamic fluorescent skill rating tag capsule */}
      <span className="font-mono text-[9px] text-[#00f5ff] font-semibold bg-[#00f5ff]/5 border border-[#00f5ff]/25 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(0,245,255,0.1)] uppercase">
        Lvl {currentVal}%
      </span>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<"tech" | "soft">("tech");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="relative w-full py-24 bg-[#050510]">
      {/* Background radial loops */}
      <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-[#00f5ff]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-[#bf00ff]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title with glowing underline */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-display font-medium text-[#7986a0] text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
            02 / ABILITIES INTERFACE
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-normal uppercase relative pb-4">
            COMPETENCY DATABASE
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full shadow-[0_0_10px_#bf00ff]" />
          </h3>
        </div>

        {/* Tabs Control Panel */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab("tech")}
              className={`px-6 py-3 rounded-lg font-display text-xs sm:text-sm tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "tech"
                  ? "bg-gradient-to-r from-[#00f5ff]/20 to-[#bf00ff]/20 text-[#00f5ff] border border-[#00f5ff]/30 shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                  : "text-[#7986a0] hover:text-white"
              }`}
            >
              Technical Core
            </button>
            <button
              onClick={() => setActiveTab("soft")}
              className={`px-6 py-3 rounded-lg font-display text-xs sm:text-sm tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
                activeTab === "soft"
                  ? "bg-gradient-to-r from-[#00f5ff]/20 to-[#bf00ff]/20 text-[#00f5ff] border border-[#00f5ff]/30 shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                  : "text-[#7986a0] hover:text-white"
              }`}
            >
              Soft Integration
            </button>
          </div>
        </div>

        {/* Content Tabs Switchboard */}
        <div ref={sectionRef} className="min-h-[300px]">
          {activeTab === "tech" ? (
            /* Technical Skills: Circular progress rings grid output */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              {TECHNICAL_SKILLS.map((skill, index) => (
                <SkillRing
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                  trigger={isInView}
                />
              ))}
            </motion.div>
          ) : (
            /* Soft Skills: Interactive tag cloud pills */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto"
            >
              {SOFT_SKILLS.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="flex items-center space-x-3 px-5 py-3 rounded-xl glass-panel relative overflow-hidden group cursor-default"
                >
                  {/* Subtle hover background ring lines */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00f5ff]/5 to-[#bf00ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-6 h-6 flex items-center justify-center rounded bg-white/5 text-[#00f5ff] group-hover:text-[#bf00ff] transition-colors">
                    {/* Generative abstract shapes based on indexing to avoid loading complex map loops */}
                    {index % 4 === 0 && <Cpu size={14} />}
                    {index % 4 === 1 && <Layers size={14} />}
                    {index % 4 === 2 && <Activity size={14} />}
                    {index % 4 === 3 && <BadgeAlert size={14} />}
                  </div>

                  <span className="font-sans text-xs sm:text-sm font-semibold text-[#e8eaf6] tracking-wide relative z-10 uppercase">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
