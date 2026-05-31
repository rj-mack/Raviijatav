import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  ExternalLink, 
  Github, 
  Terminal, 
  X, 
  Play, 
  RefreshCw, 
  ShieldAlert, 
  Check, 
  Copy, 
  Paintbrush, 
  Cpu, 
  Layers, 
  Activity, 
  Zap 
} from "lucide-react";
import { PORTFOLIO_PROJECTS } from "../data";
import { ProjectEntry } from "../types";

// Type definitions matching simulated projects
type CategoryType = "all" | "fintech" | "design" | "collab";

interface ProjectEntryWithSim extends ProjectEntry {
  category: CategoryType;
  fullDesc: string;
  features: string[];
}

const EXTENDED_PROJECTS: ProjectEntryWithSim[] = [
  {
    ...PORTFOLIO_PROJECTS[0],
    category: "Booking",
    fullDesc: "A luxury salon web platform built with a modern editorial design system. Features a full services showcase, academy course section, interactive gallery with transformation previews, and a WhatsApp-integrated appointment booking flow. Appointments are managed via local storage for a seamless client experience — fully responsive and mobile-first optimized.",
    features: [
      "WhatsApp appointment booking",
      "Mobile-first optimized layout",
      "Interactive gallery & transformations",
      "Luxury editorial design system",
    ]
  },
  {
    ...PORTFOLIO_PROJECTS[1],
    category: "SS Pathcare Lab Website",
    fullDesc: "Developed a full-Stack diagnostic lab platform using MongoDb , Express.js , React(vite),Redux, Tailwind css and Node.js user can upload prescriptions, view suggested single or multiple test packages,book lab visits or home sample collection, complete secure payments and download authenticated medical report.Implemented JWT-Based authentication and an admin panel for managing tests, packages, and user queries",
    features: [
      "User Can upload prescriptions",
      "Admin-Panel",
      "Book slot for Test",
      "visit to Home for collecting simple"
    ]
  },
  {
    ...PORTFOLIO_PROJECTS[2],
    category: "TourToPachmarhi (MERN Stack)",
    fullDesc: "Developed TourToPachmarhi, a comprehensive One-Stop Solution travel platform using the MERN stack specifically designed to streamline Pachmarhi tourism. The platform features a robust hotel booking system, customizable tour packages (Couple, Family, and Forest tours), and a multi-category vehicle rental module for bikes and cars. To ensure a high-end user experience, I integrated Swiper.js for dynamic content sliders and Lucide-React for a modern UI aesthetic, while managing complex backend logic and data flow using Node.js, Express.js, and MongoDB.",
    features: [
      "Swiper.js powered interactive UI with Lucide-React icons and mobile-first design",
      "Multi-category vehicle rental module supporting bikes and cars",
      "Customizable tour packages — Couple, Family & Forest tours with dynamic pricing",
    ]
  }
];

/* -------------------------------------------------------------
   SIMULATOR 1 COMPONENT: Quantum Ledger Dashboard
   ------------------------------------------------------------- */
function LedgerSimulator() {
  const [logs, setLogs] = useState<string[]>([
    "SYS_INIT: Network validation complete.",
    "SYNC: Safe-route cluster validated.",
    "DB: Connected to decentralized ledger #8234."
  ]);
  const [safetyStatus, setSafetyStatus] = useState<"secure" | "compromised">("secure");
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [throughput, setThroughput] = useState(134);

  // Auto update metrics
  useEffect(() => {
    const timer = setInterval(() => {
      setThroughput((prev) => {
        const jitter = Math.floor(Math.sin(Date.now() / 1000) * 12);
        const base = isStressTesting ? 740 : 134;
        return Math.max(20, base + jitter);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStressTesting]);

  const addSimulatedLog = (logText: string) => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    setLogs((prev) => [ `[${timestamp}] ${logText}`, ...prev.slice(0, 5) ]);
  };

  const triggerBlockCreation = () => {
    const blockNum = Math.floor(Math.random() * 90000) + 10000;
    addSimulatedLog(`LEDGER: Synthesized Block #${blockNum} successfully.`);
  };

  const toggleSafetyStatus = () => {
    if (safetyStatus === "secure") {
      setSafetyStatus("compromised");
      addSimulatedLog("ALERT: Simulated cyber intrusion detected inside Sector 3!");
    } else {
      setSafetyStatus("secure");
      addSimulatedLog("RESOLV: Threat mitigated. Node shielding fully restored.");
    }
  };

  const toggleStressTest = () => {
    const state = !isStressTesting;
    setIsStressTesting(state);
    addSimulatedLog(state ? "SYS: Stress testing triggered. Upstream ports maxed." : "SYS: System cool-down complete.");
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#00f5ff] font-bold">LEDGER CONTROLLER</span>
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[9px] text-[#7986a0]">ONLINE</span>
        </div>
      </div>

      {/* KPI Display Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* KPI 1 */}
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
          <span className="font-mono text-[9px] text-[#7986a0] block uppercase">THROUGHPUT</span>
          <span className="font-display text-lg font-bold text-white glow-cyan">
            {throughput} <span className="text-xs text-[#7986a0] font-mono">TX/s</span>
          </span>
        </div>
        {/* KPI 2 */}
        <div className={`border rounded-lg p-3 transition-colors ${
          safetyStatus === "secure" 
            ? "bg-emerald-500/5 border-emerald-500/20" 
            : "bg-rose-500/5 border-rose-500/20"
        }`}>
          <span className="font-mono text-[9px] text-[#7986a0] block uppercase">SECURITY LEVEL</span>
          <span className={`font-display text-sm font-bold uppercase ${
            safetyStatus === "secure" ? "text-emerald-400" : "text-rose-400"
          }`}>
            {safetyStatus === "secure" ? "GUARDED" : "BREACH ALERT"}
          </span>
        </div>
      </div>

      {/* Controller actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={triggerBlockCreation}
          className="px-2 py-2 bg-white/5 hover:bg-[#00f5ff]/20 border border-white/10 hover:border-[#00f5ff]/40 rounded text-[10px] uppercase font-mono tracking-wider font-bold text-white cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1"
        >
          <Play size={10} /> Sync Block
        </button>
        <button
          onClick={toggleSafetyStatus}
          className={`px-2 py-2 border rounded text-[10px] uppercase font-mono tracking-wider font-bold cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1 ${
            safetyStatus === "secure" 
              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20" 
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
          }`}
        >
          <ShieldAlert size={10} /> Hack Mode
        </button>
        <button
          onClick={toggleStressTest}
          className={`px-2 py-2 border rounded text-[10px] uppercase font-mono tracking-wider font-bold cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1 ${
            isStressTesting 
              ? "bg-[#bf00ff]/20 border-[#bf00ff]/60 text-[#bf00ff]" 
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
          }`}
        >
          <RefreshCw size={10} className={isStressTesting ? "animate-spin" : ""} /> Stress
        </button>
      </div>

      {/* Interactive terminal logs output */}
      <div className="bg-black/40 rounded-lg border border-white/5 p-3 flex-grow font-mono text-[10px] text-[#7986a0] overflow-y-auto max-h-[160px] flex flex-col space-y-1 select-none">
        {logs.map((log, idx) => (
          <div key={idx} className={`${log.includes("ALERT") ? "text-rose-400" : log.includes("RESOLV") ? "text-emerald-400" : "text-[#7986a0]"}`}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

function AeroFormSimulator() {
  const [rounded, setRounded] = useState<"none" | "md" | "full">("md");
  const [color, setColor] = useState<"cyan" | "purple" | "emerald">("cyan");
  const [shadow, setShadow] = useState<"none" | "glow" | "heavy">("glow");
  const [copied, setCopied] = useState(false);

  // Compute dynamic classes for physical mockup frame
  const getRoundedClass = () => {
    if (rounded === "none") return "rounded-none";
    if (rounded === "md") return "rounded-xl";
    return "rounded-full";
  };

  const getColorClasses = () => {
    if (color === "cyan") return "from-[#00f5ff] to-[#00a6cd] text-black shadow-cyan";
    if (color === "purple") return "from-[#bf00ff] to-[#7a00a4] text-white shadow-purple";
    return "from-[#10b981] to-[#047857] text-white shadow-emerald";
  };

  const getShadowClass = () => {
    if (shadow === "none") return "shadow-none";
    if (shadow === "glow") {
      if (color === "cyan") return "shadow-[0_0_15px_rgba(0,245,255,0.4)]";
      if (color === "purple") return "shadow-[0_0_15px_rgba(191,0,255,0.4)]";
      return "shadow-[0_0_15px_rgba(16,185,129,0.4)]";
    }
    return "shadow-xl border border-white/10";
  };

  // Build simulated Tailwind JSX Output
  const generatedCode = `<div className="relative p-6 bg-gradient-to-r ${
    color === "cyan" 
      ? "from-[#00f5ff] to-[#00a6cd]" 
      : color === "purple" 
        ? "from-[#bf00ff] to-[#7a00a4]" 
        : "from-[#10b981] to-[#047857]"
  } ${getRoundedClass()} ${getShadowClass()}" />`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#00f5ff] font-bold">AEROFORM COMPILER</span>
        <span className="font-mono text-[9px] text-[#7986a0]">PLAYGROUND v1.0</span>
      </div>

      {/* Sandbox Controls panel */}
      <div className="grid grid-cols-3 gap-2">
        {/* Tweak 1 */}
        <div className="flex flex-col space-y-1">
          <label className="font-mono text-[9px] text-[#7986a0] uppercase">Radius</label>
          <select
            value={rounded}
            onChange={(e) => setRounded(e.target.value as any)}
            className="bg-[#050510] border border-white/10 text-[#e8eaf6] text-xxs font-mono p-1 rounded focus:border-[#00f5ff] outline-none cursor-pointer"
          >
            <option value="none">Zero</option>
            <option value="md">Curved</option>
            <option value="full">Sphere</option>
          </select>
        </div>

        {/* Tweak 2 */}
        <div className="flex flex-col space-y-1">
          <label className="font-mono text-[9px] text-[#7986a0] uppercase">Spectrum</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value as any)}
            className="bg-[#050510] border border-white/10 text-[#e8eaf6] text-xxs font-mono p-1 rounded focus:border-[#00f5ff] outline-none cursor-pointer"
          >
            <option value="cyan">Cyan Neon</option>
            <option value="purple">Cosmic Purple</option>
            <option value="emerald">Matrix Green</option>
          </select>
        </div>

        {/* Tweak 3 */}
        <div className="flex flex-col space-y-1">
          <label className="font-mono text-[9px] text-[#7986a0] uppercase">Backlight</label>
          <select
            value={shadow}
            onChange={(e) => setShadow(e.target.value as any)}
            className="bg-[#050510] border border-white/10 text-[#e8eaf6] text-xxs font-mono p-1 rounded focus:border-[#00f5ff] outline-none cursor-pointer"
          >
            <option value="none">flat</option>
            <option value="glow">neon glow</option>
            <option value="heavy">border highlight</option>
          </select>
        </div>
      </div>

      {/* Visual Workspace Container */}
      <div className="p-6 bg-black/40 rounded-lg border border-white/5 flex items-center justify-center min-h-[110px]">
        <div 
          className={`px-6 py-4 bg-gradient-to-r font-display text-xs font-bold uppercase tracking-wider scale-100 hover:scale-[1.05] transition-all duration-300 pointer-events-none select-none ${getColorClasses()} ${getRoundedClass()} ${getShadowClass()}`}
        >
          Interactive Node
        </div>
      </div>

      {/* Real-time Code outputs with quick copy */}
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-[#7986a0] uppercase">COMPILED TAILWIND CODE</span>
          <button
            onClick={copyCodeToClipboard}
            className="flex items-center gap-1 font-mono text-[#00f5ff] text-xxs hover:text-white cursor-pointer"
          >
            {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
            {copied ? "COPIED" : "COPY CODE"}
          </button>
        </div>
        <pre className="bg-black/60 border border-white/5 rounded p-2.5 font-mono text-[9.5px] text-[#e8eaf6] whitespace-pre-wrap select-all overflow-x-auto select-all max-h-[70px]">
          {generatedCode}
        </pre>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   SIMULATOR 3 COMPONENT: Vertex Collaborative Canvas
   ------------------------------------------------------------- */
function VertexSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#00f5ff");
  const [brushSize, setBrushSize] = useState(4);
  const [botsList, setBotsList] = useState<string[]>([
    "BOT: Nova_Sync connecting...",
    "BOT: Grid_Vector drawing active Node."
  ]);

  // Set initial dimensions and load a default template vector stroke
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset dimensions
    canvas.width = canvas.parentElement?.clientWidth || 280;
    canvas.height = 110;

    // Prefill graphic
    ctx.strokeStyle = "rgba(191,0,255,0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 55, 35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(0,245,255,0.4)";
    ctx.beginPath();
    ctx.moveTo(10, 20);
    ctx.bezierCurveTo(canvas.width / 3, 100, (canvas.width / 3) * 2, 10, canvas.width - 10, 80);
    ctx.stroke();
  }, []);

  // Bot random sketching vector simulator to mimic multi-user draw
  useEffect(() => {
    const timer = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const randomColors = ["rgba(0,245,255,0.45)", "rgba(191,0,255,0.45)", "rgba(255,255,255,0.2)"];
      const botStrokeColor = randomColors[Math.floor(Math.random() * randomColors.length)];

      ctx.strokeStyle = botStrokeColor;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const x2 = x1 + (Math.random() - 0.5) * 50;
      const y2 = y1 + (Math.random() - 0.5) * 50;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const botNames = ["Nova_Sync", "Grid_Vector", "Hex_Pointer", "Cyber_Draft"];
      const chosenBot = botNames[Math.floor(Math.random() * botNames.length)];
      setBotsList((prev) => [
        `TRANSMIT: ${chosenBot} updated coordinate [X:${Math.round(x2)} Y:${Math.round(y2)}]`,
        ...prev.slice(0, 2)
      ]);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getEventCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    // Mouse check
    if ("clientX" in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    } else {
      // Touch check
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getEventCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getEventCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#00f5ff] font-bold">VERTEX SYNC CANVAS</span>
        <span className="font-mono text-[9px] text-[#7986a0]">MULTIPLAYER ACTIVE</span>
      </div>

      {/* Drawing controls */}
      <div className="grid grid-cols-12 gap-2 items-center">
        {/* Colors Palette */}
        <div className="col-span-5 flex items-center gap-1.5">
          {["#00f5ff", "#bf00ff", "#ffffff", "#10b981", "#fbbf24"].map((col) => (
            <button
              key={col}
              onClick={() => setBrushColor(col)}
              style={{ backgroundColor: col }}
              className={`w-4 h-4 rounded-full border border-black/30 cursor-pointer transition-transform ${
                brushColor === col ? "scale-140 ring-1 ring-[#00f5ff]" : ""
              }`}
              title={col}
            />
          ))}
        </div>

        {/* Thickness slider */}
        <div className="col-span-5 flex items-center space-x-1">
          <Paintbrush size={10} className="text-[#7986a0]" />
          <input
            type="range"
            min="1"
            max="12"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#bf00ff]"
          />
        </div>

        {/* Clear hook */}
        <div className="col-span-2 text-right">
          <button
            onClick={clearCanvas}
            className="px-2 py-1 bg-white/5 text-xxs font-mono uppercase hover:bg-rose-500/20 text-[#7986a0] hover:text-rose-400 border border-white/10 hover:border-rose-500/20 rounded cursor-pointer transition-colors"
          >
            clear
          </button>
        </div>
      </div>

      {/* Real Canvas interactive screen */}
      <div className="bg-black/40 rounded-lg border border-[#bf00ff]/15 p-1 flex items-center justify-center relative select-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={drawMove}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={drawMove}
          onTouchEnd={stopDraw}
          className="w-full h-[110px] cursor-crosshair touch-none rounded bg-[#060613]"
        />
        <div className="absolute bottom-1 right-2 pointer-events-none font-mono text-[7px] text-white/20 uppercase tracking-widest">
          DRAW DEVICE SCREEN TO COLLABORATE
        </div>
      </div>

      {/* Active multi-user telemetry stream logs */}
      <div className="bg-black/60 border border-white/5 rounded p-2 flex flex-col space-y-0.5 max-h-[50px] overflow-y-auto select-none font-mono text-[8px] text-[#7986a0]">
        {botsList.map((msg, index) => (
          <div key={index} className="truncate">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   MAIN CONTAINER COMPONENT: Projects/Portfolio Section
   ------------------------------------------------------------- */
interface ProjectCardProps {
  project: ProjectEntryWithSim;
  index: number;
  onOpenShowcase: (project: ProjectEntryWithSim) => void;
  key?: number;
}

function ProjectCard({ project, index, onOpenShowcase }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  // Handle CSS 3D Tilt parameters
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const maxDelta = 12; // degree limitation
    const rY = (mouseX / (width / 2)) * maxDelta;
    const rX = -(mouseY / (height / 2)) * maxDelta;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenShowcase(project)}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
          transition: "transform 0.1s ease-out",
        }}
        className="glass-panel rounded-2xl overflow-hidden hover:shadow-[0_0_35px_rgba(0,245,255,0.14)] relative group flex flex-col h-full bg-[#050510]/80 border border-white/5 hover:border-[#00f5ff]/40 transition-all duration-300 cursor-pointer"
      >
        {/* Generative project visual block */}
        <div 
          className="w-full h-48 relative overflow-hidden"
          style={{ background: project.image }}
        >
          {/* Cyber code grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="absolute top-3 left-3 bg-[#050510]/75 border border-[#00f5ff]/20 px-2.5 py-1 rounded font-mono text-[9px] text-[#00f5ff] tracking-widest flex items-center gap-1.5 uppercase select-none">
            <Terminal size={10} />
            LEDGER_SCT_0{index + 1}
          </div>

          {/* Quick interactive action trigger prompt on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-20">
            <span className="p-3.5 rounded-full bg-[#00f5ff] text-black shadow-[0_0_15px_#00f5ff] transition-transform duration-300 group-hover:scale-110">
              <Play size={18} fill="currentColor" />
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#00f5ff] uppercase font-bold mt-1">OPEN SIMULATOR TERMINAL</span>
          </div>
        </div>

        {/* Card Details Body */}
        <div className="p-6 flex flex-col flex-grow relative">
          
          {/* Tech tags list */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="font-mono text-[9px] font-semibold text-[#7986a0] bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded uppercase hover:border-[#00f5ff]/20 hover:text-white transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <h4 className="font-display text-lg font-bold text-white mb-2 uppercase group-hover:text-[#00f5ff] transition-colors">
            {project.title}
          </h4>

          <p className="font-sans text-xs leading-relaxed text-[#7986a0] flex-grow mb-6">
            {project.description}
          </p>

          {/* Prompt action label inside card */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
            <span className="font-mono text-[9px] text-[#7986a0] tracking-widest uppercase">
              SECTOR_ONLINE
            </span>
            <span className="font-display text-[9px] font-extrabold text-[#00f5ff] tracking-widest flex items-center gap-1 group-hover:gap-2 uppercase transition-all">
              RUN TERMINAL
              <span className="text-[#bf00ff] group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<CategoryType>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectEntryWithSim | null>(null);

  // Filter list based on selected category toolbar tab
  const filteredProjects = activeFilter === "all" 
    ? EXTENDED_PROJECTS 
    : EXTENDED_PROJECTS.filter((p) => p.category === activeFilter);

  const handleOpenShowcase = (project: ProjectEntryWithSim) => {
    setSelectedProject(project);
    // Halt page scrolling behind the active overlay modal
    document.body.style.overflow = "hidden";
  };

  const handleCloseShowcase = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section id="projects" className="relative w-full py-24 bg-[#050510]">
      {/* Background glowing absolute lights */}
      <div className="absolute top-[30%] right-[-10%] w-80 h-80 bg-[#00f5ff]/3 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-80 h-80 bg-[#bf00ff]/3 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-display font-medium text-[#7986a0] text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
            04 / EXPERIMENTAL WORK
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-normal uppercase relative pb-4">
            FEATURED PORTFOLIO
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full shadow-[0_0_10px_#00f5ff]" />
          </h3>
        </div>

        {/* Categorized Filter Tabs Toolbar */}
        <div className="flex flex-wrap justify-center mb-12 gap-2 sm:gap-3">
          {[
            { id: "all", label: "Show All" },
            { id: "fintech", label: "Cryptographics" },
            { id: "design", label: "UX & Prototyping" },
            { id: "collab", label: "Realtime Draw" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as CategoryType)}
              className={`px-4 py-2 rounded-lg font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === tab.id
                  ? "bg-white/5 border border-[#00f5ff]/40 text-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.1)]"
                  : "text-[#7986a0] border border-transparent hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3-Column dynamic projects mapping grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              onOpenShowcase={handleOpenShowcase}
            />
          ))}
        </motion.div>
      </div>

      {/* FULL-SCREEN SHOWCASE MODAL OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseShowcase}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Glassmorphic Project details center card */}
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#050510]/95 border border-[#00f5ff]/30 shadow-[0_0_50px_rgba(0,245,255,0.15)] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-heavy p-6 sm:p-8 relative z-10 flex flex-col md:grid md:grid-cols-12 gap-8"
            >
              {/* Sci-Fi Decorative Corners */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00f5ff] rounded-tl pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#bf00ff] rounded-tr pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#bf00ff] rounded-bl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00f5ff] rounded-br pointer-events-none" />

              {/* Close Overlay Absolute Action */}
              <button
                onClick={handleCloseShowcase}
                className="absolute top-4 right-4 text-[#7986a0] hover:text-[#00f5ff] hover:scale-110 active:scale-95 transition-all p-1 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer z-30"
                aria-label="Close terminal showcase"
              >
                <X size={20} />
              </button>

              {/* SECTION LEFT (Cols 1-6): Information & direct outgoing profile */}
              <div className="col-span-12 md:col-span-6 flex flex-col justify-between space-y-6">
                
                <div>
                  {/* Category breadcrumb mapping */}
                  <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded font-mono text-[9px] text-[#bf00ff] uppercase tracking-wider mb-4">
                    <Activity size={10} />
                    SYSTEM_LINK // {selectedProject.category}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2">
                    {selectedProject.title}
                  </h3>

                  {/* Descriptions */}
                  <p className="font-sans text-xs leading-relaxed text-[#7986a0] mb-6 whitespace-pre-line">
                    {selectedProject.fullDesc}
                  </p>

                  {/* List of features */}
                  <span className="font-mono text-[10px] tracking-widest text-[#00f5ff] uppercase block mb-3 font-semibold">
                    Core Specifications
                  </span>
                  <ul className="space-y-2 mb-6 text-left">
                    {selectedProject.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start text-xs font-sans text-[#7986a0]">
                        <span className="text-[#bf00ff] mr-2 text-shadow-glow">✦</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct External Target Actions buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <a
                    href={selectedProject.demoUrl}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#00a8cd] text-black font-display font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] cursor-pointer text-center flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ExternalLink size={13} />
                    Visit Live Site
                  </a>
                  <a
                    href={selectedProject.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-transparent hover:bg-white/5 border border-[#bf00ff]/30 hover:border-[#bf00ff] text-white font-display font-bold text-xs tracking-widest uppercase cursor-pointer text-center flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Github size={13} className="text-[#bf00ff]" />
                    View Repository
                  </a>
                </div>
              </div>

              {/* SECTION RIGHT (Cols 7-12): Live Sandbox Sandbox Simulators */}
              <div className="col-span-12 md:col-span-6 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
                <div className="bg-[#050510]/90 border border-white/5 p-5 rounded-2xl relative shadow-2xl">
                  {/* Glowing background grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#150030_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />
                  
                  {/* Select corresponding sandbox wrapper */}
                  {selectedProject.category === "fintech" && <LedgerSimulator />}
                  {selectedProject.category === "design" && <AeroFormSimulator />}
                  {selectedProject.category === "collab" && <VertexSimulator />}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
