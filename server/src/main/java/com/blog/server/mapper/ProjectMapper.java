package com.blog.server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.server.entity.Project;
import org.apache.ibatis.annotations.Mapper;

/**
 * 项目数据访问接口。
 * 设计意图：提供项目表的通用 CRUD 能力。
 */
@Mapper
public interface ProjectMapper extends BaseMapper<Project> {
}
