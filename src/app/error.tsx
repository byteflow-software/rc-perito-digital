"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="text-center">
        <p className="font-mono text-6xl md:text-8xl font-bold text-status-hidden mb-4">
          500
        </p>
        <h1 className="font-mono text-xl text-text-primary mb-2">
          Erro interno
        </h1>
        <p className="text-text-muted text-sm mb-8 font-mono">
          &gt; ERROR: Falha inesperada no sistema. Tente novamente.
        </p>
        <Button variant="secondary" onClick={reset} terminal>
          TENTAR NOVAMENTE
        </Button>
      </div>
    </div>
  );
}
