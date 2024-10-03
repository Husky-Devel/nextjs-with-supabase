"use client"; // This component will run on the client

import { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Use client-side Supabase client

export default function AdminPanel({ urls, user }) {
  const [newShortUrl, setNewShortUrl] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [updatedUrls, setUpdatedUrls] = useState(urls); // Store fetched URLs

  const handleCreateUrl = async (e) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase.from("shortened_urls").insert([
      { short_url: newShortUrl, destination: newDestination },
    ]);

    if (error) {
      console.error("Error creating URL:", error);
    } else {
      // Update the local state to reflect the new URL
      setUpdatedUrls((prev) => [
        ...prev,
        { short_url: newShortUrl, destination: newDestination },
      ]);
      setNewShortUrl("");
      setNewDestination("");
    }
  };

  return (
    <div className="flex flex-col gap-4">

      <h2 className="font-bold text-2xl mb-4">Create a new Shortened URL</h2>
      <form onSubmit={handleCreateUrl} className="flex gap-4">
        <input
          type="text"
          value={newShortUrl}
          onChange={(e) => setNewShortUrl(e.target.value)}
          placeholder="Short URL"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)}
          placeholder="Destination URL"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create
        </button>
      </form>

      <h2 className="font-bold text-2xl mb-4">Shortened URLs</h2>
      <ul className="space-y-4">
        {updatedUrls.map((url, index) => (
          <li key={index} className="border p-4 rounded">
            <div className="flex justify-between">
              <span>{url.short_url}</span>
              <span>{url.destination}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
