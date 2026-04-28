package com.blog.server.config;

import com.blog.server.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security 安全配置。
 * 设计意图：统一定义匿名访问白名单、JWT 认证链和无状态会话策略。
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /**
     * JWT 鉴权过滤器。
     * 业务含义：在用户名密码过滤器前完成令牌解析与用户注入。
     */
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * 注册密码编码器。
     * @return 返回 BCrypt 编码器实例。
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 构建系统安全过滤链。
     * @param http Spring Security HTTP 配置对象，不能为空。
     * @return 返回构建完成的安全过滤链。
     * @throws Exception 当配置构建失败时抛出异常。
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/user/login").permitAll()
                .requestMatchers("/api/articles/**", "/api/categories/**", "/api/tags/**", "/api/user/admin").permitAll()
                .requestMatchers("/api/admin/**").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
