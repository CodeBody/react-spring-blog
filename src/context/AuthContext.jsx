/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { loginApi } from '../utils/api';

/**
 * 后台认证上下文，统一暴露登录态和认证动作。
 * 取值范围：React Context 对象。
 */
const AuthContext = createContext();

/**
 * 读取后台认证上下文。
 * @returns {{isAuthenticated: boolean, login: Function, logout: Function}} 返回认证上下文对象。
 * @description 仅允许在 `AuthProvider` 子树内调用。
 */
export const useAuth = () => useContext(AuthContext);

/**
 * 读取浏览器中缓存的后台登录状态。
 * @returns {boolean} 返回是否已标记为后台已登录。
 * @description 该状态与服务端令牌校验解耦，仅作为前端路由守卫依据。
 */
const getStoredAuthState = () => localStorage.getItem('isBlogAdmin') === 'true';

/**
 * 认证上下文提供者，负责维护后台登录态。
 * @param {{children: React.ReactNode}} props Provider 入参。
 * @param {React.ReactNode} props.children 需要消费认证上下文的子节点。
 * @returns {JSX.Element} 返回认证上下文提供器。
 */
export const AuthProvider = ({ children }) => {
  /**
   * 当前后台路由守卫使用的认证状态。
   * 取值范围：`true` 表示已登录，`false` 表示未登录。
   */
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuthState);

  /**
   * 执行后台登录动作并同步前端登录状态。
   * @param {string} username 后台登录用户名。
   * @param {string} password 后台登录密码明文。
   * @returns {Promise<boolean>} 登录成功返回 `true`，否则返回 `false`。
   */
  const login = async (username, password) => {
    try {
      /**
       * 登录接口返回的标准响应对象。
       * 取值范围：包含 `code/data/message` 字段的对象。
       */
      const result = await loginApi(username, password);

      if (result.code === 200) {
        setIsAuthenticated(true);
        localStorage.setItem('isBlogAdmin', 'true');
        return true;
      }
    } catch {
      return false;
    }

    return false;
  };

  /**
   * 清理后台登录状态。
   * @returns {void} 无返回值。
   * @description 仅负责清理前端标记，服务端鉴权失效由接口层统一处理。
   */
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isBlogAdmin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
