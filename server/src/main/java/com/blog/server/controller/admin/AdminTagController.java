package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.blog.server.common.Result;
import com.blog.server.entity.ArticleTag;
import com.blog.server.entity.Tag;
import com.blog.server.mapper.ArticleTagMapper;
import com.blog.server.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin/tags")
@RequiredArgsConstructor
public class AdminTagController {

    private final TagService tagService;
    private final ArticleTagMapper articleTagMapper;

    @GetMapping
    public Result<List<Tag>> list() {
        List<Tag> list = tagService.list();
        for (Tag tag : list) {
            long count = articleTagMapper.selectCount(new LambdaQueryWrapper<ArticleTag>().eq(ArticleTag::getTagId, tag.getId()));
            tag.setArticleCount((int) count);
        }
        return Result.success(list);
    }

    @PostMapping
    public Result<Void> create(@RequestBody Tag tag) {
        Date now = new Date();
        tag.setCreatedAt(now);
        tag.setUpdatedAt(now);
        tagService.save(tag);
        return Result.success();
    }

    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody Tag tag) {
        tag.setId(id);
        tag.setUpdatedAt(new Date());
        tagService.updateById(tag);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public Result<Void> delete(@PathVariable Long id) {
        // 1. 先删除文章-标签关联
        articleTagMapper.delete(new LambdaQueryWrapper<ArticleTag>().eq(ArticleTag::getTagId, id));
        // 2. 再删除标签本体
        tagService.removeById(id);
        return Result.success();
    }
}
