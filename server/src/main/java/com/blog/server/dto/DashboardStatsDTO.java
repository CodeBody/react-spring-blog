package com.blog.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 仪表盘统计传输对象。
 * 设计意图：统一承载后台首页需要的总览、分类分布和趋势数据。
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    /**
     * 文章总数。
     * 业务含义：后台系统内全部文章数量。
     */
    private Long totalArticles;
    /**
     * 已发布文章数。
     * 业务含义：状态为发布的文章数量。
     */
    private Long publishedArticles;
    /**
     * 草稿文章数。
     * 业务含义：尚未发布的文章数量。
     */
    private Long draftArticles;
    /**
     * 总浏览量。
     * 业务含义：全站文章累计浏览次数，单位为次。
     */
    private Long totalViews;
    /**
     * 分类分布数据。
     * 业务含义：用于仪表盘分类占比图表。
     */
    private List<CategoryCount> categoryDistribution;
    /**
     * 趋势数据。
     * 业务含义：用于仪表盘趋势图表。
     */
    private List<TrendItem> trendData;

    /**
     * 分类统计项。
     * 设计意图：承载单个分类在图表中的名称和值。
     */
    @Data
    @AllArgsConstructor
    public static class CategoryCount {
        /**
         * 分类名称。
         * 业务含义：图表标签显示文本。
         */
        private String name;
        /**
         * 分类计数值。
         * 业务含义：图表中对应分类的文章数量。
         */
        private Integer value;
    }

    /**
     * 趋势统计项。
     * 设计意图：承载单个时间点的浏览量和文章量。
     */
    @Data
    @AllArgsConstructor
    public static class TrendItem {
        /**
         * 日期标签。
         * 业务含义：图表横轴展示值，通常为 `MM/dd`。
         */
        private String date;
        /**
         * 浏览量。
         * 业务含义：该时间点的浏览次数，单位为次。
         */
        private Integer views;
        /**
         * 文章数。
         * 业务含义：该时间点的文章统计数量。
         */
        private Integer count;
    }
}
