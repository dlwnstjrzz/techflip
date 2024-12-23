import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export default function PriceChart({ priceHistory }) {
  const [selectedView, setSelectedView] = useState("all");
  // 데이터 준비
  const newData = useMemo(() => {
    if (!priceHistory?.newDates) return [];
    return priceHistory.newDates.map((date, index) => ({
      date: new Date(date).getTime(),
      new: priceHistory.newPrices[index],
    }));
  }, [priceHistory?.newDates, priceHistory?.newPrices]);

  const usedData = useMemo(() => {
    if (!priceHistory?.dates) return [];
    return priceHistory.dates.map((date, index) => ({
      date: new Date(date).getTime(),
      used: priceHistory.usedPrices[index],
    }));
  }, [priceHistory?.dates, priceHistory?.usedPrices]);

  // 중고매물 날짜 기준으로 새상품 가격 매핑
  const newDataWithUsedDates = useMemo(() => {
    if (!priceHistory?.dates) return [];
    return priceHistory.dates.map((date) => {
      const targetDate = new Date(date).getTime();
      // 가장 가까운 새상품 가격 찾기
      let closestIndex = 0;
      let minDiff = Math.abs(
        new Date(priceHistory.newDates[0]).getTime() - targetDate
      );

      priceHistory.newDates.forEach((newDate, i) => {
        const diff = Math.abs(new Date(newDate).getTime() - targetDate);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      });

      return {
        date: targetDate,
        new: priceHistory.newPrices[closestIndex],
      };
    });
  }, [priceHistory]);

  // 데이터 유효성 검사 강화
  if (
    !priceHistory ||
    !Array.isArray(priceHistory.dates) ||
    !Array.isArray(priceHistory.usedPrices) ||
    !Array.isArray(priceHistory.newDates) ||
    !Array.isArray(priceHistory.newPrices)
  ) {
    return null;
  }

  // 최소/최대 가격 계산
  const allPrices = [
    ...(selectedView === "all" || selectedView === "new"
      ? priceHistory.newPrices
      : []),
    ...(selectedView === "all" || selectedView === "used"
      ? priceHistory.usedPrices
      : []),
  ];

  if (allPrices.length === 0) return null;

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  // 가격대에 단위 및 포맷 설정
  const getPriceUnit = (price) => {
    if (price >= 10000) return { unit: 10000, label: "만" };
    return { unit: 1, label: "원" };
  };

  const priceUnit = getPriceUnit(maxPrice);
  const buffer = (maxPrice - minPrice) * 0.15;
  const yAxisMin =
    Math.floor((minPrice - buffer) / (priceUnit.unit / 10)) *
    (priceUnit.unit / 10);
  const yAxisMax =
    Math.ceil((maxPrice + buffer) / (priceUnit.unit / 10)) *
    (priceUnit.unit / 10);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white p-2 border rounded-lg shadow-sm">
        <div className="text-xs text-gray-500">
          {format(new Date(label), "M월 d일", { locale: ko })}
        </div>
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span
              className={cn(
                "text-sm font-medium",
                item.dataKey === "new" ? "text-blue-600" : "text-gray-600"
              )}
            >
              {item.dataKey === "new" ? "새상품" : "중고상품"}
            </span>
            <span className="text-sm">
              {Number(item.value).toLocaleString()}원
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8">
      <p className="text-sm text-gray-500 mb-4">
        * 시세는 최대 3개월까지 표시됩니다.
      </p>
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
          <LineChart margin={{ top: 5, right: 0, bottom: 5, left: 10 }}>
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
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(date) => format(date, "M.d", { locale: ko })}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis
              orientation="right"
              width={55}
              domain={[yAxisMin, yAxisMax]}
              tickFormatter={(value) =>
                `${Math.round(value / priceUnit.unit).toLocaleString()}${
                  priceUnit.label
                }`
              }
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            {(selectedView === "new" || selectedView === "all") && (
              <Line
                data={selectedView === "all" ? newDataWithUsedDates : newData}
                type="monotone"
                dataKey="new"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                fill="url(#newGradient)"
              />
            )}
            {(selectedView === "used" || selectedView === "all") && (
              <Line
                data={usedData}
                type="monotone"
                dataKey="used"
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
