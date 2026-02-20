"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const API_URL = "/api/bids";

export default function Home() {
  const [bids, setBids] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(false);

  // 🔹 데이터 불러오기
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setBids(data);
      setLoading(false);
    };
    load();
  }, []);

  // 🔹 오늘 날짜
  const today = new Date().toISOString().slice(0, 10);

  // 🔹 기관 필터
  const filtered = useMemo(() => {
    let list = [...bids];

    if (active !== "all") {
      list = list.filter((b) => b.code === active);
    }

    // 최신순 정렬
    list.sort((a, b) => new Date(b.date) - new Date(a.date));

    return list;
  }, [bids, active]);

  const totalCount = bids.length;
  const nlCount = bids.filter((b) => b.code === "1371029").length;
  const naCount = bids.filter((b) => b.code === "9720000").length;

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      {/* 🔵 헤더 */}
      <header
        style={{
          background: "#2563eb",
          color: "white",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
          국립중앙도서관 · 국회도서관 공고 정보
        </h1>

        <Image
          src="/dataclip-logo.png"
          alt="데이터클립 로고"
          width={180}
          height={40}
          style={{ height: "40px", width: "auto" }}
        />
      </header>

      {/* 🔷 대시보드 카드 */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <DashboardCard
          title="전체 공고"
          count={totalCount}
          active={active === "all"}
          onClick={() => setActive("all")}
          color="#111"
        />
        <DashboardCard
          title="국립중앙도서관"
          count={nlCount}
          active={active === "1371029"}
          onClick={() => setActive("1371029")}
          color="#2563eb"
        />
        <DashboardCard
          title="국회도서관"
          count={naCount}
          active={active === "9720000"}
          onClick={() => setActive("9720000")}
          color="#16a34a"
        />
      </div>

      {/* 🔷 공고 리스트 */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 30px" }}>
        {loading ? (
          <p>불러오는 중...</p>
        ) : (
          filtered.map((b, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                marginBottom: "16px",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                {b.title}
                {b.date.startsWith(today) && (
                  <span
                    style={{
                      marginLeft: "8px",
                      background: "#ef4444",
                      color: "white",
                      fontSize: "12px",
                      padding: "3px 6px",
                      borderRadius: "6px",
                    }}
                  >
                    NEW
                  </span>
                )}
              </div>

              <div style={{ fontSize: "13px", color: "#555", marginTop: "6px" }}>
                {b.instLabel} | {b.date}
              </div>

              <div style={{ marginTop: "10px" }}>
                <a
                  href={b.detailUrl}
                  target="_blank"
                  style={{ color: "#2563eb", fontWeight: "bold" }}
                >
                  공고문 보기 →
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🔹 대시보드 카드 컴포넌트
function DashboardCard({ title, count, onClick, active, color }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        background: active ? color : "white",
        color: active ? "white" : "#111",
        padding: "20px",
        borderRadius: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: active ? "none" : "1px solid #e5e7eb",
        transition: "0.2s",
      }}
    >
      <div style={{ fontSize: "14px", marginBottom: "8px" }}>{title}</div>
      <div style={{ fontSize: "28px", fontWeight: "bold" }}>{count}</div>
    </div>
  );
}
