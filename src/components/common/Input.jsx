import React from 'react';
import { cn } from '../../utils';

/**
 * 输入框默认样式。
 * 业务含义：统一输入框尺寸、边框、焦点态和禁用态视觉。
 */
const INPUT_BASE_STYLES = 'flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all';

/**
 * 通用输入框组件。
 * @param {object} props 组件入参。
 * @param {string} [props.className] 额外样式类名。
 * @param {string} [props.type='text'] 输入框类型。
 * @param {React.Ref<HTMLInputElement>} ref 输入框 DOM 引用。
 * @returns {JSX.Element} 返回标准输入框组件。
 */
export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    className={cn(INPUT_BASE_STYLES, className)}
    ref={ref}
    {...props}
  />
));

Input.displayName = 'Input';
