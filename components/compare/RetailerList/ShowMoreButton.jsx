import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShowMoreButton({
  showAll,
  setShowAll,
  remainingCount,
}) {
  return (
    <div className="relative mt-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className={cn(
          "relative inline-flex items-center justify-center gap-1.5 text-sm font-medium",
          "px-4 py-2 bg-white border rounded-full mx-auto",
          "text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-colors",
          "shadow-sm hover:shadow"
        )}
      >
        {showAll ? (
          <>
            접기
            <ChevronUp className="w-4 h-4 stroke-[2]" />
          </>
        ) : (
          <>
            {remainingCount}개 더보기
            <ChevronDown className="w-4 h-4 stroke-[2]" />
          </>
        )}
      </button>
    </div>
  );
}
