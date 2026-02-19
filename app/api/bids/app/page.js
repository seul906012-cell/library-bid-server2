import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* 🔵 헤더 */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          국립중앙도서관 · 국회도서관 공고 정보
        </h1>

        {/* 🔥 데이터클립 로고 */}
        <Image
          src="/dataclip-logo.png"
          alt="데이터클립 로고"
          width={180}
          height={40}
          className="h-10 w-auto object-contain"
        />
      </header>

      {/* 🔵 본문 */}
      <main className="p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-700">
            로고 테스트 화면입니다.
          </p>
        </div>
      </main>
    </div>
  );
}
