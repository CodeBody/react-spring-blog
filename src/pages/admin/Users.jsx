import React, { useState, useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import { AnimatePresence, m } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Users as UsersIcon, 
  ShieldCheck, 
  Mail, 
  Check,
  X,
  Search,
  MoreHorizontal
} from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';
import { FaGithub } from 'react-icons/fa6';

/**
 * 动效容器组件。
 * 取值范围：`framer-motion` 提供的 div 动效组件。
 */
const MotionDiv = m.div;

export default function Users() {
  const { users, addUser, updateUser, deleteUser, fetchUsers, showToast } = useBlog();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ username: '', nickname: '', role: 'USER', email: '', avatar: '' });
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    fetchUsers();
    // 这里保持首次进入时加载一次用户列表，避免上下文函数引用变化导致重复请求。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = (users || []).filter(u => 
    u.username?.toLowerCase().includes(search.toLowerCase()) || 
    (u.nickname && u.nickname.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editingId ? await updateUser({ ...formData, id: editingId }) : await addUser(formData);
    if (res.code === 200) {
      showToast(editingId ? '用户资料已更新' : '新成员权限已下发', 'success');
      setEditingId(null);
      setIsAdding(false);
      setFormData({ username: '', nickname: '', role: 'USER', email: '', avatar: '' });
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      username: user.username,
      nickname: user.nickname || '',
      role: user.role || 'USER',
      email: user.email || '',
      avatar: user.avatar || ''
    });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setModal({
      isOpen: true,
      title: "注销该系统账号吗？",
      message: "该用户的所有权限将被即刻撤销，且无法再次使用此凭据登录。",
      onConfirm: async () => {
        const res = await deleteUser(id);
        if (res.code === 200) {
          showToast('该账号已被注销', 'success');
        } else {
          showToast(res.message, 'error');
        }
      }
    });
  };

  const cancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ username: '', nickname: '', role: 'USER', email: '', avatar: '' });
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight mb-2 text-gradient">用户管理</h1>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] opacity-40">Identity & Access Management</p>
        </div>
        {!isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)} 
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-2 group"
          >
            <Plus size={16} strokeWidth={3} className="transition-transform group-hover:rotate-90 duration-500" />
            新增成员
          </button>
        )}
      </div>

      {/* Editor / Form */}
      <AnimatePresence>
        {(isAdding || editingId) && (
            <form onSubmit={handleSubmit} className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Form Header */}
              <div className="px-10 py-6 bg-muted/30 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Plus size={16} strokeWidth={3} />
                   </div>
                   <h2 className="text-sm font-black uppercase tracking-widest">{editingId ? '编辑账户权限' : '开通新成员账号'}</h2>
                </div>
                <div className="flex gap-2">
                   <button type="button" onClick={cancel} className="px-4 py-2 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all">取消</button>
                   <button type="submit" className="px-6 py-2 bg-primary text-white rounded-xl text-[0.65rem] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                     <Check size={14} strokeWidth={3} /> {editingId ? '同步更新' : '确认开通'}
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Section 1: Profile */}
                <section className="px-10 py-8 space-y-6 border-b lg:border-b-0 lg:border-r border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <UsersIcon size={18} />
                    </div>
                    <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-foreground/50">身份验证信息</label>
                  </div>
                  <div className="space-y-4">
                    <input
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      placeholder="登录用户名 (Unique ID)"
                      className="w-full bg-muted/10 border border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-4 text-xl font-bold text-foreground transition-all focus:outline-none placeholder:text-muted-foreground/20"
                    />
                    <input
                      value={formData.nickname}
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                      placeholder="显示昵称 (Display Name)"
                      className="w-full bg-muted/10 border border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-4 text-lg font-semibold text-foreground/70 transition-all focus:outline-none placeholder:text-muted-foreground/20"
                    />
                  </div>
                </section>

                {/* Section 2: Contact & Avatar */}
                <section className="px-10 py-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-foreground/50">联系与形象</label>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="电子邮件地址 (Notification)"
                      className="w-full bg-muted/10 border border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-4 text-sm font-semibold text-foreground/70 transition-all focus:outline-none placeholder:text-muted-foreground/20"
                    />
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-muted/20 border border-border/50 shrink-0 overflow-hidden">
                        <img src={formData.avatar || "/assets/images/avatar-default.svg"} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <input
                        value={formData.avatar}
                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                        placeholder="头像 URL (Web link)"
                        className="flex-1 bg-muted/10 border border-transparent focus:border-primary/20 focus:bg-card rounded-2xl px-6 py-4 text-xs font-medium text-foreground/50 transition-all focus:outline-none"
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Section 3: Permission Area */}
              <section className="px-10 py-6 bg-primary/[0.02] border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                    <ShieldCheck size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-foreground/80">账号权限级别</h3>
                    <p className="text-[0.6rem] font-medium text-muted-foreground opacity-60">请根据成员职责分配相应的管理权限</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['USER', 'ADMIN'].map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData(p => ({...p, role}))}
                      className={`px-6 py-2.5 rounded-xl text-[0.65rem] font-black tracking-widest transition-all border 
                        ${formData.role === role 
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                          : 'bg-card text-muted-foreground border-border hover:bg-muted'}`}
                    >
                      {role === 'ADMIN' ? 'SUPER ADMINISTRATOR' : 'AUTHOR / EDITOR'}
                    </button>
                  ))}
                </div>
              </section>
            </form>
        )}
      </AnimatePresence>

      {/* User Directory */}
      <div className="space-y-8">
      {/* Search & Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-2">
        <div className="relative group flex-1 max-w-sm w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 w-4 h-4 group-focus-within:text-primary transition-colors" />
          <input
            placeholder="搜索用户标识或邮箱地址..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-border/20 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/40 transition-all placeholder:text-muted-foreground/30"
          />
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-muted/5 rounded-2xl border border-border/30 backdrop-blur-sm">
           <UsersIcon size={14} className="text-primary/50" />
           <span className="text-[0.65rem] font-black uppercase tracking-widest opacity-40">{users.length} Active System Accounts</span>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map((user, idx) => (
              <MotionDiv 
                key={user.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-10 rounded-[2.5rem] border border-border/40 hover:border-primary/40 hover:bg-primary/[0.02] shadow-premium hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto z-20">
                  <div className="flex gap-2">
                     <button onClick={() => handleEdit(user)} className="w-9 h-9 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm"><Edit3 size={14}/></button>
                     <button onClick={() => handleDelete(user.id)} className="w-9 h-9 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-all shadow-sm"><Trash2 size={14}/></button>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center gap-6 mb-10 pt-4">
                  <div className="relative">
                     <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors duration-700" />
                     <div className="w-24 h-24 rounded-[2.5rem] border-2 border-background overflow-hidden bg-muted/20 p-1 project-shadow relative z-10">
                      <img src={user.avatar || "/assets/images/avatar-default.svg"} alt="Avatar" className="w-full h-full object-cover rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                    </div>
                  </div>
                  <div className="overflow-hidden flex-1 relative z-10 w-full">
                    <h3 className="font-display font-black text-3xl tracking-tighter truncate group-hover:text-primary transition-colors">{user.nickname || user.username}</h3>
                    <p className="text-[0.65rem] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-30 mt-1">@{user.username}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-border/40 relative z-10">
                  <div className="flex items-center justify-between">
                     <span className="text-[0.6rem] font-black text-muted-foreground/30 uppercase tracking-[0.1em]">Permission</span>
                     <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${user.role === 'ADMIN' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        <ShieldCheck size={12} strokeWidth={3} />
                        <span className="text-[0.55rem] font-black uppercase tracking-[0.1em]">{user.role}</span>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[0.6rem] font-black text-muted-foreground/30 uppercase tracking-[0.1em]">Identity</span>
                     <div className="flex items-center gap-2 text-muted-foreground/60 max-w-[140px]">
                        <Mail size={12} className="opacity-50 shrink-0" />
                        <span className="text-[0.6rem] font-bold truncate tracking-tight">{user.email || '未绑定邮箱'}</span>
                     </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between relative z-10">
                  <div className="flex gap-4">
                    <FaGithub size={16} className="text-muted-foreground/20 hover:text-foreground cursor-pointer transition-all hover:scale-110" />
                    <MoreHorizontal size={16} className="text-muted-foreground/20 hover:text-foreground cursor-pointer transition-all hover:scale-110" />
                  </div>
                  <div className="text-[0.55rem] font-black text-muted-foreground/10 uppercase tracking-[0.3em] italic">ROOT_ID_{user.id}</div>
                </div>
              </MotionDiv>
            )) : (
              <MotionDiv 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 text-center opacity-40 flex flex-col items-center justify-center gap-8"
              >
                 <div className="w-28 h-28 rounded-[3rem] bg-muted/20 flex items-center justify-center relative shadow-inner">
                   <UsersIcon size={48} className="relative z-10 text-muted-foreground/30" />
                 </div>
                 <div className="space-y-2">
                   <p className="text-lg font-black uppercase tracking-[0.5em] text-muted-foreground/60">未发现成员</p>
                   <p className="text-xs font-bold opacity-40 tracking-wider">尝试更换搜索关键词或开通新成员账号</p>
                 </div>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfirmModal 
        isOpen={modal.isOpen}
        onClose={() => setModal(p => ({ ...p, isOpen: false }))}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
}
