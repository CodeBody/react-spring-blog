package com.blog.server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.server.entity.ArticleTag;

/**
 * 文章标签关联数据访问接口。
 * 设计意图：维护文章与标签多对多关系表。
 */
public interface ArticleTagMapper extends BaseMapper<ArticleTag> {
}
