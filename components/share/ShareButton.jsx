"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function ShareButton({ url, title }) {
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };
    setIsMobile(checkMobile());
  }, []);

  const handleShare = async () => {
    try {
      // 모바일에서는 네이티브 공유 사용
      if (isMobile && navigator.share) {
        await navigator.share({
          title: "모아바 | 전자제품 가격비교",
          text: title || "새상품부터 중고까지 한눈에 비교하세요!",
          url: url || window.location.href,
        });
        toast({
          description: "공유되었습니다!",
          duration: 2000,
        });
        return;
      }

      // 데스크톱에서는 클립보드 복사
      await navigator.clipboard.writeText(url || window.location.href);
      toast({
        description: "링크가 복사되었습니다!",
        duration: 2000,
      });
    } catch (error) {}
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="
        flex items-center gap-2 
        bg-white border border-gray-200 shadow-sm
        hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600
        active:scale-95 
        transition-all duration-200
        rounded-lg px-3 py-1.5
      "
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 text-inherit" />
      <span className="text-xs font-medium">공유하기</span>
    </Button>
  );
}
