const faqData = [
  // ==========================================
  // CSALÁD-TÁMOGATÁS (csalad-tamogatas) - 8 db
  // ==========================================
  {
    title:
      "Mennyibe kerül a teljes körű családi pénzügyi elemzés és tanácsadás?",
    category: "csalad-tamogatas",
    description:
      "A teljes elemzési, tervezési és ügyintézési folyamat az Ön számára teljesen díjmentes. Független szakértőként a munkánk díjazását – sikeres szerződéskötés esetén – az adott pénzintézet fedezi, így Önt semmilyen rejtett költség vagy óradíj nem terheli. Számunkra a legnagyobb elismerés az, ha elégedett ügyfélként nyugodt szívvel ajánl minket a környezetének.",
  },
  {
    title:
      "Hogyan választható ki a legjobb gyermekmegtakarítási program az állami támogatások mellett?",
    category: "csalad-tamogatas",
    description:
      "A piacon elérhető tucatnyi megoldás közül a legoptimálisabbat az Ön időtávja és kockázattűrő képessége határozza meg. Az állami konstrukciók (pl. Babakötvény) mellett a modern, eszközalapú privát programok infláció feletti hozamlehetőséget és teljes rugalmasságot biztosítanak. A legfontosabb különbség azonban a beépített szülői díjátvállalási védelem, ami garantálja, hogy a gyermek életkezdési tőkéje egy váratlan családi tragédia esetén is hiánytalanul összegyűljön.",
  },
  {
    title:
      "Hogyan véd meg egy prémium lakásbiztosítás az alulbiztosítottság ellen?",
    category: "csalad-tamogatas",
    description:
      "Ha a biztosítása 3-5 évnél régebbi, az ingatlanpiaci és építőipari alapanyagárak drasztikus növekedése miatt szinte biztosan alulbiztosítottá vált. Egy komolyabb kár esetén a régi szerződés összegei nem fedeznék az újjáépítést. Az újragondolt prémium lakásbiztosítások a megemelt árakhoz igazított limitekkel, All-Risk (minden kockázatra kiterjedő) védelemmel óvják az otthonát, beleértve a napelemeket, hőszivattyúkat és az okoseszközöket is.",
  },
  {
    title:
      "Miért érdemes független szakértővel átnézetni a gépjármű biztosításokat (KGFB és CASCO) évente?",
    category: "csalad-tamogatas",
    description:
      "A biztosítók árazási stratégiája folyamatosan változik, és a hűséges ügyfelek sokszor többet fizetnek, mint az új szerződők. A teljes magyar biztosítási piac éves szintű auditálásával megversenyeztetjük a szereplőket, és a legkedvezőbb kötelező biztosítások mellett olyan családi CASCO csomagokat keresünk, amelyek valódi segítséget (azonnali autómentés, csereautó) nyújtanak a mindennapi logisztika elakadásakor.",
  },
  {
    title:
      "Milyen előnyökkel jár az állami támogatások (CSOK+, Babaváró) bankfüggetlen intézése?",
    category: "csalad-tamogatas",
    description:
      "Bár a támogatások feltételeit jogszabály rögzíti, a bankok bírálati gyakorlata, a kiegészítő piaci hitelek kamatai és a jövedelem-elfogadási szabályai drasztikusan eltérnek. Független tanácsadóként a teljes hazai bankpiacot átvilágítjuk az Ön céljaihoz. Ezzel nemcsak milliókat spórolhat meg a hitelköltségeken, de a teljes folyamatot sorban állás és adminisztrációs stressz nélkül, egyetlen kézben tartva bonyolítjuk le.",
  },
  {
    title:
      "Hogyan működik a családi magánegészségügyi biztosítás, és hogyan kerüli el a várólistákat?",
    category: "csalad-tamogatas",
    description:
      "A családi magánegészségügyi biztosítással fix, kiszámítható havidíj mellett kap teljes hozzáférést a legmodernebb magánklinikákhoz. Egy dedikált orvosi call-center napokon belül megszervezi Önnek vagy gyermekeinek a szakorvosi viziteket, a drága diagnosztikai vizsgálatokat (MRI, CT, ultrahang) vagy az egynapos sebészeti ellátást. Ezzel teljesen kiküszöbölhetők a hónapos állami várólisták és a hálapénz.",
  },
  {
    title:
      "Mikor és hogyan segít a hitelkiváltás és adósságrendezés a családi kasszának?",
    category: "csalad-tamogatas",
    description:
      "Ha a család rendelkezik korábban felvett, magas kamatozású személyi kölcsönnel, áruhitellel vagy régebbi lakáshitellel, a hitelkiváltás azonnali mentőöv. A jelenlegi, kedvezőbb piaci környezetben megversenyeztetjük a bankokat, és a drága hiteleket egyetlen, alacsony kamatozású, tiszta struktúrájú hitelbe vonjuk össze. Ezzel a lépéssel a havi törlesztőrészlet akár 20-30%-kal is csökkenthető, tízezreket hagyva a családi kasszában.",
  },
  {
    title:
      "Miért elengedhetetlen a gyermek baleset- és sportbiztosítás az aktív mindennapokban?",
    category: "csalad-tamogatas",
    description:
      "Az iskolai edzések, nyári táborok és a délutáni játék során a sérülések kockázata magas. Egy váratlan csonttörés vagy sportsérülés esetén a privát rehabilitáció (gyógytorna, gyors diagnosztika) és a szülő kényszerű táppénze komoly anyagi terhet jelent a családnak. A specializált gyermekbiztosítás azonnali, egyösszegű anyagi segítséget nyújt, hogy a fókusz kizárólag a gyors és szakszerű gyógyuláson lehessen.",
  },

  // ============================================================
  // SZEMÉLYES JÖVŐTERVEZÉS (szemelyes-jovotervezes) - 8 db
  // ============================================================
  {
    title:
      "Melyik a legbiztonságosabb és legmagasabb hozamot biztosító nyugdíj-előtakarékossági forma?",
    category: "szemelyes-jovotervezes",
    description:
      "Nincs egyetlen univerzális megoldás, hiszen a NYESZ, az Önkéntes Nyugdíjpénztár és a Nyugdíjbiztosítás teljesen eltérő szabályok szerint működik. Mi nem egyetlen intézet termékét ajánljuk, hanem a teljes piaci palettát összehasonlítva azt a konstrukciót választjuk ki, amely az Ön életkorához, adózási státuszához és egyéni kockázattűrő képességéhez a legmagasabb nettó hozamot és a legnagyobb jogi biztonságot garantálja.",
  },
  {
    title:
      "Hogyan maximalizálható az évi 20%-os állami adójóváírás az öngondoskodással?",
    category: "szemelyes-jovotervezes",
    description:
      "A magyar állam kiemelten támogatja a privát célú öngondoskodást: a nyugdíj- és egészségpénztári befizetések után évi 20%-os, közvetlen adó-visszatérítést vehet igénybe az Ön által befizetett SZJA-ból. Ez az összeg típustól függően évente 130 000 - 150 000 Ft is lehet, a különböző típusú programok intelligens kombinálásával pedig akár az évi 280 000 Ft-os maximális állami támogatást is jóváírathatja a saját számláján.",
  },
  {
    title:
      "Mi történik a privát nyugdíjmegtakarítással, ha az állam időközben felemeli a nyugdíjkorhatárt?",
    category: "szemelyes-jovotervezes",
    description:
      "Ez az egyik legnagyobb érv a privát, biztosítói hátterű nyugdíjprogramok mellett, ugyanis ezek úgynevezett korhatár-garanciával rendelkeznek. Ez a jogi záradék rögzíti, hogy a megtakarítás lejárata a szerződés megkötésének pillanatában érvényes hivatalos korhatárhoz (jelenleg 65 év) van kötve. Ha az állam a jövőben 68 vagy 70 évre emelné a korhatárt, Ön a privát vagyonához akkor is pontban 65 évesen, adómentesen hozzáférhet.",
  },
  {
    title:
      "Hogyan építhet ki biztonságos jövőt egy vállalkozó, ha csak a minimális járulékot fizeti?",
    category: "szemelyes-jovotervezes",
    description:
      "Az átalányadós, katás vagy minimálbérre bejelentett cégvezetők az állami rendszertől drasztikusan alacsony, szinte csak a megélhetési minimumot elérő nyugdíjra számíthatnak. Emiatt a privát, állami rendszerektől teljesen független vagyonépítés nem opció, hanem létszükséglet. Minél korábban indítunk el egy privát jövőtervezési programot, annál kisebb havi tőkével, a kamatos kamat erejét kihasználva biztosítható a megszokott életszínvonal.",
  },
  {
    title:
      "Hogyan védhetők meg a hosszú távú megtakarítások a magas inflációtól és a devizakockázatoktól?",
    category: "szemelyes-jovotervezes",
    description:
      "A titok a professzionális diverzifikációban és a globális eszközkezelésben rejlik. Nem szabad a teljes tőkét egyetlen devizában (pl. csak forintban) vagy hazai eszközben tartani. Olyan nemzetközi hátterű, eurós és dolláros alapokat, valamint globális részvény- és kötvénykosarakat menedzselő programokat biztosítunk, amelyek a nehéz gazdasági ciklusokban is megőrzik és stabilan gyarapítják a vagyon vásárlóerejét.",
  },
  {
    title:
      "Hozzáférhetek-e a személyes megtakarításomhoz a lejárat előtt egy váratlan vészhelyzetben?",
    category: "szemelyes-jovotervezes",
    description:
      "Bár a jövőtervezési programok hosszú távú célokat szolgálnak, az élet forgatókönyve változhat. A piacon elérhetők olyan rendkívül rugalmas, modern konstrukciók, amelyeknél egy átmeneti anyagi nehézség esetén lehetőség van a díjfizetés szüneteltetésére, vagy a tőke egy részének adómentes eseti felvételére anélkül, hogy a teljes szerződést fel kellene számolni.",
  },
  {
    title:
      "Miben nyújt többet egy egyéni prémium egészségbiztosítás a hagyományos ellátórendszernél?",
    category: "szemelyes-jovotervezes",
    description:
      "Egy váratlan egészségügyi probléma esetén az idő a legértékesebb tényező. A prémium egészségbiztosítás garantálja, hogy Ön azonnal, méltó körülmények között, Magyarország vezető magánklinikáin kapjon ellátást. Nem kell diagnózisra vagy műtétekre várnia; a biztosító teljes mértékben finanszírozza a magánorvosi viziteket, laborokat, high-tech képalkotó vizsgálatokat (CT, MRI) és a fekvőbeteg-ellátást is.",
  },
  {
    title:
      "Miért előnyösebb egy független jövőtervezési audit, mint egy konkrét bank saját ajánlata?",
    category: "szemelyes-jovotervezes",
    description:
      "Egy adott bank vagy biztosító értelemszerűen csak a saját, zárt termékpalettáját fogja Önnek értékesíteni, függetlenül attól, hogy az a piacon a legjobb-e. Mi bank- és biztosítófüggetlen szakértőként a teljes hazai és nemzetközi kínálatot átvilágítjuk, objektív szempontok (költségszerkezet, múltbéli hozamok, alapkezelői háttér) alapján versenyeztetjük a partnereket, így kizárólag az Ön valós érdekei érvényesülnek.",
  },

  // ==============================================================
  // VÁLLALKOZÁS-TÁMOGATÁS (vallalkozas-tamogatas) - 8 db
  // ==============================================================
  {
    title:
      "Hogyan biztosítható a cég és a család stabilitása, ha a cégvezető betegség miatt kiesik?",
    category: "vallalkozas-tamogatas",
    description:
      "Cégvezetőként vagy kulcsemberként egy hosszabb kényszerpihenő azonnali bevételkiesést és működési zavarokat okoz a vállalkozásban, miközben a fix céges és családi költségek változatlanul futnak tovább. Egy jól strukturált vállalati egészség- és balesetbiztosítás (kockázati védelem) áthidalja ezt a kritikus időszakot: jelentős egyösszegű térítést vagy napi szintű jövedelempótlást biztosít, garantálva a cég túlélését.",
  },
  {
    title:
      "Mennyi és milyen típusú pénzügyi tartalékot kötelező tartania egy felelős vállalkozásnak?",
    category: "vallalkozas-tamogatas",
    description:
      "Az egészséges cash-flow alapja, hogy a vállalkozás legalább 3-6 havi fix működési költségének megfelelő likvid tartalékkal rendelkezzen. Ezt a tőkét szigorúan tilos magas kockázatú eszközökbe fektetni, de a folyószámlán hagyni is komoly hiba az inflációs veszteségek miatt. Olyan rugalmas, alacsony kockázatú vállalati likviditási alapokat keresünk, amelyek bármikor hozzáférhetők, de folyamatosan termelnek is.",
  },
  {
    title:
      "Mit érdemes kezdeni a cégben felhalmozódott szabad likviditással a reálveszteség elkerülésére?",
    category: "vallalkozas-tamogatas",
    description:
      "A vállalati bankszámlákon tétlenül álló tőke komoly veszteséget termel. A modern, diverzifikált vállalati vagyonkezelési megoldások segítségével a KKV-k számára is elérhetővé válnak azok a professzionális eszközalapok, amelyekkel a cég szabad pénzeszközei biztonságos, ellenőrzött keretek között realizálhatnak infláció feletti hozamot, támogatva a cég jövőbeli növekedését vagy fejlesztéseit.",
  },
  {
    title:
      "Milyen adóoptimalizálási lehetőségeket rejt a vállalati kockázati és megtakarítási programok köre?",
    category: "vallalkozas-tamogatas",
    description:
      "A céges szinten kötött csoportos egészség-, baleset- és életbiztosítások díja bizonyos feltételek mellett elszámolható a cég költségeként, csökkentve a társasági adóalapot, miközben a munkavállalók számára adó- és járulékmentes (vagy rendkívül kedvező adózású) juttatást jelentenek. Ez a fajta modern cafeteria nagyságrendekkel költséghatékonyabb eszköz a motivációra, mint a klasszikus, magas bérterhekkel járó bruttó béremelés.",
  },
  {
    title:
      "Mi az a kulcsember-biztosítás, és hogyan védi meg a vállalkozást egy kritikus munkatárs kiesése esetén?",
    category: "vallalkozas-tamogatas",
    description:
      "Minden cégben vannak pótolhatatlan kulcsemberek (top értékesítő, vezető fejlesztő, alapító partner), akiknek egy esetleges hirtelen kiesése vagy tartós betegsége azonnali árbevétel-csökkenést vagy projektek leállását eredményezi. A vállalat által fizetett kulcsember-biztosítás baj esetén akkora likvid tőkét fizet ki közvetlenül a cégnek, amely teljes mértékben fedezi a helyettesítés, a fejvadászat vagy az átmeneti veszteségek költségeit.",
  },
  {
    title:
      "Hogyan működik az „aranybilincs” (lojalitási) program a kulcsfontosságú munkatársak megtartásában?",
    category: "vallalkozas-tamogatas",
    description:
      "A legjobb szakemberek megtartása a piacon komoly kihívás. A lojalitási program lényege, hogy a cég egy hosszú távú, nagy hozamú megtakarítási alapot finanszíroz a kulcsember számára, azonban a szerződésben jogilag kiköthető, hogy a dolgozó a felhalmozott tőkéhez csak meghatározott idő (pl. 3-5 vagy 10 év) folyamatos munkaviszony után férhet hozzá. Amennyiben korábban távozik, a teljes felhalmozott összeg visszaszáll a cégre.",
  },
  {
    title:
      "Hogyan választható ki a legoptimálisabb vállalati hitel vagy lízing a cash-flow veszélyeztetése nélkül?",
    category: "vallalkozas-tamogatas",
    description:
      "Vállalati finanszírozásnál (eszközbeszerzés, forgóeszköz-hitel, ingatlanvásárlás) nem szabad az első szembejövő banki ajánlatot elfogadni. A kamat mellett kritikus a fedezeti elvárások mértéke, a futamidő és a támogatott konstrukciók (pl. Széchenyi Kártya Program aktuális elemei) elérhetősége. Független tanácsadóként a teljes bankpiacot megversenyeztetjük, hogy a cég cash-flow-jához leginkább passzoló finanszírozást érjük el.",
  },
  {
    title:
      "Miért elengedhetetlen a modern vállalati és vezetői felelősségbiztosítás a cég vagyonának védelmében?",
    category: "vallalkozas-tamogatas",
    description:
      "Egy hibás szakmai döntés, egy nem szándékos mulasztás vagy egy teljesítési hiba olyan mértékű kártérítési kötelezettséget vonhat maga után, ami egy stabil KKV-t is azonnal csődbe vihet. A szakmai és vezető tisztségviselői felelősségbiztosítások (D&O) felfogják ezeket a pénzügyi ütéseket: fedezik a perköltségeket, a jogi védelmet és a megítélt kártérítési összegeket, megóvva a cég és a menedzsment privát vagyonát.",
  },
  //================================================
  // KARRIER FAQ RÉSZ --------------------------
  //================================================

  {
    title: "Nálad is szitokszó az MLM rendszer?",
    category: "karrier",
    description:
      "Teljesen megértjük, ha óvatos vagy! Nálunk nincs kötelező termékvásárlás, és senki nem liheg a nyakadban. A hálózati modellnek kizárólag az előnyeit élvezed: nincs indulótőke vagy kötelező havidíj, cserébe teljes elismerést, szabad időbeosztást és folyamatos karrierlehetőséget kapsz.",
  },
  {
    title:
      "Utálom a hideghívásokat. Nekem is ismeretleneket kell majd hívogatnom?",
    category: "karrier",
    description:
      "Egyáltalán nem! A hideghívást mi is a rettegett kategóriába soroljuk. Kizárólag elégedett ügyfelek ajánlásai alapján dolgozunk, így minden megkeresés egy előre felépített, bizalmi alapú beszélgetés. Sokkal emberibb, gördülékenyebb és eredményesebb így a munka.",
  },
  {
    title: "Rá kell majd erőszakolnom a termékeket az emberekre?",
    category: "karrier",
    description:
      "Távol áll tőlünk a tukmálás. Mivel független közvetítőként dolgozunk, nincsenek 'saját' termékeink. A teljes piacot feltérképezve a legkedvezőbb, személyre szabott ajánlatot adjuk az ügyfél kezébe ('nagyker' áron). A számminták és az összehasonlítások magukért beszélnek, így a jó ajánlat szinte eladja önmagát.",
  },
  {
    title: "Mennyibe kerül az indulás? Vannak rejtett havidíjak?",
    category: "karrier",
    description:
      "Kerek 0 Ft-ba. Nálunk nincs belépési díj, nincsenek kötelező csomagok vagy havidíjak. Te az idődet, az energiádat és a nyitottságodat teszed bele, mi pedig adjuk hozzá az évtizedes, stabil nemzetközi hátteret, az eszközöket és a teljes oktatási rendszert.",
  },
  {
    title: "Nincs pénzügyi tapasztalatom. Így is van esélyem?",
    category: "karrier",
    description:
      "De még mekkora! Nem a szakmai múltat vagy a diplomát keressük, hanem a szoft skilleket: a jó kommunikációt, az elszántságot és az emberséget. A szakmai tudást a legelejétől, lépésről lépésre tanítjuk meg neked, miközben egy tapasztalt mentor kísér végig az úton.",
  },
  {
    title: "Mennyire kiszámítható ez a lehetőség hosszú távon?",
    category: "karrier",
    description:
      "Pénzügyi tudatosságra és jó döntésekre mindig szükség lesz – függetlenül attól, hogy épp merre tart a gazdaság. Egy évtizedek óta bizonyított, sziklaszilárd hátat nyújtó cég égisze alatt építhetsz saját, értékteremtő karriert, ahol a határ valóban a csillagos ég.",
  },
];

export default faqData;
