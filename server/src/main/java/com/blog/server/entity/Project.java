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

@Data
@TableName("projects")
public class Project implements Serializable {
    @TableId(type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    
    private String title;
    private String description;
    private String tags;
    private String githubUrl;
    private String demoUrl;
    private String color;
    
    private Date createdAt;
    private Date updatedAt;

    @TableLogic
    private Integer deleted;
}
