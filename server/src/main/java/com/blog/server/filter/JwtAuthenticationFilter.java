package com.blog.server.filter;

import com.blog.server.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * JWT 鉴权过滤器。
 * 设计意图：从请求头解析令牌并将认证信息写入 Spring Security 上下文。
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * JWT 工具类。
     * 业务含义：负责令牌解析与字段读取。
     */
    private final JwtUtils jwtUtils;

    /**
     * 执行单次请求的 JWT 认证处理。
     * @param request HTTP 请求对象，不能为空。
     * @param response HTTP 响应对象，不能为空。
     * @param filterChain 过滤器链对象，不能为空。
     * @return 无返回值。
     * @throws ServletException 当过滤器处理失败时抛出异常。
     * @throws IOException 当 IO 处理失败时抛出异常。
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    @NonNull HttpServletResponse response, 
                                    @NonNull FilterChain filterChain) 
                                    throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Claims claims = jwtUtils.parseToken(token);
            if (claims != null) {
                String username = claims.getSubject();
                String role = claims.get("role", String.class);
                
                // Add ROLE_ prefix as expected by Spring Security
                String grantedRole = "ROLE_" + (role != null ? role.toUpperCase() : "USER");
                
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.singletonList(new SimpleGrantedAuthority(grantedRole))
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        filterChain.doFilter(request, response);
    }
}
