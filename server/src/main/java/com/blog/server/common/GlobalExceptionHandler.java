package com.blog.server.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器。
 * 设计意图：将未捕获异常统一转换为前端可消费的标准响应结构。
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 兜底处理所有未分类异常。
     * @param e 未捕获的异常对象，类型为 `Exception`。
     * @return 返回 500 标准失败响应。
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Result<String> handleException(Exception e) {
        return Result.fail(500, e.getMessage());
    }

    /**
     * 处理参数校验或业务参数非法异常。
     * @param e 非法参数异常对象，类型为 `IllegalArgumentException`。
     * @return 返回 400 标准失败响应。
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public Result<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return Result.fail(400, e.getMessage());
    }
}
