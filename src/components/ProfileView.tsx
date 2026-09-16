import React from "react";
import { SCHOOL_INFO } from "../data/mockData";
import { Award, BookOpen, CheckCircle, ShieldCheck, Target, Users } from "lucide-react";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";

interface ProfileViewProps {
  currentLang?: string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ currentLang = "ID" }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Header Banner with Animated Decorations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block">
            {currentLang === "EN" ? "About Us" : "Tentang Kami"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {currentLang === "EN" ? `Profile & History of ${SCHOOL_INFO.name}` : `Profil & Sejarah ${SCHOOL_INFO.name}`}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {currentLang === "EN" 
              ? `Established since 1998, ${SCHOOL_INFO.name} has consistently produced top graduates who are accepted in leading state and international universities as well as global industries.`
              : `Berdiri sejak tahun 1998, ${SCHOOL_INFO.name} telah konsisten mencetak lulusan unggulan yang tersebar di sekolah negeri ternama dalam negeri.`}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <AnimatedDotGrid />
          <AnimatedArrow />
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{currentLang === "EN" ? "School Vision" : "Visi Sekolah"}</h3>
          <p className="text-slate-700 text-base italic leading-relaxed bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
            {currentLang === "EN" 
              ? `"To become a leading secondary educational institution that produces comprehensively intelligent graduates with noble character, environmental awareness, and readiness to compete in the global era."`
              : `"Menjadi lembaga pendidikan menengah unggulan yang menghasilkan lulusan cerdas komprehensif, berkarakter luhur, berwawasan lingkungan, dan siap bersaing di era global."`}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{currentLang === "EN" ? "School Mission" : "Misi Sekolah"}</h3>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentLang === "EN" ? "Conducting a learning process based on the Merdeka Curriculum and international standards." : "Menyelenggarakan proses pembelajaran berbasis Kurikulum Merdeka dan standar internasional."}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentLang === "EN" ? "Developing students' intellectual, emotional, and spiritual intelligence harmoniously." : "Mengembangkan potensi kecerdasan intelektual, emosional, dan spiritual peserta didik secara seimbang."}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentLang === "EN" ? "Providing smart campus facilities and digital technology to support administration and learning." : "Menyediakan sarana smart campus dan teknologi digital penunjang administrasi serta pembelajaran."}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{currentLang === "EN" ? "Fostering strategic partnerships with parents and the global industrial world." : "Membina kemitraan strategis dengan orang tua dan dunia industri global."}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Fasilitas Unggulan */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Fasilitas Sekolah</h3>
          <p className="text-sm text-slate-500">Infrastruktur lengkap untuk kenyamanan dan produktivitas belajar siswa.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Lab Komputer", desc: "Dilengkapi PC workstation spesifikasi tinggi untuk praktikum pemrograman.", icon: BookOpen },
            { title: "Laboratorium Sains", desc: "Laboratorium Fisika, Kimia, dan Biologi berstandar keamanan internasional.", icon: ShieldCheck },
            { title: "Perpustakaan Digital", desc: "Akses ribuan e-book literatur akademik nasional dan internasional.", icon: Users },
            { title: "Aula Serbaguna", desc: "Kapasitas 250 orang untuk seminar, pentas seni, dan olahraga indoor.", icon: Award },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">{f.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
