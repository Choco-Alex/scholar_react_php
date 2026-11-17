import { Link, useNavigate, useParams } from "react-router-dom";
import StudentForm from "../components/StudentForm.jsx";
import { getStudents, saveStudents } from "../lib/storage.js";
import { cardCls } from "../components/ui.js";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = getStudents().find((s) => s.id === id);

  if (!student) {
    return (
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8f9fc]">
        <div className={`${cardCls} max-w-2xl mx-auto text-center`}>
          <p className="text-gray-600">Cet élève est introuvable.</p>
          <Link to="/eleves" className="mt-3 inline-block text-[#0D0E6D] font-semibold hover:underline">Retour à la liste</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      <div className={`${cardCls} max-w-2xl mx-auto`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#18184A] flex items-center gap-2">
            <i className="fa-solid fa-user-gear text-indigo-600" /> Fiche de modification
          </h2>
          <span className="bg-indigo-50 text-[#18184A] text-xs font-semibold px-3 py-1 rounded-full">
            ID Élève #{String(id).slice(-4).padStart(2, "0")}
          </span>
        </div>
        <StudentForm
          initial={student}
          establishmentLabel="Établissement d'attache"
          onSubmit={(s) => {
            saveStudents(getStudents().map((x) => (x.id === id ? { ...s, id } : x)));
            navigate("/eleves");
          }}
        >
          <div className="flex items-center space-x-3 pt-2">
            <button type="submit" className="flex-1 bg-[#0D0E6D] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-900 transition">
              Enregistrer les modifications
            </button>
            <Link to="/eleves" className="px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-center">
              Annuler
            </Link>
          </div>
        </StudentForm>
      </div>
    </main>
  );
}
