import { useState } from "react";
import { getSchools } from "../lib/storage.js";
import { inputCls, labelCls } from "./ui.js";

export const EMPTY_STUDENT = { nom: "", prenom: "", naissance: "", statut: "nouveau", etablissement: "", classe: "", parents: "", urgence: "" };

// Formulaire partagé entre « Nouvel élève » et « Modifier un élève »
export default function StudentForm({ initial = EMPTY_STUDENT, onSubmit, children, establishmentLabel = "Établissement" }) {
  const [s, setS] = useState(initial);
  const schools = getSchools();
  const classes = schools.find((x) => x.name === s.etablissement)?.classes || [];
  const set = (k) => (e) => setS((p) => ({ ...p, [k]: e.target.value, ...(k === "etablissement" ? { classe: "" } : {}) }));

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(s, () => setS(EMPTY_STUDENT));
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelCls}>Nom</label><input type="text" placeholder="Ex: Tagne" required value={s.nom} onChange={set("nom")} className={inputCls} /></div>
        <div><label className={labelCls}>Prénom</label><input type="text" placeholder="Ex: Alexandre" required value={s.prenom} onChange={set("prenom")} className={inputCls} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelCls}>Date de naissance</label><input type="date" required value={s.naissance} onChange={set("naissance")} className={inputCls} /></div>
        <div>
          <label className={labelCls}>Statut dans l'établissement</label>
          <select value={s.statut} onChange={set("statut")} className={inputCls}>
            <option value="nouveau">Nouvel élève</option>
            <option value="ancien">Ancien élève</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>{establishmentLabel}</label>
          <select required value={s.etablissement} onChange={set("etablissement")} className={inputCls}>
            <option value="">Sélectionner un établissement</option>
            {schools.map((x) => <option key={x.id}>{x.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Classe</label>
          <select required value={s.classe} onChange={set("classe")} disabled={!classes.length} className={inputCls}>
            <option value="">Sélectionner une classe</option>
            {classes.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelCls}>Nom des parents / tuteur</label><input type="text" placeholder="Ex: M. & Mme Tagne" required value={s.parents} onChange={set("parents")} className={inputCls} /></div>
        <div><label className={labelCls}>Numéro en cas de besoin (Urgence)</label><input type="tel" placeholder="Ex: +237 6XX XXX XXX" required value={s.urgence} onChange={set("urgence")} className={inputCls} /></div>
      </div>
      {children}
    </form>
  );
}
