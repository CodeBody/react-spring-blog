# 渲染性能优化：rendering-optimization 快速上手指南


## 📦 什么是 rendering-optimization？


`rendering-optimization`（渲染性能优化）是解决网页“卡顿”的终极方案。它专注于减少浏览器的 **重排 (Reflow)**、**重绘 (Repaint)** 以及 **不必要的组件重新渲染**。通过 **React.memo**、**虚拟化长列表 (Virtualization)**、**防抖/节流 (Debounce/Throttle)** 以及 **硬件加速 (GPU Acceleration)**，它确保应用在处理复杂交互和海量数据时，依然能保持 **60FPS** 的丝滑体验。它是对**交互平滑度 (Interaction Fluidity)** 的极致雕琢。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中引入性能守卫：


### 1. React Profiler 实时监测 (推荐)
这是最直观、最官方的性能诊断方式：
```bash
# 不需要安装，直接使用 React DevTools 中的 Profiler 面板
# 开启 "Record" 并操作页面，找出渲染最耗时的组件
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步渲染优化规范：
```bash
npx openskills install react/render-optimize --universal && npx openskills sync
```


### 3. Ahooks 性能增强库
集成成熟的防抖、节流与虚拟化 Hook：
```bash
npm install ahooks # 行业标杆级 React 逻辑钩子库
```


---


## 💬 如何通过对话使用？


调用 `rendering-optimization` 的关键在于：**定义渲染频率的阈值与可见性范围。**


### 万能对话公式
> **[高频触发的交互源]** + **[防抖/节流的时间窗口]** + **[组件的记忆化 (Memo) 策略]**


---


### 📰 海量数据的虚拟滚动列表 (Virtual List)

处理包含 10,000 条数据的动态 Feed 而不导致浏览器崩溃：

```markdown
请使用 rendering-optimization 重构我的列表。要求：仅渲染视口内的 10 个 DOM 节点，其余设为占位，并开启硬件加速转换 (translate3d)。
```


### 🖼 响应式搜索框的防抖查询 (Debounced Input)

防止每一次按键都触发昂贵的 API 调用或重渲染：

```markdown
请为搜索框添加 `useDebounce`。风格要求：设置 300ms 延迟，并在搜索请求期间冻结底层的非活动列表渲染。
```


### 🌌 复杂图表的数据更新频率限制 (Throttled Charts)

在窗口缩放或拖拽时保持平滑的图表重绘：

```markdown
请使用节流 (Throttle) 处理折线图的 resize 事件。要求：将重绘频率限制在 16ms (60FPS) 以上，防止 CPU 瞬时飙升。
```


### 💼 重型表单的局部记忆化优化 (Memoized Form)

防止顶级状态变更导致每一个输入框都重新渲染：

```markdown
请对我的设置表单进行 `React.memo` 处理。要求：通过自定义 `areEqual` 函数精确对比 Props，确保只有当前修改的字段才被重渲染。
```


### 🛠 系统级长任务的主线程让渡 (Idle Scheduler)

将非核心计算逻辑移至浏览器空闲时间执行：

```markdown
请使用 `requestIdleCallback` 拆解历史记录分析算法。要求：每处理 50 条数据后让出主线程 5ms，确保 UI 的动画交互绝不卡顿。
```


---


`rendering-optimization` 让你的应用更“丝滑”。**现在就开启你的渲染分析报告，尝试用每一次“减法”去换取用户指尖的瞬间响应。** 🚀
