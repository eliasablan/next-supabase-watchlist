import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import AuthForm from "@/components/AuthForm";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/watch-list");
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto p-6 sm:p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Welcome to Watch List
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your personal space to curate and manage a wishlist of your favorite
          watches. Sign in to create, view, edit and delete items from your
          watchlist.
        </p>
        <div className="p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
