import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import SocialLinks from '../../components/front/SocialLinks';

/**
 * 联系页表单状态集合。
 * 业务含义：控制提交按钮和成功提示的展示阶段。
 */
const FORM_STATUS = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
};

/**
 * 联系页面。
 * @returns {JSX.Element} 返回联系页内容。
 * @description 负责展示社交方式和模拟留言提交流程。
 */
export default function Contact() {
  /**
   * 当前管理员资料对象。
   * 业务含义：用于渲染社交链接。
   */
  const { profile } = useBlog();
  /**
   * 当前表单提交状态。
   * 取值范围：`idle/submitting/success`。
   */
  const [status, setStatus] = useState(FORM_STATUS.IDLE);

  /**
   * 重置表单状态为初始值。
   * @returns {void} 无返回值。
   */
  const resetStatus = () => {
    setStatus(FORM_STATUS.IDLE);
  };

  /**
   * 处理联系表单提交。
   * @param {React.FormEvent<HTMLFormElement>} event 表单提交事件对象。
   * @returns {void} 无返回值。
   * @description 当前实现保留原有模拟请求逻辑，不接入真实后端。
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(FORM_STATUS.SUBMITTING);

    setTimeout(() => {
      setStatus(FORM_STATUS.SUCCESS);
      event.target.reset();
      setTimeout(resetStatus, 5000);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-6 lg:px-8 w-full animate-in fade-in slide-in-from-bottom-6 duration-700 ease-in-out">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="space-y-12">
          <div>
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-[800] tracking-tight leading-tight mb-6">
              和我 <span className="text-transparent bg-clip-text bg-[image:var(--gradient-brand)]">建立联系.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              目前接受自由职业、创新的开源项目以及关于 AI 界面未来的讨论。
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-tight uppercase text-muted-foreground">在社交媒体上找到我</h3>
            <SocialLinks profile={profile} variant="pill" />

            <div className="pt-6 flex items-center gap-4 text-muted-foreground">
              <Mail size={20} />
              <a href="mailto:hello@example.com" className="break-all font-medium hover:text-foreground transition-colors">hello@example.com</a>
            </div>
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-2xl border border-border/50 rounded-[2rem] p-8 sm:p-10 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-1000 pointer-events-none" />

          <h2 className="text-2xl font-display font-bold mb-8">发送消息</h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-muted-foreground">姓名</label>
              <input id="name" type="text" required className="w-full px-5 py-4 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">邮箱</label>
              <input id="email" type="email" required className="w-full px-5 py-4 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground">留言内容</label>
              <textarea id="message" required rows="4" className="w-full px-5 py-4 rounded-xl border border-border/50 bg-background/50 focus:bg-background focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none resize-none" placeholder="我能为你做些什么？" />
            </div>

            <button type="submit" disabled={status === FORM_STATUS.SUBMITTING || status === FORM_STATUS.SUCCESS} className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 text-white shadow-glow transition-all disabled:opacity-70 disabled:cursor-not-allowed bg-[image:var(--gradient-brand)] hover:opacity-90 active:scale-[0.98]">
              {status === FORM_STATUS.IDLE && <><Send size={18} /> 提交留言</>}
              {status === FORM_STATUS.SUBMITTING && <span className="animate-pulse">正在发送...</span>}
              {status === FORM_STATUS.SUCCESS && <><CheckCircle2 size={18} /> 消息已发送！</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
