package com.blog.server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.server.entity.User;

/**
 * 用户数据访问接口。
 * 设计意图：提供用户表的通用 CRUD 能力。
 */
public interface UserMapper extends BaseMapper<User> {
}
