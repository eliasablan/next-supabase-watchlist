"use client";

import { SocialAuth } from "@supabase/auth-ui-react";
import { createClient } from "@/utils/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState, useEffect } from "react";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export default function AuthForm() {
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse flex space-x-4 rounded-lg border my-3 py-2 justify-center items-center">
        <div className="rounded-full bg-slate-200 h-6 w-6"></div>
        <div className="h-3 w-44 bg-slate-200 rounded"></div>
      </div>
    );
  }

  console.log("url:", getURL());

  return (
    <SocialAuth
      supabaseClient={supabase}
      providers={["google"]}
      redirectTo={getURL() + "auth/callback"}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "red",
              brandAccent: "darkred",
            },
          },
        },
      }}
    />
  );
}
