import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Mail, Phone, Calendar, User, ShieldCheck } from "lucide-react";
import { BIO_TEXT, PERSONAL_INFO, STATS, DEVELOPER_NAME } from "../data";
// @ts-ignore
import developerAvatar from "../assets/images/developer_avatar_1779261576729.png";

// Simple count-up helper component
interface CountUpProps {
  value: number;
  suffix: string;
  trigger: boolean;
}

function CountUp({ value, suffix, trigger }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1200; // ms
    const incrementTime = Math.max(Math.floor(duration / end), 25);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // larger increments for speed
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, trigger]);

  return (
    <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#00f5ff] glow-cyan">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef, { once: true, amount: 0.3 });

  const contactCards = [
    {
      icon: <MapPin className="text-[#00f5ff]" size={20} />,
      label: "Location",
      value: PERSONAL_INFO.location,
    },
    {
      icon: <Mail className="text-[#bf00ff]" size={20} />,
      label: "Email",
      value: PERSONAL_INFO.email,
    },
    {
      icon: <Phone className="text-[#00f5ff]" size={20} />,
      label: "Phone",
      value: PERSONAL_INFO.phone,
    }
  ];

  return (
    <section id="about" className="relative w-full py-24 bg-[#050510] overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[40%] right-[-10%] w-80 h-80 bg-[#bf00ff]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-80 h-80 bg-[#00f5ff]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-display font-medium text-[#7986a0] text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
            01 / INTERFACE MATRIX
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-normal uppercase relative pb-4">
            ABOUT SYSTEM CORE
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full shadow-[0_0_10px_#00f5ff]" />
          </h3>
        </div>

        {/* Intersection Container Grid */}
        <div ref={targetRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column Left: Visual Hologram Style Profile Framing */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-[340px] aspect-square rounded-2xl p-2 bg-[#050510]/60 glass-panel border-glow">
              
              {/* Sci-Fi Decorative Corner Indicators */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-[#00f5ff] rounded-tl pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-[#bf00ff] rounded-tr pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-[#bf00ff] rounded-bl pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-[#00f5ff] rounded-br pointer-events-none" />

              {/* Glowing decorative frame circle */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40">
                <img
                  src={developerAvatar}
                  alt={DEVELOPER_NAME}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-105 group-hover:grayscale-0 transition-all duration-750 ease-out scale-100 group-hover:scale-105"
                />
                
                {/* Tech scanline overlay and gradient mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent pointer-events-none opacity-60" />
                <div className="absolute inset-0 bg-[#00f5ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Status Tag floating beneath */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#050510] border border-[#00f5ff]/30 hover:border-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.2)] px-4 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                <span className="h-2 w-2 rounded-full bg-[#00f5ff] animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-[#e8eaf6] uppercase">CORE STATUS: ACTIVE</span>
              </div>
            </div>
          </motion.div>

          {/* Column Right: Developer Bio and Stats Counters */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Bio Title Tag */}
            <div className="flex items-center gap-2 mb-4 font-mono text-xs tracking-widest text-[#00f5ff]">
              <User size={14} />
              <span className="uppercase">BIOGRAPHICAL REVELATION</span>
            </div>

            {/* Main Bio Paragraph */}
            <p className="font-sans text-base sm:text-lg leading-relaxed text-[#7986a0] mb-8">
              {BIO_TEXT}
            </p>

            {/* Achievements Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="p-3 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner hover:border-[#00f5ff]/10 transition-colors"
                >
                  <div className="block mb-1">
                    <CountUp value={stat.value} suffix={stat.suffix} trigger={isInView} />
                  </div>
                  <span className="font-sans text-xxs sm:text-xs text-[#7986a0] uppercase tracking-wider block font-semibold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Personal Contact Cards with hover glow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-4 rounded-xl glass-panel relative overflow-hidden group hover:shadow-[0_0_15px_rgba(0,245,255,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-2 bg-white/5 w-9 h-9 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="font-mono text-xxs tracking-widest text-[#7986a0] uppercase mb-1">
                    {card.label}
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#e8eaf6] truncate">
                    {card.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
