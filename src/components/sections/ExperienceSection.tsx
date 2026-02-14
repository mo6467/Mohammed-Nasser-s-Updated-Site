"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Building2, Calendar, MapPin, ArrowRight,
  Terminal, GitBranch, Cpu, Zap, ChevronDown, ChevronUp
} from "lucide-react";

const experiences = [
  {
    company: "Data Gear",
    role: "Software Development Engineer",
    period: "Sep 2023 - Present",
    location: "Cairo, Egypt",
    type: "Full-time",
    description: "Backend Engineer on large-scale Anti–Money Laundering (AML) and compliance platforms within regulated financial environments.",
    achievements: [
      "Designed and maintained backend services and RESTful APIs; implemented background processing for long-running tasks",
      "Integrated multiple enterprise databases (Oracle, SQL Server, MySQL) and developed real-time features using WebSockets",
      "Built automated reporting engines for regulatory compliance reports in PDF and CSV formats",
      "Contributed to core AML modules (KYC, FATCA, fraud analytics) to deliver production-ready features"
    ],
    technologies: ["Java", "Spring Boot", "Oracle", "SQL Server", "MySQL", "WebSockets", "JDBC"],
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    company: "Turing Enterprise Inc",
    role: "Team Lead",
    period: "Jan 2025 - Mar 2025",
    location: "Palo Alto, California, USA",
    type: "Contract",
    description: "Served as Pod Lead for a team of 14 engineers within Axiom Lean, evaluating AI/LLM outputs with a focus on formal reasoning and proof validation using Lean.",
    achievements: [
      "Owned end-to-end task planning, quality standards, and delivery, ensuring mathematical rigor and machine-verifiable correctness",
      "Mentored researchers on formal proof construction and verification, acting as the primary technical point of contact",
      "Led evaluation of AI/LLM outputs with focus on formal reasoning and proof validation using Lean"
    ],
    technologies: ["Lean", "AI/ML Evaluation", "Team Leadership", "Formal Verification", "Mathematical Reasoning"],
    color: "#0ea5e9",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    company: "Turing Enterprise Inc",
    role: "Java LLM Software Engineer",
    period: "Sep 2024 - Jun 2025",
    location: "Palo Alto, California, USA",
    type: "Contract",
    description: "Core member of a seven-engineer team responsible for design and maintenance of Turing's primary data labeling platform.",
    achievements: [
      "Key maintainer of Turing's internal RLHF platform, contributing to architectural improvements and feature enhancements",
      "Supported initiatives to improve platform scalability for high concurrent user activity",
      "Collaborated with globally distributed teams from leading technology companies to design robust, production-grade systems"
    ],
    technologies: ["Java", "Spring Boot", "RLHF", "Distributed Systems", "Scalable Architecture"],
    color: "#22d3ee",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    company: "Turing Enterprise Inc",
    role: "Senior Research Engineer",
    period: "Jun 2024 - Nov 2025",
    location: "Palo Alto, California, USA",
    type: "Contract",
    description: "Specializing in advanced mathematics (Undergrad to PhD) supporting AI/ML research and alignment initiatives (SFT, RLHF).",
    achievements: [
      "Worked on AI Quality/Safety projects for Anthropic, OpenAI, Google, and Amazon, focusing on alignment and robustness",
      "Performed deep mathematical analysis in measure-theoretic probability, stochastic processes, and optimization",
      "Translated abstract mathematical concepts into machine-verifiable representations for scalable AI pipelines"
    ],
    technologies: ["AI/ML Research", "SFT", "RLHF", "Probability Theory", "Stochastic Processes", "Optimization"],
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    company: "Scale AI",
    role: "LLM Engineer",
    period: "Sep 2023 - Dec 2023",
    location: "San Francisco, California, USA",
    type: "Contract",
    description: "Evaluated LLMs across technical and advanced mathematical domains, including applied mathematics and theoretical reasoning.",
    achievements: [
      "Analyzed reasoning quality, robustness, and task alignment, focusing on logical coherence and consistency",
      "Designed evaluation frameworks defining objective metrics for correctness and reasoning depth",
      "Identified systematic model failure patterns (hallucinations, reasoning shortcuts) to support model iteration and benchmarking"
    ],
    technologies: ["LLM Evaluation", "Benchmark Design", "Error Analysis", "Mathematical Reasoning", "Python"],
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500"
  }
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
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
              <GitBranch className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Career Path</span>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Professional
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent ml-3">
              Experience
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
            Proven experience in <span className="text-slate-300 font-medium">AI/LLM research engineering</span> at Scale AI and Turing. 
            Solid background in <span className="text-cyan-400 font-medium">applied mathematics</span>, <span className="text-teal-400 font-medium">statistics</span>, and <span className="text-emerald-400 font-medium">formal reasoning</span>.
          </motion.p>
        </motion.div>

        {/* Timeline Pipeline */}
        <div className="relative">
          {/* Vertical Pipeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-700/30">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isExpanded = expandedIndex === index;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-lg`}
                      style={{ boxShadow: `0 0 20px ${exp.color}40` }}
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        boxShadow: [
                          `0 0 20px ${exp.color}30`,
                          `0 0 30px ${exp.color}50`,
                          `0 0 20px ${exp.color}30`
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Building2 className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ml-20 md:ml-0 ${isEven ? "md:pr-16" : "md:pl-16"}`}>
                    <motion.div
                      className={`relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ${
                        isExpanded ? 'border-cyan-500/30' : 'hover:border-slate-600/50'
                      }`}
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      whileHover={{ y: -4 }}
                    >
                      {/* Top gradient line */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${exp.gradient} opacity-60`} />
                      
                      {/* Glow effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                        style={{ background: `linear-gradient(135deg, ${exp.color}10, transparent)` }}
                      />

                      <div className="relative p-6">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`font-mono text-sm bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent font-semibold`}>
                                {exp.company}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-800/60 border border-slate-700/40 rounded text-xs text-slate-400">
                                {exp.type}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-1.5 text-sm text-slate-400">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                              <MapPin className="w-3 h-3" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                          {exp.description}
                        </p>

                        {/* Achievements - Expandable */}
                        <motion.div
                          initial={false}
                          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4 space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2 text-sm text-slate-300"
                              >
                                <ArrowRight className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                                <span>{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono bg-slate-800/60 border border-slate-700/40 rounded-lg text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Expand indicator */}
                        <motion.div 
                          className="flex items-center justify-center gap-1 text-xs text-slate-500 pt-2 border-t border-slate-700/30"
                          whileHover={{ color: '#22d3ee' }}
                        >
                          <span>{isExpanded ? 'Show less' : 'Show details'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
