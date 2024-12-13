import { cn } from "@/lib/utils";

export default function RetailerTable({ retailers, includeDelivery }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b bg-gray-50">
          <th className="text-left p-4 font-medium w-[35%]">판매처</th>
          {includeDelivery && (
            <th className="text-left p-2 font-medium w-[25%]">배송비</th>
          )}
          <th className="text-right p-4 font-medium w-[40%]">판매가</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {retailers.map((retailer, index) => (
          <tr
            key={retailer.name}
            className={cn(
              "bg-white hover:bg-gray-50 transition-colors",
              index === 0 && "bg-blue-50"
            )}
          >
            <td className="p-4">
              <div className="flex items-center gap-2">
                {retailer.image ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={retailer.image}
                      alt={retailer.name}
                      className="w-14 h-7 object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-medium">{retailer.name}</span>
                )}
              </div>
            </td>
            {includeDelivery && (
              <td className="p-2 text-left tabular-nums text-muted-foreground">
                {retailer.deliveryFee
                  ? `+${retailer.deliveryFee.toLocaleString()}원`
                  : "무료"}
              </td>
            )}
            <td className="p-4 text-right">
              <a
                href={retailer.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "tabular-nums hover:opacity-75 transition-opacity font-bold",
                  index === 0 ? "text-red-500" : "text-blue-600"
                )}
              >
                {retailer.price.toLocaleString()}
                <span className="font-normal">원</span>
                {index === 0 && (
                  <span className="text-xs ml-2 font-medium bg-red-100 text-red-500 px-1.5 py-0.5 rounded">
                    최저가
                  </span>
                )}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
