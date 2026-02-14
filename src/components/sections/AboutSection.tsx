"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Code, Brain, Shield, Calculator, Sparkles, Cpu, Database, Network, Zap } from "lucide-react";

// ============================================
// LIVING SYSTEM BACKGROUND
// Simulates a computational system with neural networks,
// data flow, and algorithmic execution paths
// ============================================

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  activation: number;
  targetActivation: number;
  layer: number;
  connections: number[];
  pulsePhase: number;
}

interface DataParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  size: number;
  opacity: number;
  pathIndex: number;
}

interface ExecutionPath {
  points: { x: number; y: number }[];
  progress: number;
  active: boolean;
  width: number;
}

const AboutSection = () => {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // System state refs for performance
  const nodesRef = useRef<NeuralNode[]>([]);
  const particlesRef = useRef<DataParticle[]>([]);
  const pathsRef = useRef<ExecutionPath[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const timeRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Initialize the living system
  const initializeSystem = useCallback((width: number, height: number) => {
    dimensionsRef.current = { width, height };
    
    // Create neural network nodes in layers
    const layers = 4;
    const nodesPerLayer = Math.max(4, Math.min(8, Math.floor(width / 200)));
    nodesRef.current = [];
    
    for (let layer = 0; layer < layers; layer++) {
      const layerX = (width / (layers + 1)) * (layer + 1);
      for (let i = 0; i < nodesPerLayer; i++) {
        const y = (height / (nodesPerLayer + 1)) * (i + 1);
        nodesRef.current.push({
          x: layerX + (Math.random() - 0.5) * 60,
          y: y + (Math.random() - 0.5) * 40,
          vx: 0,
          vy: 0,
          radius: 4 + Math.random() * 3,
          activation: Math.random() * 0.3,
          targetActivation: Math.random() * 0.3,
          layer,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }
    
    // Create connections between adjacent layers
    const layerNodes = nodesRef.current.reduce((acc, node, idx) => {
      if (!acc[node.layer]) acc[node.layer] = [];
      acc[node.layer].push(idx);
      return acc;
    }, [] as number[][]);
    
    layerNodes.forEach((layer, layerIdx) => {
      if (layerIdx < layerNodes.length - 1) {
        layer.forEach(nodeIdx => {
          const nextLayer = layerNodes[layerIdx + 1];
          const connectionCount = Math.min(2, nextLayer.length);
          for (let i = 0; i < connectionCount; i++) {
            const targetIdx = nextLayer[Math.floor(Math.random() * nextLayer.length)];
            if (!nodesRef.current[nodeIdx].connections.includes(targetIdx)) {
              nodesRef.current[nodeIdx].connections.push(targetIdx);
            }
          }
        });
      }
    });
    
    // Initialize execution paths
    pathsRef.current = [];
    for (let i = 0; i < 3; i++) {
      const startX = Math.random() * width * 0.3;
      const startY = Math.random() * height;
      const points: { x: number; y: number }[] = [{ x: startX, y: startY }];
      
      const segments = 4 + Math.floor(Math.random() * 3);
      for (let j = 0; j < segments; j++) {
        points.push({
          x: startX + (width * 0.15) * (j + 1) + (Math.random() - 0.5) * 50,
          y: startY + (Math.random() - 0.5) * 150,
        });
      }
      
      pathsRef.current.push({
        points,
        progress: Math.random(),
        active: Math.random() > 0.5,
        width: 1 + Math.random(),
      });
    }
    
    // Initialize data particles
    particlesRef.current = [];
    for (let i = 0; i < 15; i++) {
      const pathIdx = Math.floor(Math.random() * pathsRef.current.length);
      const path = pathsRef.current[pathIdx];
      if (path && path.points.length > 0) {
        particlesRef.current.push({
          x: path.points[0].x,
          y: path.points[0].y,
          targetX: path.points[path.points.length - 1].x,
          targetY: path.points[path.points.length - 1].y,
          progress: Math.random(),
          speed: 0.0005 + Math.random() * 0.001,
          size: 2 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.4,
          pathIndex: pathIdx,
        });
      }
    }
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let width = 0;
    let height = 0;
    
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      initializeSystem(width, height);
    };
    
    resize();
    window.addEventListener("resize", resize);
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.vx = mouseRef.current.x - prevX;
      mouseRef.current.vy = mouseRef.current.y - prevY;
    };
    
    canvas.addEventListener("mousemove", handleMouseMove);
    
    // Color palette - night mode, engineered aesthetic
    const colors = {
      nodePrimary: "#0ea5e9",
      nodeSecondary: "#14b8a6",
      nodeTertiary: "#0891b2",
      dataFlow: "#22d3ee",
      executionPath: "#0891b2",
      accent: "#10b981",
    };
    
    const animate = () => {
      timeRef.current += 1;
      const time = timeRef.current;
      
      // Clear with gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, "#060d16");
      bgGradient.addColorStop(0.5, "#040a10");
      bgGradient.addColorStop(1, "#030712");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw grid
      ctx.strokeStyle = "rgba(14, 165, 233, 0.02)";
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Update and draw execution paths
      pathsRef.current.forEach((path, pathIdx) => {
        if (path.points.length < 2) return;
        
        path.progress += 0.002;
        if (path.progress > 1) {
          path.progress = 0;
          path.active = Math.random() > 0.3;
        }
        
        // Draw path
        ctx.strokeStyle = `rgba(8, 145, 178, ${path.active ? 0.15 : 0.05})`;
        ctx.lineWidth = path.width;
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.stroke();
        
        // Draw execution head
        if (path.active) {
          const totalLength = path.points.length - 1;
          const currentSegment = Math.floor(path.progress * totalLength);
          const segmentProgress = (path.progress * totalLength) % 1;
          
          if (currentSegment < path.points.length - 1) {
            const p1 = path.points[currentSegment];
            const p2 = path.points[currentSegment + 1];
            const x = p1.x + (p2.x - p1.x) * segmentProgress;
            const y = p1.y + (p2.y - p1.y) * segmentProgress;
            
            // Glow
            const glow = ctx.createRadialGradient(x, y, 0, x, y, 15);
            glow.addColorStop(0, "rgba(34, 211, 238, 0.4)");
            glow.addColorStop(0.5, "rgba(20, 184, 166, 0.2)");
            glow.addColorStop(1, "transparent");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.fillStyle = "#22d3ee";
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      
      // Update and draw data particles
      particlesRef.current.forEach((particle) => {
        const path = pathsRef.current[particle.pathIndex];
        if (!path || path.points.length < 2) return;
        
        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          particle.progress = 0;
          particle.pathIndex = Math.floor(Math.random() * pathsRef.current.length);
        }
        
        const totalLength = path.points.length - 1;
        const currentSegment = Math.floor(particle.progress * totalLength);
        const segmentProgress = (particle.progress * totalLength) % 1;
        
        if (currentSegment < path.points.length - 1) {
          const p1 = path.points[currentSegment];
          const p2 = path.points[currentSegment + 1];
          particle.x = p1.x + (p2.x - p1.x) * segmentProgress;
          particle.y = p1.y + (p2.y - p1.y) * segmentProgress;
        }
        
        // Mouse influence
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100 && dist > 0) {
          const influence = (1 - dist / 100) * 0.5;
          particle.x -= (dx / dist) * influence * 2;
          particle.y -= (dy / dist) * influence * 2;
        }
        
        // Draw particle
        const particleGlow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        particleGlow.addColorStop(0, `rgba(14, 165, 233, ${particle.opacity})`);
        particleGlow.addColorStop(1, "transparent");
        ctx.fillStyle = particleGlow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Update and draw neural network
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      
      // Draw connections
      nodes.forEach((node, idx) => {
        node.connections.forEach(targetIdx => {
          const target = nodes[targetIdx];
          if (!target) return;
          
          // Calculate midpoint for mouse influence
          const midX = (node.x + target.x) / 2;
          const midY = (node.y + target.y) / 2;
          const mouseDx = mouse.x - midX;
          const mouseDy = mouse.y - midY;
          const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
          const mouseInfluence = Math.max(0, 1 - mouseDist / 150);
          
          // Activation-based opacity
          const activation = (node.activation + target.activation) / 2;
          const opacity = 0.05 + mouseInfluence * 0.15 + activation * 0.1;
          
          ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
          ctx.lineWidth = 0.5 + mouseInfluence * 1.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
          
          // Draw data pulse along connection
          if (activation > 0.3 || mouseInfluence > 0.3) {
            const pulseProgress = (Math.sin(time * 0.01 + idx) + 1) / 2;
            const pulseX = node.x + (target.x - node.x) * pulseProgress;
            const pulseY = node.y + (target.y - node.y) * pulseProgress;
            
            ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(activation, mouseInfluence) * 0.5})`;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });
      
      // Draw and update nodes
      nodes.forEach((node) => {
        // Mouse influence on activation
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        node.targetActivation = Math.min(1, Math.max(0.1, 1 - dist / 150));
        node.activation += (node.targetActivation - node.activation) * 0.05;
        
        // Gentle oscillation
        const pulse = Math.sin(time * 0.002 + node.pulsePhase) * 0.15 + 0.85;
        const radius = node.radius * pulse * (1 + node.activation * 0.3);
        
        // Draw glow
        const glowRadius = radius * 6 * (1 + node.activation);
        const glow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        glow.addColorStop(0, `rgba(14, 165, 233, ${node.activation * 0.3})`);
        glow.addColorStop(0.5, `rgba(20, 184, 166, ${node.activation * 0.15})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw node
        ctx.fillStyle = `rgba(14, 165, 233, ${0.4 + node.activation * 0.5})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw highlight
        if (node.activation > 0.3) {
          ctx.fillStyle = `rgba(255, 255, 255, ${node.activation * 0.3})`;
          ctx.beginPath();
          ctx.arc(node.x - radius * 0.3, node.y - radius * 0.3, radius * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Draw mouse effect
      if (mouse.x > 0 && mouse.y > 0) {
        const velocity = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
        const glowSize = 80 + Math.min(velocity * 3, 40);
        
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, glowSize
        );
        mouseGlow.addColorStop(0, "rgba(14, 165, 233, 0.08)");
        mouseGlow.addColorStop(0.5, "rgba(20, 184, 166, 0.04)");
        mouseGlow.addColorStop(1, "transparent");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [initializeSystem]);

  const highlights = [
    {
      icon: Code,
      title: "Production Systems",
      description: "High-performance backend systems & distributed architectures",
      gradient: "from-cyan-500 to-teal-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400"
    },
    {
      icon: Brain,
      title: "AI/ML Research",
      description: "LLM evaluation & model reasoning analysis at Scale AI & Turing Enterprise Inc",
      gradient: "from-teal-500 to-emerald-500",
      bg: "bg-teal-500/10",
      border: "border-teal-500/20",
      text: "text-teal-400"
    },
    {
      icon: Shield,
      title: "AML/Compliance",
      description: "Enterprise-grade anti-money laundering & fraud detection systems",
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400"
    },
    {
      icon: Calculator,
      title: "Quantitative Rigor",
      description: "Applied mathematics, statistics, and formal proof verification",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400"
    },
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Living System Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
      
      {/* Gradient overlay for content readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 1,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent, rgba(4, 8, 16, 0.7)),
            linear-gradient(to bottom, rgba(4, 8, 16, 0.3), transparent, rgba(4, 8, 16, 0.5))
          `
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-full mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">System Profile</span>
            <motion.div
              className="w-2 h-2 bg-emerald-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              About
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent ml-3">
              Me
            </span>
          </h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-500" />
            <motion.div 
              className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-teal-500" />
          </motion.div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative group">
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 via-teal-500/20 to-emerald-500/30 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            <div className="relative bg-slate-900/70 backdrop-blur-2xl border border-cyan-500/10 rounded-2xl p-8 md:p-12 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/20 rounded-br-2xl" />
              
              {/* Animated corner accents */}
              <motion.div 
                className="absolute top-4 left-4 w-8 h-8"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Network className="w-full h-full text-cyan-500/30" />
              </motion.div>
              <motion.div 
                className="absolute bottom-4 right-4 w-8 h-8"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <Database className="w-full h-full text-teal-500/30" />
              </motion.div>
              
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                Backend Engineer with strong expertise in <span className="text-cyan-400 font-medium">Java</span> and <span className="text-cyan-400 font-medium">Python</span>, specializing in high-performance backend systems, distributed architectures, and production-grade APIs. Currently working as a <span className="text-emerald-400 font-medium">Software Development Engineer at Data Gear</span>, building enterprise-grade AML and compliance platforms. Proven experience in <span className="text-teal-400 font-medium">AI/LLM research engineering</span> at Scale AI and Turing Enterprise Inc, evaluating model reasoning quality, mathematical correctness, and robustness across academic levels. <span className="text-blue-400 font-medium">Specializing in advanced mathematics (Undergrad to PhD) supporting AI/ML research and alignment initiatives (SFT, RLHF, DBO, HLE)</span>. Solid background in applied mathematics, statistics, and formal reasoning, with hands-on experience in <span className="text-emerald-400 font-medium">Lean for proof verification</span>. Adept at building reliable, scalable systems and research-grade evaluation pipelines.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 rounded-2xl blur-xl transition-opacity duration-500`} />
              
              <div className={`relative ${item.bg} backdrop-blur-xl border ${item.border} rounded-2xl p-6 transition-all duration-300 group-hover:border-opacity-40 overflow-hidden`}>
                {/* Animated top line */}
                <motion.div 
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.gradient}`}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                />
                
                {/* Icon */}
                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg relative`}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <item.icon className="w-7 h-7 text-white relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
