package com.blog.server.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.blog.server.common.Result;
import com.blog.server.entity.Project;
import com.blog.server.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 前台项目接口。
 * 设计意图：向公开站点提供项目分页与关键词搜索能力。
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    /**
     * 项目领域服务。
     * 业务含义：处理项目前台分页查询。
     */
    private final ProjectService projectService;

    /**
     * 获取前台项目分页列表。
     * @param page 当前页码，从 1 开始。
     * @param size 每页条数，必须大于 0。
     * @param title 标题搜索词，可为空。
     * @return 返回项目分页结果。
     */
    @GetMapping
    public Result<Page<Project>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "6") Integer size,
            @RequestParam(required = false) String title) {
        Page<Project> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Project> queryWrapper = buildProjectQuery(title);
        return Result.success(projectService.page(pageParam, queryWrapper));
    }

    /**
     * 构建前台项目查询条件。
     * @param title 标题搜索词，可为空。
     * @return 返回封装完成的查询条件对象。
     */
    private LambdaQueryWrapper<Project> buildProjectQuery(String title) {
        LambdaQueryWrapper<Project> queryWrapper = new LambdaQueryWrapper<>();

        if (StringUtils.hasText(title)) {
            queryWrapper.and(wrapper -> wrapper.like(Project::getTitle, title).or().like(Project::getDescription, title));
        }

        queryWrapper.orderByDesc(Project::getCreatedAt);
        return queryWrapper;
    }
}
