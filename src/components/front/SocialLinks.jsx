import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { cn } from '../../utils';

/**
 * 社交平台展示配置。
 * 业务含义：统一维护平台名称、图标与交互色彩。
 */
const SOCIAL_PLATFORM_CONFIG = {
  github: { label: 'GitHub', icon: FaGithub },
  twitter: { label: 'Twitter', icon: FaTwitter },
  linkedin: { label: 'LinkedIn', icon: FaLinkedin },
  email: { label: '邮箱', icon: Mail },
};

/**
 * 社交平台排序集合。
 * 业务含义：确保前台各处社交链接顺序一致。
 */
const SOCIAL_PLATFORM_ORDER = ['github', 'twitter', 'linkedin', 'email'];

/**
 * 构建社交链接数据源。
 * @param {Record<string, any> | null | undefined} profile 当前管理员资料对象。
 * @param {boolean} includeEmail 是否附加邮箱入口。
 * @param {string} emailAddress 邮件地址字符串。
 * @returns {Array<Record<string, any>>} 返回可渲染的社交链接数组。
 */
const buildSocialItems = (profile, includeEmail, emailAddress) => {
  /**
   * 当前站点配置的社交地址对象。
   * 取值范围：GitHub、Twitter、LinkedIn 链接集合。
   */
  const socials = profile?.socials || {};

  return SOCIAL_PLATFORM_ORDER.map((key) => {
    if (key === 'email') {
      return includeEmail ? { key, href: `mailto:${emailAddress}` } : null;
    }

    return socials[key] ? { key, href: socials[key] } : null;
  }).filter(Boolean);
};

/**
 * 获取通用链接基础样式。
 * @param {'icon'|'pill'|'footer'} variant 当前展示变体。
 * @returns {string} 返回基础类名字符串。
 */
const getVariantBaseClassName = (variant) => {
  if (variant === 'pill') {
    return 'flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-1 group';
  }

  if (variant === 'footer') {
    return 'text-muted-foreground hover:-translate-y-1 transition-all duration-300';
  }

  return 'p-3 bg-muted rounded-full transition-all';
};

/**
 * 获取不同平台在不同变体下的交互样式。
 * @param {'icon'|'pill'|'footer'} variant 当前展示变体。
 * @param {'github'|'twitter'|'linkedin'|'email'} key 当前平台标识。
 * @returns {string} 返回交互类名字符串。
 */
const getPlatformAccentClassName = (variant, key) => {
  if (variant === 'footer') {
    return 'hover:text-foreground';
  }

  if (variant === 'pill') {
    /**
     * 胶囊按钮平台强调色映射。
     * 业务含义：保留原页面对不同社交平台的差异化高亮风格。
     */
    const pillAccentMap = {
      github: 'hover:border-brand-primary hover:text-brand-primary hover:shadow-glow',
      twitter: 'hover:border-[#1DA1F2] hover:text-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.2)]',
      linkedin: 'hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.2)]',
      email: 'hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    };

    return pillAccentMap[key];
  }

  /**
   * 圆形图标平台强调色映射。
   * 业务含义：复用关于页原有的悬停视觉反馈。
   */
  const iconAccentMap = {
    github: 'hover:bg-primary hover:text-primary-foreground',
    twitter: 'hover:bg-primary hover:text-primary-foreground',
    linkedin: 'hover:bg-[#0A66C2] hover:text-white',
    email: 'hover:bg-red-500 hover:text-white',
  };

  return iconAccentMap[key];
};

/**
 * 获取图标尺寸。
 * @param {'icon'|'pill'|'footer'} variant 当前展示变体。
 * @returns {number} 返回图标像素尺寸。
 */
const getIconSize = (variant) => {
  if (variant === 'footer') {
    return 24;
  }

  return 20;
};

/**
 * 获取图标缩放动效类名。
 * @param {'icon'|'pill'|'footer'} variant 当前展示变体。
 * @returns {string} 返回图标类名。
 */
const getIconMotionClassName = (variant) => (variant === 'pill' ? 'group-hover:scale-110 transition-transform' : '');

/**
 * 社交链接项组件。
 * @param {object} props 组件入参。
 * @param {Record<string, any>} props.item 当前链接项数据。
 * @param {'icon'|'pill'|'footer'} props.variant 当前展示变体。
 * @returns {JSX.Element} 返回单个社交链接节点。
 */
const SocialLinkItem = ({ item, variant }) => {
  /**
   * 当前平台配置对象。
   * 业务含义：提供平台标签与图标组件。
   */
  const platformConfig = SOCIAL_PLATFORM_CONFIG[item.key];
  /**
   * 当前平台图标组件。
   * 取值范围：React 图标组件。
   */
  const Icon = platformConfig.icon;

  return (
    <a
      href={item.href}
      target={item.key === 'email' ? undefined : '_blank'}
      rel={item.key === 'email' ? undefined : 'noreferrer'}
      aria-label={platformConfig.label}
      className={cn(getVariantBaseClassName(variant), getPlatformAccentClassName(variant, item.key))}
    >
      <Icon size={getIconSize(variant)} className={getIconMotionClassName(variant)} />
      {variant === 'pill' ? <span className="font-medium">{platformConfig.label}</span> : null}
      {variant === 'footer' ? <span className="sr-only">{platformConfig.label}</span> : null}
    </a>
  );
};

/**
 * 前台通用社交链接组件。
 * @param {object} props 组件入参。
 * @param {Record<string, any> | null | undefined} props.profile 当前管理员资料对象。
 * @param {'icon'|'pill'|'footer'} [props.variant='icon'] 当前展示变体。
 * @param {boolean} [props.includeEmail=false] 是否追加邮箱入口。
 * @param {string} [props.emailAddress='hello@example.com'] 邮件地址字符串。
 * @param {string | undefined} props.className 外层容器额外类名。
 * @returns {JSX.Element | null} 返回社交链接列表；无数据时返回 `null`。
 */
export default function SocialLinks({
  profile,
  variant = 'icon',
  includeEmail = false,
  emailAddress = 'hello@example.com',
  className,
}) {
  /**
   * 当前可展示的社交链接集合。
   * 取值范围：前台允许公开展示的社交项数组。
   */
  const items = buildSocialItems(profile, includeEmail, emailAddress);

  if (!items.length) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-4', className)}>
      {items.map((item) => (
        <SocialLinkItem key={item.key} item={item} variant={variant} />
      ))}
    </div>
  );
}
