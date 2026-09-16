import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ExternalLink, 
  Award, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Calendar,
  CreditCard,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { SCHOOL_INFO, MOCK_NEWS, MOCK_GALLERY } from "../data/mockData";
import { YayasanLogo } from "./YayasanLogo";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";


interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  currentLang?: string;
}

const HERO_SLIDES_ID = [
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80",
    title: "Kegiatan Belajar Mengajar Modern",
    subtitle: "Suasana interaktif dan menyenangkan untuk siswa berprestasi"
  },
  {
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&auto=format&fit=crop&q=80",
    title: "Gedung Sekolah & Fasilitas Lengkap",
    subtitle: "Lingkungan sekolah asri, bersih, dan berstandar internasional"
  },
  {
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80",
    title: "Praktikum & Laboratorium Sains",
    subtitle: "Fasilitas penunjang riset dan eksperimen siswa yang canggih"
  },
  {
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&auto=format&fit=crop&q=80",
    title: "Prestasi & Ekstrakurikuler Unggulan",
    subtitle: "Wadah pengembangan bakat dan karakter mulia siswa"
  }
];

const HERO_SLIDES_EN = [
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80",
    title: "Modern Teaching & Learning Activities",
    subtitle: "Interactive and enjoyable atmosphere for high-achieving students"
  },
  {
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&auto=format&fit=crop&q=80",
    title: "School Building & Complete Facilities",
    subtitle: "Green, clean campus environment with international standards"
  },
  {
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&auto=format&fit=crop&q=80",
    title: "Practicum & Science Laboratories",
    subtitle: "Advanced facilities supporting student research and experiments"
  },
  {
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&auto=format&fit=crop&q=80",
    title: "Achievements & Featured Extracurriculars",
    subtitle: "Platform for developing student talent and noble character"
  }
];

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentTab, currentLang = "ID" }) => {
  const HERO_SLIDES = currentLang === "EN" ? HERO_SLIDES_EN : HERO_SLIDES_ID;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsList, setNewsList] = useState<any[]>(MOCK_NEWS);

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

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mts_admin_news");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.map((item: any) => ({
            ...item,
            gambar: item.gambar && item.gambar.trim() !== "" && !item.gambar.startsWith("/images/") 
              ? item.gambar 
              : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80"
          }));
          setNewsList(sanitized);
        }
      }
    } catch (e) {}

    async function loadNews() {
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        if (!querySnapshot.empty) {
          const list: any[] = [];
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const validImg = data.gambar && data.gambar.trim() !== "" && !data.gambar.startsWith("/images/")
              ? data.gambar
              : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80";
            list.push({
              ...data,
              gambar: validImg
            });
          });
          if (list.length > 0) {
            setNewsList(list);
            localStorage.setItem("mts_admin_news", JSON.stringify(list));
          }
        }
      } catch (e) {}
    }
    loadNews();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with School Building & Activities Slide Show */}
      <section className="relative text-white overflow-hidden py-28 lg:py-36">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100 pointer-events-none"
            } transition-transform duration-700`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-emerald-950/80"></div>
          </div>
        ))}

        {/* Carousel Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg opacity-40 hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg opacity-40 hover:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentSlide}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold inline-block"
              >
                ✨ {HERO_SLIDES[currentSlide].title}
              </motion.span>
            </AnimatePresence>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              {currentLang === "EN" ? "School Website from " : "Selamat Datang di "} <br />

              <span className="text-[#00c853]">MTS Al Hidayah CA</span>
            </h1>
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl font-light"
              >
                {HERO_SLIDES[currentSlide].subtitle}. {currentLang === "EN" ? "Powered by MTS Al Hidayah CA with parent portal, online PPDB, and digital payment features." : "Didukung oleh MTS Al Hidayah CA dengan fitur portal orang tua, PPDB online, dan pembayaran digital."}
              </motion.p>
            </AnimatePresence>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentTab("ppdb")}
                className="bg-[#00c853] hover:bg-[#00b047] text-white font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-[#00c853]/30 transition flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
              >
                <span>{currentLang === "EN" ? "Register" : "Pendaftaran"}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentTab("contact")}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-4 rounded-xl border border-white/20 backdrop-blur-sm transition flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
              >
                <span>{currentLang === "EN" ? "Contact Us" : "Hubungi Kami"}</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center gap-2 pt-6">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    i === currentSlide ? "w-8 bg-emerald-500" : "w-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Transparent Watermark Logo Emblem on Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center justify-center p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl animate-pulse"
          >
            <YayasanLogo className="w-48 h-56" opacity={0.35} />
            <span className="mt-4 text-xs font-semibold tracking-widest text-emerald-300 uppercase">Yayasan Al-Hidayah Depok</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-14 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8"
        >
          <div className="text-center p-4 border-r border-slate-100 last:border-none">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">100%</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {currentLang === "EN" ? "Graduates Entering State Schools" : "Lulusan Masuk Sekolah Negeri"}
            </p>
          </div>
          <div className="text-center p-4 border-r border-slate-100 last:border-none">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">1,250+</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {currentLang === "EN" ? "Active High-Achieving Students" : "Siswa Aktif Berprestasi"}
            </p>
          </div>
          <div className="text-center p-4 border-r border-slate-100 last:border-none">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">45+</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {currentLang === "EN" ? "Extracurriculars & Clubs" : "Ekstrakurikuler & Klub"}
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-slate-900">A (Unggul)</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {currentLang === "EN" ? "BAN-S/M Accreditation" : "Akreditasi BAN-S/M"}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        {/* Floating animated decorations */}
        <AnimatedDotGrid className="absolute -left-6 -top-6 hidden sm:block" />
        <AnimatedArrow className="absolute -right-8 bottom-0 hidden lg:block" />

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-xs relative z-10">
          <div className="lg:col-span-5 text-center flex justify-center">
            <div className="relative w-72 sm:w-80 h-80 sm:h-96 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80"
                alt="Kepala Sekolah"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-wide">
              <span>❝</span>
              <span>{currentLang === "EN" ? "PRINCIPAL'S WELCOME" : "SAMBUTAN KEPALA SEKOLAH"}</span>
            </div>
            <blockquote className="text-slate-800 text-base sm:text-lg leading-relaxed italic font-normal">
              {currentLang === "EN"
                ? `“Creative greetings...!!! We created this website as an effective and efficient communication medium to deliver important information regarding academic activities, extracurriculars, announcements, and various achievements earned by our beloved school. Through this website, we hope everyone can...”`
                : `“Salam Kreatifitas....!!! Website ini kami buat sebagai media komunikasi yang efektif dan efisien untuk menyampaikan berbagai informasi penting mengenai kegiatan akademik, ekstrakurikuler, pengumuman, serta berbagai prestasi yang telah diraih oleh sekolah kita tercinta. Melalui website ini, diharapkan kita semua dapat ...”`}
            </blockquote>
            <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">Saepul,S.Pd</h4>
              <p className="text-xs text-slate-500 mt-0.5">{currentLang === "EN" ? "Principal" : "Kepala Sekolah"}</p>
            </div>
          </div>
        </div>
      </section>



      {/* Berita & Pengumuman Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              {currentLang === "EN" ? "Latest Information" : "Informasi Terkini"}
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2">
              {currentLang === "EN" ? "School News & Agenda" : "Berita & Agenda Sekolah"}
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab("news")}
            className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm flex items-center gap-1.5"
          >
            <span>{currentLang === "EN" ? "View All News" : "Lihat Semua Berita"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col">
              <div className="h-48 overflow-hidden relative bg-slate-100">
                {item.gambar && (item.gambar.includes("youtube.com") || item.gambar.includes("youtu.be")) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(item.gambar)}
                    title={item.judul}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={item.gambar && item.gambar.trim() !== "" && !item.gambar.startsWith("/images/") ? item.gambar : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80"}
                    alt={item.judul}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                )}
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                  {currentLang === "EN" 
                    ? (item.kategori === "Prestasi" ? "Achievement" : item.kategori === "Pengumuman" ? "Announcement" : "Student Activity")
                    : item.kategori}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.tanggal}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-emerald-700 transition">
                    {currentLang === "EN" && item.id === "news-1" ? "Modern Al Fakir Islamic Junior High School Wins Gold Medal at National Science Olympiad 2026" : item.judul}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {currentLang === "EN" && item.id === "news-1" ? "Students of Modern Al Fakir Islamic Junior High School once again excelled at the national level." : item.ringkasan}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab("info_kegiatan")}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 pt-2"
                >
                  <span>{currentLang === "EN" ? "Read More" : "Baca Selengkapnya"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galeri Sekolah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            {currentLang === "EN" ? "Campus Documentation" : "Dokumentasi Sekolah"}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {currentLang === "EN" ? "School Gallery & Facilities" : "Galeri & Fasilitas Sekolah"}
          </h2>
          <p className="text-sm text-slate-500">
            {currentLang === "EN" 
              ? "A comfortable, green learning environment equipped with modern technology."
              : "Suasana belajar yang nyaman, asri, dan dilengkapi teknologi modern."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_GALLERY.slice(0, 6).map((item) => (
            <div key={item.id} className="relative rounded-2xl overflow-hidden h-48 sm:h-64 group shadow-sm">
              <img
                src={item.url}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                <div className="text-white">
                  <span className="text-[10px] font-bold bg-emerald-600 px-2 py-0.5 rounded text-white">{item.kategori}</span>
                  <p className="text-xs sm:text-sm font-semibold mt-1">{item.judul}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
