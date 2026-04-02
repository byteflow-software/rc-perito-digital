"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Inscrição realizada com sucesso!");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao se inscrever");
      }
    } catch {
      toast.error("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-border bg-bg-card p-6 md:p-8">
      <h3 className="font-mono text-sm text-neon mb-2 tracking-wider">
        &gt; NEWSLETTER
      </h3>
      <p className="text-text-secondary text-sm mb-4">
        Inscreva-se na minha newsletter para receber conteúdo exclusivo.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Seu e-mail mais acessado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" variant="primary" disabled={loading} terminal>
          {loading ? "..." : "INSCREVER-SE"}
        </Button>
      </form>
    </div>
  );
}
