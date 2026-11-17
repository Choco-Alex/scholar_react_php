import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Prépare un e-mail dans l'application de messagerie de l'utilisateur
  const submit = (e) => {
    e.preventDefault();
    const body = `E-mail : ${email}\n\n${message}`;
    window.location.href = `mailto:support@scholar.cm?subject=${encodeURIComponent("Message depuis Scholar")}&body=${encodeURIComponent(body)}`;
  };

  const field = "w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#18184A]";
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto space-y-6">
        <section className="bg-[#0D0E6D] text-white rounded-2xl p-6 md:p-8">
          <p className="text-sm font-semibold text-lime-300">Contact</p>
          <h2 className="mt-1 text-2xl font-bold">Parlons de votre besoin.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-100">Décrivez votre demande ou choisissez un canal direct. Le formulaire prépare un e-mail dans votre application de messagerie.</p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-3">
            <a href="mailto:support@scholar.cm" className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#18184A] transition">
              <span className="w-10 h-10 rounded-lg bg-indigo-100 text-[#18184A] flex items-center justify-center"><i className="fa-solid fa-envelope" aria-hidden="true" /></span>
              <span className="mt-4 block text-xs text-gray-500">Écrivez-nous</span>
              <span className="mt-1 block font-semibold text-[#18184A]">support@scholar.cm</span>
            </a>
            <a href="tel:+237233000000" className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#18184A] transition">
              <span className="w-10 h-10 rounded-lg bg-lime-100 text-lime-800 flex items-center justify-center"><i className="fa-solid fa-phone" aria-hidden="true" /></span>
              <span className="mt-4 block text-xs text-gray-500">Appelez-nous</span>
              <span className="mt-1 block font-semibold text-[#18184A]">+237 233 00 00 00</span>
            </a>
          </section>

          <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#18184A]">Préparer un message</h3>
            <p className="mt-1 text-sm text-gray-600">Les champs sont ajoutés à un nouveau courriel prêt à envoyer.</p>
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Votre e-mail</label>
                <input id="contact-email" type="email" required placeholder="nom@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                <textarea id="contact-message" rows={5} required placeholder="Comment pouvons-nous vous aider ?" value={message} onChange={(e) => setMessage(e.target.value)} className={field} />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-[#0D0E6D] text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-900 transition">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /> Ouvrir l'e-mail
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
