"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.replace("#", "");

    const scrollToTarget = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    if (!scrollToTarget()) {
      const timeout = setTimeout(scrollToTarget, 150);
      return () => clearTimeout(timeout);
    }
  }, [pathname]); // Minden útvonalváltáskor automatikusan lefut!

  return null;
}
