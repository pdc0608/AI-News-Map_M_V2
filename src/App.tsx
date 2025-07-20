import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { seoulNewsData } from "./data/seoul_news_data_40";
import { issueReportData } from "./data/issue_report_data";
import { SearchModal, FilterPanel, MobileIssueReportModal } from "./Components";
import { styles } from "./Styles";

// 타입 정의
interface NewsData {
  id: number;
  title: string;
  date: string;
  media: string;
  author: string;
  summary: string;
  sentiment: string;
  keywords: string[];
  category: string;
  thumbnail: string | null;
  url: string;
  lat: number;
  lng: number;
}

interface ProcessedNews {
  id: number;
  title: string;
  content: string;
  date: string;
  source: string;
  sentiment: string;
  category: string;
  district: string;
  coordinates: [number, number];
  link: string;
  keywords: string[];
  author: string;
}

// 좌표로 서울 구 이름 추정하는 함수
const getDistrictFromCoords = (lat: number, lng: number): string => {
  if (lat > 37.57 && lng > 127.05) return "강남구";
  if (lat > 37.55 && lng > 127.0) return "서초구";
  if (lat > 37.55 && lng < 126.95) return "마포구";
  if (lat > 37.52 && lng > 126.99) return "용산구";
  if (lat > 37.57 && lng < 126.99) return "종로구";
  if (lat > 37.6) return "강북구";
  if (lat < 37.53) return "영등포구";
  return "기타구";
};

// 실제 뉴스 데이터에서 시계열 데이터 생성하는 함수
const generateTimeSeriesData = (
  newsData: ProcessedNews[],
  startDate: string,
  endDate: string
) => {
  const filteredByDate = newsData.filter((news) => {
    return news.date >= startDate && news.date <= endDate;
  });

  const dateGroups: { [key: string]: ProcessedNews[] } = {};
  filteredByDate.forEach((news) => {
    const date = news.date;
    if (!dateGroups[date]) {
      dateGroups[date] = [];
    }
    dateGroups[date].push(news);
  });

  const sortedDates = Object.keys(dateGroups).sort();
  return sortedDates.map((date) => {
    const newsOfDay = dateGroups[date];
    const positive = newsOfDay.filter(
      (news) => news.sentiment === "긍정"
    ).length;
    const negative = newsOfDay.filter(
      (news) => news.sentiment === "부정"
    ).length;
    const neutral = newsOfDay.filter(
      (news) => news.sentiment === "중립"
    ).length;

    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const formattedDate = `${month}.${day}`;

    return { date: formattedDate, positive, negative, neutral };
  });
};

// 실제 뉴스 데이터에서 지역별 기사 수 생성하는 함수
const generateDistrictData = (
  newsData: ProcessedNews[],
  startDate: string,
  endDate: string
) => {
  const filteredByDate = newsData.filter((news) => {
    return news.date >= startDate && news.date <= endDate;
  });

  const districtCounts: { [key: string]: number } = {};
  filteredByDate.forEach((news) => {
    const district = news.district;
    districtCounts[district] = (districtCounts[district] || 0) + 1;
  });

  return Object.entries(districtCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
};

const getCategorySymbol = (category: string) => {
  switch (category) {
    case "부동산":
      return "🏠";
    case "교통":
      return "🚗";
    case "정치":
      return "🏛️";
    case "경제":
      return "💼";
    case "사회":
      return "👥";
    case "문화":
      return "🎨";
    case "도시개발":
      return "🏗️";
    case "교육":
      return "📚";
    case "환경":
      return "🌿";
    case "보건":
      return "🏥";
    default:
      return "📰";
  }
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "긍정":
      return "#10B981";
    case "부정":
      return "#EF4444";
    case "중립":
      return "#F59E0B";
    default:
      return "#6B7280";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
};

export default function VanillaMobileNewsMap() {
  // 상태 정의
  const [selectedNews, setSelectedNews] = useState<ProcessedNews | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSentiment, setSelectedSentiment] = useState("전체");
  const [startDate, setStartDate] = useState("2025-06-01");
  const [endDate, setEndDate] = useState("2025-07-19");
  const [filteredNews, setFilteredNews] = useState<ProcessedNews[]>([]);
  const [processedNews, setProcessedNews] = useState<ProcessedNews[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [districtData, setDistrictData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("news");
  const [drawerHeight, setDrawerHeight] = useState(25);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isIssueReportOpen, setIsIssueReportOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // 실제 데이터에서 카테고리 추출
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(seoulNewsData.map((news) => news.category))
    );
    return ["전체", ...uniqueCategories];
  }, []);

  // 데이터 가공 및 초기화
  useEffect(() => {
    const processed = seoulNewsData.map((news: NewsData) => ({
      id: news.id,
      title: news.title,
      content: news.summary,
      date: news.date,
      source: news.media,
      sentiment: news.sentiment,
      category: news.category,
      district: getDistrictFromCoords(news.lat, news.lng),
      coordinates: [news.lng, news.lat] as [number, number],
      link: news.url,
      keywords: news.keywords,
      author: news.author,
    }));

    setProcessedNews(processed);
    setFilteredNews(processed);

    const initialTimeSeriesData = generateTimeSeriesData(
      processed,
      startDate,
      endDate
    );
    setTimeSeriesData(initialTimeSeriesData);

    const initialDistrictData = generateDistrictData(
      processed,
      startDate,
      endDate
    );
    setDistrictData(initialDistrictData);
  }, [startDate, endDate]);

  // 지도 초기화
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
        document.head.appendChild(link);
      }

      if (!(window as any).L) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (!(window as any).L || leafletMapRef.current) return;

      leafletMapRef.current = (window as any).L.map(mapRef.current, {
        center: [37.5665, 126.978],
        zoom: 11,
        zoomControl: true,
        zIndex: 1,
      });

      (window as any).L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
          zIndex: 1,
        }
      ).addTo(leafletMapRef.current);

      if (leafletMapRef.current.getContainer()) {
        leafletMapRef.current.getContainer().style.zIndex = "1";
      }

      const initialData = seoulNewsData.map((news: NewsData) => ({
        id: news.id,
        title: news.title,
        content: news.summary,
        date: news.date,
        source: news.media,
        sentiment: news.sentiment,
        category: news.category,
        district: getDistrictFromCoords(news.lat, news.lng),
        coordinates: [news.lng, news.lat] as [number, number],
        link: news.url,
        keywords: news.keywords,
        author: news.author,
      }));
      updateMarkers(initialData);
    };

    loadLeaflet();
  }, []);

  // 마커 갱신 함수
  const updateMarkers = (newsArray: ProcessedNews[]) => {
    if (
      !leafletMapRef.current ||
      !(window as any).L ||
      !newsArray ||
      newsArray.length === 0
    )
      return;

    markersRef.current.forEach((marker) => {
      leafletMapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    newsArray.forEach((news) => {
      const markerColor = getSentimentColor(news.sentiment);
      const customIcon = (window as any).L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 36px; 
          height: 36px; 
          background: ${markerColor}; 
          border: 3px solid white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 14px; 
          color: white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s;
        ">
          ${getCategorySymbol(news.category)}
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = (window as any).L.marker(
        [news.coordinates[1], news.coordinates[0]],
        { icon: customIcon }
      ).addTo(leafletMapRef.current);

      marker.on("click", () => {
        setSelectedNews(news);
        setActiveTab("news");
        setDrawerHeight(33);
      });

      markersRef.current.push(marker);
    });
  };

  // 필터링 로직
  useEffect(() => {
    let filtered = [...processedNews];

    if (startDate && endDate) {
      filtered = filtered.filter((news) => {
        const newsDate = news.date;
        return newsDate >= startDate && newsDate <= endDate;
      });
    }

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(keyword) ||
          news.content.toLowerCase().includes(keyword) ||
          news.district.toLowerCase().includes(keyword) ||
          news.keywords.some((k) => k.toLowerCase().includes(keyword))
      );
    }

    if (selectedCategory !== "전체") {
      filtered = filtered.filter((news) => news.category === selectedCategory);
    }

    if (selectedSentiment !== "전체") {
      filtered = filtered.filter(
        (news) => news.sentiment === selectedSentiment
      );
    }

    setFilteredNews(filtered);

    if (leafletMapRef.current) {
      updateMarkers(filtered);
    }

    if (processedNews.length > 0) {
      const newTimeSeriesData = generateTimeSeriesData(
        processedNews,
        startDate,
        endDate
      );
      setTimeSeriesData(newTimeSeriesData);

      const newDistrictData = generateDistrictData(
        processedNews,
        startDate,
        endDate
      );
      setDistrictData(newDistrictData);
    }
  }, [
    searchKeyword,
    selectedCategory,
    selectedSentiment,
    startDate,
    endDate,
    processedNews,
  ]);

  const sentimentCounts = {
    긍정: filteredNews.filter((n) => n.sentiment === "긍정").length,
    중립: filteredNews.filter((n) => n.sentiment === "중립").length,
    부정: filteredNews.filter((n) => n.sentiment === "부정").length,
  };

  const toggleDrawer = () => {
    setDrawerHeight(drawerHeight === 25 ? 33 : 25);
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setDrawerHeight(33);
  };

  const resetFilters = () => {
    setSelectedCategory("전체");
    setSelectedSentiment("전체");
    setSearchKeyword("");
    setStartDate("2025-06-01");
    setEndDate("2025-07-19");
  };

  return (
    <div style={styles.container}>
      {/* 새로운 미니멀 헤더 */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>✨ 서울 AI 뉴스맵</h1>
          <div style={styles.headerButtons}>
            <div style={styles.resultCount}>{filteredNews.length}건</div>
            <button
              style={styles.headerButton}
              onClick={() => setIsSearchOpen(true)}
            >
              🔍
            </button>
            <button
              style={{
                ...styles.headerButton,
                ...(isFilterPanelOpen ? styles.activeHeaderButton : {}),
              }}
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            >
              🎛️ 필터
            </button>
          </div>
        </div>
      </div>

      {/* 슬라이딩 필터 패널 */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSentiment={selectedSentiment}
        setSelectedSentiment={setSelectedSentiment}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        resetFilters={resetFilters}
        getCategorySymbol={getCategorySymbol}
      />

      {/* 패널 오버레이 */}
      {isFilterPanelOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 9995,
          }}
          onClick={() => setIsFilterPanelOpen(false)}
        />
      )}

      {/* 지도 영역 */}
      <div style={styles.mapContainer}>
        <div ref={mapRef} style={styles.map} />
      </div>

      {/* 하단 드로어 */}
      <div
        style={{
          ...styles.drawer,
          height: `${drawerHeight}vh`,
          ...(drawerHeight > 25 ? styles.drawerExpanded : styles.drawerPartial),
        }}
      >
        <div style={styles.drawerHandle} onClick={toggleDrawer}>
          <div style={styles.handle} />
        </div>

        <div style={styles.drawerContent}>
          {activeTab === "news" && (
            <div>
              {selectedNews ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <h3 style={styles.sectionTitle}>📰 뉴스 상세</h3>
                    <button
                      onClick={() => setSelectedNews(null)}
                      style={{
                        fontSize: "24px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#6b7280",
                        padding: "4px",
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div
                    style={{ ...styles.newsItem, border: "2px solid #3b82f6" }}
                  >
                    <div style={styles.newsHeader}>
                      <span
                        style={{
                          ...styles.sentimentDot,
                          backgroundColor: getSentimentColor(
                            selectedNews.sentiment
                          ),
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#6b7280",
                          fontWeight: "500",
                        }}
                      >
                        {selectedNews.district}
                      </span>
                      <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                        •
                      </span>
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        {formatDate(selectedNews.date)}
                      </span>
                    </div>
                    <h4 style={styles.newsTitle}>{selectedNews.title}</h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        lineHeight: "1.6",
                        margin: "12px 0",
                      }}
                    >
                      {selectedNews.content}
                    </p>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "12px",
                      }}
                    >
                      <strong>키워드:</strong>{" "}
                      {selectedNews.keywords.join(", ")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid #e5e7eb",
                      }}
                    >
                      <span style={{ fontWeight: "500" }}>
                        {selectedNews.source} • {selectedNews.author}
                      </span>
                      <a
                        href={selectedNews.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#3b82f6",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                      >
                        원문 보기 →
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={styles.sectionTitle}>
                    📰 주요 뉴스 ({filteredNews.length}건)
                  </h3>
                  {filteredNews.slice(0, 10).map((news) => (
                    <div
                      key={news.id}
                      onClick={() => setSelectedNews(news)}
                      style={styles.newsItem}
                    >
                      <div style={styles.newsHeader}>
                        <span
                          style={{
                            ...styles.sentimentDot,
                            backgroundColor: getSentimentColor(news.sentiment),
                          }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            fontWeight: "500",
                          }}
                        >
                          {news.district}
                        </span>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                          •
                        </span>
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>
                          {formatDate(news.date)}
                        </span>
                      </div>
                      <h4 style={styles.newsTitle}>{news.title}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "report" && (
            <div>
              <h3 style={styles.sectionTitle}>📊 주요 이슈 리포트</h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "20px",
                  lineHeight: "1.5",
                }}
              >
                현재 설정된 필터 조건을 바탕으로 서울시 주요 이슈에 대한 종합
                분석 리포트를 생성합니다.
              </p>
              <button
                style={{
                  ...styles.issueReportButton,
                  width: "100%",
                  margin: 0,
                }}
                onClick={() => setIsIssueReportOpen(true)}
              >
                📊 종합 이슈 리포트 생성
              </button>

              <div style={{ marginTop: "20px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "12px",
                  }}
                >
                  리포트 포함 내용
                </h4>
                <ul
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    paddingLeft: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  <li>긴급 대응이 필요한 주요 이슈</li>
                  <li>모니터링 강화가 필요한 사안</li>
                  <li>긍정적 동향 및 성과</li>
                  <li>갈등 관리가 필요한 분야</li>
                  <li>정책 제언 및 대응 방안</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={styles.sectionTitle}>📈 현재 논조 분포</h3>
                <div style={styles.sentimentBar}>
                  {filteredNews.length > 0 && (
                    <>
                      <div
                        style={{
                          backgroundColor: "#10B981",
                          width: `${
                            (sentimentCounts.긍정 / filteredNews.length) * 100
                          }%`,
                          transition: "width 0.3s ease",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#F59E0B",
                          width: `${
                            (sentimentCounts.중립 / filteredNews.length) * 100
                          }%`,
                          transition: "width 0.3s ease",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#EF4444",
                          width: `${
                            (sentimentCounts.부정 / filteredNews.length) * 100
                          }%`,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </>
                  )}
                </div>
                <div style={styles.sentimentStats}>
                  <span>😊 긍정 {sentimentCounts.긍정}건</span>
                  <span>😐 중립 {sentimentCounts.중립}건</span>
                  <span>😞 부정 {sentimentCounts.부정}건</span>
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>📈 최근 논조 변화</h3>
                <div style={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData.slice(-7)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="positive"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="negative"
                        stroke="#EF4444"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="neutral"
                        stroke="#F59E0B"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>🗺️ 지역별 기사 현황</h3>
                <div style={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={districtData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill="#3B82F6"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 고정 탭바 */}
      <div style={styles.bottomTabBar}>
        <button
          onClick={() => handleTabClick("news")}
          style={{
            ...styles.tabButton,
            ...(activeTab === "news" ? styles.activeTabButton : {}),
          }}
        >
          <div style={styles.tabIcon}>📰</div>
          <span style={styles.tabLabel}>뉴스</span>
        </button>
        <button
          onClick={() => handleTabClick("report")}
          style={{
            ...styles.tabButton,
            ...(activeTab === "report" ? styles.activeTabButton : {}),
          }}
        >
          <div style={styles.tabIcon}>📊</div>
          <span style={styles.tabLabel}>리포트</span>
        </button>
        <button
          onClick={() => handleTabClick("stats")}
          style={{
            ...styles.tabButton,
            ...(activeTab === "stats" ? styles.activeTabButton : {}),
          }}
        >
          <div style={styles.tabIcon}>📈</div>
          <span style={styles.tabLabel}>통계</span>
        </button>
        <button
          onClick={toggleDrawer}
          style={{ ...styles.tabButton, color: "#10B981" }}
        >
          <div style={styles.tabIcon}>{drawerHeight > 25 ? "⬇️" : "⬆️"}</div>
          <span style={styles.tabLabel}>
            {drawerHeight > 25 ? "닫기" : "열기"}
          </span>
        </button>
      </div>

      {/* 모달들 */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <MobileIssueReportModal
        isOpen={isIssueReportOpen}
        onClose={() => setIsIssueReportOpen(false)}
        issueReportData={issueReportData}
      />
    </div>
  );
}
