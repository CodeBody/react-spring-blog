import React, { useEffect, useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { AnimatePresence, m } from 'framer-motion';
import { Plus, Edit3, Trash2, Tag as TagIcon, Check, Search, Hash } from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';

/**
 * 动效容器组件。
 * 取值范围：`framer-motion` 提供的 div 动效组件。
 */
const MotionDiv = m.div;

/**
 * 标签表单默认值。
 * 业务含义：用于新增、编辑取消和提交成功后的表单重置。
 */
const DEFAULT_FORM_DATA = { name: '' };

/**
 * 生成空的确认弹窗状态。
 * @returns {{isOpen: boolean, title: string, message: string, onConfirm: Function}} 返回默认弹窗状态对象。
 */
const createEmptyModal = () => ({ isOpen: false, title: '', message: '', onConfirm: () => {} });

/**
 * 过滤标签列表。
 * @param {any[]} tags 标签数组。
 * @param {string} search 搜索关键词。
 * @returns {any[]} 返回过滤后的标签数组。
 */
const filterTags = (tags, search) => (tags || []).filter((tag) => tag.name?.toLowerCase().includes(search.toLowerCase()));

/**
 * 清洗标签名称输入。
 * @param {string} value 原始输入值。
 * @returns {string} 返回移除开头空白后的标签名称。
 */
const sanitizeTagNameInput = (value) => value.replace(/^\s+/, '');

/**
 * 生成提交到接口的标签载荷。
 * @param {{name: string}} formData 标签表单数据。
 * @returns {{name: string}} 返回清理后的标签对象。
 */
const buildTagPayload = (formData) => ({ name: formData.name.trim() });

/**
 * 后台标签管理页面。
 * @returns {JSX.Element} 返回标签管理界面。
 * @description 负责标签新增、编辑、删除和搜索展示。
 */
export default function Tags() {
  /**
   * 博客上下文中的标签状态与操作函数。
   * 业务含义：驱动后台标签管理流程。
   */
  const { tags, addTag, updateTag, deleteTag, fetchTags, showToast } = useBlog();
  /**
   * 当前是否处于新增状态。
   * 取值范围：`true` / `false`。
   */
  const [isAdding, setIsAdding] = useState(false);
  /**
   * 当前编辑中的标签 ID。
   * 取值范围：标签主键或 `null`。
   */
  const [editingId, setEditingId] = useState(null);
  /**
   * 当前表单数据。
   * 取值范围：包含 `name` 字段的对象。
   */
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  /**
   * 当前搜索关键词。
   * 取值范围：任意字符串。
   */
  const [search, setSearch] = useState('');
  /**
   * 当前确认弹窗状态。
   * 取值范围：包含展示文案和确认回调的对象。
   */
  const [modal, setModal] = useState(createEmptyModal);
  /**
   * 当前过滤后的标签数组。
   * 业务含义：驱动标签卡片区展示。
   */
  const filteredTags = filterTags(tags, search);

  useEffect(() => {
    fetchTags();
    // 这里保持原有加载时机，避免上下文函数引用变化导致重复请求。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 重置编辑状态和表单内容。
   * @returns {void} 无返回值。
   */
  const resetEditor = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData(DEFAULT_FORM_DATA);
  };

  /**
   * 处理标签表单提交。
   * @param {React.FormEvent<HTMLFormElement>} event 表单提交事件对象。
   * @returns {Promise<void>} 无显式返回值。
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    /**
     * 当前提交的标签载荷。
     * 业务含义：统一去除首尾空白后再写入接口。
     */
    const tagPayload = buildTagPayload(formData);

    if (!tagPayload.name) {
      showToast('标签名称不能为空', 'warning');
      return;
    }

    const result = editingId ? await updateTag({ ...tagPayload, id: editingId }) : await addTag(tagPayload);

    if (result.code === 200) {
      showToast(editingId ? '标签已重命名' : '新标签已创建', 'success');
      resetEditor();
      return;
    }

    showToast(result.message, 'error');
  };

  /**
   * 进入标签编辑状态。
   * @param {Record<string, any>} tag 当前标签对象。
   * @returns {void} 无返回值。
   */
  const handleEdit = (tag) => {
    setEditingId(tag.id);
    setFormData({ name: tag.name });
    setIsAdding(false);
  };

  /**
   * 打开删除确认弹窗。
   * @param {string | number} id 标签主键 ID。
   * @returns {void} 无返回值。
   */
  const handleDelete = (id) => {
    setModal({
      isOpen: true,
      title: '确定移除此标签吗？',
      message: '该标签及其在所有相关文章中的绑定记录将一并被清除，且无法撤销。',
      onConfirm: async () => {
        const result = await deleteTag(id);
        showToast(result.code === 200 ? '标签及其关联记录已清除' : result.message, result.code === 200 ? 'success' : 'error');
      },
    });
  };

  /**
   * 关闭确认弹窗。
   * @returns {void} 无返回值。
   */
  const closeModal = () => {
    setModal((previousModal) => ({ ...previousModal, isOpen: false }));
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">标签管理</h1>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] opacity-40">Fine-grained Content Metadata</p>
        </div>
        {!isAdding && !editingId && (
          <button onClick={() => setIsAdding(true)} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-2 group">
            <Plus size={16} strokeWidth={3} className="transition-transform group-hover:rotate-90 duration-500" />
            新增标签
          </button>
        )}
      </div>

      <AnimatePresence>
        {(isAdding || editingId) && (
          <form onSubmit={handleSubmit} className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="px-10 py-6 bg-muted/30 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Plus size={16} strokeWidth={3} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-widest">{editingId ? '修改标签详情' : '创建新元数据标签'}</h2>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={resetEditor} className="px-4 py-2 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all">取消</button>
                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-xl text-[0.65rem] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                  <Check size={14} strokeWidth={3} /> {editingId ? '同步更新' : '立即发布'}
                </button>
              </div>
            </div>

            <section className="px-10 py-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TagIcon size={18} />
                </div>
                <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-foreground/50">标签名称</label>
              </div>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-black text-3xl opacity-20 select-none">#</span>
                <input autoFocus required value={formData.name} onChange={(event) => setFormData({ name: sanitizeTagNameInput(event.target.value) })} placeholder="例如: 前端工程化, 人工智能, 生活随笔..." className="w-full bg-muted/10 border border-transparent focus:border-primary/20 focus:bg-card rounded-2xl pl-14 pr-6 py-5 text-2xl font-display font-black text-foreground transition-all focus:outline-none placeholder:text-muted-foreground/20" />
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                  <Hash size={10} strokeWidth={3} />
                </div>
                <p className="text-[0.6rem] font-medium text-primary/60 leading-relaxed italic">
                  提示：标签名称支持中文，将按你输入的内容保存；系统仅会自动清理首尾空白字符。
                </p>
              </div>
            </section>
          </form>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        <div className="relative group flex-1 max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-4 h-4 group-focus-within:text-primary transition-colors" />
          <input placeholder="搜索全局标签..." value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-white/5 border border-border/20 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/40 transition-all placeholder:text-muted-foreground/30" />
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-muted/5 rounded-2xl border border-border/30 backdrop-blur-sm">
          <Hash size={14} className="text-primary/50" />
          <span className="text-[0.65rem] font-black uppercase tracking-widest opacity-40">{tags.length} 标签库记录</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {filteredTags.length > 0 ? filteredTags.map((tag, index) => (
            <MotionDiv
              key={tag.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.01 }}
              className="glass-card p-6 rounded-[2.5rem] border border-border/40 hover:border-primary/40 hover:bg-primary/[0.03] shadow-premium hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <TagIcon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <button onClick={() => handleEdit(tag)} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all" title="编辑标签">
                      <Edit3 size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={() => handleDelete(tag.id)} className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all" title="删除标签">
                      <Trash2 size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-display font-black tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-300 truncate">
                  {tag.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  <span className="text-[0.6rem] font-black text-muted-foreground/30 uppercase tracking-widest">
                    ID: {tag.id}
                  </span>
                </div>
              </div>

              <div className="mt-10 pt-5 border-t border-border/30 relative z-10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[0.55rem] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Articles</span>
                  <span className="text-sm font-display font-black text-foreground/60">{tag.articleCount || 0}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-muted/50 text-[0.55rem] font-black text-muted-foreground/60 uppercase tracking-tighter ring-1 ring-border/50">
                  Global Tag
                </div>
              </div>
            </MotionDiv>
          )) : (
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center opacity-40 flex flex-col items-center justify-center gap-8">
              <div className="w-28 h-28 rounded-[3rem] bg-muted/20 flex items-center justify-center relative shadow-inner">
                <TagIcon size={48} className="relative z-10 text-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-black uppercase tracking-[0.5em] text-muted-foreground/60">未发现标签</p>
                <p className="text-xs font-bold opacity-40 tracking-wider">尝试更换搜索关键词或新增一个标签</p>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>

      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="p-10 border-2 border-dashed border-border/30 flex items-center justify-center bg-muted/5 rounded-[2.5rem]">
        <p className="text-[0.65rem] font-bold text-muted-foreground/40 italic tracking-wide text-center">
          <span className="text-primary/40 font-black not-italic mr-2 font-display uppercase tracking-[0.2em]">Note:</span>
          标签用于更灵活的文章分类检索，删除标签记录不会同步清理已分发的文章内容缓存。
        </p>
      </MotionDiv>

      <ConfirmModal isOpen={modal.isOpen} onClose={closeModal} onConfirm={modal.onConfirm} title={modal.title} message={modal.message} />
    </div>
  );
}
