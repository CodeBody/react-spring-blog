package com.blog.server.controller;

import com.blog.server.common.Result;
import com.blog.server.entity.Tag;
import com.blog.server.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping
    public Result<List<Tag>> listTags() {
        return Result.success(tagService.list());
    }
}
