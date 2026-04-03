---
description: 打包并发布前端和后端的生产构建版本
---

# 发布构建流程

## 打包前端（Vite 生产构建）

// turbo
```bash
cd /Users/alex/Documents/blog && npm run build
```

构建产物输出到 `dist/` 目录

## 打包后端（Spring Boot JAR）

// turbo
```bash
cd /Users/alex/Documents/blog/server && mvn clean package -DskipTests
```

构建产物输出到 `server/target/` 目录，生成的 JAR 文件可以在服务器上使用以下命令运行，其中 `--spring.profiles.active=prod` 指定了使用线上的数据库配置：

```bash
java -jar server/target/server-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```
