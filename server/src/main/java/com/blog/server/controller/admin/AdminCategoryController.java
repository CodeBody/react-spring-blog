package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.blog.server.common.Result;
import com.blog.server.entity.Article;
import com.blog.server.entity.Category;
import com.blog.server.service.ArticleService;
import com.blog.server.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * 后台分类管理接口。
 * 设计意图：提供分类列表、创建、更新和删除能力。
 */
@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
public class AdminCategoryController {

    /**
     * 分类领域服务。
     * 业务含义：处理分类后台 CRUD 逻辑。
     */
    private final CategoryService categoryService;
    /**
     * 文章领域服务。
     * 业务含义：在删除分类前校验文章关联关系。
     */
    private final ArticleService articleService;

    /**
     * 获取后台分类列表。
     * @return 返回带文章数量的分类集合。
     */
    @GetMapping
    public Result<List<Category>> list() {
        List<Category> list = categoryService.list();
        for (Category category : list) {
            category.setArticleCount(countArticles(category.getId()));
        }
        return Result.success(list);
    }

    /**
     * 创建分类。
     * @param category 分类对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PostMapping
    public Result<Void> create(@RequestBody Category category) {
        fillCategoryTimestamps(category, true);
        categoryService.save(category);
        return Result.success();
    }

    /**
     * 更新分类。
     * @param id 分类主键 ID，不能为空。
     * @param category 分类对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody Category category) {
        category.setId(id);
        fillCategoryTimestamps(category, false);
        categoryService.updateById(category);
        return Result.success();
    }

    /**
     * 删除分类。
     * @param id 分类主键 ID，不能为空。
     * @return 当存在关联文章时返回失败响应，否则返回成功响应。
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        if (countArticles(id) > 0) {
            return Result.fail("该分类下已有文章，无法删除。请先移动或删除相关文章。");
        }
        categoryService.removeById(id);
        return Result.success();
    }

    /**
     * 统计分类下的文章数量。
     * @param categoryId 分类主键 ID，不能为空。
     * @return 返回文章数量，单位为篇。
     */
    private int countArticles(Long categoryId) {
        long count = articleService.count(new LambdaQueryWrapper<Article>().eq(Article::getCategoryId, categoryId));
        return (int) count;
    }

    /**
     * 补齐分类时间字段。
     * @param category 分类对象，不能为空。
     * @param isCreate 是否为创建场景。
     * @return 无返回值。
     */
    private void fillCategoryTimestamps(Category category, boolean isCreate) {
        Date now = new Date();
        category.setUpdatedAt(now);

        if (isCreate) {
            category.setCreatedAt(now);
        }
    }
}
