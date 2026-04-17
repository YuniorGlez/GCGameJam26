"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: number;
  text: string;
  type: "added" | "discarded";
  timestamp: string;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, text: "Añadida mecánica de doble salto gravitacional.", type: "added", timestamp: "Viernes 20:30" },
    { id: 2, text: "Descartado multijugador local por falta de tiempo.", type: "discarded", timestamp: "Viernes 21:15" }
  ]);
  const [newLog, setNewLog] = useState("");

  const addLog = (type: "added" | "discarded") => {
    if (!newLog) return;
    const entry: LogEntry = {
      id: Date.now(),
      text: newLog,
      type,
      timestamp: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };
    setLogs([entry, ...logs]);
    setNewLog("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-neon/70 hover:text-island-neon transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">GDD <span className="text-island-neon">Logs</span></h1>
        <p className="text-foreground/60 font-body">
          Documenta las decisiones críticas del equipo para el Pitch final.
        </p>
      </section>

      <div className="space-y-4">
        <textarea
          value={newLog}
          onChange={(e) => setNewLog(e.target.value)}
          placeholder="Escribe una decisión o cambio de mecánica..."
          className="w-full h-24 bg-island-dark/50 border border-white/10 rounded-xl p-4 font-body text-white focus:outline-none focus:border-island-neon transition-all resize-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => addLog("added")}
            className="flex items-center justify-center bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50 py-3 rounded-xl font-heading text-xs transition-all"
          >
            <Plus className="w-4 h-4 mr-2" /> AÑADIR MECÁNICA
          </button>
          <button
            onClick={() => addLog("discarded")}
            className="flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 py-3 rounded-xl font-heading text-xs transition-all"
          >
            <Trash2 className="w-4 h-4 mr-2" /> DESCARTAR IDEA
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-4 rounded-xl border flex items-start gap-4 ${
                log.type === "added" ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"
              }`}
            >
              {log.type === "added" ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <p className="text-sm font-body text-white/90">{log.text}</p>
                <span className="text-[10px] font-heading text-white/30 uppercase mt-1 block">{log.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
