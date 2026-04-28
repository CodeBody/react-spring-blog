package com.blog.server.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import java.io.Serializable;
import java.util.Date;

/**
 * 项目实体。
 * 设计意图：映射作品项目主表。
 */
@Data
@TableName("projects")
public class Project implements Serializable {
    /**
     * 项目主键 ID。
     * 业务含义：全局唯一标识；序列化时按字符串输出。
     */
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    /**
     * 项目标题。
     * 业务含义：用于列表、详情和后台管理展示。
     */
    private String title;
    /**
     * 项目描述。
     * 业务含义：用于说明项目内容与亮点。
     */
    private String description;
    /**
     * 项目标签串。
     * 业务含义：使用逗号拼接的标签文本。
     */
    private String tags;
    /**
     * 项目 GitHub 地址。
     * 业务含义：用于跳转源码仓库。
     */
    private String githubUrl;
    /**
     * 项目演示地址。
     * 业务含义：用于跳转在线演示页面。
     */
    private String demoUrl;
    /**
     * 项目主题色。
     * 业务含义：前端展示使用的颜色值，通常为十六进制色值。
     */
    private String color;

    /**
     * 项目创建时间。
     * 业务含义：记录数据首次落库时间。
     */
    private Date createdAt;
    /**
     * 项目更新时间。
     * 业务含义：记录最近一次修改时间。
     */
    private Date updatedAt;

    /**
     * 逻辑删除标记。
     * 业务含义：`0` 表示有效，`1` 表示已删除。
     */
    @TableLogic
    private Integer deleted;
}
