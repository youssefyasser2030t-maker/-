import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Send, 
  Mic, 
  Paperclip,
  Sun,
  Microscope,
  Pill,
  ClipboardList,
  Wallet,
  ShoppingCart,
  Bot
} from 'lucide-react';
import { SpeakerButton } from '@/components/SpeakerButton';
import { useApp } from '@/context/AppContext';

interface ChatbotScreenProps {
  onBack: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  products?: { name: string; price: number; company: string }[];
}

const quickReplies = [
  { icon: Sun, label: 'الطقس النهاردة', text: 'الطقس النهاردة إيه؟' },
  { icon: Microscope, label: 'تشخيص مرض', text: 'عايز أشخص مرض' },
  { icon: Pill, label: 'جرعة مبيد', text: 'إيه جرعة المبيد المناسبة؟' },
  { icon: ClipboardList, label: 'مهام اليوم', text: 'مهامي النهاردة إيه؟' },
  { icon: Wallet, label: 'إيراداتي', text: 'إيراداتي كام النهاردة؟' },
  { icon: ShoppingCart, label: 'اقتراح منتج', text: 'اقترحلي منتج مناسب' },
];

// AI Responses based on keywords
const getAIResponse = (userMessage: string): { content: string; products?: any[] } => {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('طقس') || lowerMsg.includes('جو') || lowerMsg.includes('حرارة')) {
    return {
      content: 'الطقس في الداخلة النهاردة مشمس مع درجة حرارة 28°C ورطوبة 45%. في تنبيه بموجة حر متوقعة بكرة، أنصحك تزود الري بنسبة 20% للأشجار.',
    };
  }
  
  if (lowerMsg.includes('مهام') || lowerMsg.includes('مهمة') || lowerMsg.includes('اليوم')) {
    return {
      content: 'عندك 5 مهام النهاردة:\n1. ري مزرعة أحمد محمود الساعة 8 ص\n2. تسميد مزرعة محمود علي الساعة 10 ص\n3. زيارة فحص لأرض السيد خالد الساعة 12 ظ\n4. رش مبيد في مزرعة عمر الساعة 3 ع\n5. متابعة محصول النخيل الجديد الساعة 5 ع',
    };
  }
  
  if (lowerMsg.includes('إيراد') || lowerMsg.includes('فلوس') || lowerMsg.includes('فلوس') || lowerMsg.includes('مبلغ')) {
    return {
      content: 'إيراداتك الشهرية لغاية دلوقتي 2,850 جنيه. ده زيادة 420 جنيه عن الشهر اللي فات. التفاصيل:\n- اشتراكات المزارعين: 1,710 ج (60%)\n- عمولات المنتجات: 712 ج (25%)\n- الباقة المميزة: 428 ج (15%)',
    };
  }
  
  if (lowerMsg.includes('منتج') || lowerMsg.includes('مبيد') || lowerMsg.includes('سماد')) {
    return {
      content: 'بناءً على أراضيك ومرحلة المحصول الحالية، ده منتجات مقترحة ليك:',
      products: [
        { name: 'سماد NPK متوازن', price: 85, company: 'النيل للأسمدة' },
        { name: 'مبيد حشري عضوي', price: 120, company: 'مصر للكيماويات' },
        { name: 'منشط جذور', price: 65, company: 'الدلتا للأسمدة' },
      ],
    };
  }
  
  if (lowerMsg.includes('مرض') || lowerMsg.includes('بياض') || lowerMsg.includes('زغبي') || lowerMsg.includes('فطري')) {
    return {
      content: 'البياض الزغبي من أكتر الأمراض انتشاراً في النخيل. أعراضه:\n- بقع بيضاء على الأوراق\n- تشوه الثمار\n- ضعف النمو\n\nللعلاج:\n1. إزالة الأوراق المصابة\n2. رش مبيد فطري\n3. تحسين التهوية',
    };
  }
  
  if (lowerMsg.includes('ري') || lowerMsg.includes('مية') || lowerMsg.includes('مياه')) {
    return {
      content: 'للنخيل في مرحلة الإزهار، محتاج:\n- ري كل 5-7 أيام في الصيف\n- ري كل 10-14 يوم في الشتاء\n- كمية 150-200 لتر لكل نخلة\n\n⚠️ مهم: زود الري 20% في موجات الحر',
    };
  }
  
  if (lowerMsg.includes('تسميد') || lowerMsg.includes('سماد') || lowerMsg.includes('غذاء')) {
    return {
      content: 'برنامج التسميد الموصى به للنخيل:\n\n🌱 مرحلة النمو: NPK 20-20-20\n🌸 مرحلة الإزهار: سماد عالي البوتاسيوم\n🫐 مرحلة العقد: سماد عالي الفوسفور\n🍊 مرحلة النضج: نترات البوتاسيوم\n\nالجرعة: 2-3 كجم لكل نخلة',
    };
  }
  
  if (lowerMsg.includes('سلام') || lowerMsg.includes('صباح') || lowerMsg.includes('مساء') || lowerMsg.includes('أهلا')) {
    return {
      content: 'أهلاً بيك! أنا زيد، مساعدك الزراعي الذكي. إزاي أقدر أساعدك النهاردة؟',
    };
  }
  
  // Default response
  return {
    content: 'فهمت سؤالك. بناءً على خبرتي في الزراعة المصرية، أنصحك تتابع حالة المحصول بشكل دوري وتسجل أي تغيرات تلاحظها. لو عندك سؤال أكثر تحديداً عن:\n- الطقس والري\n- الأمراض والتشخيص\n- المنتجات الزراعية\n- المهام والزيارات\n\nأنا هنا للمساعدة! 🌱',
  };
};

export function ChatbotScreen({ onBack }: ChatbotScreenProps) {
  const { currentUser } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `صباح الخير ${currentUser?.displayName?.split(' ')[0] || 'دكتور'} 🌿\n\nعندك 5 زيارات النهاردة. في تنبيه مهم: أحمد محمود عنده بياض زغبي محتمل يحتاج انتباهك.\n\nإزاي أقدر أساعدك؟`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        products: aiResponse.products,
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleQuickReply = (text: string) => {
    setInputValue(text);
    setTimeout(() => handleSend(), 100);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // In a real app, this would use SpeechRecognition API
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue('الطقس النهاردة إيه؟');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A120A] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          
          {/* Robot Avatar */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #1B5E20, #43A047)',
                border: '2px solid #F9A825'
              }}
            >
              <Bot size={28} className="text-white" />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#43A047]"
              animate={{ scale: [1, 1.2], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-white text-xl font-bold">زيد</h1>
            <p className="text-[#A5D6A7] text-sm">مساعدك الزراعي الذكي</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[#A5D6A7] text-xs">متاح الآن</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index === 0 ? 0 : 0.1 }}
            className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#43A047] flex items-center justify-center mr-2 flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
              <div 
                className={`p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white rounded-tl-none'
                    : 'bg-[#1a2a1a] border border-[#43A047]/30 text-white rounded-tr-none'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                
                {message.role === 'assistant' && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <SpeakerButton text={message.content} size="sm" />
                  </div>
                )}
              </div>
              
              {/* Products */}
              {message.products && message.products.length > 0 && (
                <div className="mt-3">
                  <p className="text-[#A5D6A7] text-xs mb-2">🛒 منتجات مقترحة</p>
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                    {message.products.map((product, i) => (
                      <div key={i} className="flex-shrink-0 w-32 bg-white rounded-xl p-3">
                        <p className="text-[#1A1A1A] text-xs font-bold">{product.name}</p>
                        <p className="text-gray-500 text-xs">{product.company}</p>
                        <p className="text-[#1B5E20] font-bold text-sm mt-1">{product.price} ج</p>
                        <button className="w-full mt-2 py-1 bg-[#F9A825] rounded-lg text-xs font-bold">
                          اشتري
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <span className="text-[#A5D6A7] text-xs mt-1 block">
                {message.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
        
        {/* AI Typing Indicator */}
        {messages[messages.length - 1]?.role === 'user' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end"
          >
            <div className="bg-[#1a2a1a] border border-[#43A047]/30 rounded-2xl rounded-tr-none p-4">
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#43A047]"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                  className="w-2 h-2 rounded-full bg-[#43A047]"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-[#43A047]"
                />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-6 py-2">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply.text)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border border-[#43A047] rounded-full text-[#A5D6A7] text-sm hover:bg-[#2E7D32] hover:text-white transition-colors"
            >
              <reply.icon size={16} />
              {reply.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="px-6 py-4 bg-white/5 backdrop-blur-lg border-t border-[#43A047]/20">
        <div className="flex items-center gap-3">
          {/* Voice Button */}
          <button
            onClick={handleVoiceInput}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isRecording 
                ? 'bg-red-500 animate-pulse' 
                : 'border-2 border-[#43A047] text-[#43A047]'
            }`}
          >
            <Mic size={20} />
          </button>
          
          {/* Attach Button */}
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#A5D6A7]">
            <Paperclip size={20} />
          </button>
          
          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اسأل زيد أي سؤال..."
              className="w-full h-12 px-4 bg-white/10 rounded-full text-white placeholder-[#A5D6A7] text-right focus:outline-none focus:ring-2 focus:ring-[#43A047]/50"
              dir="rtl"
            />
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              inputValue.trim()
                ? 'bg-gradient-to-br from-[#43A047] to-[#F9A825] text-white'
                : 'bg-gray-700 text-gray-500'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        
        {/* Recording Indicator */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center mt-2"
            >
              <span className="text-red-400 text-sm">بيسمعك...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
