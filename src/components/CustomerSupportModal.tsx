import React, { useState } from 'react';
import { 
  X, 
  MessageSquareHeart, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Truck,
  RotateCcw,
  CreditCard
} from 'lucide-react';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTracker: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose,
  onOpenTracker
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! Welcome to Nobel Conect Customer Support. How can we help connect you to better shopping today? You can ask about payment security, live order tracking, or return policies.",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    { text: 'How secure is payment checkout?', icon: ShieldCheck },
    { text: 'How does real-time GPS tracking work?', icon: Truck },
    { text: 'What is your 30-day return policy?', icon: RotateCcw },
    { text: 'What payment methods do you accept?', icon: CreditCard }
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate responsive bot reply
    setTimeout(() => {
      let reply = "Thank you for reaching out! Our dedicated Nobel Conect team is available 24/7. Is there anything else we can assist you with?";
      const lower = text.toLowerCase();

      if (lower.includes('payment') || lower.includes('secure') || lower.includes('gateway') || lower.includes('card')) {
        reply = "At Nobel Conect, all payments are protected with 256-bit SSL encryption and tokenized via PCI-DSS Level 1 certified gateways (including Visa, Mastercard, Apple Pay, Google Pay, PayPal, and Klarna). We never store raw card numbers on our servers.";
      } else if (lower.includes('track') || lower.includes('order') || lower.includes('gps') || lower.includes('delivery')) {
        reply = "Every order receives a unique Tracking ID. You can watch the live courier van move on our GPS route radar, view checkpoint milestones, and receive SMS alerts directly to your phone!";
      } else if (lower.includes('return') || lower.includes('refund') || lower.includes('warranty')) {
        reply = "All products come with a 30-day hassle-free money-back guarantee and a 12-to-60 month Nobel manufacturer warranty against defects. Returns are free with pre-paid shipping labels.";
      } else if (lower.includes('shipping') || lower.includes('delivery time')) {
        reply = "We offer Free Nobel Standard Delivery (3–5 business days) on orders over $50, Priority Express (1–2 business days), and Same-Day Metro Dispatch for select regions.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="customer-support-modal"
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base font-['Outfit']">
                  Nobel Conect Support
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Friendly customer service • Avg response: &lt; 1 min
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                msg.sender === 'user' 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-indigo-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-2xs'
                }`}>
                  {msg.text}
                </div>
                <span className={`text-[10px] text-slate-400 block mt-0.5 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick FAQs Chips */}
        <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 shrink-0">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-full text-[11px] font-medium shrink-0 transition-colors border border-slate-200 cursor-pointer"
            >
              {q.text}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-indigo-600"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
