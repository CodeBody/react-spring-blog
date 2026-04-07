package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.blog.server.common.Result;
import com.blog.server.entity.Project;
import com.blog.server.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/projects")
@RequiredArgsConstructor
public class AdminProjectController {

    private final ProjectService projectService;

    @GetMapping
    public Result<Page<Project>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) String title) {
            
        Page<Project> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Project> queryWrapper = new LambdaQueryWrapper<>();
        
        if (StringUtils.hasText(title)) {
            queryWrapper.like(Project::getTitle, title);
        }
        queryWrapper.orderByDesc(Project::getCreatedAt);

        return Result.success(projectService.page(pageParam, queryWrapper));
    }

    @GetMapping("/{id}")
    public Result<Project> getById(@PathVariable Long id) {
        return Result.success(projectService.getById(id));
    }

    @PostMapping
    public Result<Void> create(@RequestBody Project project) {
        projectService.save(project);
        return Result.success();
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        projectService.updateById(project);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        projectService.removeById(id);
        return Result.success();
    }
}
