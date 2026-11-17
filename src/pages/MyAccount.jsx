import { Link } from "react-router-dom";
import { getProfile } from "../lib/storage.js";

export default function MyAccount() {
  const profile = getProfile();
  const name = profile.name || "";
  const ro = "w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-sm text-gray-700";
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto space-y-6">
        <section className="bg-[#0D0E6D] text-white rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 shrink-0 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-2xl font-bold">
            {name.charAt(0).toUpperCase() || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-indigo-200">Compte Parent / Tuteur</p>
            <h2 className="text-2xl font-bold break-words">{name || "Mon profil"}</h2>
            <p className="mt-1 text-sm text-indigo-100">Vos coordonnées enregistrées pour les démarches scolaires.</p>
          </div>
          <Link to="/support" className="sm:ml-auto inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-lime-200 transition">
            <i className="fa-solid fa-circle-question" aria-hidden="true" /> Aide du compte
          </Link>
        </section>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <section className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase text-gray-500">Coordonnées</p>
              <h3 className="text-lg font-bold text-[#18184A]">Informations personnelles</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input id="profile-name" type="text" readOnly value={name} placeholder="Aucune information enregistrée" className={ro} />
              </div>
              <div>
                <label htmlFor="profile-phone" className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                <input id="profile-phone" type="text" readOnly value={profile.phone || ""} placeholder="Aucune information enregistrée" className={ro} />
              </div>
            </div>
          </section>

          <section className="border-l-4 border-lime-500 bg-white rounded-r-2xl p-6">
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-lock text-lime-700 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-[#18184A]">Données du compte</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Ces informations proviennent de l'inscription ou de la connexion et sont conservées sur cet appareil. Pour les modifier, retournez sur la page{" "}
                  <Link to="/inscription" className="font-semibold text-[#0D0E6D] hover:underline">d'inscription</Link>.
                </p>
                <p className="mt-3 text-xs text-gray-500">Le mot de passe n'est pas affiché ni enregistré.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
