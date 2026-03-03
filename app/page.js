"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  RefreshCw,
  ExternalLink,
  Building2,
  Calendar,
  Search,
  LayoutGrid,
} from "lucide-react";

const API_URL = "/api/bids";

export default function Dashboard() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBids = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBids(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LayoutGrid /> 입찰 공고 대시보드
        </h1>
        <button
          onClick={fetchBids}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <RefreshCw size={16} />
          새로고침
        </button>
      </div>

      {loading ? (
        <p>불러오는 중...</p>
      ) : bids.length === 0 ? (
        <p>검색 결과 없음</p>
      ) : (
        <div className="grid gap-4">
          {bids.map((bid, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow border"
            >
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <BookOpen size={18} />
                {bid.bidNtceNm}
              </h2>

              <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                <Building2 size={14} />
                {bid.dminsttNm}
              </p>

              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar size={14} />
                {bid.bidNtceDt}
              </p>

              <a
                href={bid.bidNtceDtlUrl}
                target="_blank"
                className="text-blue-600 text-sm flex items-center gap-1 mt-2"
              >
                상세보기 <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
