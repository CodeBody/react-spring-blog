package com.blog.server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 文章实体。
 * 设计意图：映射文章主表及前端详情展示所需的扩展字段。
 */
@Data
@TableName("articles")
public class Article implements Serializable {
    /**
     * 文章主键 ID。
     * 业务含义：全局唯一标识；序列化时按字符串输出以避免前端精度丢失。
     */
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    /**
     * 作者用户 ID。
     * 业务含义：关联 `users.id`；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long authorId;
    /**
     * 分类 ID。
     * 业务含义：关联 `categories.id`；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long categoryId;
    /**
     * 文章标题。
     * 业务含义：用于列表、详情页和搜索展示。
     */
    private String title;
    /**
     * 文章正文内容。
     * 业务含义：通常为 Markdown 文本。
     */
    private String content;
    /**
     * 文章状态。
     * 业务含义：`1` 表示已发布，`0` 表示草稿。
     */
    private Integer status;
    /**
     * 文章浏览量。
     * 业务含义：累计访问次数，单位为次。
     */
    private Integer views;
    /**
     * 文章发布时间。
     * 业务含义：仅发布状态下有意义。
     */
    private Date publishedAt;
    /**
     * 文章创建时间。
     * 业务含义：记录数据首次落库时间。
     */
    private Date createdAt;
    /**
     * 文章更新时间。
     * 业务含义：记录最近一次编辑时间。
     */
    private Date updatedAt;

    /**
     * 逻辑删除标记。
     * 业务含义：`0` 表示有效，`1` 表示已删除。
     */
    @TableLogic
    private Integer deleted;

    /**
     * 文章标签名称列表。
     * 业务含义：非数据库字段，仅用于接口响应聚合。
     */
    @TableField(exist = false)
    private List<String> tags;
}
