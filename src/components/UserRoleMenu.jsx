import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { clearMockSession, getMockSession } from "../data/mockAuth";
import { adminNavLinks, companyNavLinks, partnerNavLinks, userNavLinks } from "../data/navigation";

const privateMenus = {
  user: {
    label: "Mon espace",
    greeting: "Bonjour",
    badge: "Utilisateur",
    links: userNavLinks.filter((link) => link.path !== "/"),
  },
  partner: {
    label: "Espace partenaire",
    greeting: "Partenaire CoWorki",
    badge: "Partenaire",
    links: partnerNavLinks,
  },
  business: {
    label: "Espace entreprise",
    greeting: "Entreprise CoWorki",
    badge: "Entreprise",
    links: companyNavLinks,
  },
  admin: {
    label: "Administration",
    greeting: "Admin CoWorki",
    badge: "Administrateur",
    links: adminNavLinks,
  },
};

function UserRoleMenu() {
  const [session, setSession] = useState(() => getMockSession());
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const syncSession = () => setSession(getMockSession());
    window.addEventListener("coworki-auth-change", syncSession);
    window.addEventListener("storage", syncSession);
    return () => {
      window.removeEventListener("coworki-auth-change", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  if (!session) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link
          to="/login"
          className="rounded-full px-5 py-3 text-sm font-black text-[#0F2A43] transition hover:bg-white"
        >
          Connexion
        </Link>
        <Link
          to="/signup"
          className="rounded-full bg-[#7A1E3A] px-6 py-3 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/25 transition hover:bg-[#64172F]"
        >
          Créer un compte
        </Link>
        <Link
          to="/spaces"
          className="rounded-full bg-[#0F6C8D] px-6 py-3 text-sm font-black text-white shadow-xl shadow-[#0F6C8D]/20 transition hover:bg-[#0B5873]"
        >
          Réserver un espace
        </Link>
      </div>
    );
  }

  const menu = privateMenus[session.role];
  const displayName = session.name || menu.greeting;

  const logout = () => {
    clearMockSession();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
    {session.role === "user" && (
      <Link
        to="/spaces"
        className="hidden rounded-full bg-[#7A1E3A] px-5 py-3 text-sm font-black text-white shadow-xl shadow-[#7A1E3A]/20 transition hover:bg-[#64172F] md:inline-flex"
      >
        Réserver un espace
      </Link>
    )}
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm font-black text-[#0F2A43] shadow-sm transition hover:text-[#0F6C8D]"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="rounded-full bg-[#ECF8FC] px-3 py-1 text-xs text-[#0F6C8D]">{menu.badge}</span>
        {menu.label}
        <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 w-80 pt-4"
          >
            <div className="rounded-[1.7rem] border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-2xl">
              <div className="rounded-2xl bg-[#F7FAFC] p-4">
                <p className="font-black text-[#0F2A43]">
                  {session.role === "user" ? `Bonjour ${displayName.split(" ")[0]}` : displayName}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">{session.email}</p>
              </div>
              <div className="mt-3 grid gap-1">
                {session.role === "partner" && session.validationStatus && (
                  <div className="rounded-xl bg-amber-50 px-4 py-3 text-xs font-black text-amber-700">
                    Compte en attente de validation
                  </div>
                )}
                {menu.links.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-[#ECF8FC] hover:text-[#0F6C8D]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <button
                type="button"
                onClick={logout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FBEFF3] px-4 py-3 text-sm font-black text-[#7A1E3A] transition hover:bg-[#F8D7E1]"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

export default UserRoleMenu;
