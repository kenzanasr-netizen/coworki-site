import { Link } from "react-router-dom";
import PartnerMegaMenu from "./PartnerMenu";
import PublicNavMenu from "./PublicNavMenu";
import { getMockSession } from "../data/mockAuth";
import { getNavLinksForRole } from "../data/navigation";

function DesktopNav() {
  const session = getMockSession();
  const navItems = getNavLinksForRole(session?.role);

  return (
    <nav className="hidden max-w-[58vw] items-center gap-4 overflow-x-auto rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 text-xs font-black text-slate-600 shadow-sm xl:flex">
      {navItems.map((item) => (
        item.partnerMenu ? <PartnerMegaMenu key={item.path} /> : <PublicNavMenu key={item.path} {...item} />
      ))}
      {session?.role === "partner" && session.validationStatus && (
        <Link to="/partner/dashboard" className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-[11px] text-amber-700">
          Compte en attente de validation
        </Link>
      )}
    </nav>
  );
}

export default DesktopNav;
