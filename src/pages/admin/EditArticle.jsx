import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { ArrowLeft, Command, Eye, Image as ImageIcon, Save, Zap } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

/**
 * 文章表单默认值。
 * 业务含义：用于新建文章和编辑状态初始化。
 */
const DEFAULT_FORM_DATA = {
  title: '',
  categoryId: '',
  tags: [],
  status: 'published',
  content: '',
};

/**
 * 根据文章详情构建表单数据。
 * @param {Record<string, any> | null} article 文章详情对象。
 * @returns {Record<string, any>} 返回文章表单对象。
 */
const buildArticleFormData = (article) => ({
  title: article?.title || '',
  categoryId: article?.categoryId || '',
  tags: article?.tags || [],
  status: article?.status || 'published',
  content: article?.content || '',
});

/**
 * 订阅根节点主题变化。
 * @param {() => void} callback 主题变化回调。
 * @returns {() => void} 返回取消订阅函数。
 */
const subscribeThemeChange = (callback) => {
  /**
   * 根节点主题 class 监听器。
   * 业务含义：同步 Markdown 编辑器的亮暗模式。
   */
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

/**
 * 获取当前编辑器主题模式。
 * @returns {'light'|'dark'} 返回编辑器主题模式。
 */
const getEditorColorMode = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

/**
 * 读取编辑器主题模式。
 * @returns {'light'|'dark'} 返回与页面主题同步的编辑器模式。
 */
const useEditorColorMode = () => useSyncExternalStore(subscribeThemeChange, getEditorColorMode, () => 'light');

/**
 * 将标签名称数组转换为标签 ID 数组。
 * @param {string[]} selectedTagNames 当前选中的标签名称数组。
 * @param {Array<Record<string, any>>} allTags 全部标签数据。
 * @returns {Array<string|number>} 返回标签主键数组。
 */
const buildTagIds = (selectedTagNames, allTags) => selectedTagNames
  .map((tagName) => allTags.find((tag) => tag.name === tagName)?.id)
  .filter(Boolean);

/**
 * 编辑页加载占位视图。
 * @returns {JSX.Element} 返回页面加载动画。
 */
const LoadingView = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

/**
 * 文章编辑表单视图。
 * @param {object} props 组件入参。
 * @param {boolean} props.isNew 当前是否为新建模式。
 * @param {string|undefined} props.id 当前文章主键。
 * @param {Record<string, any> | null} props.article 当前文章详情。
 * @param {Array<Record<string, any>>} props.categories 分类列表。
 * @param {Array<Record<string, any>>} props.allTags 标签列表。
 * @param {(formData: Record<string, any>) => Promise<void>} props.onSubmit 提交回调。
 * @returns {JSX.Element} 返回文章表单界面。
 */
const ArticleEditorForm = ({ isNew, id, article, categories, allTags, onSubmit }) => {
  /**
   * 当前 Markdown 编辑器主题模式。
   * 取值范围：`light` 或 `dark`。
   */
  const editorColorMode = useEditorColorMode();
  /**
   * 当前表单数据。
   * 取值范围：文章表单字段对象。
   */
  const [formData, setFormData] = useState(() => buildArticleFormData(article));

  /**
   * 处理普通输入框变更。
   * @param {React.ChangeEvent<HTMLInputElement>} event 输入事件对象。
   * @returns {void} 无返回值。
   */
  const handleInputChange = (event) => {
    /**
     * 当前被修改的字段名和值。
     * 取值范围：文章表单合法字段。
     */
    const { name, value } = event.target;
    setFormData((previousFormData) => ({ ...previousFormData, [name]: value }));
  };

  /**
   * 处理正文内容变更。
   * @param {string | undefined} value Markdown 编辑器返回值。
   * @returns {void} 无返回值。
   */
  const handleContentChange = (value) => {
    setFormData((previousFormData) => ({ ...previousFormData, content: value || '' }));
  };

  /**
   * 切换当前选中的分类。
   * @param {string|number} categoryId 分类主键。
   * @returns {void} 无返回值。
   */
  const handleCategoryChange = (categoryId) => {
    setFormData((previousFormData) => ({ ...previousFormData, categoryId }));
  };

  /**
   * 切换标签选中状态。
   * @param {string} tagName 标签名称。
   * @returns {void} 无返回值。
   */
  const handleTagToggle = (tagName) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      tags: previousFormData.tags.includes(tagName)
        ? previousFormData.tags.filter((item) => item !== tagName)
        : [...previousFormData.tags, tagName],
    }));
  };

  /**
   * 切换文章发布状态。
   * @param {'published'|'draft'} status 目标状态值。
   * @returns {void} 无返回值。
   */
  const handleStatusChange = (status) => {
    setFormData((previousFormData) => ({ ...previousFormData, status }));
  };

  /**
   * 提交页面表单。
   * @param {React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>} event 表单或按钮事件对象。
   * @returns {Promise<void>} 无显式返回值。
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 pt-2">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">{isNew ? '新建文章' : '编辑文章'}</h1>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {isNew ? '创作并发布您的下一篇精彩博客内容' : `正在编辑文章 · ${formData.title || '标题加载中...'}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/posts" className="px-5 py-2.5 bg-muted text-muted-foreground rounded-xl text-xs font-bold tracking-wide hover:bg-muted/80 transition-all flex items-center gap-2 border border-border/50">
            <ArrowLeft size={16} />
            返回列表
          </Link>
          {!isNew && (
            <button onClick={() => window.open(`/article/${id}`, '_blank')} className="px-5 py-2.5 bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 shadow-sm">
              <Eye size={16} />
              预览内容
            </button>
          )}
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Save size={16} strokeWidth={3} />
            {isNew ? '立即发布' : '同步更新'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl px-10 py-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Command size={20} />
              </div>
              <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">博文标题</label>
            </div>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="请输入极具吸引力的标题..." className="w-full bg-muted/20 border-2 border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-5 text-2xl font-display font-black text-foreground transition-all focus:outline-none placeholder:text-muted-foreground/20" />
          </section>

          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden min-h-[850px] flex flex-col">
            <div className="px-10 py-8 border-b border-border/50 bg-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">正文创作</label>
              </div>
              <div className="flex items-center gap-2 text-[0.6rem] font-bold text-muted-foreground/40 uppercase tracking-widest bg-muted/20 px-3 py-1.5 rounded-lg border border-border/50">Markdown Support</div>
            </div>
            <div className="flex-1 px-4 py-2">
              <MDEditor value={formData.content} onChange={handleContentChange} height={750} preview="edit" data-color-mode={editorColorMode} className="!bg-transparent !border-none !shadow-none h-full" visibleDragbar={false} />
            </div>
            <div className="px-10 py-6 text-center border-t border-border/20 bg-muted/5 text-muted-foreground/20 text-[0.6rem] font-bold tracking-[0.4em] uppercase">Focus Mode · Active</div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Zap size={18} />
              </div>
              <label className="text-xs font-black uppercase tracking-widest text-foreground/60">内容分类</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-3 rounded-xl text-[0.65rem] font-bold tracking-tight transition-all border text-center ${String(formData.categoryId) === String(category.id) ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-card text-muted-foreground border-border/50 hover:text-foreground hover:bg-muted/50'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <ImageIcon size={18} />
              </div>
              <label className="text-xs font-black uppercase tracking-widest text-foreground/60">关联标签</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                /**
                 * 当前标签是否已被选中。
                 * 取值范围：`true` / `false`。
                 */
                const isSelected = formData.tags.includes(tag.name);

                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.name)}
                    className={`px-3.5 py-2 rounded-xl text-[0.6rem] font-bold tracking-tight transition-all border ${isSelected ? 'bg-primary/10 text-primary border-primary/30' : 'bg-card text-muted-foreground border-border/40 hover:text-foreground hover:bg-muted/50'}`}
                  >
                    #{tag.name}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bg-gradient-to-br from-primary/[0.03] to-transparent rounded-[2rem] border border-primary/10 p-8">
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-border/40 backdrop-blur-sm">
                <p className="text-[0.65rem] font-black text-foreground/40 uppercase tracking-[0.2em] mb-2 text-center">发布状态</p>
                <div className="flex gap-2">
                  <button onClick={() => handleStatusChange('published')} type="button" className={`flex-1 h-10 rounded-xl text-[0.6rem] font-bold transition-all ${formData.status === 'published' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-muted/50 text-muted-foreground'}`}>{formData.status === 'published' ? '已排期发布' : '立即发布'}</button>
                  <button onClick={() => handleStatusChange('draft')} type="button" className={`flex-1 h-10 rounded-xl text-[0.6rem] font-bold transition-all ${formData.status === 'draft' ? 'bg-amber-500 text-white shadow-lg' : 'bg-muted/50 text-muted-foreground'}`}>保存为草稿</button>
                </div>
              </div>
              <div className="text-center italic text-[0.6rem] font-medium text-muted-foreground/40 mt-4 leading-relaxed px-2">"Thoughtful content is the foundation of digital excellence."</div>
            </div>
          </section>
        </div>
      </form>

      <footer className="py-2 text-center text-muted-foreground/20 text-[0.6rem] font-bold tracking-[0.5em] uppercase">The Atelier Framework v2.0</footer>
    </div>
  );
};

/**
 * 后台文章编辑页面。
 * @returns {JSX.Element} 返回文章创建或编辑界面。
 * @description 负责拉取文章详情、分类标签并提交后台写操作。
 */
export default function EditArticle() {
  /**
   * 当前路由中的文章主键。
   * 取值范围：字符串 ID 或 `undefined`。
   */
  const { id } = useParams();
  /**
   * 页面跳转函数。
   * 业务含义：用于保存成功后返回文章列表页。
   */
  const navigate = useNavigate();
  /**
   * 文章编辑页依赖的上下文状态和动作。
   * 业务含义：驱动文章拉取、提交和提示流程。
   */
  const {
    articles,
    categories,
    tags: allTags,
    fetchTags,
    fetchCategories,
    fetchAdminSingleArticle,
    addArticle,
    updateArticle,
    profile,
    showToast,
  } = useBlog();
  /**
   * 当前是否为新建文章模式。
   * 取值范围：`true` / `false`。
   */
  const isNew = !id;
  /**
   * 当前是否已完成编辑文章详情拉取尝试。
   * 取值范围：`true` / `false`。
   */
  const [hasRequestedArticle, setHasRequestedArticle] = useState(false);
  /**
   * 当前缓存中的目标文章详情。
   * 取值范围：文章对象或 `null`。
   */
  const existingArticle = isNew ? null : articles.find((item) => String(item.id) === String(id)) || null;

  useEffect(() => {
    /**
     * 拉取文章编辑页基础数据。
     * @returns {Promise<void>} 无显式返回值。
     */
    const loadEditorData = async () => {
      await Promise.all([fetchCategories(), fetchTags()]);

      if (isNew) {
        return;
      }

      await fetchAdminSingleArticle(id);
      setHasRequestedArticle(true);
    };

    loadEditorData();
    // 这里保持页面进入时请求一次，避免上下文函数引用变化导致重复加载。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isNew]);

  useEffect(() => {
    if (!isNew && hasRequestedArticle && !existingArticle) {
      navigate('/admin/posts');
    }
  }, [existingArticle, hasRequestedArticle, isNew, navigate]);

  /**
   * 提交文章写操作。
   * @param {Record<string, any>} formData 当前文章表单数据。
   * @returns {Promise<void>} 无显式返回值。
   */
  const handleSubmit = async (formData) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('文章标题与内容不能为空', 'warning');
      return;
    }

    /**
     * 当前文章对应的标签主键数组。
     * 业务含义：后端接口以 ID 形式接收标签关联关系。
     */
    const tagIds = buildTagIds(formData.tags, allTags);
    /**
     * 当前后端写接口响应。
     * 取值范围：标准响应对象。
     */
    const result = isNew
      ? await addArticle({ ...formData, tagIds, author: profile?.name || 'Admin', date: new Date().toISOString(), views: 0 })
      : await updateArticle({ ...existingArticle, ...formData, tagIds });

    showToast(result.code === 200 ? (isNew ? '新博文已成功发布' : '文章已更新并同步到星系') : result.message, result.code === 200 ? 'success' : 'error');

    if (result.code === 200) {
      navigate('/admin/posts');
    }
  };

  if (!isNew && !existingArticle) {
    return <LoadingView />;
  }

  return (
    <ArticleEditorForm
      key={existingArticle?.id || 'new'}
      isNew={isNew}
      id={id}
      article={existingArticle}
      categories={categories}
      allTags={allTags}
      onSubmit={handleSubmit}
    />
  );
}
