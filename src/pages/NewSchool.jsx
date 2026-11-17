import { useState } from "react";
import { getSchools, saveSchools } from "../lib/storage.js";
import { cardCls, inputCls, labelCls } from "../components/ui.js";

const TYPES = [
  "Géneral Francophone", "Général Anglophone", "Général Bilingue",
  "Technique Francophone", "Technique Anglophone", "Technique Bilingue",
  "Général et Technique Francophone", "Général et Technique Anglophone", "Général et Technique Bilingue",
];

export default function NewSchool() {
  const [name, setName] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [newClass, setNewClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [msg, setMsg] = useState(null);

  const addClass = () => {
    const c = newClass.trim();
    if (!c) return;
    if (classes.some((x) => x.toLowerCase() === c.toLowerCase())) {
      setMsg({ ok: false, text: "Cette classe existe déjà dans la liste." });
      return;
    }
    setClasses([...classes, c]);
    setNewClass("");
    setMsg(null);
  };

  const submit = (e) => {
    e?.preventDefault();
    const n = name.trim();
    if (!n) return setMsg({ ok: false, text: "Veuillez saisir le nom de l'établissement." });
    if (!classes.length) return setMsg({ ok: false, text: "Veuillez ajouter au moins une salle de classe." });
    const schools = getSchools();
    if (schools.some((s) => s.name.toLowerCase() === n.toLowerCase()))
      return setMsg({ ok: false, text: "Un établissement portant ce nom existe déjà." });
    saveSchools([...schools, { id: Date.now().toString(), name: n, type, classes }]);
    setMsg({ ok: true, text: `Établissement « ${n} » enregistré avec ${classes.length} classe(s).` });
    setName("");
    setClasses([]);
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      <div className={`${cardCls} max-w-2xl mx-auto`}>
        <h2 className="text-lg font-bold text-[#18184A] mb-4">Informations de l'établissement</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nom de l'établissement</label>
              <input type="text" placeholder="Ex: Collège INTAC" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Type d'établissement</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelCls}>Liste des salles de classe</label>
              <div className="flex gap-2">
                <input
                  type="text" value={newClass} placeholder="Ex: Terminale C, 6ème A..."
                  onChange={(e) => setNewClass(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addClass(); } }}
                  className={inputCls}
                />
                <button type="button" onClick={addClass} className="bg-[#18184A] text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#18184A]/90 transition whitespace-nowrap">
                  Ajouter une classe
                </button>
              </div>
            </div>
            <div>
              {!classes.length && <p className="text-xs text-gray-400 italic">Aucune classe ajoutée pour le moment.</p>}
              <ul className="space-y-2">
                {classes.map((c, i) => (
                  <li key={c} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm">
                    <span className="text-gray-800 font-medium">{c}</span>
                    <button type="button" onClick={() => setClasses(classes.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-700 text-xs font-semibold">
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button" onClick={submit} disabled={!classes.length}
              className={`w-full bg-green-600 text-white rounded-xl p-3 text-sm font-semibold hover:bg-green-700 transition ${!classes.length ? "opacity-55 cursor-not-allowed" : ""}`}
            >
              Enregistrer toutes les salles ({classes.length})
            </button>
          </div>

          {msg && <p className={`text-center text-sm font-medium ${msg.ok ? "text-green-700" : "text-red-600"}`}>{msg.text}</p>}

          <button type="submit" className="w-full bg-[#0D0E6D] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-900 transition">
            Enregistrer l'établissement
          </button>
        </form>
      </div>
    </main>
  );
}
