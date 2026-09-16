import React, { useState, useEffect } from "react";
import { 
  CreditCard, 
  CheckCircle2, 
  QrCode, 
  Building2, 
  Wallet, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Clock,
  Check
} from "lucide-react";
import { PaymentInvoice } from "../types";

export const PaymentView: React.FC = () => {
  const [invoices, setInvoices] = useState<PaymentInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentInvoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("QRIS");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<PaymentInvoice | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments");
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
      }
    } catch (e) {
      console.error("Failed to fetch payments:", e);
    }
  };

  const handlePay = async () => {
    if (!selectedInvoice) return;

    setIsProcessing(true);
    try {
      const res = await fetch("/api/payments/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedInvoice.id, metode: paymentMethod }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessReceipt(data.payment);
        setSelectedInvoice(null);
        fetchPayments();
      }
    } catch (e) {
      console.error("Payment failed:", e);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-3">
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" /> Sistem Pembayaran Digital Terpadu
          </span>
          <h1 className="text-3xl font-bold tracking-tight">Administrasi Keuangan Sekolah</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Bayar SPP, Uang Gedung, dan kegiatan sekolah dengan aman melalui QRIS, Virtual Account Bank, atau e-Wallet secara real-time.
          </p>
        </div>
        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl backdrop-blur-md text-center shrink-0">
          <p className="text-xs text-emerald-400 uppercase font-bold">Status Keamanan</p>
          <p className="text-sm font-semibold mt-1 flex items-center gap-1.5 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Terenkripsi 256-bit SSL
          </p>
        </div>
      </div>

      {/* Success Receipt Modal */}
      {successReceipt && (
        <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-6 shadow-md animate-in fade-in">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Pembayaran Berhasil!</h3>
                <p className="text-xs text-emerald-700">Transaksi telah diverifikasi otomatis oleh sistem.</p>
              </div>
            </div>
            <button
              onClick={() => setSuccessReceipt(null)}
              className="text-xs bg-white text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-xl font-semibold border border-slate-200 transition"
            >
              Tutup Struk
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-emerald-100 text-sm">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">No. Transaksi</span>
              <strong className="text-slate-900">{successReceipt.id}</strong>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Siswa</span>
              <strong className="text-slate-900">{successReceipt.siswa}</strong>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Jenis Tagihan</span>
              <strong className="text-slate-900">{successReceipt.jenis}</strong>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Total Bayar</span>
              <strong className="text-emerald-700 font-bold text-base">{formatRupiah(successReceipt.jumlah)}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Invoices List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Daftar Tagihan & Riwayat Pembayaran</h3>
            <p className="text-xs text-slate-500 mt-0.5">Pilih tagihan yang belum lunas untuk melakukan pembayaran digital.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-6">ID Tagihan</th>
                <th className="py-4 px-6">Nama Siswa</th>
                <th className="py-4 px-6">Jenis Pembayaran</th>
                <th className="py-4 px-6">Jumlah</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6">Metode</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6 font-semibold text-slate-900">{inv.id}</td>
                  <td className="py-4 px-6 font-medium">{inv.siswa}</td>
                  <td className="py-4 px-6">{inv.jenis}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{formatRupiah(inv.jumlah)}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      inv.status === "Lunas" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500">{inv.metode}</td>
                  <td className="py-4 px-6 text-right">
                    {inv.status === "Belum Lunas" ? (
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm"
                      >
                        Bayar Sekarang
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Pembayaran Tagihan</h3>
                <p className="text-xs text-slate-500">{selectedInvoice.id} • {selectedInvoice.jenis}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Pembayaran</span>
              <span className="text-xl font-bold text-emerald-700">{formatRupiah(selectedInvoice.jumlah)}</span>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pilih Metode Pembayaran Digital
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "QRIS", label: "QRIS", icon: QrCode },
                  { id: "Virtual Account", label: "Virtual Account", icon: Building2 },
                  { id: "e-Wallet", label: "e-Wallet", icon: Wallet },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-4 rounded-2xl border text-left flex flex-col items-center justify-center gap-2 transition ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/60 text-emerald-800 font-semibold"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? "text-emerald-600" : "text-slate-400"}`} />
                      <span className="text-xs">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulation Preview */}
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 text-center space-y-2">
              <p className="text-xs text-slate-600">Simulasi Pembayaran via <strong className="text-emerald-800">{paymentMethod}</strong></p>
              {paymentMethod === "QRIS" && (
                <div className="w-36 h-36 bg-white mx-auto rounded-xl p-2 border border-slate-200 flex items-center justify-center shadow-xs">
                  <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">
                    SCAN QRIS
                  </div>
                </div>
              )}
              {paymentMethod === "Virtual Account" && (
                <p className="text-sm font-bold text-slate-900 bg-white py-2 rounded-xl border border-slate-200">
                  VA: 8871902837482910
                </p>
              )}
              {paymentMethod === "e-Wallet" && (
                <p className="text-xs text-slate-600 font-medium">Hubungkan akun GoPay / OVO / Dana Anda secara otomatis.</p>
              )}
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <span>{isProcessing ? "Memproses Pembayaran..." : `Bayar Sekarang ${formatRupiah(selectedInvoice.jumlah)}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
