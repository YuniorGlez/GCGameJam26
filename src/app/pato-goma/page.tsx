"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, ArrowLeft, Zap, Bot, User } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function PatoGomaPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Cuac! Soy tu Pato de Goma experto. Cuéntame ese problema que te está volviendo loco en esta Jam. ¿Qué es lo que debería estar pasando y qué ocurre en realidad?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/pato-goma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del pato");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lo siento, me he quedado sin aire de tanto nadar. ¿Podrías repetirlo? (Error de conexión)" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex flex-col">
      <Link
        href="/"
        className="flex items-center gap-2 text-island-cyan hover:text-white transition-colors mb-8 w-fit group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-heading text-sm uppercase tracking-widest">Volver al Radar</span>
      </Link>

      <div className="flex-1 flex flex-col min-h-0">
        <header className="mb-8 space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-island-cyan/20 text-island-cyan shadow-[4px_4px_0px_currentColor]">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading text-white neon-text-cyan">
              Pato de Goma <span className="text-island-magenta">Interactivo</span>
            </h1>
          </div>
          <p className="text-white/60 font-body max-w-2xl italic">
            "Si no puedes explicárselo a un pato de goma, no lo entiendes lo suficiente." - El zen del Jammer.
          </p>
        </header>

        <div className="flex-1 flex flex-col poster-card overflow-hidden border-island-cyan/30">
          {/* Chat Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`mt-1 p-2 h-fit shrink-0 ${
                      msg.role === "user" 
                      ? "bg-island-magenta/20 text-island-magenta shadow-[2px_2px_0px_currentColor]" 
                      : "bg-island-cyan/20 text-island-cyan shadow-[2px_2px_0px_currentColor]"
                    }`}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`glass-panel p-4 rounded-none border-white/5 ${
                      msg.role === "user" 
                      ? "border-island-magenta/30 bg-island-magenta/5" 
                      : "border-island-cyan/30 bg-island-cyan/5"
                    }`}>
                      <p className="text-white/90 font-body text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 items-center text-island-cyan/50 font-body text-sm">
                    <div className="p-2 bg-island-cyan/10 animate-pulse">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span>El pato está procesando...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-black/20">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Explica tu problema paso a paso..."
                className="flex-1 bg-island-dark/50 border border-white/10 p-4 font-body text-white focus:outline-none focus:border-island-cyan transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-island-cyan text-island-dark px-6 font-heading font-bold flex items-center gap-2 hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="hidden md:inline">ENVIAR</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 181, 226, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 181, 226, 0.5);
        }
      `}</style>
    </main>
  );
}
