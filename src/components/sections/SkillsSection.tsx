"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Coffee, Leaf, Server, Database, Wrench, 
  Brain, Calculator, Code2, Layers, Cpu,
  ArrowRight, Terminal, Box, Shield
} from "lucide-react";

const skillCategories = [
  {
    title: "Java & Backend Engineering",
    icon: Coffee,
    skills: ["Core Java", "JavaSE", "OOP", "Collections", "Streams", "Concurrency", "Multithreading", "JVM Internals", "Virtual Threads", "Algorithm Design", "Software Design"],
    color: "#f89820",
    gradient: "from-orange-500 to-amber-500",
    description: "Production-grade Java systems"
  },
  {
    title: "Spring & Jakarta Ecosystem",
    icon: Leaf,
    skills: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Batch", "Spring Data", "Spring Cloud", "Hibernate", "Jakarta EE", "JSP", "JSF", "JDBC", "EJB", "Jakarta Servlets"],
    color: "#6db33f",
    gradient: "from-green-500 to-emerald-500",
    description: "Enterprise frameworks"
  },
  {
    title: "Architecture & APIs",
    icon: Server,
    skills: ["Microservices", "REST APIs", "Clean Architecture", "Research & Development (R&D)", "Distributed Systems"],
    color: "#0ea5e9",
    gradient: "from-cyan-500 to-teal-500",
    description: "Scalable system design"
  },
  {
    title: "Databases & Messaging",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "Oracle", "SQL Server", "ClickHouse", "DBMS", "Kafka", "WebSockets", "ETL", "SQL Report Writing"],
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-500",
    description: "Data persistence & streaming"
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    skills: ["Docker", "CI/CD", "Git", "Maven", "Gradle", "Jira", "Slack", "JUnit", "Mockito", "SpringBootTest"],
    color: "#14b8a6",
    gradient: "from-teal-500 to-emerald-500",
    description: "Development infrastructure"
  },
  {
    title: "AI / LLM Engineering",
    icon: Brain,
    skills: ["LLM Evaluation", "Dataset Design & Curation", "Benchmark Construction", "Model Reasoning Analysis", "Mathematical Reasoning Evaluation", "Error Analysis & Diagnostics", "Alignment & Task Fit Evaluation", "Robustness Testing", "Machine-Verifiable Evaluation", "End-to-End Pipeline Design", "QA for ML Data", "Human-in-the-Loop"],
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
    description: "AI/ML research & evaluation"
  },
  {
    title: "Mathematics & Data",
    icon: Calculator,
    skills: ["Probability Theory", "Statistics", "Bayesian Reasoning", "Numerical Linear Algebra", "Numerical Analysis", "Monte Carlo Simulation", "PhD-Level Assessment", "Formal Proof Verification", "Scientific Computing", "Pandas", "NumPy"],
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-500",
    description: "Quantitative foundations"
  },
  {
    title: "Domain & Leadership",
    icon: Shield,
    skills: ["Anti-Money Laundering (AML)", "Financial Reporting & Modeling", "Financial Planning", "Team Leadership", "Management", "Lean Thinking", "Scrum", "Agile & Waterfall", "Project Delivery"],
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-500",
    description: "Industry expertise"
  }
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
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
              <Cpu className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Technical Stack</span>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Technical
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent ml-3">
              Skills
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
            Deep expertise in <span className="text-slate-300 font-medium">Java and Python</span>, specializing in high-performance backend systems, 
            <span className="text-cyan-400 font-medium"> distributed architectures</span>, and <span className="text-teal-400 font-medium">production-grade APIs</span>.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === index;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedCategory(isSelected ? null : index)}
                className="group relative cursor-pointer"
              >
                {/* Glow effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl`}
                  animate={{ opacity: isHovered || isSelected ? 0.2 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Card */}
                <div className={`relative bg-slate-900/60 backdrop-blur-xl border rounded-2xl p-5 h-full transition-all duration-300 ${
                  isSelected 
                    ? 'border-cyan-500/40' 
                    : 'border-slate-700/30 hover:border-slate-600/50'
                }`}>
                  {/* Top gradient line */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient} rounded-t-2xl opacity-0 group-hover:opacity-80 transition-opacity`} />
                  
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    {/* Icon */}
                    <motion.div 
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} bg-opacity-10 flex items-center justify-center flex-shrink-0`}
                      style={{ 
                        background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
                        border: `1px solid ${category.color}30`
                      }}
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                    </motion.div>
                    
                    {/* Title & Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills - Tag cloud */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.slice(0, isSelected ? undefined : 5).map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.03 + skillIndex * 0.02 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-2 py-0.5 text-xs font-mono bg-slate-800/60 border border-slate-700/40 rounded text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                    {!isSelected && category.skills.length > 5 && (
                      <span className="px-2 py-0.5 text-xs font-mono text-slate-500">
                        +{category.skills.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Expand indicator */}
                  <motion.div 
                    className="flex items-center justify-center gap-1 mt-3 text-xs text-slate-500"
                    animate={{ opacity: isHovered ? 1 : 0.5 }}
                  >
                    <span>{isSelected ? 'collapse' : 'expand'}</span>
                    <motion.div
                      animate={{ rotate: isSelected ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
