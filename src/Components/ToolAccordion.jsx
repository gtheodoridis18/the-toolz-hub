import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import InfoTooltip from './ui/InfoTooltip';

export default function ToolAccordion({ 
  icon: Icon, 
  title, 
  description, 
  isOpen, 
  onToggle, 
  children,
  gradient,
  rightElement,
  helpText
}) {
  return (
    <motion.div
      layout="position"
      layoutScroll
      className={`w-full bg-white rounded-2xl border transition-colors duration-300 relative ${
        isOpen
          ? 'border-teal-200 shadow-lg shadow-teal-500/5'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >

      <button
        onClick={onToggle}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title} tool`}
        className="w-full px-4 py-5 md:p-6 flex items-center gap-4 text-left"
      >
        {/* Icon with optional tooltip badge */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${gradient}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {/* Mobile: Small badge on icon bottom-right */}
          {helpText && (
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute -bottom-1 -right-1 md:hidden bg-white rounded-full shadow-md border border-slate-200"
            >
              <InfoTooltip content={helpText} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <h2 className="font-semibold text-slate-900 text-base sm:text-lg">{title}</h2>
            {/* Desktop: Next to title */}
            {helpText && (
              <div onClick={(e) => e.stopPropagation()} className="hidden md:inline-flex flex-shrink-0">
                <InfoTooltip content={helpText} />
              </div>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-0.5 break-words">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              className={`w-5 h-5 ${
                isOpen ? 'text-teal-600' : 'text-slate-400'
              }`}
            />
          </motion.div>
          {rightElement}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="w-full overflow-hidden"
          >
            <div className="px-4 pb-6 md:px-6 md:pb-8 pt-6 w-full">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
