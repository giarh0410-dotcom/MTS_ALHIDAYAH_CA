import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client if key is available
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("Failed to initialize GoogleGenAI:", e);
  }
}

// In-memory storage for PPDB applications and payments to make the demo dynamic
let ppdbApplications: any[] = [
  {
    id: "PPDB-2026-1001",
    namaLengkap: "Ahmad Fauzan",
    nisn: "0081234567",
    asalSekolah: "SMP Negeri 1 Jakarta",
    pilihanJurusan: "MIPA",
    email: "fauzan@gmail.com",
    telepon: "081234567890",
    status: "Diterima",
    tanggalDaftar: "2026-06-10",
    catatan: "Lulus Jalur Prestasi Akademik",
  },
  {
    id: "PPDB-2026-1002",
    namaLengkap: "Dewi Lestari",
    nisn: "0089876543",
    asalSekolah: "SMP Islam Al-Azhar",
    pilihanJurusan: "IPS",
    email: "dewi.l@gmail.com",
    telepon: "085678901234",
    status: "Menunggu Seleksi",
    tanggalDaftar: "2026-06-12",
    catatan: "Dokumen lengkap, menunggu jadwal tes tulis.",
  }
];

let payments: any[] = [
  {
    id: "INV-2026-001",
    siswa: "Raka Santoso (X MIPA 1)",
    jenis: "SPP Bulan September 2026",
    jumlah: 750000,
    status: "Lunas",
    metode: "QRIS (BCA)",
    tanggal: "2026-09-01",
  },
  {
    id: "INV-2026-002",
    siswa: "Raka Santoso (X MIPA 1)",
    jenis: "Uang Gedung Angsuran 1",
    jumlah: 2500000,
    status: "Lunas",
    metode: "Virtual Account Mandiri",
    tanggal: "2026-07-15",
  },
  {
    id: "INV-2026-003",
    siswa: "Ziva Aminah (XI IPS 2)",
    jenis: "SPP Bulan September 2026",
    jumlah: 750000,
    status: "Belum Lunas",
    metode: "-",
    tanggal: "-",
  }
];

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running smoothly." });
});

// PPDB endpoints
app.get("/api/ppdb", (req, res) => {
  res.json(ppdbApplications);
});

app.post("/api/ppdb", (req, res) => {
  const newApp = {
    id: `PPDB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    ...req.body,
    status: "Menunggu Seleksi",
    tanggalDaftar: new Date().toISOString().split("T")[0],
    catatan: "Pendaftaran berhasil dikirim. Menunggu verifikasi berkas.",
  };
  ppdbApplications.unshift(newApp);
  res.status(201).json(newApp);
});

app.get("/api/ppdb/:id", (req, res) => {
  const app = ppdbApplications.find((item) => item.id.toLowerCase() === req.params.id.toLowerCase());
  if (!app) {
    return res.status(404).json({ error: "Data pendaftaran tidak ditemukan." });
  }
  res.json(app);
});

// Payments endpoints
app.get("/api/payments", (req, res) => {
  res.json(payments);
});

app.post("/api/payments/pay", (req, res) => {
  const { id, metode } = req.body;
  const payment = payments.find((p) => p.id === id);
  if (!payment) {
    return res.status(404).json({ error: "Tagihan tidak ditemukan." });
  }
  payment.status = "Lunas";
  payment.metode = metode || "QRIS";
  payment.tanggal = new Date().toISOString().split("T")[0];
  res.json({ success: true, payment });
});

// AI Chatbot endpoint using Gemini API
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }

    if (!aiClient) {
      // Fallback response if Gemini API key is not configured
      return res.json({
        reply: `Halo! Saya adalah Asisten Virtual SMA Nusantara Madani. (Catatan: GEMINI_API_KEY belum dikonfigurasi di environment, jadi ini adalah respons otomatis). Mengenai pertanyaan Anda "${message}", silakan hubungi bagian administrasi sekolah kami di (021) 555-0192 atau datang langsung ke kampus kami pada jam kerja.`
      });
    }

    // Use Gemini 2.5 flash or standard model
    const systemInstruction = `Anda adalah Asisten Virtual resmi SMA Nusantara Madani, sebuah sekolah menengah atas modern berstandar nasional unggulan dengan Kurikulum Merdeka dan program bilingual. Anda ramah, informatif, profesional, dan membantu orang tua serta calon siswa dalam menjawab pertanyaan seputar informasi sekolah, jadwal PPDB, biaya pendidikan, fasilitas, prestasi, dan portal orang tua. Jawablah dalam bahasa Indonesia yang baik, sopan, dan hangat.`;

    const contents = [
      ...(history || []).map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Mohon maaf, saya sedang mengalami kendala teknis. Silakan coba beberapa saat lagi.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Gagal terhubung dengan AI Asisten.",
      details: error.message
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
