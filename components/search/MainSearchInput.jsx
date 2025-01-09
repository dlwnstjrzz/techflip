"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { addRecentSearch } from "@/lib/recentSearches";
import { useDebounce } from "@/hooks/useDebounce";

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-blue-600 font-medium">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function MainSearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedQuery.length < 1) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }
      const response = await fetch(
        `/api/enuri/related?q=${encodeURIComponent(debouncedQuery)}`
      );
      const data = await response.json();
      const results = data.suggestions || [];
      setSuggestions(results);
      setIsOpen(true);
    };

    getSuggestions();
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      addRecentSearch(query.trim());
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white rounded-lg shadow-lg 
          ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500 
          transition duration-200"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsSearching(false);
          }}
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
      </form>

      {/* 자동완성 드롭다운 */}
      {!isSearching && isOpen && suggestions.length > 0 && (
        <div
          className="absolute top-full w-full mt-2 py-1.5 bg-white/95 rounded-xl border shadow-xl z-50 
          border-gray-200/50 backdrop-blur-sm ring-1 ring-black/5"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2.5 hover:bg-gray-50/80 cursor-pointer group transition-all text-left
                relative after:absolute after:inset-x-4 after:bottom-0 after:h-[1px] 
                after:bg-gray-100 last:after:hidden"
              onClick={() => {
                setIsSearching(true);
                setQuery(suggestion.text);
                addRecentSearch(suggestion.text);
                router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
                setIsOpen(false);
                setSuggestions([]);
              }}
            >
              <div>
                <div
                  className="text-[0.925rem] flex-1 text-gray-600 group-hover:text-gray-900
                  transition-colors flex items-center"
                >
                  {highlightMatch(suggestion.text, query)}
                  {suggestion.isPopular && (
                    <span
                      className="text-xs ml-2 bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full 
                      font-medium inline-flex items-center group-hover:bg-red-100/80 transition-colors"
                    >
                      인기
                    </span>
                  )}
                </div>
                {suggestion.type === "history" && suggestion.date && (
                  <div className="text-xs text-gray-400 mt-0.5 pl-0.5">
                    {suggestion.date}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="px-4 py-2 mt-0.5 text-[0.7rem] text-gray-400 border-t border-gray-100">
            문의사항이 있다면 qny123@naver.com으로 연락주세요
          </div>
        </div>
      )}
    </div>
  );
}
