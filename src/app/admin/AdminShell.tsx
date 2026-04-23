"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <nav className="topnav">
        <div className="brand">
          <div className="brand-mark">D</div>
          <span>
            Admin<span style={{ color: "var(--fg-muted)" }}> / Dashboard</span>
          </span>
        </div>
        <button
          className="btn btn-ghost"
          onClick={signOut}
          style={{ padding: "8px 14px", fontSize: 13 }}
        >
          Sign out
        </button>
      </nav>
      {children}
    </div>
  );
}
