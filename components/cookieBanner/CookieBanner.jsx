"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CookieBanner() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie.includes("cookie_consent=");

    if (!hasConsent) {
      setShowBanner(true);
    }

    setIsLoaded(true);
  }, []);

  const handleConsent = (status) => {
    const MAX_AGE = 60 * 60 * 24 * 180;
    document.cookie = `cookie_consent=${status}; max-age=${MAX_AGE}; path=/; SameSite=Lax; Secure`;

    setShowBanner(false);
    router.refresh();
  };

  if (!isLoaded) return null;

  return (
    <>
      {!showBanner ? (
        <div
          onClick={() => setShowBanner(true)}
          className="fixed bottom-[10px] left-[10px] h-[45px] bg-feher rounded-full group z-50 cursor-pointer  grid grid-cols-[45px_0fr] hover:grid-cols-[45px_1fr] transition-all duration-300 ease-in-out items-center overflow-hidden"
        >
          {/* 1. Oszlop: A süti ikon */}
          <div className="w-[45px] h-[45px] flex items-center justify-center shrink-0">
            <span className="text-[30px] leading-none">🍪</span>
          </div>

          <div className="overflow-hidden">
            <p className="whitespace-nowrap text-sm text-neutral-800 font-medium pl-1 pr-3">
              Cookie beállítások
            </p>
          </div>
        </div>
      ) : (
        // 2. NAGY BANNER (Ha a showBanner true)
        <div className="fixed bottom-[65px] left-[10px] w-[90%] mx-auto md:max-w-md p-5 bg-zinc-900 text-white rounded-xl shadow-2xl  z-50 animate-in fade-in slide-in-from-bottom-5">
          <h3 className="font-semibold text-lg mb-2">
            Süti (Cookie) Beállítások 🍪
          </h3>
          <p className="text-sm text-zinc-400 mb-4">
            Az oldal működéséhez szükséges sütiken kívül harmadik féltől
            származó szolgáltatásokat (pl. Google Maps térkép) is használunk.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => handleConsent("rejected")}
              className="px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-lg transition"
            >
              Csak a szükségesek
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition"
            >
              Összes elfogadása
            </button>
          </div>
        </div>
      )}
    </>
  );
}
