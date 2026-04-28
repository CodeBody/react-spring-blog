package com.blog.server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.server.entity.Comment;

/**
 * 评论数据访问接口。
 * 设计意图：提供评论表的通用 CRUD 能力。
 */
public interface CommentMapper extends BaseMapper<Comment> {
}
