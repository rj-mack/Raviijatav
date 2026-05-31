import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavBarProps {
  activeSection: string;
}

export default function NavBar({ activeSection }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor page scroll to render subtle border-bottom glow & detect heights
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "WorkExperince", href: "#experience", id: "experience" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
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
    <header
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#050510]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-[#00f5ff]/20"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Stylized Logo Initials with Glow */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-2 font-display text-xl font-black tracking-widest text-[#e8eaf6] hover:text-[#00f5ff] transition-colors relative group text-left cursor-pointer"
        >
          <span className="text-[#00f5ff] border border-[#00f5ff]/40 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(0,245,255,0.2)] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] transition-all duration-300">
            R
          </span>
          <span className="text-white group-hover:text-[#bf00ff] transition-colors duration-300">
            J
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative font-display text-sm tracking-widest font-semibold transition-all duration-300 uppercase cursor-pointer hover:text-[#00f5ff] ${
                  isActive ? "text-[#00f5ff] font-bold" : "text-[#7986a0]"
                }`}
              >
                {item.label}
                {/* Active Indicator Underline using Framer Motion */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#bf00ff]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Hamburger Menu Icon for Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#7986a0] hover:text-[#00f5ff] focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Slide-In Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-sm z-30 md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-[56px] bottom-0 w-3/4 max-w-sm bg-[#050510]/95 border-l border-[#00f5ff]/20 p-8 z-30 md:hidden flex flex-col space-y-6 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
            >
              <div className="flex flex-col space-y-6 pt-6">
                {menuItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left font-display text-lg tracking-widest font-semibold py-2 border-b border-[rgba(255,255,255,0.03)] uppercase cursor-pointer ${
                        isActive
                          ? "text-[#00f5ff] font-bold border-b-[#00f5ff]/40 shadow-sm"
                          : "text-[#7986a0]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-auto pt-8 border-t border-white/5 flex flex-col space-y-3">
                <span className="font-mono text-xxs tracking-widest text-[#7986a0]">
                  SYSTEM PROTOCOL v2.0.26
                </span>
                <span className="text-xs text-[#7986a0]">
                  Ravi Jatav Quantum Portfolio
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
