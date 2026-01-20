
import React, { useState } from 'react';

const ContactView: React.FC = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid md:grid-cols-2 gap-20">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter lowercase">get in touch</h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg">
            Have a project in mind or just want to say hi? I'm currently open to new collaborations 
            and freelance opportunities.
          </p>
          
          <div className="space-y-6 pt-8">
            <div className="flex flex-col gap-1">
              <span className="technical-mono text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</span>
              <a href="mailto:hello@brandonwooding.com" className="text-xl hover:text-primary transition-colors">hello@brandonwooding.com</a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="technical-mono text-[10px] uppercase tracking-widest font-bold text-gray-400">Socials</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary underline underline-offset-4 decoration-gray-200 dark:decoration-white/10">Twitter</a>
                <a href="#" className="hover:text-primary underline underline-offset-4 decoration-gray-200 dark:decoration-white/10">LinkedIn</a>
                <a href="#" className="hover:text-primary underline underline-offset-4 decoration-gray-200 dark:decoration-white/10">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-white/5 p-8 md:p-12 rounded-2xl border border-gray-100 dark:border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="technical-mono text-[10px] uppercase tracking-widest font-bold text-gray-400">Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300" 
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="technical-mono text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-300" 
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="technical-mono text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
              <textarea 
                rows={4} 
                required
                className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-gray-300"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={sent}
              className={`w-full py-4 technical-mono text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-lg ${
                sent ? 'bg-green-500 text-white' : 'bg-[#111318] dark:bg-white text-white dark:text-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white'
              }`}
            >
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
