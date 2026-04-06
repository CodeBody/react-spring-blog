# 微交互语义：micro-interaction-ai 快速上手指南


## 📦 什么是 micro-interaction-ai？


`micro-interaction-ai`（微交互语义）是让 Web 应用从“功能容器”蜕变为“生命体”的关键。它不仅仅是 `hover` 效果，而是通过 **物理感官反馈 (Physical Response)**、**状态切换的连续性** 以及 **微妙的动效暗示**，在极短的时间内 (通常小于 100ms) 为用户提供即时、愉悦的操作确认。它是对**交互细腻度 (Interaction Fidelity)** 的极致雕琢。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的项目中实现“会呼吸”的交互：


### 1. Framer Motion 动态库 (推荐)
这是目前最高效、最符合直觉的生产级动效方案：
```bash
# 为 React 项目安装核心动效后端
npm install framer-motion
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步交互动效语义：
```bash
npx openskills install frontend/micro-interaction --universal && npx openskills sync
```


### 3. Tailwind 交互增强插件
在全局配置文件中定义微交互的常用转屏逻辑：
```js
module.exports = {
  theme: {
    extend: {
      transitionProperty: {
        'smooth': 'all cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }
  }
}
```


---


## 💬 如何通过对话使用？


调用 `micro-interaction-ai` 的关键在于：**定义反馈的因果律与节奏感**。


### 万能对话公式
> **[交互触发点 (Trigger)]** + **[视觉反馈 (Visual Feed)]** + **[物理特性约束 (Bounciness/Ease)]**


---


### 🔘 极具弹性的按钮点击 (Elastic Click)

通过微小的缩放与位移模拟真实的物理按压感：

```markdown
请使用 micro-interaction-ai 设计“提交按钮”。要求：鼠标悬停时伴随 2px 的向上偏移，点击瞬间缩小至 95%，松开后以 spring 曲线回弹。
```


### 📱 开关状态的平滑揭示 (Switch Reveal)

在状态切换中保持视觉的连贯性：

```markdown
请为我的“深色模式开关”设计微交互。风格要求：拨动滑块时色彩从中心向外渲染，滑块运动轨迹带有 0.4s 的阻尼感渐变效果。
```


### 🎨 灵感画廊的悬浮扩张 (Hover Expansion)

通过层级的变化暗示可交互性：

```markdown
请使用 micro-interaction-ai 重构作品展示卡片。要求：鼠标移入时卡片轻微倾斜 15 度，背景阴影范围扩大 50%，并确保所有文字在 0.2s 内渐显。
```


### 💼 异步提交的“呼吸”感知 (Breathing State)

在等待网络请求时安抚用户情绪：

```markdown
请为“保存中”状态设计微交互。要求：按钮背景色在深浅蓝之间缓慢循环（模拟呼吸），文字变成动态加载的小蓝点，直到请求返回。
```


### 🛠 全局通知的磁吸撤回 (Magnetic Toast)

让消息提示像物理实体一样自然消失：

```markdown
请设计一组 Toast 通知微交互。风格要求：弹出时从页面右侧滑入 200px，删除时像磁铁排斥一样向相反方向加速撤回，并伴随细微的透明度抖动。
```


---


`micro-interaction-ai` 让每一个像素都有回响。**现在就放弃死板的瞬间切换，尝试用 0.1 秒的动效去触碰你的用户。** 🚀
