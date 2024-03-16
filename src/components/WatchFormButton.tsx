import React from "react";
import { useFormStatus } from "react-dom";

export default function WatchFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded"
    >
      {pending ? "Adding..." : "Add Watch"}
    </button>
  );
}
