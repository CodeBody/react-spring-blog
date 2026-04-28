package com.blog.server.common;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * 通用接口响应包装对象。
 * 设计意图：统一约束前后端之间的响应码、消息和业务数据结构。
 * @param <T> 业务数据类型。
 */
@Data
@Accessors(chain = true)
public class Result<T> implements Serializable {

    /**
     * 业务响应码。
     * 业务含义：`200` 表示成功，其余值表示失败。
     */
    private Integer code;
    /**
     * 业务响应消息。
     * 业务含义：向前端描述当前操作结果。
     */
    private String message;
    /**
     * 业务响应载荷。
     * 业务含义：成功时承载真实数据，失败时通常为空。
     */
    private T data;

    /**
     * 构建带数据的成功响应。
     * @param data 业务数据，类型为泛型 `T`，允许为空。
     * @return 返回标准成功响应对象。
     */
    public static <T> Result<T> success(T data) {
        return new Result<T>().setCode(200).setMessage("Success").setData(data);
    }

    /**
     * 构建不带数据的成功响应。
     * @return 返回标准成功响应对象。
     */
    public static <T> Result<T> success() {
        return success(null);
    }

    /**
     * 构建自定义失败响应。
     * @param code 失败响应码，通常为业务错误码或 HTTP 对应语义码。
     * @param message 失败提示消息，不应为空字符串。
     * @return 返回标准失败响应对象。
     */
    public static <T> Result<T> fail(Integer code, String message) {
        return new Result<T>().setCode(code).setMessage(message);
    }

    /**
     * 构建默认失败响应。
     * @param message 失败提示消息，不应为空字符串。
     * @return 返回默认 500 失败响应对象。
     */
    public static <T> Result<T> fail(String message) {
        return fail(500, message);
    }
}
