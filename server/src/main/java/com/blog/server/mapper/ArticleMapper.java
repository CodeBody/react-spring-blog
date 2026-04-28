package com.blog.server.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.blog.server.entity.Article;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * 文章数据访问接口。
 * 设计意图：在通用 CRUD 基础上补充文章统计与原子更新 SQL。
 */
public interface ArticleMapper extends BaseMapper<Article> {
    /**
     * 统计所有未删除文章的总浏览量。
     * @return 返回总浏览量，单位为次。
     */
    @Select("SELECT COALESCE(SUM(views), 0) FROM articles WHERE deleted = 0")
    Integer getTotalViews();

    /**
     * 原子递增指定文章的浏览量。
     * @param id 文章主键 ID，不能为空。
     * @return 返回受影响行数。
     */
    @Update("UPDATE articles SET views = views + 1 WHERE id = #{id}")
    int incrementViews(Long id);
}
