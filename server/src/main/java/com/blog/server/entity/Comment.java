package com.blog.server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.util.Date;

/**
 * 评论实体。
 * 设计意图：映射文章评论主表。
 */
@Data
@TableName("comments")
public class Comment implements Serializable {
    /**
     * 评论主键 ID。
     * 业务含义：全局唯一标识。
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    /**
     * 所属文章 ID。
     * 业务含义：关联 `articles.id`。
     */
    private Long articleId;
    /**
     * 评论人姓名。
     * 业务含义：前台访客展示名称。
     */
    private String authorName;
    /**
     * 评论人邮箱。
     * 业务含义：用于联系与审核追踪。
     */
    private String authorEmail;
    /**
     * 评论正文内容。
     * 业务含义：用户提交的文本内容。
     */
    private String content;
    /**
     * 评论审核状态。
     * 业务含义：`0` 待审核，`1` 已通过，`2` 已拒绝。
     */
    private Integer status; // 0-pending, 1-approved, 2-rejected
    /**
     * 评论创建时间。
     * 业务含义：记录评论提交时间。
     */
    private Date createdAt;
}
