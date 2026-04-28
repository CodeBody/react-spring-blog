package com.blog.server.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.blog.server.entity.Category;

import java.util.List;

/**
 * 分类领域服务接口。
 * 设计意图：补充分类与文章统计相关的查询能力。
 */
public interface CategoryService extends IService<Category> {
    /**
     * 获取带文章数量的分类列表。
     * @return 返回分类集合，`articleCount` 字段已填充。
     */
    List<Category> listWithArticleCount();
}
