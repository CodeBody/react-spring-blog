# AI 图像优化：image-optimization-ai 快速上手指南


## 📦 什么是 image-optimization-ai？


`image-optimization-ai`（AI 图像优化）是现代前端性能极致化的基石。它不再是简单的手动压缩，而是通过 **智能内容感知 (Content-Aware Resizing)**、**全自动格式转换 (AVIF/WebP)** 以及 **按需占位图生成**，确保视觉质量与包体积之间的完美平衡。它是解决 **LCP (最大内容绘制)** 延迟、提升网页体感加载速度的核心手段。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中部署自动化的图像优化引擎：


### 1. Next.js 内置优化方案 (推荐)
这是目前最智能且生产级的开箱即用方案：
```bash
# 不需要额外安装，直接利用 Next.js Image 组件
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步图像处理规范：
```bash
npx openskills install frontend/image-optimize --universal && npx openskills sync
```


### 3. Sharp 工业级后端处理库
在 Node.js 环境下利用高效的底层库进行预处理：
```bash
npm install sharp # 行业标杆级实时图像处理库
```


---


## 💬 如何通过对话使用？


调用 `image-optimization-ai` 的关键在于：**定义质量、尺寸与分发链路。**


### 万能对话公式
> **[原始图片资源]** + **[目标尺寸与设备适配需求]** + **[期望的 WebP/AVIF 压缩率]**


---


### 📰 高频资讯流封面优化 (Feed Image)

在社交媒体流中兼顾极低响应延时：

```markdown
请使用 image-optimization-ai 处理首页列表图。要求：采用 AVIF 格式，品质系数 (quality) 设为 80，并自动生成 Blurhash 低清晰度占位图。
```


### 🖼 响应式 Banner 全端适配 (Responsive Banner)

针对不同视口自动生成最佳比例：

```markdown
请为我的主视觉图开启 AI 智能裁剪。要求：在移动端自动聚焦人物面部中心，在桌面端保持 16:9 比例，并根据用户网络状况自动调整加载权重。
```


### 🎨 沉浸式画廊的无损压缩 (Lossless Gallery)

在保留极致细节的同时减少服务器带宽占用：

```markdown
请使用 image-optimization-ai 优化“艺术作品展示区”。要求：使用无损压缩模式处理大图，剔除所有 EXIF 元数据，并启用懒加载 (Lazy-loading) 策略。
```


### 💼 复古风格图片的自动调色 (Themed Assets)

通过 AI 处理让所有资产符合当前品牌调性：

```markdown
请将全站图片资源进行统一化处理。要求：所有图片在生成的 WebP 中自动调低 10% 饱和度，以符合我的“极简主义单色”整体系统风格。
```


### 🛠 系统级自动转码脚本 (Batch Transcoding)

针对老旧项目的资产库全量升级：

```markdown
请编写一个 Node.js 脚本调用 Sharp。要求：递归扫描 `public/assets` 目录，将所有 PNG 转换为 WebP，并生成配套的 `@2x` 和 `@3x` 视网膜清晰度版本。
```


---


`image-optimization-ai` 让每一个像素都更轻快。**现在就放弃那些沉重的原始 PNG，尝试用智能分发逻辑去武装你的每一处视觉。** 🚀
