import Image from "next/image";

export default function Home() {
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

      {/* 본문 */}
      <main style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>로고 테스트 화면입니다.</h2>
          <p>여기부터 공고 리스트 UI를 붙일 수 있습니다.</p>
        </div>
      </main>
    </div>
  );
}
