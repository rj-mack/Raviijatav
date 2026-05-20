/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { Download, ChevronDown, Rocket } from "lucide-react";
import { triggerResumeDownload, HERO_TITLES, DEVELOPER_NAME } from "../data";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Custom typewriter implementation
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Typewriter effect lifecycle
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = HERO_TITLES[titleIdx];

    const type = () => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setTypingSpeed(120);

        if (displayText === currentFullText) {
          // Pause at full word before deleting
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        // Deleting characters
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText === "") {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % HERO_TITLES.length);
          return;
        }
      }

      timer = setTimeout(type, typingSpeed);
    };

    timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIdx, typingSpeed]);

  // Canvas Node Link effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth;
        height = entryHeight;
        canvas.width = entryWidth;
        canvas.height = entryHeight;
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Set fallback container dimensions initially
    const updateInitialSize = () => {
      if (containerRef.current && canvas) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    updateInitialSize();

    // Particle nodes definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const maxParticles = window.innerWidth < 768 ? 40 : 85;
    const particles: Particle[] = [];

    // Initialize random nodes
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render links between neighboring particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Update particle physics
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off bounds
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Visual single particle rendering
        ctx.fillStyle = "rgba(0, 245, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nodes if proximity matches threshold
          const threshold = 120;
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.15;
            ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  const handleScrollToProjects = () => {
    const element = document.getElementById("skills");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-[#050510] overflow-hidden pt-20"
    >
      {/* Dynamic Network Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
      />

      {/* Futuristic Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#150030_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 pointer-events-none z-0" />

      {/* Absolute Ambient Background Glows */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-[#00f5ff]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-[#bf00ff]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Geometric Wireframes */}
      <div className="absolute top-[25%] right-[10%] w-[120px] h-[120px] rounded-full border border-dashed border-[#00f5ff]/15 animate-[spin_40s_linear_infinite] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[8%] w-[180px] h-[180px] rounded-full border border-[#bf00ff]/10 pointer-events-none flex items-center justify-center">
        <div className="w-[120px] h-[120px] rounded-full border border-dashed border-[#bf00ff]/20 animate-[spin_25s_linear_infinite]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        {/* Top visual tech flag badge */}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#00f5ff]/10 to-[#bf00ff]/10 border border-[#00f5ff]/30 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(0,245,255,0.1)] hover:border-[#bf00ff]/40 transition-colors duration-500">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5ff]"></span>
          </span>
          <span className="font-mono text-xxs tracking-widest text-[#00f5ff] uppercase">SYSTEM PROTOCOL DEPLOYED</span>
        </div>

        {/* Dynamic Name Heading */}
        <h2 className="font-display font-medium text-[#7986a0] text-sm md:text-base tracking-[0.3em] uppercase mb-3">
          HELLO WORLD, I'M
        </h2>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight text-white mb-6 uppercase flex flex-wrap justify-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#00f5ff]">Ravi</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#bf00ff] to-white ml-3 sm:ml-5 glow-purple">Jatav</span>
        </h1>

        {/* Typewriter Subtitle with cursor */}
        <div className="h-8 md:h-10 flex items-center justify-center mb-10">
          <p className="font-mono text-base md:text-2xl text-[#7986a0] tracking-wide">
            I am a <span className="text-[#00f5ff] font-bold text-shadow-[0_0_10px_#00f5ff]">{displayText}</span>
            <span className="inline-block w-1.5 h-5 ml-1 bg-[#00f5ff] animate-[pulse_1s_infinite] align-middle"></span>
          </p>
        </div>

        {/* Glowing Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
          <button
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00a8cd] text-black font-display font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] cursor-pointer hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Rocket size={16} />
            Explore Skills
          </button>
          
          <button
            onClick={triggerResumeDownload}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-transparent hover:bg-white/5 text-[#e8eaf6] border border-[#bf00ff]/40 hover:border-[#bf00ff] font-display font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_20px_rgba(191,0,255,0.3)] cursor-pointer hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download size={16} className="text-[#bf00ff] group-hover:text-white" />
            Get Resume
          </button>
        </div>
      </div>

      {/* Floating Animated Chevron Pointer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 text-[#7986a0]/50 hover:text-[#00f5ff] transition-all cursor-pointer">
        <span className="font-mono text-xxs tracking-widest mb-2 uppercase">INITIATING DESCENT</span>
        <ChevronDown size={20} className="animate-bounce" onClick={handleScrollToProjects} />
      </div>

      {/* Diagonal Section Separator */}
      <div 
        className="absolute bottom-0 left-0 w-full h-16 bg-[#050510] pointer-events-none"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
      />
    </section>
  );
}
