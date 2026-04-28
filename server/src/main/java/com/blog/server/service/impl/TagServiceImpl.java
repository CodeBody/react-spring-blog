package com.blog.server.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.server.entity.Tag;
import com.blog.server.mapper.TagMapper;
import com.blog.server.service.TagService;
import org.springframework.stereotype.Service;

/**
 * 标签领域服务实现。
 * 设计意图：直接复用 MyBatis-Plus 提供的通用标签 CRUD 能力。
 */
@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {
}
