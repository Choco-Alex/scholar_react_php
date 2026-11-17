import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../lib/nav.js";
import { normalize } from "../lib/storage.js";

// Recherche globale : propose les pages correspondantes.
// Sur la page Etablissements, elle filtre la liste des établissements.
export default function SearchBox({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const localSearch = pathname === "/etablissement";
  const term = value.trim();
  const matches = term ? NAV_ITEMS.filter((i) => normalize(i.label).includes(normalize(term))) : [];

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div ref={ref} className="flex items-center relative w-full">
      <i className="fa-solid fa-magnifying-glass absolute left-4 text-indigo-900 text-lg" />
      <input
        type="text"
        placeholder="Recherche"
        value={value}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onChange("");
            setOpen(false);
          }
          if (e.key === "Enter" && matches[0] && !localSearch) {
            e.preventDefault();
            navigate(matches[0].to);
          }
        }}
        className="w-full bg-gray-50 border border-gray-300 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#18184A] transition"
      />
      {open && term && !localSearch && (
        <div role="listbox" className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {matches.length ? (
            matches.map((m) => (
              <Link key={m.to} to={m.to} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {m.label}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500">Aucun résultat</p>
          )}
        </div>
      )}
    </div>
  );
}
