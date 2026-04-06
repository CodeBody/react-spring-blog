# 前端源码级 SEO：seo-optimization-front 快速上手指南


## 📦 什么是 seo-optimization-front？


`seo-optimization-front`（前端源码级 SEO）是 Web 应用获得“流量增长”的底层逻辑。它不再只是通过简单的关键词堆砌，而是通过 **动态元数据管理 (Dynamic Metadata)**、**结构化数据 (JSON-LD Schema)** 以及 **渲染路径优化 (SSR/SSG)**，将网页的内容以搜索引擎爬虫最易理解的方式呈现。它是实现**自然排名提升 (Organic Growth)** 与 **社交媒体卡片预览优化** 的核心手段。


## ⚙️ 如何安装？


你可以通过以下几种方式在项目中启动“收录加速器”：


### 1. Next.js Metadata API (推荐)
这是目前最智能且符合现代 SEO 标准的生产级方案：
```bash
# 在 Layout 或 Page 组件中导出配置
export const metadata = {
  title: 'Blog | Next-gen Tech',
  description: 'Sharing AI-native frontend skills.',
};
```


### 2. 通过 OpenSkills 动态加载
在 Agent 框架下一键同步 SEO 优化规范：
```bash
npx openskills install frontend/seo --universal && npx openskills sync
```


### 3. React Helmet 经典动态管理
针对传统的 SPA 项目，利用 Helmet 进行客户端劫持渲染 Meta 标签。


---


## 💬 如何通过对话使用？


调用 `seo-optimization-front` 的关键在于：**定义内容的权威性声明与社交分享的视觉契约。**


### 万能对话公式
> **[页面的核心关键词 (Focus Keywords)]** + **[动态生成的分享图 (OG-Image) 模式]** + **[搜索引擎友好的 Meta 骨架]**


---


### 📰 高频更新博客的动态元数据生成 (Dynamic Tags)

根据文章内容自动生成精准的标题和摘要，提升点击率：

```markdown
请使用 seo-optimization-front。要求：基于文章 Title 和前 100 字摘要动态生成 `generateMetadata`，并添加 Canonical URL 以防权重分散。
```


### 📊 商品详情页的 JSON-LD 结构化数据 (Rich Snippets)

在搜索结果中直接展示价格、库存和评分星星：

```markdown
请为一个“电商详情页”注入 Schema.org 数据。风格要求：生成 JSON-LD 脚本，精确标记 Product Name、Price 和 Review 聚合评分，提升搜索结果展现率。
```


### 🏙 社交媒体 OpenGraph 分享卡片优化 (Social Sharing)

确保在微信、Twitter 或 Slack 分享时呈现极具吸引力的封面：

```markdown
请配置 OG 标签。风格要求：定义 `og:image` 路径，使用高质量的 Banner 做预览，并确保在不同平台下分享时的描述字数不被截断。
```


### 💼 CI/CD 自动生成的 Sitemap 与 Robotos (Sitemaps)

确保搜索引擎爬虫能顺畅地爬取到全站每一个角落：

```markdown
请编写一段构建脚本。要求：构建完成后自动生成 `sitemap.xml` 和 `robots.txt`，并排除所有的 `/admin` 类私有管理路径。
```


### 🛠 系统级自动检测死链接与 404 跳转 (Link Health)

维护网站的整体连通性与权重健康：

```markdown
请审计全站内链结构。风格要求：提供一份报告识别所有破损的 `a` 标签链接，并建议使用 `link` 预加载核心枢纽页面。
```


---


`seo-optimization-front` 让你的创意被世界看到。**现在就开启你的 SEO 优化，尝试用代码逻辑去赢得每一场流量竞赛。** 🚀
