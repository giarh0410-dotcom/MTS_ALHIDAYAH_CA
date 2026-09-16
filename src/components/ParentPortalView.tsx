import React, { useState } from "react";
import { 
  UserCheck, 
  BookOpen, 
  Calendar, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Clock, 
  MessageSquare,
  ShieldAlert,
  ChevronRight
} from "lucide-react";
import { SAMPLE_STUDENTS, MOCK_GRADES, MOCK_ATTENDANCE, MOCK_SCHEDULE, MOCK_TEACHER_NOTES } from "../data/mockData";

export const ParentPortalView: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(SAMPLE_STUDENTS[0].id);
  const [activeTab, setActiveTab] = useState<"nilai" | "presensi" | "jadwal" | "catatan">("nilai");

  const student = SAMPLE_STUDENTS.find((s) => s.id === selectedStudentId) || SAMPLE_STUDENTS[0];
  const grades = MOCK_GRADES[student.id] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Top Bar / Student Switcher with Translucent Glassmorphism */}
      <div className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <img
            src={student.foto}
            alt={student.namaLengkap}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-600 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Portal Orang Tua (Transparan)
              </span>
              <span className="text-xs text-slate-500">NISN: {student.nisn}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{student.namaLengkap}</h1>
            <p className="text-xs text-slate-600 mt-0.5">Kelas: <strong className="text-slate-900">{student.kelas}</strong> • Wali Kelas: {student.waliKelas}</p>
          </div>
        </div>

        {/* Switch Student if multiple */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Pilih Anak:</label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200/60 text-sm font-semibold text-slate-800 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-auto shadow-xs"
          >
            {SAMPLE_STUDENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.namaLengkap} ({s.kelas})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Metrics Cards with Translucent Glassmorphism */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Kehadiran</span>
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{student.kehadiranPersen}%</h3>
          <p className="text-xs text-emerald-600 font-medium">Sangat Baik (Hadir Tepat Waktu)</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Rata-Rata Nilai</span>
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{student.rataRataNilai}</h3>
          <p className="text-xs text-emerald-600 font-medium">Predikat A (Sangat Memuaskan)</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Poin Pelanggaran</span>
            <ShieldAlert className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{student.poinPelanggaran}</h3>
          <p className="text-xs text-emerald-600 font-medium">Disiplin Terjaga Sempurna</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Status SPP</span>
            <UserCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-emerald-700">{student.statusPembayaran}</h3>
          <button
            onClick={() => setCurrentTab("payments")}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mt-1"
          >
            <span>Bayar SPP Sekarang</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-4 overflow-x-auto">
        {[
          { id: "nilai", label: "Nilai Akademik & Rapor", icon: BookOpen },
          { id: "presensi", label: "Presensi Harian", icon: Calendar },
          { id: "jadwal", label: "Jadwal Pelajaran", icon: Clock },
          { id: "catatan", label: "Catatan Wali Kelas", icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition shrink-0 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white/60 backdrop-blur-xs text-slate-600 hover:bg-white border border-slate-200/60"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Cards with Translucent Glassmorphism */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-xl p-6 sm:p-8">
        {activeTab === "nilai" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Rekapitulasi Nilai Mata Pelajaran</h3>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Semester Ganjil 2026/2027
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <th className="py-3 px-4">Mata Pelajaran</th>
                    <th className="py-3 px-4">Tugas / UH</th>
                    <th className="py-3 px-4">UTS</th>
                    <th className="py-3 px-4">UAS</th>
                    <th className="py-3 px-4">Nilai Akhir</th>
                    <th className="py-3 px-4">Predikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {grades.map((g, idx) => (
                    <tr key={idx} className="hover:bg-white/40 transition">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{g.mataPelajaran}</td>
                      <td className="py-3.5 px-4 text-slate-700">{g.tugas}</td>
                      <td className="py-3.5 px-4 text-slate-700">{g.uts}</td>
                      <td className="py-3.5 px-4 text-slate-700">{g.uas}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">{g.nilaiAkhir}</td>
                      <td className="py-3.5 px-4">
                        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                          {g.predikat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "presensi" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Rekap Presensi Kehadiran Siswa</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/60 shadow-xs">
                <p className="text-xs text-slate-500 font-semibold">Hadir (H)</p>
                <h4 className="text-2xl font-bold text-emerald-600 mt-1">64 Hari</h4>
              </div>
              <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/60 shadow-xs">
                <p className="text-xs text-slate-500 font-semibold">Izin (I)</p>
                <h4 className="text-2xl font-bold text-blue-600 mt-1">1 Hari</h4>
              </div>
              <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/60 shadow-xs">
                <p className="text-xs text-slate-500 font-semibold">Sakit (S)</p>
                <h4 className="text-2xl font-bold text-amber-600 mt-1">0 Hari</h4>
              </div>
              <div className="p-4 rounded-2xl bg-white/60 border border-slate-200/60 shadow-xs">
                <p className="text-xs text-slate-500 font-semibold">Alpa (A)</p>
                <h4 className="text-2xl font-bold text-rose-600 mt-1">0 Hari</h4>
              </div>
            </div>
          </div>
        )}

        {activeTab === "jadwal" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Jadwal Pelajaran Mingguan</h3>
            <div className="space-y-4">
              {MOCK_SCHEDULE.map((sch, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/60 border border-slate-200/60 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-xl shadow-xs">
                      {sch.hari}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{sch.mataPelajaran}</h4>
                      <p className="text-xs text-slate-500">Guru: {sch.pengajar} ({sch.ruangan})</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-white/80 px-3 py-1 rounded-lg border border-slate-200">
                    {sch.jam}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "catatan" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Catatan Wali Kelas & Guru Bimbingan</h3>
            <div className="space-y-4">
              {MOCK_TEACHER_NOTES.map((note, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/60 border border-slate-200/60 shadow-xs space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-bold text-slate-700">{note.guru} ({note.kategori})</span>
                    <span>{note.tanggal}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">"{note.pesan}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
