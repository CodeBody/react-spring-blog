import React from 'react';
import { cn } from '../../utils';

/**
 * 卡片主体默认样式。
 * 业务含义：统一卡片边框、背景色和阴影表现。
 */
const CARD_CONTAINER_STYLES = 'rounded-xl border border-border bg-card text-card-foreground shadow-sm bg-white dark:bg-[#121212]';

/**
 * 卡片头部默认样式。
 * 业务含义：统一标题区域的内边距和垂直布局。
 */
const CARD_HEADER_STYLES = 'flex flex-col space-y-1.5 p-6';

/**
 * 卡片标题默认样式。
 * 业务含义：统一卡片主标题字号和字重。
 */
const CARD_TITLE_STYLES = 'text-2xl font-semibold leading-none tracking-tight';

/**
 * 卡片描述默认样式。
 * 业务含义：统一卡片说明文字的弱化视觉。
 */
const CARD_DESCRIPTION_STYLES = 'text-sm text-muted-foreground';

/**
 * 卡片内容区默认样式。
 * 业务含义：统一内容区基础留白。
 */
const CARD_CONTENT_STYLES = 'p-6 pt-0';

/**
 * 卡片底部默认样式。
 * 业务含义：统一操作区布局和留白。
 */
const CARD_FOOTER_STYLES = 'flex items-center p-6 pt-0';

/**
 * 通用卡片容器组件。
 * @param {React.HTMLAttributes<HTMLDivElement>} props 组件入参。
 * @returns {JSX.Element} 返回卡片根容器。
 */
export function Card({ className, ...props }) {
  return <div className={cn(CARD_CONTAINER_STYLES, className)} {...props} />;
}

/**
 * 卡片头部容器组件。
 * @param {React.HTMLAttributes<HTMLDivElement>} props 组件入参。
 * @returns {JSX.Element} 返回卡片头部容器。
 */
export function CardHeader({ className, ...props }) {
  return <div className={cn(CARD_HEADER_STYLES, className)} {...props} />;
}

/**
 * 卡片标题组件。
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props 组件入参。
 * @returns {JSX.Element} 返回卡片标题节点。
 */
export function CardTitle({ className, ...props }) {
  return <h3 className={cn(CARD_TITLE_STYLES, className)} {...props} />;
}

/**
 * 卡片描述组件。
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props 组件入参。
 * @returns {JSX.Element} 返回卡片描述节点。
 */
export function CardDescription({ className, ...props }) {
  return <p className={cn(CARD_DESCRIPTION_STYLES, className)} {...props} />;
}

/**
 * 卡片内容容器组件。
 * @param {React.HTMLAttributes<HTMLDivElement>} props 组件入参。
 * @returns {JSX.Element} 返回卡片内容区容器。
 */
export function CardContent({ className, ...props }) {
  return <div className={cn(CARD_CONTENT_STYLES, className)} {...props} />;
}

/**
 * 卡片底部容器组件。
 * @param {React.HTMLAttributes<HTMLDivElement>} props 组件入参。
 * @returns {JSX.Element} 返回卡片底部容器。
 */
export function CardFooter({ className, ...props }) {
  return <div className={cn(CARD_FOOTER_STYLES, className)} {...props} />;
}
