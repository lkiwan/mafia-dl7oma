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

/* Card back — uses the supplied artwork image. */
export function CardBackArt({ className = '' }: { className?: string }) {
  return (
    <img
      src="/img/card-back.png"
      alt="L'Mafia d'L'Houma"
      draggable={false}
      className={`select-none object-cover ${className}`}
    />
  )
}