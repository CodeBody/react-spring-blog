package com.blog.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.server.dto.ArticleDTO;
import com.blog.server.entity.Article;
import com.blog.server.entity.ArticleTag;
import com.blog.server.mapper.ArticleMapper;
import com.blog.server.mapper.ArticleTagMapper;
import com.blog.server.mapper.TagMapper;
import com.blog.server.entity.Tag;
import com.blog.server.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
/**
 * 文章领域服务实现。
 * 设计意图：封装文章本体、标签关系和浏览量的组合操作。
 */
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {

    /**
     * 文章标签关联数据访问组件。
     * 业务含义：维护 `article_tags` 中间表数据。
     */
    private final ArticleTagMapper articleTagMapper;
    /**
     * 标签数据访问组件。
     * 业务含义：根据标签 ID 批量查询标签名称。
     */
    private final TagMapper tagMapper;

    /**
     * 获取文章详情并累计浏览量。
     * @param id 文章主键 ID，不能为空。
     * @return 返回文章详情；未命中时返回 `null`。
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Article getArticleDetailAndAddViews(Long id) {
        baseMapper.incrementViews(id);
        Article article = loadArticleById(id);
        populateArticleTags(article);
        return article;
    }

    /**
     * 为文章填充标签名称集合。
     * @param article 文章实体对象，不能为空且必须包含文章 ID。
     * @return 无返回值。
     */
    @Override
    public void populateTags(Article article) {
        if (article == null || article.getId() == null) {
            return;
        }

        List<ArticleTag> articleTags = findArticleTags(article.getId());
        article.setTags(buildTagNames(articleTags));
    }

    /**
     * 保存文章及其标签关系。
     * @param dto 文章传输对象，包含基础字段与标签 ID 列表。
     * @return 无返回值。
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveArticleWithTags(ArticleDTO dto) {
        Article article = buildArticleForCreate(dto);
        this.save(article);
        saveTags(article.getId(), dto);
    }

    /**
     * 更新文章及其标签关系。
     * @param dto 文章传输对象，必须包含文章 ID。
     * @return 无返回值。
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateArticleWithTags(ArticleDTO dto) {
        Article article = buildArticleForUpdate(dto);
        this.updateById(article);
        deleteArticleTags(article.getId());
        saveTags(article.getId(), dto);
    }

    /**
     * 根据文章 ID 加载文章实体。
     * @param id 文章主键 ID，不能为空。
     * @return 返回文章实体；未命中时返回 `null`。
     */
    private Article loadArticleById(Long id) {
        return this.getById(id);
    }

    /**
     * 为文章对象填充标签列表。
     * @param article 文章实体对象，允许为空。
     * @return 无返回值。
     */
    private void populateArticleTags(Article article) {
        if (article != null) {
            populateTags(article);
        }
    }

    /**
     * 查询文章关联的标签关系记录。
     * @param articleId 文章主键 ID，不能为空。
     * @return 返回关联记录列表；无数据时返回空列表。
     */
    private List<ArticleTag> findArticleTags(Long articleId) {
        LambdaQueryWrapper<ArticleTag> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleTag::getArticleId, articleId);
        return articleTagMapper.selectList(wrapper);
    }

    /**
     * 将标签关联记录转换为标签名称列表。
     * @param articleTags 文章标签关联记录集合。
     * @return 返回标签名称列表；无数据时返回空列表。
     */
    private List<String> buildTagNames(List<ArticleTag> articleTags) {
        if (articleTags == null || articleTags.isEmpty()) {
            return new ArrayList<>();
        }

        List<Long> tagIds = articleTags.stream().map(ArticleTag::getTagId).collect(Collectors.toList());
        List<Tag> tagList = tagMapper.selectBatchIds(tagIds);
        return tagList == null ? new ArrayList<>() : tagList.stream().map(Tag::getName).collect(Collectors.toList());
    }

    /**
     * 构建新增文章实体。
     * @param dto 文章传输对象，不能为空。
     * @return 返回补齐时间字段后的文章实体。
     */
    private Article buildArticleForCreate(ArticleDTO dto) {
        Article article = new Article();
        Date now = new Date();
        BeanUtils.copyProperties(dto, article);
        article.setCreatedAt(now);
        article.setUpdatedAt(now);

        if (article.getStatus() != null && article.getStatus() == 1) {
            article.setPublishedAt(now);
        }

        return article;
    }

    /**
     * 构建更新文章实体。
     * @param dto 文章传输对象，不能为空。
     * @return 返回补齐更新时间后的文章实体。
     */
    private Article buildArticleForUpdate(ArticleDTO dto) {
        Article article = new Article();
        BeanUtils.copyProperties(dto, article);
        article.setUpdatedAt(new Date());
        return article;
    }

    /**
     * 删除文章已有标签关联。
     * @param articleId 文章主键 ID，不能为空。
     * @return 无返回值。
     */
    private void deleteArticleTags(Long articleId) {
        LambdaQueryWrapper<ArticleTag> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleTag::getArticleId, articleId);
        articleTagMapper.delete(wrapper);
    }

    /**
     * 保存文章和标签的关联关系。
     * @param articleId 文章主键 ID，不能为空。
     * @param dto 文章传输对象，标签 ID 集合允许为空。
     * @return 无返回值。
     */
    private void saveTags(Long articleId, ArticleDTO dto) {
        if (dto.getTagIds() != null && !dto.getTagIds().isEmpty()) {
            for (Long tagId : dto.getTagIds()) {
                ArticleTag at = new ArticleTag();
                at.setArticleId(articleId);
                at.setTagId(tagId);
                articleTagMapper.insert(at);
            }
        }
    }
}
