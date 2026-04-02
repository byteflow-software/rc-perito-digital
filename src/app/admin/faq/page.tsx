"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import toast from "react-hot-toast";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  displayOrder: number;
}

const mockFaqs: FaqItem[] = [
  { id: "1", question: "O que é forense digital?", answer: "Forense digital é a disciplina que aplica técnicas de investigação para coletar e analisar evidências digitais.", published: true, displayOrder: 0 },
  { id: "2", question: "Como contratar uma perícia?", answer: "Entre em contato pelo email ou WhatsApp disponível no site.", published: true, displayOrder: 1 },
  { id: "3", question: "Qual a duração do curso OSINT?", answer: "O curso tem mais de 60 horas de conteúdo entre aulas teóricas e práticas.", published: true, displayOrder: 2 },
];

export default function AdminFaqPage() {
  const [faqs] = useState<FaqItem[]>(mockFaqs);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", published: true });

  function startNew() {
    setEditing(null);
    setForm({ question: "", answer: "", published: true });
  }

  function startEdit(faq: FaqItem) {
    setEditing(faq);
    setForm({ question: faq.question, answer: faq.answer, published: faq.published });
  }

  async function handleSave() {
    if (!form.question || !form.answer) { toast.error("Pergunta e resposta obrigatórias"); return; }
    // TODO: Call API
    toast.success(editing ? "FAQ atualizada" : "FAQ criada");
    setEditing(null);
    setForm({ question: "", answer: "", published: true });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-xl font-bold text-text-primary"><span className="text-neon">&gt;</span> FAQ</h1>
          <p className="text-text-muted text-xs font-mono mt-1">Gerenciar perguntas frequentes</p>
        </div>
        <Button variant="primary" size="sm" onClick={startNew} terminal>
          <Plus className="w-4 h-4" />NOVA PERGUNTA
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              onClick={() => startEdit(faq)}
              className="bg-bg-card border border-border p-4 cursor-pointer hover:border-neon/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm text-text-primary mb-1">{faq.question}</p>
                  <p className="text-text-muted text-xs line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`w-2 h-2 rounded-full ${faq.published ? "bg-status-published" : "bg-status-hidden"}`} />
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteId(faq.id); }}
                    className="font-mono text-[10px] text-text-muted hover:text-status-hidden transition-colors"
                  >
                    [DEL]
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="bg-bg-card border border-border p-6 space-y-4">
          <p className="font-mono text-xs text-neon uppercase tracking-widest">
            {editing ? "Editar FAQ" : "Nova FAQ"}
          </p>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Pergunta</label>
            <Input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">Resposta</label>
            <Textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={5} />
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} />
            <label className="text-xs font-mono text-text-secondary">Publicada</label>
          </div>
          <Button variant="primary" size="sm" onClick={handleSave} terminal>SALVAR</Button>
        </div>
      </div>

      <DeleteDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { toast.success("FAQ excluída"); }} title="Excluir FAQ" />
    </div>
  );
}
