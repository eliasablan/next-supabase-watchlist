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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            My Watch List
          </h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default watchlist;
