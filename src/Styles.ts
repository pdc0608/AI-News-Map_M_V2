export const styles = {
  container: {
    position: "relative" as const,
    height: "100vh",
    minHeight: "100vh",
    maxHeight: "100vh",
    backgroundColor: "#f3f4f6",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    userSelect: "none" as const,
  },

  // 새로운 미니멀 헤더
  header: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9997,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderBottom: "1px solid #e5e7eb",
    backdropFilter: "blur(15px)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    height: "75px", // 고정 높이
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    height: "100%",
  },

  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#374151",
    margin: 0,
  },

  headerButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  headerButton: {
    backgroundColor: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  activeHeaderButton: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
    color: "white",
  },

  resultCount: {
    backgroundColor: "#f0f9ff",
    color: "#3b82f6",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },

  // 더욱 컴팩트한 슬라이딩 필터 패널
  filterPanel: {
    position: "fixed" as const,
    top: "60px",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    zIndex: 9996,
    transform: "translateY(-100%)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    maxHeight: "35vh", // 더욱 줄어든 높이
    overflowY: "auto" as const,
  },

  filterPanelOpen: {
    transform: "translateY(0)",
  },

  filterPanelContent: {
    padding: "16px",
  },

  filterSection: {
    marginBottom: "16px",
  },

  filterTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  // 컴팩트한 날짜 입력
  dateRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },

  dateInput: {
    flex: 1,
    padding: "8px 12px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#374151",
    outline: "none",
    transition: "border-color 0.2s",
  },

  // 가로 스크롤 카테고리 필터
  categoryGrid: {
    display: "flex",
    overflowX: "auto" as const,
    gap: "1px",
    marginBottom: "16px",
    paddingBottom: "4px",
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
  },

  categoryButton: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "3px", // 원과 텍스트 사이 간격
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center" as const,
    minWidth: "60px", // 전체 컨테이너 너비
    flexShrink: 0,
    padding: "4px", // 전체 패딩
    border: "none", // 버튼 테두리 제거
    backgroundColor: "transparent", // 배경 투명
  },

  // 원형 이모티콘 컨테이너 (새로 추가)
  categoryIconContainer: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    border: "2px solid #e5e7eb",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px", // 이모티콘 크기
    transition: "all 0.2s",
  },

  // 카테고리 텍스트 라벨 (새로 추가)
  categoryLabel: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#374151",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "60px",
  },

  activeCategoryButton: {
    // 버튼 자체는 변화 없음 - 아이콘 컨테이너만 변화
  },

  // 활성 상태 아이콘 컨테이너 (새로 추가)
  activeCategoryIcon: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
    transform: "scale(1.1)",
  },

  // 활성 상태 라벨 (새로 추가)
  activeCategoryLabel: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  // 가로 스크롤 논조 필터
  sentimentGrid: {
    display: "flex",
    overflowX: "auto" as const,
    gap: "1px",
    paddingBottom: "4px",
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
  },

  sentimentButton: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center" as const,
    minWidth: "60px",
    flexShrink: 0,
    padding: "4px",
    border: "none",
    backgroundColor: "transparent",
  },

  // 논조 아이콘 컨테이너 (새로 추가)
  sentimentIconContainer: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    border: "2px solid #e5e7eb",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    transition: "all 0.2s",
  },

  // 논조 텍스트 라벨 (새로 추가)
  sentimentLabel: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#374151",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "60px",
  },

  activeSentimentButton: {
    // 버튼 자체는 변화 없음
  },

  // 활성 상태 논조 아이콘 (새로 추가)
  activeSentimentIcon: {
    borderColor: "#3b82f6",
    transform: "scale(1.1)",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },

  // 활성 상태 논조 라벨 (새로 추가)
  activeSentimentLabel: {
    color: "#3b82f6",
    fontWeight: "600",
  },

  // 컴팩트한 액션 버튼
  filterActions: {
    display: "flex",
    gap: "8px",
    marginTop: "16px",
  },

  filterActionButton: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  applyButton: {
    backgroundColor: "#3b82f6",
    color: "white",
  },

  resetButton: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },

  // 검색 모달
  searchModal: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 99999,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "100px",
  },

  searchModalContent: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "24px",
    margin: "0 16px",
    width: "calc(100% - 32px)",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  },

  searchInput: {
    width: "100%",
    padding: "16px 20px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box" as const,
    marginBottom: "16px",
  },

  searchButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
  },

  searchButton: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  // 지도 영역
  mapContainer: {
    height: "100vh",
    width: "100%",
    paddingTop: "60px",
    paddingBottom: "80px",
    zIndex: 1,
    position: "relative" as const,
    boxSizing: "border-box" as const,
  },

  map: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  // 하단 탭바
  bottomTabBar: {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "80px",
    backgroundColor: "white",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    zIndex: 9999,
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
    willChange: "transform",
    transform: "translate3d(0, 0, 0)",
    backfaceVisibility: "hidden" as const,
  },

  tabButton: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 4px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "12px",
    color: "#6b7280",
    transition: "all 0.2s",
  },

  activeTabButton: {
    color: "#3b82f6",
    backgroundColor: "#f0f9ff",
  },

  tabIcon: {
    fontSize: "20px",
    marginBottom: "4px",
  },

  tabLabel: {
    fontSize: "11px",
    fontWeight: "500",
  },

  // 드로어
  drawer: {
    position: "fixed" as const,
    bottom: "80px",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.15)",
    borderTop: "1px solid #e5e7eb",
    zIndex: 9998,
    transform: `translateY(calc(100% - 60px))`,
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform",
    backfaceVisibility: "hidden" as const,
  },

  drawerExpanded: {
    transform: "translateY(0)",
  },

  drawerPartial: {
    transform: "translateY(calc(100% - 60px))",
  },

  drawerHandle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20px",
    cursor: "pointer",
    borderBottom: "1px solid #f3f4f6",
  },

  handle: {
    width: "40px",
    height: "4px",
    backgroundColor: "#d1d5db",
    borderRadius: "2px",
  },

  drawerContent: {
    height: "calc(33vh - 60px)",
    overflowY: "auto" as const,
    padding: "16px",
  },

  // 드로어 내부 컨텐츠
  section: {
    marginBottom: "24px",
  },

  sectionTitle: {
    fontWeight: "600",
    color: "#374151",
    marginBottom: "12px",
    fontSize: "12px",
  },

  sentimentBar: {
    display: "flex",
    height: "20px",
    backgroundColor: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "8px",
  },

  sentimentStats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "16px",
  },

  newsItem: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    marginBottom: "12px",
    transition: "all 0.2s",
    border: "1px solid #e5e7eb",
  },

  newsHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },

  sentimentDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },

  newsTitle: {
    fontWeight: "600",
    color: "#374151",
    fontSize: "14px",
    lineHeight: "1.4",
    marginBottom: "8px",
  },

  chartContainer: {
    height: "200px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "16px",
  },

  issueReportButton: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },
};
