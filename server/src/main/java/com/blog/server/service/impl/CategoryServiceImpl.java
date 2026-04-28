package com.blog.server.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.blog.server.entity.Article;
import com.blog.server.entity.Category;
import com.blog.server.mapper.ArticleMapper;
import com.blog.server.mapper.CategoryMapper;
import com.blog.server.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 分类领域服务实现。
 * 设计意图：在分类基础 CRUD 之外补充文章数量统计。
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {
    /**
     * 文章数据访问组件。
     * 业务含义：用于统计每个分类下的已发布文章数量。
     */
    @Autowired
    private ArticleMapper articleMapper;

    /**
     * 获取带文章数量的分类列表。
     * @param 无。
     * @return 返回分类集合，`articleCount` 字段已填充。
     */
    @Override
    public List<Category> listWithArticleCount() {
        List<Category> categories = this.list();
        for (Category category : categories) {
            Long count = countPublishedArticles(category.getId());
            category.setArticleCount(count.intValue());
        }
        return categories;
    }

    /**
     * 统计指定分类下的已发布文章数量。
     * @param categoryId 分类主键 ID，不能为空。
     * @return 返回文章数量，单位为篇。
     */
    private Long countPublishedArticles(Long categoryId) {
        return articleMapper.selectCount(new LambdaQueryWrapper<Article>()
                .eq(Article::getCategoryId, categoryId)
                .eq(Article::getStatus, 1));
    }
}
