import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { AlertCircle, Edit3, ExternalLink, Plus, Search, Trash2 } from 'lucide-react';
import { m } from 'framer-motion';
import { formatDate } from '../../utils';
import ConfirmModal from '../../components/common/ConfirmModal';
import { Pagination } from '../../components/common/Pagination';

/**
 * 动效表格行组件。
 * 取值范围：`framer-motion` 提供的 tr 动效组件。
 */
const MotionTableRow = m.tr;

/**
 * 生成空的删除确认弹窗状态。
 * @returns {{isOpen: boolean, title: string, message: string, onConfirm: Function}} 返回默认弹窗状态对象。
 */
const createEmptyModal = () => ({ isOpen: false, title: '', message: '', onConfirm: () => {} });

/**
 * 后台项目列表页。
 * @returns {JSX.Element} 返回后台项目列表管理界面。
 * @description 负责项目搜索、分页、跳转编辑和删除确认。
 */
export default function Projects() {
  /**
   * 项目列表页依赖的上下文状态和动作。
   * 业务含义：驱动项目分页拉取和删除流程。
   */
  const { projects, totalProjects, deleteProject, fetchAdminProjects, showToast } = useBlog();
  /**
   * 路由跳转函数。
   * 业务含义：用于跳转项目新建页和编辑页。
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
   * 当前被勾选的项目主键数组。
   * 取值范围：项目 ID 数组。
   */
  const [selectedIds, setSelectedIds] = useState([]);
  /**
   * 当前确认弹窗状态。
   * 取值范围：包含标题、内容和确认回调的对象。
   */
  const [modal, setModal] = useState(createEmptyModal);
  /**
   * 当前每页展示条数。
   * 取值范围：正整数。
   */
  const pageSize = 5;

  useEffect(() => {
    fetchAdminProjects(currentPage, pageSize, search);
    // 这里维持与现有分页搜索联动一致的请求时机，避免上下文函数引用变化导致重复请求。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search]);

  /**
   * 切换单个项目勾选状态。
   * @param {string|number} id 项目主键。
   * @returns {void} 无返回值。
   */
  const toggleSelect = (id) => {
    setSelectedIds((previousIds) => (
      previousIds.includes(id)
        ? previousIds.filter((item) => item !== id)
        : [...previousIds, id]
    ));
  };

  /**
   * 切换当前页全部项目勾选状态。
   * @returns {void} 无返回值。
   */
  const toggleAll = () => {
    setSelectedIds((previousIds) => (
      previousIds.length === projects.length && projects.length > 0
        ? []
        : projects.map((project) => project.id)
    ));
  };

  /**
   * 关闭确认弹窗。
   * @returns {void} 无返回值。
   */
  const closeModal = () => {
    setModal((previousModal) => ({ ...previousModal, isOpen: false }));
  };

  /**
   * 打开项目删除确认弹窗。
   * @param {string|number} id 项目主键。
   * @returns {void} 无返回值。
   */
  const handleDelete = (id) => {
    setModal({
      isOpen: true,
      title: '确定删除此项目吗？',
      message: '该操作将从数据库中永久移除此项目，且无法撤销。',
      onConfirm: async () => {
        const result = await deleteProject(id);

        if (result.code !== 200) {
          showToast(result.message, 'error');
          return;
        }

        showToast('项目已成功移除', 'success');
        fetchAdminProjects(currentPage, pageSize, search);
      },
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">项目管理</h1>
          <p className="text-muted-foreground text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            维护您的作品集与实验性项目 · 共 {totalProjects} 个
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/project/new')} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            <Plus size={16} strokeWidth={3} />
            新建项目
          </button>
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-sm rounded-[2rem] border border-border/50 overflow-hidden shadow-premium">
        <div className="px-8 py-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-muted/20">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/70">作品集</h2>
            <div className="h-4 w-[1px] bg-border/60" />
            <span className="text-[0.65rem] font-black px-2.5 py-1 bg-primary/10 text-primary rounded-lg uppercase tracking-wider">{projects.length} 当前显示</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto max-w-md">
            <div className="relative group w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 w-4 h-4 group-focus-within:text-primary transition-colors" />
              <input placeholder="搜索项目名称..." value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-background/50 pl-10 pr-4 h-10 rounded-xl text-xs font-semibold tracking-wide border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[0.6rem] text-muted-foreground uppercase tracking-[0.2em] font-black border-b border-border/30 bg-muted/5">
                <th className="px-8 py-5 w-4">
                  <div className="flex items-center">
                    <input type="checkbox" checked={selectedIds.length === projects.length && projects.length > 0} onChange={toggleAll} className="w-4 h-4 rounded-md border-border bg-transparent text-primary focus:ring-primary/20 cursor-pointer" />
                  </div>
                </th>
                <th className="px-6 py-5">项目详情</th>
                <th className="px-6 py-5">标签</th>
                <th className="px-6 py-5">创建日期</th>
                <th className="px-8 py-5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {projects.length > 0 ? projects.map((project, index) => (
                <MotionTableRow
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-primary/[0.02] transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <input type="checkbox" checked={selectedIds.includes(project.id)} onChange={() => toggleSelect(project.id)} className="w-4 h-4 rounded-md border-border bg-transparent text-primary focus:ring-primary/20 cursor-pointer" />
                  </td>
                  <td className="px-6 py-6 max-w-md">
                    <div className="flex flex-col gap-2">
                      <Link to={`/admin/project/edit/${project.id}`} className="font-display text-lg font-bold hover:text-primary transition-all duration-300 block leading-tight">
                        {project.title}
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.split(',').map((tag) => (
                        <span key={tag} className="text-[0.6rem] font-bold text-muted-foreground/60 uppercase tracking-widest px-2 py-0.5 rounded-md bg-muted/40 border border-border/50">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-muted-foreground tracking-tight">{formatDate(project.createdAt).split(',')[0]}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2">
                      {project.demoUrl && (
                        <button onClick={() => window.open(project.demoUrl, '_blank')} className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all" title="查看演示">
                          <ExternalLink size={16} />
                        </button>
                      )}
                      <button onClick={() => navigate(`/admin/project/edit/${project.id}`)} className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all" title="编辑">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:shadow-lg transition-all" title="删除">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </MotionTableRow>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                      <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-2">
                        <AlertCircle className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-xs font-black tracking-[0.2em] uppercase">尚未发布任何项目</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalProjects > pageSize && (
          <div className="px-8 py-2 border-t border-border/30 bg-muted/10">
            <Pagination currentPage={currentPage} totalPages={Math.ceil(totalProjects / pageSize)} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>

      <ConfirmModal isOpen={modal.isOpen} onClose={closeModal} onConfirm={modal.onConfirm} title={modal.title} message={modal.message} />
    </div>
  );
}
