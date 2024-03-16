"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function deleteWatch(formData: FormData) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) {
    console.error("User is not authenticated within deleteWatch server action");
    return;
  }

  const watchId = formData.get("id")?.toString();

  const { data, error } = await supabase
    .from("watches")
    .delete()
    .match({ id: watchId, user_id: user.id });

  if (error) {
    console.error("Error deleting data", error);
    return;
  }

  revalidatePath("/watch-list");

  return { message: "Success" };
}
