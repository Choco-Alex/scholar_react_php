import { useState } from "react";
import { authInput, authLabel } from "./AuthLayout.jsx";

// Champ mot de passe avec l'œil pour afficher / masquer
export default function PasswordInput({ id, label, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <label htmlFor={id} className={authLabel}>{label}</label>
      <input
        id={id}
        type={show ? "text" : "password"}
        required
        placeholder="••••••••"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={authInput}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        className="absolute right-3 top-[3.4rem] text-gray-400"
      >
        <i className={`fa-solid ${show ? "fa-eye" : "fa-eye-slash"}`} />
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
