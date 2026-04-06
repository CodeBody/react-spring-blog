# 现代拟物化 2.0：skeuomorph-v2-ui 快速上手指南


## 📦 什么是 skeuomorph-v2-ui？


`skeuomorph-v2-ui`（现代拟物化 2.0，又称 Neumorphism）是对早期拟物化的极致进化。它不再追求死板的纹理，而是通过 **精密的双重阴影 (Light & Shadow)**、**通透的内发光** 以及 **柔和的高光凸起**，在数字屏幕上营造出一种介于物理实体与数字化平坦之间的“温润感”。它是对**触感交互 (Tactile UI)** 的重新回归。


## ⚙️ 如何安装？


你可以通过以下几种方式将这种“触指可及”的质感带入你的项目：


### 1. CSS 阴影混合方案 (推荐)
这是最稳健、最轻量级的生产级方案：
```bash
# 不需要额外库，利用 CSS box-shadow 的多层堆叠
box-shadow: 10px 10px 20px #bebebe, -10px -10px 20px #ffffff;
```


### 2. 通过 OpenSkills 动态开启
在 Agent 框架下一键同步触感反馈：
```bash
npx openskills install frontend/skeuomorph --universal && npx openskills sync
```


### 3. Tailwind 拟物化配置
在全局配置文件中扩展拟物化核心阴影：
```js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'neumo-flat': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neumo-inner': 'inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff',
      }
    }
  }
}
```


---


## 💬 如何通过对话使用？


调用 `skeuomorph-v2-ui` 的关键在于：**定义光源角度与材质软度**。


### 万能对话公式
> **[UI 按钮/面板]** + **[凸起 (Flat) 或 凹陷 (Inner) 的深度]** + **[背景色与阴影的融合度]**


---


### 🎚 智能家居控制面板 (Smart Home)

模拟真实的物理拨盘与开关：

```markdown
请使用 skeuomorph-v2-ui 设计一个灯光亮度调节旋钮。要求：圆盘背景颜色必须与父容器一致 (#e0e5ec)，通过双阴影实现 5px 凸起感，内部指示器需有微弱的凹陷感。
```


### 🎧 高端音乐播放器 (Hi-Fi Player)

追求极致的触觉暗示与操作仪式感：

```markdown
请重构播放/暂停按钮。风格要求：采用拟物化 2.0，点击时背景从凸起变为凹陷 (inset)，且四周伴随极细的内发光效果，背景色为柔和的浅灰色。
```


### 💼 精致金融资产卡片 (Credit Card Card)

提升数字资产的实体感与可信任感：

```markdown
请设计一个拟物化信用卡。风格要求：卡片整体呈现 12px 的凸起高度，边缘使用超大圆角，所有文字采用浅凹陷效果，并确保光照方向统一来自左上方。
```


### ⌚️ 极简健康监测表盘 (Watch Face)

在有限空间内营造高维度的层次感：

```markdown
请使用 skeuomorph-v2-ui 开发心率图背景。要求：图表容器采用大型凹陷处理，线条使用 2px 的亮色发光，整体色系为低对比的乳白色 (Off-white)。
```


### 🛠 多维设置开关矩阵 (Settings Toggle)

让每一次开启关闭都伴随物理回馈感：

```markdown
请设计一组拟物化开关。风格要求：未选中时保持平面微凸，选中时呈现深色凹陷，并配合呼吸灯动效，确保所有阴影的模糊半径 (blur) 设为 16px。
```


---


`skeuomorph-v2-ui` 让交互变得更有温度。**现在就放弃死板的纯黑纯白，尝试用阴影的渐变去触摸你的每一个组件。** 🚀
