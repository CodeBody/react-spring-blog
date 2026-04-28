package com.blog.server.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import java.io.Serializable;

/**
 * 文章标签关联实体。
 * 设计意图：映射文章与标签的多对多中间表。
 */
@Data
@TableName("article_tags")
public class ArticleTag implements Serializable {
    /**
     * 文章 ID。
     * 业务含义：关联 `articles.id`；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long articleId;
    /**
     * 标签 ID。
     * 业务含义：关联 `tags.id`；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long tagId;
}
