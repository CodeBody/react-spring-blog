# 字体加载优化：font-loading-optimization 快速上手指南


## 📦 什么是 font-loading-optimization？


`font-loading-optimization`（字体加载优化）是消除“网页闪烁”和提升设计质感的核心秘诀。它专注于解决 **FOIT (不可见文本闪烁)** 和 **FOUT (未样式文本闪烁)** 问题。通过 **字体显示策略 (font-display)**、**预连接 (Preconnect)** 以及 **子集化 (Subsetting)**，它确保网页文字在瞬间以最完美的排版呈现在用户面前。它是实现**零布局偏移 (Zero CLS)** 与 **品牌感传递** 的关键。


## ⚙️ 如何安装？


字体优化应在项目的 HTML 头部和 CSS 样式表中全局配置：


### 1. 字体显示策略 (推荐)
这是最简单、最有效的生产级优化方案：
```bash
# 在 @font-face 中应用 swap 策略
@font-face {
  font-family: 'BrandFont';
  src: url('/fonts/brand.woff2') format('woff2');
  font-display: swap; 
}
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步字体性能规范：
```bash
npx openskills install frontend/font-optimize --universal && npx openskills sync
```


### 3. Google Fonts 预连接优化
通过预解析域名的 DNS 和 TCP 连接缩短等待时间：
```bash
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```


---


## 💬 如何通过对话使用？


调用 `font-loading-optimization` 的关键在于：**定义字体加载的优先级与后备 (Fallback) 系统。**


### 万能对话公式
> **[自定义字体文件]** + **[首屏关键渲染的优先级]** + **[字体渲染的闪烁防护策略]**


---


### 📰 文章标题的瞬时呈现 (Headline Priority)

确保品牌大标题在页面加载的毫秒级内即可见：

```markdown
请使用 font-loading-optimization 为 `Outfit` 字体添加预加载。要求：使用 `rel="preload"` 并在 CSS 中配置 swap 策略，确保无 FOIT 现象。
```


### 🖼 子集化极简中文字阶 (Subset Injection)

仅打包页面所需的关键字库，大幅削减中文字体大小：

```markdown
请优化我的中文字体包。风格要求：使用常用字子集化工具，仅打包前 3000 个常用汉字，将字体包从 10MB 压缩至 300KB 以内。
```


### 🌌 动态加载后的布局偏移修复 (CLS Fix)

防止自定义字体加载后导致文字错位跳动：

```markdown
请修复我的 CLS 问题。要求：定义一个与自定义字体宽高比一致的系统 Fallback 字体 (如 Arial)，并使用 `size-adjust` 进行微调匹配。
```


### 💼 变体字体 (Variable Fonts) 的极致整合 (Var Font Magic)

在一个文件中涵盖所有字重，提升系统性能：

```markdown
请将 `Inter` 字体全量升级为 Variable Font 版本。风格要求：在 CSS 中定义流畅的 `font-weight` 线性区间，仅通过一次 HTTP 请求即满足全站排版需求。
```


### 🛠 系统层级的离线字体缓存策略 (Service Worker Cache)

实现第二次访问时的零延迟字体渲染：

```markdown
请为我的 PWA 应用编写 Service Worker 脚本。要求：持久化缓存所有的 `.woff2` 字体资源，确保在离线状态下也能完美呈现设计稿要求的字体。
```


---


`font-loading-optimization` 让文字有了尊严。**现在就放弃那些繁重的全量字体包，尝试用精密的加载逻辑去守护你的每一个字阶。** 🚀
