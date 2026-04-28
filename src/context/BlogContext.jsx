/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  createArticle,
  createCategory,
  createProject as createProjectApi,
  createTag,
  createUser,
  deleteArticleApi,
  deleteCategory as deleteCategoryApi,
  deleteProject as deleteProjectApi,
  deleteTag as deleteTagApi,
  deleteUser as deleteUserApi,
  fetchAdminArticleById,
  fetchAdminArticles,
  fetchAdminProfile,
  fetchAdminProjects,
  fetchAllUsers,
  fetchArticleById,
  fetchArticles,
  fetchCategories,
  fetchDashboardStats,
  fetchProjects,
  fetchTags,
  updateArticleApi,
  updateCategory as updateCategoryApi,
  updateProject as updateProjectApi,
  updateTag as updateTagApi,
  updateUser as updateUserApi,
} from '../utils/api';

/**
 * 博客业务上下文，负责集中管理前后台共享数据。
 * 取值范围：React Context 对象。
 */
const BlogContext = createContext();

/**
 * 读取博客上下文。
 * @returns {Record<string, any>} 返回博客上下文对象。
 * @description 仅允许在 `BlogProvider` 子树内调用。
 */
export const useBlog = () => useContext(BlogContext);

/**
 * 将单篇文章写回本地缓存。
 * @param {any[]} previousArticles 旧文章列表。
 * @param {Record<string, any>} articleData 新文章详情。
 * @returns {any[]} 返回合并后的文章列表。
 */
const mergeArticle = (previousArticles, articleData) => {
  /**
   * 当前文章在缓存数组中的位置。
   * 取值范围：`-1` 表示不存在，其余为数组索引。
   */
  const articleIndex = previousArticles.findIndex((article) => article.id === articleData.id);

  if (articleIndex > -1) {
    /**
     * 更新后的文章缓存副本。
     * 取值范围：与 `previousArticles` 结构一致。
     */
    const nextArticles = [...previousArticles];
    nextArticles[articleIndex] = articleData;
    return nextArticles;
  }

  return [...previousArticles, articleData];
};

/**
 * 从本地存储读取管理员资料兜底值。
 * @returns {Record<string, any>} 返回管理员资料对象；无缓存时返回空对象。
 */
const getStoredProfile = () => {
  /**
   * 浏览器中缓存的管理员资料 JSON 字符串。
   * 取值范围：`null` 或 JSON 字符串。
   */
  const storedProfile = localStorage.getItem('blog_profile');

  return storedProfile ? JSON.parse(storedProfile) : {};
};

/**
 * 业务上下文提供者，负责统一维护列表、详情和后台操作。
 * @param {{children: React.ReactNode}} props Provider 入参。
 * @param {React.ReactNode} props.children 需要消费博客上下文的子节点。
 * @returns {JSX.Element} 返回博客上下文提供器。
 */
export const BlogProvider = ({ children }) => {
  /**
   * 当前前后台共享的文章缓存列表。
   * 取值范围：文章对象数组。
   */
  const [articles, setArticles] = useState([]);
  /**
   * 当前公开分类列表缓存。
   * 取值范围：分类对象数组。
   */
  const [categories, setCategories] = useState([]);
  /**
   * 当前公开标签列表缓存。
   * 取值范围：标签对象数组。
   */
  const [tags, setTags] = useState([]);
  /**
   * 当前项目列表缓存。
   * 取值范围：项目对象数组。
   */
  const [projects, setProjects] = useState([]);
  /**
   * 当前项目总数，用于分页组件渲染。
   * 取值范围：大于等于 0 的整数。
   */
  const [totalProjects, setTotalProjects] = useState(0);
  /**
   * 当前后台用户列表缓存。
   * 取值范围：用户对象数组。
   */
  const [users, setUsers] = useState([]);
  /**
   * 当前管理员资料对象。
   * 取值范围：资料对象；未加载时为空对象。
   */
  const [profile, setProfile] = useState({});
  /**
   * 当前后台仪表盘统计信息。
   * 取值范围：统计 DTO 或 `null`。
   */
  const [dashboardStats, setDashboardStats] = useState(null);
  /**
   * 当前全局加载状态，供页面显示骨架或禁用操作。
   * 取值范围：`true` / `false`。
   */
  const [loading, setLoading] = useState(false);
  /**
   * 当前文章总数，用于分页组件渲染。
   * 取值范围：大于等于 0 的整数。
   */
  const [totalArticles, setTotalArticles] = useState(0);
  /**
   * 当前页面待展示的全局通知队列。
   * 取值范围：Toast 对象数组。
   */
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  /**
   * 在执行异步任务期间自动维护全局 loading。
   * @param {() => Promise<any>} task 需要执行的异步任务。
   * @returns {Promise<any>} 返回任务原始结果。
   */
  const withLoading = async (task) => {
    setLoading(true);

    try {
      return await task();
    } finally {
      setLoading(false);
    }
  };

  /**
   * 当写接口成功时刷新对应列表。
   * @param {Promise<any>} actionPromise 写接口 Promise。
   * @param {() => Promise<void>} refreshAction 成功后的刷新动作。
   * @returns {Promise<any>} 返回写接口原始结果。
   */
  const refreshAfterSuccess = async (actionPromise, refreshAction) => {
    /**
     * 写接口返回的标准响应对象。
     * 取值范围：包含 `code/data/message` 字段的对象。
     */
    const result = await actionPromise;

    if (result.code === 200) {
      await refreshAction();
    }

    return result;
  };

  /**
   * 显示全局提示消息并在指定时间后自动移除。
   * @param {string} message 提示文案。
   * @param {'success' | 'error' | 'warning' | 'info'} [type='success'] 提示类型。
   * @param {number} [duration=3000] 展示时长，单位毫秒。
   * @returns {void} 无返回值。
   */
  const showToast = (message, type = 'success', duration = 3000) => {
    /**
     * 当前提示消息的唯一标识。
     * 取值范围：基于毫秒时间戳生成的整数。
     */
    const toastId = Date.now();
    setToasts((previousToasts) => [...previousToasts, { id: toastId, message, type }]);

    setTimeout(() => {
      setToasts((previousToasts) => previousToasts.filter((toast) => toast.id !== toastId));
    }, duration);
  };

  /**
   * 获取后台用户列表并写入缓存。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchUsers = async () => {
    /**
     * 当前后台用户列表结果。
     * 取值范围：用户对象数组。
     */
    const userList = await fetchAllUsers();
    setUsers(userList || []);
  };

  /**
   * 获取前台文章分页数据并写入缓存。
   * @param {number} [page=1] 页码，从 1 开始。
   * @param {number} [size=50] 每页条数。
   * @param {string | number | null} [catId=null] 分类 ID。
   * @param {string} [keyword=''] 搜索关键词。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchArticlesData = async (page = 1, size = 50, catId = null, keyword = '') => withLoading(async () => {
    /**
     * 当前文章分页结果。
     * 取值范围：包含 `records` 和 `total` 的分页对象。
     */
    const data = await fetchArticles(page, size, catId, keyword);
    setArticles(data.records || []);
    setTotalArticles(data.total || 0);
  });

  /**
   * 获取后台文章分页数据并写入缓存。
   * @param {number} [page=1] 页码，从 1 开始。
   * @param {number} [size=5] 每页条数。
   * @param {string | number | null} [catId=null] 分类 ID。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchAdminArticlesData = async (page = 1, size = 5, catId = null) => withLoading(async () => {
    /**
     * 当前后台文章分页结果。
     * 取值范围：包含 `records` 和 `total` 的分页对象。
     */
    const data = await fetchAdminArticles(page, size, catId);
    setArticles(data.records || []);
    setTotalArticles(data.total || 0);
  });

  /**
   * 获取前台文章详情并合并到本地缓存。
   * @param {string | number} id 文章主键 ID。
   * @returns {Promise<Record<string, any> | null>} 返回文章详情对象或 `null`。
   */
  const fetchSingleArticle = async (id) => withLoading(async () => {
    /**
     * 当前文章详情对象。
     * 取值范围：文章对象或 `null`。
     */
    const data = await fetchArticleById(id);

    if (data) {
      setArticles((previousArticles) => mergeArticle(previousArticles, data));
    }

    return data;
  });

  /**
   * 获取后台文章详情并合并到本地缓存。
   * @param {string | number} id 文章主键 ID。
   * @returns {Promise<Record<string, any> | null>} 返回文章详情对象或 `null`。
   */
  const fetchAdminSingleArticle = async (id) => withLoading(async () => {
    /**
     * 当前后台文章详情对象。
     * 取值范围：文章对象或 `null`。
     */
    const data = await fetchAdminArticleById(id);

    if (data) {
      setArticles((previousArticles) => mergeArticle(previousArticles, data));
    }

    return data;
  });

  /**
   * 获取分类列表并写入缓存。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchCategoriesData = async () => {
    /**
     * 当前分类列表结果。
     * 取值范围：分类对象数组。
     */
    const categoryList = await fetchCategories();
    setCategories(categoryList || []);
  };

  /**
   * 获取标签列表并写入缓存。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchTagsData = async () => {
    /**
     * 当前标签列表结果。
     * 取值范围：标签对象数组。
     */
    const tagList = await fetchTags();
    setTags(tagList || []);
  };

  /**
   * 获取后台仪表盘统计并写入缓存。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchDashboardData = async () => {
    /**
     * 当前仪表盘统计 DTO。
     * 取值范围：统计对象或 `null`。
     */
    const stats = await fetchDashboardStats();
    setDashboardStats(stats);
  };

  /**
   * 获取前台项目分页数据并写入缓存。
   * @param {number} [page=1] 页码，从 1 开始。
   * @param {number} [size=6] 每页条数。
   * @param {string} [title=''] 标题搜索词。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchProjectsData = async (page = 1, size = 6, title = '') => withLoading(async () => {
    /**
     * 当前项目分页结果。
     * 取值范围：包含 `records` 和 `total` 的分页对象。
     */
    const data = await fetchProjects(page, size, title);
    setProjects(data.records || []);
    setTotalProjects(data.total || 0);
  });

  /**
   * 获取后台项目分页数据并写入缓存。
   * @param {number} [page=1] 页码，从 1 开始。
   * @param {number} [size=10] 每页条数。
   * @param {string} [title=''] 标题搜索词。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchAdminProjectsData = async (page = 1, size = 10, title = '') => withLoading(async () => {
    /**
     * 当前后台项目分页结果。
     * 取值范围：包含 `records` 和 `total` 的分页对象。
     */
    const data = await fetchAdminProjects(page, size, title);
    setProjects(data.records || []);
    setTotalProjects(data.total || 0);
  });

  /**
   * 获取管理员资料并写入缓存。
   * @returns {Promise<void>} 无显式返回值。
   */
  const fetchProfileData = async () => {
    /**
     * 当前管理员资料结果。
     * 取值范围：资料对象或 `null`。
     */
    const adminProfile = await fetchAdminProfile();
    setProfile(adminProfile || getStoredProfile());
  };

  /**
   * 新增文章并在成功后刷新文章列表。
   * @param {Record<string, any>} newArticle 新文章表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const addArticle = async (newArticle) => refreshAfterSuccess(createArticle(newArticle), fetchArticlesData);

  /**
   * 更新文章并在成功后刷新文章列表。
   * @param {Record<string, any>} updatedArticle 更新后的文章表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const updateArticle = async (updatedArticle) => refreshAfterSuccess(updateArticleApi(updatedArticle), fetchArticlesData);

  /**
   * 删除文章并在成功后刷新文章列表。
   * @param {string | number} id 文章主键 ID。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const deleteArticle = async (id) => refreshAfterSuccess(deleteArticleApi(id), fetchArticlesData);

  /**
   * 新增分类并在成功后刷新分类列表。
   * @param {Record<string, any>} category 分类表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const addCategory = async (category) => refreshAfterSuccess(createCategory(category), fetchCategoriesData);

  /**
   * 更新分类并在成功后刷新分类列表。
   * @param {Record<string, any>} category 分类表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const updateCategory = async (category) => refreshAfterSuccess(updateCategoryApi(category), fetchCategoriesData);

  /**
   * 删除分类并在成功后刷新分类列表。
   * @param {string | number} id 分类主键 ID。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const deleteCategory = async (id) => refreshAfterSuccess(deleteCategoryApi(id), fetchCategoriesData);

  /**
   * 新增标签并在成功后刷新标签列表。
   * @param {Record<string, any>} tag 标签表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const addTag = async (tag) => refreshAfterSuccess(createTag(tag), fetchTagsData);

  /**
   * 更新标签并在成功后刷新标签列表。
   * @param {Record<string, any>} tag 标签表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const updateTag = async (tag) => refreshAfterSuccess(updateTagApi(tag), fetchTagsData);

  /**
   * 删除标签并在成功后刷新标签列表。
   * @param {string | number} id 标签主键 ID。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const deleteTag = async (id) => refreshAfterSuccess(deleteTagApi(id), fetchTagsData);

  /**
   * 新增后台用户并在成功后刷新用户列表。
   * @param {Record<string, any>} user 用户表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const addUser = async (user) => refreshAfterSuccess(createUser(user), fetchUsers);

  /**
   * 更新后台用户并在成功后刷新用户列表。
   * @param {Record<string, any>} user 用户表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const updateUser = async (user) => refreshAfterSuccess(updateUserApi(user), fetchUsers);

  /**
   * 删除后台用户并在成功后刷新用户列表。
   * @param {string | number} id 用户主键 ID。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const deleteUser = async (id) => refreshAfterSuccess(deleteUserApi(id), fetchUsers);

  /**
   * 新增项目并在成功后刷新项目列表。
   * @param {Record<string, any>} project 项目表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const addProject = async (project) => refreshAfterSuccess(createProjectApi(project), fetchProjectsData);

  /**
   * 更新项目并在成功后刷新项目列表。
   * @param {Record<string, any>} project 项目表单对象。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const updateProjectAction = async (project) => refreshAfterSuccess(updateProjectApi(project), fetchProjectsData);

  /**
   * 删除项目并在成功后刷新项目列表。
   * @param {string | number} id 项目主键 ID。
   * @returns {Promise<any>} 返回后端标准响应对象。
   */
  const deleteProjectAction = async (id) => refreshAfterSuccess(deleteProjectApi(id), fetchProjectsData);

  /**
   * 更新管理员资料并同步到本地存储。
   * @param {Record<string, any>} updatedProfile 更新后的管理员资料对象。
   * @returns {void} 无返回值。
   */
  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem('blog_profile', JSON.stringify(updatedProfile));
  };

  /**
   * 提供给整个应用消费的上下文值对象。
   * 取值范围：仅包含本模块公开的状态与动作。
   */
  const contextValue = {
    articles,
    totalArticles,
    categories,
    tags,
    projects,
    totalProjects,
    users,
    profile,
    dashboardStats,
    loading,
    addArticle,
    updateArticle,
    deleteArticle,
    addCategory,
    updateCategory,
    deleteCategory,
    addTag,
    updateTag,
    deleteTag,
    addUser,
    updateUser,
    deleteUser,
    fetchUsers,
    fetchArticles: fetchArticlesData,
    fetchAdminArticles: fetchAdminArticlesData,
    fetchCategories: fetchCategoriesData,
    fetchTags: fetchTagsData,
    fetchProjects: fetchProjectsData,
    fetchAdminProjects: fetchAdminProjectsData,
    addProject,
    updateProject: updateProjectAction,
    deleteProject: deleteProjectAction,
    fetchProfile: fetchProfileData,
    fetchDashboardData,
    updateProfile,
    fetchSingleArticle,
    fetchAdminSingleArticle,
    toasts,
    showToast,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  );
};
