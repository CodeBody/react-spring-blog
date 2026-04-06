# 渐变网格专家：gradient-mesh-expert 快速上手指南


## 📦 什么是 gradient-mesh-expert？


`gradient-mesh-expert`（渐变网格专家）是现代 UI 视觉设计的“氛围感大师”。它不再是通过简单的线性 (Linear) 或 径向 (Radial) 渐变，而是通过 **多点色彩插值 (Multi-point Color Interpolation)**、**流体路径扭曲** 以及 **微米级噪点纹理**，在屏幕上编织出一种液态、梦幻且极具物理深度的光影效果。它是打造**苹果级产品氛围 (Apple-like Aura)**、**极光背景** 以及 **沉浸式落地页** 的核心技法。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的项目中实现“流光溢彩”：


### 1. CSS 多重径向渐变堆叠 (推荐)
这是最稳健、最容易实现的生产级方案：
```bash
# 在 background 中使用并集的 radial-gradient
background: 
  radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
  radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%);
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步渐变平衡语义：
```bash
npx openskills install frontend/gradient-mesh --universal && npx openskills sync
```


### 3. Canvas 动力学流体生成层
对于需要实时波动的动态网格，注入精细化渲染引擎：
```bash
npm install @stripe/gradient-mesh # 行业标杆级流体引擎
```


---


## 💬 如何通过对话使用？


调用 `gradient-mesh-expert` 的关键在于：**定义色彩锚点的位置与混合半径。**


### 万能对话公式
> **[配色基调 (Color Story)]** + **[动态混合模式 (Multiply/Screen)]** + **[噪点颗粒度 (Graininess)]**


---


### 🌌 苹果风格发布会背景 (Event Aura)

营造一种高耸、神秘且极具仪式感的灯光氛围：

```markdown
请使用 gradient-mesh-expert 为主视觉区设计背景。要求：中心点为深紫色，向左上角发散青色漫射，向右下角发散桃红色高光，并叠加一层 5% 亮度的胶片噪点。
```


### 💎 极简金融借记卡纹理 (Bank Card Mesh)

在静态平面上创造出奢华的材质光泽感：

```markdown
请设计一张“数字虚像卡”网格。风格要求：采用莫兰迪色系（灰蓝、粉肤、奶白），色彩在角落以 Gaussian Blur 指数级重叠，取消任何明显的边界线。
```


### 🌿 治愈系冥想应用呼吸背景 (Healing Flow)

让背景随着用户的心理节奏缓慢波动：

```markdown
请使用 gradient-mesh-expert 开发一个渐变背景。要求：色彩在绿、蓝、紫之间极慢地过渡（周期 20s），中心亮度设为 50%，并在 768px 以上视口开启硬件加速。
```


### 🎞 复古未来主义色彩失真 (Retro Distortion)

模拟 80 年代模拟信号的幻彩效果：

```markdown
请重写我的页脚渐变。要求：使用极其高饱和度的三原色（红绿蓝），设置高频的线性干涉遮罩，并赋予一种色彩溢出 (Bleed) 的不规则边缘效果。
```


### 🛠 系统通知浮窗的微弱光晕 (Toast Glow)

通过微小的光影对比建立组件的存在感：

```markdown
请使用 gradient-mesh-expert 设计对话框边框光。要求：在左上角放置一个 HSL(221, 80%, 60%) 的极小网格锚点，其余部分设为 95% 透明，模拟侧向光源照进页面的感觉。
```


---


`gradient-mesh-expert` 赋予了色彩以流动的灵魂。**现在就放弃那些平庸的双色渐变，尝试用多维的光影去包裹你的每一个用户。** 🚀
