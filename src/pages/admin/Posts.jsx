import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { Plus, Edit3, Trash2, Eye, Search, AlertCircle, Filter } from 'lucide-react';
import { m } from 'framer-motion';
import { formatDate } from '../../utils';
import ConfirmModal from '../../components/common/ConfirmModal';
import { Pagination } from '../../components/common/Pagination';

/**
 * 动效按钮组件。
 * 取值范围：`framer-motion` 提供的 button 动效组件。
 */
const MotionButton = m.button;

/**
 * 动效表格行组件。
 * 取值范围：`framer-motion` 提供的 tr 动效组件。
 */
const MotionTr = m.tr;

/**
 * 文章列表分页大小。
 * 业务含义：驱动后台文章列表单页请求数量。
 */
const PAGE_SIZE = 5;

/**
 * 生成空的确认弹窗状态。
 * @returns {{isOpen: boolean, title: string, message: string, onConfirm: Function}} 返回默认弹窗状态对象。
 */
const createEmptyModal = () => ({ isOpen: false, title: '', message: '', onConfirm: () => {} });

/**
 * 过滤文章列表。
 * @param {any[]} articles 文章数组。
 * @param {string} search 搜索关键词。
 * @returns {any[]} 返回过滤后的文章数组。
 */
const filterArticles = (articles, search) => articles.filter((article) => article.title.toLowerCase().includes(search.toLowerCase()));

/**
 * 切换指定文章的选中状态。
 * @param {any[]} selectedIds 当前选中 ID 数组。
 * @param {string | number} id 目标文章 ID。
 * @returns {any[]} 返回切换后的选中数组。
 */
const toggleSelection = (selectedIds, id) => (selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);

/**
 * 后台文章管理页面。
 * @returns {JSX.Element} 返回文章管理界面。
 * @description 负责文章分页、搜索、单删和批量删除。
 */
export default function Posts() {
  /**
   * 博客上下文中的文章状态与操作函数。
   * 业务含义：驱动后台文章管理流程。
   */
  const { articles, totalArticles, deleteArticle, fetchAdminArticles, showToast } = useBlog();
  /**
   * 路由跳转函数。
   * 业务含义：用于跳转到文章创建和编辑页面。
   */
  const navigate = useNavigate();
  /**
   * 当前搜索关键词。
   * 取值范围：任意字符串。
   */
  const [search, setSearch] = useState('');
  /**
   * 当前页码。
   * 取值范围：从 1 开始的正整数。
   */
  const [currentPage, setCurrentPage] = useState(1);
  /**
   * 当前已勾选的文章 ID 数组。
   * 业务含义：用于批量删除操作。
   */
  const [selectedIds, setSelectedIds] = useState([]);
  /**
   * 当前确认弹窗状态。
   * 取值范围：包含展示文案和确认回调的对象。
   */
  const [modal, setModal] = useState(createEmptyModal);
  /**
   * 当前过滤后的文章数组。
   * 业务含义：驱动表格内容展示和批量选择范围。
   */
  const filteredArticles = filterArticles(articles, search);
  /**
   * 当前总页数。
   * 业务含义：驱动分页器展示。
   */
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE);

  useEffect(() => {
    fetchAdminArticles(currentPage, PAGE_SIZE);
    // 这里保持原有加载时机，避免上下文函数引用变化导致重复请求。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  /**
   * 关闭确认弹窗。
   * @returns {void} 无返回值。
   */
  const closeModal = () => {
    setModal((previousModal) => ({ ...previousModal, isOpen: false }));
  };

  /**
   * 处理单篇文章删除。
   * @param {string | number} id 文章主键 ID。
   * @returns {void} 无返回值。
   */
  const handleDelete = (id) => {
    setModal({
      isOpen: true,
      title: '确定删除此文章吗？',
      message: '该操作将从数据库中永久移除此内容，且无法撤销。',
      onConfirm: async () => {
        const result = await deleteArticle(id);

        if (result.code === 200) {
          showToast('博文已永久移除', 'success');
          setSelectedIds((previousSelectedIds) => previousSelectedIds.filter((selectedId) => selectedId !== id));
          return;
        }

        showToast(result.message, 'error');
      },
    });
  };

  /**
   * 处理批量删除。
   * @returns {void} 无返回值。
   */
  const handleBatchDelete = () => {
    setModal({
      isOpen: true,
      title: `批量移除 ${selectedIds.length} 篇文章？`,
      message: '选中的所有文章将被永久删除，此操作极具破坏性。',
      onConfirm: async () => {
        let successCount = 0;

        for (const id of selectedIds) {
          const result = await deleteArticle(id);
          if (result.code === 200) {
            successCount += 1;
          }
        }

        showToast(`批量操作完成：成功删除 ${successCount} 篇文章`, successCount > 0 ? 'success' : 'error');
        setSelectedIds([]);
      },
    });
  };

  /**
   * 切换单篇文章勾选状态。
   * @param {string | number} id 文章主键 ID。
   * @returns {void} 无返回值。
   */
  const handleToggleSelect = (id) => {
    setSelectedIds((previousSelectedIds) => toggleSelection(previousSelectedIds, id));
  };

  /**
   * 切换当前页全部文章的勾选状态。
   * @returns {void} 无返回值。
   */
  const handleToggleAll = () => {
    if (selectedIds.length === filteredArticles.length && filteredArticles.length > 0) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(filteredArticles.map((article) => article.id));
  };

  /**
   * 跳转到文章创建页。
   * @returns {void} 无返回值。
   */
  const navigateToCreate = () => {
    navigate('/admin/article/new');
  };

  /**
   * 跳转到文章编辑页。
   * @param {string | number} id 文章主键 ID。
   * @returns {void} 无返回值。
   */
  const navigateToEdit = (id) => {
    navigate(`/admin/article/edit/${id}`);
  };

  /**
   * 打开文章预览页。
   * @param {string | number} id 文章主键 ID。
   * @returns {void} 无返回值。
   */
  const previewArticle = (id) => {
    window.open(`/article/${id}`, '_blank');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">文章列表</h1>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            管理、编辑及发布您的所有内容 · 共 {totalArticles} 篇
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <MotionButton initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={handleBatchDelete} className="px-5 py-2.5 bg-destructive/10 text-destructive rounded-xl text-xs font-bold tracking-wide hover:bg-destructive hover:text-destructive-foreground transition-all flex items-center gap-2 border border-destructive/20">
              <Trash2 size={14} />
              删除已选 ({selectedIds.length})
            </MotionButton>
          )}
          <button onClick={navigateToCreate} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Plus size={16} strokeWidth={3} />
            新建文章
          </button>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-sm rounded-[2rem] border border-border/50 overflow-hidden shadow-premium">
        <div className="px-8 py-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-muted/20">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/70">内容库</h2>
            <div className="h-4 w-[1px] bg-border/60" />
            <span className="text-[0.65rem] font-black px-2.5 py-1 bg-primary/10 text-primary rounded-lg uppercase tracking-wider">{filteredArticles.length} 发现项</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto max-w-md">
            <div className="relative group w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4 group-focus-within:text-primary transition-colors" />
              <input placeholder="检索文章标题..." value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-background/50 pl-10 pr-4 h-10 rounded-xl text-xs font-semibold tracking-wide border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30" />
            </div>
            <button className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground transition-all">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[0.6rem] text-muted-foreground uppercase tracking-[0.2em] font-black border-b border-border/30 bg-muted/5">
                <th className="px-8 py-5 w-4">
                  <div className="flex items-center">
                    <input type="checkbox" checked={selectedIds.length === filteredArticles.length && filteredArticles.length > 0} onChange={handleToggleAll} className="w-4 h-4 rounded-md border-border bg-transparent text-primary focus:ring-primary/20 cursor-pointer" />
                  </div>
                </th>
                <th className="px-6 py-5">文章详情</th>
                <th className="px-6 py-5">状态</th>
                <th className="px-6 py-5">发布日期</th>
                <th className="px-8 py-5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredArticles.length > 0 ? filteredArticles.map((article, index) => (
                <MotionTr key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="group hover:bg-primary/[0.02] transition-all duration-300">
                  <td className="px-8 py-6">
                    <input type="checkbox" checked={selectedIds.includes(article.id)} onChange={() => handleToggleSelect(article.id)} className="w-4 h-4 rounded-md border-border bg-transparent text-primary focus:ring-primary/20 cursor-pointer" />
                  </td>
                  <td className="px-6 py-6 max-w-md">
                    <div className="flex flex-col gap-2">
                      <Link to={`/admin/article/edit/${article.id}`} className="font-display text-lg font-bold hover:text-primary transition-all duration-300 block leading-tight">
                        {article.title}
                      </Link>
                      <div className="flex flex-wrap gap-2">
                        {article.tags?.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[0.6rem] font-bold text-muted-foreground/60 uppercase tracking-widest px-2 py-0.5 rounded-md bg-muted/40 border border-border/50">
                            {tag}
                          </span>
                        ))}
                        <span className="text-[0.6rem] font-bold text-muted-foreground/40 flex items-center gap-1.5 ml-1">
                          <Eye size={12} strokeWidth={2.5} /> {article.views || 0}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-wider ${article.status === 'published' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                      <span className={`w-1 h-1 rounded-full ${article.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {article.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-muted-foreground tracking-tight">{formatDate(article.date).split(',')[0]}</span>
                      <span className="text-[0.6rem] text-muted-foreground opacity-40 font-black uppercase tracking-widest mt-0.5">{formatDate(article.date).split(',')[1] || 'Today'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 opacity-100 transition-all duration-300">
                      <button onClick={() => previewArticle(article.id)} className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all" title="预览">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => navigateToEdit(article.id)} className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all" title="编辑">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:shadow-lg transition-all" title="删除">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </MotionTr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                      <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-2">
                        <AlertCircle className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-xs font-black tracking-[0.2em] uppercase">资源库内未发现相关匹配项</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalArticles > PAGE_SIZE && (
          <div className="px-8 py-2 border-t border-border/30 bg-muted/10">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}

        <div className="px-8 py-6 border-t border-border/30 bg-muted/10 text-center">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-muted-foreground/30">End of Content Ledger</p>
        </div>
      </div>

      <ConfirmModal isOpen={modal.isOpen} onClose={closeModal} onConfirm={modal.onConfirm} title={modal.title} message={modal.message} />
    </div>
  );
}
