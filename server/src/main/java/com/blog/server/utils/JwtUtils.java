package com.blog.server.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 工具类。
 * 设计意图：统一处理令牌生成、解析与校验逻辑。
 */
@Component
public class JwtUtils {

    /**
     * JWT 签名密钥。
     * 业务含义：优先读取环境变量 `JWT_SECRET`，否则使用开发环境默认值。
     */
    private static final String SECRET = System.getenv("JWT_SECRET") != null 
        ? System.getenv("JWT_SECRET") 
        : "default-dev-secret-key-for-blog-jwt-authentication-needs-to-be-long-enough";
    /**
     * JWT 有效期。
     * 业务含义：令牌有效时长，单位为毫秒；当前配置为 7 天。
     */
    private static final long EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days

    /**
     * JWT 签名密钥对象。
     * 业务含义：JJWT 生成和校验签名时使用。
     */
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    /**
     * 生成 JWT 令牌。
     * @param username 登录用户名，不能为空。
     * @param role 用户角色标识，例如 `admin`。
     * @return 返回签名后的 JWT 字符串。
     */
    public String createToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }

    /**
     * 解析 JWT 令牌。
     * @param token JWT 字符串，不能为空。
     * @return 解析成功时返回 Claims；失败时返回 `null`。
     */
    public Claims parseToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 校验 JWT 是否有效。
     * @param token JWT 字符串，不能为空。
     * @return 有效时返回 `true`，否则返回 `false`。
     */
    public boolean validateToken(String token) {
        return parseToken(token) != null;
    }

    /**
     * 从 JWT 中提取用户名。
     * @param token JWT 字符串，不能为空。
     * @return 提取成功时返回用户名，否则返回 `null`。
     */
    public String getUsername(String token) {
        Claims claims = parseToken(token);
        return claims != null ? claims.getSubject() : null;
    }
}
