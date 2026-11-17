export const NAV_ITEMS = [
  { to: "/accueil", icon: "fa-table-cells-large", label: "Accueil" },
  { to: "/etablissement", icon: "fa-building-columns", label: "Etablissements" },
  { to: "/paiement", icon: "fa-credit-card", label: "Paiement" },
  { to: "/nouvel-eleve", icon: "fa-user-plus", label: "Nouveau un élève" },
  { to: "/nouvel-enseignant", icon: "fa-chalkboard-user", label: "Enregistrer un enseignant" },
  { to: "/nouvel-etablissement", icon: "fa-school", label: "Nouveau établissement" },
  { to: "/historique", icon: "fa-clock-rotate-left", label: "Historique des paiements" },
  { to: "/mon-compte", icon: "fa-user-gear", label: "Mon Compte" },
  { to: "/support", icon: "fa-headset", label: "Support client" },
  { to: "/a-propos", icon: "fa-circle-info", label: "A propos" },
  { to: "/contact", icon: "fa-at", label: "Contactez Nous" },
];

// Titre et icône de l'en-tête pour chaque page
export const PAGE_TITLES = {
  "/accueil": { icon: "fa-table-cells-large", title: "Tableau de bord" },
  "/nouvel-enseignant": { icon: "fa-chalkboard-user", title: "Enregistrer un enseignant" },
  "/etablissement": { icon: "fa-building-columns", title: "Etablissements Partenaires" },
  "/paiement": { icon: "fa-credit-card", title: "Effectuer un Paiement" },
  "/nouvel-eleve": { icon: "fa-user-plus", title: "Enregistrer un nouvel élève" },
  "/eleves": { icon: "fa-list-ul", title: "Consulter la liste des élèves" },
  "/nouvel-etablissement": { icon: "fa-school", title: "Enregistrer un nouveau établissement" },
  "/historique": { icon: "fa-clock-rotate-left", title: "Historique des paiements" },
  "/mon-compte": { icon: "fa-user-gear", title: "Mon Compte" },
  "/support": { icon: "fa-headset", title: "Support client" },
  "/a-propos": { icon: "fa-circle-info", title: "À propos de Scholar" },
  "/contact": { icon: "fa-at", title: "Contactez-nous" },
  edit: { icon: "fa-user-pen", title: "Modifier les informations d'un élève" },
};
