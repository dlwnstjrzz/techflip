import { cn } from "@/lib/utils";

export default function DeliveryToggle({
  includeDelivery,
  setIncludeDelivery,
}) {
  return (
    <div className="flex items-center text-sm bg-gray-50 px-3 py-2 rounded-lg">
      <label className="flex items-center gap-2 cursor-pointer">
        <div
          className={cn(
            "w-8 h-4 rounded-full transition-colors relative",
            includeDelivery ? "bg-blue-500" : "bg-gray-300"
          )}
          onClick={() => setIncludeDelivery(!includeDelivery)}
        >
          <div
            className={cn(
              "absolute w-3 h-3 bg-white rounded-full top-0.5 transition-all",
              includeDelivery ? "left-[18px]" : "left-0.5"
            )}
          />
        </div>
        <span>배송비 포함</span>
      </label>
    </div>
  );
}
