import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", path: "/" },
    { label: "Espaces", path: "/spaces" },
    { label: "Events", path: "/events" },
    { label: "Offres", path: "/offres" },
    { label: "Partenaires", path: "/partenaires" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* BURGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center p-2"
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
            className="absolute top-full left-0 right-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-lg z-40 lg:hidden"
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
              <div className="border-t border-slate-200 pt-4 mt-4 space-y-3">
                <Link
                  to="/connexion"
                  onClick={closeMenu}
                  className="block py-3 px-4 text-sm font-black text-[#0F2A43] rounded-lg hover:bg-[#ECF8FC] transition"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  onClick={closeMenu}
                  className="block w-full py-3 px-4 text-sm font-black text-white bg-[#7A1E3A] rounded-lg text-center hover:bg-[#64172F] transition"
                >
                  Inscription
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileNav;
