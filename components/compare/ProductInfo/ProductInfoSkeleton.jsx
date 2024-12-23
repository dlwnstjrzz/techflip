export default function ProductInfoSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6">
      {/* 제품 기본 정보 */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 이미지 스켈레톤 */}
        <div className="w-full lg:w-[400px] aspect-square bg-gray-200 rounded-lg animate-pulse shrink-0" />

        <div className="flex-1 space-y-6">
          {/* 제품명 스켈레톤 */}
          <div className="space-y-3">
            <div className="h-7 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-7 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>

          {/* 가격 정보 스켈레톤 */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
          </div>

          {/* 태그 스켈레톤 */}
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
