import logo from "../assets/images/logo.png";

// Mise en page des pages Connexion / Inscription
export default function AuthLayout({ asideWidth, message, children }) {
  return (
    <div className="min-h-screen bg-[#E9E9F5] flex items-center justify-center p-0 sm:p-6">
      <main className="w-full max-w-5xl min-h-[80vh] max-sm:min-h-screen rounded-[30px] max-sm:rounded-none overflow-hidden shadow-[0_20px_60px_rgba(13,14,109,0.12)] flex flex-col md:flex-row">
        <aside className={`bg-[#0D0E6D] text-white w-full ${asideWidth} flex flex-col justify-center items-center p-8 md:p-10`}>
          <img src={logo} alt="Logo Scholar" className="w-60 h-60 object-contain mb-6" />
          <p className="mt-1 text-lg text-white font-semibold text-center">Bon retour parmi nous !</p>
          <p className="text-[#A6E77C] text-center font-semibold">
            <span className="text-[30px]">‘‘</span>
            {message}
            <span className="text-[30px]">’’</span>
          </p>
        </aside>
        <section className="bg-white flex-1 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </main>
    </div>
  );
}

export const authInput =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A6E77C] shadow-xl/30";
export const authLabel = "block text-[20px] font-medium text-[#0D0E6D] mb-2";
export const authButton =
  "mt-4 w-full rounded-xl bg-[#0D0E6D] px-4 py-3 text-lg font-bold text-white transition hover:bg-[#3e3f8b] hover:shadow-xl/30 focus:outline-none focus:ring-2 focus:ring-[#A6E77C] shadow-xl/30";
