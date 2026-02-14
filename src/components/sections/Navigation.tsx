"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Terminal, Activity, Circle, Menu, X, Cpu, 
  Home, User, Code2, Briefcase, FolderGit2, 
  Building2, GraduationCap, Mail
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#", icon: Home, shortcut: "1" },
  { name: "About", href: "#about", icon: User, shortcut: "2" },
  { name: "Skills", href: "#skills", icon: Code2, shortcut: "3" },
  { name: "Experience", href: "#experience", icon: Briefcase, shortcut: "4" },
  { name: "Projects", href: "#projects", icon: FolderGit2, shortcut: "5" },
  { name: "Companies", href: "#companies", icon: Building2, shortcut: "6" },
  { name: "Education", href: "#education", icon: GraduationCap, shortcut: "7" },
  { name: "Contact", href: "#contact", icon: Mail, shortcut: "8" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace("#", "")).filter(Boolean);
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 z-50"
        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
      />

      {/* Main Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#040810]/80 backdrop-blur-xl border-b border-cyan-900/20" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Brand */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#");
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              {/* System Status Indicator */}
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="hidden sm:block">
                <div className="font-mono text-sm font-semibold text-white">
                  mohammed<span className="text-cyan-400">.dev</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Activity className="w-3 h-3" />
                  <span>system active</span>
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "") || 
                  (item.href === "#" && activeSection === "");
                
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm transition-all ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Keyboard shortcut hint */}
                    <span className="text-xs text-slate-600">{item.shortcut}</span>
                    
                    <span>{item.name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Right Side - Status & Actions */}
            <div className="flex items-center gap-3">
              {/* System Status */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-cyan-900/30 rounded-lg">
                <motion.div
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-mono text-slate-400">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 bg-slate-900/60 border border-cyan-900/30 rounded-lg text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#0a1420] border-l border-cyan-900/30 p-6 pt-20"
            >
              {/* Menu Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-900/30">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm text-slate-400">navigation.json</span>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "") || 
                    (item.href === "#" && activeSection === "");
                  
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                        isActive
                          ? "bg-cyan-500/10 border border-cyan-500/20 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      <span className="ml-auto text-xs text-slate-600">{item.shortcut}</span>
                    </motion.a>
                  );
                })}
              </nav>

              {/* System Status */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60 border border-cyan-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs font-mono text-slate-400">System Active</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
