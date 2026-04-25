import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const SectionHeading = ({ title, tagline, className }) => {
  return (
    <div className={cn("relative w-full mb-10 -mt-6 select-none pt-6", className)}>
      
      {/* TOP LEFT BRACKET (Teal) */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-accent opacity-60" />
      
      {/* TOP RIGHT BRACKET (Teal) */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-accent opacity-60" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative py-0">
        
        {/* LEFT: THE INTERACTIVE PORTAL HEADING */}
        <div className="relative group flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative cursor-default"
          >
            {/* BACKGROUND LAYER: Hollow Maroon Base */}
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.08em] leading-none"
              style={{ 
                WebkitTextStroke: '1.5px var(--color-brand-maroon)',
                color: 'transparent',
                fontFamily: 'var(--font-heading)'
              }}
            >
              {title}
            </h2>

            {/* FOREGROUND LAYER: Solid Teal revealed by "Scanning Portal" */}
            <motion.div 
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            >
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.08em] leading-none text-brand-accent"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </h2>
            </motion.div>

            {/* DYNAMIC SHAPE: The "Scanning Edge" */}
            <motion.div 
              className="absolute top-0 bottom-0 w-2 bg-brand-accent shadow-[0_0_20px_rgba(0,139,139,0.8)] z-20"
              initial={{ left: '0%' }}
              whileInView={{ left: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        </div>

        {/* RIGHT: TAGLINE */}
        <div className="relative flex-1 lg:max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-right"
          >
            <p className="text-base md:text-lg font-light text-brand-maroon leading-tight tracking-tight italic">
              {tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* HORIZONTAL TRANSITION LINE (Maroon to Teal) */}
      <div className="relative mt-5 w-full">
        {/* Left Tick */}
        <div className="absolute left-0 bottom-0 w-[2px] h-3 bg-brand-maroon z-20" />
        
        {/* Animated Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-[1.5px] bg-gradient-to-r from-brand-maroon to-brand-accent origin-left w-full"
        />
        
        {/* Right Tick */}
        <div className="absolute right-0 bottom-0 w-[2px] h-3 bg-brand-accent z-20" />
      </div>
    </div>
  );
};

export default SectionHeading;