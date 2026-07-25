"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TbCookieManFilled } from "react-icons/tb";

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
          className="fixed bottom-[10px] left-[10px] h-[45px] bg-transparent hover:bg-feher rounded-full group z-50 cursor-pointer  grid grid-cols-[45px_0fr] hover:grid-cols-[45px_1fr] transition-all duration-300 ease-in-out items-center overflow-hidden"
        >
          {/* 1. Oszlop: A süti ikon */}
          <div className="w-[45px] h-[45px] flex items-center justify-center shrink-0">
            <TbCookieManFilled size={45} className="text-zold/50" />
          </div>

          <div className="overflow-hidden">
            <p className="whitespace-nowrap text-sm text-neutral-800 font-medium pl-1 pr-3">
              Cookie beállítások
            </p>
          </div>
        </div>
      ) : (
        // 2. NAGY BANNER (Ha a showBanner true)
        <div className="fixed bottom-[10px] left-[10px] right-[10px] md:right-[100%] w-[95%] mx-auto md:max-w-md p-5 bg-zinc-900 text-white rounded-xl shadow-2xl  z-50 animate-in fade-in slide-in-from-bottom-5">
          <h3 className="font-semibold !text-[20px] mb-2 flex flex-row nowrap items-center gap-3">
            Süti (Cookie) beállítások <TbCookieManFilled size={20} />
          </h3>
          <p className="text-sm text-zinc-400 mb-4">
            Az oldal működéséhez szükséges sütiken kívül harmadik féltől
            származó szolgáltatásokat (pl. Google Maps térkép) is használunk.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => handleConsent("rejected")}
              className="px-4 py-2 !text-[12px] text-zinc-300 hover:bg-zinc-800 rounded-lg transition"
            >
              Csak a szükségesek
            </button>
            <button
              onClick={() => handleConsent("accepted")}
              className="px-4 py-2 !text-[12px] bg-zold hover:bg-feher text-white hover:text-text-alap font-medium rounded-lg transition"
            >
              Összes elfogadása
            </button>
          </div>
        </div>
      )}
    </>
  );
}
