import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight, Calendar, Eye, Heart, Bookmark, Clock3, Copy, Check } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';
import { formatDate } from '../../utils';
import { Button } from '../../components/common/Button';
import { fetchArticles as fetchPublicArticles } from '../../utils/api';

/**
 * 阅读时长估算基准。
 * 业务含义：按每分钟 900 个可读字符估算阅读分钟数。
 */
const READING_CHARACTERS_PER_MINUTE = 900;
/**
 * 文章全局索引分页大小。
 * 业务含义：详情页用于一次性拉取足够多的文章索引数据。
 */
const ARTICLE_INDEX_PAGE_SIZE = 200;
/**
 * 相关文章默认展示数量。
 * 业务含义：限制详情页推荐区的信息密度。
 */
const RELATED_ARTICLE_LIMIT = 3;

/**
 * 查询文章所属分类名称。
 * @param {any[]} categories 分类对象数组。
 * @param {string | number} categoryId 文章分类 ID。
 * @returns {Record<string, any> | null} 返回命中的分类对象；未命中时返回 `null`。
 */
const findCategory = (categories, categoryId) => categories.find((category) => String(category.id) === String(categoryId)) || null;

/**
 * 计算文章详情页的返回目标路径。
 * @param {string | undefined} sourcePath 进入详情页前的来源路径。
 * @returns {string} 返回按钮点击后的目标路径。
 */
const getBackPath = (sourcePath) => sourcePath || '/articles';

/**
 * 计算文章详情页返回按钮文案。
 * @param {string | undefined} sourcePath 进入详情页前的来源路径。
 * @returns {string} 返回对应来源场景的中文文案。
 */
const getBackLabel = (sourcePath) => {
  if (sourcePath === '/') {
    return '返回首页';
  }

  if (sourcePath?.startsWith('/category/')) {
    return '返回分类文章';
  }

  return '返回文章列表';
};

/**
 * 计算文章详情页作者展示名称。
 * @param {Record<string, any> | null} article 当前文章对象。
 * @param {Record<string, any>} profile 站点资料对象。
 * @returns {string} 返回详情页展示的作者名称。
 */
const getArticleAuthorName = (article, profile) => {
  if (article?.author && article.author !== 'Admin') {
    return article.author;
  }

  return profile?.name || '站长';
};

/**
 * 获取公开文章全局索引列表。
 * @returns {Promise<any[]>} 返回按列表顺序拼接完成的文章数组。
 */
const fetchArticleIndexList = async () => {
  const firstPage = await fetchPublicArticles(1, ARTICLE_INDEX_PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil((firstPage.total || 0) / ARTICLE_INDEX_PAGE_SIZE));
  if (totalPages === 1) return firstPage.records || [];
  const extraPages = await Promise.all(Array.from({ length: totalPages - 1 }, (_, index) => fetchPublicArticles(index + 2, ARTICLE_INDEX_PAGE_SIZE)));
  return [...(firstPage.records || []), ...extraPages.flatMap((page) => page.records || [])];
};

/**
 * 计算文章邻接导航数据。
 * @param {any[]} articles 全局文章索引数组。
 * @param {string | undefined} currentArticleId 当前文章 ID。
 * @returns {{previousArticle: any | null, nextArticle: any | null}} 返回上一篇与下一篇对象。
 */
const findAdjacentArticles = (articles, currentArticleId) => {
  const currentIndex = articles.findIndex((item) => String(item.id) === String(currentArticleId));
  if (currentIndex < 0) return { previousArticle: null, nextArticle: null };
  return {
    previousArticle: articles[currentIndex - 1] || null,
    nextArticle: articles[currentIndex + 1] || null,
  };
};

/**
 * 标准化文章标签数组。
 * @param {string[] | undefined} tags 原始标签数组。
 * @returns {string[]} 返回统一小写后的标签集合。
 */
const normalizeArticleTags = (tags) => (tags || []).map((tag) => String(tag).toLowerCase());

/**
 * 统计两篇文章的标签重合数量。
 * @param {string[]} baseTags 当前文章标签数组。
 * @param {string[]} candidateTags 候选文章标签数组。
 * @returns {number} 返回重合标签数量。
 */
const countSharedTags = (baseTags, candidateTags) => candidateTags.filter((tag) => baseTags.includes(tag)).length;

/**
 * 比较相关文章排序优先级。
 * @param {Record<string, any>} left 左侧候选文章。
 * @param {Record<string, any>} right 右侧候选文章。
 * @returns {number} 返回排序结果。
 */
const compareRelatedArticles = (left, right) => {
  if (right.sameCategoryScore !== left.sameCategoryScore) return right.sameCategoryScore - left.sameCategoryScore;
  if (right.sharedTagScore !== left.sharedTagScore) return right.sharedTagScore - left.sharedTagScore;
  return new Date(right.date).getTime() - new Date(left.date).getTime();
};

/**
 * 生成相关文章推荐列表。
 * @param {Record<string, any> | null} currentArticle 当前文章对象。
 * @param {any[]} articleIndexList 全局文章索引数组。
 * @returns {any[]} 返回详情页相关文章数组。
 */
const buildRelatedArticles = (currentArticle, articleIndexList) => {
  if (!currentArticle) return [];
  const currentTags = normalizeArticleTags(currentArticle.tags);
  return articleIndexList
    .filter((item) => String(item.id) !== String(currentArticle.id))
    .map((item) => ({ ...item, sameCategoryScore: String(item.categoryId) === String(currentArticle.categoryId) ? 1 : 0, sharedTagScore: countSharedTags(currentTags, normalizeArticleTags(item.tags)) }))
    .filter((item) => item.sameCategoryScore > 0 || item.sharedTagScore > 0)
    .sort(compareRelatedArticles)
    .slice(0, RELATED_ARTICLE_LIMIT);
};

/**
 * 构建需要从相关文章中排除的文章 ID 集合。
 * @param {Record<string, any> | null} previousArticle 上一篇文章对象。
 * @param {Record<string, any> | null} nextArticle 下一篇文章对象。
 * @returns {string[]} 返回需要排除的文章 ID 数组。
 */
const buildExcludedRelatedArticleIds = (previousArticle, nextArticle) => [
  previousArticle?.id,
  nextArticle?.id,
].filter(Boolean).map((articleId) => String(articleId));

/**
 * 过滤掉与上一篇/下一篇重复的相关文章。
 * @param {any[]} relatedArticles 原始相关文章数组。
 * @param {string[]} excludedArticleIds 需要排除的文章 ID 数组。
 * @returns {any[]} 返回去重后的相关文章数组。
 */
const filterRelatedArticles = (relatedArticles, excludedArticleIds) => relatedArticles
  .filter((article) => !excludedArticleIds.includes(String(article.id)))
  .slice(0, RELATED_ARTICLE_LIMIT);

/**
 * 文章邻接导航卡片组件。
 * @param {{label: string, article: any, direction: 'previous' | 'next'}} props 组件入参。
 * @returns {JSX.Element} 返回上一篇或下一篇卡片。
 */
const ArticleNavigationCard = ({ label, article, direction }) => (
  <Link to={`/article/${article.id}`} className="group flex-1 rounded-[1.75rem] border border-border bg-card/70 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg">
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="mb-3 text-lg font-bold leading-8 text-foreground transition-colors group-hover:text-brand-primary">{article.title}</h3>
        <p className="text-sm text-muted-foreground">{formatDate(article.date)}</p>
      </div>
      {direction === 'previous' ? (
        <ChevronLeft className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" size={20} />
      ) : (
        <ChevronRight className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" size={20} />
      )}
    </div>
  </Link>
);

/**
 * 相关文章推荐卡片组件。
 * @param {{article: any}} props 组件入参。
 * @returns {JSX.Element} 返回相关文章卡片。
 */
const RelatedArticleCard = ({ article }) => (
  <Link to={`/article/${article.id}`} className="group rounded-[1.75rem] border border-border bg-card/70 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg">
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">{formatDate(article.date)}</p>
    <h3 className="mb-5 text-lg font-bold leading-8 text-foreground transition-colors group-hover:text-brand-primary">{article.title}</h3>
    <div className="flex flex-wrap gap-2">
      {(article.tags || []).slice(0, 3).map((tag) => (
        <span key={`${article.id}-${tag}`} className="rounded-full border border-border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {tag}
        </span>
      ))}
    </div>
  </Link>
);

/**
 * 提取 Markdown 中用于阅读时长估算的纯文本。
 * @param {string} content Markdown 正文。
 * @returns {string} 返回清理后的纯文本内容。
 */
const extractPlainMarkdownText = (content) => (content || '')
  .replace(/```[\s\S]*?```/g, ' ')
  .replace(/`[^`]*`/g, ' ')
  .replace(/!\[.*?\]\(.*?\)/g, ' ')
  .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
  .replace(/[>#*_~-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

/**
 * 估算文章阅读时长。
 * @param {string} content Markdown 正文。
 * @returns {number} 返回大于等于 1 的阅读分钟数。
 */
const getReadMinutes = (content) => Math.max(1, Math.ceil(extractPlainMarkdownText(content).length / READING_CHARACTERS_PER_MINUTE));

/**
 * 将文章详情页滚动到顶部。
 * @returns {void} 无返回值。
 * @description 用于切换上一篇、下一篇或相关文章后重置阅读起点。
 */
const scrollPageToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};

/**
 * 读取代码块语言标识。
 * @param {string | undefined} className 代码节点类名。
 * @returns {string} 返回代码块语言名称。
 */
const getCodeLanguage = (className) => className?.match(/language-([\w-]+)/)?.[1] || 'text';

/**
 * 标准化代码块文本内容。
 * @param {React.ReactNode} children 代码节点子内容。
 * @returns {string} 返回去除尾部换行后的代码文本。
 */
const normalizeCodeText = (children) => String(children).replace(/\n$/, '');

/**
 * 生成代码块唯一哈希标识。
 * @param {string} text 代码块文本。
 * @returns {string} 返回简单哈希字符串。
 */
const buildTextHash = (text) => Array.from(text).reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 7).toString(16);

/**
 * 代码块工具条组件。
 * @param {{language: string, isCopied: boolean, onCopy: () => void}} props 组件入参。
 * @returns {JSX.Element} 返回代码块顶部工具条。
 */
const CodeBlockToolbar = ({ language, isCopied, onCopy }) => (
  <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
      {language}
    </span>
    <button type="button" onClick={onCopy} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white">
      {isCopied ? <Check size={14} /> : <Copy size={14} />}
      {isCopied ? '已复制' : '复制代码'}
    </button>
  </div>
);

/**
 * Markdown 代码节点组件。
 * @param {{inline?: boolean, className?: string, children: React.ReactNode, copiedCodeId: string, onCopyCode: (codeId: string, codeText: string) => void}} props 组件入参。
 * @returns {JSX.Element} 返回行内代码或块级代码节点。
 */
const MarkdownCode = ({ inline, className, children, copiedCodeId, onCopyCode }) => {
  /**
   * 当前代码节点是否应按行内代码渲染。
   * 业务含义：兼容部分 Markdown 节点未透传 `inline` 标记的情况。
   */
  const shouldRenderInline = inline || (!className && !String(children).includes('\n'));

  if (shouldRenderInline) {
    return <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.92em]">{children}</code>;
  }

  /**
   * 当前代码块原始文本。
   * 业务含义：用于复制按钮和哈希标识生成。
   */
  const codeText = normalizeCodeText(children);
  /**
   * 当前代码块语言名称。
   * 业务含义：用于工具条展示。
   */
  const codeLanguage = getCodeLanguage(className);
  /**
   * 当前代码块唯一标识。
   * 业务含义：用于标记复制成功态。
   */
  const codeId = buildTextHash(codeText);
  /**
   * 当前代码块是否处于已复制状态。
   * 取值范围：`true` / `false`。
   */
  const isCopied = copiedCodeId === codeId;

  return (
    <div className="article-code-block not-prose my-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950 shadow-2xl">
      <CodeBlockToolbar language={codeLanguage} isCopied={isCopied} onCopy={() => onCopyCode(codeId, codeText)} />
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-zinc-100">
        <code className={className}>{codeText}</code>
      </pre>
    </div>
  );
};

/**
 * Markdown 预格式化容器组件。
 * @param {{children: React.ReactNode}} props 组件入参。
 * @returns {JSX.Element} 返回代码块内部节点本身。
 * @description 用于移除 ReactMarkdown 默认包裹的外层 `pre`，避免出现双层代码块外壳。
 */
const MarkdownPre = ({ children }) => <>{children}</>;

/**
 * 文章详情骨架屏组件。
 * @returns {JSX.Element} 返回加载占位视图。
 */
const ArticleSkeleton = () => (
  <div className="animate-pulse space-y-4 max-w-3xl mx-auto mt-12">
    <div className="h-4 bg-muted w-1/4 rounded" />
    <div className="h-10 bg-muted w-3/4 rounded" />
    <div className="h-64 bg-muted w-full rounded" />
  </div>
);

/**
 * 文章详情页面。
 * @returns {JSX.Element} 返回文章详情视图。
 * @description 负责拉取文章详情、分类列表和交互态按钮展示。
 */
export default function ArticleDetail() {
  /**
   * 当前路由中的文章 ID。
   * 取值范围：字符串形式的文章主键。
   */
  const { id } = useParams();
  /**
   * 路由跳转函数。
   * 业务含义：文章未命中时用于跳转到 404 页面。
   */
  const navigate = useNavigate();
  /**
   * 当前路由位置对象。
   * 业务含义：读取文章详情页的来源路径状态。
   */
  const location = useLocation();
  /**
   * 当前分类列表与文章查询动作。
   * 业务含义：由博客上下文统一提供。
   */
  const { categories, fetchCategories, fetchSingleArticle, profile } = useBlog();
  /**
   * 当前文章详情对象。
   * 取值范围：文章对象或 `null`。
   */
  const [article, setArticle] = useState(null);
  /**
   * 当前点赞状态。
   * 取值范围：`true` / `false`。
   */
  const [liked, setLiked] = useState(false);
  /**
   * 当前收藏状态。
   * 取值范围：`true` / `false`。
   */
  const [saved, setSaved] = useState(false);
  /**
   * 当前复制成功的代码块 ID。
   * 取值范围：代码块哈希字符串；空字符串表示无高亮状态。
   */
  const [copiedCodeId, setCopiedCodeId] = useState('');
  /**
   * 全局文章索引缓存。
   * 业务含义：为上一篇/下一篇和相关文章提供统一数据源。
   */
  const [articleIndexList, setArticleIndexList] = useState([]);
  /**
   * 当前文章的上一篇与下一篇导航数据。
   * 取值范围：包含 `previousArticle/nextArticle` 的对象。
   */
  const [articlePaginationLinks, setArticlePaginationLinks] = useState({ previousArticle: null, nextArticle: null });
  /**
   * 文章详情页记录的来源路径。
   * 业务含义：用于返回按钮恢复用户入口上下文。
   */
  const sourcePath = location.state?.sourcePath;

  useEffect(() => {
    scrollPageToTop();
  }, [id]);

  useEffect(() => {
    /**
     * 拉取文章详情所需的数据。
     * 业务含义：先加载分类，再加载文章详情，保持原有时序。
     */
    const loadData = async () => {
      const [articleData, articleIndexList] = await Promise.all([
        fetchSingleArticle(id),
        fetchArticleIndexList(),
        fetchCategories(),
      ]);

      if (articleData) {
        setArticle(articleData);
        setArticleIndexList(articleIndexList);
        setArticlePaginationLinks(findAdjacentArticles(articleIndexList, articleData.id));
        return;
      }

      navigate('/404');
    };

    loadData();
    // 这里保持原有加载时机，避免上下文函数引用变化导致重复请求。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  /**
   * 切换点赞状态。
   * @returns {void} 无返回值。
   */
  const toggleLiked = () => {
    setLiked((previousLiked) => !previousLiked);
  };

  /**
   * 切换收藏状态。
   * @returns {void} 无返回值。
   */
  const toggleSaved = () => {
    setSaved((previousSaved) => !previousSaved);
  };

  /**
   * 当前文章所属分类对象。
   * 业务含义：用于底部标签区域展示分类名称。
   */
  const category = article ? findCategory(categories, article.categoryId) : null;
  /**
   * 当前文章作者展示名称。
   * 业务含义：优先展示文章作者，其次展示站点资料名称。
   */
  const articleAuthorName = getArticleAuthorName(article, profile);
  /**
   * 当前文章阅读时长。
   * 业务含义：用于详情页信息区展示。
   */
  const articleReadMinutes = getReadMinutes(article?.content);
  /**
   * 当前详情页上一篇文章对象。
   * 业务含义：用于底部邻接导航左侧卡片。
   */
  const previousArticle = articlePaginationLinks.previousArticle;
  /**
   * 当前详情页下一篇文章对象。
   * 业务含义：用于底部邻接导航右侧卡片。
   */
  const nextArticle = articlePaginationLinks.nextArticle;
  /**
   * 需要从相关文章中排除的文章 ID 数组。
   * 业务含义：避免与上一篇/下一篇重复展示。
   */
  const excludedRelatedArticleIds = buildExcludedRelatedArticleIds(previousArticle, nextArticle);
  /**
   * 当前详情页相关文章数组。
   * 业务含义：按分类和标签重合度推荐延伸阅读内容。
   */
  const relatedArticles = filterRelatedArticles(buildRelatedArticles(article, articleIndexList), excludedRelatedArticleIds);
  /**
   * 详情页 Markdown 组件映射。
   * 业务含义：扩展代码块复制能力。
   */
  const markdownComponents = {
    pre: MarkdownPre,
    code: (props) => <MarkdownCode {...props} copiedCodeId={copiedCodeId} onCopyCode={handleCopyCode} />,
  };

  if (!article) {
    return <ArticleSkeleton />;
  }

  /**
   * 复制指定代码块内容。
   * @param {string} codeId 代码块唯一标识。
   * @param {string} codeText 代码块原始文本。
   * @returns {Promise<void>} 无显式返回值。
   */
  async function handleCopyCode(codeId, codeText) {
    if (!navigator?.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(codeText);
    setCopiedCodeId(codeId);
    setTimeout(() => setCopiedCodeId(''), 1800);
  }

  return (
    <article className="max-w-5xl mx-auto px-6 lg:px-8 w-full pt-32 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="mb-12">
        <Link to={getBackPath(sourcePath)} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> {getBackLabel(sourcePath)}
        </Link>

        {article.coverImage && (
          <div className="w-full aspect-video sm:aspect-[2/1] rounded-2xl overflow-hidden mb-10 border border-border shadow-md bg-muted relative group">
            <img src={article.coverImage} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
        )}

        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-[800] tracking-[-0.02em] leading-tight mb-8">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{articleAuthorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>{article.views.toLocaleString()} 次阅读</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <span>{articleReadMinutes} 分钟阅读</span>
          </div>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {article.content}
        </ReactMarkdown>
      </div>

      <div className="mt-12 flex flex-wrap gap-3 items-center border-t border-border/30 pt-10">
        <span className="text-[0.75rem] font-bold text-muted-foreground mr-1 font-sans tracking-[0.2em] uppercase">所属主题:</span>
        {category && (
          <span key={category.id} className="inline-flex items-center rounded-full border border-brand-primary/20 px-3 py-1 text-[0.7rem] font-bold bg-brand-primary/10 text-brand-primary uppercase tracking-widest transition-colors hover:bg-brand-primary/20">
            {category.name}
          </span>
        )}
        {article.tags && article.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-full border border-border px-3 py-1 text-[0.7rem] font-bold bg-muted/50 text-muted-foreground uppercase tracking-widest transition-colors hover:bg-border">
            {tag}
          </span>
        ))}
      </div>

      {(previousArticle || nextArticle) && (
        <div className="mt-14 border-t border-border/30 pt-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">继续阅读</p>
          <div className="flex flex-col gap-5 md:flex-row">
            {previousArticle && <ArticleNavigationCard label="上一篇" article={previousArticle} direction="previous" />}
            {nextArticle && <ArticleNavigationCard label="下一篇" article={nextArticle} direction="next" />}
          </div>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="mt-16 border-t border-border/30 pt-12">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">相关文章</p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <RelatedArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 pt-8 border-t border-border flex justify-between items-center sm:flex-row flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          这篇内容对你有帮助的话，可以点赞或先收藏起来。
        </p>
        <div className="flex gap-4">
          <Button variant="outline" size="lg" onClick={toggleLiked} className={`rounded-full transition-all ${liked ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700' : 'hover:text-red-600'}`}>
            <Heart size={20} className={`mr-2 ${liked ? 'fill-current' : ''}`} />
            {liked ? '已点赞' : '点赞'}
          </Button>
          <Button variant="outline" size="lg" onClick={toggleSaved} className={`rounded-full transition-all ${saved ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' : ''}`}>
            <Bookmark size={20} className={`mr-2 ${saved ? 'fill-current' : ''}`} />
            {saved ? '已收藏' : '收藏'}
          </Button>
        </div>
      </div>
    </article>
  );
}
