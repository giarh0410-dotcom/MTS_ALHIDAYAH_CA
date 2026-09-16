import React, { useState, useEffect } from "react";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search, 
  Send, 
  User, 
  BookOpen, 
  Phone, 
  Mail, 
  Building,
  Sparkles,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { PpdbApplication } from "../types";
import { FAQ_PPDB, SCHOOL_INFO } from "../data/mockData";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";

export const PpdbView: React.FC = () => {
  const [applications, setApplications] = useState<PpdbApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchedResult, setSearchedResult] = useState<PpdbApplication | null>(null);
  const [searchError, setSearchError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nisn: "",
    asalSekolah: "",
    pilihanJurusan: "MIPA" as "MIPA" | "IPS" | "Bahasa",
    email: "",
    telepon: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/ppdb");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (e) {
      console.error("Failed to fetch PPDB data:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.namaLengkap || !formData.nisn || !formData.asalSekolah) {
      alert("Harap lengkapi semua data wajib.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ppdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newApp = await res.json();
        setSuccessMessage(`Pendaftaran berhasil! Nomor Registrasi Anda: ${newApp.id}`);
        setFormData({
          namaLengkap: "",
          nisn: "",
          asalSekolah: "",
          pilihanJurusan: "MIPA",
          email: "",
          telepon: "",
        });
        fetchApplications();
      }
    } catch (e) {
      console.error("Failed to submit PPDB:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setSearchError("");
    setSearchedResult(null);

    try {
      const res = await fetch(`/api/ppdb/${searchId.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setSearchedResult(data);
      } else {
        setSearchError("Nomor pendaftaran tidak ditemukan. Periksa kembali nomor registrasi Anda.");
      }
    } catch (e) {
      setSearchError("Terjadi kesalahan saat mencari data.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
      {/* Hero Banner PPDB */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Penerimaan Peserta Didik Baru (PPDB) 2026/2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Bergabunglah Menjadi Bagian dari Generasi Unggul dan Mandiri
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Daftar secara online dengan mudah, cepat, dan transparan. Cek status seleksi kapan saja melalui portal ini.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 relative z-10">
          <AnimatedDotGrid />
          <AnimatedArrow />
        </div>
      </div>

      {/* Grid: Form Pendaftaran & Cek Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Pendaftaran Online */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> Formulir Pendaftaran Online
            </h2>
            <p className="text-xs text-slate-500 mt-1">Isi data calon peserta didik dengan benar dan sesuai ijazah SMP/MTs.</p>
          </div>

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Pendaftaran Berhasil Dikirim!</strong>
                <p className="text-xs mt-0.5">{successMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap Siswa *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.namaLengkap}
                  onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                  placeholder="Contoh: Muhammad Rizki"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  NISN (Nomor Induk Siswa Nasional) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                  placeholder="10 digit NISN"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Asal Sekolah (SMP/MTs) *
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.asalSekolah}
                    onChange={(e) => setFormData({ ...formData, asalSekolah: e.target.value })}
                    placeholder="Contoh: SMPN 1 Jakarta"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pilihan Program / Jurusan *
                </label>
                <select
                  value={formData.pilihanJurusan}
                  onChange={(e) => setFormData({ ...formData, pilihanJurusan: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="MIPA">MIPA (Matematika & IPA)</option>
                  <option value="IPS">IPS (Ilmu Pengetahuan Sosial)</option>
                  <option value="Bahasa">Bahasa & Sastra</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp Orang Tua / Siswa *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    placeholder="08123456789"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Alamat Email Aktif *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm mt-4"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Mengirim Pendaftaran..." : "Kirim Formulir Pendaftaran PPDB"}</span>
            </button>
          </form>
        </div>

        {/* Cek Status & Daftar Pendaftar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-600" /> Cek Status Seleksi
              </h2>
              <p className="text-xs text-slate-500 mt-1">Masukkan Nomor Registrasi PPDB Anda (Contoh: PPDB-2026-1001).</p>
            </div>

            <form onSubmit={handleSearchStatus} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="PPDB-2026-XXXX"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                >
                  Cek
                </button>
              </div>
            </form>

            {searchError && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {searchedResult && (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-2.5 py-1 rounded-lg">
                    {searchedResult.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    searchedResult.status === "Diterima" ? "bg-emerald-600 text-white" : "bg-amber-100 text-amber-800"
                  }`}>
                    {searchedResult.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{searchedResult.namaLengkap}</h4>
                  <p className="text-xs text-slate-600">Asal: {searchedResult.asalSekolah} | Jurusan: {searchedResult.pilihanJurusan}</p>
                </div>
                <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-emerald-100">
                  Catatan: {searchedResult.catatan}
                </p>
              </div>
            )}
          </div>

          {/* Quick Stats / Recent Applicants */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
              Pendaftar Terbaru
            </h3>
            <div className="space-y-3">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-semibold text-xs text-slate-900">{app.namaLengkap}</p>
                    <p className="text-[11px] text-slate-500">{app.asalSekolah} • {app.pilihanJurusan}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ PPDB */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <HelpCircle className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="text-2xl font-bold text-slate-900">Pertanyaan Sering Diajukan (FAQ)</h3>
          <p className="text-sm text-slate-500">Informasi seputar prosedur dan ketentuan PPDB {SCHOOL_INFO.name}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQ_PPDB.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-900 text-base">{faq.q}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
