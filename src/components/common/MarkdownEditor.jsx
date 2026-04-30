import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../utils';

/**
 * Markdown 编辑视图模式集合。
 * 业务含义：控制仅编辑、仅预览与分栏预览三种状态。
 */
const EDITOR_VIEWS = [
  { id: 'edit', label: '编辑' },
  { id: 'preview', label: '预览' },
  { id: 'split', label: '分栏' },
];

/**
 * 判断当前视图是否需要渲染编辑区。
 * @param {'edit'|'preview'|'split'} view 当前编辑器视图。
 * @returns {boolean} 需要显示编辑区时返回 `true`。
 */
const shouldShowEditor = (view) => ['edit', 'split'].includes(view);

/**
 * 判断当前视图是否需要渲染预览区。
 * @param {'edit'|'preview'|'split'} view 当前编辑器视图。
 * @returns {boolean} 需要显示预览区时返回 `true`。
 */
const shouldShowPreview = (view) => ['preview', 'split'].includes(view);

/**
 * 计算顶部标签按钮样式。
 * @param {boolean} isActive 当前按钮是否处于激活态。
 * @returns {string} 返回标签按钮类名。
 */
const getTabClassName = (isActive) => cn(
  'rounded-xl px-4 py-2 text-xs font-bold tracking-widest transition-all',
  isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground',
);

/**
 * 计算编辑器内容区布局样式。
 * @param {'edit'|'preview'|'split'} view 当前编辑器视图。
 * @returns {string} 返回容器布局类名。
 */
const getPanelsClassName = (view) => (view === 'split' ? 'grid grid-cols-1 gap-4 xl:grid-cols-2' : 'grid grid-cols-1');

/**
 * Markdown 文本输入区组件。
 * @param {object} props 组件入参。
 * @param {string} props.value 当前 Markdown 文本。
 * @param {(value: string) => void} props.onChange 文本变更回调。
 * @param {number} props.minHeight 输入区最小高度，单位像素。
 * @param {string} props.placeholder 占位文案。
 * @returns {JSX.Element} 返回 Markdown 文本输入区。
 */
const MarkdownTextarea = ({ value, onChange, minHeight, placeholder }) => (
  <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    style={{ minHeight: `${minHeight}px` }}
    className="w-full resize-none rounded-[1.75rem] border border-border/50 bg-muted/10 px-6 py-5 font-mono text-sm leading-7 text-foreground outline-none transition-all focus:border-primary/30 focus:bg-card"
  />
);

/**
 * Markdown 预览区组件。
 * @param {object} props 组件入参。
 * @param {string} props.value 当前 Markdown 文本。
 * @param {number} props.minHeight 预览区最小高度，单位像素。
 * @param {string | undefined} props.className 额外类名。
 * @returns {JSX.Element} 返回 Markdown 渲染结果。
 */
const MarkdownPreview = ({ value, minHeight, className }) => (
  <div
    style={{ minHeight: `${minHeight}px` }}
    className={cn('rounded-[1.75rem] border border-border/50 bg-card px-6 py-5', className)}
  >
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {value || '### 预览区\n\n在左侧输入 Markdown 内容后，这里会同步显示排版结果。'}
      </ReactMarkdown>
    </div>
  </div>
);

/**
 * 轻量 Markdown 编辑器组件。
 * @param {object} props 组件入参。
 * @param {string} props.value 当前 Markdown 文本。
 * @param {(value: string) => void} props.onChange 文本变更回调。
 * @param {number} [props.minHeight=550] 编辑器最小高度，单位像素。
 * @param {'edit'|'preview'|'split'} [props.defaultView='split'] 默认视图模式。
 * @param {string} [props.placeholder='请输入 Markdown 内容...'] 输入区占位文案。
 * @param {string | undefined} props.className 外层容器额外类名。
 * @returns {JSX.Element} 返回轻量编辑器。
 */
export function MarkdownEditor({
  value,
  onChange,
  minHeight = 550,
  defaultView = 'split',
  placeholder = '请输入 Markdown 内容...',
  className,
}) {
  /**
   * 当前编辑器视图模式。
   * 取值范围：`edit/preview/split`。
   */
  const [view, setView] = useState(defaultView);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center gap-2">
        {EDITOR_VIEWS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setView(item.id)}
            className={getTabClassName(view === item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={getPanelsClassName(view)}>
        {shouldShowEditor(view) ? (
          <MarkdownTextarea value={value} onChange={onChange} minHeight={minHeight} placeholder={placeholder} />
        ) : null}
        {shouldShowPreview(view) ? (
          <MarkdownPreview value={value} minHeight={minHeight} />
        ) : null}
      </div>
    </div>
  );
}
