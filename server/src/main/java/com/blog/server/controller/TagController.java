package com.blog.server.controller;

import com.blog.server.common.Result;
import com.blog.server.entity.Tag;
import com.blog.server.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 前台标签接口。
 * 设计意图：向公开站点提供标签列表能力。
 */
@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    /**
     * 标签领域服务。
     * 业务含义：处理标签列表读取。
     */
    private final TagService tagService;

    /**
     * 获取前台标签列表。
     * @return 返回标签集合。
     */
    @GetMapping
    public Result<List<Tag>> listTags() {
        return Result.success(tagService.list());
    }
}
