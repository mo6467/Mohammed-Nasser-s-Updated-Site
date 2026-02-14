"use client";

import { motion } from "framer-motion";
import { 
  Mail, Linkedin, Phone, MapPin, ArrowUp, 
  ExternalLink, Send, Terminal, Cpu, Activity,
  Circle, Clock, Globe, Heart, Github
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { 
      icon: Mail, 
      href: "mailto:wwwmohamednasser620@gmail.com", 
      value: "Email",
      gradient: "from-cyan-500 to-teal-500",
      hoverColor: "text-cyan-400"
    },
    { 
      icon: Phone, 
      href: "tel:+201285575364", 
      value: "Phone",
      gradient: "from-teal-500 to-emerald-500",
      hoverColor: "text-teal-400"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/mohammed-nasser-mohamed-nasser/", 
      value: "LinkedIn",
      gradient: "from-blue-500 to-cyan-500",
      hoverColor: "text-blue-400"
    },
  ];

  return (
    <footer className="relative py-16 px-4">
      {/* Top border with glow */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent mt-0.5" />
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            {/* Logo */}
            <motion.div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                </div>
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <motion.h3 
                  className="text-xl font-bold"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-gradient">Mohammed Nasser</span>
                </motion.h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Activity className="w-3 h-3" />
                  <span className="font-mono">system active</span>
                </div>
              </div>
            </motion.div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-md">
              Senior Backend Engineer specializing in distributed systems, AI/ML platforms, and enterprise-grade solutions. Building scalable systems that make a difference.
            </p>
            
            {/* Status indicator */}
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div className="relative">
                <motion.div
                  className="w-2.5 h-2.5 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-emerald-400 text-sm font-medium">Available for opportunities</span>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-1">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="group flex items-center gap-3 py-2 text-slate-400 hover:text-white transition-all"
                  >
                    <motion.div 
                      className="w-5 h-5 bg-slate-800/80 border border-slate-700/50 rounded flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 bg-slate-500 rounded-full group-hover:bg-cyan-400 transition-colors"
                      />
                    </motion.div>
                    <span className="text-sm">{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full" />
              Contact
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((link, index) => (
                <motion.li
                  key={link.value}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 py-1.5 transition-all"
                  >
                    <motion.div 
                      className={`w-8 h-8 bg-gradient-to-br ${link.gradient} bg-opacity-10 rounded-lg flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <link.icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className={`text-sm text-slate-400 group-hover:${link.hoverColor} transition-colors`}>
                      {link.value}
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex items-center gap-3 py-1.5"
              >
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-sm text-slate-400">Cairo, Egypt</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#060c16] border border-cyan-500/20 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Send className="w-4 h-4 text-cyan-400" />
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm text-center md:text-left"
          >
            © {currentYear} Mohammed Nasser Ibrahim. All rights reserved.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="group relative p-3"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"
              />
              <div className="relative bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 rounded-xl p-2 group-hover:border-cyan-500/40 transition-all">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUp className="w-5 h-5 text-cyan-400" />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
