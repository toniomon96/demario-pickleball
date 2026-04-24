import { redirect } from "next/navigation";
import { createServerSupabaseClient, isAdminEmail } from "@/lib/supabase/server";
import AdminShell from "../AdminShell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) redirect("/admin/login");

  return <AdminShell>{children}</AdminShell>;
}
