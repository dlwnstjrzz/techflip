import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";

export default function PriceChart({ priceHistory }) {
  const [selectedView, setSelectedView] = useState("all"); // 'all' | 'new' | 'used'

  // 가격대에 따른 단위 및 포맷 설정
  const getPriceUnit = (price) => {
    if (price >= 10000000) return { unit: 10000000, label: "천만" };
    if (price >= 100000) return { unit: 10000, label: "만" };
    if (price >= 1000) return { unit: 1000, label: "천" };
    return { unit: 1, label: "" };
  };

  // 최소/최대 가격 계산
  const minPrice = Math.min(
    ...(selectedView === "all" || selectedView === "new"
      ? priceHistory.newPrices
      : []),
    ...(selectedView === "all" || selectedView === "used"
      ? priceHistory.usedPrices
      : [])
  );
  const maxPrice = Math.max(
    ...(selectedView === "all" || selectedView === "new"
      ? priceHistory.newPrices
      : []),
    ...(selectedView === "all" || selectedView === "used"
      ? priceHistory.usedPrices
      : [])
  );

  const priceUnit = getPriceUnit(maxPrice);
  const buffer = (maxPrice - minPrice) * 0.15;
  const yAxisMin =
    Math.floor((minPrice - buffer) / (priceUnit.unit / 10)) *
    (priceUnit.unit / 10);
  const yAxisMax =
    Math.ceil((maxPrice + buffer) / (priceUnit.unit / 10)) *
    (priceUnit.unit / 10);

  const data = priceHistory.dates.map((date, i) => ({
    date: parseISO(date),
    new: priceHistory.newPrices[i],
    used: priceHistory.usedPrices[i],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white border rounded-lg shadow-lg p-3">
          <p className="text-xs text-gray-600 mb-2">
            {format(label, "M월 d일", { locale: ko })}
          </p>
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  entry.name === "new" ? "bg-blue-500" : "bg-gray-500"
                }`}
              />
              <span className="text-sm font-medium">
                {entry.value.toLocaleString()}원
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8">
      <div className="inline-flex rounded-lg p-0.5 bg-gray-100 mb-4">
        {[
          { id: "all", label: "전체" },
          { id: "new", label: "새상품" },
          { id: "used", label: "중고매물" },
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedView(option.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedView === option.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, bottom: 5, left: 10 }}
          >
            <defs>
              <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="usedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4B5563" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4B5563" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(date, "M.d", { locale: ko })}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              stroke="#E5E7EB"
              interval={8}
            />
            <YAxis
              tickFormatter={(value) =>
                `${Math.round(value / priceUnit.unit).toLocaleString()}${
                  priceUnit.label
                }`
              }
              tick={{ fontSize: 12, fill: "#6B7280" }}
              width={55}
              stroke="#E5E7EB"
              domain={[yAxisMin, yAxisMax]}
              padding={{ top: 10, bottom: 10 }}
              orientation="right"
            />
            <Tooltip content={<CustomTooltip />} />
            {(selectedView === "all" || selectedView === "new") && (
              <Line
                type="monotone"
                dataKey="new"
                name="new"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                fill="url(#newGradient)"
              />
            )}
            {(selectedView === "all" || selectedView === "used") && (
              <Line
                type="monotone"
                dataKey="used"
                name="used"
                stroke="#4B5563"
                strokeWidth={2}
                dot={false}
                fill="url(#usedGradient)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
