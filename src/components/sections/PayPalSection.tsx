"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CreditCard, ExternalLink, Heart, Sparkles } from "lucide-react";

const PayPalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a962]/10 via-[#0070ba]/10 to-[#c9a962]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-[#0c0c14]/80 backdrop-blur-xl border border-[#c9a962]/10 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#0070ba]/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#c9a962]/10 to-transparent rounded-tr-full" />
            
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-20 h-20 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9a962] to-[#0070ba] rounded-2xl blur-lg opacity-30" />
              <div className="relative w-full h-full bg-gradient-to-r from-[#c9a962]/10 to-[#0070ba]/10 rounded-2xl flex items-center justify-center border border-[#c9a962]/20">
                <CreditCard className="w-10 h-10 text-[#c9a962]" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              Support My Work
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed"
            >
              If you find my work valuable and would like to support my projects or show appreciation, you can contribute via PayPal.
            </motion.p>

            {/* PayPal Button */}
            <motion.a
              href="https://www.paypal.me/MohammedNasser307"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0070ba] to-[#003087] text-white font-semibold rounded-xl shadow-lg shadow-[#0070ba]/20 hover:shadow-[#0070ba]/40 transition-all group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              
              {/* PayPal Icon */}
              <svg className="w-7 h-7 relative" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
              </svg>
              
              <span className="relative text-lg">PayPal.Me</span>
              <ExternalLink className="w-4 h-4 relative opacity-70" />
            </motion.a>

            {/* PayPal Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-sm text-gray-500"
            >
              <Heart className="w-4 h-4 inline mr-1 text-[#c9a962]" />
              paypal.me/MohammedNasser307
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PayPalSection;
