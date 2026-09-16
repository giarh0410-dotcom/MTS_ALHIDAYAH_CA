import React, { useState } from "react";
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  UserCheck,
  BookOpen,
  Calendar,
  Bell,
  Download,
  Image as ImageIcon,
  Users,
  Award,
  GraduationCap,
  Building,
  FileText,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UserRole } from "../types";
import { YayasanLogo } from "./YayasanLogo";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenAiChat: () => void;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  onOpenAiChat,
  currentLang,
  setCurrentLang,
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profilDropdown, setProfilDropdown] = useState(false);
  const [infoDropdown, setInfoDropdown] = useState(false);
  const [galeriDropdown, setGaleriDropdown] = useState(false);
  const [databaseDropdown, setDatabaseDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [mobileProfilOpen, setMobileProfilOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const [mobileGaleriOpen, setMobileGaleriOpen] = useState(false);
  const [mobileDatabaseOpen, setMobileDatabaseOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-xs w-full">
      <div className="w-full px-4 sm:px-10 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab("home")}
          className="flex items-center gap-4 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center group-hover:scale-105 transition shrink-0">
            <YayasanLogo className="w-10 h-10 sm:w-12 sm:h-12" opacity={1} />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl sm:text-2xl tracking-tight whitespace-nowrap bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
              MTS AL HIDAYAH CA
            </h1>
          </div>
        </div>

        {/* Desktop Navigation matching screenshot */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2 text-xs font-semibold text-slate-800">
          <button
            onClick={() => setCurrentTab("home")}
            className={`px-3 py-1.5 rounded-xl transition text-xs sm:text-sm ${
              currentTab === "home" ? "text-emerald-600 font-bold" : "hover:text-emerald-600"
            }`}
          >
            {t("beranda")}
          </button>

          {/* Profil Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => { setProfilDropdown(true); setInfoDropdown(false); setGaleriDropdown(false); setDatabaseDropdown(false); }}
            onMouseLeave={() => setProfilDropdown(false)}
          >
            <button
              onClick={() => { setProfilDropdown(!profilDropdown); setInfoDropdown(false); setGaleriDropdown(false); setDatabaseDropdown(false); }}
              className="px-3 py-1.5 rounded-xl hover:text-emerald-600 transition flex items-center gap-1 group text-xs sm:text-sm"
            >
              <span>{t("profil")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profilDropdown ? "rotate-180 text-emerald-600" : "group-hover:text-emerald-600"}`} />
            </button>
            <AnimatePresence>
              {profilDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 backdrop-blur-lg"
                >
                  <button
                    onClick={() => { setCurrentTab("profile"); setProfilDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <span>{t("profilMisi")}</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab("struktur"); setProfilDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <span>{t("struktur")}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Sekolah Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => { setInfoDropdown(true); setProfilDropdown(false); setGaleriDropdown(false); setDatabaseDropdown(false); }}
            onMouseLeave={() => setInfoDropdown(false)}
          >
            <button
              onClick={() => { setInfoDropdown(!infoDropdown); setProfilDropdown(false); setGaleriDropdown(false); setDatabaseDropdown(false); }}
              className="px-3 py-1.5 rounded-xl hover:text-emerald-600 transition flex items-center gap-1 group text-xs sm:text-sm"
            >
              <span>{t("infoSekolah")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${infoDropdown ? "rotate-180 text-emerald-600" : "group-hover:text-emerald-600"}`} />
            </button>
            <AnimatePresence>
              {infoDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 backdrop-blur-lg"
                >
                  <button
                    onClick={() => { setCurrentTab("info_sekolah"); setInfoDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span>{t("infoSekolah")}</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab("info_agenda"); setInfoDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span>{t("agenda")}</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab("info_pengumuman"); setInfoDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <span>{t("pengumuman")}</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab("info_download"); setInfoDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <span>{t("download")}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Galeri Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => { setGaleriDropdown(true); setProfilDropdown(false); setInfoDropdown(false); setDatabaseDropdown(false); }}
            onMouseLeave={() => setGaleriDropdown(false)}
          >
            <button
              onClick={() => { setGaleriDropdown(!galeriDropdown); setProfilDropdown(false); setInfoDropdown(false); setDatabaseDropdown(false); }}
              className="px-3 py-1.5 rounded-xl hover:text-emerald-600 transition flex items-center gap-1 group text-xs sm:text-sm"
            >
              <span>{t("galeri")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${galeriDropdown ? "rotate-180 text-emerald-600" : "group-hover:text-emerald-600"}`} />
            </button>
            <AnimatePresence>
              {galeriDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 backdrop-blur-lg"
                >
                  <button
                    onClick={() => { setCurrentTab("gallery"); setGaleriDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <span>{t("galeriFoto")}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Database Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => { setDatabaseDropdown(true); setProfilDropdown(false); setInfoDropdown(false); setGaleriDropdown(false); }}
            onMouseLeave={() => setDatabaseDropdown(false)}
          >
            <button
              onClick={() => { setDatabaseDropdown(!databaseDropdown); setProfilDropdown(false); setInfoDropdown(false); setGaleriDropdown(false); }}
              className="px-3 py-1.5 rounded-xl hover:text-emerald-600 transition flex items-center gap-1 group text-xs sm:text-sm"
            >
              <span>{t("database")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${databaseDropdown ? "rotate-180 text-emerald-600" : "group-hover:text-emerald-600"}`} />
            </button>
            <AnimatePresence>
              {databaseDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 backdrop-blur-lg"
                >
                  <button
                    onClick={() => { setCurrentTab("database_siswa"); setDatabaseDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span>{t("siswa")}</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab("database_guru"); setDatabaseDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>{t("guru")}</span>
                  </button>
                  <button
                    onClick={() => { setCurrentTab("database_alumni"); setDatabaseDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50/80 text-slate-700 hover:text-emerald-700 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <span>{t("alumni")}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setCurrentTab("contact")}
            className="px-3 py-1.5 rounded-xl hover:text-emerald-600 transition text-xs sm:text-sm"
          >
            {t("hubungiKami")}
          </button>
        </nav>

        {/* Right Action: Admin & Language ID/EN */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setCurrentTab("admin")}
            className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition flex items-center justify-center border border-emerald-200/60 shadow-xs"
            title="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          </button>

          <div className="relative">
            <button
              onClick={() => { setLangDropdown(!langDropdown); }}
              className="flex items-center gap-1.5 text-slate-800 text-xs sm:text-sm font-semibold cursor-pointer hover:text-emerald-600 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition whitespace-nowrap"
            >
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold">{currentLang === "ID" ? "ID" : "EN"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </button>
            {langDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50">
                <button
                  onClick={() => { setCurrentLang("ID"); setLangDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-emerald-50 ${currentLang === "ID" ? "text-emerald-700 bg-emerald-50/70" : "text-slate-700"}`}
                >
                  <span>🇮🇩 Indonesia (ID)</span>
                </button>
                <button
                  onClick={() => { setCurrentLang("EN"); setLangDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-emerald-50 ${currentLang === "EN" ? "text-emerald-700 bg-emerald-50/70" : "text-slate-700"}`}
                >
                  <span>🇬🇧 English (EN)</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => { setCurrentTab("home"); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "home" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
          >
            {t("beranda")}
          </button>

          {/* Profil Group */}
          <div className="space-y-1">
            <button
              onClick={() => setMobileProfilOpen(!mobileProfilOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
            >
              <span>{t("profil")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileProfilOpen ? "rotate-180 text-emerald-600" : ""}`} />
            </button>
            {mobileProfilOpen && (
              <div className="pl-4 space-y-1">
                <button
                  onClick={() => { setCurrentTab("profile"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "profile" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("profilMisi")}
                </button>
                <button
                  onClick={() => { setCurrentTab("struktur"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "struktur" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("struktur")}
                </button>
              </div>
            )}
          </div>

          {/* Info Sekolah Group */}
          <div className="space-y-1">
            <button
              onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
            >
              <span>{t("infoSekolah")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileInfoOpen ? "rotate-180 text-emerald-600" : ""}`} />
            </button>
            {mobileInfoOpen && (
              <div className="pl-4 space-y-1">
                <button
                  onClick={() => { setCurrentTab("info_sekolah"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "info_sekolah" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("infoSekolah")}
                </button>
                <button
                  onClick={() => { setCurrentTab("info_agenda"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "info_agenda" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("agenda")}
                </button>
                <button
                  onClick={() => { setCurrentTab("info_pengumuman"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "info_pengumuman" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("pengumuman")}
                </button>
                <button
                  onClick={() => { setCurrentTab("info_download"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "info_download" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("download")}
                </button>
              </div>
            )}
          </div>

          {/* Galeri Group */}
          <div className="space-y-1">
            <button
              onClick={() => setMobileGaleriOpen(!mobileGaleriOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
            >
              <span>{t("galeri")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileGaleriOpen ? "rotate-180 text-emerald-600" : ""}`} />
            </button>
            {mobileGaleriOpen && (
              <div className="pl-4 space-y-1">
                <button
                  onClick={() => { setCurrentTab("gallery"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "gallery" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("galeriFoto")}
                </button>
              </div>
            )}
          </div>

          {/* Database Group */}
          <div className="space-y-1">
            <button
              onClick={() => setMobileDatabaseOpen(!mobileDatabaseOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
            >
              <span>{t("database")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileDatabaseOpen ? "rotate-180 text-emerald-600" : ""}`} />
            </button>
            {mobileDatabaseOpen && (
              <div className="pl-4 space-y-1">
                <button
                  onClick={() => { setCurrentTab("database_siswa"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "database_siswa" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("siswa")}
                </button>
                <button
                  onClick={() => { setCurrentTab("database_guru"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "database_guru" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("guru")}
                </button>
                <button
                  onClick={() => { setCurrentTab("database_alumni"); setMobileMenuOpen(false); }}
                  className={`w-full text-left pl-4 pr-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "database_alumni" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  {t("alumni")}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => { setCurrentTab("contact"); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${currentTab === "contact" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-100"}`}
          >
            {t("hubungiKami")}
          </button>
        </div>
      )}
    </header>
  );
};
