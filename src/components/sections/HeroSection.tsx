"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { 
  Download, Mail, Linkedin, MapPin, Phone, ChevronDown, 
  Terminal, Cpu, Zap, Code2, Braces, ArrowRight, GitBranch,
  Activity, Circle
} from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";

const typingTexts = [
  "Backend Engineer",
  "Java & Python Developer",
  "AI/ML Research Engineer",
  "Distributed Systems",
  "LLM Evaluation Expert"
];

const codeSymbols = ['{ }', '[ ]', '( )', '< />', '=>', '===', '&&', '||', '++', 'fn', 'async', 'await'];

// Generate stable random positions only on client
const generateFloatingElements = () => {
  if (typeof window === 'undefined') return [];
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    symbol: codeSymbols[i % codeSymbols.length],
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 3,
  }));
};

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Scroll-based parallax
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Mouse tracking for subtle interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Generate floating elements only on client
  const floatingElements = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return generateFloatingElements();
  }, []);

  // Client-side mount detection
  useEffect(() => {
    // Using requestAnimationFrame ensures this runs after hydration
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Typing animation - deterministic, precise
  useEffect(() => {
    const currentText = typingTexts[currentTextIndex];
    
    const runAnimation = () => {
      if (isTyping) {
        if (displayedText.length < currentText.length) {
          typingTimeoutRef.current = setTimeout(() => {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          }, 80);
        } else {
          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 2500);
        }
      } else {
        if (displayedText.length > 0) {
          typingTimeoutRef.current = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, 40);
        } else {
          // Move to next text using functional update to avoid dependency
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          setIsTyping(true);
        }
      }
    };
    
    runAnimation();
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [displayedText, isTyping, currentTextIndex]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) * 0.02);
      mouseY.set((e.clientY - centerY) * 0.02);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Mohammed_Nasser_CV.pdf";
    link.click();
  };

  const handleContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Floating code elements - parallax layer */}
      {mounted && floatingElements.length > 0 && (
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y, opacity }}
          aria-hidden="true"
        >
          {floatingElements.map((el) => (
            <motion.div
              key={el.id}
              className="absolute font-mono text-cyan-500/8 text-sm select-none"
              style={{
                left: `${el.left}%`,
                top: `${el.top}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.03, 0.1, 0.03],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
                ease: "easeInOut",
              }}
            >
              {el.symbol}
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Profile Photo - System Node Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: springX, y: springY }}
            className="relative"
          >
            {/* Outer orbital rings - representing system connections */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{ border: "1px solid rgba(14, 165, 233, 0.2)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-8 rounded-full"
              style={{ border: "1px dashed rgba(20, 184, 166, 0.15)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-12 rounded-full"
              style={{ border: "1px solid rgba(34, 211, 238, 0.1)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating tech nodes around the photo */}
            {[
              { Icon: Cpu, color: "#0ea5e9", delay: 0 },
              { Icon: Code2, color: "#14b8a6", delay: 0.2 },
              { Icon: Braces, color: "#0891b2", delay: 0.4 },
              { Icon: Zap, color: "#10b981", delay: 0.6 },
            ].map((tech, i) => (
              <motion.div
                key={i}
                className="absolute w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-700/30 flex items-center justify-center"
                style={{
                  top: `${Math.sin((i * Math.PI) / 2) * 130 + 130}px`,
                  left: `${Math.cos((i * Math.PI) / 2) * 130 + 130}px`,
                }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: tech.delay,
                  ease: "easeInOut",
                }}
              >
                <tech.Icon className="w-5 h-5" style={{ color: tech.color }} />
              </motion.div>
            ))}

            {/* Photo container */}
            <div className="relative w-64 h-64 lg:w-72 lg:h-72">
              {/* Background gradient glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-emerald-500/10 blur-2xl" />
              
              {/* Border gradient */}
              <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-cyan-500/40 via-teal-500/20 to-emerald-500/30">
                <div className="w-full h-full rounded-full bg-[#040810]" />
              </div>
              
              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#040810]">
                <Image
                  src="/images/profile.jpg"
                  alt="Mohammed Nasser Ibrahim"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Status indicator - System online */}
              <motion.div
                className="absolute bottom-2 right-2 flex items-center gap-2 px-3 py-1.5 bg-[#0a1420]/95 backdrop-blur-xl rounded-full border border-emerald-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-emerald-400 font-mono font-medium">online</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            {/* Terminal badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700/40 rounded-lg font-mono text-sm">
                <span className="text-slate-500">$</span>
                <span className="text-cyan-400">whoami</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-cyan-400"
                />
              </div>
            </motion.div>
            
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            >
              <span className="text-white">Mohammed Nasser</span>
              <br />
              <span className="text-gradient">Ibrahim</span>
            </motion.h1>

            {/* Typing Role - Code Editor Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 font-mono text-lg md:text-xl text-cyan-400 mb-3">
                <span className="text-slate-500">&gt;</span>
                <span>{displayedText}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-5 bg-cyan-400"
                />
              </div>
              <p className="text-base text-slate-400 max-w-lg leading-relaxed">
                Backend Engineer with strong expertise in Java and Python, specializing in high-performance backend systems, 
                distributed architectures, and production-grade APIs.
              </p>
            </motion.div>

            {/* Contact Info - Data Structure Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              {[
                { icon: MapPin, text: "Cairo, Egypt", color: "#0ea5e9" },
                { icon: Phone, text: "(+20) 01285575364", href: "tel:+201285575364", color: "#14b8a6" },
                { 
                  icon: Linkedin, 
                  text: "LinkedIn", 
                  href: "https://www.linkedin.com/in/mohammed-nasser-mohamed-nasser/",
                  color: "#0891b2"
                },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 border border-slate-700/30 rounded-lg text-slate-300 text-sm font-mono"
                >
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs - Primary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={handleContact}
                className="btn-primary flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Contact Me
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </motion.button>
              <motion.button
                onClick={handleDownloadCV}
                className="btn-secondary flex items-center justify-center gap-2 group font-mono"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
                ./download_cv
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - System prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center gap-2 font-mono text-xs">
            <GitBranch className="w-3 h-3" />
            <span className="uppercase tracking-widest">scroll to explore</span>
          </div>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
