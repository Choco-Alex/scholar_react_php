import { Link } from "react-router-dom";
import { getPayments, getSchools, getStudents, getTeachers, formatFCFA, formatDate } from "../lib/storage.js";
import { cardCls } from "../components/ui.js";

// Données des années précédentes (exemple, à remplacer par l'historique réel)
const HISTORY = [
  { annee: "2022-2023", eleves: 980, enseignants: 52, paye: 41500000, attendu: 52000000 },
  { annee: "2023-2024", eleves: 1105, enseignants: 58, paye: 48200000, attendu: 58500000 },
  { annee: "2024-2025", eleves: 1240, enseignants: 63, paye: 55900000, attendu: 64800000 },
];
const MOIS = ["Sep", "Oct", "Nov", "Déc", "Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
const ENCAISSE_ACTUEL = [9.8, 7.2, 6.1, 5.4, 6.8, 4.9, 4.2, 3.8, 2.9, 1.5];
const ENCAISSE_PRECEDENT = [8.9, 6.5, 5.2, 4.8, 5.9, 4.4, 3.9, 3.6, 2.5, 1.2];
const ECHEANCES = [
  { tranche: "1ère tranche", date: "2026-10-15", montant: 45000, payes: 1180 },
  { tranche: "2ème tranche", date: "2026-12-15", montant: 35000, payes: 820 },
  { tranche: "3ème tranche", date: "2027-02-15", montant: 30000, payes: 310 },
  { tranche: "Frais d'examen", date: "2027-03-31", montant: 15000, payes: 95 },
];
const TOTAL_ELEVES_BASE = 1350;

const pct = (a, b) => (b ? Math.round(((a - b) / b) * 100) : 0);

function Stat({ icon, label, value, delta, color }) {
  return (
    <div className={cardCls + " flex items-start gap-4"}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}><i className={`fa-solid ${icon}`} /></div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-lg font-extrabold text-[#18184A] leading-tight">{value}</p>
        {delta !== undefined && (
          <p className={`text-xs font-semibold mt-1 ${delta >= 0 ? "text-green-600" : "text-red-600"}`}>
            <i className={`fa-solid ${delta >= 0 ? "fa-arrow-trend-up" : "fa-arrow-trend-down"}`} /> {delta >= 0 ? "+" : ""}{delta}% vs 2024-2025
          </p>
        )}
      </div>
    </div>
  );
}

function BarChart({ data, max, format }) {
  return (
    <div className="flex items-end gap-4 h-48 pt-4">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <span className="text-xs font-semibold text-[#18184A]">{format(d.value)}</span>
          <div className={`w-full max-w-14 rounded-t-lg ${d.current ? "bg-[#0D0E6D]" : "bg-indigo-200"}`} style={{ height: `${(d.value / max) * 100}%` }} />
          <span className="text-xs text-gray-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart() {
  const W = 600, H = 200, max = 11;
  const pts = (arr) => arr.map((v, i) => `${(i / (arr.length - 1)) * W},${H - (v / max) * H}`).join(" ");
  return (
    <div>
      <svg viewBox={`0 -10 ${W} ${H + 20}`} className="w-full h-52">
        {[0, 0.25, 0.5, 0.75, 1].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#eef0f6" />)}
        <polyline points={pts(ENCAISSE_PRECEDENT)} fill="none" stroke="#a5b4fc" strokeWidth="3" strokeDasharray="6 6" />
        <polyline points={pts(ENCAISSE_ACTUEL)} fill="none" stroke="#0D0E6D" strokeWidth="3" />
        {ENCAISSE_ACTUEL.map((v, i) => <circle key={i} cx={(i / 9) * W} cy={H - (v / max) * H} r="4" fill="#A6E77C" stroke="#0D0E6D" strokeWidth="2" />)}
      </svg>
      <div className="flex justify-between text-xs text-gray-500 px-1">{MOIS.map((m) => <span key={m}>{m}</span>)}</div>
      <div className="flex gap-4 text-xs mt-3">
        <span className="flex items-center gap-1"><span className="w-4 h-1 bg-[#0D0E6D] inline-block" /> 2025-2026</span>
        <span className="flex items-center gap-1"><span className="w-4 h-1 bg-indigo-300 inline-block" /> 2024-2025</span>
        <span className="text-gray-400">(millions FCFA)</span>
      </div>
    </div>
  );
}

function Donut({ parts }) {
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  let acc = 0;
  const stops = parts.map((p) => { const s = acc; acc += (p.value / total) * 100; return `${p.color} ${s}% ${acc}%`; }).join(", ");
  return (
    <div className="flex items-center gap-6">
      <div className="w-32 h-32 rounded-full shrink-0 grid place-items-center" style={{ background: `conic-gradient(${stops})` }}>
        <div className="w-20 h-20 bg-white rounded-full grid place-items-center text-center">
          <span className="text-lg font-extrabold text-[#18184A] leading-none">{total}</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: p.color }} />{p.label} <b className="text-[#18184A]">{p.value}</b></li>
        ))}
      </ul>
    </div>
  );
}

export default function Accueil() {
  const schools = getSchools();
  const students = getStudents();
  const teachers = getTeachers();
  const payments = getPayments();

  const totalEleves = TOTAL_ELEVES_BASE + students.length;
  const totalEns = 66 + teachers.length;
  const payeLocal = payments.filter((p) => p.statut === "Validé").reduce((a, p) => a + Number(p.montant), 0);
  const totalPaye = 52600000 + payeLocal;
  const attendu = totalEleves * 110000;
  const reste = Math.max(attendu - totalPaye, 0);
  const tauxRecouvrement = Math.round((totalPaye / attendu) * 100);
  const masse = teachers.reduce((a, t) => a + Number(t.salaire || 0), 0);
  const prev = HISTORY[HISTORY.length - 1];
  const nouveaux = students.filter((s) => s.statut === "nouveau").length + 410;
  const anciens = totalEleves - nouveaux;
  const prochaine = ECHEANCES.find((e) => new Date(e.date) >= new Date()) || ECHEANCES[ECHEANCES.length - 1];

  const elevesData = [...HISTORY.map((h) => ({ label: h.annee.slice(2, 4) + "-" + h.annee.slice(7), value: h.eleves })), { label: "25-26", value: totalEleves, current: true }];
  const payeData = [...HISTORY.map((h) => ({ label: h.annee.slice(2, 4) + "-" + h.annee.slice(7), value: h.paye })), { label: "25-26", value: totalPaye, current: true }];

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      <div className="bg-[#0D0E6D] text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div>
          <p className="text-indigo-200 text-sm">Année scolaire 2025-2026</p>
          <h2 className="text-2xl font-extrabold">Tableau de bord de l'établissement</h2>
          <p className="text-indigo-200 text-sm mt-1">Suivi des effectifs, du personnel et des paiements en temps réel.</p>
        </div>
        <div className="bg-white/10 rounded-xl px-5 py-3">
          <p className="text-xs text-indigo-200">Taux de recouvrement</p>
          <p className="text-3xl font-extrabold text-[#A6E77C]">{tauxRecouvrement}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat icon="fa-user-graduate" label="Nombre total d'élèves" value={totalEleves.toLocaleString("fr-FR")} delta={pct(totalEleves, prev.eleves)} color="bg-indigo-50 text-[#0D0E6D]" />
        <Stat icon="fa-chalkboard-user" label="Nombre d'enseignants" value={totalEns} delta={pct(totalEns, prev.enseignants)} color="bg-green-50 text-green-700" />
        <Stat icon="fa-sack-dollar" label="Scolarité totale payée" value={formatFCFA(totalPaye)} delta={pct(totalPaye, prev.paye)} color="bg-emerald-50 text-emerald-700" />
        <Stat icon="fa-hourglass-half" label="Reste à recouvrer" value={formatFCFA(reste)} color="bg-red-50 text-red-600" />
        <Stat icon="fa-building-columns" label="Établissements partenaires" value={schools.length} color="bg-sky-50 text-sky-700" />
        <Stat icon="fa-layer-group" label="Classes ouvertes" value={schools.reduce((a, s) => a + s.classes.length, 0)} color="bg-purple-50 text-purple-700" />
        <Stat icon="fa-wallet" label="Masse salariale mensuelle" value={formatFCFA(masse)} color="bg-amber-50 text-amber-700" />
        <Stat icon="fa-calendar-day" label="Prochaine échéance" value={formatDate(prochaine.date)} color="bg-orange-50 text-orange-600" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className={cardCls + " xl:col-span-2"}>
          <h3 className="font-bold text-[#18184A] mb-2">Encaissements mensuels : comparaison avec l'année dernière</h3>
          <LineChart />
        </div>
        <div className={cardCls}>
          <h3 className="font-bold text-[#18184A] mb-4">Répartition des élèves</h3>
          <Donut parts={[{ label: "Nouveaux", value: nouveaux, color: "#0D0E6D" }, { label: "Anciens", value: anciens, color: "#A6E77C" }]} />
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Scolarité payée / attendue</span><b className="text-[#18184A]">{tauxRecouvrement}%</b></div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#0D0E6D]" style={{ width: `${tauxRecouvrement}%` }} /></div>
            <p className="text-xs text-gray-400 mt-1">Attendu : {formatFCFA(attendu)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={cardCls}>
          <h3 className="font-bold text-[#18184A]">Évolution des effectifs</h3>
          <BarChart data={elevesData} max={Math.max(...elevesData.map((d) => d.value))} format={(v) => v.toLocaleString("fr-FR")} />
        </div>
        <div className={cardCls}>
          <h3 className="font-bold text-[#18184A]">Scolarité encaissée par année</h3>
          <BarChart data={payeData} max={Math.max(...payeData.map((d) => d.value))} format={(v) => (v / 1e6).toFixed(1) + " M"} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-6">
        <div className={cardCls + " xl:col-span-2"}>
          <h3 className="font-bold text-[#18184A] mb-4">Échéances de paiement</h3>
          <div className="space-y-4">
            {ECHEANCES.map((e) => {
              const p = Math.round((e.payes / totalEleves) * 100);
              const passed = new Date(e.date) < new Date();
              return (
                <div key={e.tranche}>
                  <div className="flex flex-wrap justify-between text-sm mb-1 gap-2">
                    <span className="font-semibold text-[#18184A]">{e.tranche} <span className="text-gray-400 font-normal">· {formatFCFA(e.montant)} · {formatDate(e.date)}</span></span>
                    <span className={passed ? "text-red-600 font-semibold" : "text-gray-500"}>{e.payes} / {totalEleves} élèves ({p}%){passed && p < 100 ? " · en retard" : ""}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full ${passed && p < 100 ? "bg-red-400" : "bg-[#A6E77C]"}`} style={{ width: `${p}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={cardCls}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#18184A]">Derniers paiements</h3>
            <Link to="/historique" className="text-xs text-indigo-600 font-semibold hover:underline">Tout voir</Link>
          </div>
          <ul className="space-y-3">
            {payments.slice(0, 5).map((p) => (
              <li key={p.ref} className="flex justify-between items-center text-sm">
                <div><p className="font-semibold text-[#18184A]">{p.eleve}</p><p className="text-xs text-gray-400">{p.ref} · {formatDate(p.date)}</p></div>
                <span className="font-bold text-green-700 whitespace-nowrap">{formatFCFA(p.montant)}</span>
              </li>
            ))}
          </ul>
          <h3 className="font-bold text-[#18184A] mt-6 mb-3">Comparatif annuel</h3>
          <table className="w-full text-xs">
            <thead><tr className="text-gray-400 text-left"><th className="py-1">Année</th><th>Élèves</th><th>Enseig.</th><th>Payé</th></tr></thead>
            <tbody>
              {[...HISTORY, { annee: "2025-2026", eleves: totalEleves, enseignants: totalEns, paye: totalPaye }].map((h) => (
                <tr key={h.annee} className="border-t"><td className="py-1.5 font-semibold text-[#18184A]">{h.annee}</td><td>{h.eleves}</td><td>{h.enseignants}</td><td>{(h.paye / 1e6).toFixed(1)} M</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
