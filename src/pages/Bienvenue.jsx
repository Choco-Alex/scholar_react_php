import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const FEATURES = [
  { title: "Mobile First", text: "Accessible partout sur mobile", box: "bg-indigo-50 text-[#0D0E6D]", d: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" },
  { title: "Paiement Sécurisé", text: "Transactions 100% protégées", box: "bg-emerald-50 text-emerald-600", d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { title: "Instantané", text: "Validation en temps réel", box: "bg-amber-50 text-amber-600", d: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
];

export default function Bienvenue() {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-0 sm:p-4 lg:p-6 overflow-x-hidden font-jakarta">
      <main className="w-full max-w-6xl min-h-screen sm:min-h-[85vh] lg:h-[85vh] flex flex-col relative overflow-hidden bg-white sm:rounded-3xl shadow-2xl shadow-indigo-950/10 border border-slate-200/60">
        <div className="relative bg-brand-dark text-white flex-1 flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 overflow-hidden rounded-b-[40px] sm:rounded-b-[100px] lg:rounded-br-[350px] lg:rounded-bl-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-brand-accent/10 blur-2xl pointer-events-none" />

          <header className="relative z-10 flex items-center justify-between">
            <Link to="/connexion" className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-brand-accent transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-brand-accent/40 bg-white/5 backdrop-blur-md">
              Déjà un compte ? Connexion
            </Link>
          </header>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 p-4 mb-4 flex items-center justify-center animate-float">
                <img src={logo} alt="Scholar" className="w-full h-full object-contain" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-accent/15 text-brand-accent font-bold text-sm sm:text-base tracking-wide border border-brand-accent/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                Facile, Rapide et Partout
              </span>
            </div>

            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white leading-tight">
                BIENVENU CHEZ <span className="text-brand-accent">SCHOLAR</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
                Une application de tout nouvelle génération adaptée aux réalités sur le terrain qui vous permet de{" "}
                <span className="text-brand-accent font-semibold bg-brand-accent/10 px-1.5 py-0.5 rounded">payer les frais de scolarité</span>{" "}
                en toute simplicité et ce, depuis votre téléphone portable.
              </p>
              <div className="pt-2">
                <Link to="/inscription" className="group relative inline-flex items-center gap-3 bg-brand-accent text-brand-dark font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-brand-accent/25 hover:bg-brand-light-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden">
                  <span>Commencer</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10 gap-2">
            <p>© 2026 Scholar. Tous droits réservés.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">Conditions d'utilisation</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer transition-colors">Confidentialité</span>
            </div>
          </div>
        </div>

        <div className="bg-white px-6 py-6 sm:py-8 lg:px-12 flex flex-wrap items-center justify-center lg:justify-between gap-6 sm:gap-8 z-10">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow max-w-xs w-full sm:w-auto">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${f.box}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.d} />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{f.title}</h4>
                <p className="text-xs text-slate-500">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
