"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen, Sparkles } from "lucide-react";

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const educationDetails = [
    { label: "Degree", value: "Bachelor's in Pure Mathematics and Computer Science" },
    { label: "University", value: "Al-Azhar University" },
    { label: "Location", value: "Cairo, Egypt" },
    { label: "Final Grade", value: "Very Good (Ranked 3rd)" },
  ];

  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
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
            className="inline-block px-4 py-1.5 bg-[#c9a962]/10 border border-[#c9a962]/20 rounded-full text-[#c9a962] text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Academic Background
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent mx-auto" />
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a962]/5 via-[#a78bfa]/5 to-[#c9a962]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-[#060c16]/80 backdrop-blur-xl border border-[#c9a962]/10 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#c9a962]/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#c9a962]/20 rounded-br-2xl" />
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #c9a962 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Icon */}
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962] to-[#a78bfa] rounded-2xl blur-lg opacity-30" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-[#c9a962] to-[#a78bfa] rounded-2xl flex items-center justify-center shadow-xl">
                  <GraduationCap className="w-12 h-12 text-[#05050a]" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#c9a962] transition-colors">
                  Bachelor's in Pure Mathematics and Computer Science
                </h3>
                <p className="text-[#c9a962] font-medium mb-4">
                  Al-Azhar University, Cairo, Egypt
                </p>
                
                {/* Details grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {educationDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-center md:text-left p-3 bg-[#1a1a28]/50 rounded-xl border border-[#c9a962]/5"
                    >
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{detail.label}</p>
                      <p className="text-sm text-white font-medium">{detail.value}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Achievements */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#c9a962]/10 border border-[#c9a962]/20 rounded-xl text-[#c9a962] text-sm">
                    <Award className="w-4 h-4" />
                    Very Good
                  </span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-xl text-[#a78bfa] text-sm">
                    <BookOpen className="w-4 h-4" />
                    Mathematics & CS
                  </span>
                </div>
              </div>
            </div>
            
            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a962] via-[#a78bfa] to-[#c9a962] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
