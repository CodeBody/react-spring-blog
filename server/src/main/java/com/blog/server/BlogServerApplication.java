package com.blog.server;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 博客后端服务启动入口。
 * 设计意图：统一承载 Spring Boot 应用初始化流程。
 */
@SpringBootApplication
@MapperScan("com.blog.server.mapper")
public class BlogServerApplication {

    /**
     * 启动 Spring Boot 后端服务。
     * @param args 启动参数数组，通常为空或包含运行环境参数。
     * @return 无返回值。
     * @usage 由 JVM 进程入口自动调用。
     */
    public static void main(String[] args) {
        SpringApplication.run(BlogServerApplication.class, args);
    }

}
