"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Mail, Send, CheckCircle, AlertCircle, Loader2, 
  MapPin, Phone, Linkedin, Terminal, Cpu, ArrowRight
} from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Enterprise-grade contact info with muted, professional styling
  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Cairo, Egypt",
      iconColor: "text-slate-400 group-hover:text-cyan-400",
      borderColor: "border-slate-700/50 group-hover:border-slate-600/60",
      description: "Based in Egypt"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(+20) 01285575364",
      href: "tel:+201285575364",
      iconColor: "text-slate-400 group-hover:text-teal-400",
      borderColor: "border-slate-700/50 group-hover:border-slate-600/60",
      description: "Call me directly"
    },
    {
      icon: Mail,
      label: "Email",
      value: "wwwmohamednasser620@gmail.com",
      href: "mailto:wwwmohamednasser620@gmail.com",
      iconColor: "text-slate-400 group-hover:text-cyan-400",
      borderColor: "border-slate-700/50 group-hover:border-slate-600/60",
      description: "Send an email"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/mohammed-nasser-mohamed-nasser/",
      iconColor: "text-slate-400 group-hover:text-slate-300",
      borderColor: "border-slate-700/50 group-hover:border-slate-600/60",
      description: "Connect with me"
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.4, 0.2] }}
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
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Let's Connect</span>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Get In
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent ml-3">
              Touch
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
            <span className="text-slate-300 font-medium">Ready to discuss</span> your next project or collaboration? 
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent font-semibold"> I'd love to hear from you.</span>
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-3"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ x: 4 }}
                className="group"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-4 p-4 bg-slate-900/40 backdrop-blur-xl border ${item.borderColor} rounded-lg transition-all duration-300`}
                  >
                    {/* Minimal geometric icon container */}
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-md bg-slate-800/40 border border-slate-700/40 transition-all duration-300 group-hover:bg-slate-800/60 group-hover:border-slate-600/50">
                      <item.icon 
                        size={18} 
                        strokeWidth={1.5}
                        className={`${item.iconColor} transition-colors duration-300`}
                        aria-label={item.label}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-slate-500 mb-0.5 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-medium text-slate-200 truncate">{item.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                ) : (
                  <div className={`flex items-center gap-4 p-4 bg-slate-900/40 backdrop-blur-xl border ${item.borderColor} rounded-lg transition-all duration-300`}>
                    {/* Minimal geometric icon container */}
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-md bg-slate-800/40 border border-slate-700/40 transition-all duration-300 group-hover:bg-slate-800/60 group-hover:border-slate-600/50">
                      <item.icon 
                        size={18} 
                        strokeWidth={1.5}
                        className={`${item.iconColor} transition-colors duration-300`}
                        aria-label={item.label}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-slate-500 mb-0.5 uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-medium text-slate-200 truncate">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="p-4 bg-slate-800/30 border border-slate-700/40 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative"
                >
                  <motion.div
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Available for Opportunities</p>
                  <p className="text-xs text-slate-500">Open to full-time & contract roles</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative group">
              {/* Glow */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/30 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-slate-600/50">
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" />
                
                {/* Terminal-style header */}
                <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700/30 bg-slate-800/20">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-mono text-slate-400">contact-form.tsx</span>
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-auto w-2 h-4 bg-cyan-400"
                  />
                </div>
                
                <form onSubmit={handleSubmit} className="relative p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <label htmlFor="name" className="flex items-center gap-2 text-sm font-mono text-slate-400 mb-2">
                        <span className="text-cyan-400">const</span>
                        <span className="text-white">name</span>
                        <span className="text-slate-500">=</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/30 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 transition-all"
                        placeholder='"Your name"'
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.45 }}
                    >
                      <label htmlFor="email" className="flex items-center gap-2 text-sm font-mono text-slate-400 mb-2">
                        <span className="text-teal-400">const</span>
                        <span className="text-white">email</span>
                        <span className="text-slate-500">=</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/30 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 transition-all"
                        placeholder='"your@email.com"'
                      />
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <label htmlFor="message" className="flex items-center gap-2 text-sm font-mono text-slate-400 mb-2">
                      <span className="text-emerald-400">const</span>
                      <span className="text-white">message</span>
                      <span className="text-slate-500">=</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/30 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all resize-none"
                      placeholder={`"Tell me about your project..."`}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.55 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group relative w-full flex items-center justify-center gap-3 py-4 overflow-hidden rounded-xl font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 text-white animate-spin relative z-10" />
                        <span className="text-white font-semibold relative z-10">sending...</span>
                      </>
                    ) : (
                      <>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Send className="w-5 h-5 text-white relative z-10" />
                        </motion.div>
                        <span className="text-white font-semibold relative z-10">send_message()</span>
                        <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                      </>
                    )}
                  </motion.button>

                  {/* Status */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 font-mono text-sm"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex items-center gap-3 text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 font-mono text-sm"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                      <span>Failed to send. Please try again or email directly.</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
