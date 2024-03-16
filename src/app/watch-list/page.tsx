import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const watchlist = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/");
  }

  return <div>watchlist</div>;
};

export default watchlist;
