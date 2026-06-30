export default function SyaLogo({ activeHeader }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 120"
      className={`w-full max-w-md h-full`}
    >
      {/* Prémium törtfehér háttér */}
      <rect width="400" height="120" rx="12" fill="#e7ebe300" />

      {/* Logó Ikon Csoport */}
      <g transform="translate(35, 25)">
        {/* Növekedést szimbolizáló, modern oszlopok */}
        {activeHeader ? (
          <>
            {' '}
            <rect x="0" y="40" width="14" height="30" rx="4" fill="#f3f3f3" opacity="0.5" />
            <rect x="22" y="20" width="14" height="50" rx="4" fill="#f3f3f3" opacity="0.75" />
            <rect x="44" y="0" width="14" height="70" rx="4" fill="#f3f3f3" />{' '}
            {/* Dinamikus, 'S' betűt formázó trendvonal/nyíl, ami átmetszi az oszlopokat */}
            <path
              d="M -5 60 C 15 60, 20 15, 60 15"
              fill="none"
              stroke="#c2ca7f"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 45 15 L 60 15 L 60 30"
              fill="none"
              stroke="#c2ca7f"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            {' '}
            <rect x="0" y="40" width="14" height="30" rx="4" fill="#3f4603" opacity="0.5" />
            <rect x="22" y="20" width="14" height="50" rx="4" fill="#3f4603" opacity="0.75" />
            <rect x="44" y="0" width="14" height="70" rx="4" fill="#3f4603" />{' '}
            {/* Dinamikus, 'S' betűt formázó trendvonal/nyíl, ami átmetszi az oszlopokat */}
            <path
              d="M -5 60 C 15 60, 20 15, 60 15"
              fill="none"
              stroke="#e7ebe3"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 45 15 L 60 15 L 60 30"
              fill="none"
              stroke="#e7ebe3"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </g>

      {/* Tipográfia Csoport */}

      {activeHeader ? (
        <>
          {' '}
          <text
            x="120"
            y="62"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            fontWeight="800"
            fontSize="40"
            fill="#f3f3f3"
            letterSpacing="2"
          >
            S.Y.A
          </text>
          <text
            x="125"
            y="88"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            fontWeight="600"
            fontSize="13"
            fill="#f3f3f3"
            letterSpacing="8"
          >
            SOLUTIONS
          </text>
        </>
      ) : (
        <>
          {' '}
          <text
            x="120"
            y="62"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            fontWeight="800"
            fontSize="40"
            fill="#3f4603"
            letterSpacing="2"
          >
            S.Y.A
          </text>
          <text
            x="125"
            y="88"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            fontWeight="600"
            fontSize="13"
            fill="#3f4603"
            letterSpacing="8"
          >
            SOLUTIONS
          </text>
        </>
      )}
    </svg>
  )
}
