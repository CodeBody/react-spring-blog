# PWA 原生化：progressive-web-app-ai 快速上手指南


## 📦 什么是 progressive-web-app-ai？


`progressive-web-app-ai`（PWA 原生化）是让 Web 应用具备“原生感”的终极进化。它不再只是一个网页，而是通过 **Service Worker 离线架构**、**Web App Manifest** 以及 **桌面推送通知**，让网站可以被“安装”到手机桌面，实现离线首屏、后台静默更新以及全屏状态运行。它是打破 **Web 与 Native 鸿沟** 的核心工程化技能。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中快速开启“原生级”体验：


### 1. Vite PWA 插件方案 (推荐)
这是目前最简单、最自动化的生成式 PWA 方案：
```bash
# 自动生成 Service Worker 与配置文件
npm install -D vite-plugin-pwa
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步 PWA 规范语义：
```bash
npx openskills install frontend/pwa --universal && npx openskills sync
```


### 3. Workbox 核心库
针对大型、有复杂缓存策略的项目，利用 Google 推出的 Workbox 库精细化控制。


---


## 💬 如何通过对话使用？


调用 `progressive-web-app-ai` 的关键在于：**定义资源的离线优先级与安装引导的视觉体验。**


### 万能对话公式
> **[PWA 的应用元数据 (Icons/Name)]** + **[离线缓存策略 (CacheFirst/NetworkFirst)]** + **[必须触发的原生功能节点]**


---


### 📰 高仿真的移动端桌面图标生成 (App Manifest)

定义品牌在用户手机桌面上第一眼看到的质感：

```markdown
请使用 progressive-web-app-ai 生成 `manifest.json`。要求：背景色为品牌深蓝，图标包含 512x512 的 Maskable 模式，并设置显示模式为 `standalone`。
```


### 📊 真正可离线使用的财务审计看板 (Offline Cache)

即使在断网状态下也能查看已加载的历史缓存：

```markdown
请为 `/api/audit-logs` 编写缓存策略。风格要求：采用 Stale-While-Revalidate，确保首屏加载优先展示本地数据，后台自动同步最新网络版本。
```


### 🏙 沉浸式全屏沉浸式的应用体验 (Fullscreen Mode)

隐藏所有浏览器地址栏，实现 100% 的 App 视觉占比：

```markdown
请配置 `display_override` 参数。风格要求：支持 `minimal-ui` 和 `window-controls-overlay`，让网页顶栏与操作系统边框完美贴合。
```


### 💼 CI/CD 自动生成的应用启动屏预览 (Splash Screens)

针对 iOS 自动生成匹配不同屏幕尺寸的启动动画图：

```markdown
请编写 PWA 生成脚本。要求：自动为所有 iPhone 机型裁剪对应的启动图 (Splash Screen)，并生成完善的 `<link rel="apple-touch-startup-image">` 元数据。
```


### 🛠 系统级低延迟本地通知推送 (Push Notifications)

在应用未开启时，通过 PWA 通道下发紧急业务告警：

```markdown
请实现一个 `PushNotificationSender`。风格要求：通过 Service Worker 监听来自后端的 WebPush 消息，弹出带有应用 Logo 的自定义桌面通知。
```


---


`progressive-web-app-ai` 让你的网页触手可及。**现在就开启你的 PWA 进阶之路，尝试用离线的能力去重塑你的每一个用户触点。** 🚀
