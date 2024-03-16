"use client";
import { useRef } from "react";
import addWatch from "@/server-actions/addWatch";

export default function WatchForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addWatch(formData);
        ref.current?.reset();
      }}
      className="mb-6"
    >
      <div className="mb-4">
        <label htmlFor="brand" className="block mb-2">
          Brand
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          className="shadow appearance-none bg-gray-700 text-white rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block mb-2">
          Model
        </label>
        <input
          type="text"
          id="model"
          name="model"
          className="shadow appearance-none bg-gray-700 text-white rounded w-full py-2 px-3"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="referenceNumber" className="block mb-2">
          Reference Number
        </label>
        <input
          type="text"
          id="referenceNumber"
          name="referenceNumber"
          className="shadow appearance-none bg-gray-700 text-white rounded w-full py-2 px-3"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-300 text-white hover:text-black font-bold py-2 px-4 rounded"
      >
        Add Watch
      </button>
    </form>
  );
}
