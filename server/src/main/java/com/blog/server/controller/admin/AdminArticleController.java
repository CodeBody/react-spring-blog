package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.blog.server.common.Result;
import com.blog.server.dto.ArticleDTO;
import com.blog.server.entity.Article;
import com.blog.server.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 后台文章管理接口。
 * 设计意图：提供文章分页、详情、创建、更新和删除能力。
 */
@RestController
@RequestMapping("/api/admin/articles")
@RequiredArgsConstructor
public class AdminArticleController {

    /**
     * 文章领域服务。
     * 业务含义：处理文章及标签的后台管理逻辑。
     */
    private final ArticleService articleService;

    /**
     * 获取后台文章分页列表。
     * @param page 当前页码，从 1 开始。
     * @param size 每页条数，必须大于 0。
     * @param categoryId 分类 ID，可为空。
     * @param status 文章状态，可为空。
     * @return 返回后台文章分页结果。
     */
    @GetMapping
    public Result<Page<Article>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer size,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Integer status) {
        Page<Article> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Article> queryWrapper = buildAdminArticleQuery(categoryId, status);
        Page<Article> resultPage = articleService.page(pageParam, queryWrapper);
        populateArticleTags(resultPage);
        return Result.success(resultPage);
    }

    /**
     * 获取后台文章详情。
     * @param id 文章主键 ID，不能为空。
     * @return 返回文章详情对象；未命中时 `data` 为 `null`。
     */
    @GetMapping("/{id}")
    public Result<Article> getById(@PathVariable Long id) {
        Article article = articleService.getById(id);
        if (article != null) {
            articleService.populateTags(article);
        }
        return Result.success(article);
    }

    /**
     * 创建文章。
     * @param dto 文章写入 DTO，包含标题、内容、状态和标签 ID。
     * @return 返回标准成功响应。
     */
    @PostMapping
    public Result<Void> create(@RequestBody ArticleDTO dto) {
        articleService.saveArticleWithTags(dto);
        return Result.success();
    }

    /**
     * 更新文章。
     * @param id 文章主键 ID，不能为空。
     * @param dto 文章写入 DTO，包含更新后的字段。
     * @return 返回标准成功响应。
     */
    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody ArticleDTO dto) {
        dto.setId(id);
        articleService.updateArticleWithTags(dto);
        return Result.success();
    }

    /**
     * 删除文章。
     * @param id 文章主键 ID，不能为空。
     * @return 返回标准成功响应。
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        articleService.removeById(id);
        return Result.success();
    }

    /**
     * 构建后台文章查询条件。
     * @param categoryId 分类 ID，可为空。
     * @param status 文章状态，可为空。
     * @return 返回封装完成的查询条件对象。
     */
    private LambdaQueryWrapper<Article> buildAdminArticleQuery(Long categoryId, Integer status) {
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();

        if (categoryId != null) {
            queryWrapper.eq(Article::getCategoryId, categoryId);
        }

        if (status != null) {
            queryWrapper.eq(Article::getStatus, status);
        }

        queryWrapper.orderByDesc(Article::getCreatedAt);
        return queryWrapper;
    }

    /**
     * 为分页结果中的文章补充标签列表。
     * @param resultPage 文章分页结果对象，不能为空。
     * @return 无返回值。
     */
    private void populateArticleTags(Page<Article> resultPage) {
        resultPage.getRecords().forEach(articleService::populateTags);
    }
}
