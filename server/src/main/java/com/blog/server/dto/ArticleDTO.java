package com.blog.server.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * 文章写接口传输对象。
 * 设计意图：承接前端编辑表单提交给后端的文章数据。
 */
@Data
public class ArticleDTO implements Serializable {
    /**
     * 文章主键 ID。
     * 业务含义：更新文章时必填；新增时可为空。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    /**
     * 作者用户 ID。
     * 业务含义：关联后台用户主键；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long authorId;
    /**
     * 分类 ID。
     * 业务含义：关联文章分类主键；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long categoryId;
    /**
     * 文章标题。
     * 业务含义：用于文章列表和详情展示。
     */
    private String title;
    /**
     * 文章正文。
     * 业务含义：通常为 Markdown 文本。
     */
    private String content;
    /**
     * 文章状态。
     * 业务含义：`1` 表示已发布，`0` 表示草稿。
     */
    private Integer status;
    /**
     * 标签 ID 列表。
     * 业务含义：维护文章与标签的多对多关联。
     */
    @JsonSerialize(contentUsing = ToStringSerializer.class)
    private List<Long> tagIds;
}
