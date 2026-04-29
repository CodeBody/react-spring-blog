import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useBlog } from '../../context/BlogContext';
import Toast from '../common/Toast';

/**
 * 前台导航链接集合。
 * 业务含义：统一维护前台头部导航的名称与路径映射。
 */
const NAV_LINKS = [
  { name: '博文', path: '/' },
  { name: '项目', path: '/projects' },
  { name: '关于', path: '/about' },
  { name: '联系', path: '/contact' },
];

/**
 * 读取浏览器中缓存的主题状态。
 * @returns {boolean} 返回是否启用深色模式。
 * @description 当前项目以非 `light` 值视为深色模式开启。
 */
const getStoredDarkMode = () => localStorage.getItem('theme') !== 'light';

/**
 * 将主题状态同步到文档根节点与本地存储。
 * @param {boolean} darkMode 是否启用深色模式。
 * @returns {void} 无返回值。
 */
const applyTheme = (darkMode) => {
  const nextTheme = darkMode ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', darkMode);
  localStorage.setItem('theme', nextTheme);
};

/**
 * 计算站点品牌展示名称。
 * @param {Record<string, any>} profile 当前管理员资料对象。
 * @returns {string} 返回头部品牌文案。
 */
const getBrandName = (profile) => profile?.name || '夏了个天.';

/**
 * 计算页脚简称展示名称。
 * @param {Record<string, any>} profile 当前管理员资料对象。
 * @returns {string} 返回页脚简称文案。
 */
const getFooterBrandName = (profile) => (profile?.name ? `${profile.name.split(' ')[0]}.` : 'CodeBody.');

/**
 * 计算版权区域展示名称。
 * @param {Record<string, any>} profile 当前管理员资料对象。
 * @returns {string} 返回版权名称文案。
 */
const getCopyrightName = (profile) => (profile?.name ? profile.name.split(' ')[0] : 'CodeBody');

/**
 * 判断指定导航是否为当前激活路径。
 * @param {string} currentPath 当前路由路径。
 * @param {string} targetPath 目标路由路径。
 * @returns {boolean} 命中当前路径时返回 `true`。
 */
const isActivePath = (currentPath, targetPath) => {
  if (targetPath !== '/') {
    return currentPath === targetPath;
  }

  return ['/', '/articles'].includes(currentPath) || currentPath.startsWith('/article/') || currentPath.startsWith('/category/');
};

/**
 * 前台头部组件。
 * @param {{currentPath: string}} props 组件入参。
 * @param {string} props.currentPath 当前路由路径。
 * @returns {JSX.Element} 返回前台头部区域。
 */
const Header = ({ currentPath }) => {
  /**
   * 当前移动端菜单展开状态。
   * 取值范围：`true` 表示展开，`false` 表示收起。
   */
  const [isOpen, setIsOpen] = useState(false);
  /**
   * 当前页面是否已滚动超过头部阈值。
   * 取值范围：`true` / `false`。
   */
  const [isScrolled, setIsScrolled] = useState(false);
  /**
   * 当前管理员资料对象。
   * 业务含义：用于渲染站点品牌名称。
   */
  const { profile } = useBlog();
  /**
   * 当前主题状态。
   * 取值范围：`true` 表示深色，`false` 表示浅色。
   */
  const [darkMode, setDarkMode] = useState(getStoredDarkMode);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  useEffect(() => {
    /**
     * 页面滚动监听函数。
     * 业务含义：在滚动超过 20 像素时切换头部样式。
     */
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * 切换页面主题。
   * @returns {void} 无返回值。
   */
  const toggleTheme = () => {
    setDarkMode((previousDarkMode) => !previousDarkMode);
  };

  /**
   * 关闭移动端菜单。
   * @returns {void} 无返回值。
   */
  const closeMenu = () => {
    setIsOpen(false);
  };

  /**
   * 切换移动端菜单展开状态。
   * @returns {void} 无返回值。
   */
  const toggleMenu = () => {
    setIsOpen((previousOpen) => !previousOpen);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-glass backdrop-blur-md border-b border-border shadow-sm' : 'py-5 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={closeMenu} className="shrink-0 flex items-center">
            <span className="font-display text-[1.5rem] font-[800] tracking-[-0.03em] bg-foreground text-transparent bg-clip-text transition-all duration-300 hover:gradient-text">
              {getBrandName(profile)}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[0.95rem] font-medium py-2 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[image:var(--gradient-brand)] after:transition-all after:duration-300 hover:after:w-full hover:text-foreground transition-colors ${isActivePath(currentPath, link.path) ? 'text-foreground after:w-full' : 'text-muted-foreground'}`}
              >
                {link.name}
              </Link>
            ))}
            <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-background-secondary transition-all">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          <div className="flex items-center md:hidden gap-4">
            <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-background-secondary transition-all">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={toggleMenu} className="text-muted-foreground hover:text-foreground p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full left-0 top-full">
          <div className="px-6 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActivePath(currentPath, link.path) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

/**
 * 前台页脚组件。
 * @returns {JSX.Element} 返回前台页脚区域。
 */
const Footer = () => {
  /**
   * 当前管理员资料对象。
   * 业务含义：用于渲染页脚品牌和社交链接。
   */
  const { profile } = useBlog();
  /**
   * 当前版权年份。
   * 取值范围：四位数字年份。
   */
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto w-full bg-card pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-16 gap-8">
          <div className="text-center md:text-left">
            <Link to="/" className="font-display text-[1.5rem] font-[800] tracking-[-0.03em] bg-foreground text-transparent bg-clip-text hover:gradient-text transition-all duration-300">
              {getFooterBrandName(profile)}
            </Link>
            <p className="text-muted-foreground text-[0.95rem] mt-2">
              用心设计并建造。
            </p>
          </div>
          <div className="flex space-x-6">
            {profile?.socials?.github && (
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:-translate-y-1 hover:text-foreground transition-all duration-300">
                <span className="sr-only">GitHub</span>
                <FaGithub size={24} />
              </a>
            )}
            {profile?.socials?.twitter && (
              <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:-translate-y-1 hover:text-foreground transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <FaTwitter size={24} />
              </a>
            )}
            {profile?.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:-translate-y-1 hover:text-foreground transition-all duration-300">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin size={24} />
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-[0.9rem] text-muted-foreground">
          <p>&copy; {currentYear} {getCopyrightName(profile)}. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

/**
 * 前台整体布局组件。
 * @returns {JSX.Element} 返回前台页面布局。
 * @description 负责装配头部、主体内容、页脚和全局提示。
 */
export default function FrontendLayout() {
  /**
   * 当前路由位置信息。
   * 业务含义：用于判断导航激活态和页脚显隐。
   */
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header currentPath={location.pathname} />
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
