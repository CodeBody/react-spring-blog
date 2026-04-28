package com.blog.server.controller.admin;

import com.blog.server.common.Result;
import com.blog.server.entity.User;
import com.blog.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * 后台用户管理接口。
 * 设计意图：提供用户列表、创建、更新和删除能力。
 */
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    /**
     * 用户领域服务。
     * 业务含义：处理后台用户 CRUD 逻辑。
     */
    private final UserService userService;

    /**
     * 获取后台用户列表。
     * @return 返回用户集合。
     */
    @GetMapping
    public Result<List<User>> list() {
        return Result.success(userService.list());
    }

    /**
     * 创建用户。
     * @param user 用户对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PostMapping
    public Result<Void> create(@RequestBody User user) {
        fillUserTimestamps(user, true);
        userService.save(user);
        return Result.success();
    }

    /**
     * 更新用户。
     * @param id 用户主键 ID，不能为空。
     * @param user 用户对象，不能为空。
     * @return 返回标准成功响应。
     */
    @PutMapping("/{id}")
    public Result<Void> update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        fillUserTimestamps(user, false);
        userService.updateById(user);
        return Result.success();
    }

    /**
     * 删除用户。
     * @param id 用户主键 ID，不能为空。
     * @return 返回标准成功响应。
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        userService.removeById(id);
        return Result.success();
    }

    /**
     * 补齐用户时间字段。
     * @param user 用户对象，不能为空。
     * @param isCreate 是否为创建场景。
     * @return 无返回值。
     */
    private void fillUserTimestamps(User user, boolean isCreate) {
        Date now = new Date();
        user.setUpdatedAt(now);

        if (isCreate) {
            user.setCreatedAt(now);
        }
    }
}
