import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { ArrowLeft, Globe, Hash, Palette, Save, Type } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import { fetchAdminProjectById } from '../../utils/api';
import { MarkdownEditor } from '../../components/common/MarkdownEditor';

/**
 * 项目表单默认值。
 * 业务含义：用于新建项目和编辑页初始化。
 */
const DEFAULT_FORM_DATA = {
  title: '',
  description: '',
  tags: '',
  githubUrl: '',
  demoUrl: '',
  color: 'from-blue-500/20 to-purple-500/20',
};

/**
 * 项目卡片色板预设。
 * 业务含义：为后台项目卡片提供固定视觉风格选择。
 */
const COLOR_PRESETS = [
  { name: '蓝色紫影', value: 'from-blue-500/20 to-purple-500/20' },
  { name: '翡翠之光', value: 'from-emerald-500/20 to-teal-500/20' },
  { name: '落日余晖', value: 'from-orange-500/20 to-red-500/20' },
  { name: '星空深邃', value: 'from-slate-600/20 to-slate-900/20' },
  { name: '赛博霓虹', value: 'from-pink-500/20 to-cyan-500/20' },
  { name: '极简灰调', value: 'from-gray-500/20 to-slate-500/20' },
];

/**
 * 根据项目详情构建表单对象。
 * @param {Record<string, any> | null} project 项目详情对象。
 * @returns {Record<string, any>} 返回表单数据对象。
 */
const buildProjectFormData = (project) => ({
  title: project?.title || '',
  description: project?.description || '',
  tags: project?.tags || '',
  githubUrl: project?.githubUrl || '',
  demoUrl: project?.demoUrl || '',
  color: project?.color || DEFAULT_FORM_DATA.color,
});

/**
 * 后台项目编辑页面。
 * @returns {JSX.Element} 返回项目创建或编辑界面。
 * @description 负责维护项目详情、标签、链接和卡片视觉配置。
 */
export default function EditProject() {
  /**
   * 当前路由中的项目主键。
   * 取值范围：字符串 ID 或 `undefined`。
   */
  const { id } = useParams();
  /**
   * 路由跳转函数。
   * 业务含义：在保存完成后返回项目列表页。
   */
  const navigate = useNavigate();
  /**
   * 项目写操作和提示函数。
   * 业务含义：驱动项目新增、编辑和消息提示。
   */
  const { addProject, updateProject, showToast } = useBlog();
  /**
   * 当前是否为新建项目模式。
   * 取值范围：`true` / `false`。
   */
  const isNew = !id;
  /**
   * 当前表单数据。
   * 取值范围：项目表单字段对象。
   */
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  useEffect(() => {
    /**
     * 拉取后台项目详情并同步到表单。
     * @returns {Promise<void>} 无显式返回值。
     */
    const loadProject = async () => {
      if (isNew) {
        return;
      }

      const project = await fetchAdminProjectById(id);

      if (project) {
        setFormData(buildProjectFormData(project));
      }
    };

    loadProject();
  }, [id, isNew]);

  /**
   * 处理输入框字段变更。
   * @param {React.ChangeEvent<HTMLInputElement>} event 输入事件对象。
   * @returns {void} 无返回值。
   */
  const handleChange = (event) => {
    /**
     * 当前被修改的字段名。
     * 取值范围：表单字段 key。
     */
    const { name, value } = event.target;
    setFormData((previousFormData) => ({ ...previousFormData, [name]: value }));
  };

  /**
   * 处理 Markdown 描述变更。
   * @param {string | undefined} value 编辑器返回的文本值。
   * @returns {void} 无返回值。
   */
  const handleDescriptionChange = (value) => {
    setFormData((previousFormData) => ({ ...previousFormData, description: value || '' }));
  };

  /**
   * 处理项目色板变更。
   * @param {string} color 项目卡片渐变字符串。
   * @returns {void} 无返回值。
   */
  const handleColorChange = (color) => {
    setFormData((previousFormData) => ({ ...previousFormData, color }));
  };

  /**
   * 提交项目表单。
   * @param {React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>} event 表单或按钮事件对象。
   * @returns {Promise<void>} 无显式返回值。
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      showToast('项目标题与描述不能为空', 'warning');
      return;
    }

    const result = isNew
      ? await addProject(formData)
      : await updateProject({ ...formData, id });

    if (result.code !== 200) {
      showToast(result.message, 'error');
      return;
    }

    showToast(isNew ? '项目已成功创建' : '项目信息已更新', 'success');
    navigate('/admin/projects');
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 pt-2">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">{isNew ? '新建项目' : '编辑项目'}</h1>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {isNew ? '发布您的最新技术成果与项目实践' : `正在完善项目详情 · ${formData.title || '项目加载中...'}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/projects" className="px-5 py-2.5 bg-muted text-muted-foreground rounded-xl text-xs font-bold tracking-wide hover:bg-muted/80 transition-all flex items-center gap-2 border border-border/50">
            <ArrowLeft size={16} />
            返回列表
          </Link>
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Save size={16} strokeWidth={3} />
            {isNew ? '立即创建' : '保存修改'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl p-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Type size={20} />
              </div>
              <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">项目标识名称</label>
            </div>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="请输入项目名称..." className="w-full bg-muted/20 border-2 border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-5 text-2xl font-display font-black text-foreground transition-all focus:outline-none placeholder:text-muted-foreground/30" />
          </section>

          <section className="bg-card rounded-[2.5rem] border border-border shadow-xl p-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Palette size={20} />
              </div>
              <label className="text-sm font-bold uppercase tracking-widest text-foreground/60">项目深度描述 (Markdown)</label>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/50 p-4">
              <MarkdownEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                minHeight={550}
                defaultView="edit"
              />
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
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
                <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full bg-muted/20 border border-border/40 px-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono" placeholder="https://github.com/..." />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <Globe size={14} className="text-muted-foreground" />
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-muted-foreground/50">Live Demo URL</span>
                </div>
                <input type="text" name="demoUrl" value={formData.demoUrl} onChange={handleChange} className="w-full bg-muted/20 border border-border/40 px-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono" placeholder="https://preview.com" />
              </div>
            </div>
          </section>

          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3 px-1">
              <Hash size={18} className="text-indigo-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground/60">技术栈标签</h3>
            </div>
            <div className="space-y-3">
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full bg-muted/20 border border-border/40 px-4 py-3 rounded-xl text-xs font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="例如: React, Node.js, Tailwind..." />
              <p className="px-1 text-[0.55rem] font-medium text-muted-foreground/40 italic">提示：使用英文逗号进行标签分隔</p>
            </div>
          </section>

          <section className="bg-card rounded-[2rem] border border-border shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-3 px-1">
              <Palette size={18} className="text-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-foreground/60">卡片视觉氛围</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleColorChange(preset.value)}
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
