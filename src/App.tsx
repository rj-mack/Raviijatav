/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section scrolls in real-time
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "about", "skills", "education", "contact"];
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-25% 0px -60% 0px", // Trigger when element is near page focus center
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (el) observer.unobserve(el);
      });
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div id="quantum-workspace" className="relative bg-[#050510] text-[#e8eaf6] selection:bg-[#00f5ff]/35 selection:text-white min-h-screen">
          {/* Cybernetic Scanline Matrix filter */}
          <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] z-50 pointer-events-none opacity-30 select-none" />
          
          {/* Glowing Header HUD */}
          <NavBar activeSection={activeSection} />

          {/* Core Visual Page Layout Stream */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Education />
            <Projects />
            <Contact />
          </main>

          {/* Secure Base Footer */}
          <Footer />

          {/* Persistent WhatsApp Floating Communication Unit */}
          <WhatsAppWidget />
        </div>
      )}
    </>
  );
}
