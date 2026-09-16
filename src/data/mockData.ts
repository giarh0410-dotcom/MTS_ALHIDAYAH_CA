import { StudentProfile, GradeItem, AttendanceItem, ScheduleItem, TeacherNote, NewsArticle, GalleryItem } from "../types";

export const SCHOOL_INFO = new Proxy({
  name: "MTS Al Hidayah CA",
  tagline: "Membangun Generasi Unggul, Berkarakter, dan Berwawasan Global",
  address: "Jl. Cagar Alam, Pancoran Mas, Kota Depok",
  phone: "(021) 555-0192",
  email: "mts.alhidaya.ca@gmail.com",
  accreditation: "Terakreditasi A (Unggul)",
  principal: "Saepul, S.Pd.",
  foundedYear: 2023,
}, {
  get(target, prop) {
    try {
      const stored = localStorage.getItem("mts_admin_school_profile");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (prop in parsed && parsed[prop] !== undefined && parsed[prop] !== "") {
          return parsed[prop];
        }
      }
    } catch (e) {}
    return (target as any)[prop];
  }
});

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: "STD-2024-001",
    nisn: "0082345671",
    namaLengkap: "Raka Santoso",
    kelas: "X MIPA 1",
    jurusan: "Matematika & Ilmu Pengetahuan Alam",
    waliKelas: "Dra. Hj. Siti Rahmawati, M.Si.",
    foto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    kehadiranPersen: 98.5,
    rataRataNilai: 89.4,
    poinPelanggaran: 0,
    statusPembayaran: "Lunas",
  },
  {
    id: "STD-2023-042",
    nisn: "0079823412",
    namaLengkap: "Ziva Aminah",
    kelas: "XI IPS 2",
    jurusan: "Ilmu Pengetahuan Sosial",
    waliKelas: "Drs. Budi Prasetyo, M.H.",
    foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    kehadiranPersen: 96.0,
    rataRataNilai: 88.1,
    poinPelanggaran: 0,
    statusPembayaran: "Belum Lunas",
  }
];

export const MOCK_GRADES: Record<string, GradeItem[]> = {
  "STD-2024-001": [
    { mataPelajaran: "Pendidikan Agama & Budi Pekerti", kkm: 75, tugas: 90, uts: 88, uas: 92, nilaiAkhir: 90, predikat: "A", catatanGuru: "Sangat aktif dalam diskusi keagamaan dan ibadah harian." },
    { mataPelajaran: "Pendidikan Pancasila & Kewarganegaraan", kkm: 75, tugas: 85, uts: 86, uas: 88, nilaiAkhir: 86, predikat: "B+", catatanGuru: "Pemahaman konsep kewarganegaraan baik." },
    { mataPelajaran: "Bahasa Indonesia", kkm: 78, tugas: 88, uts: 85, uas: 90, nilaiAkhir: 88, predikat: "A-", catatanGuru: "Kemampuan analisis teks dan sastra sangat memuaskan." },
    { mataPelajaran: "Matematika Tingkat Lanjut", kkm: 75, tugas: 92, uts: 95, uas: 94, nilaiAkhir: 94, predikat: "A", catatanGuru: "Prestasi sangat gemilang dalam olimpiade matematika sekolah." },
    { mataPelajaran: "Fisika", kkm: 75, tugas: 88, uts: 90, uas: 91, nilaiAkhir: 90, predikat: "A", catatanGuru: "Praktikum laboratorium dilakukan dengan teliti." },
    { mataPelajaran: "Kimia", kkm: 75, tugas: 86, uts: 84, uas: 89, nilaiAkhir: 86, predikat: "B+", catatanGuru: "Pertahankan ketelitian dalam rumus stoikiometri." },
    { mataPelajaran: "Bahasa Inggris", kkm: 80, tugas: 94, uts: 92, uas: 95, nilaiAkhir: 94, predikat: "A", catatanGuru: "Fluent dalam speaking dan writing." },
  ],
  "STD-2023-042": [
    { mataPelajaran: "Pendidikan Agama & Budi Pekerti", kkm: 75, tugas: 88, uts: 85, uas: 90, nilaiAkhir: 88, predikat: "A-", catatanGuru: "Sikap terpuji dan rajin." },
    { mataPelajaran: "Ekonomi", kkm: 75, tugas: 92, uts: 90, uas: 94, nilaiAkhir: 92, predikat: "A", catatanGuru: "Sangat menguasai materi makroekonomi dan akuntansi dasar." },
    { mataPelajaran: "Sosiologi", kkm: 75, tugas: 88, uts: 88, uas: 89, nilaiAkhir: 88, predikat: "A-", catatanGuru: "Aktif dalam observasi sosial lapangan." },
    { mataPelajaran: "Geografi", kkm: 75, tugas: 85, uts: 86, uas: 88, nilaiAkhir: 86, predikat: "B+", catatanGuru: "Pemahaman SIG dan peta sangat baik." },
    { mataPelajaran: "Sejarah", kkm: 75, tugas: 90, uts: 87, uas: 91, nilaiAkhir: 89, predikat: "A-", catatanGuru: "Analisis peristiwa sejarah kritis dan tajam." },
  ]
};

export const MOCK_ATTENDANCE: AttendanceItem[] = [
  { tanggal: "2026-09-14", status: "Hadir", keterangan: "Tepat waktu (06.45)" },
  { tanggal: "2026-09-13", status: "Hadir", keterangan: "Tepat waktu (06.50)" },
  { tanggal: "2026-09-12", status: "Hadir", keterangan: "Tepat waktu (06.40)" },
  { tanggal: "2026-09-11", status: "Izin", keterangan: "Menghadiri lomba olimpiade sains tingkat kota" },
  { tanggal: "2026-09-10", status: "Hadir", keterangan: "Tepat waktu (06.45)" },
];

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { hari: "Senin", jam: "07:00 - 08:30", mataPelajaran: "Upacara Bendera & Wali Kelas", ruangan: "Lapangan Utama", pengajar: "Semua Guru" },
  { hari: "Senin", jam: "08:30 - 10:00", mataPelajaran: "Matematika Tingkat Lanjut", ruangan: "R. 302", pengajar: "Drs. Sujono, M.Sc." },
  { hari: "Senin", jam: "10:15 - 11:45", mataPelajaran: "Fisika", ruangan: "Lab. Fisika", pengajar: "Ir. Anita Wijaya" },
  { hari: "Selasa", jam: "07:00 - 08:30", mataPelajaran: "Bahasa Indonesia", ruangan: "R. 302", pengajar: "Dra. Hj. Siti Rahmawati" },
  { hari: "Selasa", jam: "08:30 - 10:00", mataPelajaran: "Kimia", ruangan: "Lab. Kimia", pengajar: "Dr. Hendra Kusuma" },
  { hari: "Rabu", jam: "07:00 - 08:30", mataPelajaran: "Bahasa Inggris", ruangan: "Language Lab", pengajar: "Sarah Jenkins, M.Ed." },
  { hari: "Kamis", jam: "07:00 - 08:30", mataPelajaran: "Pendidikan Agama", ruangan: "R. 302", pengajar: "Ust. H. Ahmad Fauzi" },
  { hari: "Jumat", jam: "07:00 - 08:30", mataPelajaran: "Seni Budaya & Olahraga", ruangan: "Aula & Lapangan", pengajar: "Eko Prasetyo, S.Pd." },
];

export const MOCK_TEACHER_NOTES: TeacherNote[] = [
  {
    id: "NOTE-1",
    tanggal: "2026-09-11",
    guru: "Drs. Sujono, M.Sc. (Wali Kelas)",
    kategori: "Prestasi",
    pesan: "Selamat kepada Ananda Raka yang telah meraih Juara 2 Olimpiade Matematika tingkat DKI Jakarta mewakili sekolah.",
  },
  {
    id: "NOTE-2",
    tanggal: "2026-09-05",
    guru: "Dr. Hendra Kusuma (Guru Kimia)",
    kategori: "Akademik",
    pesan: "Mengingatkan untuk pengumpulan laporan praktikum titrasi asam basa paling lambat hari Jumat.",
  },
  {
    id: "NOTE-3",
    tanggal: "2026-09-01",
    guru: "Bagian Keuangan Sekolah",
    kategori: "Pemberitahuan",
    pesan: "Informasi pembayaran SPP bulan September 2026 sudah dapat diakses melalui menu Pembayaran Digital di portal ini.",
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    judul: "MTS Al Hidayah CA Raih Medali Emas Olimpiade Sains Nasional 2026",
    kategori: "Prestasi",
    tanggal: "12 September 2026",
    penulis: "Tim Redaksi Humas",
    ringkasan: "Siswa-siswi MTS Al Hidayah CA kembali menorehkan prestasi membanggakan di kancah nasional dalam bidang Fisika dan Matematika.",
    konten: "Depok — MTS Al Hidayah CA kembali mengharumkan nama sekolah setelah delegasi siswa berhasil memborong 2 medali emas dan 1 perak dalam ajang Olimpiade Sains Nasional (OSN) 2026 yang diselenggarakan di Bandung. Kepala Sekolah Dr. H. M. Sutisna, M.Pd. menyampaikan rasa syukur dan apresiasi mendalam atas kerja keras para siswa dan guru pembimbing.",
    gambar: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "news-2",
    judul: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka",
    kategori: "Pengumuman",
    tanggal: "1 Juni 2026",
    penulis: "Panitia PPDB",
    ringkasan: "Pendaftaran siswa baru jalur prestasi, reguler, dan zonasi kini dapat dilakukan secara online melalui portal interaktif sekolah.",
    konten: "MTS Al Hidayah CA membuka kesempatan luas bagi lulusan SMP/MTs sederajat untuk bergabung menjadi bagian dari komunitas akademik unggul. Pendaftaran dilakukan secara full online dengan sistem verifikasi berkas digital dan tes seleksi berbasis komputer.",
    gambar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "news-3",
    judul: "Hari Kartini 2026 di MTS Al Hidayah CA",
    kategori: "Kegiatan Sekolah",
    tanggal: "21 April 2026",
    penulis: "Admin",
    ringkasan: "Kegiatan rutin tahunan hari kartini dengan diadakan upacara dan pawai",
    konten: "Peringatan Hari Kartini 2026 di lingkungan MTS Al Hidayah CA berlangsung meriah dengan upacara adat Nusantara, lomba busana daerah, serta pembacaan puisi pahlawan nasional. Seluruh siswa dan guru mengenakan pakaian adat tradisional dengan penuh semangat kebersamaan.",
    gambar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
  }
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: "g-1", judul: "Gedung Utama Kampus Modern", kategori: "Fasilitas", url: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80" },
  { id: "g-2", judul: "Laboratorium Komputer & AI", kategori: "Fasilitas", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80" },
  { id: "g-3", judul: "Laboratorium Sains Terpadu", kategori: "Fasilitas", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80" },
  { id: "g-4", judul: "Perpustakaan Digital", kategori: "Fasilitas", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop&q=80" },
  { id: "g-5", judul: "Kegiatan Ekstrakurikuler Basket", kategori: "Kegiatan", url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80" },
  { id: "g-6",judul: "Pementasan Paduan Suara", kategori: "Seni", url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80" }
];

export const FAQ_PPDB = [
  {
    q: "Apa saja jalur pendaftaran yang tersedia di MTS AlHidayah CA?",
    a: "Tersedia 3 jalur pendaftaran: Jalur Prestasi (Akademik/Non-Akademik), Jalur Reguler (Tes Berbasis Komputer), dan Jalur Zonasi/Kemitraan."
  },
  {
    q: "Berapa biaya pendaftaran PPDB online?",
    a: "Biaya pendaftaran sebesar Rp 250.000, yang dapat dibayarkan melalui transfer bank atau QRIS langsung di sistem pembayaran digital kami."
  },
  {
    q: "Dokumen apa saja yang harus disiapkan saat mendaftar?",
    a: "Scan Rapor kelas 7 dan 8 (semester 1-4), pas foto berwarna, Kartu Keluarga (KK), dan sertifikat prestasi (jika ada)."
  },
  {
    q: "Apakah tersedia fasilitas beasiswa bagi siswa kurang mampu atau berprestasi?",
    a: "Ya! Kami menyediakan beasiswa bebas SPP penuh hingga lulus bagi peraih juara OSN tingkat Nasional dan program subsidi bagi siswa berprestasi kurang mampu."
  }
];
