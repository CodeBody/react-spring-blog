import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * 根节点 DOM 容器。
 * 业务含义：作为整个 React 应用的唯一挂载点。
 */
const rootElement = document.getElementById('root');

/**
 * React 应用根实例。
 * 取值范围：`react-dom/client` 返回的根渲染对象。
 */
const appRoot = createRoot(rootElement);

/**
 * 挂载前端应用。
 * @returns {void} 无返回值。
 * @description 使用严格模式包裹应用，便于在开发环境发现潜在副作用。
 */
const renderApplication = () => {
  appRoot.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

renderApplication();
