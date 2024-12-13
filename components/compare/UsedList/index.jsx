import { useState } from "react";
import UsedItemCard from "./UsedItemCard";
import ShowMoreButton from "../RetailerList/ShowMoreButton";

export default function UsedList({ items }) {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 8);

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-medium">
          <span className="text-gray-600">중고매물</span> 시세 비교
          <span className="text-sm font-normal text-gray-500">
            ({items.length}개)
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {displayedItems.map((item) => (
          <UsedItemCard key={item.id} item={item} />
        ))}
      </div>

      {items.length > 8 && (
        <ShowMoreButton
          showAll={showAll}
          setShowAll={setShowAll}
          remainingCount={items.length - 8}
        />
      )}
    </div>
  );
}
