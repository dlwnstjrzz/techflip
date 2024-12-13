export default function ListingInfo({ listings }) {
  return (
    <div className="mt-10 flex gap-4">
      <div className="flex-1 rounded-lg bg-blue-50 p-4">
        <div className="text-center">
          <div className="text-sm text-blue-600 mb-1">새상품 판매처</div>
          <div className="text-2xl font-bold text-blue-600">
            {listings.new}개
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-lg bg-gray-50 p-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">중고 매물</div>
          <div className="text-2xl font-bold text-gray-600">
            {listings.used}개
          </div>
        </div>
      </div>
    </div>
  );
}
