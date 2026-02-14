"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const companies = [
  {
    name: "Turing Enterprise Inc",
    logo: "/images/turing.png",
    description: "AI/ML Research Engineering & Java Development",
    role: "Pod Lead, Java Engineer, Research Analyst",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    name: "Scale AI",
    logo: "/images/scale-ai.png",
    description: "LLM Engineering & Model Evaluation",
    role: "LLM Engineer",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "DataGear",
    logo: "/images/datagear.png",
    description: "AML & Compliance Systems",
    role: "Backend Engineer",
    gradient: "from-cyan-500 to-teal-500"
  }
];

const stats = [
  { value: "6+", label: "Major Projects" },
  { value: "3", label: "Enterprise Clients" },
  { value: "15+", label: "Technologies" }
];

const CompaniesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="companies" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6"
          >
            Trusted Collaborations
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Companies & Collaboration</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            Engineering impactful solutions at world-class technology companies
          </p>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Glow */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${company.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              />
              
              <div className="relative glass-card glass-card-hover p-8 text-center overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14, 165, 233, 0.5) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                {/* Logo */}
                <motion.div 
                  className="relative w-20 h-20 mx-auto mb-6 bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-700/50 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={64}
                    height={64}
                    className="company-logo object-contain w-16 h-16"
                  />
                </motion.div>

                {/* Name */}
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {company.name}
                </h3>

                {/* Role */}
                <p className={`text-sm font-medium bg-gradient-to-r ${company.gradient} bg-clip-text text-transparent mb-3`}>
                  {company.role}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-400">
                  {company.description}
                </p>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${company.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="relative group"
              >
                {/* Animated glow background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                />
                
                <div className="relative glass-card p-8 text-center overflow-hidden">
                  {/* Top accent line */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  
                  {/* Animated value */}
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-gradient mb-3"
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(14, 165, 233, 0.3)",
                        "0 0 40px rgba(14, 165, 233, 0.5)",
                        "0 0 20px rgba(14, 165, 233, 0.3)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  {/* Label with subtle animation */}
                  <motion.div 
                    className="text-sm text-slate-400 font-medium uppercase tracking-wider"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompaniesSection;
