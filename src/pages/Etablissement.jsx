import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getSchools, getSelectedSchool, normalize, setSelectedSchool } from "../lib/storage.js";

export default function Etablissement() {
  const { search } = useOutletContext();
  const navigate = useNavigate();
  const schools = getSchools();
  const [selected, setSelected] = useState(getSelectedSchool());
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const term = search.trim();
  const visible = term ? schools.filter((s) => normalize(s.name).includes(normalize(term))) : schools;

  // La recherche sélectionne automatiquement le premier établissement correspondant
  useEffect(() => {
    if (term) choose(visible[0]?.name || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function choose(name) {
    setSelected(name);
    setSelectedSchool(name);
    setOpen(false);
  }

  const label = selected || (schools.length ? "Choisir un établissement" : "Aucun établissement enregistré");

  return (
    <main className="bg-[#F8F9FC] flex-1 overflow-y-auto p-6">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6 italic">
        Veillez sélectionner votre établissement ou celui de votre enfant pour continuer le processus de paiement des frais de scolarité.
      </h2>
      <div className="max-w-5xl bg-white rounded-2xl shadow-md p-6">
        <label className="block text-sm font-semibold text-[#18184A] mb-2">Sélectionner un établissement</label>
        <div className="relative max-w-xs" ref={ref}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-left text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#18184A]"
          >
            <i className="fa-solid fa-building-columns text-[#18184A]" />
            <span className="flex-1">{label}</span>
            <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div role="listbox" className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto border border-gray-300 bg-gray-200 shadow-md">
              {visible.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="option"
                  aria-selected={s.name === selected}
                  onClick={() => choose(s.name)}
                  className="flex w-full items-center gap-3 border-b border-gray-400 px-3 py-2.5 text-left text-sm text-gray-700 last:border-b-0 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                >
                  <i className="fa-solid fa-chevron-right text-xs text-[#18184A]" />
                  {s.name}
                </button>
              ))}
              {!visible.length && <p className="px-3 py-2.5 text-sm text-gray-600">Aucun résultat</p>}
            </div>
          )}
        </div>
        {!schools.length && (
          <p className="mt-3 text-sm text-gray-600">
            <Link to="/nouvel-etablissement" className="text-[#0D0E6D] font-semibold hover:underline">Enregistrer un établissement</Link>
          </p>
        )}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            disabled={!selected}
            onClick={() => navigate("/paiement")}
            className={`text-white px-6 py-3 rounded-lg shadow-md transition ${selected ? "bg-[#0D0E6D] hover:bg-[#18184A]" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Suivant <i className="fa-solid fa-circle-right ml-1" />
          </button>
        </div>
      </div>
    </main>
  );
}
