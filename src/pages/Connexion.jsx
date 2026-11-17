import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout, { authButton, authInput, authLabel } from "../components/AuthLayout.jsx";
import PasswordInput from "../components/PasswordInput.jsx";
import school from "../assets/images/school.png";
import { getProfile, saveProfile } from "../lib/storage.js";

export default function Connexion() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => { document.title = "Connexion | Scholar"; }, []);

  const submit = (e) => {
    e.preventDefault();
    // TODO : vérifier les identifiants auprès de votre API
    const existing = getProfile();
    saveProfile({ ...existing, name: existing.name || name.trim(), source: existing.source || "accueil" });
    navigate("/accueil");
  };

  return (
    <AuthLayout asideWidth="md:w-[38%]" message="Connecter vous pour commencer a profiter de l’ensemble des fonctionnalités de l’application">
      <div className="relative w-full">
        <img src={school} alt="" className="absolute -top-10 -right-8 md:w-28 w-20 h-28 object-contain" />
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0D0E6D] text-center">Connexion</h2>
        <img src={school} alt="" className="absolute -top-16 -left-4 md:w-28 w-20 h-28 object-contain" />
      </div>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className={authLabel}>Nom d'utilisateur</label>
          <input id="name" type="text" required placeholder="Entrer votre nom d'utilisateur" value={name} onChange={(e) => setName(e.target.value)} className={authInput} />
        </div>
        <PasswordInput id="password" label="Mot de passe" value={password} onChange={setPassword} />
        <button type="submit" className={authButton}>Se connecter</button>
      </form>
      <p className="mt-6 text-center font-bold text-sm text-gray-600">
        Vous n'avez pas de compte ?{" "}
        <Link to="/inscription" className="font-semibold text-[#0D0E6D] hover:text-[#A6E77C]">S'inscrire</Link>
      </p>
    </AuthLayout>
  );
}
