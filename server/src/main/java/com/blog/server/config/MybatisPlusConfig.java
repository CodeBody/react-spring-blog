package com.blog.server.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * MyBatis-Plus 基础配置。
 * 设计意图：集中注册分页等通用插件。
 */
@Configuration
public class MybatisPlusConfig {

    /**
     * 注册 MyBatis-Plus 拦截器。
     * @return 返回包含分页插件的拦截器实例。
     * @usage 当前项目按 MySQL 兼容方言处理分页。
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        /**
         * MyBatis-Plus 主拦截器实例。
         * 业务含义：统一承载分页等通用内拦截器。
         */
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // Since Doris is MySQL compatible, we can configure Pagination for MySQL
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
