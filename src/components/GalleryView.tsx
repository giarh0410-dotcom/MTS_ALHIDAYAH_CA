import React, { useState } from "react";
import { MOCK_GALLERY } from "../data/mockData";
import { GalleryItem } from "../types";
import { Folder, Image as ImageIcon, ChevronRight, X } from "lucide-react";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface GalleryViewProps {
  setCurrentTab: (tab: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ setCurrentTab }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<any | null>(null);
  const [customMedia, setCustomMedia] = useState<Array<{ id: string; title: string; type: string; url: string; date: string }>>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("mts_admin_media");
      if (stored) {
        setCustomMedia(JSON.parse(stored));
      }
    } catch (e) {}

    async function loadMedia() {
      try {
        const mediaSnap = await getDocs(collection(db, "media"));
        if (!mediaSnap.empty) {
          const list: any[] = [];
          mediaSnap.forEach((docSnap) => {
            list.push(docSnap.data());
          });
          setCustomMedia(list);
          localStorage.setItem("mts_admin_media", JSON.stringify(list));
        }
      } catch (e) {}
    }
    loadMedia();
  }, []);

  // Group or display album cards matching the screenshot style
  const albums = [
    ...customMedia.map(m => ({
      id: m.id,
      judul: m.title,
      kategori: m.type === "video" ? "Video Kegiatan" : "Dokumentasi Terbaru",
      jumlahFoto: 1,
      cover: m.url,
      tanggal: m.date,
      type: m.type
    })),
    {
      id: "album-1",
      judul: "Album Gedung Utama & Sekolah",
      kategori: "Fasilitas",
      jumlahFoto: 24,
      cover: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80",
      tanggal: "September 2026"
    },
    {
      id: "album-2",
      judul: "Album Laboratorium Komputer & AI Lab",
      kategori: "Fasilitas",
      jumlahFoto: 18,
      cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
      tanggal: "Agustus 2026"
    },
    {
      id: "album-3",
      judul: "Album Kegiatan Upacara & Ekstrakurikuler",
      kategori: "Kegiatan Siswa",
      jumlahFoto: 42,
      cover: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
      tanggal: "Agustus 2026"
    },
    {
      id: "album-4",
      judul: "Album Festival Seni & Literasi Nusantara",
      kategori: "Seni & Budaya",
      jumlahFoto: 35,
      cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80",
      tanggal: "Juli 2026"
    },
    {
      id: "album-5",
      judul: "Album Olimpiade Sains & Prestasi Siswa",
      kategori: "Prestasi",
      jumlahFoto: 20,
      cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80",
      tanggal: "Juni 2026"
    },
    {
      id: "album-6",
      judul: "Album Perpustakaan Digital & Ruang Baca",
      kategori: "Fasilitas",
      jumlahFoto: 15,
      cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=80",
      tanggal: "Juni 2026"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Transparent Header Banner */}
      <div className="text-slate-900 py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => setCurrentTab("home")} className="hover:text-emerald-600 transition">Beranda</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-600 font-semibold">Galeri Foto</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Galeri Foto Sekolah</h1>
            <p className="text-slate-600 text-sm">Album foto kegiatan dan prestasi sekolah.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <AnimatedDotGrid />
            <AnimatedArrow />
          </div>
        </div>
      </div>

      {/* Album Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album.id}
              onClick={() => setSelectedAlbum(album as any)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition cursor-pointer group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={album.cover}
                  alt={album.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5" /> Album
                </span>
                <span className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> {album.jumlahFoto} Foto
                </span>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">{album.kategori}</span>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition leading-snug">
                  {album.judul}
                </h3>
                <p className="text-xs text-slate-400">{album.tanggal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Album Detail Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  {selectedAlbum.kategori}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{selectedAlbum.judul}</h2>
                <p className="text-xs text-slate-400 mt-0.5">Berisi {selectedAlbum.jumlahFoto} foto dokumentasi resmi sekolah.</p>
              </div>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[selectedAlbum.cover, ...MOCK_GALLERY.map(g => g.url)].slice(0, 6).map((imgUrl, i) => (
                <div key={i} className="h-36 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img src={imgUrl} alt="Album foto" className="w-full h-full object-cover hover:scale-105 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
