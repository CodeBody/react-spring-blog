package com.blog.server.controller;

import com.blog.server.common.Result;
import com.blog.server.entity.Category;
import com.blog.server.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 前台分类接口。
 * 设计意图：向公开站点提供分类及其文章数量信息。
 */
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    /**
     * 分类领域服务。
     * 业务含义：处理分类列表及文章数量统计。
     */
    private final CategoryService categoryService;

    /**
     * 获取前台分类列表。
     * @return 返回带文章数量的分类集合。
     */
    @GetMapping
    public Result<List<Category>> listCategories() {
        return Result.success(categoryService.listWithArticleCount());
    }
}
