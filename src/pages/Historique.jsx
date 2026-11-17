import { formatDate, getPayments } from "../lib/storage.js";
import { cardCls } from "../components/ui.js";

export default function Historique() {
  const payments = getPayments();
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#f8f9fc]">
      <div className={cardCls}>
        <h2 className="text-lg font-bold text-[#18184A] mb-4">Transactions récentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="py-3 px-4">Référence</th>
                <th className="py-3 px-4">Élève</th>
                <th className="py-3 px-4">Montant</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {payments.map((p) => (
                <tr key={p.ref} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-[#18184A]">{p.ref}</td>
                  <td className="py-3 px-4">{p.eleve}</td>
                  <td className="py-3 px-4">{Number(p.montant).toLocaleString("fr-FR")} XAF</td>
                  <td className="py-3 px-4">{formatDate(p.date)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.statut === "Validé" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {p.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
