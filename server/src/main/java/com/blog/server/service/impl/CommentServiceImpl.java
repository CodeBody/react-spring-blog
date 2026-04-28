package com.blog.server.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.server.entity.Comment;
import com.blog.server.mapper.CommentMapper;
import com.blog.server.service.CommentService;
import org.springframework.stereotype.Service;

/**
 * 评论领域服务实现。
 * 设计意图：直接复用 MyBatis-Plus 提供的通用评论 CRUD 能力。
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {
}
