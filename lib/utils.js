import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SPEC_PATTERNS = {
  computer: [/\d+core/i, /\d+gpu/i, /\d+gb/i, /\d+tb/i, /(ram|ssd|hdd)/i],
  phone: [/\d+gb/i, /\d+mp/i, /\d+인치/i, /\d+mm/i, /(wifi|cellular)/i],
};

const BASE_PATTERNS = [/\d+fps/i, /\d+hz/i, /\d+k/i, /\d+bit/i];

export function cleanSearchQuery(query, category = "computer") {
  if (!query) return "";
  // 쉼표 이후 텍스트 제거
  let cleaned = query.split(",")[0];
  // 괄호와 그 안의 내용 제거 ([], (), {})
  cleaned = cleaned.replace(/[\[\(\{].*?[\]\)\}]/g, "");
  // 첫 번째 단어(브랜드명) 제거
  cleaned = cleaned.replace(/^\S+\s+/, "");

  // 년도 제거 (독립된 년도만)
  cleaned = cleaned.replace(/\b20\d{2}\b/g, "");

  // 카테고리별 스펙 패턴 제거
  const patterns = [...BASE_PATTERNS, ...(SPEC_PATTERNS[category] || [])];
  patterns.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, "");
  });

  // 연속된 공백을 하나로
  cleaned = cleaned.replace(/\s+/g, " ");

  return cleaned.trim();
}
