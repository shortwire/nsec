import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, ChevronDown, Building } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export default function Breadcrumb({ 
  items, 
  submenus = [], 
  rightSubmenus = [], 
  activeSubmenu = '', 
  onSubmenuClick 
}) {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  if ((!items || items.length === 0) && (!submenus || submenus.length === 0) && (!rightSubmenus || rightSubmenus.length === 0)) return null;

  return (
    <div className="sticky top-[186px] left-0 right-0 z-[100] w-full bg-brand-blue border-b border-white/10 h-[46px] flex items-center shadow-md">
      <div className="max-w-[1920px] mx-auto px-8 xl:px-10 w-full flex items-center justify-between">
        
        {/* Left Side: Institutional Menu + Page Sections */}
        <div className="flex items-center h-full gap-1">
          {/* 01. Institutional Dropdown(s) */}
          <div className="flex items-center h-full gap-1">
            {submenus.map((menu, idx) => (
              <div 
                key={idx} 
                className="relative h-full flex items-center"
                onMouseEnter={() => setHoveredMenu(menu.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button 
                  onClick={() => !menu.children && onSubmenuClick && onSubmenuClick(menu.id)}
                  className={cn(
                    "h-[32px] px-4 flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.14em] rounded-md transition-all cursor-pointer whitespace-nowrap",
                    activeSubmenu === menu.id || activeSubmenu.startsWith(menu.id + '-') || hoveredMenu === menu.id
                      ? "bg-white text-brand-blue shadow-lg scale-[1.02]" 
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {menu.id === 'the-nsec' && <Building size={14} className={cn(hoveredMenu === menu.id ? "text-brand-maroon" : "text-brand-accent")} />}
                  {menu.label}
                  {menu.children && <ChevronDown size={12} className={cn("transition-transform duration-500", hoveredMenu === menu.id && "rotate-180")} />}
                </button>

                <AnimatePresence>
                  {hoveredMenu === menu.id && menu.children && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 min-w-[240px] bg-white rounded-xl shadow-2xl border border-brand-accent/10 p-1.5 z-[110]"
                    >
                      <div className="grid gap-0.5">
                        {menu.children.map((child) => (
                          <div key={child.id} className="relative group/child">
                            <button
                              onClick={() => onSubmenuClick && onSubmenuClick(child.id)}
                              className={cn(
                                "w-full flex items-center justify-between py-2.5 px-3 rounded-lg transition-all text-left group",
                                activeSubmenu === child.id 
                                  ? "bg-brand-accent/10 text-brand-accent" 
                                  : "hover:bg-brand-accent/5 text-brand-blue"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <ChevronRight size={10} className={cn("transition-transform", activeSubmenu === child.id ? "text-brand-accent" : "text-brand-blue/40")} />
                                <span className="text-[11px] font-bold uppercase tracking-wide">
                                  {child.label}
                                </span>
                              </div>
                              {child.children && <ChevronRight size={12} className="text-brand-accent group-hover:translate-x-1 transition-all" />}
                            </button>

                            {/* Level 3: Nested Menu */}
                            {child.children && (
                              <div className="hidden group-hover/child:block absolute left-full top-0 pl-1.5 min-w-[200px]">
                                <div className="bg-white rounded-xl shadow-xl border border-brand-accent/10 p-1.5">
                                  {child.children.map((sub) => (
                                    <button
                                      key={sub.id}
                                      onClick={() => onSubmenuClick && onSubmenuClick(sub.id)}
                                      className="w-full text-left py-1.5 px-3 rounded-md hover:bg-brand-accent/5 text-[10px] font-bold text-brand-blue uppercase tracking-tight hover:text-brand-accent transition-all"
                                    >
                                      {sub.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* 02. Page Sections Trail */}
          <div className="flex items-center gap-1 ml-1">
            {rightSubmenus.length > 0 && (
              <ChevronRight size={13} className="text-white/30 -mx-0.5" />
            )}
            {rightSubmenus.map((menu, idx) => (
              <div key={idx} className="flex items-center gap-1">
                {idx > 0 && <ChevronRight size={13} className="text-white/30 -mx-0.5" />}
                <button 
                  onClick={() => onSubmenuClick && onSubmenuClick(menu.id)}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap px-1",
                    activeSubmenu === menu.id 
                      ? "text-brand-accent underline underline-offset-4 decoration-2" 
                      : "text-white/50 hover:text-white"
                  )}
                >
                  {menu.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Breadcrumb Trail (Optional) */}
        <div className="flex items-center gap-1">
          {items && items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;
            
            return (
              <div key={index} className="flex items-center gap-1">
                {!isFirst && <ChevronRight size={13} className="text-white/30 -mx-0.5" />}
                <Link 
                  to={item.link || '#'} 
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-all",
                    isLast ? "text-white/90" : "text-white/60 hover:text-white"
                  )}
                >
                  {isFirst && <Home size={13} className="mb-[1px]" />}
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
