import Link from 'next/link'
import SyaLogo from '../header/syaLogo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#1f241b] flex flex-col justify-center items-center pt-16 pb-6 text-[#e7ebe3] border-t border-[#3f4603]/30 mt-20">
      <div className="max-w-[2560px] w-[90%] flex flex-col gap-12">
        {/* Felső rész: Oszlopok */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* 1. Oszlop: Logó és Rólunk */}
          <div className="flex flex-col gap-6">
            <div className="w-fit h-[60px]">
              <SyaLogo activeHeader={true} />
            </div>
            <p
              className="text-sm leading-relaxed opacity-80"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Innovatív megoldások és prémium tanácsadás a jövő kihívásaira. Építsük együtt a
              sikert, stabil alapokon.
            </p>
          </div>

          {/* 2. Oszlop: Navigáció */}
          <div className="flex flex-col gap-4">
            <h4
              className="!text-[25px] text-[#bfa06a] mb-2"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Navigáció
            </h4>
            <ul
              className="flex flex-col gap-3 text-sm font-light"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              <li>
                <Link
                  href="/csapat"
                  className="hover:text-[#bfa06a] hover:pl-2 transition-all duration-300"
                >
                  Csapatunk
                </Link>
              </li>
              <li>
                <Link
                  href="/esettanulmanyok"
                  className="hover:text-[#bfa06a] hover:pl-2 transition-all duration-300"
                >
                  Esettanulmányok
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-[#bfa06a] hover:pl-2 transition-all duration-300"
                >
                  Termékek
                </Link>
              </li>
              <li>
                <Link
                  href="/gyik"
                  className="hover:text-[#bfa06a] hover:pl-2 transition-all duration-300"
                >
                  GY.I.K
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Oszlop: Jogi információk */}
          <div className="flex flex-col gap-4">
            <h4
              className="!text-[25px] text-[#bfa06a] mb-2"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Információk
            </h4>
            <ul
              className="flex flex-col gap-3 text-sm font-light"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              <li>
                <Link
                  href="/adatkezelesi-tajekoztato"
                  className="hover:text-[#bfa06a] hover:pl-2 transition-all duration-300"
                >
                  Adatkezelési Tájékoztató
                </Link>
              </li>
              <li>
                <Link
                  href="/aszf"
                  className="hover:text-[#bfa06a] hover:pl-2 transition-all duration-300"
                >
                  Általános Szerződési Feltételek
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-szabalyzat"
                  className="hover:text-[#bfa06a] hover:pl-2 transition-all duration-300"
                >
                  Süti (Cookie) Szabályzat
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Oszlop: Kapcsolat */}
          <div className="flex flex-col gap-4">
            <h4
              className="!text-[25px] text-[#bfa06a] mb-2"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Kapcsolat
            </h4>
            <ul
              className="flex flex-col gap-3 text-sm font-light"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              <li className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#bfa06a]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:hello@sya-solutions.hu"
                  className="hover:text-[#bfa06a] transition-colors"
                >
                  hello@sya-solutions.hu
                </a>
              </li>
              <li className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#bfa06a]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.974-6.869-6.87l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a href="tel:+36301234567" className="hover:text-[#bfa06a] transition-colors">
                  +36 30 123 4567
                </a>
              </li>
            </ul>

            {/* CTA Gomb a láblécben */}
            <Link
              href="/kapcsolat"
              className="mt-2 w-fit py-[10px] px-[24px] rounded-[5px] bg-[#3f4603] text-[#e7ebe3] font-semibold hover:bg-[#bfa06a] hover:text-[#1f241b] transition-all duration-300"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Konzultáció kérése
            </Link>
          </div>
        </div>

        {/* Alsó rész: Copyright */}
        <div
          className="w-full pt-6 border-t border-[#3f4603]/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60 font-light"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          <p>© {currentYear} S.Y.A Solutions. Minden jog fenntartva.</p>
          <p>
            Fejlesztő: <span className="font-semibold text-[#bfa06a]">Prefer Site</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
