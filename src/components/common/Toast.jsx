import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';

const toastTypes = {
  success: {
    icon: <CheckCircle size={20} className="text-emerald-500" />,
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    accent: 'bg-emerald-500'
  },
  error: {
    icon: <XCircle size={20} className="text-rose-500" />,
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    accent: 'bg-rose-500'
  },
  warning: {
    icon: <AlertTriangle size={20} className="text-amber-500" />,
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    accent: 'bg-amber-500'
  },
  info: {
    icon: <Info size={20} className="text-sky-500" />,
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    accent: 'bg-sky-500'
  }
};

export default function Toast() {
  const { toasts } = useBlog();

  return (
    <div className="fixed bottom-8 right-8 z-[10000] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = toastTypes[toast.type] || toastTypes.info;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto min-w-[320px] max-w-md p-5 rounded-2xl border ${config.border} ${config.bg} backdrop-blur-xl shadow-2xl flex items-center gap-4 relative overflow-hidden group`}
            >
              {/* Progress bar accent */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-0.5 ${config.accent} opacity-40`}
              />

              {/* Icon Container */}
              <div className={`p-2.5 rounded-xl bg-background/50 shadow-sm flex items-center justify-center shrink-0`}>
                {config.icon}
              </div>

              {/* Message */}
              <div className="flex-1">
                <p className="text-[0.75rem] font-bold tracking-tight text-foreground leading-tight">
                  {toast.message}
                </p>
                <p className="text-[0.55rem] font-black uppercase tracking-[0.2em] opacity-30 mt-1">
                  {toast.type} notification
                </p>
              </div>

              {/* Manual Close */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                 <X size={14} className="text-muted-foreground hover:text-foreground cursor-pointer" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
