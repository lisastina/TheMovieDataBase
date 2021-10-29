import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Scroll to top of page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
