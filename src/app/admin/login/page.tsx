"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircuitDecoration } from "@/components/shared/circuit-decoration";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Credenciais inválidas");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      <CircuitDecoration position="top-left" className="w-48 h-48 opacity-30" />
      <CircuitDecoration position="bottom-right" className="w-48 h-48 opacity-30" />

      <div className="w-full max-w-md bg-bg-card border border-border p-8 relative">
        <div className="scanline-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10">
          <h1 className="font-mono text-2xl font-bold text-neon text-center mb-2">
            CYBER-NOIR ADMIN
          </h1>
          <p className="text-text-muted text-center text-sm font-mono mb-8">
            SYSTEM ACCESS REQUIRED
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rcperitodigital.com.br"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-status-hidden text-xs font-mono text-center">
                {`> ERROR: ${error}`}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
              terminal
            >
              {loading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-text-muted text-[10px] font-mono text-center">
              ENCRYPTION: AES-256 | PROTOCOL: TLS 1.3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
