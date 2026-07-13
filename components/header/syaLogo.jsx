export default function SyaLogo({ activeHeader }) {
  const fillColor = activeHeader ? "#f3f3f3" : "#3f4603";
  const strokeColor = activeHeader ? "#c2ca7f" : "#e7ebe3";

  const transitionStyle = {
    transition: "all 500ms ease-in-out",

    transitionDelay: activeHeader ? "0ms" : "600ms",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 120"
      className="w-full max-w-md h-full"
    >
      <rect width="400" height="120" rx="12" fill="transparent" />

      {/* Logó Ikon Csoport */}
      <g transform="translate(35, 25)">
        <rect
          x="0"
          y="40"
          width="14"
          height="30"
          rx="4"
          fill={fillColor}
          opacity="0.5"
          style={transitionStyle}
        />
        <rect
          x="22"
          y="20"
          width="14"
          height="50"
          rx="4"
          fill={fillColor}
          opacity="0.75"
          style={transitionStyle}
        />
        <rect
          x="44"
          y="0"
          width="14"
          height="70"
          rx="4"
          fill={fillColor}
          style={transitionStyle}
        />

        {/* 'S' trendvonalak */}
        <path
          d="M -5 60 C 15 60, 20 15, 60 15"
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          style={transitionStyle}
        />
        <path
          d="M 45 15 L 60 15 L 60 30"
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={transitionStyle}
        />
      </g>

      {/* Tipográfia szövegek */}
      <text
        x="120"
        y="62"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          ...transitionStyle,
        }}
        fontWeight="800"
        fontSize="40"
        fill={fillColor}
        letterSpacing="2"
      >
        S.Y.A
      </text>
      <text
        x="125"
        y="88"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          ...transitionStyle,
        }}
        fontWeight="600"
        fontSize="13"
        fill={fillColor}
        letterSpacing="8"
      >
        SOLUTIONS
      </text>
    </svg>
  );
}
