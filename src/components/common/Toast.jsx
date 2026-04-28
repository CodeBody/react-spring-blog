import React from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';

/**
 * 统一复用的动效容器组件。
 * 取值范围：`framer-motion` 提供的 div 动效组件。
 */
const MotionDiv = m.div;

/**
 * 不同提示类型对应的图标与样式配置。
 * 取值范围：按 `success/error/warning/info` 分类的展示配置对象。
 */
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

/**
 * 全局提示组件，负责消费博客上下文中的通知队列。
 * @returns {JSX.Element} 返回右下角悬浮提示容器。
 * @description 当前组件只负责展示，不负责关闭逻辑调度。
 */
export default function Toast() {
  /**
   * 当前待展示的提示消息列表。
   * 取值范围：Toast 对象数组。
   */
  const { toasts } = useBlog();

  return (
    <div className="fixed bottom-8 right-8 z-[10000] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          /**
           * 当前提示类型对应的渲染配置。
           * 取值范围：提示类型配置对象；未知类型时回退到 `info`。
           */
          const config = toastTypes[toast.type] || toastTypes.info;
          return (
            <MotionDiv
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto min-w-[320px] max-w-md p-5 rounded-2xl border ${config.border} ${config.bg} backdrop-blur-xl shadow-2xl flex items-center gap-4 relative overflow-hidden group`}
            >
              {/* Progress bar accent */}
              <MotionDiv
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
            </MotionDiv>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
