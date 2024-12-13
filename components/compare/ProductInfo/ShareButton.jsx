import { Share2 } from "lucide-react";

export default function ShareButton() {
  return (
    <div className="mt-8">
      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border hover:bg-gray-50 transition-colors">
        <Share2 className="w-5 h-5" />
        <span>공유하기</span>
      </button>
    </div>
  );
}
