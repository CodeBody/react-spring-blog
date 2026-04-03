---
description: 本地启动前端和后端开发服务器的命令
---

# 本地启动开发环境

## 启动前端（Vite 开发服务器）

// turbo
```bash
cd /Users/alex/Documents/blog && npm run dev
```

前端默认运行在 http://localhost:5173

## 启动后端（Spring Boot）

// turbo
```bash
cd /Users/alex/Documents/blog/server && mvn spring-boot:run
```

后端默认运行在 http://localhost:8080

> ⚠️ 注意：后端命令是 `mvn`（Maven），默认会使用 `application.yml` 中配置的 `dev` profile 也就是连接本地数据库。
