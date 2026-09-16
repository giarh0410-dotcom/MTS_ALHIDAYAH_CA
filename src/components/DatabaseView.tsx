import React, { useState, useEffect } from "react";
import { Search, ChevronRight, User, BookOpen, Award, Mail, Phone, Filter } from "lucide-react";
import { SAMPLE_STUDENTS } from "../data/mockData";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { StudentProfile } from "../types";

interface DatabaseViewProps {
  setCurrentTab: (tab: string) => void;
  subCategory?: "siswa" | "guru" | "alumni";
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({ setCurrentTab, subCategory = "siswa" }) => {
  const [activeSub, setActiveSub] = useState<"siswa" | "guru" | "alumni">(subCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua Kelas");
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const stored = localStorage.getItem("mts_admin_students");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return SAMPLE_STUDENTS;
  });

  useEffect(() => {
    async function fetchStudents() {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        if (!querySnapshot.empty) {
          const list: StudentProfile[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push(docSnap.data() as StudentProfile);
          });
          setStudents(list);
          return;
        }
      } catch (e) {}

      try {
        const stored = localStorage.getItem("mts_admin_students");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStudents(parsed);
          }
        }
      } catch (e) {}
    }
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => {
    const matchQuery = s.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) || s.nisn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchClass = selectedClass === "Semua Kelas" || s.kelas === selectedClass;
    return matchQuery && matchClass;
  });

  const teachers = [
    { id: "T-1", nama: "Dr. H. M. Sutisna, M.Pd.", mapel: "Kepala Sekolah & Matematika", foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80" },
    { id: "T-2", nama: "Dra. Hj. Siti Rahmawati, M.Si.", mapel: "Bahasa Indonesia", foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" },
    { id: "T-3", nama: "Drs. Budi Prasetyo, M.H.", mapel: "Sosiologi & Kewarganegaraan", foto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80" },
    { id: "T-4", nama: "Dr. Hendra Kusuma", mapel: "Kimia & Laboratorium", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
  ];

  const [alumni, setAlumni] = useState<Array<{ id: string; nama: string; tahun: string; kuliah: string; foto: string }>>([
    { id: "A-1", nama: "Rizky Pratama, S.T.", tahun: "Lulus 2024", kuliah: "Teknik Informatika ITB", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" },
    { id: "A-2", nama: "Anastasya Putri, S.Ked.", tahun: "Lulus 2023", kuliah: "Kedokteran Universitas Indonesia", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80" },
  ]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("mts_admin_alumni");
      if (stored) {
        setAlumni(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const getTitleAndDesc = () => {
    switch (activeSub) {
      case "siswa":
        return {
          tag: "WARGA SEKOLAH",
          title: "Data Siswa",
          desc: "Peserta didik yang saat ini terdaftar di MTS Al Hidayah CA.",
          breadcrumb: "Siswa"
        };
      case "guru":
        return {
          tag: "TENAGA PENDIDIK",
          title: "Data Guru & Staff",
          desc: "Dewan guru dan staf pengajar profesional MTS Al Hidayah CA.",
          breadcrumb: "Guru"
        };
      case "alumni":
        return {
          tag: "JEJAK ALUMNI",
          title: "Data Alumni",
          desc: "Lulusan sukses yang tersebar di perguruan tinggi negeri dan dunia industri.",
          breadcrumb: "Alumni"
        };
    }
  };

  const info = getTitleAndDesc();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Transparent Header Banner */}
      <div className="text-slate-900 py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button onClick={() => setCurrentTab("home")} className="hover:text-emerald-600 transition">Beranda</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-600 font-semibold">{info.breadcrumb}</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold inline-block">
              ✨ {info.tag}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{info.title}</h1>
            <p className="text-slate-600 text-sm sm:text-base">{info.desc}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <AnimatedDotGrid />
            <AnimatedArrow />
          </div>
        </div>
      </div>

      {/* Subcategory Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-2 flex gap-2 w-fit">
          <button
            onClick={() => setActiveSub("siswa")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSub === "siswa" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Data Siswa
          </button>
          <button
            onClick={() => setActiveSub("guru")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSub === "guru" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Data Guru
          </button>
          <button
            onClick={() => setActiveSub("alumni")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeSub === "alumni" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Data Alumni
          </button>
        </div>
      </div>

      {/* Search & Filter Bar matching screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau NIS..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-auto"
            >
              <option value="Semua Kelas">Semua Kelas</option>
              <option value="X MIPA 1">X MIPA 1</option>
              <option value="XI IPS 2">XI IPS 2</option>
            </select>

            <button
              onClick={() => {}}
              className="bg-[#00c853] hover:bg-[#00b047] text-white font-bold px-6 py-3 rounded-xl transition shadow-md flex items-center gap-2 text-sm shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Cari</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        {activeSub === "siswa" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                Tidak ada data siswa yang ditemukan.
              </div>
            ) : (
              filteredStudents.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition space-y-4">
                <div className="flex items-center gap-4">
                  <img src={s.foto} alt={s.namaLengkap} className="w-16 h-16 rounded-2xl object-cover border border-emerald-500" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{s.namaLengkap}</h3>
                    <p className="text-xs text-slate-500">NISN: {s.nisn}</p>
                    <span className="inline-block mt-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {s.kelas}
                    </span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-xs text-slate-600">
                  <span>Jurusan: <strong>{s.jurusan}</strong></span>
                  <span className="text-emerald-700 font-bold">Aktif</span>
                </div>
              </div>
            ))
            )}
          </div>
        )}

        {activeSub === "guru" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition text-center space-y-3">
                <img src={t.foto} alt={t.nama} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-emerald-500 shadow-md" />
                <h3 className="font-bold text-slate-900 text-base">{t.nama}</h3>
                <p className="text-xs text-emerald-700 font-semibold">{t.mapel}</p>
              </div>
            ))}
          </div>
        )}

        {activeSub === "alumni" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alumni.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition flex items-center gap-4">
                <img src={a.foto} alt={a.nama} className="w-20 h-20 rounded-2xl object-cover border border-emerald-500" />
                <div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">{a.tahun}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">{a.nama}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">Kuliah di: <strong className="text-emerald-700">{a.kuliah}</strong></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
