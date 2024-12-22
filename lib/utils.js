import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function cleanSearchQuery(query) {
  // 쉼표 이후 텍스트 제거
  let cleaned = query.split(",")[0];
  // 괄호와 그 안의 내용 제거 ([], (), {})
  cleaned = cleaned.replace(/[\[\(\{].*?[\]\)\}]/g, "");
  // 첫 번째 단어(브랜드명) 제거
  cleaned = cleaned.replace(/^\S+\s+/, "");
  return cleaned.trim();
}
