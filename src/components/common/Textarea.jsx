import React from 'react';
import { cn } from '../../utils';

/**
 * 文本域默认样式。
 * 业务含义：统一多行输入框的尺寸、边框和焦点态表现。
 */
const TEXTAREA_BASE_STYLES = 'flex min-h-[80px] w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all';

/**
 * 通用文本域组件。
 * @param {object} props 组件入参。
 * @param {string} [props.className] 额外样式类名。
 * @param {React.Ref<HTMLTextAreaElement>} ref 文本域 DOM 引用。
 * @returns {JSX.Element} 返回标准文本域组件。
 */
export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(TEXTAREA_BASE_STYLES, className)}
    ref={ref}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
