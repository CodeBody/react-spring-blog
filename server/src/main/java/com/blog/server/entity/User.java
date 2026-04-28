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
 * 用户实体。
 * 设计意图：映射后台用户主表。
 */
@Data
@TableName("users")
public class User implements Serializable {
    /**
     * 用户主键 ID。
     * 业务含义：全局唯一标识；序列化时按字符串输出。
     */
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    /**
     * 登录用户名。
     * 业务含义：后台登录使用的唯一账号标识。
     */
    private String username;
    /**
     * 登录密码。
     * 业务含义：通常存储加密后的密码串，不应直接回显。
     */
    private String password;
    /**
     * 用户昵称。
     * 业务含义：前后台展示名称。
     */
    private String nickname;
    /**
     * 头像地址。
     * 业务含义：前后台头像展示使用的图片 URL。
     */
    private String avatar;
    /**
     * 个性简介。
     * 业务含义：前台关于信息展示文案。
     */
    private String bio;
    /**
     * GitHub 链接。
     * 业务含义：用于前台社交链接展示。
     */
    private String github;
    /**
     * Twitter 链接。
     * 业务含义：用于前台社交链接展示。
     */
    private String twitter;
    /**
     * LinkedIn 链接。
     * 业务含义：用于前台社交链接展示。
     */
    private String linkedin;
    /**
     * 邮箱地址。
     * 业务含义：用于联系和后台资料展示。
     */
    private String email;
    /**
     * 角色标识。
     * 业务含义：用于权限区分，常见值为 `admin` 或 `user`。
     */
    private String role;
    /**
     * 用户创建时间。
     * 业务含义：记录数据首次落库时间。
     */
    private Date createdAt;
    /**
     * 用户更新时间。
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
