package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.blog.server.common.Result;
import com.blog.server.entity.Comment;
import com.blog.server.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 后台评论管理接口。
 * 设计意图：提供评论分页、审核状态更新和删除能力。
 */
@RestController
@RequestMapping("/api/admin/comments")
@RequiredArgsConstructor
public class AdminCommentController {

    /**
     * 评论领域服务。
     * 业务含义：处理评论后台管理逻辑。
     */
    private final CommentService commentService;

    /**
     * 获取后台评论分页列表。
     * @param page 当前页码，从 1 开始。
     * @param size 每页条数，必须大于 0。
     * @param status 评论状态，可为空。
     * @return 返回评论分页结果。
     */
    @GetMapping
    public Result<Page<Comment>> list(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(required = false) Integer status) {
        Page<Comment> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<Comment> queryWrapper = buildCommentQuery(status);
        return Result.success(commentService.page(pageParam, queryWrapper));
    }

    /**
     * 更新评论审核状态。
     * @param id 评论主键 ID，不能为空。
     * @param status 审核状态，约束为 `0/1/2`。
     * @return 返回标准成功响应。
     */
    @PutMapping("/{id}/status")
    public Result<Void> updateStatus(@PathVariable Long id, @RequestParam Integer status) {
        Comment comment = new Comment();
        comment.setId(id);
        comment.setStatus(status); // 0-pending, 1-approved, 2-rejected
        commentService.updateById(comment);
        return Result.success();
    }

    /**
     * 删除评论。
     * @param id 评论主键 ID，不能为空。
     * @return 返回标准成功响应。
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        commentService.removeById(id);
        return Result.success();
    }

    /**
     * 构建评论查询条件。
     * @param status 评论状态，可为空。
     * @return 返回封装完成的查询条件对象。
     */
    private LambdaQueryWrapper<Comment> buildCommentQuery(Integer status) {
        LambdaQueryWrapper<Comment> queryWrapper = new LambdaQueryWrapper<>();

        if (status != null) {
            queryWrapper.eq(Comment::getStatus, status);
        }

        queryWrapper.orderByDesc(Comment::getCreatedAt);
        return queryWrapper;
    }
}
