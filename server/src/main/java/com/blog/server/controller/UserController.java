package com.blog.server.controller;

import com.blog.server.common.Result;
import com.blog.server.entity.User;
import com.blog.server.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 用户公开接口。
 * 设计意图：提供后台管理员资料读取和登录能力。
 */
@Slf4j
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    /**
     * 用户领域服务。
     * 业务含义：处理管理员查询和登录校验。
     */
    private final UserService userService;
    /**
     * JWT 工具类。
     * 业务含义：负责登录成功后的令牌生成。
     */
    private final com.blog.server.utils.JwtUtils jwtUtils;

    /**
     * 登录请求体。
     * 设计意图：承接后台登录接口提交的用户名和密码。
     */
    @Data
    public static class LoginRequest {
        /**
         * 登录用户名。
         * 业务含义：后台登录账号标识。
         */
        private String username;
        /**
         * 登录密码。
         * 业务含义：本次登录提交的明文密码。
         */
        private String password;
    }

    /**
     * 获取管理员资料。
     * @return 返回管理员资料对象；未配置管理员时返回失败响应。
     */
    @GetMapping("/admin")
    public Result<Map<String, Object>> getAdminProfile() {
        User admin = userService.getAdminUser();
        if (admin == null) {
            return Result.fail(404, "Admin user not found");
        }
        return Result.success(buildProfile(admin));
    }

    /**
     * 执行后台登录。
     * @param request 登录请求体，包含用户名和密码。
     * @return 登录成功时返回用户和令牌，失败时返回 401 业务响应。
     */
    @PostMapping("/login")
    public Result<Map<String, Object>> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getUsername(), request.getPassword());
        if (user != null) {
            String token = jwtUtils.createToken(user.getUsername(), user.getRole());
            return Result.success(buildLoginResponse(user, token));
        }

        return Result.fail(401, "Invalid username or password");
    }

    /**
     * 构建前端所需的管理员资料结构。
     * @param admin 管理员用户对象，不能为空。
     * @return 返回资料对象，包含基本信息和社交链接。
     */
    private Map<String, Object> buildProfile(User admin) {
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", admin.getNickname() != null ? admin.getNickname() : admin.getUsername());
        profile.put("avatar", admin.getAvatar());
        profile.put("bio", admin.getBio());
        profile.put("socials", buildSocials(admin));
        return profile;
    }

    /**
     * 构建管理员社交信息结构。
     * @param admin 管理员用户对象，不能为空。
     * @return 返回社交链接对象。
     */
    private Map<String, String> buildSocials(User admin) {
        Map<String, String> socials = new HashMap<>();
        socials.put("github", admin.getGithub());
        socials.put("twitter", admin.getTwitter());
        socials.put("linkedin", admin.getLinkedin());
        return socials;
    }

    /**
     * 构建登录成功响应对象。
     * @param user 登录成功的用户对象。
     * @param token 已生成的 JWT 令牌字符串。
     * @return 返回包含用户和令牌的响应体。
     */
    private Map<String, Object> buildLoginResponse(User user, String token) {
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        return response;
    }
}
