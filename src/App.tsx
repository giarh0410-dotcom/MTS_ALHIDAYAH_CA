import React, { useState } from "react";
import { UserRole } from "./types";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeView } from "./components/HomeView";
import { ProfileView } from "./components/ProfileView";
import { StrukturView } from "./components/StrukturView";
import { PpdbView } from "./components/PpdbView";
import { ParentPortalView } from "./components/ParentPortalView";
import { PaymentView } from "./components/PaymentView";
import { NewsView } from "./components/NewsView";
import { GalleryView } from "./components/GalleryView";
import { DatabaseView } from "./components/DatabaseView";
import { InfoSekolahView } from "./components/InfoSekolahView";
import { ContactView } from "./components/ContactView";
import { AdminView } from "./components/AdminView";
import { AiChatModal } from "./components/AiChatModal";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [userRole, setUserRole] = useState<UserRole>("tamu");
  const [aiChatOpen, setAiChatOpen] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>("ID");

  return (
    <LanguageProvider currentLang={currentLang} setCurrentLang={setCurrentLang}>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
        {/* Top Navigation */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          userRole={userRole}
          setUserRole={setUserRole}
          onOpenAiChat={() => setAiChatOpen(true)}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />

        {/* Main View Router */}
        <main className="flex-1">
          {currentTab === "home" && <HomeView setCurrentTab={setCurrentTab} currentLang={currentLang} />}
          {currentTab === "profile" && <ProfileView currentLang={currentLang} />}
          {currentTab === "struktur" && <StrukturView currentLang={currentLang} />}
          {currentTab === "ppdb" && <PpdbView currentLang={currentLang} />}
          {currentTab === "parent_portal" && <ParentPortalView setCurrentTab={setCurrentTab} currentLang={currentLang} />}
          {currentTab === "payments" && <PaymentView currentLang={currentLang} />}
          {currentTab === "news" && <NewsView currentLang={currentLang} />}
          {currentTab === "contact" && <ContactView currentLang={currentLang} />}
          {currentTab === "admin" && <AdminView currentLang={currentLang} />}
          {currentTab === "gallery" && <GalleryView setCurrentTab={setCurrentTab} currentLang={currentLang} />}
          {currentTab === "database_siswa" && <DatabaseView setCurrentTab={setCurrentTab} subCategory="siswa" currentLang={currentLang} />}
          {currentTab === "database_guru" && <DatabaseView setCurrentTab={setCurrentTab} subCategory="guru" currentLang={currentLang} />}
          {currentTab === "database_alumni" && <DatabaseView setCurrentTab={setCurrentTab} subCategory="alumni" currentLang={currentLang} />}
          {currentTab === "info_sekolah" && <InfoSekolahView setCurrentTab={setCurrentTab} subCategory="info_sekolah" currentLang={currentLang} />}
          {currentTab === "info_agenda" && <InfoSekolahView setCurrentTab={setCurrentTab} subCategory="agenda_sekolah" currentLang={currentLang} />}
          {currentTab === "info_pengumuman" && <InfoSekolahView setCurrentTab={setCurrentTab} subCategory="info_pengumuman" currentLang={currentLang} />}
          {currentTab === "info_kegiatan" && <InfoSekolahView setCurrentTab={setCurrentTab} subCategory="kegiatan_berita" currentLang={currentLang} />}
          {currentTab === "info_download" && <InfoSekolahView setCurrentTab={setCurrentTab} subCategory="download" currentLang={currentLang} />}
        </main>

        {/* Footer */}
        <Footer setCurrentTab={setCurrentTab} />

        {/* AI Chat Modal */}
        <AiChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
      </div>
    </LanguageProvider>
  );
}
