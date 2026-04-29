import React from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';

/**
 * 动效容器组件。
 * 取值范围：`framer-motion` 提供的 div 动效组件。
 */
const MotionDiv = m.div;

/**
 * 二次确认弹窗组件。
 * @param {object} props 组件入参。
 * @param {boolean} props.isOpen 是否展示弹窗。
 * @param {() => void} props.onClose 关闭弹窗回调。
 * @param {() => void} props.onConfirm 确认执行回调。
 * @param {string} [props.title="确定执行此操作吗？"] 弹窗标题。
 * @param {string} [props.message="此操作不可逆，请谨慎操作。"] 弹窗提示文案。
 * @param {string} [props.confirmText="确认删除"] 确认按钮文案。
 * @param {string} [props.cancelText="放弃业务"] 取消按钮文案。
 * @param {string} [props.type="danger"] 弹窗类型，支持 `danger` 或默认提示风格。
 * @returns {JSX.Element} 返回确认弹窗。
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '确定执行此操作吗？',
  message = "此操作不可逆，请谨慎操作。",
  confirmText = "确认删除",
  cancelText = "放弃业务",
  type = 'danger',
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div key="confirm-modal-overlay" className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/40 backdrop-blur-md"
          />

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-card/70 backdrop-blur-2xl border border-border/50 rounded-[3rem] shadow-2xl overflow-hidden shadow-primary/5"
          >
            {/* Header / Icon Area */}
            <div className="p-10 pb-6 flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner ${
                type === 'danger' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
              }`}>
                {type === 'danger' ? <Trash2 size={32} strokeWidth={2.5} /> : <AlertTriangle size={32} strokeWidth={2.5} />}
              </div>
              
              <h3 className="text-2xl font-black font-display tracking-tight text-foreground mb-4">
                {title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground/60 leading-relaxed max-w-xs mx-auto">
                {message}
              </p>
            </div>

            {/* Actions Grid */}
            <div className="p-8 pt-4 flex flex-col gap-3">
              <button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] ${
                  type === 'danger' 
                    ? 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 hover:bg-destructive/90' 
                    : 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90'
                }`}
              >
                {confirmText}
              </button>
              
              <button 
                onClick={onClose}
                className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:bg-muted/50 transition-all active:scale-[0.98]"
              >
                {cancelText}
              </button>
            </div>

            {/* Close Button Top-Right Overlay */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-muted/20 hover:bg-muted/40 text-muted-foreground/50 hover:text-foreground"
            >
              <X size={18} />
            </button>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
}
