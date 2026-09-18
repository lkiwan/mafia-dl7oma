import { useId } from 'react'
import type { Role } from '../game/types'

/* Placeholder vector portraits for every role. */

export function RoleArt({ role, className = '' }: { role: Role; className?: string }) {
  const common = { viewBox: '0 0 200 200', className: `drop-shadow-lg ${className}` }
  switch (role) {
    case 'EISSABA':
      return (
        <svg {...common} aria-label="عصابة">
          {/* fedora */}
          <ellipse cx="100" cy="126" rx="72" ry="20" fill="#27272a" />
          <path d="M44 118 Q42 58 100 54 Q158 58 156 118 Z" fill="#18181b" />
          <path d="M58 104 Q62 60 100 56 L100 64 Q70 68 66 104 Z" fill="#3f3f46" />
          <path d="M44 118 Q42 94 48 84 L156 84 Q158 94 156 118 Z" fill="#7f1d1d" />
          <ellipse cx="100" cy="126" rx="72" ry="20" fill="none" stroke="#52525b" strokeWidth="3" />
          {/* pistol silhouettes */}
          <g transform="rotate(-28 70 150)" fill="#d4d4d8">
            <rect x="36" y="132" width="66" height="12" rx="5" />
            <path d="M96 138 l14 -8 6 3 -12 8 z" />
            <rect x="56" y="118" width="12" height="16" rx="3" />
          </g>
          <g transform="rotate(24 132 150)" fill="#d4d4d8">
            <rect x="98" y="132" width="66" height="12" rx="5" />
            <path d="M98 138 l-14 -8 -6 3 12 8 z" />
            <rect x="132" y="118" width="12" height="16" rx="3" />
          </g>
        </svg>
      )
    case 'BOULIS':
      return (
        <svg {...common} aria-label="بوليس">
          <path d="M100 20 L168 46 V106 C168 152 138 178 100 190 C62 178 32 152 32 106 V46 Z" fill="#fbbf24" stroke="#78350f" strokeWidth="6" />
          <path d="M100 36 L152 56 V104 C152 142 128 162 100 172 C72 162 48 142 48 104 V56 Z" fill="#fde68a" />
          <path d="M100 62 L128 74 L120 104 L100 116 L80 104 L72 74 Z" fill="#b45309" />
          <circle cx="100" cy="86" r="11" fill="#ffe4a8" />
          <path d="M100 75 a11 11 0 0 1 11 11 h-6 a5 5 0 0 0 -5 -5 z" fill="#92400e" />
        </svg>
      )
    case 'TBIB':
      return (
        <svg {...common} aria-label="طبيب">
          <rect x="30" y="30" width="140" height="140" rx="22" fill="#065f46" stroke="#a7f3d0" strokeWidth="5" />
          <path d="M83 52 h34 v40 M100 86 L100 150" stroke="#ecfdf5" strokeWidth="26" strokeLinecap="round" />
          <circle cx="100" cy="150" r="12" fill="none" stroke="#ecfdf5" strokeWidth="8" />
          <path d="M52 118 h96" stroke="#34d399" strokeWidth="4" strokeDasharray="10 8" />
        </svg>
      )
    case 'WLAD_LHOUMA':
      return (
        <svg {...common} aria-label="ولاد الحومة">
          {/* Moroccan tea glass */}
          <path d="M64 42 h72 l-10 132 a8 8 0 0 1 -8 7 H82 a8 8 0 0 1 -8 -7 Z" fill="#0ea5e9" stroke="#67e8f9" strokeWidth="5" />
          <path d="M64 80 q-18 10 -16 30 q2 22 20 28" fill="none" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="100" cy="96" rx="24" ry="10" fill="#e0f2fe" />
          <path d="M100 60 q4 -16 -2 -26 q8 4 14 -2 q-2 10 6 18 q-10 -2 -18 10 z" fill="#34d399" />
        </svg>
      )
  }
}

/* Ornate, pattern-heavy card back — a Moroccan khatam star + game name. */
export function CardBackArt({ className = '' }: { className?: string }) {
  const uid = useId().replace(/[:]/g, '')
  const mesh = `mesh-${uid}`
  const vignette = `vig-${uid}`
  return (
    <svg viewBox="0 0 200 200" className={className} aria-label="L'Mafia d'L'Houma">
      <defs>
        <pattern id={mesh} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8H16M8 0V16" stroke="#52525b" strokeWidth="0.75" opacity="0.55" />
        </pattern>
        <radialGradient id={vignette} cx="50%" cy="36%" r="80%">
          <stop offset="0%" stopColor="#33141a" />
          <stop offset="55%" stopColor="#190a10" />
          <stop offset="100%" stopColor="#0a0507" />
        </radialGradient>
      </defs>

      <rect width="200" height="200" fill={`url(#${vignette})`} />
      <rect x="10" y="10" width="180" height="180" rx="14" fill="none" stroke="#b45309" strokeWidth="4" />
      <rect x="16" y="16" width="168" height="168" rx="11" fill="none" stroke="#eab308" strokeWidth="1.5" opacity=".8" />
      <rect x="12" y="12" width="176" height="176" rx="13" fill={`url(#${mesh})`} opacity=".5" />

      {/* corner diamonds */}
      <g fill="#eab308">
        <path d="M26 30 L34 38 L26 46 L18 38 Z" />
        <path d="M174 30 L182 38 L174 46 L166 38 Z" />
        <path d="M26 154 L34 162 L26 170 L18 162 Z" />
        <path d="M174 154 L182 162 L174 170 L166 162 Z" />
      </g>

      {/* khatam star medallion */}
      <g transform="translate(100 108)">
        <circle r="42" fill="none" stroke="#78350f" strokeWidth="2" />
        <rect x="-34" y="-34" width="68" height="68" fill="none" stroke="#b45309" strokeWidth="3.5" />
        <rect x="-34" y="-34" width="68" height="68" fill="none" stroke="#b45309" strokeWidth="3.5" transform="rotate(45)" />
        <path d="M0 -34 L7 -13 L7 13 L0 34 L-7 13 L-7 -13 Z" fill="#eab308" opacity=".9" />
      </g>

      {/* game name */}
      <text
        x="100"
        y="42"
        textAnchor="middle"
        fontFamily="Cairo, sans-serif"
        fontWeight="900"
        fontSize="25"
        fill="#ef4444"
        letterSpacing="2"
      >
        L'MAFIA
      </text>
      <text
        x="100"
        y="62"
        textAnchor="middle"
        fontFamily="Cairo, sans-serif"
        fontWeight="900"
        fontSize="13"
        fill="#eab308"
        letterSpacing="7"
      >
        D'LHOUMA
      </text>
      <text
        x="100"
        y="186"
        textAnchor="middle"
        fontFamily="Cairo, sans-serif"
        fontWeight="700"
        fontSize="9.5"
        fill="#a16207"
        letterSpacing="3"
      >
        PASS &amp; PLAY
      </text>
    </svg>
  )
}