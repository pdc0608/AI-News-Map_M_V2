import React from "react";
import { styles } from "./Styles";

// 검색 모달 컴포넌트
export const SearchModal = ({
  isOpen,
  onClose,
  searchKeyword,
  setSearchKeyword,
}: {
  isOpen: boolean;
  onClose: () => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.searchModal} onClick={onClose}>
      <div
        style={styles.searchModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          🔍 키워드 검색
        </h3>
        <input
          type="text"
          placeholder="키워드, 지역명으로 검색..."
          style={styles.searchInput}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onCompositionStart={(e) => e.stopPropagation()}
          onCompositionEnd={(e) => e.stopPropagation()}
          autoFocus
        />
        <div style={styles.searchButtons}>
          <button
            style={{
              ...styles.searchButton,
              backgroundColor: "#f3f4f6",
              color: "#374151",
            }}
            onClick={onClose}
          >
            취소
          </button>
          <button
            style={{
              ...styles.searchButton,
              backgroundColor: "#3b82f6",
              color: "white",
            }}
            onClick={onClose}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

// 슬라이딩 필터 패널 컴포넌트
export const FilterPanel = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedSentiment,
  setSelectedSentiment,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  resetFilters,
  getCategorySymbol,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSentiment: string;
  setSelectedSentiment: (sentiment: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  resetFilters: () => void;
  getCategorySymbol: (category: string) => string;
}) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "긍정":
        return "😊";
      case "중립":
        return "😐";
      case "부정":
        return "😞";
      default:
        return "⚪";
    }
  };

  const getSentimentButtonColor = (sentiment: string) => {
    switch (sentiment) {
      case "긍정":
        return "#10B981";
      case "중립":
        return "#F59E0B";
      case "부정":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <div
      style={{
        ...styles.filterPanel,
        ...(isOpen ? styles.filterPanelOpen : {}),
      }}
    >
      <div style={styles.filterPanelContent}>
        {/* 날짜 필터 */}
        <div style={styles.filterSection}>
          <h3 style={styles.filterTitle}>📅 조회 기간</h3>
          <div style={styles.dateRow}>
            <input
              type="date"
              style={styles.dateInput}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span style={{ color: "#6b7280", fontSize: "14px" }}>~</span>
            <input
              type="date"
              style={styles.dateInput}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* 분야 필터 - 새로운 구조 */}
        <div style={styles.filterSection}>
          <h3 style={styles.filterTitle}>🏷️ 분야별 필터</h3>
          <div style={styles.categoryGrid}>
            {categories.map((category) => (
              <button
                key={category}
                style={styles.categoryButton}
                onClick={() => setSelectedCategory(category)}
              >
                {/* 원형 아이콘 컨테이너 */}
                <div
                  style={{
                    ...styles.categoryIconContainer,
                    ...(selectedCategory === category
                      ? styles.activeCategoryIcon
                      : {}),
                  }}
                >
                  {category === "전체" ? "⚪" : getCategorySymbol(category)}
                </div>
                {/* 텍스트 라벨 */}
                <span
                  style={{
                    ...styles.categoryLabel,
                    ...(selectedCategory === category
                      ? styles.activeCategoryLabel
                      : {}),
                  }}
                >
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 논조 필터 - 새로운 구조 */}
        <div style={styles.filterSection}>
          <h3 style={styles.filterTitle}>😊 논조별 필터</h3>
          <div style={styles.sentimentGrid}>
            {["전체", "긍정", "중립", "부정"].map((sentiment) => (
              <button
                key={sentiment}
                style={styles.sentimentButton}
                onClick={() => setSelectedSentiment(sentiment)}
              >
                {/* 원형 아이콘 컨테이너 */}
                <div
                  style={{
                    ...styles.sentimentIconContainer,
                    ...(selectedSentiment === sentiment
                      ? {
                          ...styles.activeSentimentIcon,
                          backgroundColor:
                            sentiment !== "전체"
                              ? getSentimentButtonColor(sentiment)
                              : "white",
                        }
                      : {}),
                  }}
                >
                  <span
                    style={{
                      color:
                        selectedSentiment === sentiment && sentiment !== "전체"
                          ? "white"
                          : "#374151",
                    }}
                  >
                    {getSentimentIcon(sentiment)}
                  </span>
                </div>
                {/* 텍스트 라벨 */}
                <span
                  style={{
                    ...styles.sentimentLabel,
                    ...(selectedSentiment === sentiment
                      ? styles.activeSentimentLabel
                      : {}),
                  }}
                >
                  {sentiment}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div style={styles.filterActions}>
          <button
            style={{
              ...styles.filterActionButton,
              ...styles.resetButton,
            }}
            onClick={resetFilters}
          >
            초기화
          </button>
          <button
            style={{
              ...styles.filterActionButton,
              ...styles.applyButton,
            }}
            onClick={onClose}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

// 이슈 리포트 모달 컴포넌트 (모바일 최적화)
export const MobileIssueReportModal = ({
  isOpen,
  onClose,
  issueReportData,
}: {
  isOpen: boolean;
  onClose: () => void;
  issueReportData: any;
}) => {
  if (!isOpen) return null;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "긴급":
        return "🚨";
      case "모니터링":
        return "👁️";
      case "긍정적":
        return "✅";
      case "갈등관리":
        return "⚠️";
      default:
        return "📝";
    }
  };

  const modalStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 99999,
    overflowY: "auto" as const,
  };

  const modalContentStyle = {
    backgroundColor: "white",
    minHeight: "100vh",
    position: "relative" as const,
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "20px 16px",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
  };

  const contentStyle = {
    padding: "20px 16px",
  };

  const issueCardStyle = (issue: any) => ({
    backgroundColor: "#f8fafc",
    border: `2px solid ${issue.priorityColor}20`,
    borderLeft: `4px solid ${issue.priorityColor}`,
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  });

  const priorityBadgeStyle = (color: string) => ({
    backgroundColor: color,
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  });

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>
                📊 서울시 종합 이슈 리포트
              </h2>
              <p
                style={{ margin: "6px 0 0 0", fontSize: "13px", opacity: 0.9 }}
              >
                {issueReportData.reportInfo.period} •{" "}
                {issueReportData.reportInfo.totalNewsAnalyzed}건 분석
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                padding: "8px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        <div style={contentStyle}>
          {/* 요약 통계 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #ff4444, #cc3333)",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {issueReportData.statistics.byPriority.emergency}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>긴급 대응</div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #ffb800, #e6a600)",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {issueReportData.statistics.byPriority.monitoring}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>모니터링</div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #00aa44, #008833)",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {issueReportData.statistics.byPriority.positive}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>긍정적</div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #ff8800, #e67300)",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                {issueReportData.statistics.byPriority.conflict}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>갈등 관리</div>
            </div>
          </div>

          {/* 종합 평가 */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e2e8f0",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                marginBottom: "16px",
                color: "#1a202c",
                borderLeft: "4px solid #10B981",
                paddingLeft: "12px",
              }}
            >
              📈 종합 평가 및 정책 제언
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#059669",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ✅ 긍정적 동향
              </h4>
              <ul
                style={{
                  fontSize: "13px",
                  color: "#4a5568",
                  marginLeft: "16px",
                  lineHeight: "1.4",
                }}
              >
                {issueReportData.summary.positive.map(
                  (item: string, index: number) => (
                    <li key={index} style={{ marginBottom: "4px" }}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#dc2626",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                ⚠️ 우려 사항
              </h4>
              <ul
                style={{
                  fontSize: "13px",
                  color: "#4a5568",
                  marginLeft: "16px",
                  lineHeight: "1.4",
                }}
              >
                {issueReportData.summary.concerns.map(
                  (item: string, index: number) => (
                    <li key={index} style={{ marginBottom: "4px" }}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#3b82f6",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                📝 정책 제언
              </h4>
              <ul
                style={{
                  fontSize: "13px",
                  color: "#4a5568",
                  marginLeft: "16px",
                  lineHeight: "1.4",
                }}
              >
                {issueReportData.summary.recommendations.map(
                  (item: string, index: number) => (
                    <li key={index} style={{ marginBottom: "4px" }}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* 주요 이슈들 */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "16px",
                color: "#1a202c",
                borderLeft: "4px solid #3b82f6",
                paddingLeft: "12px",
              }}
            >
              🎯 주요 이슈 및 대응 방안
            </h3>

            {issueReportData.issues.map((issue: any) => (
              <div key={issue.id} style={issueCardStyle(issue)}>
                <div style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={priorityBadgeStyle(issue.priorityColor)}>
                      {getPriorityIcon(issue.priority)}
                      {issue.priority}
                    </span>
                    <span
                      style={{
                        backgroundColor: "#e2e8f0",
                        color: "#4a5568",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                      }}
                    >
                      {issue.category}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      margin: "0 0 8px 0",
                      color: "#2d3748",
                    }}
                  >
                    {issue.icon} {issue.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4a5568",
                      margin: "0 0 12px 0",
                      lineHeight: "1.5",
                    }}
                  >
                    {issue.summary}
                  </p>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <h5
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "6px",
                      color: "#2d3748",
                    }}
                  >
                    📋 현재 상황
                  </h5>
                  <ul
                    style={{
                      fontSize: "12px",
                      color: "#4a5568",
                      marginLeft: "16px",
                      lineHeight: "1.3",
                    }}
                  >
                    {issue.status.situation.map(
                      (item: string, index: number) => (
                        <li key={index} style={{ marginBottom: "3px" }}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <h5
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      marginBottom: "6px",
                      color: "#2d3748",
                    }}
                  >
                    🎯 대응 방향
                  </h5>
                  <ul
                    style={{
                      fontSize: "12px",
                      color: "#4a5568",
                      marginLeft: "16px",
                      lineHeight: "1.3",
                    }}
                  >
                    {issue.status.response.map(
                      (item: string, index: number) => (
                        <li key={index} style={{ marginBottom: "3px" }}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "8px",
                    fontSize: "11px",
                    color: "#64748b",
                  }}
                >
                  <strong>관련 지역:</strong>{" "}
                  {issue.affectedDistricts.join(", ")} |
                  <strong> 관련 기사:</strong> {issue.relatedNews.length}건
                </div>
              </div>
            ))}
          </div>

          {/* 하단 정보 */}
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              backgroundColor: "#f1f5f9",
              borderRadius: "8px",
              fontSize: "11px",
              color: "#64748b",
              textAlign: "center",
            }}
          >
            작성일: {issueReportData.reportInfo.createdDate} | 분석 기사:{" "}
            {issueReportData.reportInfo.totalNewsAnalyzed}건 | 분석 기간:{" "}
            {issueReportData.reportInfo.period}
          </div>
        </div>
      </div>
    </div>
  );
};
