/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { lazy, Suspense } from 'react';

// Layouts (Static)
import FrontendLayout from '../components/front/FrontendLayout';
import AdminLayout from '../components/admin/AdminLayout';
import Home from '../pages/front/Home';
import ArticleDetail from '../pages/front/ArticleDetail';
import About from '../pages/front/About';
import Projects from '../pages/front/Projects';
import Contact from '../pages/front/Contact';
/**
 * 后台登录页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const Login = lazy(() => import('../pages/admin/Login'));
/**
 * 后台仪表盘页面组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
/**
 * 后台文章列表页面组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const Posts = lazy(() => import('../pages/admin/Posts'));
/**
 * 后台分类页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const Categories = lazy(() => import('../pages/admin/Categories'));
/**
 * 后台标签页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const Tags = lazy(() => import('../pages/admin/Tags'));
/**
 * 后台用户页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const Users = lazy(() => import('../pages/admin/Users'));
/**
 * 后台文章编辑页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const EditArticle = lazy(() => import('../pages/admin/EditArticle'));
/**
 * 后台项目列表页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const AdminProjects = lazy(() => import('../pages/admin/Projects'));
/**
 * 后台项目编辑页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const EditProject = lazy(() => import('../pages/admin/EditProject'));
/**
 * 后台设置页组件，按需加载以降低首屏体积。
 * 取值范围：React Lazy 组件。
 */
const Settings = lazy(() => import('../pages/admin/Settings'));

/**
 * 懒加载页面的统一占位视图。
 * @returns {JSX.Element} 返回全局加载动画。
 * @description 仅在路由模块按需加载期间展示。
 */
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

/**
 * 为任意子页面包裹 Suspense。
 * @param {{children: React.ReactNode}} props 组件入参。
 * @param {React.ReactNode} props.children 被懒加载包装的子节点。
 * @returns {JSX.Element} 返回带统一 fallback 的 Suspense 包装器。
 */
const LazyLoad = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

/**
 * 后台受保护路由组件。
 * @param {{children: React.ReactNode}} props 组件入参。
 * @param {React.ReactNode} props.children 需要鉴权保护的子节点。
 * @returns {JSX.Element} 已登录时渲染原内容，否则跳转登录页。
 */
const ProtectedRoute = ({ children }) => {
  /**
   * 当前后台登录状态。
   * 取值范围：`true` / `false`。
   */
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

/**
 * 应用全局路由实例。
 * 取值范围：React Router Browser Router 对象。
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'articles', element: <Home /> },
      { path: 'category/:categoryId', element: <Home /> },
      { path: 'article/:id', element: <ArticleDetail /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin/login',
    element: <LazyLoad><Login /></LazyLoad>,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <LazyLoad><Dashboard /></LazyLoad> },
      { path: 'posts', element: <LazyLoad><Posts /></LazyLoad> },
      { path: 'categories', element: <LazyLoad><Categories /></LazyLoad> },
      { path: 'tags', element: <LazyLoad><Tags /></LazyLoad> },
      { path: 'users', element: <LazyLoad><Users /></LazyLoad> },
      { path: 'projects', element: <LazyLoad><AdminProjects /></LazyLoad> },
      { path: 'project/new', element: <LazyLoad><EditProject /></LazyLoad> },
      { path: 'project/edit/:id', element: <LazyLoad><EditProject /></LazyLoad> },
      { path: 'article/new', element: <LazyLoad><EditArticle /></LazyLoad> },
      { path: 'article/edit/:id', element: <LazyLoad><EditArticle /></LazyLoad> },
      { path: 'settings', element: <LazyLoad><Settings /></LazyLoad> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});
