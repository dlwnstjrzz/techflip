import { useState } from "react";
import DeliveryToggle from "./DeliveryToggle";
import RetailerTable from "./RetailerTable";
import ShowMoreButton from "./ShowMoreButton";

export default function RetailerList({ retailers }) {
  const [includeDelivery, setIncludeDelivery] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const displayedRetailers = showAll ? retailers : retailers.slice(0, 8);

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-lg font-medium">
          <span className="text-blue-600">새상품</span> 판매처 비교
          <span className="text-sm font-normal text-gray-500">
            ({retailers.length}개)
          </span>
        </h2>
        <DeliveryToggle
          includeDelivery={includeDelivery}
          setIncludeDelivery={setIncludeDelivery}
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <RetailerTable
          retailers={displayedRetailers}
          includeDelivery={includeDelivery}
        />
      </div>

      {retailers.length > 8 && (
        <ShowMoreButton
          showAll={showAll}
          setShowAll={setShowAll}
          remainingCount={retailers.length - 8}
        />
      )}
    </div>
  );
}
