import { Link, useLocation } from "react-router-dom";
import PartnerMegaMenu from "./PartnerMenu";
import PublicNavMenu from "./PublicNavMenu";

const navItems = [
  {
    label: "Espaces",
    path: "/spaces",
    items: [
      { label: "Explorer les espaces", path: "/spaces", description: "Rechercher, filtrer et comparer les espaces." },
      { label: "Postes individuels", path: "/spaces?type=poste", description: "Trouver un poste flexible pour travailler." },
      { label: "Salles de réunion", path: "/spaces?type=salle", description: "Réserver une salle équipée." },
    ],
  },
  {
    label: "Events",
    path: "/events",
    items: [
      { label: "Tous les événements", path: "/events", description: "Networking, workshops et formations." },
      { label: "Networking", path: "/events?category=Networking", description: "Rencontrer les bons profils." },
      { label: "Organiser un event", path: "/events#organiser", description: "Dynamiser un espace partenaire." },
    ],
  },
  {
    label: "Entreprises",
    path: "/business",
    items: [
      { label: "Solutions B2B", path: "/business", description: "Réunions, formations et événements." },
      { label: "Créer un compte entreprise", path: "/signup?type=business", description: "Accéder au parcours B2B." },
      { label: "Demander une offre", path: "/business/request", description: "Envoyer une demande personnalisée." },
    ],
  },
];

function DesktopNav() {
  const { pathname } = useLocation();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="hidden items-center gap-5 rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-xs font-black text-slate-600 shadow-sm xl:flex">
      {navItems.map((item) => (
        <PublicNavMenu key={item.path} {...item} />
      ))}
      <PartnerMegaMenu />
      <Link to="/about" className={isActive("/about") ? "text-[#0F6C8D]" : "transition hover:text-[#0F6C8D]"}>À propos</Link>
      <Link to="/contact" className={isActive("/contact") ? "text-[#0F6C8D]" : "transition hover:text-[#0F6C8D]"}>Contact</Link>
    </nav>
  );
}

export default DesktopNav;
