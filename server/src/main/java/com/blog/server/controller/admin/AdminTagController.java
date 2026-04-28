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

/**
 * 后台标签管理接口。
 * 设计意图：提供标签列表、创建、更新和删除能力。
 */
@RestController
@RequestMapping("/api/admin/tags")
@RequiredArgsConstructor
public class AdminTagController {

    /**
     * 标签领域服务。
     * 业务含义：处理标签后台 CRUD 逻辑。
     */
    private final TagService tagService;
    /**
     * 文章标签关联数据访问组件。
     * 业务含义：用于统计标签被文章引用的次数及删除关联关系。
     */
    private final ArticleTagMapper articleTagMapper;

    /**
     * 获取后台标签列表。
     * @return 返回带文章数量的标签集合。
     */
    @GetMapping
    public Result<List<Tag>> list() {
        List<Tag> list = tagService.list();
        for (Tag tag : list) {
            tag.setArticleCount(countArticles(tag.getId()));
        }
        return Result.success(list);
    }

    /**
     * 创建标签。
     * @param tag 标签对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PostMapping
    public Result<Void> create(@RequestBody Tag tag) {
        fillTagTimestamps(tag, true);
        tagService.save(tag);
        return Result.success();
    }

    /**
     * 更新标签。
     * @param id 标签主键 ID，不能为空。
     * @param tag 标签对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody Tag tag) {
        tag.setId(id);
        fillTagTimestamps(tag, false);
        tagService.updateById(tag);
        return Result.success();
    }

    /**
     * 删除标签及其文章关联关系。
     * @param id 标签主键 ID，不能为空。
     * @return 返回标准成功响应。
     */
    @DeleteMapping("/{id}")
    @Transactional
    public Result<Void> delete(@PathVariable Long id) {
        articleTagMapper.delete(new LambdaQueryWrapper<ArticleTag>().eq(ArticleTag::getTagId, id));
        tagService.removeById(id);
        return Result.success();
    }

    /**
     * 统计标签关联的文章数量。
     * @param tagId 标签主键 ID，不能为空。
     * @return 返回文章数量，单位为篇。
     */
    private int countArticles(Long tagId) {
        long count = articleTagMapper.selectCount(new LambdaQueryWrapper<ArticleTag>().eq(ArticleTag::getTagId, tagId));
        return (int) count;
    }

    /**
     * 补齐标签时间字段。
     * @param tag 标签对象，不能为空。
     * @param isCreate 是否为创建场景。
     * @return 无返回值。
     */
    private void fillTagTimestamps(Tag tag, boolean isCreate) {
        Date now = new Date();
        tag.setUpdatedAt(now);

        if (isCreate) {
            tag.setCreatedAt(now);
        }
    }
}
