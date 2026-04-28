package com.blog.server.entity;

import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import java.util.Date;

/**
 * 标签实体。
 * 设计意图：映射文章标签主表及标签统计扩展字段。
 */
@Data
@TableName("tags")
public class Tag {
    /**
     * 标签主键 ID。
     * 业务含义：全局唯一标识；序列化时按字符串输出。
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    /**
     * 标签名称。
     * 业务含义：用于文章标签展示与筛选。
     */
    private String name;
    /**
     * 标签创建时间。
     * 业务含义：记录数据首次落库时间。
     */
    private Date createdAt;
    /**
     * 标签更新时间。
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
     * 标签关联文章数量。
     * 业务含义：非数据库字段，仅用于前后台统计展示。
     */
    @TableField(exist = false)
    private Integer articleCount;
}
