import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, Moon, Sun, Search, Bell, Layers, Tag as TagIcon, Users, FolderKanban } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';
import Toast from '../common/Toast';

/**
 * 动效版块容器组件。
 * 取值范围：`framer-motion` 提供的 div 动效组件。
 */
const MotionDiv = m.div;

/**
 * 后台导航项集合。
 * 业务含义：统一维护后台菜单的文案、图标和路径映射。
 */
const NAV_ITEMS = [
  { label: '看板', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
  { label: '写作', icon: <FileText size={20} />, path: '/admin/posts' },
  { label: '项目', icon: <FolderKanban size={20} />, path: '/admin/projects' },
  { label: '分类', icon: <Layers size={20} />, path: '/admin/categories' },
  { label: '标签', icon: <TagIcon size={20} />, path: '/admin/tags' },
  { label: '用户', icon: <Users size={20} />, path: '/admin/users' },
  { label: '设置', icon: <Settings size={20} />, path: '/admin/settings' },
];

/**
 * 读取浏览器中缓存的主题状态。
 * @returns {boolean} 返回是否启用深色模式。
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
 * 判断后台导航项是否处于激活态。
 * @param {string} pathname 当前路由路径。
 * @param {string} path 导航项目标路径。
 * @returns {boolean} 命中当前菜单时返回 `true`。
 */
const isActiveNavItem = (pathname, path) => pathname === path || (path !== '/admin' && pathname.startsWith(path));

/**
 * 后台整体布局组件。
 * @returns {JSX.Element} 返回后台布局。
 * @description 负责装配后台侧边栏、头部、内容区和全局提示。
 */
export default function AdminLayout() {
  /**
   * 认证上下文中的退出登录动作。
   * 业务含义：用于后台主动退出。
   */
  const { logout } = useAuth();
  /**
   * 博客上下文中的资料和资料拉取动作。
   * 业务含义：用于渲染后台用户信息区。
   */
  const { profile, fetchProfile } = useBlog();
  /**
   * 路由跳转函数。
   * 业务含义：退出登录后跳转到后台登录页。
   */
  const navigate = useNavigate();
  /**
   * 当前路由位置信息。
   * 业务含义：用于侧边栏激活态和内容切换动效。
   */
  const location = useLocation();
  /**
   * 当前移动端侧边栏展开状态。
   * 取值范围：`true` 表示展开，`false` 表示收起。
   */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  /**
   * 当前后台主题状态。
   * 取值范围：`true` 表示深色，`false` 表示浅色。
   */
  const [darkMode, setDarkMode] = useState(getStoredDarkMode);

  useEffect(() => {
    fetchProfile();
    // 这里保持原有加载时机，避免上下文函数引用变化导致重复请求。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  /**
   * 切换后台主题。
   * @returns {void} 无返回值。
   */
  const toggleTheme = () => {
    setDarkMode((previousDarkMode) => !previousDarkMode);
  };

  /**
   * 关闭移动端侧边栏。
   * @returns {void} 无返回值。
   */
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  /**
   * 打开移动端侧边栏。
   * @returns {void} 无返回值。
   */
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  /**
   * 处理后台退出登录。
   * @returns {void} 无返回值。
   */
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans selection:bg-primary selection:text-primary-foreground">
      <aside className={`fixed inset-y-4 left-4 z-50 w-[260px] rounded-3xl border border-border/50 bg-card/60 backdrop-blur-2xl shadow-xl transition-all duration-700 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[110%]'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="px-2 mb-10 mt-2">
            <Link to="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform duration-500">
                <FileText size={22} strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-display text-xl font-black tracking-tight block leading-none">
                  博客后台管理<span className="text-primary">.</span>
                </span>
                <p className="text-[0.6rem] uppercase tracking-widest text-muted-foreground font-bold opacity-60 mt-1">内容枢纽</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-1">
            {NAV_ITEMS.map((item) => {
              /**
               * 当前导航项是否命中当前路由。
               * 取值范围：`true` / `false`。
               */
              const isActive = isActiveNavItem(location.pathname, item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
                >
                  <span className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:translate-x-1'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <MotionDiv
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-border/40">
            <div className="flex items-center gap-3 px-2 mb-6">
              <div className="w-10 h-10 rounded-2xl border-2 border-background overflow-hidden bg-muted p-0 shadow-sm">
                <img src={profile?.avatar || '/assets/images/avatar-default.svg'} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.7rem] font-bold truncate tracking-tight">{profile?.name || '管理员'}</p>
                <p className="text-[0.55rem] text-muted-foreground truncate uppercase tracking-[0.05em] font-black opacity-40">{profile?.role || '超级管理员'}</p>
              </div>
              <button onClick={handleLogout} className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all" title="退出登录">
                <LogOut size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between px-1">
              <button onClick={toggleTheme} className="group flex-1 flex items-center justify-center gap-2 h-10 rounded-2xl border border-border/50 bg-background/50 hover:bg-accent hover:border-accent transition-all duration-300">
                {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-indigo-500" />}
                <span className="text-[0.6rem] font-bold uppercase tracking-widest">{darkMode ? '浅色' : '深色'}</span>
              </button>
              <div className="ml-4 text-[0.55rem] text-muted-foreground/30 font-black tracking-widest uppercase italic">V 2.1.0</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ml-[280px] min-h-screen flex flex-col relative transition-all duration-500">
        <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
        <div className="fixed bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <header className="h-20 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-40 bg-background/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button onClick={openSidebar} className="lg:hidden p-2.5 rounded-2xl bg-card border border-border/50 text-muted-foreground hover:text-foreground shadow-sm">
              <Menu size={20} />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">工作空间 / 管理员</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 h-10 rounded-2xl bg-card border border-border/50 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search size={16} className="text-muted-foreground/50" />
              <input type="text" placeholder="搜索全局记录..." className="bg-transparent border-none outline-none text-xs font-semibold w-40 placeholder:text-muted-foreground/30 focus:w-56 transition-all" />
              <span className="px-1.5 py-0.5 rounded-md bg-muted text-[0.55rem] font-black text-muted-foreground/50 border border-border/50">⌘ K</span>
            </div>

            <button className="relative w-10 h-10 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-md transition-all">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-card animate-pulse" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 lg:px-12 lg:pb-12 relative z-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={location.pathname}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Outlet />
            </MotionDiv>
          </AnimatePresence>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm lg:hidden transition-all duration-500" onClick={closeSidebar} />
      )}

      <Toast />
    </div>
  );
}
