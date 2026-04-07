package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.blog.server.common.Result;
import com.blog.server.dto.ArticleDTO;
import com.blog.server.entity.Article;
import com.blog.server.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/articles")
@RequiredArgsConstructor
public class AdminArticleController {

    private final ArticleService articleService;

    @GetMapping
    public Result<Page<Article>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer size,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Integer status) {
            
        Page<Article> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Article> queryWrapper = new LambdaQueryWrapper<>();
        
        if (categoryId != null) {
            queryWrapper.eq(Article::getCategoryId, categoryId);
        }
        if (status != null) {
            queryWrapper.eq(Article::getStatus, status);
        }
        queryWrapper.orderByDesc(Article::getCreatedAt);

        Page<Article> resultPage = articleService.page(pageParam, queryWrapper);
        resultPage.getRecords().forEach(articleService::populateTags);
        return Result.success(resultPage);
    }

    @GetMapping("/{id}")
    public Result<Article> getById(@PathVariable Long id) {
        Article article = articleService.getById(id);
        if (article != null) {
            articleService.populateTags(article);
        }
        return Result.success(article);
    }

    @PostMapping
    public Result<Void> create(@RequestBody ArticleDTO dto) {
        articleService.saveArticleWithTags(dto);
        return Result.success();
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody ArticleDTO dto) {
        dto.setId(id);
        articleService.updateArticleWithTags(dto);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        articleService.removeById(id);
        return Result.success();
    }
}
