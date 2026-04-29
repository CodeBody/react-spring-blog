import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

/**
 * 构建省略型分页数组。
 * @param {number} currentPage 当前页码。
 * @param {number} totalPages 总页数。
 * @returns {Array<number | string>} 返回页码与省略号混合数组。
 * @description 在总页数较大时只展示首尾和当前邻近页。
 */
const buildPages = (currentPage, totalPages) => {
  /**
   * 当前要渲染的页码数组。
   * 取值范围：页码数字与 `'...'` 省略符组成的数组。
   */
  const pages = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }

    return pages;
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

/**
 * 通用分页组件。
 * @param {object} props 组件入参。
 * @param {number} props.currentPage 当前页码。
 * @param {number} props.totalPages 总页数。
 * @param {(page: number) => void} props.onPageChange 页码切换回调。
 * @returns {JSX.Element | null} 返回分页组件；仅一页时返回 `null`。
 */
export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  /**
   * 当前要渲染的分页项数组。
   * 业务含义：驱动页码按钮和省略号展示。
   */
  const pages = buildPages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-16 pb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <div key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-10 text-muted-foreground">
                <MoreHorizontal size={16} />
              </div>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                currentPage === page
                  ? 'bg-brand-primary text-white shadow-glow border-transparent'
                  : 'border border-transparent hover:bg-muted/50 hover:border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
