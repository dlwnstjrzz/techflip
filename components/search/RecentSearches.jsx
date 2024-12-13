"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  getRecentSearches,
  removeRecentSearch,
  clearRecentSearches,
} from "@/lib/recentSearches";

export default function RecentSearches({ onSelect, onUpdate }) {
  const [searches, setSearches] = useState(getRecentSearches());

  const handleRemove = (searchQuery) => {
    removeRecentSearch(searchQuery);
    setSearches(getRecentSearches());
    onUpdate();
  };

  const handleClearAll = () => {
    clearRecentSearches();
    setSearches([]);
    onUpdate();
  };

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">최근 검색어</h3>
          <button
            onClick={handleClearAll}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            지우기
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {searches.map((searchQuery) => (
            <div
              key={searchQuery}
              className="group flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
            >
              <span
                className="cursor-pointer"
                onClick={() => onSelect(searchQuery)}
              >
                {searchQuery}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(searchQuery);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
