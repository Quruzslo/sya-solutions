// components/MapSection.tsx
"use client";

import { useRouter } from "next/navigation";

export default function GoogleMaps({ isCookieAccepted }) {
  const router = useRouter();

  const handleAcceptCookies = () => {
    // Beállítjuk a sütit 180 napra
    const MAX_AGE = 60 * 60 * 24 * 180;
    document.cookie = `cookie_consent=accepted; max-age=${MAX_AGE}; path=/; SameSite=Lax; Secure`;
    router.refresh();
  };

  return (
    <div className="w-full mt-[50px] rounded-xl shadow-xl overflow-hidden">
      {isCookieAccepted ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.2613991511735!2d19.030972512400925!3d47.48482087105866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc338432bfe7%3A0xacec37d0cfb14949!2sBudapest%2C%20Gombocz%20Zolt%C3%A1n%20u.%208b%2C%201118!5e0!3m2!1shu!2shu!4v1784216553786!5m2!1shu!2shu"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full rounded-xl"
        />
      ) : (
        <div className="w-full h-[450px] bg-neutral-200 rounded-xl flex flex-col items-center justify-center p-6 text-center gap-4">
          <p className="font-semibold text-neutral-800">
            A térkép megtekintéséhez, kérlek fogadd el a sütiket!
          </p>
          <button
            onClick={handleAcceptCookies}
            className="cursor-pointer px-5 py-2.5 bg-zold text-white font-medium text-sm rounded-full shadow-md hover:opacity-90 transition-opacity"
          >
            Sütik elfogadása
          </button>
        </div>
      )}
    </div>
  );
}
