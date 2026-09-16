import React, { useState } from "react";
import { MOCK_NEWS } from "../data/mockData";
import { NewsArticle } from "../types";
import { Calendar, ArrowRight, User, X } from "lucide-react";

export const NewsView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full">
          Informasi & Pengumuman
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Berita & Agenda MTS Al Hidayah CA
        </h1>
        <p className="text-sm text-slate-500">
          Ikuti perkembangan terbaru seputar kegiatan akademik, prestasi siswa, dan agenda penting sekolah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_NEWS.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col">
            <div className="h-52 overflow-hidden relative">
              <img
                src={item.gambar}
                alt={item.judul}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-sm">
                {item.kategori}
              </span>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {item.tanggal}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" /> {item.penulis}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg leading-snug hover:text-emerald-700 transition">
                  {item.judul}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.ringkasan}
                </p>
              </div>
              <button
                onClick={() => setSelectedArticle(item)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 pt-2"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  {selectedArticle.kategori}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{selectedArticle.judul}</h2>
                <p className="text-xs text-slate-400 mt-1">{selectedArticle.tanggal} • Oleh {selectedArticle.penulis}</p>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-64">
              <img src={selectedArticle.gambar} alt={selectedArticle.judul} className="w-full h-full object-cover" />
            </div>

            <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{selectedArticle.konten}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
