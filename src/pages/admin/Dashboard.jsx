import React, { useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import { m } from 'framer-motion';
import {
  BarChart3,
  CheckCircle2,
  Eye,
  FileText,
  Layers,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/**
 * 动效容器组件。
 * 取值范围：`framer-motion` 提供的 div 动效组件。
 */
const MotionDiv = m.div;

/**
 * 仪表盘图表颜色池。
 * 业务含义：为分类分布图提供稳定的轮换颜色。
 */
const CHART_COLORS = ['#6366F1', '#A855F7', '#EC4899', '#3B82F6'];

/**
 * 根据仪表盘数据构建顶部指标卡。
 * @param {Record<string, any>} stats 仪表盘统计对象。
 * @returns {Array<Record<string, any>>} 返回指标卡配置数组。
 */
const buildMetricCards = (stats) => [
  { label: '文章总数', value: stats.totalArticles, icon: <FileText size={20} />, trend: '+12% 从上月' },
  { label: '已发布内容', value: stats.publishedArticles, icon: <CheckCircle2 size={20} />, trend: '稳定运行中' },
  { label: '全站累计访问', value: stats.totalViews.toLocaleString(), icon: <Eye size={20} />, trend: '+8.4% 增长' },
  { label: '草稿箱', value: stats.draftArticles, icon: <BarChart3 size={20} />, trend: '待发布内容' },
];

/**
 * 仪表盘加载中占位。
 * @returns {JSX.Element} 返回加载动画视图。
 */
const LoadingView = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * 后台仪表盘页面。
 * @returns {JSX.Element} 返回后台统计总览界面。
 * @description 负责展示内容统计、流量趋势和分类分布图表。
 */
export default function Dashboard() {
  /**
   * 仪表盘统计数据与拉取动作。
   * 业务含义：驱动控制台所有指标展示。
   */
  const { dashboardStats, fetchDashboardData } = useBlog();

  useEffect(() => {
    fetchDashboardData();
    // 这里维持页面首次进入时请求一次，避免上下文函数引用变化造成重复拉取。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dashboardStats) {
    return <LoadingView />;
  }

  /**
   * 顶部指标卡配置数组。
   * 业务含义：统一驱动总览卡片渲染。
   */
  const metricCards = buildMetricCards(dashboardStats);

  return (
    <div className="space-y-10 pb-12">
      <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">控制台</h1>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] opacity-40">System Overview & Live Insights</p>
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => (
          <MotionDiv
            key={card.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative glass-card rounded-3xl p-6 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <span className="text-[0.6rem] font-black text-emerald-500 uppercase tracking-widest">{card.trend}</span>
            </div>
            <p className="text-[0.6rem] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{card.label}</p>
            <h3 className="text-3xl font-display font-black tracking-tighter">{card.value}</h3>
          </MotionDiv>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="xl:col-span-2 glass-card rounded-[2.5rem] p-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl font-black tracking-tight">流量趋势</h2>
              <p className="text-[0.65rem] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-50">实时系统访问动态数据</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary">
              <TrendingUp size={16} />
              <span className="text-[0.6rem] font-black uppercase tracking-wider">实时更新</span>
            </div>
          </div>

          <div className="h-[320px] w-full pr-4" style={{ minHeight: '320px', minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
              <AreaChart data={dashboardStats.trendData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '1rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }} itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} labelStyle={{ display: 'none' }} />
                <Area type="monotone" dataKey="views" stroke="#6366F1" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" animationDuration={2500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card rounded-[2.5rem] p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-black tracking-tight">分类分布</h2>
              <p className="text-[0.65rem] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-50">内容权重饼图</p>
            </div>
            <Layers size={20} className="text-muted-foreground opacity-30" />
          </div>

          <div className="h-[300px] w-full flex flex-col items-center justify-center" style={{ minHeight: '300px', minWidth: '100%' }}>
            {dashboardStats.categoryDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="80%" minWidth={0} minHeight={0} debounce={1}>
                <PieChart>
                  <Pie
                    data={dashboardStats.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1500}
                    stroke="none"
                  >
                    {dashboardStats.categoryDistribution.map((item, index) => (
                      <Cell key={`${item.name}-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '1rem' }} itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center opacity-20 py-12">
                <p className="text-[0.6rem] font-black uppercase tracking-[0.2em]">无分类动态数据</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full mt-2">
              {dashboardStats.categoryDistribution.slice(0, 4).map((category, index) => (
                <div key={category.name} className="flex items-center gap-2 overflow-hidden">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                  <span className="text-[0.65rem] font-bold text-muted-foreground uppercase tracking-tight truncate">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
}
