# Tailwind 自定义设计令牌：tailwind-custom-tokens 快速上手指南


## 📦 什么是 tailwind-custom-tokens？


`tailwind-custom-tokens`（自定义设计令牌）是企业级 UI 规范的核心载体。它不再满足于 Tailwind 默认的配色与间距，而是通过 **配置扩展 (Configuration Extensions)**、**CSS 变量同步** 以及 **语义化命名 (Semantic Naming)**，建立一套专属于特定品牌或产品的视觉语言。它是实现**设计一致性 (Design Consistency)** 与 **快速换肤 (Theming)** 的技术基石。


## ⚙️ 如何安装？


你可以通过以下几种方式在你的项目中扩展 Tailwind 的原生能力：


### 1. tailwind.config.js 官方扩展 (推荐)
这是最标准、最稳定的生产级方案：
```bash
# 在 theme.extend 中注入自定义令牌
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': { primary: '#6366F1', secondary: '#4F46E5' },
      },
      borderRadius: { 'v-xl': '2rem' }
    }
  }
}
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步设计系统令牌：
```bash
npx openskills install frontend/design-tokens --universal && npx openskills sync
```


### 3. CSS 变量主题化系统
在全局 CSS 中注入主色调，并由 Tailwind 消费：
```css
:root { --color-brand: 221 83% 53%; }
/* tailwind.config.js */
theme: { extend: { colors: { brand: 'hsl(var(--color-brand) / <alpha-value>)' } } }
```


---


## 💬 如何通过对话使用？


调用 `tailwind-custom-tokens` 的关键在于：**定义令牌的级联关系与语义含义**。


### 万能对话公式
> **[基础令牌集 (Primitive Tokens)]** + **[语义化映射 (Semantic Mapping)]** + **[Tailwind 配置文件注入点]**


---


### 🌓 定义全自动多主题系统 (Dark/Light Sync)

使用一套令牌适配多种光照环境：

```markdown
请使用 tailwind-custom-tokens 为我生成“背景色”系统。要求：定义 `bg-primary` 指向 CSS 变量，同步输出亮色和深色两个档位的 HSL 色值，确保在 Dark Mode 下对比度提升。
```


### 📐 品牌专属圆角与阴影 (Brand Radii & Shadow)

打破通用的 Bootstrap/Material 感：

```markdown
请在 Tailwind 配置中扩展圆角令牌。风格要求：定义 `rounded-brand` 为 32px，并同步创建一个带有名为 `shadow-premium` 的深邃多层弥散阴影。
```


### 💼 金融级色阶系统 (Financial Color Scale)

满足极高信息密度下的色彩区分度：

```markdown
请为我的“资产看板”扩展色阶。要求：基于主蓝 (#1e40af) 延伸出 5 档等亮度的色阶，并在配置文件中命名为 `blue-asset-100` 到 `900`。
```


### 🎨 磁吸式间距比例系统 (Snap Spacing)

确保页面所有间距都符合 8px 网格逻辑：

```markdown
请重写 Tailwind 的 spacing 令牌。要求：定义一套全新的间距系统，仅保留 8, 16, 24, 32, 48, 64, 128px 七个档位，并禁用所有原生的补丁类名。
```


### 🛠 面向组件的语义化颜色 (Component Aliases)

直接给按钮和警报定义语义令牌：

```markdown
请在 config 文件中定义 `color-status-success`、`color-status-error` 令牌。要求：将它们分别映射到 HSL 圆环中的 140 度和 0 度位置，饱和度统一设为 75%。
```


---


`tailwind-custom-tokens` 让你的代码更懂设计。**现在就放弃那些硬编码的 HEX 数值，尝试用一套逻辑化的设计语言去构建你的整个 UI 王国。** 🚀
