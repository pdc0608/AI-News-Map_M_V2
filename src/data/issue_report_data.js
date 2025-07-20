export const issueReportData = {
  reportInfo: {
    period: "2025년 6월 18일 ~ 2025년 7월 19일",
    createdDate: "2025년 7월 19일",
    totalNewsAnalyzed: 40,
    title: "서울시 종합 이슈 리포트",
  },

  issues: [
    {
      id: 1,
      priority: "긴급",
      priorityColor: "#FF4444",
      icon: "🔴",
      title: "부동산 시장 급냉각 및 거래 실종",
      summary:
        "서울 아파트 매매거래 전년 동기 대비 82% 급감, 갭투자 차단 등 대출 규제로 시장 위축",
      status: {
        situation: [
          "서울 아파트 매매거래 전년 동기 대비 82% 급감",
          "갭투자 차단 등 대출 규제 강화 효과로 시장 위축 심화",
          "신촌 대학가 원룸 공급 부족, 임대료 상승 압박 지속",
        ],
        response: [
          "실거주 목적 수요자 지원 방안 검토",
          "청년층 주거 안정 대책 수립 필요",
          "부동산 시장 모니터링 체계 강화",
        ],
      },
      relatedNews: [1, 16],
      affectedDistricts: ["강남구", "서대문구"],
      category: "부동산",
    },

    {
      id: 2,
      priority: "긴급",
      priorityColor: "#FF4444",
      icon: "🔴",
      title: "코로나19 재확산 조짐",
      summary:
        "강남구 확진자 일주일 새 300% 급증, 방역 단계 격상 및 추가 확산 방지 조치 시행",
      status: {
        situation: [
          "강남구 확진자 일주일 새 300% 급증",
          "방역 단계 격상 및 추가 확산 방지 조치 시행",
        ],
        response: [
          "전 자치구 방역 태세 점검 및 강화",
          "의료 대응 체계 재정비",
          "시민 예방 수칙 홍보 강화",
        ],
      },
      relatedNews: [4],
      affectedDistricts: ["강남구"],
      category: "보건",
    },

    {
      id: 3,
      priority: "모니터링",
      priorityColor: "#FFB800",
      icon: "🟡",
      title: "젠트리피케이션 심화 및 임대료 급등",
      summary:
        "홍대 앞 임대료 50% 상승, 압구정 로데오거리 40% 급등으로 기존 소상공인 내몰림",
      status: {
        situation: [
          "홍대 앞 임대료 50% 상승, 기존 소상공인 내몰림",
          "압구정 로데오거리 임대료 40% 급등",
          "서울대 주변, 정릉동 대학가 상권도 유사한 문제 발생",
        ],
        response: [
          "상업지역 임대료 안정화 방안 검토",
          "소상공인 지원 정책 확대",
          "젠트리피케이션 방지 조례 실효성 점검",
        ],
      },
      relatedNews: [3, 20, 23, 32],
      affectedDistricts: ["마포구", "강남구", "관악구", "성북구"],
      category: "경제",
    },

    {
      id: 4,
      priority: "모니터링",
      priorityColor: "#FFB800",
      icon: "🟡",
      title: "교통 인프라 개선 사업 추진 현황",
      summary:
        "지하철 9호선 연장 개통 확정, 영등포·구로 교통 개선 사업 등 긍정적 진전",
      status: {
        situation: [
          "지하철 9호선 연장 구간 2026년 3월 개통 확정 (긍정적)",
          "영등포 타임스퀘어 교통체증 해소 대책 추진",
          "구로 디지털단지 주차난 해결을 위한 지하주차장 건설",
        ],
        response: [
          "교통 개선 사업 일정 관리 및 점검 강화",
          "시민 편의성 증진 효과 모니터링",
        ],
      },
      relatedNews: [2, 8, 18, 26],
      affectedDistricts: ["강서구", "영등포구", "구로구", "은평구"],
      category: "교통",
    },

    {
      id: 5,
      priority: "모니터링",
      priorityColor: "#FFB800",
      icon: "🟡",
      title: "환경 문제 대응",
      summary:
        "미세먼지 지속과 김포공항 소음 문제, 한강공원 생태복원 성공 등 환경 이슈 혼재",
      status: {
        situation: [
          "서울 전역 미세먼지 '나쁨' 단계 지속",
          "김포공항 소음 피해로 강서구 주민 보상 요구",
          "암사동 한강공원 생태복원 성공 사례 (긍정적)",
        ],
        response: [
          "미세먼지 저감 정책 실효성 검토",
          "공항 소음 피해 보상 체계 정비",
          "생태복원 성공 모델 확산 방안 검토",
        ],
      },
      relatedNews: [27, 28, 30],
      affectedDistricts: ["전 지역", "강서구", "강동구"],
      category: "환경",
    },

    {
      id: 6,
      priority: "긍정적",
      priorityColor: "#00AA44",
      icon: "🟢",
      title: "신산업 집적지 조성 및 경제 활성화",
      summary:
        "AI 스타트업 허브, K-컬처밸리, 스마트팩토리 등 신산업 육성 사업 활발",
      status: {
        situation: [
          "강남 테헤란로 AI 스타트업 집적지구 조성",
          "성수동 IT 허브로 급부상, '제2의 실리콘밸리'",
          "마포구 상암동 'K-컬처밸리' 조성 본격화",
          "가산동 스마트팩토리 전환 가속화",
        ],
        response: [
          "신산업 육성 정책 연속성 확보",
          "관련 인프라 및 지원 체계 점검",
        ],
      },
      relatedNews: [10, 11, 19, 31],
      affectedDistricts: ["강남구", "성동구", "마포구", "금천구"],
      category: "경제",
    },

    {
      id: 7,
      priority: "긍정적",
      priorityColor: "#00AA44",
      icon: "🟢",
      title: "대규모 도시개발 사업 추진",
      summary:
        "용산 국제업무지구, 청량리 역세권, 상계뉴타운 등 주요 개발사업 본격화",
      status: {
        situation: [
          "용산 국제업무지구 착공 재개 (15만 개 일자리 창출 기대)",
          "청량리 역세권 개발 (1.2조원 규모)",
          "상계뉴타운 2단계 사업 본격화 (5,000세대 공급)",
          "목동 신시가지 30년 만에 재정비",
        ],
        response: [
          "개발 사업 진행 상황 정기 점검",
          "주민 의견 수렴 및 갈등 관리",
        ],
      },
      relatedNews: [5, 14, 17, 25],
      affectedDistricts: ["용산구", "동대문구", "양천구", "노원구"],
      category: "도시개발",
    },

    {
      id: 8,
      priority: "긍정적",
      priorityColor: "#00AA44",
      icon: "🟢",
      title: "문화·관광 인프라 확충",
      summary:
        "코엑스몰 리뉴얼, 명동 상권 회복, 전통시장 현대화 등 관광·문화 활성화",
      status: {
        situation: [
          "코엑스몰 리뉴얼 완료로 관광객 증가",
          "명동 상권 코로나19 이후 첫 회복",
          "노량진 수산시장 현대화 완료",
          "광화문광장 재조성 마무리 단계",
        ],
        response: [
          "관광 활성화 효과 지속 방안 검토",
          "전통시장 현대화 모델 확산",
        ],
      },
      relatedNews: [12, 15, 21, 29, 34],
      affectedDistricts: ["강남구", "중구", "동작구", "종로구", "광진구"],
      category: "문화",
    },

    {
      id: 9,
      priority: "갈등관리",
      priorityColor: "#FF8800",
      icon: "⚠️",
      title: "도시개발 관련 주민 갈등",
      summary:
        "미아동 도시재생, 한옥마을 보존, 롯데월드 건설 등 개발 갈등 지속",
      status: {
        situation: [
          "강북구 미아동 도시재생사업 주민 반발로 중단 위기",
          "종로구 한옥마을 보존 vs 개발 갈등 심화",
          "잠실 제2롯데월드 건설 갈등 재점화",
        ],
        response: [
          "주민 소통 채널 강화 및 갈등 조정 시스템 개선",
          "개발 사업 추진 시 사전 의견수렴 체계 정비",
        ],
      },
      relatedNews: [7, 9, 13],
      affectedDistricts: ["강북구", "종로구", "송파구"],
      category: "도시개발",
    },

    {
      id: 10,
      priority: "긍정적",
      priorityColor: "#00AA44",
      icon: "🟢",
      title: "교육 정책 이슈",
      summary:
        "AI 특화 교육과정 도입, 학원가 규제, 문화복합센터 건립 등 교육 혁신 추진",
      status: {
        situation: [
          "서초구 AI 특화 교육과정 도입 (긍정적)",
          "대치동 학원가 심야 운영 제한 강화",
          "창동 문화복합센터 건립으로 교육 인프라 확충",
        ],
        response: [
          "교육 혁신 정책 효과 모니터링",
          "사교육 과열 완화 조치 실효성 점검",
        ],
      },
      relatedNews: [6, 24, 33],
      affectedDistricts: ["서초구", "강남구", "도봉구"],
      category: "교육",
    },
  ],

  summary: {
    positive: [
      "신산업 육성 및 경제 활성화 사업 활발",
      "교통·문화 인프라 확충 지속 추진",
      "관광업 회복 조짐",
    ],
    concerns: [
      "부동산 시장 급냉각으로 경제 위축 우려",
      "코로나19 재확산 조짐",
      "젠트리피케이션 심화",
    ],
    recommendations: [
      "부동산 시장 안정화와 서민 주거 안정 대책 병행 추진",
      "방역 체계 재점검 및 선제적 대응 체계 구축",
      "개발 사업 추진 시 주민 소통 강화 의무화",
      "신산업 육성 정책의 연속성과 일관성 확보",
    ],
  },

  statistics: {
    totalIssues: 10,
    byPriority: {
      emergency: 2,
      monitoring: 3,
      positive: 4,
      conflict: 1,
    },
    byCategory: {
      economy: 3,
      development: 3,
      culture: 2,
      transportation: 1,
      health: 1,
      environment: 1,
      education: 1,
      realEstate: 1,
    },
  },
};
