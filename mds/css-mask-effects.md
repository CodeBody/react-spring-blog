# CSS 遮罩特效：css-mask-effects 快速上手指南


## 📦 什么是 css-mask-effects？


`css-mask-effects`（CSS 遮罩特效）是实现高级视觉合成的终极利器。它不再通过简单的裁剪 (clip-path)，而是通过 **Alpha 通道遮罩 (Mask-image)**、**多层渐变混合** 以及 **位图镂空**，让元素呈现出边缘由于遮挡而产生的自然过渡。它是打造**艺术化排版 (Editorial Design)**、**渐进式展示** 以及 **复杂 UI 合成** 的“隐身魔法”。


## ⚙️ 如何安装？


这是浏览器原生的 CSS 能力，无需额外库，直接开启现代渲染上下文：


### 1. 原生 CSS 屏蔽语法定义 (推荐)
这是最稳健、最强大的生产级方案：
```bash
# 定义线性渐变遮罩
-webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步遮罩动效语义：
```bash
npx openskills install frontend/mask-effects --universal && npx openskills sync
```


### 3. SVG 蒙版资产同步
将复杂的 SVG 路径转化为 CSS 掩码：
```css
-webkit-mask: url(/mask.svg) no-repeat center;
mask: url(/mask.svg) no-repeat center;
```


---


## 💬 如何通过对话使用？


调用 `css-mask-effects` 的关键在于：**定义遮罩的透明度梯度与合成逻辑。**


### 万能对话公式
> **[待处理的图像/文本/卡片]** + **[遮罩的形状/渐变方向]** + **[边缘羽化 (Feathering) 程度]**


---


### 📰 文章沉浸式底部渐隐 (Content Fade)

优雅地提示用户继续向下滚动：

```markdown
请使用 css-mask-effects 为长文章容器添加底部遮罩。要求：在底部 100px 处使用 `linear-gradient` 实现从黑到透明的平滑过渡。
```


### 🖼 艺术化头像镂空 (Organic Avatar)

打破死板的圆形头像，采用不规则流体形状：

```markdown
请将此头像重构为“液态流体”遮罩。风格要求：引入一个复杂的 SVG Path 遮罩，边缘带有细微的模糊处理，并在悬停时旋转 15 度。
```


### 🌌 沉浸式视差文本背透 (Masked Text)

实现类似 Apple 官网中让背景图像穿透文字的效果：

```markdown
请为 H1 标题添加背景遮罩。要求：文字作为 mask-image，底层播放一个高清晰度的粒子背景视频，创造出文字被背景镂空的视觉奇观。
```


### 💼 精致金融卡片的高斯晕染 (Glass Mask)

利用遮罩模拟边缘由于材质厚度产生的折射：

```markdown
请设计一个“信用卡”边缘遮罩。要求：在卡片四周添加一个 4px 宽度的 radial-gradient 遮罩，模拟玻璃边缘由于厚度产生的通透感渐变。
```


### 🛠 系统通知流的“淡入淡出”滚动轴 (Scroll Mask)

让顶部和底部的通知在进入时自然显现：

```markdown
请使用 css-mask-effects 优化侧边栏滚动区域。要求：在顶部和底部分别添加 32px 的渐变遮罩，使内容看起来像是从虚无中滑入视野。
```


---


`css-mask-effects` 赋予了像素以“隐身”的自由。**现在就放弃那些生硬的直角切割，尝试用渐变遮罩去编织你的数字画卷。** 🚀
