# 磨砂玻璃 UI：glassmorph-ui 快速上手指南


## 📦 什么是 glassmorph-ui？


`glassmorph-ui`（磨砂玻璃）是 2024-2025 年最受高端品牌青睐的 UI 风格。它通过 **背景模糊 (Backdrop-blur)**、**高透明度覆盖层** 以及 **极细的半透明边框**，为界面注入了独特的“空气感”与“纵深感”。它不仅仅是毛玻璃效果，更是一种对**视觉层级 (Visual Hierarchy)** 的重新定义。


## ⚙️ 如何安装？


你可以通过以下方式快速在你的项目中启用磨砂玻璃适配器：


### 1. Tailwind CSS 极速配置 (推荐)
这是目前最简洁的生产级方案：
```bash
# 确保安装了 tailwind-backdrop-blur 插件 (Tailwind v3+ 默认内置)
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步视觉规范：
```bash
npx openskills install frontend/glassmorph --universal && npx openskills sync
```


### 3. 手动样式定义
在全局 CSS 中添加磨砂玻璃核心令牌：
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}
```


---


## 💬 如何通过对话使用？


调用 `glassmorph-ui` 的关键在于：**定义光源与物理深度**。


### 万能对话公式
> **[UI 组件名]** + **[模糊强度与透明度]** + **[背景层级的交互逻辑]**


---


### 📱 高端控制面板 (Dashboard Card)

利用磨砂质感处理复杂的背景叠加：

```markdown
请使用 glassmorph-ui 重构数据详情卡片。风格要求：背景模糊 (blur-xl)、白色 5% 透明填充，并添加一个 1px 的亮色描边来模拟光线折射感。
```


### 🌌 沉浸式登录页 (Hero Login)

在全屏视频或炫彩背景上保持文字可读性：

```markdown
请为我的背景视频页面设计一个磨砂玻璃登录框。风格要求：采用超大半径圆角 (32px)、多层玻璃阴影嵌套，并确保输入框在聚焦时有强烈的发光动效。
```


### 🧭 悬浮导航栏 (Floating Navbar)

实现类似 iOS 处理系统顶栏的剔透感：

```markdown
请开发一个悬浮于顶部的玻璃导航栏。风格要求：背景模糊强度设为 12px，底部有细微的亮色边框分隔，且当用户向下滚动时，背景透明度动态增加。
```


### 🛠 多媒体播放器 (Media Player)

追求极致的现代科技感：

```markdown
请使用 glassmorph-ui 设计播放控制器。风格要求：按钮采用纯色块与玻璃背景的视觉对比，背景纹理需透出后方的唱片封面主色调，营造色彩晕染感。
```


### 🧪 动态通知气泡 (Toast Notifications)

轻量级的视觉反馈：

```markdown
请为系统消息设计一套磨砂玻璃样式的 Toast。风格要求：背景采用低透明度深蓝，文字使用白色 Outfit 字体，气泡四周有极细的极光渐变描边。
```


---


`glassmorph-ui` 让界面不再是冰冷的平面。**现在就调整你的 blur 参数，给你的用户一个深邃的呼吸空间。** 🚀
