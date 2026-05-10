import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { partnerMenuLinks } from "../data/partnerMenuLinks";
import { clearMockSession, getMockSession } from "../data/mockAuth";
import { getNavLinksForRole } from "../data/navigation";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const session = getMockSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navLinks = getNavLinksForRole(session?.role);

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
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
                  className={`py-3 px-4 text-sm font-black rounded-lg transition ${isActive(pathname, link.path) ? "bg-[#ECF8FC] text-[#0F6C8D]" : "text-[#0F2A43] hover:bg-[#ECF8FC]"}`}
                >
                  {link.label}
                </Link>
              ))}

              {!session && (
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
              )}

              <div className="border-t border-slate-200 pt-4 mt-4 space-y-3">
                {session ? (
                  <>
                    <p className="px-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{session.status}</p>
                    {session.role === "partner" && session.validationStatus && (
                      <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm font-black text-amber-700">
                        Compte en attente de validation
                      </div>
                    )}
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
                    <Link
                      to="/spaces"
                      onClick={closeMenu}
                      className="block w-full rounded-lg bg-[#0F6C8D] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#0B5873]"
                    >
                      Réserver un espace
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

function isActive(pathname, path) {
  const cleanPath = path.split("#")[0].split("?")[0];
  if (cleanPath === "/") return pathname === "/";
  return pathname === cleanPath || pathname.startsWith(`${cleanPath}/`);
}

export default MobileNav;
