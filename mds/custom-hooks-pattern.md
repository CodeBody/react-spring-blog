# 自定义 Hooks 模式：custom-hooks-pattern 快速上手指南


## 📦 什么是 custom-hooks-pattern？


`custom-hooks-pattern`（自定义 Hooks 模式）是 React 逻辑复用的终极形态。它不再关心 UI 的呈现，而是通过 **封装无状态逻辑 (Stateful Logic)**、**副作用编排 (Effects Orchestration)** 以及 **响应式原语 (Reactive Primitives)**，将复杂的业务规则抽离为可插拔的函数。这使得同一个业务逻辑可以被不同的 UI 组件共享，实现了**代码的高度解耦**与**极简的组件接口**。


## ⚙️ 如何安装？


这是 React 16.8+ 的原生能力，不需要第三方库，仅需遵循 Hook 命名规范：


### 1. 原生 Hooks 定义方案 (推荐)
这是最纯粹、最灵活的生产级方案：
```bash
# 文件命名必须以 use 开头，例如 useAuth.ts
export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => { /* 登录逻辑 */ }, []);
  return { user, login };
}
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步 Hooks 逻辑范式：
```bash
npx openskills install react/custom-hooks --universal && npx openskills sync
```


### 3. Hooks 库扩展 (Ahooks/React-use)
集成成熟的社区 Hooks 集合以加速开发：
```bash
npm install ahooks # 行业标杆级逻辑钩子库
```


---


## 💬 如何通过对话使用？


调用 `custom-hooks-pattern` 的关键在于：**定义输入的依赖项与输出的响应式状态。**


### 万能对话公式
> **[入参 (Dependencies)]** + **[副作用的执行时机]** + **[返回的状态与操作方法]**


---


### 🔐 通用身份认证钩子 (Identity Hook)

在全站任何组件中即时获取当前用户状态：

```markdown
请使用 custom-hooks-pattern 封装一个 `useCurrentUser`。要求：自动读取 localStorage 中的 Token，在挂载时异步校验身份，并回传 `isAdmin` 布尔值及登出方法。
```


### 🌓 自适应主题感知钩子 (Theme Sensor)

让组件随时感知用户的系统视觉偏好：

```markdown
请为一个“主题感知逻辑”撰写 Hook。风格要求：监听系统的 `prefers-color-scheme` 媒体查询，动态返回 `currentTheme`，并支持手动切换覆盖。
```


### 🧭 复杂的防抖搜索逻辑 (Debounced Search)

将实时输入的性能开销降到最低：

```markdown
请使用 custom-hooks-pattern 设计 `useAsyncSearch`。要求：入参为搜索词，实现 300ms 的防抖逻辑，并在请求中暴露 `loading`、`data` 和 `error` 三个响应式状态。
```


### 📍 无缝地图位置追踪 (Geolocation Pro)

以极简接口处理复杂的浏览器位置 API：

```markdown
请为我开发一个 `useLiveLocation`。要求：具备高精度模式开启选项，自动处理浏览器权限拒绝的错误捕获，并在状态中实时更新经纬度。
```


### 🛠 系统通知的全局发布订阅 (PubSub Hook)

在非父子组件间快速同步即时消息：

```markdown
请使用自定义 Hooks 模式实现 `useGlobalToast`。要求：建立一个全局的事件监听器，让调用者仅需一行代码 `show('Message')` 即可触发 UI 层级的消息气泡。
```


---


`custom-hooks-pattern` 让你的组件只负责微笑 (UI)。**现在就放弃那些臃肿的 useEffect，尝试用自定义 Hooks 去解放你的业务逻辑。** 🚀
