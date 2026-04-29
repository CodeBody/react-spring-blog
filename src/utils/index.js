import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

/**
 * 标准日期格式字符串。
 * 业务含义：统一前端所有绝对日期展示格式。
 */
const DATE_DISPLAY_FORMAT = 'MMM dd, yyyy';

/**
 * 合并 Tailwind 类名字符串。
 * @param {...any} inputs 任意数量的类名输入参数。
 * @returns {string} 返回合并后的最终类名字符串。
 * @description 同时处理条件类名拼接与 Tailwind 冲突类覆盖。
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化绝对日期字符串。
 * @param {string | number | Date | null | undefined} dateValue 原始日期值。
 * @returns {string} 返回格式化后的日期文案；无值时返回空字符串。
 * @description 用于文章、项目等列表中的标准日期展示。
 */
export function formatDate(dateValue) {
  if (!dateValue) {
    return '';
  }

  return format(new Date(dateValue), DATE_DISPLAY_FORMAT);
}

/**
 * 格式化相对时间文案。
 * @param {string | number | Date | null | undefined} dateValue 原始日期值。
 * @returns {string} 返回“几分钟前”这类相对时间文案；无值时返回空字符串。
 * @description 用于动态时间描述和最近更新时间提示。
 */
export function formatRelativeDate(dateValue) {
  if (!dateValue) {
    return '';
  }

  return formatDistanceToNow(new Date(dateValue), { addSuffix: true });
}
