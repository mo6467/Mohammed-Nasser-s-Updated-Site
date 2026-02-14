"use client";

import { useEffect, useRef, useCallback } from "react";

// ============================================
// AI/ML/AGI Computational System Background
// Living System - Engineered Intelligence
// Night-mode aesthetic with precise mouse logic
// ============================================

interface Vector2D {
  x: number;
  y: number;
}

interface NeuralNode {
  position: Vector2D;
  velocity: Vector2D;
  baseRadius: number;
  layerIndex: number;
  activation: number;
  targetActivation: number;
  connections: number[];
  phase: number;
}

interface DataStream {
  points: Vector2D[];
  progress: number;
  speed: number;
  intensity: number;
  width: number;
}

interface AlgorithmicParticle {
  position: Vector2D;
  velocity: Vector2D;
  char: string;
  opacity: number;
  size: number;
  drift: Vector2D;
}

interface CodePattern {
  position: Vector2D;
  pattern: string[];
  opacity: number;
  density: number;
  orientation: number;
}

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // System state - using refs for performance (no re-renders)
  const systemStateRef = useRef({
    time: 0,
    deltaTime: 0,
    lastFrameTime: 0,
    mouse: {
      current: { x: -1000, y: -1000 },
      previous: { x: -1000, y: -1000 },
      velocity: { x: 0, y: 0 },
      speed: 0,
      normalizedVelocity: { x: 0, y: 0 },
    },
    dimensions: { width: 0, height: 0 },
  });

  // Entity refs
  const nodesRef = useRef<NeuralNode[]>([]);
  const streamsRef = useRef<DataStream[]>([]);
  const particlesRef = useRef<AlgorithmicParticle[]>([]);
  const patternsRef = useRef<CodePattern[]>([]);

  // Night-mode color palette - Deep navy, charcoal, muted cyan
  const palette = {
    // Background layers
    bgDeep: "#050a14",
    bgNavy: "#0a1628",
    bgCharcoal: "#0f1c2e",
    bgMidnight: "#0d1829",
    
    // Accent colors - Muted, not neon
    cyan: "#0ea5e9",
    cyanMuted: "#0891b2",
    blue: "#3b82f6",
    blueMuted: "#2563eb",
    teal: "#14b8a6",
    slate: "#64748b",
    
    // Node activation colors
    activeHigh: "#22d3ee",
    activeMid: "#0891b2",
    activeLow: "#164e63",
    
    // Line/stream colors
    dataFlow: "#0ea5e9",
    connection: "#334155",
    
    // Utility
    white: "#f8fafc",
    transparent: "transparent",
  };

  // ============================================
  // SYSTEM INITIALIZATION
  // ============================================

  // Helper function to create a single data stream
  const createDataStream = useCallback((width: number, height: number, initial: boolean = false) => {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const points: Vector2D[] = [{ x: startX, y: startY }];
    
    // Create a path with 4-7 points
    const pointCount = 4 + Math.floor(Math.random() * 4);
    let currentX = startX;
    let currentY = startY;
    
    for (let i = 1; i < pointCount; i++) {
      currentX += (Math.random() - 0.5) * 300;
      currentY += (Math.random() - 0.5) * 200;
      points.push({ x: currentX, y: currentY });
    }

    streamsRef.current.push({
      points,
      progress: initial ? Math.random() : 0,
      speed: 0.0008 + Math.random() * 0.0012,
      intensity: 0.3 + Math.random() * 0.5,
      width: 1 + Math.random() * 1.5,
    });
  }, []);

  const initializeSystem = useCallback((width: number, height: number) => {
    const nodeDensity = Math.max(30, Math.min(60, Math.floor((width * height) / 25000)));
    
    // Initialize Neural Network Nodes
    nodesRef.current = [];
    for (let i = 0; i < nodeDensity; i++) {
      nodesRef.current.push({
        position: {
          x: Math.random() * width,
          y: Math.random() * height,
        },
        velocity: {
          x: (Math.random() - 0.5) * 0.15,
          y: (Math.random() - 0.5) * 0.15,
        },
        baseRadius: 1.5 + Math.random() * 2.5,
        layerIndex: Math.floor(Math.random() * 4),
        activation: Math.random() * 0.3,
        targetActivation: Math.random() * 0.3,
        connections: [],
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Create connections based on proximity
    const connectionRadius = Math.min(200, Math.max(120, width * 0.12));
    nodesRef.current.forEach((node, i) => {
      nodesRef.current.forEach((other, j) => {
        if (i !== j && node.connections.length < 4) {
          const dx = node.position.x - other.position.x;
          const dy = node.position.y - other.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionRadius) {
            node.connections.push(j);
          }
        }
      });
    });

    // Initialize Data Streams
    streamsRef.current = [];
    const streamCount = Math.max(8, Math.min(15, Math.floor(width / 150)));
    for (let i = 0; i < streamCount; i++) {
      createDataStream(width, height, true);
    }

    // Initialize Algorithmic Particles
    particlesRef.current = [];
    const codeChars = "01{}[]<>()=;:./\\|*+-#@$%&ΔΣλ∀∃∈∞≈≠→←↑↓";
    const particleCount = Math.max(25, Math.min(50, Math.floor(width / 40)));
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        position: {
          x: Math.random() * width,
          y: Math.random() * height,
        },
        velocity: {
          x: (Math.random() - 0.5) * 0.2,
          y: 0.2 + Math.random() * 0.4,
        },
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        opacity: 0.015 + Math.random() * 0.04,
        size: 10 + Math.random() * 6,
        drift: {
          x: (Math.random() - 0.5) * 0.1,
          y: 0,
        },
      });
    }

    // Initialize Code Patterns
    patternsRef.current = [];
    const patternCount = Math.max(4, Math.min(8, Math.floor(width / 250)));
    const codePatterns = [
      ["func", "()", "=>", "{"],
      ["const", "=", "[]", ";"],
      ["async", "await", "data"],
      ["if", "else", "return"],
      ["for", "let", "of"],
      ["class", "extends", "{"],
      ["import", "from", "'"],
      ["export", "default", "{}"],
    ];
    for (let i = 0; i < patternCount; i++) {
      patternsRef.current.push({
        position: {
          x: Math.random() * width,
          y: Math.random() * height,
        },
        pattern: codePatterns[i % codePatterns.length],
        opacity: 0.02 + Math.random() * 0.03,
        density: 0.5 + Math.random() * 0.5,
        orientation: (Math.random() - 0.5) * 0.3,
      });
    }
  }, [createDataStream]);

  // ============================================
  // PHYSICS & INTERACTION
  // ============================================

  const updateMouseState = useCallback((e: MouseEvent) => {
    const state = systemStateRef.current;
    const mouse = state.mouse;
    
    mouse.previous.x = mouse.current.x;
    mouse.previous.y = mouse.current.y;
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
    
    // Calculate velocity
    mouse.velocity.x = mouse.current.x - mouse.previous.x;
    mouse.velocity.y = mouse.current.y - mouse.previous.y;
    mouse.speed = Math.sqrt(mouse.velocity.x ** 2 + mouse.velocity.y ** 2);
    
    // Normalized velocity direction
    if (mouse.speed > 0.1) {
      mouse.normalizedVelocity.x = mouse.velocity.x / mouse.speed;
      mouse.normalizedVelocity.y = mouse.velocity.y / mouse.speed;
    }
  }, []);

  const calculateMouseInfluence = (
    posX: number,
    posY: number,
    radius: number
  ): { distance: number; influence: number; direction: Vector2D } => {
    const mouse = systemStateRef.current.mouse;
    const dx = mouse.current.x - posX;
    const dy = mouse.current.y - posY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Smooth falloff using inverse square with clamp
    const influence = Math.max(0, 1 - (distance / radius) ** 2);
    
    // Direction toward mouse
    const direction: Vector2D = 
      distance > 0.1 
        ? { x: dx / distance, y: dy / distance }
        : { x: 0, y: 0 };
    
    return { distance, influence, direction };
  };

  // ============================================
  // UPDATE FUNCTIONS
  // ============================================

  const updateNodes = (time: number, deltaTime: number, width: number, height: number) => {
    const nodes = nodesRef.current;
    const mouse = systemStateRef.current.mouse;
    
    nodes.forEach((node) => {
      // Continuous subtle motion - base oscillation
      const baseDrift = 0.02;
      node.velocity.x += Math.sin(time * 0.001 + node.phase) * baseDrift * 0.1;
      node.velocity.y += Math.cos(time * 0.0012 + node.phase * 1.3) * baseDrift * 0.1;
      
      // Mouse influence on node
      const { distance, influence, direction } = calculateMouseInfluence(
        node.position.x,
        node.position.y,
        180
      );
      
      // Activation based on proximity (smooth interpolation)
      node.targetActivation = Math.min(1, influence * 1.5 + 0.1);
      node.activation += (node.targetActivation - node.activation) * 0.08;
      
      // Gentle repulsion from mouse
      if (distance < 150 && distance > 1) {
        const repulsionForce = influence * 0.3;
        node.velocity.x -= direction.x * repulsionForce;
        node.velocity.y -= direction.y * repulsionForce;
      }
      
      // Velocity-based attraction (particles drift toward mouse direction when moving fast)
      if (mouse.speed > 5 && distance < 300) {
        const velocityInfluence = Math.min(mouse.speed / 50, 0.5) * (1 - distance / 300);
        node.velocity.x += mouse.normalizedVelocity.x * velocityInfluence * 0.05;
        node.velocity.y += mouse.normalizedVelocity.y * velocityInfluence * 0.05;
      }
      
      // Apply velocity with damping
      node.position.x += node.velocity.x;
      node.position.y += node.velocity.y;
      node.velocity.x *= 0.97;
      node.velocity.y *= 0.97;
      
      // Boundary wrapping with padding
      const padding = 30;
      if (node.position.x < -padding) node.position.x = width + padding;
      if (node.position.x > width + padding) node.position.x = -padding;
      if (node.position.y < -padding) node.position.y = height + padding;
      if (node.position.y > height + padding) node.position.y = -padding;
    });
  };

  const updateStreams = (time: number, deltaTime: number, width: number, height: number) => {
    const streams = streamsRef.current;
    const mouse = systemStateRef.current.mouse;
    
    streams.forEach((stream, index) => {
      stream.progress += stream.speed * (1 + mouse.speed * 0.02);
      
      if (stream.progress >= 1) {
        // Reset stream
        streams.splice(index, 1);
        createDataStream(width, height);
      }
    });
  };

  const updateParticles = (time: number, deltaTime: number, width: number, height: number) => {
    const particles = particlesRef.current;
    const mouse = systemStateRef.current.mouse;
    
    particles.forEach((particle) => {
      // Base drift motion
      particle.position.x += particle.drift.x;
      particle.position.y += particle.velocity.y;
      
      // Mouse influence
      const { distance, influence, direction } = calculateMouseInfluence(
        particle.position.x,
        particle.position.y,
        250
      );
      
      // Slight attraction when close
      if (distance < 200 && distance > 1) {
        particle.position.x += direction.x * influence * 0.5;
        particle.position.y += direction.y * influence * 0.5;
      }
      
      // Velocity-based deflection
      if (mouse.speed > 8 && distance < 150) {
        const deflection = Math.min(mouse.speed / 30, 0.8);
        particle.position.x += mouse.normalizedVelocity.x * deflection * (1 - distance / 150);
        particle.position.y += mouse.normalizedVelocity.y * deflection * (1 - distance / 150);
      }
      
      // Reset when off screen
      if (particle.position.y > height + 30) {
        particle.position.y = -30;
        particle.position.x = Math.random() * width;
      }
      if (particle.position.x < -30) particle.position.x = width + 30;
      if (particle.position.x > width + 30) particle.position.x = -30;
    });
  };

  const updatePatterns = (time: number, deltaTime: number, width: number, height: number) => {
    const patterns = patternsRef.current;
    const mouse = systemStateRef.current.mouse;
    
    patterns.forEach((pattern) => {
      // Subtle drift
      pattern.position.x += Math.sin(time * 0.0005 + pattern.orientation) * 0.1;
      pattern.position.y += Math.cos(time * 0.0006 + pattern.orientation * 1.2) * 0.05;
      
      // Mouse proximity affects density
      const { distance } = calculateMouseInfluence(
        pattern.position.x,
        pattern.position.y,
        400
      );
      
      pattern.density = 0.5 + Math.max(0, (1 - distance / 400)) * 0.5;
      
      // Boundary wrapping
      if (pattern.position.x < -100) pattern.position.x = width + 100;
      if (pattern.position.x > width + 100) pattern.position.x = -100;
      if (pattern.position.y < -100) pattern.position.y = height + 100;
      if (pattern.position.y > height + 100) pattern.position.y = -100;
    });
  };

  // ============================================
  // DRAWING FUNCTIONS
  // ============================================

  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Night-mode gradient - deep navy to charcoal
    const gradient = ctx.createRadialGradient(
      width * 0.5, height * 0.3, 0,
      width * 0.5, height * 0.5, Math.max(width, height) * 0.8
    );
    gradient.addColorStop(0, "#0d1829");
    gradient.addColorStop(0.4, "#0a1420");
    gradient.addColorStop(0.7, "#060d18");
    gradient.addColorStop(1, "#040810");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, time: number, width: number, height: number) => {
    const mouse = systemStateRef.current.mouse;
    const gridSize = 60;
    const offset = (time * 0.008) % gridSize;
    
    ctx.strokeStyle = "rgba(14, 165, 233, 0.015)";
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let x = -gridSize + offset; x < width + gridSize; x += gridSize) {
      const mouseDist = Math.abs(mouse.current.x - x);
      const intensity = Math.max(0, 1 - mouseDist / 150);
      
      ctx.strokeStyle = `rgba(14, 165, 233, ${0.01 + intensity * 0.03})`;
      ctx.lineWidth = 0.5 + intensity;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = -gridSize + offset; y < height + gridSize; y += gridSize) {
      const mouseDist = Math.abs(mouse.current.y - y);
      const intensity = Math.max(0, 1 - mouseDist / 150);
      
      ctx.strokeStyle = `rgba(20, 184, 166, ${0.01 + intensity * 0.025})`;
      ctx.lineWidth = 0.5 + intensity;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawNeuralNetwork = (ctx: CanvasRenderingContext2D, time: number) => {
    const nodes = nodesRef.current;
    const mouse = systemStateRef.current.mouse;
    
    // Draw connections first
    nodes.forEach((node, i) => {
      node.connections.forEach((j) => {
        const other = nodes[j];
        if (!other) return;
        
        const dx = other.position.x - node.position.x;
        const dy = other.position.y - node.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate midpoint for mouse influence
        const midX = (node.position.x + other.position.x) / 2;
        const midY = (node.position.y + other.position.y) / 2;
        const mouseDist = Math.sqrt(
          (mouse.current.x - midX) ** 2 + (mouse.current.y - midY) ** 2
        );
        const mouseInfluence = Math.max(0, 1 - mouseDist / 200);
        
        // Base opacity + mouse influence + activation
        const activationFactor = (node.activation + other.activation) / 2;
        const opacity = 0.04 + mouseInfluence * 0.12 + activationFactor * 0.08;
        
        // Color based on activation
        const hue = 190 + activationFactor * 30; // Cyan to teal
        const saturation = 60 + activationFactor * 20;
        const lightness = 40 + activationFactor * 15;
        
        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
        ctx.lineWidth = 0.5 + mouseInfluence * 1 + activationFactor * 0.5;
        ctx.beginPath();
        ctx.moveTo(node.position.x, node.position.y);
        ctx.lineTo(other.position.x, other.position.y);
        ctx.stroke();
      });
    });
    
    // Draw nodes
    nodes.forEach((node) => {
      const pulse = Math.sin(time * 0.002 + node.phase) * 0.15 + 0.85;
      const radius = node.baseRadius * pulse * (1 + node.activation * 0.3);
      
      // Glow for active nodes
      if (node.activation > 0.2) {
        const glowRadius = radius * 10 * node.activation;
        const glowGradient = ctx.createRadialGradient(
          node.position.x, node.position.y, 0,
          node.position.x, node.position.y, glowRadius
        );
        glowGradient.addColorStop(0, `rgba(14, 165, 233, ${node.activation * 0.2})`);
        glowGradient.addColorStop(0.5, `rgba(20, 184, 166, ${node.activation * 0.1})`);
        glowGradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.position.x, node.position.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Node core
      const nodeOpacity = 0.3 + node.activation * 0.5;
      ctx.fillStyle = `rgba(14, 165, 233, ${nodeOpacity})`;
      ctx.beginPath();
      ctx.arc(node.position.x, node.position.y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner highlight for active nodes
      if (node.activation > 0.3) {
        ctx.fillStyle = `rgba(248, 250, 252, ${node.activation * 0.4})`;
        ctx.beginPath();
        ctx.arc(
          node.position.x - radius * 0.25,
          node.position.y - radius * 0.25,
          radius * 0.35,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
  };

  const drawDataStreams = (ctx: CanvasRenderingContext2D, time: number) => {
    const streams = streamsRef.current;
    const mouse = systemStateRef.current.mouse;
    
    streams.forEach((stream) => {
      const points = stream.points;
      if (points.length < 2) return;
      
      // Draw the path with cursor influence
      ctx.beginPath();
      
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        
        // Calculate bezier control point influenced by mouse
        let cpX = (p1.x + p2.x) / 2;
        let cpY = (p1.y + p2.y) / 2;
        
        const mouseDx = mouse.current.x - cpX;
        const mouseDy = mouse.current.y - cpY;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        
        if (mouseDist < 300 && mouseDist > 0) {
          const bendStrength = Math.max(0, 1 - mouseDist / 300) * 30;
          cpX += (mouseDx / mouseDist) * bendStrength;
          cpY += (mouseDy / mouseDist) * bendStrength;
        }
        
        if (i === 0) {
          ctx.moveTo(p1.x, p1.y);
        }
        ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
      }
      
      // Animated gradient along the path
      const totalLength = points.length;
      const progressIndex = stream.progress * totalLength;
      const currentSegment = Math.floor(progressIndex);
      
      if (currentSegment < points.length - 1) {
        const currentPoint = points[currentSegment];
        const nextPoint = points[Math.min(currentSegment + 1, points.length - 1)];
        const segmentProgress = progressIndex - currentSegment;
        
        const drawX = currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress;
        const drawY = currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress;
        
        // Draw the moving point
        const pointGlow = ctx.createRadialGradient(
          drawX, drawY, 0,
          drawX, drawY, 20
        );
        pointGlow.addColorStop(0, `rgba(14, 165, 233, ${stream.intensity})`);
        pointGlow.addColorStop(0.4, `rgba(20, 184, 166, ${stream.intensity * 0.5})`);
        pointGlow.addColorStop(1, "transparent");
        
        ctx.fillStyle = pointGlow;
        ctx.beginPath();
        ctx.arc(drawX, drawY, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Core bright point
        ctx.fillStyle = `rgba(248, 250, 252, ${stream.intensity * 0.8})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw the trail
      ctx.strokeStyle = `rgba(14, 165, 233, ${stream.intensity * 0.15})`;
      ctx.lineWidth = stream.width;
      ctx.stroke();
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, time: number) => {
    const particles = particlesRef.current;
    const mouse = systemStateRef.current.mouse;
    
    ctx.font = "12px 'JetBrains Mono', 'Fira Code', ui-monospace, monospace";
    
    particles.forEach((particle) => {
      const { distance, influence } = calculateMouseInfluence(
        particle.position.x,
        particle.position.y,
        200
      );
      
      // Opacity increases near mouse
      const dynamicOpacity = particle.opacity * (1 + influence * 0.5);
      const pulseOpacity = dynamicOpacity * (0.8 + Math.sin(time * 0.003 + particle.position.x * 0.01) * 0.2);
      
      // Color shifts based on distance
      const hue = 190 + (1 - distance / 200) * 20;
      ctx.fillStyle = `hsla(${hue}, 70%, 55%, ${pulseOpacity})`;
      ctx.fillText(particle.char, particle.position.x, particle.position.y);
    });
  };

  const drawCodePatterns = (ctx: CanvasRenderingContext2D, time: number) => {
    const patterns = patternsRef.current;
    const mouse = systemStateRef.current.mouse;
    
    ctx.font = "11px 'JetBrains Mono', 'Fira Code', ui-monospace, monospace";
    
    patterns.forEach((pattern) => {
      const { distance, influence } = calculateMouseInfluence(
        pattern.position.x,
        pattern.position.y,
        350
      );
      
      const opacity = pattern.opacity * pattern.density * (1 + influence * 0.8);
      
      pattern.pattern.forEach((text, i) => {
        const x = pattern.position.x + i * 50;
        const y = pattern.position.y + i * 18;
        
        // Subtle wave motion
        const waveY = Math.sin(time * 0.001 + i * 0.5) * 2;
        
        ctx.fillStyle = `rgba(14, 165, 233, ${opacity})`;
        ctx.fillText(text, x, y + waveY);
      });
    });
  };

  const drawMouseField = (ctx: CanvasRenderingContext2D) => {
    const mouse = systemStateRef.current.mouse;
    
    if (mouse.current.x < 0) return;
    
    // Subtle cursor glow
    const glowSize = 120 + Math.min(mouse.speed * 2, 60);
    const baseIntensity = 0.02 + Math.min(mouse.speed * 0.003, 0.03);
    
    const gradient = ctx.createRadialGradient(
      mouse.current.x, mouse.current.y, 0,
      mouse.current.x, mouse.current.y, glowSize
    );
    gradient.addColorStop(0, `rgba(14, 165, 233, ${baseIntensity})`);
    gradient.addColorStop(0.4, `rgba(20, 184, 166, ${baseIntensity * 0.6})`);
    gradient.addColorStop(1, "transparent");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.current.x, mouse.current.y, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Velocity trail when moving
    if (mouse.speed > 3) {
      const trailLength = Math.min(mouse.speed * 3, 40);
      const trailOpacity = Math.min(mouse.speed * 0.005, 0.08);
      
      ctx.strokeStyle = `rgba(14, 165, 233, ${trailOpacity})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mouse.current.x, mouse.current.y);
      ctx.lineTo(
        mouse.current.x - mouse.normalizedVelocity.x * trailLength,
        mouse.current.y - mouse.normalizedVelocity.y * trailLength
      );
      ctx.stroke();
    }
  };

  const drawVignette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const vignette = ctx.createRadialGradient(
      width * 0.5, height * 0.5, height * 0.35,
      width * 0.5, height * 0.5, width * 0.85
    );
    vignette.addColorStop(0, "transparent");
    vignette.addColorStop(0.7, "rgba(4, 8, 16, 0.3)");
    vignette.addColorStop(1, "rgba(4, 8, 16, 0.6)");
    
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  };

  // ============================================
  // MAIN ANIMATION LOOP
  // ============================================

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      systemStateRef.current.dimensions = { width, height };
      initializeSystem(width, height);
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", updateMouseState);

    const animate = (timestamp: number) => {
      const state = systemStateRef.current;
      
      // Calculate delta time for smooth animation
      state.deltaTime = timestamp - state.lastFrameTime;
      state.lastFrameTime = timestamp;
      state.time += 1;
      
      const time = state.time;

      // Update systems
      updateNodes(time, state.deltaTime, width, height);
      updateStreams(time, state.deltaTime, width, height);
      updateParticles(time, state.deltaTime, width, height);
      updatePatterns(time, state.deltaTime, width, height);

      // Clear and draw
      drawBackground(ctx, width, height);
      drawGrid(ctx, time, width, height);
      drawCodePatterns(ctx, time);
      drawDataStreams(ctx, time);
      drawParticles(ctx, time);
      drawNeuralNetwork(ctx, time);
      drawMouseField(ctx);
      drawVignette(ctx, width, height);

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", updateMouseState);
      cancelAnimationFrame(animationId);
    };
  }, [initializeSystem, updateMouseState]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: -2 }}
        aria-hidden="true"
      />
      {/* Subtle ambient overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: `
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14, 165, 233, 0.02), transparent),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(20, 184, 166, 0.015), transparent)
          `,
        }}
      />
    </>
  );
};

export default DynamicBackground;
