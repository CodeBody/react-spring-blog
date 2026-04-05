package com.blog.server.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

@Data
public class ArticleDTO implements Serializable {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long authorId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long categoryId;
    private String title;
    private String content;
    private Integer status;
    @JsonSerialize(contentUsing = ToStringSerializer.class)
    private List<Long> tagIds;
}
