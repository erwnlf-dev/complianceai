import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-lg">C</div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">ComplianceAI</span>
          </div>
          <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all text-sm shadow-lg shadow-emerald-500/10">
            Masuk ke Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            Kepatuhan Regulasi Otomatis
          </span>
          <h1 className="text-5xl md:text-6xl font-black mt-6 tracking-tight leading-tight">
            Automasi Kepatuhan <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">OJK & UU PDP Indonesia</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            Kelola kebijakan privasi data, automasi pengumpulan bukti infrastruktur cloud AWS/GCP, dan generate laporan audit siap pakai dalam bahasa Indonesia. Solusi tangguh untuk CISO Fintech & IT Operations Manager.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-center transition-all shadow-xl shadow-emerald-500/20">
              Mulai Uji Coba Gratis
            </Link>
            <a href="#features" className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center font-bold transition-all">
              Pelajari Fitur
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <section id="features" className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-900 hover:border-slate-800 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl mb-6">01</div>
            <h3 className="text-xl font-bold">Automasi Bukti Cloud</h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">Collect evidence otomatis dari infrastruktur AWS & GCP secara real-time untuk pembuktian kepatuhan.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-900 hover:border-slate-800 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xl mb-6">02</div>
            <h3 className="text-xl font-bold">Kepatuhan UU PDP & OJK</h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">Rujukan pasal-pasal UU PDP dan aturan OJK terbaru lengkap dengan checklist compliance siap pakai.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-900 hover:border-slate-800 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xl mb-6">03</div>
            <h3 className="text-xl font-bold">Laporan Siap Audit</h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">Ekspor laporan audit kepatuhan berformat PDF dalam Bahasa Indonesia dengan sekali klik.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>&copy; 2026 ComplianceAI. Built with SaaS Factory v2.0.</p>
      </footer>
    </div>
  );
}
