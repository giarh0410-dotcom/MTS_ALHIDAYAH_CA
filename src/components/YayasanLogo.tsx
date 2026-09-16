import React from "react";

interface YayasanLogoProps {
  className?: string;
  opacity?: number;
}

export const YayasanLogo: React.FC<YayasanLogoProps> = ({ className = "w-24 h-28", opacity = 0.25 }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ opacity }}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Shield / Crest Outer Border */}
        <path
          d="M100 10 C60 10 20 25 20 25 C20 25 15 110 35 160 C55 210 100 230 100 230 C100 230 145 210 165 160 C185 110 180 25 180 25 C180 25 140 10 100 10 Z"
          fill="#d4edbc"
          stroke="#1e5128"
          strokeWidth="6"
        />

        {/* Split background: Left half greenish yellow, right half softer yellow */}
        <path
          d="M100 16 C63 16 26 29 26 29 C26 29 21 106 39 154 C57 200 100 220 100 220 Z"
          fill="#a8e6cf"
        />
        <path
          d="M100 16 C137 16 174 29 174 29 C174 29 179 106 161 154 C143 200 100 220 100 220 Z"
          fill="#fdfd96"
        />

        {/* Inner Border Outline */}
        <path
          d="M100 20 C65 20 32 32 32 32 C32 32 27 105 44 150 C61 193 100 212 100 212 C100 212 139 193 156 150 C173 105 168 32 168 32 C168 32 135 20 100 20 Z"
          stroke="#1e5128"
          strokeWidth="2"
          strokeDasharray="4 2"
          fill="none"
        />

        {/* Text: Yayasan */}
        <text
          x="100"
          y="42"
          textAnchor="middle"
          fill="#1e5128"
          fontSize="16"
          fontWeight="bold"
          fontFamily="serif"
          letterSpacing="1"
        >
          Yayasan
        </text>

        {/* Left Section: Mosque & Star */}
        {/* Star */}
        <path
          d="M75 62 L78 70 L86 70 L80 75 L82 83 L75 78 L68 83 L70 75 L64 70 L72 70 Z"
          fill="#1e5128"
          transform="scale(0.8) translate(20, 5)"
        />
        {/* Dome & Building */}
        <path
          d="M50 115 C50 95 75 95 75 115 L95 115 L95 145 L45 145 L45 115 Z"
          fill="#1e5128"
        />
        {/* Windows */}
        <rect x="50" y="122" width="8" height="16" rx="4" fill="#fdfd96" />
        <rect x="62" y="122" width="8" height="16" rx="4" fill="#fdfd96" />
        <rect x="74" y="122" width="8" height="16" rx="4" fill="#fdfd96" />

        {/* Right Section: Tower / Minaret & Globe */}
        {/* Minaret */}
        <polygon points="135,50 125,120 145,120" fill="#1e5128" />
        <circle cx="135" cy="46" r="3" fill="#1e5128" />

        {/* Globe */}
        <circle cx="135" cy="150" r="22" fill="none" stroke="#1e5128" strokeWidth="3" />
        <path d="M113 150 H157 M135 128 V172 M120 138 C128 145 142 145 150 138 M120 162 C128 155 142 155 150 162" stroke="#1e5128" strokeWidth="1.5" fill="none" />

        {/* Olive / Plant leaves */}
        <path d="M115 140 C110 130 115 120 125 118" stroke="#1e5128" strokeWidth="2.5" fill="none" />
        <path d="M155 140 C160 130 155 120 145 118" stroke="#1e5128" strokeWidth="2.5" fill="none" />

        {/* Ribbon / Banner */}
        <path d="M110 172 Q135 182 160 172 L155 185 Q135 195 115 185 Z" fill="#1e5128" />

        {/* Text: Al-Hidayah Depok */}
        <text
          x="100"
          y="200"
          textAnchor="middle"
          fill="#1e5128"
          fontSize="14"
          fontWeight="bold"
          fontFamily="serif"
        >
          Al-Hidayah
        </text>
        <text
          x="100"
          y="214"
          textAnchor="middle"
          fill="#1e5128"
          fontSize="13"
          fontWeight="bold"
          fontFamily="serif"
        >
          Depok
        </text>
      </svg>
    </div>
  );
};
