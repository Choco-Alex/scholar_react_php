// Stockage local (localStorage) partagé entre toutes les pages.
// Remplacez ces fonctions par des appels à votre API quand le backend sera prêt.
const KEYS = {
  profile: "scholar_profile",
  schools: "scholar_schools",
  students: "scholar_students",
  payments: "scholar_payments",
  teachers: "scholar_teachers",
  selected: "selectedEstablishment",
};

const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const DEFAULT_SCHOOLS = [
  { id: "1", name: "Complexe Scolaire Papyrus", type: "Géneral Francophone", classes: ["Terminale C", "Première C", "Seconde C", "3ème", "4ème"] },
  { id: "2", name: "Lycée Bilingue de Douala", type: "Général Bilingue", classes: ["Terminale C", "Première C", "Seconde C", "3ème"] },
  { id: "3", name: "Collège Saint Michel", type: "Général et Technique Francophone", classes: ["6ème", "5ème", "4ème", "3ème"] },
];
const DEFAULT_STUDENTS = [
  { id: "1", nom: "Tagne", prenom: "Alexandre", naissance: "2007-05-12", statut: "nouveau", etablissement: "Complexe Scolaire Papyrus", classe: "Terminale C", parents: "M. & Mme Tagne", urgence: "+237 699 00 00 00" },
  { id: "2", nom: "Mbarga", prenom: "Chantal", naissance: "2008-09-03", statut: "ancien", etablissement: "Lycée Bilingue de Douala", classe: "Première C", parents: "Mme Mbarga", urgence: "+237 677 11 22 33" },
];
const DEFAULT_PAYMENTS = [
  { ref: "#SCH-89421", eleve: "Alexandre Tagne", montant: 45000, date: "2026-09-12", statut: "Validé" },
  { ref: "#SCH-76310", eleve: "Alexandre Tagne", montant: 30000, date: "2026-08-05", statut: "Validé" },
];

const DEFAULT_TEACHERS = [
  { id: "1", nom: "Nkoulou", prenom: "Bertrand", sexe: "M", naissance: "1985-03-14", telephone: "+237 690 12 34 56", email: "b.nkoulou@papyrus.cm", adresse: "Douala, Bonamoussadi", diplome: "DIPES II", specialite: "Mathématiques", etablissement: "Complexe Scolaire Papyrus", classes: "Terminale C, Première C", contrat: "Permanent", dateEmbauche: "2015-09-01", heures: 18, salaire: 250000, statut: "Actif" },
  { id: "2", nom: "Ekambi", prenom: "Solange", sexe: "F", naissance: "1990-11-22", telephone: "+237 677 45 67 89", email: "s.ekambi@lbd.cm", adresse: "Douala, Akwa", diplome: "Master", specialite: "Physique-Chimie", etablissement: "Lycée Bilingue de Douala", classes: "Seconde C, 3ème", contrat: "Vacataire", dateEmbauche: "2021-10-04", heures: 12, salaire: 120000, statut: "Actif" },
  { id: "3", nom: "Fotso", prenom: "Jean-Paul", sexe: "M", naissance: "1978-06-30", telephone: "+237 699 87 65 43", email: "jp.fotso@stmichel.cm", adresse: "Yaoundé, Bastos", diplome: "DIPES I", specialite: "Français", etablissement: "Collège Saint Michel", classes: "6ème, 5ème", contrat: "Permanent", dateEmbauche: "2010-09-06", heures: 20, salaire: 210000, statut: "En congé" },
];

export const getTeachers = () => read(KEYS.teachers, null) ?? DEFAULT_TEACHERS;
export const saveTeachers = (list) => write(KEYS.teachers, list);

export const getProfile = () => read(KEYS.profile, {});
export const saveProfile = (p) => write(KEYS.profile, p);
export const clearProfile = () => localStorage.removeItem(KEYS.profile);

export const getSchools = () => read(KEYS.schools, null) ?? DEFAULT_SCHOOLS;
export const saveSchools = (list) => write(KEYS.schools, list);

export const getStudents = () => read(KEYS.students, null) ?? DEFAULT_STUDENTS;
export const saveStudents = (list) => write(KEYS.students, list);

export const getPayments = () => read(KEYS.payments, null) ?? DEFAULT_PAYMENTS;
export const addPayment = (p) => write(KEYS.payments, [p, ...getPayments()]);

export const getSelectedSchool = () => sessionStorage.getItem(KEYS.selected) || "";
export const setSelectedSchool = (name) =>
  name ? sessionStorage.setItem(KEYS.selected, name) : sessionStorage.removeItem(KEYS.selected);

export const formatFCFA = (n) => Number(n).toLocaleString("fr-FR") + " FCFA";
export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) : "";
export const normalize = (v) =>
  v.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
