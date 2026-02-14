"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Terminal, Cpu, Zap, ArrowRight,
  Folder, Code2, ChevronRight, X, Layers, Database, Globe,
  ShoppingCart, Activity, TrafficCone, BarChart3
} from "lucide-react";

const projects = [
  {
    title: "E-Commerce Backend System",
    description: "Spring Boot backend with JWT/OAuth2, PostgreSQL, and CI/CD pipelines.",
    longDescription: "A complete e-commerce backend system with secure authentication, product management, order processing, and payment integration.",
    technologies: ["Java", "Spring Boot", "JWT", "OAuth2", "PostgreSQL", "CI/CD"],
    features: ["User Authentication", "Product Catalog", "Order Management", "Payment Processing"],
    gradient: "from-cyan-500 to-teal-500",
    color: "#0ea5e9",
    category: "Backend",
    icon: ShoppingCart
  },
  {
    title: "Real-Time Data Processing System",
    description: "Microservices architecture using Spring Boot, Kafka, and ClickHouse for high-throughput data processing.",
    longDescription: "A scalable real-time data processing platform handling high-frequency data streams with efficient storage and analytics capabilities.",
    technologies: ["Java", "Spring Boot", "Kafka", "ClickHouse", "Microservices"],
    features: ["Stream Processing", "Real-time Analytics", "Scalable Architecture", "Data Pipeline"],
    gradient: "from-emerald-500 to-teal-500",
    color: "#10b981",
    category: "Data Engineering",
    icon: Activity
  },
  {
    title: "AI-Powered Traffic Control System",
    description: "Real-time congestion prediction and adaptive traffic signal optimization using machine learning.",
    longDescription: "An intelligent traffic management system that uses AI to predict congestion and optimize traffic signals in real-time.",
    technologies: ["Python", "Machine Learning", "Real-time Processing", "IoT"],
    features: ["Congestion Prediction", "Signal Optimization", "Real-time Monitoring", "ML Models"],
    gradient: "from-cyan-500 to-blue-500",
    color: "#22d3ee",
    category: "AI/ML",
    icon: TrafficCone
  },
  {
    title: "Cambridge Dataset Analysis",
    description: "Clustering, exploratory data analysis, and model optimization using Python for Kaggle competition.",
    longDescription: "Comprehensive data analysis project featuring advanced clustering techniques, EDA, and optimized machine learning models.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    features: ["Data Analysis", "Clustering", "EDA", "Model Optimization"],
    gradient: "from-amber-500 to-orange-500",
    color: "#f59e0b",
    category: "Data Science",
    icon: BarChart3
  }
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 border border-slate-700/40 rounded-full mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Folder className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Portfolio</span>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Featured
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent ml-3">
              Projects
            </span>
          </motion.h2>
          
          {/* Animated divider */}
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
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Building <span className="text-slate-300 font-medium">reliable, scalable systems</span> and 
            <span className="text-cyan-400 font-medium"> research-grade evaluation pipelines</span>.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <motion.div
                  className={`relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isHovered ? 'border-cyan-500/30' : ''
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {/* Top gradient line */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                  
                  {/* Glow effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl blur-xl`}
                    animate={{ opacity: isHovered ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Terminal-style icon */}
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{ 
                            background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                            borderColor: `${project.color}30`
                          }}
                        >
                          <IconComponent className="w-5 h-5" style={{ color: project.color }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs text-slate-500">{project.category}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.5 }}
                        className="text-slate-500"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono bg-slate-800/60 border border-slate-700/40 rounded text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700/30 bg-slate-800/30">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-sm text-slate-400">
                    {selectedProject.title.toLowerCase().replace(/\s+/g, '_')}.json
                  </span>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <selectedProject.icon 
                    className="w-6 h-6" 
                    style={{ color: selectedProject.color }} 
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {selectedProject.title}
                    </h3>
                    <span className="text-sm text-slate-400">{selectedProject.category}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                        <ChevronRight className="w-3 h-3 text-cyan-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-mono bg-slate-800/60 border border-slate-700/40 rounded-lg text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
