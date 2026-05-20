/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Settings, 
  Check, 
  ExternalLink,
  Smartphone,
  Info,
  Phone,
  Linkedin
} from "lucide-react";
import { PERSONAL_INFO } from "../data";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("919074319013"); // default realistic Indian country code placeholder
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [inputNumber, setInputNumber] = useState("919074319013");
  const [badgeAnimated, setBadgeAnimated] = useState(true);

  // Suggested quick-prompt chips
  const suggestions = [
    "Hey! I'd love to discuss a project with you.",
    "I saw your portfolio and want to check your availability.",
    "Operational check: dynamic dashboard is awesome!"
  ];

  // Load custom number from localStorage if it exists
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_whatsapp_node");
    if (saved) {
      setWhatsappNumber(saved);
      setInputNumber(saved);
    }
  }, []);

  const saveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    // Clean number (remove non-digits or plus)
    const cleaned = inputNumber.replace(/[^\d]/g, "");
    if (cleaned.length >= 8) {
      setWhatsappNumber(cleaned);
      localStorage.setItem("portfolio_whatsapp_node", cleaned);
      setIsConfiguring(false);
    } else {
      alert("Please enter a valid international number with country code (e.g., 919000000000)");
    }
  };

  const handleSend = () => {
    const encodedMsg = encodeURIComponent(message || "Hello!");
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-uplink" className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex items-center gap-3">
      
      {/* Popover drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 25, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 25, scale: 0.92 }}
            transition={{ type: "spring", damping: 20, stiffness: 220 }}
            className="w-[290px] md:w-[320px] bg-[#050510]/95 border border-emerald-500/30 shadow-[0_0_35px_rgba(16,185,129,0.15)] rounded-2xl glass-panel-heavy overflow-hidden z-20"
          >
            {/* Header Status Bar */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-emerald-400 font-display font-semibold text-xs font-mono">WA</span>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border border-[#050510] animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest">
                    UPLINK STATION
                  </h4>
                  <span className="font-mono text-[8px] text-[#7986a0] block tracking-normal">
                    CHAT_SECURE_NODE : {whatsappNumber}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsConfiguring(!isConfiguring)}
                className="text-[#7986a0] hover:text-emerald-400 transition-colors p-1 bg-white/5 hover:bg-emerald-500/10 rounded cursor-pointer"
                title="Configure connection settings"
              >
                <Settings size={14} />
              </button>
            </div>

            {/* Dynamic settings or message panel */}
            <div className="p-4 flex flex-col space-y-3 min-h-[180px]">
              {isConfiguring ? (
                <form onSubmit={saveConfig} className="space-y-3 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[#7986a0] uppercase flex items-center gap-1">
                      <Smartphone size={10} />
                      Uplink Target Config
                    </span>
                    <p className="font-sans text-[10px] text-[#7986a0] leading-snug">
                      Set your active WhatsApp line. Must include international country code, no symbols or spaces.
                    </p>
                    <input
                      type="text"
                      value={inputNumber}
                      onChange={(e) => setInputNumber(e.target.value)}
                      placeholder="e.g. 919000000000"
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsConfiguring(false)}
                      className="flex-1 py-1.5 rounded bg-white/5 text-[10px] font-mono text-white/70 hover:bg-white/10 uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-1.5 rounded bg-emerald-500 text-black text-[10px] font-mono font-bold hover:bg-emerald-400 uppercase cursor-pointer"
                    >
                      Save Target
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Suggestions block picker */}
                  <span className="font-mono text-[8px] text-[#7986a0] uppercase tracking-wider block">
                    ⚡ Quick transmission triggers
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMessage(sug)}
                        className="p-2 text-left bg-white/[0.02] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/20 rounded-lg text-[10.5px] font-sans text-[#7986a0] hover:text-white transition-all duration-200 cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>

                  {/* Manual free text input */}
                  <div className="space-y-1.5 pt-2">
                    <span className="font-mono text-[8px] text-[#7986a0] uppercase tracking-wider block">
                      Custom Message
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Transmission text matrix content..."
                      rows={2}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 font-sans text-xs text-white placeholder-white/30 focus:border-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit payload */}
                  <button
                    onClick={handleSend}
                    className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] text-black font-display font-black text-[10.5px] tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    <Send size={11} />
                    Open Chat Channel
                  </button>
                </>
              )}
            </div>

            {/* Micro security notification footer element */}
            <div className="bg-black/40 px-4 py-2 border-t border-white/5 flex items-center justify-between text-[#7986a0] font-mono text-[8px]">
              <span className="flex items-center gap-1 uppercase select-none">
                <Info size={8} /> Node is Sandbox-Secure
              </span>
              <span className="text-emerald-500/70 select-none">ONLINE_CHNL</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual launcher vertical stack HUD */}
      <div className="flex flex-col items-center gap-3">
        {/* Phone Call (Just Above WhatsApp) */}
        <a
          href={`tel:${PERSONAL_INFO.phone}`}
          className="h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.6)] cursor-pointer active:scale-95 border border-transparent transition-all duration-300 relative group"
          title="Call Coordinator"
          aria-label="Call Ravi Jatav"
        >
          <Phone size={18} />
          {/* Tooltip to the left */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#050510]/95 border border-cyan-500/30 font-mono text-[9px] text-cyan-400 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100 shadow-[0_0_15px_rgba(0,0,0,0.6)]">
            Call: {PERSONAL_INFO.phone}
          </span>
        </a>

        {/* WhatsApp Button (In the middle) */}
        <div className="relative group">
          {/* Continuous ambient pulse ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10" />
          
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setBadgeAnimated(false);
            }}
            className={`h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 border ${
              isOpen 
                ? "bg-[#050510] border-emerald-500 text-emerald-400 rotate-90" 
                : "bg-emerald-500 hover:bg-emerald-400 border-transparent text-black hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
            }`}
            title="WhatsApp Uplink Channels"
            aria-label="Toggle WhatsApp integration hub"
          >
            {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
          </button>

          {/* Tooltip to the left */}
          {!isOpen && (
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#050510]/95 border border-emerald-500/30 font-mono text-[9px] text-emerald-400 uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100 shadow-[0_0_15px_rgba(0,0,0,0.6)]">
              Send WhatsApp Message
            </span>
          )}

          {/* Dynamic status pip indicator */}
          {!isOpen && (
            <span className="absolute top-0 right-0 h-3 w-3 bg-rose-500 rounded-full border-2 border-[#050510] flex items-center justify-center">
              <span className="h-1 w-1 bg-white rounded-full animate-ping" />
            </span>
          )}
        </div>

        {/* LinkedIn Link (Just Below WhatsApp) */}
        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noreferrer"
          className="h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center bg-[#bf00ff] hover:bg-[#d85cff] text-white shadow-[0_0_15px_rgba(191,0,255,0.3)] hover:shadow-[0_0_22px_rgba(191,0,255,0.6)] cursor-pointer active:scale-95 border border-transparent transition-all duration-300 relative group"
          title="Connect on LinkedIn"
          aria-label="Open LinkedIn Profile"
        >
          <Linkedin size={18} />
          {/* Tooltip to the left */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-[#050510]/95 border border-[#bf00ff]/30 font-mono text-[9px] text-[#bf00ff] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100 shadow-[0_0_15px_rgba(0,0,0,0.6)]">
            LinkedIn Profile
          </span>
        </a>
      </div>

    </div>
  );
}
