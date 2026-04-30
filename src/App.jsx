import React from 'react';
import { LazyMotion, domMax } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { router } from './router';

/**
 * Framer Motion 功能集。
 * 业务含义：为全局 `m.*` 动效组件提供动画、布局与退出能力。
 */
const MOTION_FEATURES = domMax;

/**
 * 应用根组件，负责挂载全局上下文与路由系统。
 * @returns {JSX.Element} 返回完整应用树。
 * @description 该组件不承载业务逻辑，只负责装配顶层依赖。
 */
function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <LazyMotion features={MOTION_FEATURES}>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          />
        </LazyMotion>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
