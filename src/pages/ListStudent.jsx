import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSchools, getStudents } from "../lib/storage.js";
import { cardCls } from "../components/ui.js";

const sel = "w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#18184A]";

export default function ListStudent() {
  const navigate = useNavigate();
  const schools = getSchools();
  const [school, setSchool] = useState("");
  const [classe, setClasse] = useState("");
  const all = getStudents();
  const classes = [...new Set((school ? schools.filter((s) => s.name === school) : schools).flatMap((s) => s.classes))];
  const rows = all.filter((s) => (!school || s.etablissement === school) && (!classe || s.classe === classe));

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      <div className={`${cardCls} max-w-4xl mx-auto no-print`}>
        <h2 className="text-sm font-bold text-[#18184A] mb-3 flex items-center gap-2">
          <i className="fa-solid fa-filter text-indigo-600" /> Filtrer les élèves
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Établissement</label>
            <select value={school} onChange={(e) => { setSchool(e.target.value); setClasse(""); }} className={sel}>
              <option value="">Tous les établissements</option>
              {schools.map((s) => <option key={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Salle de classe</label>
            <select value={classe} onChange={(e) => setClasse(e.target.value)} className={sel}>
              <option value="">Toutes les classes</option>
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className={`${cardCls} max-w-4xl mx-auto`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#18184A]">Résultats de la liste</h2>
            <p className="text-xs text-gray-500">Cliquez sur un élève pour modifier ses informations</p>
          </div>
          <button onClick={() => window.print()} className="no-print bg-[#0D0E6D] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-indigo-900 transition flex items-center gap-2">
            <i className="fa-solid fa-print" /> Imprimer la liste
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50/50 text-[#18184A] border-b border-gray-200 text-xs uppercase tracking-wider">
                <th className="p-3 font-semibold">Élève</th>
                <th className="p-3 font-semibold">Date de naissance</th>
                <th className="p-3 font-semibold">Établissement</th>
                <th className="p-3 font-semibold">Classe</th>
                <th className="p-3 font-semibold">Parents / Urgence</th>
                <th className="p-3 font-semibold text-right no-print">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {rows.map((s) => (
                <tr key={s.id} onClick={() => navigate(`/eleves/${s.id}/modifier`)} className="hover:bg-indigo-50/40 transition cursor-pointer group">
                  <td className="p-3 font-medium text-[#18184A]">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-indigo-100 text-[#18184A] flex items-center justify-center text-xs font-bold">
                        {(s.prenom[0] || "") + (s.nom[0] || "")}
                      </div>
                      <div>
                        <span>{s.nom} {s.prenom}</span>
                        <span className={`block text-[11px] font-normal ${s.statut === "ancien" ? "text-emerald-600" : "text-indigo-600"}`}>
                          {s.statut === "ancien" ? "Ancien" : "Nouveau"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{s.naissance && new Date(s.naissance).toLocaleDateString("fr-FR")}</td>
                  <td className="p-3 text-gray-600">{s.etablissement}</td>
                  <td className="p-3"><span className="bg-indigo-50 text-[#18184A] px-2.5 py-1 rounded-lg text-xs font-semibold">{s.classe}</span></td>
                  <td className="p-3 text-gray-600">{s.parents}<br /><span className="text-xs text-gray-400">{s.urgence}</span></td>
                  <td className="p-3 text-right no-print">
                    <Link to={`/eleves/${s.id}/modifier`} onClick={(e) => e.stopPropagation()} className="text-indigo-600 hover:text-[#0D0E6D] p-2 inline-block" title="Modifier">
                      <i className="fa-solid fa-pen-to-square" />
                    </Link>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td colSpan={6} className="p-6 text-center text-sm text-gray-500">Aucun élève ne correspond à ces filtres.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
