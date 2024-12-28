import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

const PLATFORM_LOGOS = {
  당근마켓: {
    src: "/images/daangn-logo.svg",
    width: 60,
  },
  번개장터: {
    src: "/images/bunjang-logo.webp",
  },
  네이버카페: {
    src: "/images/naver-cafe-logo.jpg",
  },
  중고나라: {
    src: "/images/joonggonara-logo.svg",
  },
};

export default function UsedItemCard({ item }) {
  const isNaverCafe = item.meta?.cafeName;
  const cafeThumbnail =
    item.meta?.cafeName === "중고나라"
      ? PLATFORM_LOGOS.중고나라.src
      : PLATFORM_LOGOS.네이버카페.src;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border rounded-lg hover:shadow-md transition-all hover:border-gray-300"
    >
      <div className="aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            width={200}
            height={200}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={
                isNaverCafe
                  ? cafeThumbnail
                  : PLATFORM_LOGOS[
                      item.platform === "bunjang" ? "번개장터" : "당근마켓"
                    ].src
              }
              alt={isNaverCafe ? item.meta.cafeName : item.platform}
              className="w-1/2 h-1/2 object-contain opacity-10"
            />
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        {isNaverCafe ? (
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 bg-no-repeat bg-cover bg-center rounded-sm"
              style={{ backgroundImage: `url(${cafeThumbnail})` }}
            />

            <span className="text-xs text-gray-600 truncate">
              {item.meta.cafeName}
            </span>
          </div>
        ) : (
          <div className="h-4">
            <div
              className="h-full bg-no-repeat bg-contain bg-left"
              style={{
                backgroundImage: `url(${
                  PLATFORM_LOGOS[
                    item.platform === "bunjang" ? "번개장터" : "당근마켓"
                  ].src
                })`,
                width: "55px",
              }}
            />
          </div>
        )}
        <h3 className="text-sm text-gray-900 line-clamp-2 leading-[1.25rem] min-h-[2.5rem]">
          {item.title}
        </h3>
        <div className="font-bold text-gray-900">
          {Number(item.price)?.toLocaleString()}
          <span className="text-xs font-normal ml-0.5">원</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="truncate max-w-[60%]">
            {item.location || "위치정보 없음"}
          </span>
          <span className="flex-shrink-0">
            {formatDistanceToNow(new Date(item.date), {
              addSuffix: true,
              includeSeconds: false,
              roundingMethod: "floor",
              locale: ko,
            }).replace(/^약\s/, "")}
          </span>
        </div>
      </div>
    </a>
  );
}
