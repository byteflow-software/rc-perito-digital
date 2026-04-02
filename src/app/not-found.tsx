import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="text-center">
        <p className="font-mono text-6xl md:text-8xl font-bold text-neon mb-4">
          404
        </p>
        <h1 className="font-mono text-xl text-text-primary mb-2">
          Página não encontrada
        </h1>
        <p className="text-text-muted text-sm mb-8 font-mono">
          &gt; ERROR: O recurso solicitado não existe neste sistema.
        </p>
        <Link href="/">
          <Button variant="secondary" terminal>
            VOLTAR AO INICIO
          </Button>
        </Link>
      </div>
    </div>
  );
}
