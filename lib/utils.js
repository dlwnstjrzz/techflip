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

export function getBaseSearchQuery(keyword) {
  if (!keyword) return "";

  // 1. 공백으로 단어 분리
  const words = keyword.split(/\s+/);

  // 2. 마지막 단어가 모델명인지 확인 (영문+숫자+특수문자 조합)
  if (
    words.length > 1 &&
    words[words.length - 1].length > 6 &&
    /^[A-Za-z0-9\-\/]+$/.test(words[words.length - 1])
  ) {
    // 마지막 단어 제거
    words.pop();
    keyword = words.join(" ");
  }

  // 3. 기본 정제 적용
  const cleaned = cleanSearchQuery(keyword);

  // 4. 최소 단어 수 확인 (너무 짧아지는 것 방지)
  const cleanedWords = cleaned.split(" ").filter(Boolean);
  if (cleanedWords.length === 0) return keyword; // 정제 후 빈 문자열이면 원본 반환
  if (cleanedWords.length === 1 && cleanedWords[0].length < 2) return keyword; // 한 글자만 남으면 원본 반환

  return cleaned;
}
