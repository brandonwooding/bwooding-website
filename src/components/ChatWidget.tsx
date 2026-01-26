
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Minus, Send, Maximize2, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Robot from './Robot';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

type ChatState = 'active' | 'sleeping' | 'rate_limited';

// Witty messages - add more options to each array for random selection
const WITTY_MESSAGES = {
  sleeping: {
    initial: [
      "Sorry, I'm sleeping - please check back later"
    ],
    followUp: [
      "zzz"
    ]
  },
  rateLimited: {
    initial: [
      "Sorry, Brandon said I can't yap forever. He mentioned something about rate limits or API credits, I can't remember... Anyways, it's been nice, I'm going to nap now :)"
    ],
    followUp: [
      "zzz"
    ]
  }
};

const getRandomMessage = (messages: string[]): string => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const SESSION_ID_KEY = 'chat_session_id';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId || sessionId.length < 8) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('active');
  const [isRobotAnimating, setIsRobotAnimating] = useState(false);
  const [hasRobotAnimated, setHasRobotAnimated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

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
      setTimeout(() => {
        setIsRobotAnimating(false);
        setHasRobotAnimated(true); // Set after animation completes
      }, 3500); // Match animation duration
    }, 3000);

    // Periodic animation every 15 seconds
    const interval = setInterval(() => {
      if (!isOpen) {
        setIsRobotAnimating(true);
        setTimeout(() => setIsRobotAnimating(false), 3500);
      }
    }, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [isOpen]);

  // Listen for askMarkus events from other components
  useEffect(() => {
    const handleAskMarkus = (e: CustomEvent<{ message: string }>) => {
      setIsOpen(true);
      // Small delay to ensure chat is open and initialized
      setTimeout(() => {
        sendMessage(e.detail.message);
      }, 100);
    };

    window.addEventListener('askMarkus', handleAskMarkus as EventListener);
    return () => {
      window.removeEventListener('askMarkus', handleAskMarkus as EventListener);
    };
  }, []);

  const sendMessage = async (prompt: string, showUserMessage = true) => {
    if (!prompt.trim() || isLoading) return;

    if (showUserMessage) {
      const userMessage: Message = { id: Date.now().toString(), role: 'user', text: prompt };
      setMessages(prev => [...prev, userMessage]);
    }
    setInput('');

    // If chat is in a disabled state, respond with follow-up message
    if (chatState !== 'active') {
      const followUpMessages = chatState === 'sleeping'
        ? WITTY_MESSAGES.sleeping.followUp
        : WITTY_MESSAGES.rateLimited.followUp;
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: getRandomMessage(followUpMessages)
      }]);
      return;
    }

    setIsLoading(true);

    try {
      const sessionId = getOrCreateSessionId();
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          sessionId,
          prompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle rate limiting (429)
        if (response.status === 429) {
          setChatState('rate_limited');
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            text: getRandomMessage(WITTY_MESSAGES.rateLimited.initial)
          }]);
          return;
        }

        // Handle service unavailable (503, 502, 500) as sleeping
        if (response.status >= 500) {
          setChatState('sleeping');
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            text: getRandomMessage(WITTY_MESSAGES.sleeping.initial)
          }]);
          return;
        }

        if (response.status === 401) {
          throw new Error('Unauthorized: Invalid API key');
        } else if (response.status === 400) {
          throw new Error(errorData.error || 'Invalid request');
        } else {
          throw new Error(errorData.error || 'Something went wrong');
        }
      }

      const data = await response.json();
      const assistantText = data.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: assistantText }]);
    } catch (error) {
      console.error("Chat Error:", error);

      // Network errors (fetch failed, no connection, CORS, DNS failure, etc.)
      if (error instanceof TypeError) {
        setChatState('sleeping');
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: getRandomMessage(WITTY_MESSAGES.sleeping.initial)
        }]);
        return;
      }

      const errorMessage = error instanceof Error ? error.message : "Connection error. Please try again later.";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    const newSessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, newSessionId);
    setMessages([]);
    setChatState('active'); // Reset chat state so user can try again
    hasInitialized.current = false;
  };

  // Auto-send intro message when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasInitialized.current && !isLoading) {
      hasInitialized.current = true;
      sendMessage('A new user has arrived. Do not react to their appearance - just greet and introduce yourself.', false);
    }
  }, [isOpen, messages.length, isLoading]);

  if (!isOpen) {
    return (
      <>
        <Robot isAnimating={isRobotAnimating} hasAnimated={hasRobotAnimated} />
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-[#111318] dark:bg-white text-white dark:text-black rounded-full hover:scale-110 transition-transform z-[100]"
          aria-label="Open Chat"
        >
          <MessageSquare size={24} />
        </button>
      </>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-[85vw] md:w-[320px] z-[100] ${isMinimized ? 'h-14' : 'h-[50vh] min-h-[400px]'} flex flex-col bg-white dark:bg-[#0f1115] border-2 border-gray-900 dark:border-white overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b-2 border-black dark:border-white bg-black shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary animate-pulse" />
          <span className="technical-mono text-[9px] uppercase tracking-widest font-bold text-white">Markus (Brandon's sidekick)</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleNewConversation} className="p-1.5 hover:bg-white/20 border border-transparent hover:border-white text-white" title="New conversation">
            <RotateCcw size={14} />
          </button>
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/20 border border-transparent hover:border-white text-white" title={isMinimized ? "Maximize" : "Minimize"}>
            {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 border border-transparent hover:border-white text-gray-400 hover:text-red-400" title="Close">
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary text-white border-2 border-primary'
                    : 'bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 border-2 border-gray-900 dark:border-white'
                } ${m.role === 'assistant' ? 'chat-markdown' : ''}`}>
                  {m.role === 'assistant' ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-black p-3 border-2 border-gray-900 dark:border-white flex gap-1">
                  <span className="w-1 h-1 bg-gray-400 animate-bounce" />
                  <span className="w-1 h-1 bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="p-3 bg-gray-50 dark:bg-black border-t-2 border-gray-900 dark:border-white flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-white dark:bg-[#16181d] border-2 border-gray-900 dark:border-white px-3 py-2 text-xs focus:outline-none focus:border-primary placeholder:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-primary text-white border-2 border-primary disabled:opacity-50 hover:bg-opacity-90 flex items-center justify-center"
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
