import { Link } from "react-router-dom";
import SearchBox from "./SearchBox.jsx";
import { getProfile } from "../lib/storage.js";

export default function Header({ page, onMenu, search, setSearch, showBack }) {
  const profile = getProfile();
  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-30 gap-4">
        <div className="flex items-center space-x-4 min-w-0">
          <button onClick={onMenu} className="md:hidden text-gray-700 focus:outline-none" aria-label="Menu">
            <i className="fa-solid fa-bars text-2xl" />
          </button>
          <div className="flex items-center space-x-2 text-gray-800 min-w-0">
            <i className={`fa-solid ${page.icon} text-[#18184A] text-xl`} />
            <h1 className="text-base md:text-xl font-bold text-[#18184A] truncate">{page.title}</h1>
          </div>
        </div>

        {!showBack && (
          <div className="hidden lg:block w-96">
            <SearchBox value={search} onChange={setSearch} />
          </div>
        )}

        {showBack ? (
          <Link to="/eleves" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 shrink-0">
            <i className="fa-solid fa-arrow-left" /> Retour à la liste
          </Link>
        ) : (
          <Link
            to="/mon-compte"
            aria-label="Accéder à Mon Compte"
            className="flex items-center space-x-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#18184A] focus:ring-offset-2 shrink-0"
          >
            <span className="hidden sm:inline text-sm font-semibold text-gray-700">{profile.name || "Mon compte"}</span>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#18184A] border border-indigo-200 shadow-sm hover:bg-indigo-200 transition">
              <i className="fa-solid fa-user text-lg" />
            </div>
            <i className="fa-solid fa-chevron-down text-xs text-gray-500" />
          </Link>
        )}
      </header>
      {!showBack && (
        <div className="p-4 bg-white border-b border-gray-200 lg:hidden">
          <SearchBox value={search} onChange={setSearch} />
        </div>
      )}
    </>
  );
}
