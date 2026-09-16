import React from "react";
import { MapPin, Phone, Mail, Globe, Heart } from "lucide-react";
import { SCHOOL_INFO } from "../data/mockData";
import { YayasanLogo } from "./YayasanLogo";

export const Footer: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-12 border-t border-slate-800 w-full">
      <div className="w-full px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
        {/* Col 1: School Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0">
              <YayasanLogo className="w-12 h-12" opacity={1} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">
                {SCHOOL_INFO.name}
              </h3>
              <p className="text-sm text-emerald-400 font-semibold">{SCHOOL_INFO.accreditation}</p>
            </div>
          </div>
          <p className="text-base text-slate-300 leading-relaxed">
            {SCHOOL_INFO.tagline}. Berkomitmen melahirkan generasi cerdas, berintegritas, dan siap menghadapi tantangan global masa depan.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-bold text-white text-base uppercase tracking-wider mb-5 border-l-2 border-emerald-500 pl-3">
            Menu Utama
          </h4>
          <ul className="space-y-3 text-base">
            <li>
              <button onClick={() => setCurrentTab("home")} className="hover:text-emerald-400 transition text-left">
                Beranda Utama
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("profile")} className="hover:text-emerald-400 transition text-left">
                Profil & Sejarah Sekolah
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("ppdb")} className="hover:text-emerald-400 transition text-left">
                Pendaftaran Siswa Baru (PPDB)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("parent_portal")} className="hover:text-emerald-400 transition text-left">
                Portal Orang Tua Siswa
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab("payments")} className="hover:text-emerald-400 transition text-left">
                Pembayaran SPP & Keuangan
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Academic Programs */}
        <div>
          <h4 className="font-bold text-white text-base uppercase tracking-wider mb-5 border-l-2 border-emerald-500 pl-3">
            Program Unggulan
          </h4>
          <ul className="space-y-3 text-base text-slate-300">
            <li>Kurikulum Merdeka & Bilingual</li>
            <li>Kelas Olimpiade Sains & Matematika</li>
            <li>Coding & AI Training Club</li>
            <li>Tahfidz & Character Building</li>
            <li>Double Diploma Internasional</li>
          </ul>
        </div>

        {/* Col 4: Contact & Location */}
        <div>
          <h4 className="font-bold text-white text-base uppercase tracking-wider mb-5 border-l-2 border-emerald-500 pl-3">
            Hubungi Kami
          </h4>
          <ul className="space-y-3.5 text-base text-slate-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
              <span>{SCHOOL_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{SCHOOL_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{SCHOOL_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full px-6 sm:px-12 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400 gap-4">
        <p>&copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. Hak Cipta Dilindungi Undang-Undang.</p>

      </div>
    </footer>
  );
};
