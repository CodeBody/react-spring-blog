package com.blog.server.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.server.entity.Project;
import com.blog.server.mapper.ProjectMapper;
import com.blog.server.service.ProjectService;
import org.springframework.stereotype.Service;

/**
 * 项目领域服务实现。
 * 设计意图：直接复用 MyBatis-Plus 提供的通用项目 CRUD 能力。
 */
@Service
public class ProjectServiceImpl extends ServiceImpl<ProjectMapper, Project> implements ProjectService {
}
