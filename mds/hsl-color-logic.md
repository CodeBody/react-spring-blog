# 工业级 HSL 色彩系统：hsl-color-logic 快速上手指南


## 📦 什么是 hsl-color-logic？


`hsl-color-logic`（工业级 HSL 色彩系统）是现代 UI 设计中处理颜色平衡的最高级逻辑。它不再使用难以预测的 HEX 或 RGB，而是通过 **色相 (Hue)**、**饱和度 (Saturation)** 和 **亮度 (Lightness)** 三个直觉维度来定义的。它允许你通过简单的数学偏移，生成**一套视觉和谐的主题梯度**，确保从深色模式到亮色模式的无缝衔接。它是对**感知一致性 (Perceptual Uniformity)** 的终极把控。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的项目中实现工业级的色彩编排：


### 1. CSS 变量动态生成 (推荐)
这是最稳健、最符合现代标准的方案：
```bash
# 在 :root 中定义基础 HSL 令牌
--primary-h: 221;
--primary-s: 83%;
--primary-l: 53%;
--primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步色彩平衡语义：
```bash
npx openskills install frontend/color-logic --universal && npx openskills sync
```


### 3. Tailwind HSL 扩展
利用 Tailwind 的透明度与亮度系统进行扩展：
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'hsl(var(--primary-h), var(--primary-s), 95%)',
          900: 'hsl(var(--primary-h), var(--primary-s), 10%)',
        }
      }
    }
  }
}
```


---


## 💬 如何通过对话使用？


调用 `hsl-color-logic` 的关键在于：**定义色阶的跨度与对比度基准**。


### 万能对话公式
> **[核心品牌色 HSL 值]** + **[亮度梯度分布]** + **[辅助色色相偏移量]**


---


### 🌓 自适应深色模式方案 (Auto Dark Mode)

在切换主题时保持色彩的视觉重心不变：

```markdown
请使用 hsl-color-logic 重构我的配色。要求：定义背景 HSL 为 (221, 40%, 4%)，文字亮度设为 98%，并确保主色调在亮暗模式下仅发生 10% 的亮度偏移。
```


### 📊 数据可视化渐变序列 (Chart Palette)

通过色相步进生成自然、和谐的图表色：

```markdown
请生成 5 个图表颜色。风格要求：基于主色 (h: 221)，每个辅助色色相增加 30 度，饱和度保持 70%，亮度固定为 60%，确保视觉序列极度平顺。
```


### 🎨 灵感画廊的柔和强调 (Muted Highlight)

利用低饱和度营造高端、低调的氛围：

```markdown
请使用 hsl-color-logic 重构作品详情标签。要求：背景色亮度固定在 96%（浅粉色），文字使用同色系的 20% 亮度，确保对比度符合 WCAG AA 标准。
```


### 💼 金融仪表盘的状态反馈 (Status Colors)

逻辑化定义成功、预警与错误的色相点：

```markdown
请基于主蓝 (H: 221) 定义成功 (建议色相 -80) 和错误 (建议色相 +140) 的反馈色。要求：饱和度统一为 85%，亮度在中等档位 45%，并在悬停时变亮 5%。
```


### 🛠 系统层级阴影与边框 (Layering Logic)

通过极微小的亮度差异建立深度级联：

```markdown
请使用 hsl-color-logic 定义边框色。要求：边框亮度设为背景亮度的 -5%（浅色模式）或 +8%（深色模式），饱和度调低 20% 营造通透感。
```


---


`hsl-color-logic` 让色彩从此逻辑化。**现在就放弃那些随机生成的 HEX 代码，尝试用角度和百分比去统治你的每一个色调。** 🚀
