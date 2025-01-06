"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { addRecentSearch } from "@/lib/recentSearches";

export default function MainSearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query.trim());
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-white rounded-lg shadow-lg 
        ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500 
        transition duration-200"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="어떤 전자제품을 찾으시나요?"
        className={cn(
          "w-full h-14 pl-5 pr-12",
          "rounded-lg border-0",
          "text-lg placeholder:text-gray-400",
          "focus:outline-none focus:ring-0",
          "bg-transparent"
        )}
      />
      <button
        type="submit"
        className="absolute right-3 p-2 text-gray-400 hover:text-blue-600
          transition duration-200"
      >
        <Search className="w-6 h-6" />
      </button>
      <div
        className="absolute -bottom-px left-1/2 w-0 h-0.5 
        bg-gradient-to-r from-blue-600 to-violet-600
        group-focus-within:w-[calc(100%-16px)] -translate-x-1/2
        transition-all duration-300"
      />
    </form>
  );
}
