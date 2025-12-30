import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ToolAccordion({ 
  icon: Icon, 
  title, 
  description, 
  isOpen, 
  onToggle, 
  children,
  gradient,
  rightElement 
}) {
  return (
    <motion.div
      layout
      className={`w-full max-w-full bg-white rounded-2xl border transition-all duration-300 ${
        isOpen ? 'border-teal-200 shadow-lg shadow-teal-500/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title} tool`}
        className="w-full px-4 py-5 md:p-6 flex items-center gap-4 text-left"
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${gradient} shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-lg">{title}</h3>
          <p className="text-sm text-slate-500 mt-0.5 break-words">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-teal-600' : 'text-slate-400'}`} />
          </motion.div>
          {rightElement}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 md:px-6 md:pb-8 pt-2 border-t border-slate-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}