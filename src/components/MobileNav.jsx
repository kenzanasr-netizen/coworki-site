import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { partnerMenuLinks } from "../data/partnerMenuLinks";
import { clearMockSession, getMockSession } from "../data/mockAuth";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const session = getMockSession();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Espaces", path: "/spaces" },
    { label: "Events", path: "/events" },
    { label: "Entreprises", path: "/business" },
    { label: "À propos", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setIsPartnerOpen(false);
  };

  return (
    <>
      {/* BURGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 xl:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-[#0F2A43]" />
        ) : (
          <Menu className="h-6 w-6 text-[#0F2A43]" />
        )}
      </button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-40 max-h-[calc(100vh-96px)] w-full overflow-y-auto border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-2xl xl:hidden"
          >
            <nav className="flex flex-col px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className="py-3 px-4 text-sm font-black text-[#0F2A43] rounded-lg hover:bg-[#ECF8FC] transition"
                >
                  {link.label}
                </Link>
              ))}

              <div className="rounded-2xl bg-[#F7FAFC] p-2">
                <button
                  type="button"
                  onClick={() => setIsPartnerOpen((current) => !current)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black text-[#0F2A43] transition hover:bg-[#ECF8FC]"
                  aria-expanded={isPartnerOpen}
                >
                  Partenaires
                  <span className={`text-lg transition ${isPartnerOpen ? "rotate-180" : ""}`}>⌄</span>
                </button>
                <AnimatePresence>
                  {isPartnerOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-2 px-2 pb-2">
                        {partnerMenuLinks.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMenu}
                            className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100"
                          >
                            <span className="block text-sm font-black text-[#0F6C8D]">{item.label}</span>
                            <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">{item.description}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-4 space-y-3">
                {session ? (
                  <>
                    <p className="px-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{session.status}</p>
                    {getMobilePrivateLinks(session.role).map(([label, path]) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={closeMenu}
                        className="block rounded-lg px-4 py-3 text-sm font-black text-[#0F2A43] transition hover:bg-[#ECF8FC]"
                      >
                        {label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        clearMockSession();
                        closeMenu();
                        navigate("/");
                      }}
                      className="block w-full rounded-lg bg-[#FBEFF3] px-4 py-3 text-left text-sm font-black text-[#7A1E3A]"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="block py-3 px-4 text-sm font-black text-[#0F2A43] rounded-lg hover:bg-[#ECF8FC] transition"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="block w-full py-3 px-4 text-sm font-black text-white bg-[#7A1E3A] rounded-lg text-center hover:bg-[#64172F] transition"
                    >
                      Créer un compte
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function getMobilePrivateLinks(role) {
  if (role === "admin") {
    return [
      ["Dashboard admin", "/admin/dashboard"],
      ["Utilisateurs", "/admin/users"],
      ["Espaces à valider", "/admin/spaces"],
      ["Réservations", "/admin/bookings"],
      ["Statistiques", "/admin/stats"],
    ];
  }
  if (role === "partner") {
    return [
      ["Dashboard partenaire", "/partner/dashboard"],
      ["Mes espaces", "/dashboard/partner/spaces"],
      ["Réservations", "/dashboard/partner/bookings"],
      ["Demandes B2B", "/dashboard/partner/b2b-requests"],
      ["Revenus", "/dashboard/partner/revenue"],
    ];
  }
  if (role === "business") {
    return [
      ["Dashboard entreprise", "/company/dashboard"],
      ["Demandes B2B", "/company/dashboard#requests"],
      ["Réservations", "/company/dashboard#bookings"],
      ["Salles recommandées", "/business"],
    ];
  }
  return [
    ["Mon profil", "/dashboard"],
    ["Mes réservations", "/dashboard#reservations"],
    ["Mes favoris", "/dashboard#favoris"],
    ["Smart Matching", "/dashboard#smart-matching"],
  ];
}

export default MobileNav;
