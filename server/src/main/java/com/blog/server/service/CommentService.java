package com.blog.server.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.server.entity.Comment;

/**
 * 评论领域服务接口。
 * 设计意图：继承 MyBatis-Plus 通用评论 CRUD 能力。
 */
public interface CommentService extends IService<Comment> {
}
