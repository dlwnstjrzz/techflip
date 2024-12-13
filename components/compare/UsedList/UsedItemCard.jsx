import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

const PLATFORM_LOGOS = {
  당근마켓: {
    src: "https://i.namu.wiki/i/urKu84c6cV1U3tmZqPiopxkCnQOn96j3gA6Wf730iSTzz41XDOeqypSusjBVPXeHxGe8RJAOjMY11uywzcDqSA.svg",
    width: 60,
  },
  번개장터: {
    src: "https://i0.wp.com/itsdwayne.co.kr/wp-content/uploads/2023/09/%EB%B2%88%EA%B0%9C%EC%9E%A5%ED%84%B0-optimized.webp?resize=640%2C153&ssl=1",
    width: 60,
  },
  중고나라: {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGhQmnQxKdBmhcHMc4O38zmJOsNPdaklUpoQ&s",
    width: 60,
  },
};

export default function UsedItemCard({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border rounded-lg hover:shadow-md transition-all hover:border-gray-300"
    >
      <div className="aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={200}
          height={200}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-2.5">
        <div className="h-5 mb-1">
          <div className="w-[60px] h-5 relative">
            <img
              src={PLATFORM_LOGOS[item.platform].src}
              alt={item.platform}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
        <h3 className="font-medium text-gray-900 mb-1.5 line-clamp-2 text-xs leading-4">
          {item.title}
        </h3>
        <div className="text-sm font-bold text-gray-900">
          {item.price.toLocaleString()}
          <span className="text-xs font-normal ml-0.5">원</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-gray-500">
          <span>{item.location}</span>
          <span>•</span>
          <span>
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </span>
        </div>
      </div>
    </a>
  );
}
