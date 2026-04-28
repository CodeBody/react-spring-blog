package com.blog.server.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.blog.server.common.Result;
import com.blog.server.dto.DashboardStatsDTO;
import com.blog.server.entity.Article;
import com.blog.server.entity.Category;
import com.blog.server.mapper.ArticleMapper;
import com.blog.server.service.ArticleService;
import com.blog.server.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 后台仪表盘接口。
 * 设计意图：聚合文章、分类和浏览量统计数据供管理后台展示。
 */
@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    /**
     * 文章领域服务。
     * 业务含义：统计文章总量和发布状态。
     */
    private final ArticleService articleService;
    /**
     * 分类领域服务。
     * 业务含义：读取分类列表用于分布统计。
     */
    private final CategoryService categoryService;
    /**
     * 文章数据访问组件。
     * 业务含义：提供总浏览量查询能力。
     */
    private final ArticleMapper articleMapper;

    /**
     * 获取后台仪表盘统计数据。
     * @return 返回仪表盘统计 DTO。
     */
    @GetMapping("/stats")
    public Result<DashboardStatsDTO> getStats() {
        return Result.success(buildDashboardStats());
    }

    /**
     * 构建仪表盘统计 DTO。
     * @return 返回完整的统计对象。
     */
    private DashboardStatsDTO buildDashboardStats() {
        long totalArticles = articleService.count();
        long publishedArticles = articleService.count(new LambdaQueryWrapper<Article>().eq(Article::getStatus, 1));
        return DashboardStatsDTO.builder()
                .totalArticles(totalArticles)
                .publishedArticles(publishedArticles)
                .draftArticles(totalArticles - publishedArticles)
                .totalViews(articleMapper.getTotalViews().longValue())
                .categoryDistribution(buildCategoryDistribution())
                .trendData(buildTrendData())
                .build();
    }

    /**
     * 构建分类分布数据。
     * @return 返回分类统计集合，仅包含数量大于 0 的分类。
     */
    private List<DashboardStatsDTO.CategoryCount> buildCategoryDistribution() {
        List<Category> categories = categoryService.list();
        return categories.stream()
                .map(this::buildCategoryCount)
                .filter(categoryCount -> categoryCount.getValue() > 0)
                .collect(Collectors.toList());
    }

    /**
     * 构建单个分类统计项。
     * @param category 分类对象，不能为空。
     * @return 返回分类统计对象。
     */
    private DashboardStatsDTO.CategoryCount buildCategoryCount(Category category) {
        long count = articleService.count(new LambdaQueryWrapper<Article>().eq(Article::getCategoryId, category.getId()));
        return new DashboardStatsDTO.CategoryCount(category.getName(), (int) count);
    }

    /**
     * 构建近 7 天趋势数据。
     * @return 返回趋势统计集合。
     * @usage 当前实现保留现有随机占位逻辑，仅补充结构说明。
     */
    private List<DashboardStatsDTO.TrendItem> buildTrendData() {
        List<DashboardStatsDTO.TrendItem> trendData = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd");
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -6);

        for (int i = 0; i < 7; i++) {
            trendData.add(buildTrendItem(sdf.format(cal.getTime())));
            cal.add(Calendar.DATE, 1);
        }

        return trendData;
    }

    /**
     * 构建单日趋势统计项。
     * @param dateLabel 日期标签，格式通常为 `MM/dd`。
     * @return 返回单日趋势对象。
     * @usage 本次不调整现有随机数据策略，保持原行为。
     */
    private DashboardStatsDTO.TrendItem buildTrendItem(String dateLabel) {
        return new DashboardStatsDTO.TrendItem(dateLabel, (int) (Math.random() * 500) + 100, (int) (Math.random() * 5));
    }
}
