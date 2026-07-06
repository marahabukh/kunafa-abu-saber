"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("البريد أو كلمة المرور غلط. جرّبي مرة ثانية.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-base px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface rounded-2xl p-8 border border-white/10"
      >
        <h1 className="font-display text-3xl text-copper mb-1 text-center">
          دخول لوحة التحكم
        </h1>
        <p className="text-cream/50 text-sm text-center mb-6">
          كنافة أبو صابر
        </p>

        <label className="block mb-4">
          <span className="block text-sm text-cream/70 mb-1">البريد الإلكتروني</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-base border border-white/10 px-4 py-2 text-cream focus:border-gold outline-none"
            dir="ltr"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm text-cream/70 mb-1">كلمة المرور</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-base border border-white/10 px-4 py-2 text-cream focus:border-gold outline-none"
            dir="ltr"
          />
        </label>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-copper hover:bg-gold transition-colors text-base font-bold py-3 disabled:opacity-50"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </main>
  );
}
