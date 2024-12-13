# TechFlip

새상품과 중고 가격을 한눈에 비교하고 최적의 구매 시점을 찾아보세요.

## 추가 고려사항

### 1. 성능 최적화

- [ ] 이미지 최적화
  - next/image 컴포넌트로 전환
  - 적절한 이미지 크기 설정
  - 이미지 포맷 최적화 (WebP)
- [ ] 컴포넌트 메모이제이션
  - React.memo 적용
  - useMemo, useCallback 최적화
- [ ] 번들 사이즈 최적화
  - 코드 스플리팅
  - 동적 임포트

### 2. 접근성 (a11y)

- [ ] ARIA 레이블 추가
  - 모든 상호작용 요소에 적절한 aria-label 추가
  - role 속성 정의
- [ ] 키보드 네비게이션 개선
  - 포커스 관리
  - 키보드 단축키
- [ ] 색상 대비 검토
  - WCAG 기준 준수
  - 고대비 모드 지원

### 3. SEO

- [ ] 메타데이터 최적화
  - title, description 최적화
  - canonical URL 설정
- [ ] OG 태그 추가
  - 소셜 미디어 공유 최적화
  - 썸네일 이미지 설정
- [ ] 시맨틱 HTML 구조 검토
  - 적절한 HTML 태그 사용
  - 구조화된 데이터 추가

### 4. 사용자 경험

- [ ] 로딩 상태 개선
  - 스켈레톤 UI 추가
  - 로딩 인디케이터 개선
- [ ] 에러 처리
  - 사용자 친화적인 에러 메시지
  - 폴백 UI 구현
- [ ] 애니메이션 최적화
  - 부드러운 전환 효과
  - 성능 고려

### 5. 데이터 관리

- [ ] 상태 관리 최적화
  - 전역 상태 관리 도입
  - 캐싱 전략 수립
- [ ] API 연동
  - 데이터 페칭 최적화
  - 에러 핸들링
- [ ] 오프라인 지원
  - Service Worker 구현
  - 오프라인 폴백 UI

### 6. 테스팅

- [ ] 단위 테스트
  - Jest + React Testing Library
  - 주요 컴포넌트 테스트
- [ ] E2E 테스트
  - Cypress/Playwright 설정
  - 핵심 플로우 테스트
- [ ] 성능 테스트
  - Lighthouse 점수 개선
  - Core Web Vitals 최적화

## 기술 스택

- Next.js (App Router)
- React
- Tailwind CSS
- Shadcn UI
