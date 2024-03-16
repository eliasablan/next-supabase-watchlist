"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateWatch(formData: FormData) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) {
    console.error("User is not authenticated within updateWatch server action");
    return;
  }

  const id = formData.get("id")?.toString();
  const brand = formData.get("brand")?.toString();
  const model = formData.get("model")?.toString();
  const referenceNumber = formData.get("referenceNumber")?.toString();

  const { data, error } = await supabase
    .from("watches")
    .update({ brand, model, reference_number: referenceNumber })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  revalidatePath("/watch-list");

  return { message: "Success" };
}
