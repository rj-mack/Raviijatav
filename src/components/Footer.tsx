import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { DEVELOPER_NAME } from "../data";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollHeight);
    return () => window.removeEventListener("scroll", checkScrollHeight);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleFooterLinkClick = (id: string) => {
    const element = document.getElementById(id);
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
    <footer className="relative w-full py-12 bg-[#050510] border-t border-white/5 overflow-hidden">
      {/* Subtle grid pattern background accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Core initials visual */}
        <button
          onClick={handleScrollToTop}
          className="w-10 h-10 mb-4 flex items-center justify-center border border-[#00f5ff]/40 hover:border-[#00f5ff] font-display text-base font-bold text-white bg-[#050510]/80 shadow-[0_0_10px_rgba(0,245,255,0.2)] hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all duration-300 rounded cursor-pointer"
        >
          RJ
        </button>

        {/* Short tech motto */}
        <p className="font-mono text-xxs tracking-[0.25em] text-[#7986a0] uppercase mb-8 text-center max-w-sm">
          HUMBLE DESIGNS // MATHEMATICALLY SECURED EXPERIENCES
        </p>

        {/* Navigation Map Repeated */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
          {[
            { label: "Home", id: "home" },
            { label: "About", id: "about" },
            { label: "Skills", id: "skills" },
            { label: "Education", id: "education" },
            { label: "Contact", id: "contact" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleFooterLinkClick(item.id)}
              className="font-display text-xxs tracking-widest text-[#7986a0] hover:text-[#00f5ff] uppercase transition-colors pointer-events-auto cursor-pointer font-semibold"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Trademark and details */}
        <p className="font-sans text-xxs tracking-wide text-[#7986a0] text-center">
          © 2026 {DEVELOPER_NAME}. Built with passion, styled in Dark Quantum.
        </p>
      </div>

      {/* Floating Scroll-To-Top button */}
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-8 right-8 z-30 w-11 h-11 rounded-lg bg-[#050510] border border-[#00f5ff]/30 hover:border-[#00f5ff] text-[#00f5ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-500 cursor-pointer ${
          showScroll ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-50 pointer-events-none"
        } group hover:rotate-360 hover:text-white hover:bg-white/5 hover:shadow-[0_0_20px_rgba(191,0,255,0.4)]`}
        aria-label="Scroll to system top"
      >
        <ArrowUp size={18} className="transition-transform group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}
