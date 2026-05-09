import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
