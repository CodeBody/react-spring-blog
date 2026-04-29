import React from 'react';
import { cn } from '../../utils';

/**
 * 按钮基础样式。
 * 业务含义：约束所有按钮的共用布局、交互和禁用态表现。
 */
const BUTTON_BASE_STYLES = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

/**
 * 按钮变体样式映射。
 * 业务含义：统一维护主按钮、描边按钮等视觉语义。
 */
const BUTTON_VARIANTS = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary',
  secondary: 'bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-foreground',
  outline: 'border border-border bg-transparent hover:bg-muted focus-visible:ring-foreground',
  ghost: 'bg-transparent hover:bg-muted text-foreground focus-visible:ring-foreground',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
};

/**
 * 按钮尺寸样式映射。
 * 业务含义：统一维护常规、小号、大号和图标按钮尺寸。
 */
const BUTTON_SIZES = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-12 rounded-md px-8 text-lg',
  icon: 'h-10 w-10',
};

/**
 * 计算按钮最终类名。
 * @param {string | undefined} className 外部透传样式类名。
 * @param {keyof typeof BUTTON_VARIANTS} variant 按钮变体类型。
 * @param {keyof typeof BUTTON_SIZES} size 按钮尺寸类型。
 * @returns {string} 返回合并后的按钮类名字符串。
 */
const getButtonClassName = (className, variant, size) => cn(
  BUTTON_BASE_STYLES,
  BUTTON_VARIANTS[variant],
  BUTTON_SIZES[size],
  className,
);

/**
 * 通用按钮组件。
 * @param {object} props 组件入参。
 * @param {string} [props.className] 额外样式类名。
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} [props.variant='primary'] 按钮视觉类型。
 * @param {'default'|'sm'|'lg'|'icon'} [props.size='default'] 按钮尺寸类型。
 * @param {boolean} [props.isLoading=false] 是否展示加载态。
 * @param {React.ReactNode} props.children 按钮内容节点。
 * @param {React.Ref<HTMLButtonElement>} ref 按钮 DOM 引用。
 * @returns {JSX.Element} 返回可复用按钮组件。
 * @description 统一处理加载态、禁用态和样式变体。
 */
export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'default',
  isLoading = false,
  children,
  ...props
}, ref) => (
  <button
    ref={ref}
    className={getButtonClassName(className, variant, size)}
    disabled={isLoading || props.disabled}
    {...props}
  >
    {isLoading ? (
      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    ) : null}
    {children}
  </button>
));

Button.displayName = 'Button';
