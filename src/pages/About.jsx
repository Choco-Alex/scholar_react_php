import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "fa-school", box: "bg-lime-100 text-lime-800", title: "Un espace organisé", text: "Retrouvez les établissements, les classes et les élèves avant de choisir une échéance." },
  { icon: "fa-list-check", box: "bg-indigo-100 text-[#18184A]", title: "Des étapes lisibles", text: "Le parcours de paiement guide la sélection de l'élève, de la tranche et de l'opérateur mobile." },
  { icon: "fa-mobile-screen-button", box: "bg-rose-100 text-rose-800", title: "Pensé pour le mobile", text: "Les pages s'adaptent aux écrans mobiles pour consulter les informations où que vous soyez." },
];
const STEPS = [
  { n: "01", label: "Etablissement", border: "border-lime-500" },
  { n: "02", label: "Classe et élève", border: "border-indigo-300" },
  { n: "03", label: "Tranche scolaire", border: "border-rose-300" },
  { n: "04", label: "Mode de paiement", border: "border-amber-400" },
];

export default function About() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto space-y-6">
        <section className="bg-[#0D0E6D] text-white rounded-2xl p-6 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-lime-300">À propos de Scholar</p>
            <h2 className="mt-2 max-w-2xl text-2xl md:text-3xl font-bold">Une scolarité plus simple, un suivi plus clair.</h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-indigo-100">Scholar rassemble les démarches de paiement scolaire dans un même espace : établissement, élève, échéance et mode de règlement.</p>
          </div>
          <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white/10 border border-white/20 items-center justify-center text-4xl text-lime-300" aria-hidden="true">
            <i className="fa-solid fa-graduation-cap" />
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${f.box}`}><i className={`fa-solid ${f.icon}`} aria-hidden="true" /></span>
              <h3 className="mt-4 font-bold text-[#18184A]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.text}</p>
            </article>
          ))}
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500">Le parcours</p>
              <h3 className="text-xl font-bold text-[#18184A]">Du choix au paiement</h3>
            </div>
            <Link to="/etablissement" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D0E6D] hover:underline">
              Voir les établissements <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className={`border-t-2 ${s.border} pt-3`}>
                <span className="text-xs font-bold text-gray-500">{s.n}</span>
                <p className="mt-1 font-semibold text-[#18184A]">{s.label}</p>
              </li>
            ))}
          </ol>
        </section>
        <p className="text-xs text-gray-500">Scholar · Version 1.0.0</p>
      </div>
    </main>
  );
}
