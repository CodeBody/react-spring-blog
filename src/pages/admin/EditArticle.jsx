import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { ArrowLeft, Save, Image as ImageIcon, X, Command, Eye, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import MDEditor from '@uiw/react-md-editor';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    articles, categories, tags: allTags, 
    fetchTags, fetchCategories, fetchAdminSingleArticle, 
    loading, addArticle, updateArticle, profile, showToast 
  } = useBlog();
  
  const isNew = !id;

  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (!id) {
      // Clear data if new
    } else {
      fetchAdminSingleArticle(id);
    }
  }, [id]);
  
  const existingArticle = !isNew ? articles.find(a => String(a.id) === String(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    tags: [],
    status: 'published',
    content: '',
  });

  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setColorMode(isDark ? 'dark' : 'light');
    
    const observer = new MutationObserver(() => {
      setColorMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (existingArticle) {
       setFormData({
         title: existingArticle.title,
         categoryId: existingArticle.categoryId || '',
         tags: existingArticle.tags || [],
         status: existingArticle.status,
         content: existingArticle.content,
       });
    } else if (!isNew && !loading && articles.length > 0) {
       // Only navigate away if it's NOT a new draft AND we're done loading AND the article really doesn't exist
       navigate('/admin/posts');
    }
  }, [existingArticle, isNew, navigate, loading, articles.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showToast("文章标题与内容不能为空", "warning");
      return;
    }

    const tagIds = formData.tags
      .map(tagName => allTags.find(t => t.name === tagName)?.id)
      .filter(id => id);

    if (isNew) {
      await addArticle({
        ...formData,
        tagIds,
        author: profile?.name || 'Admin',
        date: new Date().toISOString(),
        views: 0
      });
      showToast('新博文已成功发布', 'success');
    } else {
      await updateArticle({
        ...existingArticle,
        ...formData,
        tagIds
      });
      showToast('文章已更新并同步到星系', 'success');
    }

    navigate('/admin/posts');
  };


  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 pt-2">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">
            {isNew ? '新建文章' : '编辑文章'}
          </h1>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {isNew ? '创作并发布您的下一篇精彩博客内容' : `正在编辑文章 · ${formData.title || '标题加载中...'}`}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/posts" 
            className="px-5 py-2.5 bg-muted text-muted-foreground rounded-xl text-xs font-bold tracking-wide hover:bg-muted/80 transition-all flex items-center gap-2 border border-border/50"
          >
            <ArrowLeft size={16} />
            返回列表
          </Link>
          {!isNew && (
            <button 
              onClick={() => window.open(`/article/${id}`, '_blank')} 
              className="px-5 py-2.5 bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 shadow-sm"
            >
              <Eye size={16} />
              预览内容
            </button>
          )}
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Save size={16} strokeWidth={3} />
            {isNew ? '立即发布' : '同步更新'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Main Content Area: Title & Editor */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Title Section */}
          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl px-10 py-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Command size={20} />
              </div>
              <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">博文标题</label>
            </div>
            <input 
              type="text"
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="请输入极具吸引力的标题..."
              className="w-full bg-muted/20 border-2 border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-5 text-2xl font-display font-black text-foreground transition-all focus:outline-none placeholder:text-muted-foreground/20"
            />
          </section>

          {/* 2. The Content Canvas */}
          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden min-h-[850px] flex flex-col">
            <div className="px-10 py-8 border-b border-border/50 bg-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">正文创作</label>
              </div>
              <div className="flex items-center gap-2 text-[0.6rem] font-bold text-muted-foreground/40 uppercase tracking-widest bg-muted/20 px-3 py-1.5 rounded-lg border border-border/50">
                 Markdown Support
              </div>
            </div>
            <div className="flex-1 px-4 py-2">
              <MDEditor
                value={formData.content}
                onChange={(val) => setFormData(p => ({...p, content: val || ''}))}
                height={750}
                preview="edit"
                data-color-mode={colorMode}
                className="!bg-transparent !border-none !shadow-none h-full"
                visibleDragbar={false}
              />
            </div>
            <div className="px-10 py-6 text-center border-t border-border/20 bg-muted/5 text-muted-foreground/20 text-[0.6rem] font-bold tracking-[0.4em] uppercase">
                Focus Mode · Active
            </div>
          </section>
        </div>

        {/* Side Column: Metadata & Settings */}
        <div className="lg:col-span-4 space-y-8">
          {/* Category Section */}
          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Zap size={18} />
              </div>
              <label className="text-xs font-black uppercase tracking-widest text-foreground/60">内容分类</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData(p => ({...p, categoryId: cat.id}))}
                  className={`px-4 py-3 rounded-xl text-[0.65rem] font-bold tracking-tight transition-all border text-center
                    ${String(formData.categoryId) === String(cat.id) 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                      : 'bg-card text-muted-foreground border-border/50 hover:text-foreground hover:bg-muted/50'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </section>

          {/* Tags Section */}
          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <ImageIcon size={18} />
              </div>
              <label className="text-xs font-black uppercase tracking-widest text-foreground/60">关联标签</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => {
                const isSelected = formData.tags.includes(tag.name);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => {
                      setFormData(p => ({
                        ...p,
                        tags: isSelected ? p.tags.filter(t => t !== tag.name) : [...p.tags, tag.name]
                      }))
                    }}
                    className={`px-3.5 py-2 rounded-xl text-[0.6rem] font-bold tracking-tight transition-all border
                      ${isSelected 
                      ? 'bg-primary/10 text-primary border-primary/30' 
                      : 'bg-card text-muted-foreground border-border/40 hover:text-foreground hover:bg-muted/50'}`}
                  >
                    #{tag.name}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Status & Help Section */}
          <section className="bg-gradient-to-br from-primary/[0.03] to-transparent rounded-[2rem] border border-primary/10 p-8">
             <div className="flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-border/40 backdrop-blur-sm">
                   <p className="text-[0.65rem] font-black text-foreground/40 uppercase tracking-[0.2em] mb-2 text-center">发布状态</p>
                   <div className="flex gap-2">
                      <button onClick={() => setFormData(p => ({...p, status: 'published'}))} type="button" className={`flex-1 h-10 rounded-xl text-[0.6rem] font-bold transition-all ${formData.status === 'published' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-muted/50 text-muted-foreground'}`}>{formData.status === 'published' ? '已排期发布' : '立即发布'}</button>
                      <button onClick={() => setFormData(p => ({...p, status: 'draft'}))} type="button" className={`flex-1 h-10 rounded-xl text-[0.6rem] font-bold transition-all ${formData.status === 'draft' ? 'bg-amber-500 text-white shadow-lg' : 'bg-muted/50 text-muted-foreground'}`}>保存为草稿</button>
                   </div>
                </div>
                <div className="text-center italic text-[0.6rem] font-medium text-muted-foreground/40 mt-4 leading-relaxed px-2">
                  "Thoughtful content is the foundation of digital excellence."
                </div>
             </div>
          </section>
        </div>
      </form>

      <footer className="py-2 text-center text-muted-foreground/20 text-[0.6rem] font-bold tracking-[0.5em] uppercase">
         The Atelier Framework v2.0
      </footer>
    </div>
  );
}
