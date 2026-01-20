
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Minus, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Robot from './Robot';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRobotAnimating, setIsRobotAnimating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize and persist state
  useEffect(() => {
    const saved = sessionStorage.getItem('portfolio_chat');
    if (saved) {
      const { messages: savedMsgs, isOpen: savedOpen } = JSON.parse(saved);
      setMessages(savedMsgs);
      setIsOpen(savedOpen);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('portfolio_chat', JSON.stringify({ messages, isOpen }));
  }, [messages, isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Robot animation trigger
  useEffect(() => {
    if (isOpen) return; // Don't animate if chat is already open

    // Initial delay before first animation
    const initialDelay = setTimeout(() => {
      setIsRobotAnimating(true);
      setTimeout(() => setIsRobotAnimating(false), 4000); // Match animation duration
    }, 3000);

    // Periodic animation every 15 seconds
    const interval = setInterval(() => {
      if (!isOpen) {
        setIsRobotAnimating(true);
        setTimeout(() => setIsRobotAnimating(false), 4000);
      }
    }, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are Brandon Wooding's AI assistant. You are professional, minimalist, and helpful. You know about his projects (Linear Redesign, Vercel Dashboard, UI Library) and his expertise in Frontend Engineering and Product Design. Keep responses concise and focused on professional inquiries.",
        }
      });

      const modelText = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: "Connection error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <>
        <Robot isAnimating={isRobotAnimating} />
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-[#111318] dark:bg-white text-white dark:text-black rounded-full shadow-2xl hover:scale-110 transition-all z-[100]"
          aria-label="Open Chat"
        >
          <MessageSquare size={24} />
        </button>
      </>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-[85vw] md:w-[320px] z-[100] transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[50vh] min-h-[400px]'} flex flex-col bg-white dark:bg-[#0f1115] border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="technical-mono text-[9px] uppercase tracking-widest font-bold">B. Wooding AI</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Minimize">
            <Minus size={14} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded transition-colors" title="Close">
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-2 py-8">
                <Bot size={28} />
                <p className="text-[9px] technical-mono uppercase tracking-widest">Minimal assistant ready</p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 border border-gray-50 dark:border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-white/5 p-3 rounded-xl flex gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white dark:bg-[#16181d] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors placeholder:opacity-50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-primary text-white rounded-xl disabled:opacity-50 transition-all hover:brightness-110 active:scale-95 flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatWidget;
