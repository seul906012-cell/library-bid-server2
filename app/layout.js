export const metadata = {
  title: "Library Bid Dashboard",
  description: "국립중앙도서관 · 국회도서관 공고",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
