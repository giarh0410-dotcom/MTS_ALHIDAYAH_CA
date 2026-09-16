import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Send, 
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { SCHOOL_INFO } from "../data/mockData";
import { AnimatedDotGrid, AnimatedArrow } from "./AnimatedDecorations";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

interface ContactViewProps {
  currentLang?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({ currentLang = "ID" }) => {
  const [formData, setFormData] = useState({
    kategori: "",
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: "",
    captcha: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const getSchoolEmail = () => {
    try {
      const stored = localStorage.getItem("mts_admin_school_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email && parsed.email.trim() !== "") {
          return parsed.email;
        }
      }
    } catch (e) {}
    return SCHOOL_INFO.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email || !formData.pesan) {
      alert(currentLang === "EN" ? "Please fill in the required fields." : "Mohon lengkapi data yang diperlukan.");
      return;
    }

    const messagePayload = {
      id: `MSG-${Date.now()}`,
      ...formData,
      tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      status: "Belum Dibaca"
    };

    try {
      const existing = localStorage.getItem("mts_admin_messages");
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem("mts_admin_messages", JSON.stringify([messagePayload, ...list]));
    } catch (err) {}

    try {
      await addDoc(collection(db, "messages"), {
        ...messagePayload,
        createdAt: new Date().toISOString()
      });
    } catch (err) {}

    const schoolEmail = getSchoolEmail();
    const mailtoSubject = encodeURIComponent(`[${formData.kategori || "Umum"}] ${formData.subjek || "Pesan dari Portal Website"}`);
    const mailtoBody = encodeURIComponent(`Nama Pengirim: ${formData.nama}\nEmail: ${formData.email}\nTelepon: ${formData.telepon || "-"}\nKategori: ${formData.kategori}\n\nPesan:\n${formData.pesan}`);
    window.open(`mailto:${schoolEmail}?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank");

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header Banner with Non-Overlapping Animated Decorations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block">
            {currentLang === "EN" ? "Contact & Support" : "Hubungi Kami"}
          </span>
          <h1 className="text-3xl font-bold text-slate-900">
            {currentLang === "EN" ? "Get in Touch with Us" : "Pusat Bantuan & Kontak"}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            {currentLang === "EN" ? "Have questions or inquiries? Send us a message below." : "Ada pertanyaan seputar sekolah atau PPDB? Kirimkan pesan Anda melalui formulir di bawah."}
          </p>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <AnimatedDotGrid />
          <AnimatedArrow />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: School Information & Map */}
        <div className="lg:col-span-5 space-y-6">
          {/* Informasi Sekolah Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              {currentLang === "EN" ? "School Information" : "Informasi Sekolah"}
            </h2>
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{currentLang === "EN" ? "Address" : "Alamat"}</span>
                  <p className="text-slate-800 font-medium mt-0.5">{SCHOOL_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{currentLang === "EN" ? "Phone" : "Telepon"}</span>
                  <p className="text-slate-800 font-medium mt-0.5">{SCHOOL_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email</span>
                  <p className="text-slate-800 font-medium mt-0.5">{getSchoolEmail()}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Website</span>
                  <p className="text-emerald-600 font-semibold mt-0.5">https://alhidayahdepok.sch.id</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs relative">
            <div className="absolute top-3 left-3 z-10">
              <a
                href="https://maps.google.com/?q=Jl.+Cagar+Alam,+Pancoran+Mas,+Kota+Depok"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-lg shadow-md border border-slate-200 flex items-center gap-1.5 transition"
              >
                <span>{currentLang === "EN" ? "Open in Maps" : "Open in Maps"}</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              </a>
            </div>
            <div className="h-64 sm:h-72 w-full bg-slate-100 relative">
              <iframe
                title="Google Maps"
                src="https://maps.google.com/maps?q=Jl.+Cagar+Alam,+Pancoran+Mas,+Kota+Depok&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Column: Kirim Pesan Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{currentLang === "EN" ? "Send Message" : "Kirim Pesan"}</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {currentLang === "EN" ? "We will reply to your message via email as soon as possible." : "Pesan Anda akan kami balas melalui email secepatnya."}
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-slate-900 text-lg">{currentLang === "EN" ? "Message Successfully Sent!" : "Pesan Berhasil Terkirim!"}</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  {currentLang === "EN" 
                    ? `Thank you for contacting ${SCHOOL_INFO.name}. Your message has been routed to the official admin email: ${getSchoolEmail()}.` 
                    : `Terima kasih telah menghubungi ${SCHOOL_INFO.name}. Pesan Anda telah diteruskan ke email resmi madrasah: ${getSchoolEmail()}.`}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ kategori: "", nama: "", email: "", telepon: "", subjek: "", pesan: "", captcha: "" }); }}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
                >
                  {currentLang === "EN" ? "Send Another Message" : "Kirim Pesan Lain"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Kategori Pesan */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{currentLang === "EN" ? "Message Category" : "Kategori Pesan"}</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="">{currentLang === "EN" ? "-- Select category --" : "-- Pilih kategori --"}</option>
                    <option value="ppdb">{currentLang === "EN" ? "PPDB Information" : "Informasi PPDB"}</option>
                    <option value="akademik">{currentLang === "EN" ? "Academics & Curriculum" : "Akademik & Kurikulum"}</option>
                    <option value="keuangan">{currentLang === "EN" ? "Finance & Tuition" : "Keuangan & SPP"}</option>
                    <option value="lainnya">{currentLang === "EN" ? "Other / General" : "Lainnya / Umum"}</option>
                  </select>
                </div>

                {/* Nama & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{currentLang === "EN" ? "Full Name" : "Nama Lengkap"}</label>
                    <input
                      type="text"
                      placeholder={currentLang === "EN" ? "Your Name" : "Nama Anda"}
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      placeholder="email@anda.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Nomor Telepon & Subjek */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{currentLang === "EN" ? "Phone Number" : "Nomor Telepon"}</label>
                    <input
                      type="text"
                      placeholder="08xx xxxx xxxx"
                      value={formData.telepon}
                      onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{currentLang === "EN" ? "Subject" : "Subjek"}</label>
                    <input
                      type="text"
                      placeholder={currentLang === "EN" ? "Message subject" : "Subjek pesan"}
                      value={formData.subjek}
                      onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                {/* Pesan Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{currentLang === "EN" ? "Message" : "Pesan"}</label>
                  <textarea
                    rows={5}
                    placeholder={currentLang === "EN" ? "Write your message..." : "Tuliskan pesan Anda..."}
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  ></textarea>
                </div>

                {/* Captcha & Submit */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">{currentLang === "EN" ? "Verification Code" : "Kode Verifikasi"}</label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div className="bg-slate-100 border border-slate-200 rounded-xl px-6 py-3 font-mono font-bold tracking-widest text-slate-600 text-lg select-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center">
                      <span className="line-through opacity-70">x799a</span> &nbsp; <span className="text-emerald-700 font-extrabold">j9a</span>
                    </div>
                    <input
                      type="text"
                      placeholder={currentLang === "EN" ? "Enter code" : "Masukkan kode"}
                      value={formData.captcha}
                      onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#00c853] hover:bg-[#00b047] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <span>{currentLang === "EN" ? "Send Message" : "Kirim Pesan"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
