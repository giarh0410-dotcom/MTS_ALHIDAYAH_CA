import React, { createContext, useContext, useState } from "react";

interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

const translations: Translations = {
  beranda: { ID: "Beranda", EN: "Home" },
  profil: { ID: "Profil", EN: "Profile" },
  infoSekolah: { ID: "Info Sekolah", EN: "School Info" },
  galeri: { ID: "Galeri", EN: "Gallery" },
  database: { ID: "Database", EN: "Database" },
  hubungiKami: { ID: "Hubungi Kami", EN: "Contact Us" },
  aiAsisten: { ID: "AI Asisten", EN: "AI Assistant" },
  login: { ID: "Login", EN: "Login" },
  profilMisi: { ID: "Profil & Visi Misi", EN: "Profile & Mission" },
  struktur: { ID: "Struktur Organisasi", EN: "Organizational Structure" },
  agenda: { ID: "Agenda Sekolah", EN: "School Agenda" },
  pengumuman: { ID: "Pengumuman", EN: "Announcements" },
  kegiatanBerita: { ID: "Kegiatan & Berita", EN: "Activities & News" },
  download: { ID: "Download", EN: "Download" },
  siswa: { ID: "Data Siswa", EN: "Student Data" },
  guru: { ID: "Data Guru", EN: "Teacher Data" },
  alumni: { ID: "Data Alumni", EN: "Alumni Data" },
  galeriFoto: { ID: "Galeri Foto & Album", EN: "Photo Gallery & Albums" },
  
  // Home View features
  feat1Title: { ID: "Kurikulum Merdeka & Bilingual", EN: "Merdeka Curriculum & Bilingual" },
  feat1Desc: { ID: "Pembelajaran mendalam yang mengasah kreativitas kritis serta penguasaan bahasa Inggris aktif untuk daya saing global.", EN: "Deep learning that sharpens critical creativity and active English mastery for global competitiveness." },
  feat2Title: { ID: "Portal Orang Tua Real-Time", EN: "Real-Time Parent Portal" },
  feat2Desc: { ID: "Orang tua dapat memantau kehadiran, nilai ujian, jadwal pelajaran, dan rekam jejak siswa secara langsung dari ponsel Anda.", EN: "Parents can monitor attendance, exam scores, class schedules, and student progress directly from your phone." },
  feat3Title: { ID: "Pembayaran Digital Terpadu", EN: "Integrated Digital Payments" },
  feat3Desc: { ID: "Sistem pembayaran SPP dan uang gedung terintegrasi dengan QRIS, Virtual Account, dan e-Wallet untuk kemudahan administrasi.", EN: "Tuition and building fee payment systems integrated with QRIS, Virtual Account, and e-Wallet for administrative ease." },

  newsTitle: { ID: "Berita & Agenda Sekolah", EN: "School News & Agenda" },
  viewAllNews: { ID: "Lihat Semua Berita", EN: "View All News" },
  
  // Footer
  footerDesc: { ID: "Platform digital sekolah modern terpadu untuk pendidikan masa depan yang unggul, berkarakter, dan berdaya saing global.", EN: "Integrated modern school digital platform for future education that is superior, character-driven, and globally competitive." },
  quickLinks: { ID: "Tautan Cepat", EN: "Quick Links" },
  services: { ID: "Layanan PPDB & Akademik", EN: "PPDB & Academic Services" },
  ppdbOnline: { ID: "PPDB Online 2026/2027", EN: "Online PPDB 2026/2027" },
  parentLogin: { ID: "Portal Orang Tua", EN: "Parent Portal" },
  digitalPayment: { ID: "Pembayaran SPP Online", EN: "Online Tuition Payment" },
  copyright: { ID: "Hak Cipta © 2026 Yayasan Al-Hidayah Depok. Seluruh hak cipta dilindungi.", EN: "Copyright © 2026 Yayasan Al-Hidayah Depok. All rights reserved." }
};

interface LanguageContextType {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: "ID",
  setCurrentLang: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode; currentLang: string; setCurrentLang: (lang: string) => void }> = ({
  children,
  currentLang,
  setCurrentLang,
}) => {
  const t = (key: string): string => {
    if (translations[key] && translations[key][currentLang]) {
      return translations[key][currentLang];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
