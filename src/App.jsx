import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import { router } from './router';

/**
 * 应用根组件，负责挂载全局上下文与路由系统。
 * @returns {JSX.Element} 返回完整应用树。
 * @description 该组件不承载业务逻辑，只负责装配顶层依赖。
 */
function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
