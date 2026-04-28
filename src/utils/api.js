/**
 * 管理端接口统一前缀，约束所有后台请求都走相同命名空间。
 * 取值范围：固定为 `/api/admin`。
 */
const ADMIN_API_PREFIX = '/api/admin';

/**
 * JSON 请求默认头，适用于需要发送请求体的接口。
 * 取值范围：标准 `Content-Type: application/json`。
 */
const JSON_HEADERS = { 'Content-Type': 'application/json' };

/**
 * 空分页结果占位，避免调用方处理空值分支。
 * 取值范围：`records` 恒为数组，`total` 恒为数字。
 */
const EMPTY_PAGE_RESULT = { records: [], total: 0 };

/**
 * 读取当前登录态的 JWT 并生成鉴权请求头。
 * @returns {Record<string, string>} 返回带有 Authorization 的请求头对象；无令牌时返回空对象。
 * @description 仅负责读取本地存储，不做令牌合法性校验。
 */
const getAuthHeader = () => {
  /**
   * 当前浏览器缓存的后台登录令牌。
   * 取值范围：`null` 或 JWT 字符串。
   */
  const token = localStorage.getItem('blog_token');

  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * 合并请求头并发起带鉴权的请求。
 * @param {string} url 请求地址，通常为站内 `/api` 路径。
 * @param {RequestInit} [options={}] Fetch 原始配置对象。
 * @returns {Promise<Response>} 返回浏览器原生响应对象。
 * @description 当管理端接口返回 401/403 时，会清理令牌并强制跳转登录页。
 */
const fetchWithAuth = async (url, options = {}) => {
  /**
   * 请求最终使用的头信息，包含调用方头和登录态头。
   * 取值范围：标准 Fetch HeadersInit 对象。
   */
  const headers = { ...options.headers, ...getAuthHeader() };
  /**
   * 当前请求返回的原始响应对象。
   * 取值范围：浏览器 `Response` 实例。
   */
  const response = await fetch(url, { ...options, headers });

  if (shouldRedirectToLogin(url, response.status)) {
    redirectToLogin();
    return new Promise(() => {});
  }

  return response;
};

/**
 * 判断当前响应是否需要触发后台登录页重定向。
 * @param {string} url 请求地址，用于识别是否为管理端接口。
 * @param {number} status HTTP 状态码。
 * @returns {boolean} 仅当管理端接口返回 401/403 时返回 `true`。
 */
const shouldRedirectToLogin = (url, status) => {
  /**
   * 当前接口是否属于需要登录态的管理端接口。
   * 取值范围：`true` / `false`。
   */
  const isAdminApi = url.includes(`${ADMIN_API_PREFIX}/`);

  return isAdminApi && (status === 401 || status === 403);
};

/**
 * 清理本地登录令牌并跳转到后台登录页。
 * @returns {void} 无返回值。
 * @description 仅在当前页面不在登录页时执行跳转，避免重复刷新。
 */
const redirectToLogin = () => {
  localStorage.removeItem('blog_token');

  if (window.location.pathname !== '/admin/login') {
    window.location.href = '/admin/login';
  }
};

/**
 * 在 URL 上追加查询参数。
 * @param {string} url 原始请求地址。
 * @param {string} key 参数名。
 * @param {string | number | null | undefined} value 参数值。
 * @returns {string} 返回追加后的 URL；当值为空时原样返回。
 */
const appendQueryParam = (url, key, value) => {
  if (value === null || value === undefined || value === '') {
    return url;
  }

  return `${url}&${key}=${encodeURIComponent(value)}`;
};

/**
 * 解析接口响应中的 JSON 数据。
 * @param {Response} response 原始响应对象。
 * @returns {Promise<any>} 返回反序列化后的 JSON 结果。
 * @description 默认假设后端稳定返回 JSON。
 */
const readJson = async (response) => response.json();

/**
 * 将标准分页响应转换为前端固定结构。
 * @param {any} data 服务端返回的业务数据对象。
 * @param {(item: any) => any} [adapter=(item) => item] 单条记录适配器。
 * @returns {{records: any[], total: number}} 返回固定分页结构。
 */
const buildPageResult = (data, adapter = (item) => item) => ({
  records: (data?.records || []).map(adapter),
  total: data?.total || 0,
});

/**
 * 发起无需鉴权的 GET 请求并返回业务数据。
 * @param {string} url 请求地址。
 * @param {any} fallback 请求失败时返回的兜底值。
 * @param {(data: any) => any} [adapter=(data) => data] 业务数据适配器。
 * @returns {Promise<any>} 返回成功时的业务数据或兜底值。
 */
const requestPublicData = async (url, fallback, adapter = (data) => data) => {
  try {
    /**
     * 当前接口响应对象。
     * 取值范围：浏览器 `Response` 实例。
     */
    const response = await fetch(url);
    /**
     * 当前接口的标准业务响应体。
     * 取值范围：包含 `code/data/message` 字段的对象。
     */
    const result = await readJson(response);

    if (result.code === 200) {
      return adapter(result.data);
    }
  } catch {
    return fallback;
  }

  return fallback;
};

/**
 * 发起需要鉴权的 GET 请求并返回业务数据。
 * @param {string} url 请求地址。
 * @param {any} fallback 请求失败时返回的兜底值。
 * @param {(data: any) => any} [adapter=(data) => data] 业务数据适配器。
 * @returns {Promise<any>} 返回成功时的业务数据或兜底值。
 */
const requestAdminData = async (url, fallback, adapter = (data) => data) => {
  try {
    /**
     * 当前接口响应对象。
     * 取值范围：浏览器 `Response` 实例。
     */
    const response = await fetchWithAuth(url);
    /**
     * 当前接口的标准业务响应体。
     * 取值范围：包含 `code/data/message` 字段的对象。
     */
    const result = await readJson(response);

    if (result.code === 200) {
      return adapter(result.data);
    }
  } catch {
    return fallback;
  }

  return fallback;
};

/**
 * 发起需要鉴权的写接口请求。
 * @param {string} url 请求地址。
 * @param {'POST' | 'PUT' | 'DELETE'} method HTTP 方法。
 * @param {unknown} [payload] 请求体对象；DELETE 等无请求体接口可不传。
 * @returns {Promise<any>} 返回服务端标准响应对象。
 */
const requestAdminMutation = async (url, method, payload) => {
  /**
   * 当前写接口的请求配置。
   * 取值范围：标准 Fetch RequestInit 对象。
   */
  const options = { method };

  if (payload !== undefined) {
    options.headers = JSON_HEADERS;
    options.body = JSON.stringify(payload);
  }

  /**
   * 当前写接口的原始响应对象。
   * 取值范围：浏览器 `Response` 实例。
   */
  const response = await fetchWithAuth(url, options);

  return readJson(response);
};

/**
 * 将文章编辑态数据转换为后端 DTO。
 * @param {Record<string, any>} article 前端文章表单对象。
 * @param {boolean} useAbstract 是否对内容执行摘要预处理。
 * @returns {Record<string, any>} 返回后端保存所需的 DTO 结构。
 */
const buildArticlePayload = (article, useAbstract) => ({
  title: article.title,
  content: useAbstract ? matchAbstractFromContent(article.content) : article.content,
  status: article.status === 'published' ? 1 : 0,
  authorId: 10001,
  categoryId: article.categoryId || null,
  tagIds: article.tagIds || [],
});

/**
 * 生成管理端文章列表请求地址。
 * @param {number} page 页码，从 1 开始。
 * @param {number} size 每页条数。
 * @param {string | number | null} categoryId 分类 ID。
 * @returns {string} 返回拼装完成的请求地址。
 */
const buildAdminArticleUrl = (page, size, categoryId) => {
  /**
   * 管理端文章分页基础地址。
   * 取值范围：固定包含 page 和 size 参数。
   */
  let url = `${ADMIN_API_PREFIX}/articles?page=${page}&size=${size}`;

  return appendQueryParam(url, 'categoryId', categoryId);
};

/**
 * 生成前台文章列表请求地址。
 * @param {number} page 页码，从 1 开始。
 * @param {number} size 每页条数。
 * @param {string | number | null} categoryId 分类 ID。
 * @param {string} keyword 关键词。
 * @returns {string} 返回拼装完成的请求地址。
 */
const buildArticleUrl = (page, size, categoryId, keyword) => {
  /**
   * 前台文章分页基础地址。
   * 取值范围：固定包含 page 和 size 参数。
   */
  let url = `/api/articles?page=${page}&size=${size}`;

  url = appendQueryParam(url, 'categoryId', categoryId);
  return appendQueryParam(url, 'keyword', keyword);
};

/**
 * 生成前后台项目分页请求地址。
 * @param {string} basePath 接口基础地址。
 * @param {number} page 页码，从 1 开始。
 * @param {number} size 每页条数。
 * @param {string} title 项目标题搜索词。
 * @returns {string} 返回拼装完成的请求地址。
 */
const buildProjectUrl = (basePath, page, size, title) => {
  /**
   * 项目分页基础地址。
   * 取值范围：固定包含 page 和 size 参数。
   */
  const url = `${basePath}?page=${page}&size=${size}`;

  return appendQueryParam(url, 'title', title);
};

/**
 * 获取后台文章列表。
 * @param {number} [page=1] 页码，从 1 开始。
 * @param {number} [size=10] 每页条数。
 * @param {string | number | null} [categoryId=null] 分类 ID。
 * @returns {Promise<{records: any[], total: number}>} 返回适配后的文章分页结果。
 */
export const fetchAdminArticles = async (page = 1, size = 10, categoryId = null) => {
  /**
   * 当前文章列表请求地址。
   * 取值范围：管理端文章分页 URL。
   */
  const url = buildAdminArticleUrl(page, size, categoryId);

  return requestAdminData(url, EMPTY_PAGE_RESULT, (data) => buildPageResult(data, adaptArticle));
};

/**
 * 获取前台文章列表。
 * @param {number} [page=1] 页码，从 1 开始。
 * @param {number} [size=50] 每页条数。
 * @param {string | number | null} [categoryId=null] 分类 ID。
 * @param {string} [keyword=''] 搜索关键词。
 * @returns {Promise<{records: any[], total: number}>} 返回适配后的文章分页结果。
 */
export const fetchArticles = async (page = 1, size = 50, categoryId = null, keyword = '') => {
  /**
   * 当前文章列表请求地址。
   * 取值范围：前台文章分页 URL。
   */
  const url = buildArticleUrl(page, size, categoryId, keyword);

  return requestPublicData(url, EMPTY_PAGE_RESULT, (data) => buildPageResult(data, adaptArticle));
};

/**
 * 获取后台文章详情。
 * @param {string | number} id 文章主键 ID。
 * @returns {Promise<Record<string, any> | null>} 返回适配后的文章详情；未命中时返回 `null`。
 */
export const fetchAdminArticleById = async (id) => requestAdminData(
  `${ADMIN_API_PREFIX}/articles/${id}`,
  null,
  adaptArticle,
);

/**
 * 获取前台文章详情。
 * @param {string | number} id 文章主键 ID。
 * @returns {Promise<Record<string, any> | null>} 返回适配后的文章详情；未命中时返回 `null`。
 */
export const fetchArticleById = async (id) => requestPublicData(`/api/articles/${id}`, null, adaptArticle);

/**
 * 获取公开分类列表。
 * @returns {Promise<any[]>} 返回分类数组；失败时返回空数组。
 */
export const fetchCategories = async () => requestPublicData('/api/categories', []);

/**
 * 获取前台项目分页列表。
 * @param {number} [page=1] 页码，从 1 开始。
 * @param {number} [size=6] 每页条数。
 * @param {string} [title=''] 标题搜索词。
 * @returns {Promise<{records: any[], total: number}>} 返回项目分页结果。
 */
export const fetchProjects = async (page = 1, size = 6, title = '') => {
  /**
   * 当前项目列表请求地址。
   * 取值范围：前台项目分页 URL。
   */
  const url = buildProjectUrl('/api/projects', page, size, title);

  return requestPublicData(url, EMPTY_PAGE_RESULT);
};

/**
 * 获取后台项目分页列表。
 * @param {number} [page=1] 页码，从 1 开始。
 * @param {number} [size=10] 每页条数。
 * @param {string} [title=''] 标题搜索词。
 * @returns {Promise<{records: any[], total: number}>} 返回项目分页结果。
 */
export const fetchAdminProjects = async (page = 1, size = 10, title = '') => {
  /**
   * 当前项目列表请求地址。
   * 取值范围：后台项目分页 URL。
   */
  const url = buildProjectUrl(`${ADMIN_API_PREFIX}/projects`, page, size, title);

  return requestAdminData(url, EMPTY_PAGE_RESULT);
};

/**
 * 获取后台单个项目详情。
 * @param {string | number} id 项目主键 ID。
 * @returns {Promise<Record<string, any> | null>} 返回项目详情；未命中时返回 `null`。
 */
export const fetchAdminProjectById = async (id) => requestAdminData(`${ADMIN_API_PREFIX}/projects/${id}`, null);

/**
 * 新增项目。
 * @param {Record<string, any>} project 项目表单对象。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const createProject = async (project) => requestAdminMutation(`${ADMIN_API_PREFIX}/projects`, 'POST', project);

/**
 * 更新项目。
 * @param {Record<string, any>} project 项目表单对象，必须包含 `id`。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const updateProject = async (project) => requestAdminMutation(
  `${ADMIN_API_PREFIX}/projects/${project.id}`,
  'PUT',
  project,
);

/**
 * 删除项目。
 * @param {string | number} id 项目主键 ID。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const deleteProject = async (id) => requestAdminMutation(`${ADMIN_API_PREFIX}/projects/${id}`, 'DELETE');

/**
 * 新增分类。
 * @param {Record<string, any>} category 分类对象。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const createCategory = async (category) => requestAdminMutation(`${ADMIN_API_PREFIX}/categories`, 'POST', category);

/**
 * 更新分类。
 * @param {Record<string, any>} category 分类对象，必须包含 `id`。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const updateCategory = async (category) => requestAdminMutation(
  `${ADMIN_API_PREFIX}/categories/${category.id}`,
  'PUT',
  category,
);

/**
 * 删除分类。
 * @param {string | number} id 分类主键 ID。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const deleteCategory = async (id) => requestAdminMutation(`${ADMIN_API_PREFIX}/categories/${id}`, 'DELETE');

/**
 * 获取公开标签列表。
 * @returns {Promise<any[]>} 返回标签数组；失败时返回空数组。
 */
export const fetchTags = async () => requestPublicData('/api/tags', []);

/**
 * 新增标签。
 * @param {Record<string, any>} tag 标签对象。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const createTag = async (tag) => requestAdminMutation(`${ADMIN_API_PREFIX}/tags`, 'POST', tag);

/**
 * 更新标签。
 * @param {Record<string, any>} tag 标签对象，必须包含 `id`。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const updateTag = async (tag) => requestAdminMutation(`${ADMIN_API_PREFIX}/tags/${tag.id}`, 'PUT', tag);

/**
 * 删除标签。
 * @param {string | number} id 标签主键 ID。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const deleteTag = async (id) => requestAdminMutation(`${ADMIN_API_PREFIX}/tags/${id}`, 'DELETE');

/**
 * 获取后台用户列表。
 * @returns {Promise<any[]>} 返回用户数组；失败时返回空数组。
 */
export const fetchAllUsers = async () => requestAdminData(`${ADMIN_API_PREFIX}/users`, []);

/**
 * 新增后台用户。
 * @param {Record<string, any>} user 用户对象。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const createUser = async (user) => requestAdminMutation(`${ADMIN_API_PREFIX}/users`, 'POST', user);

/**
 * 更新后台用户。
 * @param {Record<string, any>} user 用户对象，必须包含 `id`。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const updateUser = async (user) => requestAdminMutation(`${ADMIN_API_PREFIX}/users/${user.id}`, 'PUT', user);

/**
 * 删除后台用户。
 * @param {string | number} id 用户主键 ID。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const deleteUser = async (id) => requestAdminMutation(`${ADMIN_API_PREFIX}/users/${id}`, 'DELETE');

/**
 * 新增文章。
 * @param {Record<string, any>} article 文章表单对象。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const createArticle = async (article) => {
  /**
   * 提交到后端的文章 DTO。
   * 取值范围：符合文章新增接口字段约束。
   */
  const payload = buildArticlePayload(article, true);

  return requestAdminMutation(`${ADMIN_API_PREFIX}/articles`, 'POST', payload);
};

/**
 * 更新文章。
 * @param {Record<string, any>} article 文章表单对象，必须包含 `id`。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const updateArticleApi = async (article) => {
  /**
   * 提交到后端的文章 DTO。
   * 取值范围：符合文章更新接口字段约束。
   */
  const payload = buildArticlePayload(article, false);

  return requestAdminMutation(`${ADMIN_API_PREFIX}/articles/${article.id}`, 'PUT', payload);
};

/**
 * 删除文章。
 * @param {string | number} id 文章主键 ID。
 * @returns {Promise<any>} 返回后端标准响应对象。
 */
export const deleteArticleApi = async (id) => requestAdminMutation(`${ADMIN_API_PREFIX}/articles/${id}`, 'DELETE');

/**
 * 获取后台仪表盘统计数据。
 * @returns {Promise<Record<string, any> | null>} 返回统计 DTO；失败时返回 `null`。
 */
export const fetchDashboardStats = async () => requestAdminData(`${ADMIN_API_PREFIX}/dashboard/stats`, null);

/**
 * 获取后台管理员公开资料。
 * @returns {Promise<Record<string, any> | null>} 返回管理员资料对象；失败时返回 `null`。
 */
export const fetchAdminProfile = async () => requestPublicData('/api/user/admin', null);

/**
 * 执行后台登录。
 * @param {string} username 用户名，通常为后台登录账号。
 * @param {string} password 密码明文，仅用于本次请求提交。
 * @returns {Promise<any>} 返回后端标准响应对象；网络异常时返回统一错误结果。
 */
export const loginApi = async (username, password) => {
  try {
    /**
     * 登录接口原始响应对象。
     * 取值范围：浏览器 `Response` 实例。
     */
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ username, password }),
    });
    /**
     * 登录接口业务响应对象。
     * 取值范围：包含 `code/data/message` 字段的对象。
     */
    const result = await readJson(response);

    if (result.code === 200 && result.data.token) {
      localStorage.setItem('blog_token', result.data.token);
    }

    return result;
  } catch {
    return { code: 500, message: 'Server error' };
  }
};

/**
 * 为文章内容执行摘要预处理。
 * @param {string} content 原始 Markdown 内容。
 * @returns {string} 当前实现直接返回原文；无内容时返回空字符串。
 * @description 该方法保留为扩展点，本次不调整既有逻辑。
 */
const matchAbstractFromContent = (content) => {
  if (!content) {
    return '';
  }

  return content;
};

/**
 * 将后端文章实体适配为前端页面使用的数据结构。
 * @param {Record<string, any>} item 后端文章对象。
 * @returns {Record<string, any>} 返回前端统一文章结构。
 */
const adaptArticle = (item) => ({
  id: String(item.id),
  title: item.title,
  abstract: item.content ? `${item.content.substring(0, 100).replace(/#/g, '').replace(/\\n/g, ' ')}...` : '',
  content: item.content ? item.content.replace(/\\n/g, '\n') : '',
  author: 'Admin',
  date: item.publishedAt ? item.publishedAt.replace(' ', 'T') : new Date().toISOString(),
  tags: item.tags || [],
  views: item.views || 0,
  status: item.status === 1 ? 'published' : 'draft',
  categoryId: String(item.categoryId),
});
