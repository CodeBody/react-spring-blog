package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.blog.server.common.Result;
import com.blog.server.entity.Project;
import com.blog.server.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * 后台项目管理接口。
 * 设计意图：提供项目分页、详情、创建、更新和删除能力。
 */
@RestController
@RequestMapping("/api/admin/projects")
@RequiredArgsConstructor
public class AdminProjectController {

    /**
     * 项目领域服务。
     * 业务含义：处理项目后台 CRUD 逻辑。
     */
    private final ProjectService projectService;

    /**
     * 获取后台项目分页列表。
     * @param page 当前页码，从 1 开始。
     * @param size 每页条数，必须大于 0。
     * @param title 标题搜索词，可为空。
     * @return 返回后台项目分页结果。
     */
    @GetMapping
    public Result<Page<Project>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String title) {
        Page<Project> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Project> queryWrapper = buildAdminProjectQuery(title);
        return Result.success(projectService.page(pageParam, queryWrapper));
    }

    /**
     * 获取后台项目详情。
     * @param id 项目主键 ID，不能为空。
     * @return 返回项目详情对象；未命中时 `data` 为 `null`。
     */
    @GetMapping("/{id}")
    public Result<Project> getById(@PathVariable Long id) {
        return Result.success(projectService.getById(id));
    }

    /**
     * 创建项目。
     * @param project 项目对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PostMapping
    public Result<Void> create(@RequestBody Project project) {
        projectService.save(project);
        return Result.success();
    }

    /**
     * 更新项目。
     * @param id 项目主键 ID，不能为空。
     * @param project 项目对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        projectService.updateById(project);
        return Result.success();
    }

    /**
     * 删除项目。
     * @param id 项目主键 ID，不能为空。
     * @return 返回标准成功响应。
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        projectService.removeById(id);
        return Result.success();
    }

    /**
     * 构建后台项目查询条件。
     * @param title 标题搜索词，可为空。
     * @return 返回封装完成的查询条件对象。
     */
    private LambdaQueryWrapper<Project> buildAdminProjectQuery(String title) {
        LambdaQueryWrapper<Project> queryWrapper = new LambdaQueryWrapper<>();

        if (StringUtils.hasText(title)) {
            queryWrapper.like(Project::getTitle, title);
        }

        queryWrapper.orderByDesc(Project::getCreatedAt);
        return queryWrapper;
    }
}
