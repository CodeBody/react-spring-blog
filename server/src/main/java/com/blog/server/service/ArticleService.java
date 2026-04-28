package com.blog.server.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.server.dto.ArticleDTO;
import com.blog.server.entity.Article;

/**
 * 文章领域服务接口。
 * 设计意图：在通用 CRUD 之外补充文章标签与浏览量相关能力。
 */
public interface ArticleService extends IService<Article> {
    /**
     * 获取文章详情并累计浏览量。
     * @param id 文章主键 ID，不能为空。
     * @return 返回文章详情；未命中时返回 `null`。
     */
    Article getArticleDetailAndAddViews(Long id);

    /**
     * 保存文章及其标签关系。
     * @param dto 文章传输对象，包含基础字段与标签 ID 列表。
     * @return 无返回值。
     */
    void saveArticleWithTags(ArticleDTO dto);

    /**
     * 更新文章及其标签关系。
     * @param dto 文章传输对象，必须包含文章 ID。
     * @return 无返回值。
     */
    void updateArticleWithTags(ArticleDTO dto);

    /**
     * 为文章填充标签名称集合。
     * @param article 文章实体对象，不能为空且必须包含文章 ID。
     * @return 无返回值。
     */
    void populateTags(Article article);
}
