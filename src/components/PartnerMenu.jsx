import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { partnerMenuLinks } from "../data/partnerMenuLinks";

function PartnerMegaMenu() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === "/partenaires" || pathname === "/partners";

  const closeMenu = () => setIsOpen(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={closeMenu}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
    >
      <Link
        to="/partenaires"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 transition hover:text-[#0F6C8D] ${isActive ? "text-[#0F6C8D]" : ""}`}
      >
        Partenaires
        <ChevronDown className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : ""}`} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 w-[780px] -translate-x-1/2 pt-4 text-left"
          >
            <div className="rounded-[2rem] border border-slate-200/70 bg-white/95 p-5 shadow-2xl shadow-slate-300/70 backdrop-blur-2xl">
              <div className="mb-4 rounded-[1.5rem] bg-gradient-to-br from-[#ECF8FC] to-white p-5">
                <p className="text-lg font-black text-[#0F2A43]">Espace partenaires</p>
                <p className="mt-1 text-sm font-bold leading-6 text-slate-600">
                  Développez votre visibilité et vos réservations avec CoWorki.
                </p>
              </div>

              <div className="grid gap-2 md:grid-cols-2">
              {partnerMenuLinks.map((item) => {
                const Icon = item.Icon;
                return (
                <Link
                  key={item.path}
                  to={item.path}
                    onClick={closeMenu}
                    className="group flex gap-3 rounded-2xl p-3 transition hover:bg-[#ECF8FC]"
                  >
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ECF8FC] text-[#0F6C8D] transition group-hover:bg-white group-hover:text-[#7A1E3A]">
                    <Icon className="h-5 w-5" />
                  </span>
                    <span>
                      <span className="block text-sm font-black text-[#0F2A43]">{item.label}</span>
                      <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">{item.description}</span>
                  </span>
                </Link>
                );
              })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-[#F8D7E1] bg-[#FBEFF3] p-5">
                <div>
                  <p className="font-black text-[#0F2A43]">Vous gérez un espace de coworking ?</p>
                  <p className="mt-1 text-sm font-bold text-slate-600">
                    Référencez votre espace sur CoWorki et développez vos réservations.
                  </p>
                </div>
                <Link
                  to="/signup?type=partner"
                  onClick={closeMenu}
                  className="rounded-full bg-[#7A1E3A] px-5 py-3 text-xs font-black text-white shadow-lg shadow-[#7A1E3A]/20 transition hover:bg-[#64172F]"
                >
                  Référencer mon espace
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PartnerMegaMenu;
