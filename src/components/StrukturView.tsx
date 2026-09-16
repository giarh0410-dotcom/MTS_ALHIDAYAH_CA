import React from "react";
import { SCHOOL_INFO } from "../data/mockData";
import { Award, ShieldCheck, Users, Briefcase, UserCheck, Building2, ChevronRight } from "lucide-react";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";

interface StrukturViewProps {
  currentLang?: string;
}

interface Leader {
  name: string;
  role: string;
  roleEn: string;
  nip?: string;
  photo: string;
  bio: string;
  bioEn: string;
  level: "top" | "vice" | "coord";
}

const LEADERS: Leader[] = [
  {
    name: "Drs. K.H. Ahmad Hidayat, M.Pd",
    role: "Ketua Yayasan Pendidikan Al Hidayah",
    roleEn: "Chairman of Al Hidayah Foundation",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    bio: "Berpengalaman lebih dari 30 tahun dalam dunia pendidikan Islam terpadu dan pengembangan yayasan sekolah unggulan.",
    bioEn: "Experienced for over 30 years in integrated Islamic education and foundation development.",
    level: "top"
  },
  {
    name: "Saepul, S.Pd",
    role: "Kepala Sekolah (Principal)",
    roleEn: "School Principal",
    nip: "19780512 200501 1 003",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    bio: "Kepala Sekolah Berprestasi Nasional, berkomitmen membawa madrasah menuju era digital dan berstandar internasional.",
    bioEn: "National Outstanding Principal, committed to leading the madrasah towards the digital era and international standards.",
    level: "top"
  },
  {
    name: "Siti Aminah, M.Pd",
    role: "Wakil Kepala Bidang Kurikulum",
    roleEn: "Vice Principal of Curriculum",
    nip: "19820321 200801 2 001",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    bio: "Memimpin implementasi Kurikulum Merdeka, bilingual program, dan pengembangan asesmen diagnostik siswa.",
    bioEn: "Leads the implementation of the Merdeka Curriculum, bilingual program, and diagnostic student assessment.",
    level: "vice"
  },
  {
    name: "Rahmat Hidayat, S.Pd",
    role: "Wakil Kepala Bidang Kesiswaan",
    roleEn: "Vice Principal of Student Affairs",
    nip: "19850914 201001 1 002",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
    bio: "Aktif membina kedisiplinan, prestasi ekstrakurikuler olimpiade sains, dan pembentukan karakter akhlak mulia.",
    bioEn: "Actively fosters discipline, science olympiad extracurricular achievements, and noble character building.",
    level: "vice"
  },
  {
    name: "H. Budi Santoso, S.E",
    role: "Kepala Tata Usaha & Keuangan",
    roleEn: "Head of Administration & Finance",
    nip: "19751102 200112 1 001",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
    bio: "Mengelola administrasi kepegawaian, transparansi keuangan sekolah, serta integrasi sistem pembayaran digital SPP.",
    bioEn: "Manages personnel administration, school financial transparency, and digital tuition payment systems.",
    level: "vice"
  },
  {
    name: "Dewi Lestari, M.Pd",
    role: "Koordinator Kurikulum Internasional & Bahasa",
    roleEn: "Coordinator of International & Language Curriculum",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
    bio: "Membimbing program English conversation, pertukaran pelajar, dan persiapan kompetisi bahasa internasional.",
    bioEn: "Guides English conversation programs, student exchange, and international language competition preparation.",
    level: "coord"
  },
  {
    name: "Ahmad Fauzan, S.Psi",
    role: "Kepala Bimbingan Konseling & Karakter",
    roleEn: "Head of Guidance & Counseling",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    bio: "Fokus pada kesehatan mental siswa, pengembangan bakat minat, serta pendampingan psikologis persiapan masuk PTN.",
    bioEn: "Focuses on student mental health, talent development, and psychological counseling for university preparation.",
    level: "coord"
  }
];

export const StrukturView: React.FC<StrukturViewProps> = ({ currentLang = "ID" }) => {
  const [leaders, setLeaders] = React.useState<Leader[]>(LEADERS);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("mts_admin_org");
      if (stored) {
        const adminOrg: Array<{ id: string; jabatan: string; nama: string }> = JSON.parse(stored);
        const dynamicLeaders: Leader[] = adminOrg.map((item, idx) => {
          // If it matches one of the default leaders by index or position
          const defaultLeader = LEADERS[idx];
          if (defaultLeader) {
            return {
              ...defaultLeader,
              name: item.nama,
              role: item.jabatan,
              roleEn: item.jabatan
            };
          }
          // For newly added custom positions
          return {
            name: item.nama,
            role: item.jabatan,
            roleEn: item.jabatan,
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
            bio: "Pejabat/Pengurus aktif dalam struktur kepengurusan madrasah.",
            bioEn: "Active official/staff in the madrasah organizational structure.",
            level: idx < 2 ? "top" : idx < 5 ? "vice" : "coord"
          };
        });
        setLeaders(dynamicLeaders);
      }
    } catch (e) {}
  }, []);

  const topLeaders = leaders.filter(l => l.level === "top");
  const viceLeaders = leaders.filter(l => l.level === "vice");
  const coordLeaders = leaders.filter(l => l.level === "coord");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Header Banner with Animated Decorations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block">
            {currentLang === "EN" ? "Organizational Structure" : "Struktur Organisasi"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {currentLang === "EN" ? `Leadership & Staff of ${SCHOOL_INFO.name}` : `Pimpinan & Pengurus ${SCHOOL_INFO.name}`}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {currentLang === "EN"
              ? "Dedicated professionals leading the school towards academic excellence, digital innovation, and character building."
              : "Tim profesional berdedikasi tinggi yang memimpin madrasah menuju keunggulan akademik, inovasi digital, dan pembentukan karakter."}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <AnimatedDotGrid />
          <AnimatedArrow />
        </div>
      </div>

      {/* Top Leadership Tier (Yayasan & Kepala Sekolah) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {currentLang === "EN" ? "Top Executive Leadership" : "Pimpinan Eksekutif Tertinggi"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topLeaders.map((leader, index) => (
            <div key={index} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition group">
              <div className="sm:w-2/5 relative overflow-hidden bg-slate-100 min-h-[260px]">
                <img 
                  src={leader.photo} 
                  alt={leader.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent sm:hidden"></div>
              </div>
              <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                    {currentLang === "EN" ? leader.roleEn : leader.role}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
                  {leader.nip && (
                    <p className="text-xs text-slate-400 mt-0.5">NIP: {leader.nip}</p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {currentLang === "EN" ? leader.bioEn : leader.bio}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <UserCheck className="w-4 h-4" /> Pimpinan Aktif
                  </span>
                  <span>Masa Bhakti 2024 - 2029</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vice Principal Tier */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {currentLang === "EN" ? "Vice Principals & Administration Heads" : "Wakil Kepala & Kepala Tata Usaha"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {viceLeaders.map((leader, index) => (
            <div key={index} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition group">
              <div className="h-64 relative overflow-hidden bg-slate-100">
                <img 
                  src={leader.photo} 
                  alt={leader.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-2">
                    {currentLang === "EN" ? leader.roleEn : leader.role}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{leader.name}</h3>
                  {leader.nip && (
                    <p className="text-xs text-slate-400 mt-0.5">NIP: {leader.nip}</p>
                  )}
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {currentLang === "EN" ? leader.bioEn : leader.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coordinators Tier */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {currentLang === "EN" ? "Program Coordinators & Counseling" : "Koordinator Program & Bimbingan"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coordLeaders.map((leader, index) => (
            <div key={index} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition group">
              <div className="sm:w-1/3 relative overflow-hidden bg-slate-100 min-h-[200px]">
                <img 
                  src={leader.photo} 
                  alt={leader.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="sm:w-2/3 p-6 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5">
                    {currentLang === "EN" ? leader.roleEn : leader.role}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{leader.name}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {currentLang === "EN" ? leader.bioEn : leader.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
