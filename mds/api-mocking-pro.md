# API 模拟专家：api-mocking-pro 快速上手指南


## 📦 什么是 api-mocking-pro？


`api-mocking-pro`（API 模拟专家）是前后端解耦开发的“加速协议”。它彻底终结了“等后端接口写好再开工”的低效模式。它通过 **Mock Service Worker (MSW)**、**Faker.js** 以及 **网络层拦截**，在浏览器 Service Worker 中构建一个真实的模拟后端。它不仅能返回静态数据，还能模拟 **高延迟 (Latency)**、**状态码切换 (401/500)** 以及 **复杂的动态数据流关系**。它是实现**纯净前端独立开发 (UI-First Development)** 的核心工程化技能。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“虚幻后端”：


### 1. MSW 官方拦截方案 (推荐)
这是目前最现代、最接近真实网络请求的生产级方案：
```bash
# 安装核心拦截层
npm install msw --save-dev
# 初始化 Service Worker 脚本
npx msw init public/ --save
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步模拟数据范式：
```bash
npx openskills install frontend/api-mock --universal && npx openskills sync
```


### 3. JSON Server 极速原型
针对简单的 CRUD 业务，利用本地文件系统即刻构建 REST API。


---


## 💬 如何通过对话使用？


调用 `api-mocking-pro` 的关键在于：**定义接口的 JSON 契约结构与动态生成的随机规律。**


### 万能对话公式
> **[API 端点 (Method/URL)]** + **[返回数据模型 (faker 逻辑)]** + **[特定的交互状态模拟]**


---


### 📰 高仿真的动态用户列表 (Fake Users)

生成具有真实感的名字、头像和邮箱数据，告别重复的 "Test1, Test2"：

```markdown
请使用 api-mocking-pro 为 `/api/users` 编写 Mock Handler。要求：返回 10 个随机生成的开发者档案，包含从 `faker/image` 抓取的头像和动态生成的 Github URL。
```


### 📊 金融资产波动的随机模拟 (Market Simulation)

在本地测试图表在处理实时数据波动的渲染性能：

```markdown
请模拟 `/api/stocks/real-time`。风格要求：每隔 1s 返回一组正态分布波动的价格数据，并随机注入 50ms-500ms 的网络延迟。
```


### 🏙 针对身份认证失效的 401 模拟 (Auth Failure)

精准验证前端在 Token 过期或未登录时的路由重定向表现：

```markdown
请使用 MSW 拦截 `/api/profile`。要求：定义一个动态开关，当请求带有 `error=true` 参数时返回 401 Unauthorized 状态及错误消息 JSON。
```


### 💼 复用的企业目录树结构模拟 (Complex Tree)

处理深层嵌套、父子关联极其复杂的分层数据：

```markdown
请使用 api-mocking-pro 生成一个“三级公司组织树”。要求：递归生成父子节点，主 ID 为 UUID，并确保每一个部门节点都带有一个随机的负责人员工信息。
```


### 🛠 系统级网络超时的压力测试 (Timeout Test)

验证前端在恶劣网络环境下的 Loading 和 Timeout 兜底表现：

```markdown
请设计一个 Mock 拦截器。要求：针对所有的 GET 请求强制延迟 10s 后再返回响应，观察并修复 UI 层的异常卡死现象。
```


---


`api-mocking-pro` 让前端开发从此“自由”。**现在就开启你的 Service Worker 拦截，尝试用自主定义的接口去重构你的每一个交互细节。** 🚀
