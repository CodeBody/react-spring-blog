package com.blog.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 跨域访问配置。
 * 设计意图：统一放开前端开发与部署环境对后端接口的跨域访问。
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * 注册全局跨域规则。
     * @param registry Spring MVC 跨域注册器，不能为空。
     * @return 无返回值。
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
