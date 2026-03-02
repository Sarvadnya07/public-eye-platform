import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
}

const botResponses = [
  {
    keywords: ['pothole', 'road', 'highway', 'bridge', 'sign'],
    category: 'roads',
    response: "I see -- a roads/infrastructure issue. I've pre-filled the form with category \"Roads & Infrastructure\". Let me redirect you to complete it.",
  },
  {
    keywords: ['water', 'pipe', 'flood', 'hydrant', 'pressure', 'leak'],
    category: 'water',
    response: "Got it -- sounds like a water & sewage issue. I've pre-categorized this for you. Redirecting to the complaint form...",
  },
  {
    keywords: ['power', 'electric', 'light', 'transformer', 'outage'],
    category: 'electricity',
    response: "Understood -- this seems like an electricity issue. I'll pre-fill the form for you. Redirecting now...",
  },
  {
    keywords: ['sewage', 'waste', 'garbage', 'dump', 'drain', 'trash', 'sanitation'],
    category: 'sanitation',
    response: "I understand -- a sanitation concern. Let me set up the complaint form for you. Heading there now...",
  },
];

const CivicBot = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: "Hi, I'm CivicBot. Tell me what's wrong, and I'll file the report for you." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let matched = false;

      for (const resp of botResponses) {
        if (resp.keywords.some(kw => lower.includes(kw))) {
          setMessages(prev => [...prev, { role: 'bot', text: resp.response }]);
          setTyping(false);
          matched = true;

          // Auto-redirect after a brief delay
          setTimeout(() => {
            navigate('/file-complaint');
          }, 2000);
          break;
        }
      }

      if (!matched) {
        setMessages(prev => [
          ...prev,
          {
            role: 'bot',
            text: "I need a bit more detail. Could you mention keywords like 'pothole', 'water leak', 'power outage', or 'garbage' so I can categorize your issue?",
          },
        ]);
        setTyping(false);
      }
    }, 1200);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mb-3 w-80 sm:w-96 rounded-xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '28rem' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="text-sm font-bold">CivicBot</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: '16rem' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Describe your issue..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  className="flex-1 text-sm"
                />
                <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setOpen(!open)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
        aria-label="Open CivicBot assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default CivicBot;
