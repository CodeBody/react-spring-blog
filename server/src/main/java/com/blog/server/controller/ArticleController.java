package com.blog.server.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.blog.server.common.Result;
import com.blog.server.entity.Article;
import com.blog.server.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 前台文章接口。
 * 设计意图：向公开站点提供文章列表和文章详情能力。
 */
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    /**
     * 文章领域服务。
     * 业务含义：处理文章分页、详情和标签填充逻辑。
     */
    private final ArticleService articleService;

    /**
     * 获取前台文章分页列表。
     * @param page 当前页码，从 1 开始。
     * @param size 每页条数，必须大于 0。
     * @param categoryId 分类 ID，可为空。
     * @param keyword 关键词，可为空。
     * @param sortOrder 创建时间排序方向，仅支持 `asc` 或 `desc`。
     * @return 返回文章分页结果，列表中仅包含已发布文章。
     */
    @GetMapping
    public Result<Page<Article>> listArticles(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "desc") String sortOrder) {
        Page<Article> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Article> queryWrapper = buildPublicArticleQuery(categoryId, keyword, sortOrder);
        Page<Article> resultPage = articleService.page(pageParam, queryWrapper);
        populateArticleTags(resultPage);
        return Result.success(resultPage);
    }

    /**
     * 获取前台文章详情。
     * @param id 文章主键 ID，不能为空。
     * @return 返回已发布文章详情；未发布或不存在时返回失败响应。
     */
    @GetMapping("/{id}")
    public Result<Article> getArticle(@PathVariable Long id) {
        Article article = articleService.getArticleDetailAndAddViews(id);
        if (article == null || article.getStatus() != 1) {
            return Result.fail(404, "Article not found or not published");
        }
        return Result.success(article);
    }

    /**
     * 构建前台文章查询条件。
     * @param categoryId 分类 ID，可为空。
     * @param keyword 关键词，可为空。
     * @param sortOrder 创建时间排序方向，仅支持 `asc` 或 `desc`。
     * @return 返回封装完成的查询条件对象。
     */
    private LambdaQueryWrapper<Article> buildPublicArticleQuery(Long categoryId, String keyword, String sortOrder) {
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Article::getStatus, 1);

        if (categoryId != null) {
            queryWrapper.eq(Article::getCategoryId, categoryId);
        }

        if (keyword != null && !keyword.isEmpty()) {
            queryWrapper.and(wrapper -> wrapper.like(Article::getTitle, keyword).or().like(Article::getContent, keyword));
        }

        applyPublicArticleSort(queryWrapper, sortOrder);
        return queryWrapper;
    }

    /**
     * 应用前台文章列表的创建时间排序规则。
     * @param queryWrapper 文章查询条件对象，不能为空。
     * @param sortOrder 创建时间排序方向，仅支持 `asc` 或 `desc`。
     * @return 无返回值。
     */
    private void applyPublicArticleSort(LambdaQueryWrapper<Article> queryWrapper, String sortOrder) {
        if (isAscendingSort(sortOrder)) {
            queryWrapper.orderByAsc(Article::getCreatedAt);
            return;
        }

        queryWrapper.orderByDesc(Article::getCreatedAt);
    }

    /**
     * 判断当前是否为创建时间升序排序。
     * @param sortOrder 创建时间排序方向字符串。
     * @return 当值为 `asc` 时返回 `true`，否则返回 `false`。
     */
    private boolean isAscendingSort(String sortOrder) {
        return "asc".equalsIgnoreCase(sortOrder);
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
