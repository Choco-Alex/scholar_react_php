import { useState } from "react";
import { Link } from "react-router-dom";
import StudentForm from "../components/StudentForm.jsx";
import { getStudents, saveStudents } from "../lib/storage.js";
import { cardCls } from "../components/ui.js";

const LINKS = [
  { to: "/eleves", icon: "fa-list-ul", title: "Consulter la liste", text: "Voir tous les élèves enregistrés" },
  { to: "/eleves", icon: "fa-user-pen", title: "Modifier un élève", text: "Mettre à jour les informations" },
];

export default function NewStudent() {
  const [message, setMessage] = useState("");
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      <div className={`${cardCls} max-w-2xl mx-auto`}>
        <h2 className="text-lg font-bold text-[#18184A] mb-4 flex items-center gap-2">
          <i className="fa-solid fa-user-pen text-indigo-600" /> Informations de l'élève
        </h2>
        <StudentForm
          onSubmit={(s, reset) => {
            saveStudents([...getStudents(), { ...s, id: Date.now().toString() }]);
            setMessage(`Élève « ${s.prenom} ${s.nom} » enregistré avec succès.`);
            reset();
          }}
        >
          <button type="submit" className="w-full bg-[#0D0E6D] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-900 transition mt-2">
            Enregistrer l'élève
          </button>
          {message && <p className="text-center text-sm font-medium text-green-700">{message}</p>}
        </StudentForm>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
        {LINKS.map((l) => (
          <Link key={l.title} to={l.to} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#18184A] flex items-center justify-center text-xl group-hover:bg-[#0D0E6D] group-hover:text-white transition">
              <i className={`fa-solid ${l.icon}`} />
            </div>
            <div>
              <h3 className="font-bold text-[#18184A] text-sm">{l.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{l.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
