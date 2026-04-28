package com.blog.server.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.server.entity.User;

/**
 * 用户领域服务接口。
 * 设计意图：补充管理员查询与登录校验能力。
 */
public interface UserService extends IService<User> {
    /**
     * 获取系统中的管理员用户。
     * @return 返回管理员用户对象；未命中时返回 `null`。
     */
    User getAdminUser();

    /**
     * 校验用户名密码并返回匹配用户。
     * @param username 登录用户名，不能为空。
     * @param password 登录密码明文，不能为空。
     * @return 校验成功时返回用户对象，否则返回 `null`。
     */
    User login(String username, String password);
}
