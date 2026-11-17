import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Bienvenue from "./pages/Bienvenue.jsx";
import Connexion from "./pages/Connexion.jsx";
import Inscription from "./pages/Inscription.jsx";
import Accueil from "./pages/Accueil.jsx";
import Etablissement from "./pages/Etablissement.jsx";
import Paiement from "./pages/Paiement.jsx";
import NewStudent from "./pages/NewStudent.jsx";
import ListStudent from "./pages/ListStudent.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import NewSchool from "./pages/NewSchool.jsx";
import Historique from "./pages/Historique.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import Support from "./pages/Support.jsx";
import About from "./pages/About.jsx";
import NewTeacher from "./pages/NewTeacher.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Bienvenue />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route element={<DashboardLayout />}>
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/etablissement" element={<Etablissement />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/nouvel-eleve" element={<NewStudent />} />
        <Route path="/eleves" element={<ListStudent />} />
        <Route path="/eleves/:id/modifier" element={<EditStudent />} />
        <Route path="/nouvel-etablissement" element={<NewSchool />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/mon-compte" element={<MyAccount />} />
        <Route path="/support" element={<Support />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/nouvel-enseignant" element={<NewTeacher />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
