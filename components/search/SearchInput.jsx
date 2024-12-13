"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchSuggestions } from "@/app/data/mockSuggestions";
import { useDebounce } from "@/hooks/useDebounce";
import { addRecentSearch } from "@/lib/recentSearches";
import { cn } from "@/lib/utils";

export default function SearchInput({ className }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedQuery.length < 1) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }
      const results = await fetchSuggestions(debouncedQuery);
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

  if (!mounted) {
    return (
      <div className="relative w-full">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="검색어를 입력하세요..."
            className="pl-8"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="제품을 검색해보세요!"
            className={cn("pl-12", className)}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsSearching(false);
              if (e.target.value.length > 0 && !isSearching) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            }}
          />
        </div>
      </form>

      {/* 자동완성 드롭다운 - 단순 목록 */}
      {!isSearching && isOpen && suggestions.length > 0 && (
        <div className="absolute top-full w-full mt-1 py-2 bg-white rounded-lg border shadow-lg z-50">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setIsSearching(true);
                setQuery(suggestion.text);
                addRecentSearch(suggestion.text);
                router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
                setIsOpen(false);
                setSuggestions([]);
              }}
            >
              <div className="text-sm">{suggestion.text}</div>
              <div className="text-xs text-muted-foreground">
                {suggestion.type === "brand" && "브랜드"}
                {suggestion.type === "product" && "제품"}
                {suggestion.type === "trending" && "인기 검색어"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
