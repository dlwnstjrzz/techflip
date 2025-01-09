import { useState, useMemo, useRef } from "react";
import UsedItemCard from "./UsedItemCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLATFORMS = [
  {
    id: "joonggonara",
    label: "네이버 카페",
    icon: "N",
    iconClass: "font-extrabold text-[#03C75A]",
  },
  {
    id: "bunjang",
    label: "번개장터",
    icon: "⚡️",
  },
];

export default function UsedList({ items = [], pagination, onPageChange }) {
  const [selectedPlatform, setSelectedPlatform] = useState("joonggonara");
  const listRef = useRef(null);

  const filteredItems = useMemo(() => {
    return items[selectedPlatform] || [];
  }, [items, selectedPlatform]);

  // 플랫폼별 아이템 수 계산
  const platformCounts = useMemo(() => {
    return {
      joonggonara: items.joonggonara?.length || 0,
      bunjang: items.bunjang?.length || 0,
    };
  }, [items]);

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
    if (onPageChange) {
      onPageChange(platform, 1);
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(selectedPlatform, newPage);
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentPagination = pagination?.[selectedPlatform];

  return (
    <div className="space-y-6" ref={listRef}>
      {/* 플랫폼 필터 */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-gray-100/80 rounded-xl">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformChange(platform.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all",
                selectedPlatform === platform.id
                  ? "bg-white shadow-sm text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <span className={cn("text-base", platform.iconClass)}>
                {platform.icon}
              </span>
              <span>{platform.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded-md transition-colors",
                  selectedPlatform === platform.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200/80 text-gray-600"
                )}
              >
                {platformCounts[platform.id]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 상품 목록 */}
      <div>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <UsedItemCard key={`${item.platform}-${item.id}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">매물이 없습니다</div>
        )}
      </div>

      {/* 페이지네이션 추가 */}
      {currentPagination && currentPagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPagination.currentPage - 1)}
            disabled={currentPagination.currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from(
              { length: currentPagination.totalPages },
              (_, i) => i + 1
            )
              .filter(
                (pageNum) =>
                  pageNum === 1 ||
                  pageNum === currentPagination.totalPages ||
                  Math.abs(pageNum - currentPagination.currentPage) <= 2
              )
              .map((pageNum, index, array) => (
                <div key={pageNum}>
                  {index > 0 && array[index - 1] !== pageNum - 1 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <Button
                    variant={
                      pageNum === currentPagination.currentPage
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                </div>
              ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPagination.currentPage + 1)}
            disabled={
              currentPagination.currentPage === currentPagination.totalPages
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
