import { createClient } from "@/utils/supabase/server"; // Use server client
import { redirect } from "next/navigation";
import AdminPanel from "@/app/admin/AdminPanel"; // Import Client Component

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: urls, error } = await supabase.from("shortened_urls").select("*");
  if (error) {
    console.error("Error fetching URLs:", error);
    return <div>Error fetching URLs.</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="font-bold text-2xl mb-4">Admin Panel</h1>
      <AdminPanel urls={urls} user={user} />
    </div>
  );
}
