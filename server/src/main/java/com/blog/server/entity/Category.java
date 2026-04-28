package com.blog.server.entity;

import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import java.util.Date;

/**
 * 分类实体。
 * 设计意图：映射文章分类主表及分类统计扩展字段。
 */
@Data
@TableName("categories")
public class Category {
    /**
     * 分类主键 ID。
     * 业务含义：全局唯一标识；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    /**
     * 分类名称。
     * 业务含义：用于前后台分类展示与筛选。
     */
    private String name;
    /**
     * 分类描述。
     * 业务含义：补充说明分类用途，允许为空。
     */
    private String description;
    /**
     * 分类创建时间。
     * 业务含义：记录数据首次落库时间。
     */
    private Date createdAt;
    /**
     * 分类更新时间。
     * 业务含义：记录最近一次修改时间。
     */
    private Date updatedAt;

    /**
     * 逻辑删除标记。
     * 业务含义：`0` 表示有效，`1` 表示已删除。
     */
    @TableLogic
    private Integer deleted;

    /**
     * 分类下文章数量。
     * 业务含义：非数据库字段，仅用于前后台统计展示。
     */
    @TableField(exist = false)
    private Integer articleCount;
}
