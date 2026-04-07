import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { ArrowLeft, Save, Globe, Type, Palette, Hash } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import { motion } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';
import { fetchAdminProjectById } from '../../utils/api';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    addProject, updateProject, showToast, loading 
  } = useBlog();
  
  const isNew = !id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    githubUrl: '',
    demoUrl: '',
    color: 'from-blue-500/20 to-purple-500/20',
  });

  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setColorMode(isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (!isNew) {
      const loadProject = async () => {
        const project = await fetchAdminProjectById(id);
        if (project) {
          setFormData({
            title: project.title || '',
            description: project.description || '',
            tags: project.tags || '',
            githubUrl: project.githubUrl || '',
            demoUrl: project.demoUrl || '',
            color: project.color || 'from-blue-500/20 to-purple-500/20',
          });
        }
      };
      loadProject();
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      showToast("项目标题与描述不能为空", "warning");
      return;
    }

    if (isNew) {
      const res = await addProject(formData);
      if (res.code === 200) {
        showToast('项目已成功创建', 'success');
        navigate('/admin/projects');
      } else {
        showToast(res.message, 'error');
      }
    } else {
      const res = await updateProject({ ...formData, id });
      if (res.code === 200) {
        showToast('项目信息已更新', 'success');
        navigate('/admin/projects');
      } else {
        showToast(res.message, 'error');
      }
    }
  };

  const colorPresets = [
    { name: '蓝色紫影', value: 'from-blue-500/20 to-purple-500/20' },
    { name: '翡翠之光', value: 'from-emerald-500/20 to-teal-500/20' },
    { name: '落日余晖', value: 'from-orange-500/20 to-red-500/20' },
    { name: '星空深邃', value: 'from-slate-600/20 to-slate-900/20' },
    { name: '赛博霓虹', value: 'from-pink-500/20 to-cyan-500/20' },
    { name: '极简灰调', value: 'from-gray-500/20 to-slate-500/20' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 pt-2">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">
            {isNew ? '新建项目' : '编辑项目'}
          </h1>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {isNew ? '发布您的最新技术成果与项目实践' : `正在完善项目详情 · ${formData.title || '项目加载中...'}`}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/admin/projects" 
            className="px-5 py-2.5 bg-muted text-muted-foreground rounded-xl text-xs font-bold tracking-wide hover:bg-muted/80 transition-all flex items-center gap-2 border border-border/50"
          >
            <ArrowLeft size={16} />
            返回列表
          </Link>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Save size={16} strokeWidth={3} />
            {isNew ? '立即创建' : '保存修改'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Name Section */}
          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl p-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Type size={20} />
              </div>
              <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">项目标识名称</label>
            </div>
            <input 
              type="text"
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="请输入项目名称..."
              className="w-full bg-muted/20 border-2 border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-5 text-2xl font-display font-black text-foreground transition-all focus:outline-none placeholder:text-muted-foreground/30"
            />
          </section>

          {/* 2. Description Section */}
          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl p-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Palette size={20} />
              </div>
              <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">项目深度描述 (Markdown)</label>
            </div>
            <div data-color-mode={colorMode} className="rounded-2xl overflow-hidden border border-border/50">
              <MDEditor
                value={formData.description}
                onChange={(val) => setFormData(p => ({...p, description: val || ''}))}
                height={550}
                preview="edit"
                className="!bg-transparent !border-none !shadow-none"
              />
            </div>
          </section>
        </div>

        {/* Side Column: Metadata & Atmos */}
        <div className="lg:col-span-4 space-y-8">
          {/* Metadata Links */}
          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-8">
            <div className="flex items-center gap-3 px-1">
               <Globe size={18} className="text-primary" />
               <h3 className="text-xs font-black uppercase tracking-widest text-foreground/60">资源访问链接</h3>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <Github size={14} className="text-muted-foreground" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground/50">GitHub Repository</span>
                  </div>
                  <input 
                    type="text"
                    name="githubUrl" 
                    value={formData.githubUrl} 
                    onChange={handleChange} 
                    className="w-full bg-muted/20 border border-border/40 px-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                    placeholder="https://github.com/..."
                  />
               </div>

               <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <Globe size={14} className="text-muted-foreground" />
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground/50">Live Demo URL</span>
                  </div>
                  <input 
                    type="text"
                    name="demoUrl" 
                    value={formData.demoUrl} 
                    onChange={handleChange} 
                    className="w-full bg-muted/20 border border-border/40 px-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                    placeholder="https://preview.com"
                  />
               </div>
            </div>
          </section>

          {/* Tags Section */}
          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3 px-1">
               <Hash size={18} className="text-indigo-500" />
               <h3 className="text-xs font-black uppercase tracking-widest text-foreground/60">技术栈标签</h3>
            </div>
            <div className="space-y-3">
              <input 
                type="text"
                name="tags" 
                value={formData.tags} 
                onChange={handleChange} 
                className="w-full bg-muted/20 border border-border/40 px-4 py-3 rounded-xl text-xs font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="例如: React, Node.js, Tailwind..."
              />
              <p className="px-1 text-[0.55rem] font-medium text-muted-foreground/40 italic">
                提示：使用英文逗号进行标签分隔
              </p>
            </div>
          </section>

          {/* Atmosphere Preset */}
          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3 px-1">
               <Palette size={18} className="text-amber-500" />
               <h3 className="text-xs font-black uppercase tracking-widest text-foreground/60">卡片视觉氛围</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
               {colorPresets.map(preset => (
                 <button
                   key={preset.value}
                   type="button"
                   onClick={() => setFormData(p => ({...p, color: preset.value}))}
                   className={`h-16 rounded-2xl border-2 transition-all overflow-hidden relative group ${formData.color === preset.value ? 'border-primary ring-2 ring-primary/10 scale-105' : 'border-border/30 opacity-60 hover:opacity-100'}`}
                 >
                    <div className={`absolute inset-0 bg-gradient-to-br ${preset.value} group-hover:scale-110 transition-transform duration-500`} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <span className="relative z-10 text-[0.55rem] font-black text-white px-2 drop-shadow-md uppercase tracking-tighter leading-none">{preset.name}</span>
                 </button>
               ))}
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
