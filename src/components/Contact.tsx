/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldAlert, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const validate = (): boolean => {
    const freshErrors: FormErrors = {};
    if (!fields.name.trim()) freshErrors.name = "Identification signature required.";
    
    // Simple email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.trim()) {
      freshErrors.email = "Communication link address required.";
    } else if (!emailRegex.test(fields.email)) {
      freshErrors.email = "Invalid system address protocol scheme.";
    }

    if (!fields.subject.trim()) freshErrors.subject = "Subject description required.";
    if (!fields.message.trim()) {
      freshErrors.message = "Message logs segment cannot be empty.";
    } else if (fields.message.length < 10) {
      freshErrors.message = "Message log too short. Minimum 10 characters.";
    }

    setErrors(freshErrors);
    return Object.keys(freshErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const update = { ...prev };
        delete update[name as keyof FormErrors];
        return update;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate futuristic transmit processing over 1.8 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFields({ name: "", email: "", subject: "", message: "" });
      
      // Auto reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1800);
  };

  const infoItems = [
    {
      icon: <Mail className="text-[#00f5ff]" size={18} />,
      label: "Main System Uplink",
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`
    },
    {
      icon: <Phone className="text-[#bf00ff]" size={18} />,
      label: "Secure Channel Call",
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`
    },
    {
      icon: <MapPin className="text-[#00f5ff]" size={18} />,
      label: "Base Coordinates",
      value: PERSONAL_INFO.location,
      href: null
    }
  ];

  const socialLinks = [
    { icon: <Github size={18} />, href: PERSONAL_INFO.github, hoverColor: "hover:text-[#00f5ff] hover:border-[#00f5ff]/40 hover:shadow-[0_0_12px_rgba(0,245,255,0.4)]" },
    { icon: <Linkedin size={18} />, href: PERSONAL_INFO.linkedin, hoverColor: "hover:text-[#00f5ff] hover:border-[#00f5ff]/40 hover:shadow-[0_0_12px_rgba(0,245,255,0.4)]" },
    { icon: <Twitter size={18} />, href: PERSONAL_INFO.twitter, hoverColor: "hover:text-[#bf00ff] hover:border-[#bf00ff]/40 hover:shadow-[0_0_12px_rgba(191,0,255,0.4)]" },
    { icon: <Instagram size={18} />, href: PERSONAL_INFO.instagram, hoverColor: "hover:text-[#bf00ff] hover:border-[#bf00ff]/40 hover:shadow-[0_0_12px_rgba(191,0,255,0.4)]" }
  ];

  return (
    <section id="contact" className="relative w-full py-24 bg-[#050510] overflow-hidden">
      {/* Decorative absolute lights */}
      <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-[#00f5ff]/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-[#bf00ff]/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="font-display font-medium text-[#7986a0] text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
            05 / TRANSMIT PROTOCOL
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-normal uppercase relative pb-4">
            CONNECT INTERFACE
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] rounded-full shadow-[0_0_10px_#00f5ff]" />
          </h3>
        </div>

        {/* Content Split Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column Left: Contact info details */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="p-1 rounded bg-white/[0.01]">
              <div className="flex items-center gap-2 mb-4 font-mono text-xs tracking-widest text-[#00f5ff]">
                <MessageSquare size={14} />
                <span className="uppercase">SYSTEM CHANNELS</span>
              </div>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#7986a0]">
                Feel free to trigger a direct transmission link. Whether looking to establish collaborative cloud operations or run custom visual pipelines, my queues are receptive.
              </p>
            </div>

            {/* Structured Detail Cards */}
            <div className="flex flex-col space-y-4">
              {infoItems.map((item, idx) => {
                const inner = (
                  <div className="flex items-center space-x-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-[#bf00ff]/20 hover:shadow-[0_0_15px_rgba(191,0,255,0.04)] hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[9px] tracking-widest text-[#7986a0] uppercase">
                        {item.label}
                      </span>
                      <span className="font-sans text-sm font-semibold text-white truncate break-all">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={idx} href={item.href} className="block group">
                    {inner}
                  </a>
                ) : (
                  <div key={idx}>{inner}</div>
                );
              })}
            </div>

            {/* Social Links Subgroup */}
            <div className="flex flex-col space-y-3 pt-4">
              <span className="font-mono text-[9px] tracking-widest text-[#7986a0] uppercase">SECURE_SOCIAL_NETS</span>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-[#7986a0] bg-white/[0.01] border border-white/5 cursor-pointer transition-all duration-300 ${social.hoverColor}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column Right: Validated Input Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel relative bg-[#050510]/60">
            {/* Cyber accents corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f5ff]/30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#bf00ff]/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#bf00ff]/30 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f5ff]/30 pointer-events-none" />

            {/* Active Submit Success Banner */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-300 font-mono text-xs tracking-wider flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>DATA INGEST SUCCESSFUL: Telemetry transmission safely logged to system.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Field: Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={fields.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 bg-white/[0.01] border ${
                      errors.name ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-[#00f5ff]"
                    } focus:bg-white/[0.03] text-white rounded-lg outline-none font-sans text-sm transition-all duration-300 placeholder-transparent`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3.5 origin-[0] -translate-y-4 scale-75 transform text-xs text-[#7986a0] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#00f5ff] uppercase font-mono tracking-widest select-none bg-[#050510] px-1 pointer-events-none"
                  >
                    IDENT_NAME
                  </label>
                  {errors.name && (
                    <span className="flex items-center gap-1.5 mt-1.5 font-mono text-[9px] text-rose-400 uppercase">
                      <ShieldAlert size={10} />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Field: Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={fields.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 bg-white/[0.01] border ${
                      errors.email ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-[#00f5ff]"
                    } focus:bg-white/[0.03] text-white rounded-lg outline-none font-sans text-sm transition-all duration-300 placeholder-transparent`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3.5 origin-[0] -translate-y-4 scale-75 transform text-xs text-[#7986a0] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#00f5ff] uppercase font-mono tracking-widest select-none bg-[#050510] px-1 pointer-events-none"
                  >
                    EMAIL_ADDR
                  </label>
                  {errors.email && (
                    <span className="flex items-center gap-1.5 mt-1.5 font-mono text-[9px] text-rose-400 uppercase">
                      <ShieldAlert size={10} />
                      {errors.email}
                    </span>
                  )}
                </div>

              </div>

              {/* Field: Subject */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={fields.subject}
                  onChange={handleInputChange}
                  placeholder=" "
                  className={`peer w-full px-4 py-3 bg-white/[0.01] border ${
                    errors.subject ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-[#00f5ff]"
                  } focus:bg-white/[0.03] text-white rounded-lg outline-none font-sans text-sm transition-all duration-300 placeholder-transparent`}
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-3.5 origin-[0] -translate-y-4 scale-75 transform text-xs text-[#7986a0] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#00f5ff] uppercase font-mono tracking-widest select-none bg-[#050510] px-1 pointer-events-none"
                >
                  TRANSMIT_SUBJECT
                </label>
                {errors.subject && (
                  <span className="flex items-center gap-1.5 mt-1.5 font-mono text-[9px] text-rose-400 uppercase">
                    <ShieldAlert size={10} />
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Field: Message Box */}
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={fields.message}
                  onChange={handleInputChange}
                  placeholder=" "
                  className={`peer w-full px-4 py-3 bg-white/[0.01] border ${
                    errors.message ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-[#00f5ff]"
                  } focus:bg-white/[0.03] text-white rounded-lg outline-none font-sans text-sm transition-all duration-300 placeholder-transparent resize-none`}
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3.5 origin-[0] -translate-y-4 scale-75 transform text-xs text-[#7986a0] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#00f5ff] uppercase font-mono tracking-widest select-none bg-[#050510] px-1 pointer-events-none"
                >
                  LOGS_BODY
                </label>
                {errors.message && (
                  <span className="flex items-center gap-1.5 mt-1.5 font-mono text-[9px] text-rose-400 uppercase">
                    <ShieldAlert size={10} />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Form submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-[#00f5ff] to-[#bf00ff] text-black font-display font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>TRANSMITTING DATA STREAM...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>TRANSMIT SYSTEM FEEDBACK</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
