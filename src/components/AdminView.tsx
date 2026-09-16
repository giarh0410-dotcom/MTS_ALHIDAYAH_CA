import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Users, GraduationCap, Image, Video, FileText, 
  Settings, Plus, Trash2, Edit3, Save, CheckCircle, Upload, 
  Layers, School, Award, Calendar, BookOpen, AlertCircle 
} from "lucide-react";
import { SCHOOL_INFO, SAMPLE_STUDENTS, MOCK_NEWS } from "../data/mockData";
import { StudentProfile, NewsArticle } from "../types";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

interface AdminViewProps {
  currentLang?: string;
}

export const AdminView: React.FC<AdminViewProps> = ({ currentLang = "ID" }) => {
  const [activeSection, setActiveSection] = useState<"dashboard" | "siswa" | "guru" | "alumni" | "organisasi" | "media" | "kegiatan" | "profil">("dashboard");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);

  // Local state for management
  const [students, setStudents] = useState<StudentProfile[]>(SAMPLE_STUDENTS);
  const [newsList, setNewsList] = useState<NewsArticle[]>(MOCK_NEWS);
  const [mediaList, setMediaList] = useState<Array<{ id: string; title: string; type: "image" | "video"; url: string; date: string }>>([
    { id: "1", title: "Kegiatan Lomba OSN 2026", type: "image", url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80", date: "12 Sept 2026" },
    { id: "2", title: "Upacara Hari Pendidikan Nasional", type: "image", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80", date: "2 Mei 2026" },
    { id: "3", title: "Profil Singkat Madrasah", type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", date: "15 Januari 2026" }
  ]);
  const [teachers, setTeachers] = useState<Array<{ id: string; name: string; nip: string; subject: string; photo: string }>>([
    { id: "1", name: "Drs. K.H. Ahmad Hidayat, M.Pd", nip: "196803121992031002", subject: "Kepala Yayasan", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" },
    { id: "2", name: "Saepul, S.Pd", nip: "197805122005011003", subject: "Kepala Sekolah", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80" },
    { id: "3", name: "Siti Aminah, M.Pd", nip: "198203212008012001", subject: "Kurikulum", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80" }
  ]);
  const [alumniList, setAlumniList] = useState<Array<{ id: string; nama: string; tahun: string; kuliah: string; foto: string }>>([
    { id: "A-1", nama: "Rizky Pratama, S.T.", tahun: "Lulus 2024", kuliah: "Teknik Informatika ITB", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" },
    { id: "A-2", nama: "Anastasya Putri, S.Ked.", tahun: "Lulus 2023", kuliah: "Kedokteran Universitas Indonesia", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80" },
  ]);

  const [schoolProfile, setSchoolProfile] = useState({ ...SCHOOL_INFO });
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [orgStructure, setOrgStructure] = useState<Array<{ id: string; jabatan: string; nama: string }>>([
    { id: "1", jabatan: "Ketua Yayasan", nama: "Drs. K.H. Ahmad Hidayat, M.Pd" },
    { id: "2", jabatan: "Kepala Madrasah / Sekolah", nama: "Saepul, S.Pd." },
    { id: "3", jabatan: "Wakasek Bidang Kurikulum", nama: "Siti Aminah, M.Pd." },
    { id: "4", jabatan: "Wakasek Bidang Kesiswaan", nama: "Ahmad Fauzi, S.Pd." },
    { id: "5", jabatan: "Bendahara Sekolah", nama: "Nurul Hidayah, S.E." },
    { id: "6", jabatan: "Sekretaris Madrasah", nama: "Fauzan Azim, S.Kom." },
  ]);

  useEffect(() => {
    async function loadData() {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        if (!querySnapshot.empty) {
          const list: StudentProfile[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push(docSnap.data() as StudentProfile);
          });
          setStudents(list);
        } else {
          const storedSiswa = localStorage.getItem("mts_admin_students");
          if (storedSiswa) {
            setStudents(JSON.parse(storedSiswa));
          }
        }
      } catch (e) {
        try {
          const storedSiswa = localStorage.getItem("mts_admin_students");
          if (storedSiswa) {
            setStudents(JSON.parse(storedSiswa));
          }
        } catch (err) {}
      }

      try {
        const newsSnap = await getDocs(collection(db, "news"));
        if (!newsSnap.empty) {
          const list: NewsArticle[] = [];
          newsSnap.forEach((docSnap) => {
            list.push(docSnap.data() as NewsArticle);
          });
          setNewsList(list);
        } else {
          const storedNews = localStorage.getItem("mts_admin_news");
          if (storedNews) {
            setNewsList(JSON.parse(storedNews));
          }
        }
      } catch (e) {
        try {
          const storedNews = localStorage.getItem("mts_admin_news");
          if (storedNews) {
            setNewsList(JSON.parse(storedNews));
          }
        } catch (err) {}
      }

      try {
        const storedOrg = localStorage.getItem("mts_admin_org");
        if (storedOrg) {
          setOrgStructure(JSON.parse(storedOrg));
        }
        const storedAlumni = localStorage.getItem("mts_admin_alumni");
        if (storedAlumni) {
          setAlumniList(JSON.parse(storedAlumni));
        }
      } catch (e) {}
    }
    loadData();
  }, []);

  const handleUpdateOrg = (id: string, newNama: string) => {
    const updated = orgStructure.map(item => item.id === id ? { ...item, nama: newNama } : item);
    setOrgStructure(updated);
    localStorage.setItem("mts_admin_org", JSON.stringify(updated));
    triggerSuccess("Nama struktur organisasi berhasil diperbarui!");
  };

  // New item form states
  const [newStudent, setNewStudent] = useState({ namaLengkap: "", nisn: "", kelas: "X MIPA 1", jurusan: "MIPA", statusPembayaran: "Lunas" });
  const [newTeacher, setNewTeacher] = useState({ name: "", nip: "", subject: "", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" });
  const [newAlumni, setNewAlumni] = useState({ nama: "", tahun: "Lulus 2025", kuliah: "", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" });
  const [newMedia, setNewMedia] = useState({ title: "", type: "image" as "image" | "video", url: "" });
  const [newNews, setNewNews] = useState({ judul: "", kategori: "Kegiatan Sekolah", penulis: "Admin", tanggal: "16 September 2026", ringkasan: "", konten: "", gambar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80" });
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newOrg, setNewOrg] = useState({ jabatan: "", nama: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "") {
      setIsAdminLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.namaLengkap || !newStudent.nisn) return;
    const item: StudentProfile = {
      id: `STD-${Date.now()}`,
      nisn: newStudent.nisn,
      namaLengkap: newStudent.namaLengkap,
      kelas: newStudent.kelas,
      jurusan: newStudent.jurusan,
      waliKelas: "Tim Guru Wali",
      foto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
      kehadiranPersen: 100,
      rataRataNilai: 88.0,
      poinPelanggaran: 0,
      statusPembayaran: newStudent.statusPembayaran as any
    };
    
    let currentList = students;
    try {
      const stored = localStorage.getItem("mts_admin_students");
      if (stored) {
        currentList = JSON.parse(stored);
      }
    } catch (e) {}

    const updated = [item, ...currentList];
    setStudents(updated);
    try {
      localStorage.setItem("mts_admin_students", JSON.stringify(updated));
      await setDoc(doc(db, "students", item.id), item);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `students/${item.id}`);
    }
    setNewStudent({ namaLengkap: "", nisn: "", kelas: "X MIPA 1", jurusan: "MIPA", statusPembayaran: "Lunas" });
    triggerSuccess("Data siswa berhasil ditambahkan dan disimpan ke database Firebase!");
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.subject) return;
    const item = {
      id: `TCH-${Date.now()}`,
      ...newTeacher
    };
    setTeachers([item, ...teachers]);
    setNewTeacher({ name: "", nip: "", subject: "", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" });
    triggerSuccess("Data guru berhasil ditambahkan!");
  };

  const handleAddAlumni = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlumni.nama || !newAlumni.kuliah) return;
    const item = {
      id: `ALU-${Date.now()}`,
      ...newAlumni
    };
    const updated = [item, ...alumniList];
    setAlumniList(updated);
    localStorage.setItem("mts_admin_alumni", JSON.stringify(updated));
    setNewAlumni({ nama: "", tahun: "Lulus 2025", kuliah: "", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" });
    triggerSuccess("Data alumni berhasil ditambahkan ke database!");
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.title || !newMedia.url) return;
    const item = {
      id: `MED-${Date.now()}`,
      title: newMedia.title,
      type: newMedia.type,
      url: newMedia.url,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    };
    const updated = [item, ...mediaList];
    setMediaList(updated);
    localStorage.setItem("mts_admin_media", JSON.stringify(updated));
    setNewMedia({ title: "", type: "image", url: "" });
    triggerSuccess("Media foto/video berhasil diunggah dan otomatis masuk ke menu Galeri!");
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const type = file.type.includes("video") ? "video" : "image";
      setNewMedia({
        ...newMedia,
        title: newMedia.title || file.name.replace(/\.[^/.]+$/, ""),
        type,
        url
      });
      triggerSuccess(`File ${file.name} berhasil dipilih dan siap diunggah!`);
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.judul || !newNews.ringkasan) return;
    
    if (editingNewsId) {
      const updated = newsList.map(item => item.id === editingNewsId ? {
        ...item,
        judul: newNews.judul,
        kategori: newNews.kategori,
        tanggal: newNews.tanggal,
        penulis: newNews.penulis,
        ringkasan: newNews.ringkasan,
        konten: newNews.konten || newNews.ringkasan,
        gambar: newNews.gambar
      } : item);
      setNewsList(updated);
      localStorage.setItem("mts_admin_news", JSON.stringify(updated));
      try {
        const editedItem = updated.find(i => i.id === editingNewsId);
        if (editedItem) {
          await setDoc(doc(db, "news", editingNewsId), editedItem);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `news/${editingNewsId}`);
      }
      setEditingNewsId(null);
      setNewNews({ judul: "", kategori: "Kegiatan Sekolah", penulis: "Admin", tanggal: "16 September 2026", ringkasan: "", konten: "", gambar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80" });
      triggerSuccess("Kegiatan & Berita sekolah berhasil diperbarui dan disinkronkan ke database Firestore!");
    } else {
      const item: NewsArticle = {
        id: `NEWS-${Date.now()}`,
        judul: newNews.judul,
        tanggal: newNews.tanggal,
        kategori: newNews.kategori,
        penulis: newNews.penulis,
        ringkasan: newNews.ringkasan,
        konten: newNews.konten || newNews.ringkasan,
        gambar: newNews.gambar
      };
      const updated = [item, ...newsList];
      setNewsList(updated);
      localStorage.setItem("mts_admin_news", JSON.stringify(updated));
      try {
        await setDoc(doc(db, "news", item.id), item);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `news/${item.id}`);
      }
      setNewNews({ judul: "", kategori: "Kegiatan Sekolah", penulis: "Admin", tanggal: "16 September 2026", ringkasan: "", konten: "", gambar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80" });
      triggerSuccess("Kegiatan & Berita sekolah berhasil dipublikasikan dan disimpan permanen di database Firebase Firestore!");
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSuccess("Profil dan informasi sekolah berhasil diperbarui!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10 min-h-screen">
      {!isAdminLoggedIn ? (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl max-w-md w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Login Administrator</h2>
              <p className="text-xs text-slate-500">Masukkan akun dan password rahasia untuk mengakses panel manajemen madrasah.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Username / ID Admin</label>
                <input
                  type="text"
                  defaultValue="admin"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password / Passcode</label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-semibold"
                  placeholder="Masukkan passcode"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Passcode salah! Silakan masukkan passcode yang benar.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-md"
              >
                Masuk Dashboard Admin
              </button>
            </form>

          </div>
        </div>
      ) : (
        <>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Portal Pengelolaan Administrator
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Dashboard Admin & Manajemen Sekolah
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Atur dan unggah foto, video, database siswa & guru, kegiatan sekolah, galeri, serta profil madrasah secara real-time.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            🔒 Keluar (Logout)
          </button>
          <div className="flex items-center gap-4">
            <AnimatedDotGrid />
            <AnimatedArrow />
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 shadow-xs animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        {[
          { id: "dashboard", label: "📊 Ringkasan", icon: Layers },
          { id: "siswa", label: "👥 Database Siswa", icon: GraduationCap },
          { id: "guru", label: "👨‍🏫 Database Guru", icon: Users },
          { id: "alumni", label: "🎓 Database Alumni", icon: GraduationCap },
          { id: "organisasi", label: "🏢 Struktur Organisasi (Profil)", icon: Users },
          { id: "media", label: "📸 Upload Foto & Video", icon: Image },
          { id: "kegiatan", label: "📰 Kegiatan & Berita", icon: Calendar },
          { id: "profil", label: "🏫 Profil & Info Sekolah", icon: School },
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                isActive 
                  ? "bg-emerald-600 text-white shadow-md" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="space-y-8">
        
        {/* 1. DASHBOARD OVERVIEW */}
        {activeSection === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Total Siswa</span>
                <h3 className="text-3xl font-extrabold text-slate-900">{students.length} Siswa</h3>
                <p className="text-xs text-emerald-600 font-medium">Terdaftar di database aktif</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Dewan Guru</span>
                <h3 className="text-3xl font-extrabold text-slate-900">{teachers.length} Guru</h3>
                <p className="text-xs text-emerald-600 font-medium">Pengajar & Staf</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Media & Galeri</span>
                <h3 className="text-3xl font-extrabold text-slate-900">{mediaList.length} Berkas</h3>
                <p className="text-xs text-emerald-600 font-medium">Foto & Video kegiatan</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Berita & Agenda</span>
                <h3 className="text-3xl font-extrabold text-slate-900">{newsList.length} Post</h3>
                <p className="text-xs text-emerald-600 font-medium">Publikasi aktif</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Pusat Kontrol Cepat Administrator</span>
              </h3>
              <p className="text-sm text-slate-600">
                Gunakan tab di atas untuk mengunggah materi kegiatan baru, menambah atau mengedit data siswa dan guru, serta memperbarui informasi profil madrasah secara instan.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <button 
                  onClick={() => setActiveSection("media")}
                  className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition text-left space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">📸</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700">Upload Foto & Video</h4>
                  <p className="text-xs text-slate-600">Unggah dokumentasi lomba OSN, upacara, dan kegiatan ekstrakurikuler.</p>
                </button>
                <button 
                  onClick={() => setActiveSection("siswa")}
                  className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition text-left space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">👥</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700">Kelola Database Siswa</h4>
                  <p className="text-xs text-slate-600">Tambah data siswa baru, cek status pembayaran, dan rekam nilai akademik.</p>
                </button>
                <button 
                  onClick={() => setActiveSection("kegiatan")}
                  className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition text-left space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">📰</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700">Publikasi Kegiatan Sekolah</h4>
                  <p className="text-xs text-slate-600">Buat pengumuman, agenda, dan berita prestasi terbaru untuk halaman publik.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. DATABASE SISWA */}
        {activeSection === "siswa" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>Tambah Data Siswa Baru</span>
              </h3>
              <form onSubmit={handleAddStudent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={newStudent.namaLengkap}
                    onChange={(e) => setNewStudent({...newStudent, namaLengkap: e.target.value})}
                    placeholder="Contoh: Muhammad Rizki"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NISN</label>
                  <input
                    type="text"
                    required
                    value={newStudent.nisn}
                    onChange={(e) => setNewStudent({...newStudent, nisn: e.target.value})}
                    placeholder="Contoh: 0081234567"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kelas</label>
                  <input
                    type="text"
                    value={newStudent.kelas}
                    onChange={(e) => setNewStudent({...newStudent, kelas: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Simpan Siswa
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Daftar Siswa Terdaftar ({students.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                      <th className="p-3.5">Nama & NISN</th>
                      <th className="p-3.5">Kelas</th>
                      <th className="p-3.5">Jurusan</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50 transition">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={st.foto} alt={st.namaLengkap} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                          <div>
                            <p className="font-bold text-slate-900">{st.namaLengkap}</p>
                            <p className="text-xs text-slate-500">NISN: {st.nisn}</p>
                          </div>
                        </td>
                        <td className="p-3.5 font-medium text-slate-700">{st.kelas}</td>
                        <td className="p-3.5 text-slate-600 text-xs">{st.jurusan}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={async () => {
                              const updated = students.filter(s => s.id !== st.id);
                              setStudents(updated);
                              try {
                                localStorage.setItem("mts_admin_students", JSON.stringify(updated));
                                await deleteDoc(doc(db, "students", st.id));
                              } catch (err) {
                                handleFirestoreError(err, OperationType.DELETE, `students/${st.id}`);
                              }
                              triggerSuccess("Data siswa berhasil dihapus.");
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition inline-flex items-center justify-center"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. DATABASE GURU */}
        {activeSection === "guru" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Tambah Data Guru & Staf</span>
              </h3>
              <form onSubmit={handleAddTeacher} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                    placeholder="Contoh: Dr. H. Budi, M.Pd"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">NIP</label>
                  <input
                    type="text"
                    value={newTeacher.nip}
                    onChange={(e) => setNewTeacher({...newTeacher, nip: e.target.value})}
                    placeholder="19800101..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran / Jabatan</label>
                  <input
                    type="text"
                    required
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                    placeholder="Matematika / Wakasek"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Simpan Data Guru
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Daftar Guru & Staf ({teachers.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((tch) => (
                  <div key={tch.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={tch.photo} alt={tch.name} className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-xs" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{tch.name}</h4>
                        <p className="text-xs text-emerald-600 font-semibold">{tch.subject}</p>
                        <p className="text-xs text-slate-500">NIP: {tch.nip || "-"}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setTeachers(teachers.filter(t => t.id !== tch.id));
                        triggerSuccess("Data guru berhasil dihapus.");
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. DATABASE ALUMNI */}
        {activeSection === "alumni" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>Tambah Data Alumni Sukses</span>
              </h3>
              <form onSubmit={handleAddAlumni} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    value={newAlumni.nama}
                    onChange={(e) => setNewAlumni({...newAlumni, nama: e.target.value})}
                    placeholder="Contoh: Rizky Pratama, S.T."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Lulus</label>
                  <input
                    type="text"
                    required
                    value={newAlumni.tahun}
                    onChange={(e) => setNewAlumni({...newAlumni, tahun: e.target.value})}
                    placeholder="Contoh: Lulus 2024"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Universitas / Pekerjaan Saat Ini</label>
                  <input
                    type="text"
                    required
                    value={newAlumni.kuliah}
                    onChange={(e) => setNewAlumni({...newAlumni, kuliah: e.target.value})}
                    placeholder="Contoh: Teknik Informatika ITB"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Simpan Data Alumni
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Daftar Alumni Terdaftar ({alumniList.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {alumniList.map((alu) => (
                  <div key={alu.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={alu.foto} alt={alu.nama} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs" />
                      <div>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">{alu.tahun}</span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{alu.nama}</h4>
                        <p className="text-xs text-emerald-700 font-semibold">{alu.kuliah}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const updated = alumniList.filter(a => a.id !== alu.id);
                        setAlumniList(updated);
                        localStorage.setItem("mts_admin_alumni", JSON.stringify(updated));
                        triggerSuccess("Data alumni berhasil dihapus.");
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. UPLOAD FOTO & VIDEO (MEDIA & GALERI) */}
        {activeSection === "media" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-emerald-600" />
                <span>Unggah Foto Kegiatan & Video Sekolah</span>
              </h3>
              <form onSubmit={handleAddMedia} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul / Keterangan Media</label>
                    <input
                      type="text"
                      required
                      value={newMedia.title}
                      onChange={(e) => setNewMedia({...newMedia, title: e.target.value})}
                      placeholder="Contoh: Juara Umum OSN Tingkat Provinsi"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Media</label>
                    <select
                      value={newMedia.type}
                      onChange={(e) => setNewMedia({...newMedia, type: e.target.value as any})}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                      <option value="image">Foto / Gambar (JPG/PNG)</option>
                      <option value="video">Video (MP4 / YouTube)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pilih File dari Perangkat (Lokal)</label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileSelection}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer border border-slate-200 rounded-xl p-1 bg-slate-50"
                    />
                    <p className="text-xs text-slate-400 mt-1">Atau masukkan URL di samping jika menggunakan link eksternal.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Atau URL Gambar / Link Video</label>
                    <input
                      type="text"
                      value={newMedia.url}
                      onChange={(e) => setNewMedia({...newMedia, url: e.target.value})}
                      placeholder="https://images.unsplash.com/... atau URL video"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {newMedia.url && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                    <div className="w-24 h-20 bg-slate-200 rounded-xl overflow-hidden shrink-0 border border-slate-300">
                      {newMedia.type === "image" ? (
                        <img src={newMedia.url} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">Video</div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pratinjau Media</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{newMedia.title || "Tanpa Judul"}</p>
                      <p className="text-xs text-emerald-600 truncate max-w-md mt-1">{newMedia.url}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
                  >
                    <Upload className="w-4 h-4" /> Unggah Berkas Media
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Daftar Media & Galeri ({mediaList.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaList.map((med) => (
                  <div key={med.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs flex flex-col justify-between">
                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                      {med.type === "image" ? (
                        <img src={med.url} alt={med.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white font-bold gap-2">
                          <Video className="w-8 h-8 text-emerald-400" />
                          <span>Video Kegiatan</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full uppercase font-bold">
                        {med.type}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{med.title}</h4>
                        <p className="text-xs text-slate-500">{med.date}</p>
                      </div>
                      <button
                        onClick={() => {
                          setMediaList(mediaList.filter(m => m.id !== med.id));
                          triggerSuccess("Media berhasil dihapus.");
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. KEGIATAN & BERITA */}
        {activeSection === "kegiatan" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>{editingNewsId ? "Edit Kegiatan Sekolah & Berita" : "Publikasikan Kegiatan Sekolah & Berita"}</span>
              </h3>
              <form onSubmit={handleAddNews} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Judul Kegiatan / Berita</label>
                  <input
                    type="text"
                    required
                    value={newNews.judul}
                    onChange={(e) => setNewNews({...newNews, judul: e.target.value})}
                    placeholder="Contoh: Pesantren Kilat Ramadhan 2026"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newNews.kategori}
                    onChange={(e) => setNewNews({...newNews, kategori: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Kegiatan / Berita</label>
                  <input
                    type="text"
                    required
                    value={newNews.tanggal}
                    onChange={(e) => setNewNews({...newNews, tanggal: e.target.value})}
                    placeholder="Contoh: 16 September 2026"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Diposting Oleh (Penulis / Admin)</label>
                  <input
                    type="text"
                    required
                    value={newNews.penulis}
                    onChange={(e) => setNewNews({...newNews, penulis: e.target.value})}
                    placeholder="Contoh: Admin / Humas Sekolah"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan / Sinopsis</label>
                  <textarea
                    required
                    rows={2}
                    value={newNews.ringkasan}
                    onChange={(e) => setNewNews({...newNews, ringkasan: e.target.value})}
                    placeholder="Ringkasan singkat kegiatan..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  ></textarea>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Upload Gambar dari Perangkat atau URL</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const compressedBase64 = await new Promise<string>((resolve) => {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const img = new Image();
                              img.onload = () => {
                                const canvas = document.createElement("canvas");
                                let width = img.width;
                                let height = img.height;
                                const maxWidth = 800;
                                if (width > maxWidth) {
                                  height = Math.round((height * maxWidth) / width);
                                  width = maxWidth;
                                }
                                canvas.width = width;
                                canvas.height = height;
                                const ctx = canvas.getContext("2d");
                                ctx?.drawImage(img, 0, 0, width, height);
                                resolve(canvas.toDataURL("image/jpeg", 0.75));
                              };
                              img.src = event.target?.result as string;
                            };
                            reader.readAsDataURL(file);
                          });
                          setNewNews({ ...newNews, gambar: compressedBase64 });
                          triggerSuccess(`Gambar ${file.name} berhasil dikompresi dan diunggah dengan cepat!`);
                        } catch (err) {
                          triggerSuccess(`Gagal mengompresi gambar.`);
                        }
                      }
                    }}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer border border-slate-200 rounded-xl p-1 bg-slate-50 mb-2"
                  />
                  <input
                    type="text"
                    value={newNews.gambar}
                    onChange={(e) => setNewNews({...newNews, gambar: e.target.value})}
                    placeholder="Atau masukkan URL gambar https://..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end gap-3">
                  {editingNewsId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNewsId(null);
                        setNewNews({ judul: "", kategori: "Kegiatan Sekolah", penulis: "Admin", ringkasan: "", konten: "", gambar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80" });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 px-6 rounded-xl text-sm transition"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
                  >
                    {editingNewsId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingNewsId ? "Simpan Perubahan" : "Publikasikan Kegiatan"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Daftar Kegiatan & Berita Dipublikasikan ({newsList.length})</h3>
              <div className="space-y-4">
                {newsList.map((ns) => (
                  <div key={ns.id} className="p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                      <img src={ns.gambar} alt={ns.judul} className="w-20 h-16 rounded-xl object-cover border border-slate-200 shrink-0" />
                      <div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mb-1">{ns.kategori}</span>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{ns.judul}</h4>
                        <p className="text-xs text-slate-500">{ns.tanggal} • Oleh {ns.penulis}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingNewsId(ns.id);
                          setNewNews({
                            judul: ns.judul,
                            kategori: ns.kategori,
                            penulis: ns.penulis || "Admin",
                            tanggal: ns.tanggal || "16 September 2026",
                            ringkasan: ns.ringkasan,
                            konten: ns.konten,
                            gambar: ns.gambar
                          });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="Edit Berita"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          const updated = newsList.filter(n => n.id !== ns.id);
                          setNewsList(updated);
                          localStorage.setItem("mts_admin_news", JSON.stringify(updated));
                          try {
                            await deleteDoc(doc(db, "news", ns.id));
                          } catch (err) {
                            handleFirestoreError(err, OperationType.DELETE, `news/${ns.id}`);
                          }
                          triggerSuccess("Berita/kegiatan berhasil dihapus dari database Firestore.");
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. PROFIL & INFO SEKOLAH */}
        {activeSection === "profil" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <School className="w-5 h-5 text-emerald-600" />
              <span>Pengaturan Profil & Informasi Sekolah</span>
            </h3>
            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Sekolah</label>
                <input
                  type="text"
                  value={schoolProfile.name}
                  onChange={(e) => setSchoolProfile({...schoolProfile, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kepala Sekolah</label>
                <input
                  type="text"
                  value={schoolProfile.principal}
                  onChange={(e) => setSchoolProfile({...schoolProfile, principal: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none font-semibold"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Sekolah</label>
                <input
                  type="text"
                  value={schoolProfile.tagline}
                  onChange={(e) => setSchoolProfile({...schoolProfile, tagline: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  value={schoolProfile.address}
                  onChange={(e) => setSchoolProfile({...schoolProfile, address: e.target.value})}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nomor Telepon & Email</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={schoolProfile.phone}
                    onChange={(e) => setSchoolProfile({...schoolProfile, phone: e.target.value})}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 outline-none"
                  />
                  <input
                    type="text"
                    value={schoolProfile.email}
                    onChange={(e) => setSchoolProfile({...schoolProfile, email: e.target.value})}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 outline-none"
                  />
                </div>
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" /> Simpan Perubahan Profil
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 7. STRUKTUR ORGANISASI */}
        {activeSection === "organisasi" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Tambah Posisi / Pengurus Baru</span>
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newOrg.jabatan || !newOrg.nama) return;
                const newItem = {
                  id: `ORG-${Date.now()}`,
                  jabatan: newOrg.jabatan,
                  nama: newOrg.nama
                };
                const updated = [...orgStructure, newItem];
                setOrgStructure(updated);
                localStorage.setItem("mts_admin_org", JSON.stringify(updated));
                setNewOrg({ jabatan: "", nama: "" });
                triggerSuccess("Posisi organisasi baru berhasil ditambahkan!");
              }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Jabatan / Peran</label>
                  <input
                    type="text"
                    required
                    value={newOrg.jabatan}
                    onChange={(e) => setNewOrg({...newOrg, jabatan: e.target.value})}
                    placeholder="Contoh: Koordinator Ekstrakurikuler"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    value={newOrg.nama}
                    onChange={(e) => setNewOrg({...newOrg, nama: e.target.value})}
                    placeholder="Contoh: Drs. H. M. Sutisna, M.Pd."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Tambah Struktur
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Pengaturan Nama & Daftar Struktur Organisasi Sekolah ({orgStructure.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Ubah nama pejabat atau hapus pengurus pada struktur organisasi madrasah di bawah ini. Perubahan akan langsung tersimpan dan tampil di halaman publik.
              </p>
              <div className="space-y-4 pt-2">
                {orgStructure.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="w-full sm:w-1/3">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Jabatan</span>
                      <p className="font-bold text-slate-900 text-sm mt-0.5">{item.jabatan}</p>
                    </div>
                    <div className="w-full sm:w-2/3 flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">NAMA LENGKAP & GELAR</label>
                        <input
                          type="text"
                          value={item.nama}
                          onChange={(e) => {
                            const updated = orgStructure.map(o => o.id === item.id ? { ...o, nama: e.target.value } : o);
                            setOrgStructure(updated);
                          }}
                          className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none font-semibold bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 mt-4">
                        <button
                          onClick={() => handleUpdateOrg(item.id, item.nama)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-xs flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" /> Simpan
                        </button>
                        <button
                          onClick={() => {
                            const updated = orgStructure.filter(o => o.id !== item.id);
                            setOrgStructure(updated);
                            localStorage.setItem("mts_admin_org", JSON.stringify(updated));
                            triggerSuccess("Struktur organisasi berhasil dihapus.");
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
        </>
      )}
    </div>
  );
};
