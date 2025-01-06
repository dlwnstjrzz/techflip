"use client";

import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { History, ArrowLeft } from "lucide-react";
import SearchInput from "@/components/search/SearchInput";
import RecentSearches from "@/components/search/RecentSearches";
import { cn } from "@/lib/utils";
import { getRecentSearches } from "@/lib/recentSearches";
import Image from "next/image";
export default function Header({ showOnlyInSubPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const isComparePage = pathname.startsWith("/compare/");
  const [mounted, setMounted] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  console.log("pathname", pathname);
  useEffect(() => {
    setMounted(true);
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSearchesUpdate = () => {
    setRecentSearches(getRecentSearches());
  };

  // 메인 페이지에서는 헤더를 숨김
  if (
    (showOnlyInSubPages && pathname === "/") ||
    pathname.includes("compare")
  ) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="container mx-auto px-4">
          <div
            className={cn(
              "flex items-center justify-between gap-4",
              isComparePage ? "h-10" : "h-14"
            )}
          >
            {isComparePage ? (
              <button
                onClick={() => router.back()}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-6" />
              </button>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2 font-kanit tracking-tight text-foreground"
              >
                DAMOA
                {/* <Image
                  width={250}
                  height={40}
                  src="/images/damoa_logo.jpeg"
                  alt="Damoa"
                /> */}
              </Link>
            )}

            {!isComparePage && pathname !== "/" && (
              <div className="flex-1 max-w-xl">
                <SearchInput />
              </div>
            )}
          </div>
        </div>
      </header>
      {!isComparePage &&
        pathname === "/search" &&
        recentSearches.length > 0 && (
          <RecentSearches
            onSelect={(query) =>
              router.push(`/search?q=${encodeURIComponent(query)}`)
            }
            onUpdate={handleSearchesUpdate}
          />
        )}
    </>
  );
}
