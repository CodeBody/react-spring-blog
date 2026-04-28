package com.blog.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.server.entity.User;
import com.blog.server.mapper.UserMapper;
import com.blog.server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
/**
 * 用户领域服务实现。
 * 设计意图：封装管理员查询与后台登录校验逻辑。
 */
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    /**
     * BCrypt 密码编码器。
     * 业务含义：用于比对用户输入密码与数据库加密密码。
     */
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * 获取系统中的管理员用户。
     * @param 无。
     * @return 返回管理员用户对象；未命中时返回 `null`。
     */
    @Override
    public User getAdminUser() {
        return this.getOne(new LambdaQueryWrapper<User>()
                .eq(User::getRole, "admin")
                .last("LIMIT 1"));
    }

    /**
     * 校验用户名密码并返回匹配用户。
     * @param username 登录用户名，不能为空。
     * @param password 登录密码明文，不能为空。
     * @return 校验成功时返回用户对象，否则返回 `null`。
     */
    @Override
    public User login(String username, String password) {
        User user = findUserByUsername(username);
        if (user == null) {
            return null;
        }
        return matchesPassword(password, user.getPassword()) ? user : null;
    }

    /**
     * 按用户名查询用户。
     * @param username 登录用户名，不能为空。
     * @return 返回命中的用户对象；未命中时返回 `null`。
     */
    private User findUserByUsername(String username) {
        return this.getOne(new LambdaQueryWrapper<User>()
                .eq(User::getUsername, username)
                .last("LIMIT 1"));
    }

    /**
     * 校验明文密码与数据库密码是否匹配。
     * @param rawPassword 用户输入的明文密码。
     * @param encodedPassword 数据库存储的加密密码串。
     * @return 匹配成功返回 `true`，否则返回 `false`。
     */
    private boolean matchesPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
