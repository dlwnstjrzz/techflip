import { useState, useMemo } from "react";
import UsedItemCard from "./UsedItemCard";
import { cn } from "@/lib/utils";

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

export default function UsedList({ items = [] }) {
  const [selectedPlatform, setSelectedPlatform] = useState("joonggonara");

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.platform === selectedPlatform);
  }, [items, selectedPlatform]);

  // 플랫폼별 아이템 수 계산
  const platformCounts = useMemo(() => {
    return {
      joonggonara: items.filter((item) => item.platform === "joonggonara")
        .length,
      bunjang: items.filter((item) => item.platform === "bunjang").length,
    };
  }, [items]);

  return (
    <div className="space-y-6">
      {/* 플랫폼 필터 */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-gray-100/80 rounded-xl">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
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
  );
}
