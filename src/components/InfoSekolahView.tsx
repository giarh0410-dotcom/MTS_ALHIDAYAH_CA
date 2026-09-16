import React, { useState } from "react";
import { ChevronRight, Calendar, Download, Megaphone, Info, Building, FileText } from "lucide-react";
import { SCHOOL_INFO } from "../data/mockData";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface InfoSekolahViewProps {
  setCurrentTab: (tab: string) => void;
  subCategory?: "info_sekolah" | "agenda_sekolah" | "pengumuman" | "download";
  currentLang?: string;
}

export const InfoSekolahView: React.FC<InfoSekolahViewProps> = ({ setCurrentTab, subCategory = "info_sekolah", currentLang = "ID" }) => {
  const [activeSub, setActiveSub] = useState<string>(subCategory);
  const [customNews, setCustomNews] = useState<any[]>([]);
  const [orgStructure, setOrgStructure] = useState<Array<{ id: string; jabatan: string; nama: string }>>([
    { id: "1", jabatan: "Ketua Yayasan", nama: "Drs. K.H. Ahmad Hidayat, M.Pd" },
    { id: "2", jabatan: "Kepala Madrasah / Sekolah", nama: "Saepul, S.Pd." },
    { id: "3", jabatan: "Wakasek Bidang Kurikulum", nama: "Siti Aminah, M.Pd." },
    { id: "4", jabatan: "Wakasek Bidang Kesiswaan", nama: "Ahmad Fauzi, S.Pd." },
    { id: "5", jabatan: "Bendahara Sekolah", nama: "Nurul Hidayah, S.E." },
    { id: "6", jabatan: "Sekretaris Madrasah", nama: "Fauzan Azim, S.Kom." },
  ]);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  React.useEffect(() => {
    try {
      const storedNews = localStorage.getItem("mts_admin_news");
      if (storedNews) {
        setCustomNews(JSON.parse(storedNews));
      }
      const storedOrg = localStorage.getItem("mts_admin_org");
      if (storedOrg) {
        setOrgStructure(JSON.parse(storedOrg));
      }
    } catch (e) {}

    async function loadNews() {
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        if (!querySnapshot.empty) {
          const list: any[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push(docSnap.data());
          });
          setCustomNews(list);
          localStorage.setItem("mts_admin_news", JSON.stringify(list));
        }
      } catch (e) {}
    }
    loadNews();
  }, []);

  const getHeaderInfo = () => {
    switch (activeSub) {
      case "info_sekolah":
        return {
          tag: "PROFIL SEKOLAH",
          title: "Selamat Datang di Portal Resmi Sekolah Percontohan Digital",
          breadcrumb: "Selamat Datang di Portal Resmi Sekolah Percontohan Digital"
        };

      case "agenda_sekolah":
      case "info_agenda":
        return {
          tag: "AGENDA KEGIATAN",
          title: "Agenda Sekolah & Kalender Akademik",
          breadcrumb: "Agenda Sekolah"
        };
      case "pengumuman":
      case "info_pengumuman":
        return {
          tag: "PENGUMUMAN RESMI",
          title: "Pengumuman Terbaru untuk Siswa & Orang Tua",
          breadcrumb: "Pengumuman"
        };
      case "kegiatan_berita":
        return {
          tag: "KEGIATAN & BERITA",
          title: "Publikasi Kegiatan Terbaru & Berita Sekolah",
          breadcrumb: "Kegiatan & Berita"
        };
      case "download":
      case "info_download":
        return {
          tag: "PUSAT DOWNLOAD",
          title: "Unduh Dokumen, Formulir & Brosur Sekolah",
          breadcrumb: "Download Dokumen"
        };
      default:
        return {
          tag: "PROFIL SEKOLAH",
          title: "Informasi Sekolah",
          breadcrumb: "Info Sekolah"
        };
    }
  };

  const header = getHeaderInfo();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Transparent Header Banner */}
      <div className="text-slate-900 py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => setCurrentTab("home")} className="hover:text-emerald-600 transition">Beranda</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-600 font-semibold">{header.breadcrumb}</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold inline-block">
              ✨ {header.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{header.title}</h1>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <AnimatedDotGrid />
            <AnimatedArrow />
          </div>
        </div>
      </div>

      {/* Subcategory Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-2 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSub("info_sekolah")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSub === "info_sekolah" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Info className="w-4 h-4" /> Info Sekolah
          </button>
          <button
            onClick={() => setActiveSub("agenda_sekolah")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSub === "agenda_sekolah" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-4 h-4" /> Agenda Sekolah
          </button>
          <button
            onClick={() => setActiveSub("pengumuman")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSub === "pengumuman" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Megaphone className="w-4 h-4" /> Pengumuman
          </button>
          <button
            onClick={() => setActiveSub("kegiatan_berita")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSub === "kegiatan_berita" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-4 h-4" /> Kegiatan & Berita
          </button>
          <button
            onClick={() => setActiveSub("download")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeSub === "download" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        {activeSub === "info_sekolah" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="text-xs text-slate-400 font-medium">Diperbarui 29 Juni 2026</div>
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Informasi Lengkap
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-700">
              <div className="space-y-3">
                <p><strong>Nama Sekolah:</strong> MTS Al Hidayah CA </p>
                <p><strong>NPSN:</strong> 20279706</p>
                <p><strong>Akreditasi:</strong> A (Unggul)</p>
                <p><strong>Kepala Sekolah:</strong> {SCHOOL_INFO.principal}</p>
              </div>
              <div className="space-y-3">
                <p><strong>Alamat:</strong> {SCHOOL_INFO.address}</p>
                <p><strong>Telepon:</strong> {SCHOOL_INFO.phone}</p>
                <p><strong>Email:</strong> {SCHOOL_INFO.email}</p>
                <p><strong>Website:</strong> www.smanusantaramadani.sch.id</p>
              </div>
            </div>
          </div>
        )}

        {activeSub === "agenda_sekolah" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Agenda Kegiatan Akademik 2026
            </h2>
            <div className="space-y-4">
              {[
                { tanggal: "20 September 2026", acara: "Ujian Tengah Semester (UTS) Ganjil", lokasi: "Ruang Kelas Masing-masing" },
                { tanggal: "5 Oktober 2026", acara: "Peringatan Hari Batik Nasional & Pentas Seni", lokasi: "Aula Utama Sekolah" },
                { tanggal: "15 November 2026", acara: "Studi Banding & Kunjungan Kampus Universitas Indonesia", lokasi: "Depok, Jawa Barat" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      {item.tanggal.slice(0, 5)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{item.acara}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Lokasi: {item.lokasi}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    Agenda Resmi
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSub === "pengumuman" && (
          <div className="space-y-6">
            {[
              { judul: "Pengumuman Kelulusan", tanggal: "02 JUNI 2025", baru: true, isi: "Informasi kelulusan siswa kelas XII tahun ajaran 2024/2025." },
              { judul: "Pengumuman Hari Libur", tanggal: "17 MEI 2025", baru: false, isi: "Jadwal libur nasional dan cuti bersama semester genap." },
              { judul: "Pengumuman Jadwal Ujian Akhir Semester", tanggal: "10 APRIL 2025", baru: false, isi: "Ketentuan dan tata tertib pelaksanaan Ujian Akhir Semester." },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <Calendar className="w-3.5 h-3.5" /> {p.tanggal}
                    </span>
                    {p.baru && (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                        BARU
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                    {p.judul}
                  </h3>
                  <p className="text-xs text-slate-500">{p.isi}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition shrink-0 ml-4 shadow-xs">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSub === "kegiatan_berita" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Publikasi Kegiatan & Berita Terbaru Sekolah
            </h2>
            {customNews.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
                Belum ada kegiatan atau berita yang diunggah melalui Portal Admin.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customNews.map((news) => (
                  <div key={news.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between">
                    <div>
                      <div className="h-48 overflow-hidden bg-slate-100">
                        {news.gambar && (news.gambar.includes("youtube.com") || news.gambar.includes("youtu.be")) ? (
                          <iframe
                            src={getYouTubeEmbedUrl(news.gambar)}
                            title={news.judul}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <img
                            src={news.gambar || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80"}
                            alt={news.judul}
                            className="w-full h-full object-cover hover:scale-105 transition duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80";
                            }}
                          />
                        )}
                      </div>
                      <div className="p-6 space-y-3">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                          {news.kategori}
                        </span>
                        <h3 className="font-bold text-slate-900 text-lg leading-snug">{news.judul}</h3>
                        <p className="text-xs text-slate-500 line-clamp-3">{news.ringkasan}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4 mt-2">
                      <span>{news.tanggal}</span>
                      <span className="font-semibold text-emerald-600">Oleh {news.penulis}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}



        {activeSub === "download" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Pusat Unduhan Dokumen
            </h2>
            <div className="space-y-4">
              {[
                { nama: "Kalender Akademik Tahun Ajaran 2026/2027.pdf", ukuran: "2.4 MB" },
                { nama: "Formulir Surat Izin Tidak Masuk Sekolah.docx", ukuran: "450 KB" },
                { nama: "Panduan Penggunaan Portal Orang Tua.pdf", ukuran: "1.8 MB" },
              ].map((doc, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.nama}</h4>
                      <p className="text-xs text-slate-400">Ukuran file: {doc.ukuran}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Mengunduh ${doc.nama}...`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Unduh
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
