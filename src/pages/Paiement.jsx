import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { addPayment, formatFCFA, getSchools, getSelectedSchool, getStudents } from "../lib/storage.js";
import { cardCls, inputCls, labelCls, primaryBtn } from "../components/ui.js";

export const TRANCHES = [
  { value: "inscription", label: "Inscription", amount: 25000 },
  { value: "tranche1", label: "Tranche 1", amount: 50000 },
  { value: "tranche2", label: "Tranche 2", amount: 40000 },
  { value: "tranche3", label: "Tranche 3", amount: 35000 },
  { value: "solde", label: "Solde complet", amount: 150000 },
];

// Préfixes Cameroun : MTN 67/650-654/68, Orange 69/655-659.
export const OPERATORS = {
  mtn: { label: "MTN Mobile Money", regex: /^6(7\d|5[0-4]|8\d)\d{6}$/ },
  orange: { label: "Orange Money", regex: /^6(9\d|5[5-9])\d{6}$/ },
};

const MtnLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#FFCC00" />
    <ellipse cx="20" cy="20" rx="16" ry="10" fill="none" stroke="#004F71" strokeWidth="2.5" />
    <text x="20" y="24.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" fill="#004F71">MTN</text>
  </svg>
);
const OrangeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" fill="#000000" />
    <rect x="6" y="22" width="28" height="12" fill="#FF7900" />
    <text x="20" y="17" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8" fill="#FFFFFF">orange</text>
  </svg>
);

export default function Paiement() {
  const establishment = getSelectedSchool();
  const school = getSchools().find((s) => s.name === establishment);
  const [classe, setClasse] = useState("");
  const [eleve, setEleve] = useState("");
  const [tranche, setTranche] = useState("");
  const [method, setMethod] = useState(null);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [success, setSuccess] = useState("");

  const students = useMemo(
    () => getStudents().filter((s) => s.etablissement === establishment && s.classe === classe),
    [establishment, classe],
  );
  const t = TRANCHES.find((x) => x.value === tranche);
  const phoneValid = method && OPERATORS[method].regex.test(phone);
  const phoneError = method && phone.length === 9 && !phoneValid
    ? `Ce numéro n'est pas un numéro ${OPERATORS[method].label} valide.` : "";
  const ready = establishment && classe && eleve && t && phoneValid;

  const reset = (step) => {
    if (step <= 1) setEleve("");
    if (step <= 2) setTranche("");
    if (step <= 3) { setMethod(null); setPhone(""); }
    setSuccess("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!ready || status === "loading") return;
    const payload = {
      etablissement: establishment, classe, eleve, tranche, montant: t.amount,
      operateur: method, telephone: "+237" + phone,
    };
    // TODO : envoyer `payload` à votre API de paiement (MTN MoMo / Orange Money).
    console.log("Paiement :", payload);
    setStatus("loading");
    setTimeout(() => {
      addPayment({
        ref: "#SCH-" + Math.floor(10000 + Math.random() * 90000),
        eleve, montant: t.amount, date: new Date().toISOString(), statut: "En attente",
      });
      setSuccess(`Demande de ${formatFCFA(t.amount)} envoyée au ${payload.telephone}. Validez la transaction sur votre téléphone.`);
      setStatus("done");
    }, 1200);
  };

  const methodCls = (m) =>
    `flex items-center justify-center gap-3 rounded-xl p-3 font-semibold hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${
      method === m ? "border-2 border-[#18184A] text-[#18184A] bg-indigo-50/50" : "border border-gray-300 text-gray-600"
    }`;

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      {!establishment ? (
        <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-300 text-amber-800 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
          <i className="fa-solid fa-triangle-exclamation text-xl mt-0.5" />
          <div>
            <p className="font-semibold">Veuillez d'abord choisir un établissement dans l'onglet Etablissement</p>
            <p className="text-sm mt-1">La sélection de l'élève et de la tranche de paiement sera disponible une fois l'établissement choisi.</p>
            <Link to="/etablissement" className="inline-flex items-center gap-2 mt-3 bg-[#0D0E6D] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-indigo-900 transition">
              <i className="fa-solid fa-building-columns" /> Choisir un établissement
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#18184A] border border-indigo-200">
            <i className="fa-solid fa-building-columns" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Etablissement sélectionné</p>
            <p className="font-bold text-[#18184A]">{establishment}</p>
          </div>
          <Link to="/etablissement" className="ml-auto text-sm text-[#0D0E6D] font-semibold hover:underline">Changer</Link>
        </div>
      )}

      <div className={`${cardCls} max-w-2xl mx-auto`}>
        <h2 className="text-lg font-bold text-[#18184A] mb-4">Informations de scolarité</h2>
        <form onSubmit={submit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="class-select" className={labelCls}>1. Salle de classe</label>
            <select id="class-select" disabled={!school} value={classe} onChange={(e) => { setClasse(e.target.value); reset(1); }} className={inputCls}>
              <option value="">{school ? "-- Choisir une classe --" : "-- Aucune classe disponible --"}</option>
              {school?.classes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="student-select" className={labelCls}>2. Sélectionner l'élève</label>
            <select id="student-select" disabled={!classe || !students.length} value={eleve} onChange={(e) => { setEleve(e.target.value); reset(2); }} className={inputCls}>
              <option value="">
                {!classe ? "-- Choisir d'abord une classe --" : students.length ? "-- Choisir l'élève --" : "-- Aucun élève dans cette classe --"}
              </option>
              {students.map((s) => {
                const n = `${s.prenom} ${s.nom}`;
                return <option key={s.id} value={n}>{n}</option>;
              })}
            </select>
            {classe && !students.length && (
              <p className="mt-1 text-xs text-gray-500">
                <Link to="/nouvel-eleve" className="text-[#0D0E6D] font-semibold hover:underline">Enregistrer un élève</Link> dans cette classe pour continuer.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="tranche-select" className={labelCls}>3. Tranche de paiement</label>
            <select id="tranche-select" disabled={!eleve} value={tranche} onChange={(e) => { setTranche(e.target.value); reset(3); }} className={inputCls}>
              <option value="">-- Choisir une tranche --</option>
              {TRANCHES.map((x) => <option key={x.value} value={x.value}>{x.label}</option>)}
            </select>
            {t && (
              <p className="mt-2 text-sm text-gray-600">
                Montant à payer : <span className="font-bold text-[#18184A]">{formatFCFA(t.amount)}</span>
              </p>
            )}
          </div>

          <div>
            <label className={labelCls}>4. Mode de paiement mobile</label>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" disabled={!t} onClick={() => setMethod("mtn")} className={methodCls("mtn")}>
                <MtnLogo /> Mobile Money
              </button>
              <button type="button" disabled={!t} onClick={() => setMethod("orange")} className={methodCls("orange")}>
                <OrangeLogo /> Orange Money
              </button>
            </div>
          </div>

          {method && (
            <div>
              <label htmlFor="phone-input" className={labelCls}>5. Numéro de téléphone ({OPERATORS[method].label})</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-100 text-sm text-gray-600">+237</span>
                <input
                  id="phone-input" type="tel" inputMode="numeric" maxLength={9} placeholder="6XXXXXXXX" autoFocus
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 9)); setSuccess(""); }}
                  className="w-full bg-gray-50 border border-gray-300 rounded-r-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18184A]"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Ce numéro recevra la demande de paiement du montant de la tranche choisie.</p>
              {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
            </div>
          )}

          {ready && (
            <div className="rounded-xl bg-indigo-50/60 border border-indigo-100 p-4 text-sm text-[#18184A] space-y-1">
              <p><strong>Établissement :</strong> {establishment}</p>
              <p><strong>Classe :</strong> {classe}</p>
              <p><strong>Élève :</strong> {eleve}</p>
              <p><strong>Tranche :</strong> {t.label} — {formatFCFA(t.amount)}</p>
              <p><strong>Paiement :</strong> {OPERATORS[method].label} (+237 {phone})</p>
            </div>
          )}

          <button type="submit" disabled={!ready || status === "loading" || Boolean(success)} className={primaryBtn}>
            {status === "loading" ? "Paiement en cours…" : "Valider et procéder au paiement"}
          </button>
          {success && <p className="text-center text-sm font-medium text-green-700">{success}</p>}
        </form>
      </div>
    </main>
  );
}
