import { Link } from "react-router-dom";

const FAQ = [
  { q: "Comment commencer un paiement ?", a: "Choisissez d'abord un établissement, puis sélectionnez la classe, l'élève, la tranche et le moyen de paiement." },
  { q: "Où retrouver mes coordonnées ?", a: "Ouvrez « Mon Compte » depuis l'en-tête. Les informations affichées viennent de votre inscription ou de votre connexion sur cet appareil." },
  { q: "Je ne trouve pas mon établissement.", a: "Vérifiez la liste dans « Etablissements ». Vous pouvez aussi nous écrire depuis la page Contact." },
];

export default function Support() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto space-y-6">
        <section className="bg-[#0D0E6D] text-white rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-lime-300">Centre d'aide</p>
            <h2 className="mt-1 text-2xl font-bold">On vous accompagne</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-indigo-100">Retrouvez les réponses aux questions fréquentes ou choisissez directement un moyen de nous joindre.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#18184A] px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-lime-100 transition">
            <i className="fa-solid fa-paper-plane" aria-hidden="true" /> Contacter l'équipe
          </Link>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#18184A]">Questions fréquentes</h3>
            <div className="mt-4 divide-y divide-gray-200">
              {FAQ.map((f, i) => (
                <details key={f.q} className="group py-4" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-800">
                    {f.q}
                    <i className="fa-solid fa-chevron-down text-xs text-gray-500 transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase text-gray-500">Nous joindre</p>
            <h3 className="mt-1 text-lg font-bold text-[#18184A]">Choisissez votre canal</h3>
            <div className="mt-4 space-y-3">
              <a href="tel:+237233000000" className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:border-[#18184A] hover:bg-gray-50 transition">
                <span className="w-10 h-10 shrink-0 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center"><i className="fa-solid fa-phone" aria-hidden="true" /></span>
                <span><span className="block text-xs text-gray-500">Téléphone</span><span className="font-semibold text-sm text-[#18184A]">+237 233 00 00 00</span></span>
              </a>
              <a href="mailto:support@scholar.cm" className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:border-[#18184A] hover:bg-gray-50 transition">
                <span className="w-10 h-10 shrink-0 rounded-full bg-indigo-100 text-[#18184A] flex items-center justify-center"><i className="fa-solid fa-envelope" aria-hidden="true" /></span>
                <span><span className="block text-xs text-gray-500">E-mail</span><span className="font-semibold text-sm text-[#18184A]">support@scholar.cm</span></span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
