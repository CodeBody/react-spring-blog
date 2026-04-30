import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { useBlog } from '../../context/BlogContext';
import { formatDate } from '../../utils';
import { Pagination } from '../../components/common/Pagination';
import { Search, FileText } from 'lucide-react';

/**
 * 动效版块容器组件。
 * 取值范围：`framer-motion` 提供的 div 动效组件。
 */
const MotionDiv = m.div;

/**
 * 动效标题组件。
 * 取值范围：`framer-motion` 提供的 h1 动效组件。
 */
const MotionH1 = m.h1;

/**
 * 动效图片区块组件。
 * 取值范围：`framer-motion` 提供的 img 动效组件。
 */
const MotionImg = m.img;

/**
 * 动效文章卡片组件。
 * 取值范围：`framer-motion` 提供的 article 动效组件。
 */
const MotionArticle = m.article;

/**
 * 动效区块组件。
 * 取值范围：`framer-motion` 提供的 section 动效组件。
 */
const MotionSection = m.section;

/**
 * 文章列表页每页展示数量。
 * 业务含义：用于文章分页请求和分页器计算。
 */
const ITEMS_PER_PAGE = 9;

/**
 * 首页标题容器的子元素交错动效。
 * 业务含义：控制标题逐行进入时的延迟顺序。
 */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

/**
 * 首页标题文本揭示动效。
 * 业务含义：控制主标题的位移、旋转和透明度变化。
 */
const textReveal = {
  hidden: { y: '120%', rotateZ: 2, opacity: 0 },
  show: {
    y: '0%',
    rotateZ: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20, mass: 1 },
  },
};

/**
 * 通用上移动效。
 * 业务含义：用于文案块和区块标题的渐入展示。
 */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * 计算文章阅读时长。
 * @param {string} content 文章正文内容。
 * @returns {number} 返回估算分钟数，最小值为 1。
 */
const getReadMinutes = (content) => Math.max(1, Math.ceil((content?.length || 0) / 1000));

/**
 * 构建文章展示数据。
 * @param {any[]} articles 原始文章数组。
 * @param {any[]} categories 分类数组。
 * @returns {any[]} 返回带分类名称的文章数组。
 */
const buildDisplayedArticles = (articles, categories) => articles.map((article) => ({
  ...article,
  categoryName: categories.find((category) => String(category.id) === String(article.categoryId))?.name || 'Uncategorized',
}));

/**
 * 计算当前路由对应的分页状态键。
 * @param {string} pathname 当前路径。
 * @param {string | undefined} categoryId 当前分类 ID。
 * @returns {string} 返回分页状态键。
 */
const buildRouteKey = (pathname, categoryId) => `${pathname}:${categoryId || ''}`;

/**
 * 构建文章列表页重置后的分页状态。
 * @param {Record<string, number>} previousPageState 旧分页状态对象。
 * @returns {Record<string, number>} 返回重置后的分页状态对象。
 */
const buildResetArticlesPageState = (previousPageState) => ({ ...previousPageState, '/articles:': 1 });

/**
 * 查询当前分类名称。
 * @param {any[]} categories 分类数组。
 * @param {string | undefined} categoryId 当前分类 ID。
 * @returns {string} 返回分类名称；未命中时返回空字符串。
 */
const getCategoryTitle = (categories, categoryId) => categories.find((category) => String(category.id) === String(categoryId))?.name || '';

/**
 * 根据路径类型生成文章区块标题。
 * @param {boolean} isCategoryFilter 是否处于分类页。
 * @param {boolean} isAllArticles 是否处于文章列表页。
 * @param {any[]} categories 分类数组。
 * @param {string | undefined} categoryId 当前分类 ID。
 * @returns {string} 返回区块标题文案。
 */
const getArticlesTitle = (isCategoryFilter, isAllArticles, categories, categoryId) => {
  if (isCategoryFilter) {
    return `分类群像: ${getCategoryTitle(categories, categoryId)}`;
  }

  return isAllArticles ? '全部文章' : '近期更新';
};

/**
 * 构建文章详情页返回来源路径。
 * @param {string} pathname 当前路由路径。
 * @returns {string} 返回文章详情页使用的来源路径。
 */
const buildArticleSourcePath = (pathname) => pathname;

/**
 * 首页文章卡片组件。
 * @param {{article: Record<string, any>, index: number, sourcePath: string}} props 组件入参。
 * @param {Record<string, any>} props.article 单篇文章对象。
 * @param {number} props.index 当前卡片序号。
 * @param {string} props.sourcePath 当前文章卡片所在的来源路径。
 * @returns {JSX.Element} 返回文章卡片。
 */
const ArticleCard = ({ article, index, sourcePath }) => (
  <MotionArticle
    key={article.id}
    initial={{ opacity: 0, y: 50, rotateX: 5 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="group flex flex-col bg-background-secondary border border-border rounded-xl flex-hidden overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
  >
    <div className="flex-1 flex flex-col p-7">
      <div className="flex justify-between items-center text-[0.8rem] text-muted-foreground tracking-widest font-sans mb-4 border-b border-border pb-3">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span>{getReadMinutes(article.content)} 分钟阅读</span>
      </div>

      <h3 className="font-display text-[1.3rem] font-bold mb-3 leading-[1.4] tracking-wider relative">
        <Link to={`/article/${article.id}`} state={{ sourcePath }} className="hover:text-brand-primary transition-colors">
          {article.title}
        </Link>
      </h3>

      <p className="text-[0.95rem] text-muted-foreground line-clamp-3 leading-loose font-sans font-normal">
        {article.content.replace(/[#*`]/g, '').substring(0, 150)}...
      </p>
    </div>
  </MotionArticle>
);

/**
 * 前台首页与文章列表页。
 * @returns {JSX.Element} 返回首页或文章列表内容。
 * @description 同一组件根据路由状态复用首页、全部文章页和分类页逻辑。
 */
export default function Home() {
  /**
   * 当前路由位置信息。
   * 业务含义：用于判断当前是首页、文章列表还是分类页。
   */
  const location = useLocation();
  /**
   * 路由跳转函数。
   * 业务含义：用于切换文章列表与分类页面。
   */
  const navigate = useNavigate();
  /**
   * 当前路由中的分类 ID。
   * 取值范围：字符串形式的分类主键或 `undefined`。
   */
  const { categoryId } = useParams();
  /**
   * 博客上下文提供的文章、分类和请求动作。
   * 业务含义：统一驱动首页数据展示。
   */
  const { articles, totalArticles, categories, fetchArticles, fetchCategories, showToast } = useBlog();
  /**
   * 当前是否处于全部文章页。
   * 取值范围：`true` / `false`。
   */
  const isAllArticles = location.pathname === '/articles';
  /**
   * 当前是否处于分类筛选页。
   * 取值范围：`true` / `false`。
   */
  const isCategoryFilter = Boolean(categoryId);
  /**
   * 当前邮件订阅输入值。
   * 取值范围：邮箱字符串。
   */
  const [email, setEmail] = useState('');
  /**
   * 当前文章搜索关键词。
   * 取值范围：任意字符串，空字符串表示不过滤。
   */
  const [searchQuery, setSearchQuery] = useState('');
  /**
   * 各路由分页状态缓存。
   * 业务含义：为不同路径保存各自的当前页码。
   */
  const [pageState, setPageState] = useState({});
  /**
   * 当前路由对应的分页状态键。
   * 业务含义：在同一组件复用多种路由场景时区分分页状态。
   */
  const routeKey = buildRouteKey(location.pathname, categoryId);
  /**
   * 当前文章详情页应记录的来源路径。
   * 业务含义：用于详情页返回时恢复到对应内容入口。
   */
  const articleSourcePath = buildArticleSourcePath(location.pathname);
  /**
   * 当前有效页码。
   * 取值范围：从 1 开始的正整数。
   */
  const currentPage = pageState[routeKey] || 1;
  /**
   * 当前文章总页数。
   * 业务含义：首页固定为 1 页，其余场景根据后端总数计算。
   */
  const totalPages = isAllArticles || isCategoryFilter ? Math.ceil(totalArticles / ITEMS_PER_PAGE) : 1;
  /**
   * 当前用于渲染的文章数组。
   * 业务含义：在原始文章对象上补充分组名称。
   */
  const displayedArticles = buildDisplayedArticles(articles, categories);

  useEffect(() => {
    /**
     * 搜索与分页请求的防抖定时器。
     * 业务含义：避免输入期间频繁触发列表请求。
     */
    const timer = setTimeout(() => {
      if (!isAllArticles && !isCategoryFilter) {
        fetchArticles(1, 6);
        return;
      }

      fetchArticles(currentPage, ITEMS_PER_PAGE, categoryId, searchQuery);
    }, 300);

    fetchCategories();
    return () => clearTimeout(timer);
    // 这里保持原有请求节奏，避免上下文函数引用变化导致重复触发。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, currentPage, isAllArticles, isCategoryFilter, location.pathname, searchQuery]);

  /**
   * 更新当前路由对应的页码。
   * @param {number} page 目标页码。
   * @returns {void} 无返回值。
   */
  const updateCurrentPage = (page) => {
    setPageState((previousPageState) => ({ ...previousPageState, [routeKey]: page }));
  };

  /**
   * 将页面滚动到指定锚点。
   * @param {string} elementId 页面元素 ID。
   * @returns {void} 无返回值。
   */
  const scrollToElement = (elementId) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * 将页面平滑滚动到顶部。
   * @returns {void} 无返回值。
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * 处理首页锚点按钮点击。
   * @param {React.MouseEvent<HTMLAnchorElement>} event 点击事件对象。
   * @param {string} targetId 目标锚点 ID。
   * @returns {void} 无返回值。
   */
  const handleAnchorClick = (event, targetId) => {
    event.preventDefault();
    scrollToElement(targetId);
  };

  /**
   * 处理文章搜索词变更。
   * @param {React.ChangeEvent<HTMLInputElement>} event 输入框变更事件对象。
   * @returns {void} 无返回值。
   */
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    updateCurrentPage(1);

    if (isAllArticles || isCategoryFilter) {
      scrollToTop();
    }
  };

  /**
   * 跳转到全部文章页。
   * @returns {void} 无返回值。
   */
  const navigateToArticles = () => {
    setPageState(buildResetArticlesPageState);
    navigate('/articles');
  };

  /**
   * 重置文章列表页的分页状态。
   * @returns {void} 无返回值。
   */
  const resetArticlesPageState = () => {
    setPageState(buildResetArticlesPageState);
  };

  /**
   * 跳转到指定分类页。
   * @param {string | number} nextCategoryId 目标分类 ID。
   * @returns {void} 无返回值。
   */
  const navigateToCategory = (nextCategoryId) => {
    const nextPath = `/category/${nextCategoryId}`;
    const nextKey = buildRouteKey(nextPath, String(nextCategoryId));
    setPageState((previousPageState) => ({ ...previousPageState, [nextKey]: 1 }));
    navigate(nextPath);
  };

  /**
   * 处理文章分页切换。
   * @param {number} page 目标页码。
   * @returns {void} 无返回值。
   */
  const handlePageChange = (page) => {
    updateCurrentPage(page);
    scrollToTop();
  };

  /**
   * 处理订阅表单提交。
   * @param {React.FormEvent<HTMLFormElement>} event 表单提交事件对象。
   * @returns {void} 无返回值。
   */
  const handleSubscribe = (event) => {
    event.preventDefault();
    showToast(`订阅成功！已将 ${email} 加入列表。`, 'success');
    setEmail('');
  };

  return (
    <div className="w-full">
      {!isAllArticles && !isCategoryFilter && (
        <section className="min-h-screen flex flex-col justify-center relative pt-20 pb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full z-0 select-none pointer-events-none mix-blend-multiply opacity-80 dark:mix-blend-normal dark:opacity-60 overflow-hidden">
            <MotionImg
              initial={{ scale: 1.5, filter: 'blur(10px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              src="/assets/images/hero-mountains.jpg"
              alt="Mountains"
              className="w-full h-full object-cover"
              style={{
                WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
                maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/94 to-background/28 dark:from-background/92 dark:via-background/48 dark:to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col items-start">
            <div className="border-l-[3px] border-foreground pl-8 pr-8 py-8 max-w-4xl relative rounded-r-[2rem] bg-background/62 dark:bg-transparent backdrop-blur-md dark:backdrop-blur-none">
              <MotionDiv
                initial={{ height: 0 }}
                animate={{ height: '3rem' }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-[-3px] w-[3px] bg-brand-primary"
              />

              <MotionH1 variants={staggerContainer} initial="hidden" animate="show" className="font-display text-[clamp(2.8rem,5vw,5rem)] font-bold tracking-[0.05em] leading-[1.3] mb-8 text-foreground">
                <div className="overflow-hidden pb-2">
                  <MotionDiv variants={textReveal} className="origin-bottom-left">构建优雅的</MotionDiv>
                </div>
                <div className="overflow-hidden pb-4">
                  <MotionDiv variants={textReveal} className="origin-bottom-left">数字体验。</MotionDiv>
                </div>
              </MotionH1>

              <MotionDiv variants={fadeUp} initial="hidden" animate="show" className="text-[clamp(1rem,1.5vw,1.15rem)] text-muted-foreground font-sans font-normal max-w-xl mb-12 flex flex-col gap-3 leading-[1.8] tracking-widest transition-colors duration-500">
                <p>你好，我是 夏了个天。</p>
                <p>一名深耕于代码与设计交汇处的独立开发者。在这里记录技术实践、审美反思，以及对于数字世界的种种思考。</p>
              </MotionDiv>

              <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row gap-6">
                <a href="#articles" className="btn-primary" onClick={(event) => handleAnchorClick(event, 'articles')}>
                  阅读笔记
                </a>
                <a href="#newsletter" className="btn-secondary" onClick={(event) => handleAnchorClick(event, 'newsletter')}>
                  建立联系
                </a>
              </MotionDiv>
            </div>
          </div>
        </section>
      )}

      <section id="articles" className={`py-24 relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full ${(isAllArticles || isCategoryFilter) ? 'pt-32' : ''}`}>
        <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap sm:flex-nowrap justify-between items-end border-b-2 border-foreground pb-6 mb-16 gap-6">
          <h2 className="font-display text-[2rem] font-bold tracking-[0.1em]">
            {getArticlesTitle(isCategoryFilter, isAllArticles, categories, categoryId)}
          </h2>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {(isAllArticles || isCategoryFilter) && (
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 bg-transparent border border-border text-sm focus:outline-none focus:border-foreground transition-all rounded-none tracking-wider font-sans"
                />
              </div>
            )}

            {!(isAllArticles || isCategoryFilter) ? (
              <Link to="/articles" onClick={resetArticlesPageState} className="text-muted-foreground font-sans font-medium hover:text-foreground transition-colors whitespace-nowrap mb-1 tracking-widest text-sm relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-foreground hover:after:w-full after:transition-all after:duration-300">
                浏览全部专栏 →
              </Link>
            ) : (
              <Link to="/" className="text-muted-foreground font-sans font-medium hover:text-foreground transition-colors whitespace-nowrap mb-1 tracking-widest text-sm relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-foreground hover:after:w-full after:transition-all after:duration-300">
                ← 返回首页
              </Link>
            )}
          </div>
        </MotionDiv>

        {(isAllArticles || isCategoryFilter) && (
          <div className="mb-12 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-3 min-w-max">
              <button
                onClick={navigateToArticles}
                className={`px-6 py-2 border rounded-none text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${!categoryId ? 'bg-foreground text-background border-foreground shadow-[4px_4px_0_rgba(0,0,0,0.1)]' : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'}`}
              >
                全部 <span className="ml-2 opacity-40 font-mono italic">{categories.reduce((accumulator, category) => accumulator + (category.articleCount || 0), 0)}</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => navigateToCategory(category.id)}
                  className={`px-6 py-2 border rounded-none text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${String(categoryId) === String(category.id) ? 'bg-brand-primary text-white border-brand-primary shadow-[4px_4px_0_rgba(var(--brand-primary-rgb),0.2)]' : 'bg-transparent text-muted-foreground border-border hover:border-brand-primary hover:text-brand-primary'}`}
                >
                  {category.name} <span className="ml-2 opacity-40 font-mono italic">{category.articleCount || 0}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {displayedArticles.length > 0 ? displayedArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} sourcePath={articleSourcePath} />
          )) : (
            <AnimatePresence>
              <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-full py-32 text-center flex flex-col items-center justify-center gap-8 bg-background-secondary/50 backdrop-blur-md border border-border/60 rounded-[3rem] shadow-premium mt-8">
                <div className="w-24 h-24 rounded-[2.5rem] bg-foreground/5 flex items-center justify-center relative shadow-inner group transition-all duration-500 hover:scale-110 hover:-rotate-6">
                  <FileText size={40} className="relative z-10 text-muted-foreground/30 group-hover:text-foreground transition-colors" />
                  <div className="absolute inset-0 bg-foreground/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-black uppercase tracking-[0.4em] text-foreground/60">虚位以待</h3>
                  <p className="text-sm font-medium text-muted-foreground/40 max-w-sm mx-auto leading-relaxed px-6">
                    {searchQuery ? `未发现与 "${searchQuery}" 相关的思绪火花，请尝试其他关键词。` : '暂无相关博文内容，创作者正在酝酿新的灵感。'}
                  </p>
                </div>
              </MotionDiv>
            </AnimatePresence>
          )}
        </div>

        {(isAllArticles || isCategoryFilter) && totalPages > 1 && searchQuery === '' && (
          <MotionDiv initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 border-t border-border pt-12">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </MotionDiv>
        )}
      </section>

      <MotionSection initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} id="newsletter" className="py-24 max-w-6xl mx-auto px-6 lg:px-8 w-full mt-12 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-display text-[2rem] font-bold tracking-[0.1em] mb-5">订阅更新</h2>
            <p className="text-muted-foreground text-[1.05rem] font-sans leading-loose tracking-wider">
              第一时间获取技术探讨与设计随想。<br />坚守极简主义，绝无冗余邮件。
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex-1 flex w-full max-w-md gap-0 shadow-sm">
            <input
              type="email"
              placeholder="您的邮箱地址"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="Email Address"
              className="flex-1 px-5 py-4 border border-border border-r-0 bg-transparent text-foreground tracking-widest font-sans text-sm placeholder:text-muted focus:outline-none focus:border-foreground transition-colors duration-300 rounded-none uppercase"
            />
            <button type="submit" className="px-8 py-4 bg-foreground text-background font-sans font-medium tracking-[0.2em] text-sm uppercase focus:outline-none hover:bg-brand-primary hover:text-white border border-foreground transition-all duration-300 whitespace-nowrap">
              立即接入
            </button>
          </form>
        </div>
      </MotionSection>
    </div>
  );
}
