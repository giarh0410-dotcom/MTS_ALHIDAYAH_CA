export type UserRole = "tamu" | "calon_siswa" | "orang_tua" | "admin";

export interface StudentProfile {
  id: string;
  nisn: string;
  namaLengkap: string;
  kelas: string;
  jurusan: string;
  waliKelas: string;
  foto: string;
  kehadiranPersen: number;
  rataRataNilai: number;
  poinPelanggaran: number;
  statusPembayaran: "Lunas" | "Belum Lunas";
}

export interface GradeItem {
  mataPelajaran: string;
  kkm: number;
  tugas: number;
  uts: number;
  uas: number;
  nilaiAkhir: number;
  predikat: string;
  catatanGuru: string;
}

export interface AttendanceItem {
  tanggal: string;
  status: "Hadir" | "Sakit" | "Izin" | "Alpa";
  keterangan?: string;
}

export interface ScheduleItem {
  hari: string;
  jam: string;
  mataPelajaran: string;
  ruangan: string;
  pengajar: string;
}

export interface TeacherNote {
  id: string;
  tanggal: string;
  guru: string;
  kategori: "Akademik" | "Kedisiplinan" | "Prestasi" | "Pemberitahuan";
  pesan: string;
}

export interface PaymentInvoice {
  id: string;
  siswa: string;
  jenis: string;
  jumlah: number;
  status: "Lunas" | "Belum Lunas";
  metode: string;
  tanggal: string;
}

export interface PpdbApplication {
  id: string;
  namaLengkap: string;
  nisn: string;
  asalSekolah: string;
  pilihanJurusan: "MIPA" | "IPS" | "Bahasa";
  email: string;
  telepon: string;
  status: "Menunggu Seleksi" | "Lolos Berkas" | "Diterima" | "Cadangan";
  tanggalDaftar: string;
  catatan: string;
}

export interface NewsArticle {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  penulis: string;
  ringkasan: string;
  konten: string;
  gambar: string;
}

export interface GalleryItem {
  id: string;
  judul: string;
  kategori: string;
  url: string;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}
