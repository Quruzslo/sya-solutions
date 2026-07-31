export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 font-sans my-[120px]">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-8 sm:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              Adatkezelési Tájékoztató
            </h1>
            <p className="text-lg text-gray-500">
              a sya-solutions.hu weboldal látogatói és érdeklődői részére
            </p>
          </div>

          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
            {/* 1. Bevezetés */}
            <section>
              <h2 className=" font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                1. Bevezetés
              </h2>
              <p>
                A jelen Adatkezelési Tájékoztató célja, hogy a{" "}
                <span className="font-semibold text-gray-900">
                  sya-solutions.hu
                </span>{" "}
                weboldal látogatói és a kapcsolatfelvételi űrlapot kitöltő
                érdeklődők (a továbbiakban: Érintett) egyértelmű, részletes és
                átlátható tájékoztatást kapjanak személyes adataik kezeléséről,
                az adatkezelés céljáról, jogalapjáról, időtartamáról, valamint
                az Érintetteket megillető jogokról és jogorvoslati
                lehetőségekről az Európai Unió Általános Adatvédelmi Rendelete
                (2016/679/EU, a továbbiakban: GDPR) és az Infotv.
                rendelkezéseivel összhangban.
              </p>

              <div className="mt-4 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-sm text-blue-900 m-0">
                  <strong className="block mb-1">Fontos tájékoztatás:</strong>
                  Felhívjuk az Érintettek figyelmét, hogy az Adatkezelő az OVB
                  Vermögensberatung Kft. független pénzügyi közvetítőjeként jár
                  el. A weboldalon keresztüli kapcsolatfelvétel célja a pénzügyi
                  tanácsadás előkészítése. A tényleges pénzügyi közvetítői
                  tevékenység és az ahhoz kapcsolódó szerződéskötés során a
                  személyes adatok kezelője az OVB Vermögensberatung Kft.,
                  amelynek adatkezelési szabályzata az OVB hivatalos felületein
                  érhető el.
                </p>
              </div>
            </section>

            {/* 2. Az Adatkezelő adatai */}
            <section>
              <h2 className=" font-bold text-gray-900 border-b border-gray-200 pb-2 mt-8 mb-4">
                2. Az Adatkezelő adatai és elérhetőségei
              </h2>
              <p className="mb-3">
                A weboldal üzemeltetése és a weboldalon gyűjtött adatok
                tekintetében az Adatkezelő:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold text-gray-900">
                    Név / Cégnév:
                  </span>{" "}
                  Szőgyényi Zsófia E.V. (továbbiakban: Adatkezelő)
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Székhely:</span>{" "}
                  1181 Budapest 18. ker., Reviczky Gyula utca 59. 3. em. 39.
                  ajtó
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Adószám:</span>{" "}
                  91489788-1-43
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    Nyilvántartási szám:
                  </span>{" "}
                  61254758
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    E-mail cím:
                  </span>{" "}
                  <a
                    href="mailto:szogyenyizsofia10@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    szogyenyizsofia10@gmail.com
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    Telefonszám:
                  </span>{" "}
                  +36 30 369 4251
                </li>
                <li>
                  <span className="font-semibold text-gray-900">Weboldal:</span>{" "}
                  sya-solutions.hu
                </li>
              </ul>
            </section>

            {/* 3. A kezelt adatok köre */}
            <section>
              <h2 className=" font-bold text-gray-900 border-b border-gray-200 pb-2 mt-8 mb-4">
                3. A kezelt adatok köre, célja, jogalapja és az adatkezelés
                időtartama
              </h2>

              <h3 className=" font-semibold text-gray-800 mt-6 mb-3">
                3.1. Kapcsolatfelvételi űrlap
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <span className="font-semibold text-gray-900">
                    Kezelt adatok köre:
                  </span>{" "}
                  Név, Telefonszám, E-mail cím.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    Az adatkezelés célja:
                  </span>{" "}
                  Az Érintett azonosítása, kapcsolatfelvétel, időpontegyeztetés
                  pénzügyi tanácsadás céljából.
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    Az adatkezelés jogalapja:
                  </span>{" "}
                  Az Érintett kifejezett, önkéntes hozzájárulása (GDPR 6. cikk
                  (1) bekezdés a) pont).
                </li>
                <li>
                  <span className="font-semibold text-gray-900">
                    Az adatkezelés időtartama:
                  </span>{" "}
                  A megkeresés elintézését követő 1 évig, vagy hozzájárulás
                  visszavonásáig. (Szerződéskötés esetén az adatok az OVB
                  rendszerébe kerülnek).
                </li>
              </ul>

              <h3 className=" font-semibold text-gray-800 mt-6 mb-3">
                3.2. A weboldal technikai adatai és a Sütik (Cookies)
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    A) Működéshez elengedhetetlen (technikai) sütik:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <span className="font-medium">Cél:</span> A weboldal
                      alapvető funkcióinak biztosítása.
                    </li>
                    <li>
                      <span className="font-medium">Jogalap:</span> Az
                      Adatkezelő jogos érdeke [GDPR 6. cikk (1) bek. f) pont].
                      Nem kötött külön hozzájáruláshoz.
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    B) Statisztikai sütik (Google Analytics) és Harmadik feles
                    szolgáltatások:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <span className="font-medium">Cél:</span> Forgalommérés,
                      analitika és Google Maps megjelenítés.
                    </li>
                    <li>
                      <span className="font-medium">Jogalap:</span> Az Érintett
                      kifejezett hozzájárulása (Sütisávon keresztül).
                    </li>
                    <li>
                      <span className="font-medium">Időtartam:</span> Maximum 14
                      hónap, vagy felhasználói törlésig.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Adatfeldolgozók */}
            <section>
              <h2 className=" font-bold text-gray-900 border-b border-gray-200 pb-2 mt-8 mb-4">
                4. Kik férnek hozzá az adatokhoz? (Adatfeldolgozók)
              </h2>
              <p className="mb-4">
                Az Adatkezelő az alábbi Adatfeldolgozókat veszi igénybe:
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">1. Vercel Inc.</p>
                  <p className="text-sm text-gray-600">
                    Székhely: 440 N Barranca Ave #4133 Covina, CA 91723, USA
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Funkció:</span>{" "}
                    Tárhelyszolgáltatás biztosítása.
                  </p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">
                    2. Google Ireland Limited
                  </p>
                  <p className="text-sm text-gray-600">
                    Székhely: Gordon House, Barrow Street, Dublin 4, Írország
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Funkció:</span> Google
                    Analytics és Google Maps szolgáltatás.
                  </p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">
                    3. OVB Vermögensberatung Kft.
                  </p>
                  <p className="text-sm text-gray-600">
                    Székhely: 1088 Budapest, Rákóczi út 1-3.
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Funkció:</span> Pénzügyi
                    közvetítői tevékenység lebonyolítása.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Érintettek jogai */}
            <section>
              <h2 className=" font-bold text-gray-900 border-b border-gray-200 pb-2 mt-8 mb-4">
                5. Az Érintettek jogai és jogorvoslat
              </h2>
              <p className="mb-4">
                Az Érintett a{" "}
                <a
                  href="mailto:szogyenyizsofia10@gmail.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  szogyenyizsofia10@gmail.com
                </a>{" "}
                e-mail címen keresztül bármikor, díjmentesen kérheti adataihoz
                való hozzáférését, azok helyesbítését, törlését, korlátozását,
                valamint gyakorolhatja adathordozhatósághoz és tiltakozáshoz
                való jogát.
              </p>
              <p className="mb-4">
                Amennyiben úgy ítéli meg, hogy adatkezelésünk nem jogszerű,
                panaszt tehet a hatóságnál:
              </p>
              <div className="bg-gray-100 p-5 rounded-lg text-sm">
                <p className="font-semibold text-gray-900 mb-1">
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
                </p>
                <p>Székhely: 1055 Budapest, Falk Miksa utca 9-11.</p>
                <p>Postacím: 1363 Budapest, Pf.: 9.</p>
                <p>
                  E-mail:{" "}
                  <a
                    href="mailto:ugyfelszolgalat@naih.hu"
                    className="text-blue-600 hover:underline"
                  >
                    ugyfelszolgalat@naih.hu
                  </a>
                </p>
                <p>
                  Weboldal:{" "}
                  <a
                    href="https://www.naih.hu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.naih.hu
                  </a>
                </p>
              </div>
            </section>

            {/* Lábléc dátummal */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 text-right">
              Hatályos: 2026. július 31-től.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
