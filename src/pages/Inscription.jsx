import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout, { authButton, authInput, authLabel } from "../components/AuthLayout.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import { saveProfile } from "../lib/storage.js";

export default function Inscription() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nom: "", prenom: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  useEffect(() => { document.title = "Inscription | Scholar"; }, []);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: typeof v === "string" ? v : v.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    // Le mot de passe n'est jamais enregistré sur l'appareil.
    saveProfile({ name: `${form.nom.trim()} ${form.prenom.trim()}`.trim(), phone: form.phone.trim(), source: "inscription" });
    navigate("/accueil");
  };

  return (
    <AuthLayout asideWidth="md:w-[48%]" message="S’inscrire pour commencer a profiter de l’ensemble des fonctionnalités de l’application">
      <h2 className="mt-0 text-3xl pb-3 md:text-4xl font-bold text-[#0D0E6D] text-center">Inscription</h2>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className={authLabel}>Nom</label>
          <input id="name" type="text" required placeholder="Entrer votre nom" value={form.nom} onChange={set("nom")} className={authInput} />
        </div>
        <div>
          <label htmlFor="prenom" className={authLabel}>Prenom</label>
          <input id="prenom" type="text" required placeholder="Entrer votre prénom" value={form.prenom} onChange={set("prenom")} className={authInput} />
        </div>
        <div>
          <label htmlFor="number" className={authLabel}>Téléphone</label>
          <input id="number" type="tel" required placeholder="+237 *** *** ***" value={form.phone} onChange={set("phone")} className={authInput} />
        </div>
        <PasswordInput id="password" label="Créer un mot de passe" value={form.password} onChange={(v) => { setError(""); set("password")(v); }} />
        <PasswordInput id="confirm-password" label="Confirmer le mot de passe" value={form.confirm} onChange={(v) => { setError(""); set("confirm")(v); }} error={error} />
        <button type="submit" className={authButton}>S'inscrire</button>
      </form>
      <p className="mt-6 text-center font-bold text-sm text-gray-600">
        J'ai déjà un compte?{" "}
        <Link to="/connexion" className="font-semibold text-[#0D0E6D] hover:text-[#A6E77C]">Se connecter</Link>
      </p>
    </AuthLayout>
  );
}
