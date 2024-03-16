"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function addWatch(formData: FormData) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) {
    console.error("User is not authenticated within addWatch server action");
    return;
  }

  const brand = formData.get("brand")?.toString();
  const model = formData.get("model")?.toString();
  const referenceNumber = formData.get("referenceNumber")?.toString();

  const { data, error } = await supabase
    .from("watches")
    .insert([
      { brand, model, reference_number: referenceNumber, user_id: user.id },
    ]);

  if (error) {
    console.error("Error inserting data", error);
    return;
  }

  revalidatePath("/watch-list");

  return { message: "Success" };
}
