import { useState } from "react";
import { getSchools, getTeachers, saveTeachers, formatFCFA, normalize } from "../lib/storage.js";
import { cardCls, inputCls, labelCls } from "../components/ui.js";
import { useOutletContext } from "react-router-dom";

const EMPTY = { nom: "", prenom: "", sexe: "M", naissance: "", telephone: "", email: "", adresse: "", diplome: "Licence", specialite: "", etablissement: "", classes: "", contrat: "Permanent", dateEmbauche: "", heures: "", salaire: "", statut: "Actif" };
const DIPLOMES = ["Baccalauréat", "Licence", "Master", "Doctorat", "DIPES I", "DIPES II", "CAPIEMP"];
const MATIERES = ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Anglais", "Histoire-Géographie", "Philosophie", "Informatique", "EPS", "Allemand", "Espagnol"];

export default function NewTeacher() {
  const [t, setT] = useState(EMPTY);
  const [list, setList] = useState(getTeachers);
  const [message, setMessage] = useState("");
  const { search = "" } = useOutletContext() || {};
  const schools = getSchools();
  const set = (k) => (e) => setT((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = [...list, { ...t, heures: Number(t.heures), salaire: Number(t.salaire), id: Date.now().toString() }];
    saveTeachers(next);
    setList(next);
    setMessage(`Enseignant « ${t.prenom} ${t.nom} » enregistré avec succès.`);
    setT(EMPTY);
  };
  const remove = (id) => {
    const next = list.filter((x) => x.id !== id);
    saveTeachers(next);
    setList(next);
  };
  const shown = list.filter((x) => normalize(`${x.nom} ${x.prenom} ${x.specialite} ${x.etablissement}`).includes(normalize(search)));
  const masse = list.filter((x) => x.statut !== "Démissionnaire").reduce((a, x) => a + Number(x.salaire || 0), 0);

  const field = (label, k, props = {}) => (
    <div><label className={labelCls}>{label}</label><input value={t[k]} onChange={set(k)} className={inputCls} required {...props} /></div>
  );
  const select = (label, k, opts, props = {}) => (
    <div><label className={labelCls}>{label}</label>
      <select value={t[k]} onChange={set(k)} className={inputCls} required {...props}>{opts}</select></div>
  );
  const section = (icon, title) => (
    <h3 className="text-sm font-bold text-[#18184A] uppercase tracking-wide flex items-center gap-2 pt-2"><i className={`fa-solid ${icon} text-indigo-600`} /> {title}</h3>
  );

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      <div className={`${cardCls} max-w-4xl mx-auto`}>
        <h2 className="text-lg font-bold text-[#18184A] mb-4 flex items-center gap-2">
          <i className="fa-solid fa-chalkboard-user text-indigo-600" /> Informations de l'enseignant
        </h2>
        <form className="space-y-4" onSubmit={submit}>
          {section("fa-id-card", "Identité")}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {field("Nom", "nom", { placeholder: "Ex: Nkoulou" })}
            {field("Prénom", "prenom", { placeholder: "Ex: Bertrand" })}
            {select("Sexe", "sexe", <><option value="M">Masculin</option><option value="F">Féminin</option></>)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {field("Date de naissance", "naissance", { type: "date" })}
            {field("Téléphone", "telephone", { type: "tel", placeholder: "+237 6XX XXX XXX" })}
            {field("Email", "email", { type: "email", placeholder: "nom@ecole.cm" })}
          </div>
          {field("Adresse", "adresse", { placeholder: "Ville, quartier" })}

          {section("fa-graduation-cap", "Profil professionnel")}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {select("Diplôme le plus élevé", "diplome", DIPLOMES.map((d) => <option key={d}>{d}</option>))}
            {select("Matière enseignée", "specialite", <><option value="">Sélectionner</option>{MATIERES.map((d) => <option key={d}>{d}</option>)}</>)}
            {select("Établissement", "etablissement", <><option value="">Sélectionner</option>{schools.map((s) => <option key={s.id}>{s.name}</option>)}</>)}
          </div>
          {field("Classes attribuées", "classes", { placeholder: "Ex: Terminale C, Première C", required: false })}

          {section("fa-file-signature", "Contrat & rémunération")}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {select("Type de contrat", "contrat", ["Permanent", "Contractuel", "Vacataire", "Stagiaire"].map((d) => <option key={d}>{d}</option>))}
            {field("Date d'embauche", "dateEmbauche", { type: "date" })}
            {select("Statut", "statut", ["Actif", "En congé", "Démissionnaire"].map((d) => <option key={d}>{d}</option>))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("Heures de cours par semaine", "heures", { type: "number", min: 1, max: 40, placeholder: "Ex: 18" })}
            {field("Salaire mensuel (FCFA)", "salaire", { type: "number", min: 0, step: 1000, placeholder: "Ex: 250000" })}
          </div>
          <button type="submit" className="w-full bg-[#0D0E6D] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-900 transition mt-2">Enregistrer l'enseignant</button>
          {message && <p className="text-center text-sm font-medium text-green-700">{message}</p>}
        </form>
      </div>

      <div className={`${cardCls} max-w-4xl mx-auto`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="text-lg font-bold text-[#18184A] flex items-center gap-2"><i className="fa-solid fa-users text-indigo-600" /> Enseignants enregistrés ({list.length})</h2>
          <span className="text-sm text-gray-500">Masse salariale mensuelle : <b className="text-[#18184A]">{formatFCFA(masse)}</b></span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-3">Nom</th><th className="pr-3">Matière</th><th className="pr-3">Établissement</th><th className="pr-3">Contrat</th><th className="pr-3">Salaire</th><th className="pr-3">Statut</th><th></th>
            </tr></thead>
            <tbody>
              {shown.map((x) => (
                <tr key={x.id} className="border-b last:border-0">
                  <td className="py-3 pr-3 font-semibold text-[#18184A]">{x.prenom} {x.nom}<div className="text-xs text-gray-400 font-normal">{x.telephone}</div></td>
                  <td className="pr-3">{x.specialite}</td>
                  <td className="pr-3">{x.etablissement}</td>
                  <td className="pr-3">{x.contrat}</td>
                  <td className="pr-3 whitespace-nowrap">{formatFCFA(x.salaire)}</td>
                  <td className="pr-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${x.statut === "Actif" ? "bg-green-100 text-green-700" : x.statut === "En congé" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{x.statut}</span></td>
                  <td><button onClick={() => remove(x.id)} className="text-gray-400 hover:text-red-600" title="Supprimer"><i className="fa-solid fa-trash" /></button></td>
                </tr>
              ))}
              {!shown.length && <tr><td colSpan="7" className="py-6 text-center text-gray-400">Aucun enseignant trouvé.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
