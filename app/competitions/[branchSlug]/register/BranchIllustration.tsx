/* SVG illustrations per competition branch — purely decorative */

function CyberIllustration() {
  return (
    <svg viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full">
      {/* Terminal frame */}
      <rect x="12" y="8" width="236" height="144" rx="8" stroke="white" strokeOpacity="0.18" strokeWidth="1.2"/>
      <rect x="12" y="8" width="236" height="30" rx="8" fill="white" fillOpacity="0.07"/>
      <line x1="12" y1="38" x2="248" y2="38" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
      {/* Window dots */}
      <circle cx="28" cy="23" r="4" fill="white" fillOpacity="0.25"/>
      <circle cx="42" cy="23" r="4" fill="white" fillOpacity="0.25"/>
      <circle cx="56" cy="23" r="4" fill="white" fillOpacity="0.25"/>
      {/* Terminal label */}
      <rect x="98" y="16" width="64" height="14" rx="3" fill="white" fillOpacity="0.07"/>
      <rect x="106" y="20" width="48" height="6" rx="1" fill="white" fillOpacity="0.2"/>

      {/* Prompt line */}
      <rect x="24" y="50" width="8" height="9" rx="1" fill="#22c55e" fillOpacity="0.7"/>
      <rect x="36" y="50" width="62" height="9" rx="1" fill="white" fillOpacity="0.55"/>
      <rect x="102" y="50" width="18" height="9" rx="1" fill="white" fillOpacity="0.3"/>
      <rect x="124" y="50" width="72" height="9" rx="1" fill="white" fillOpacity="0.55"/>

      {/* Output line 1 */}
      <rect x="24" y="67" width="12" height="8" rx="1" fill="white" fillOpacity="0.2"/>
      <rect x="40" y="67" width="48" height="8" rx="1" fill="white" fillOpacity="0.15"/>
      <rect x="96" y="67" width="80" height="8" rx="1" fill="white" fillOpacity="0.1"/>

      {/* Output line 2 */}
      <rect x="24" y="83" width="12" height="8" rx="1" fill="#22c55e" fillOpacity="0.55"/>
      <rect x="40" y="83" width="28" height="8" rx="1" fill="white" fillOpacity="0.4"/>
      <rect x="72" y="83" width="20" height="8" rx="1" fill="white" fillOpacity="0.2"/>
      <rect x="96" y="83" width="48" height="8" rx="1" fill="white" fillOpacity="0.35"/>

      {/* Output line 3 */}
      <rect x="24" y="99" width="12" height="8" rx="1" fill="#22c55e" fillOpacity="0.55"/>
      <rect x="40" y="99" width="28" height="8" rx="1" fill="white" fillOpacity="0.4"/>
      <rect x="72" y="99" width="20" height="8" rx="1" fill="white" fillOpacity="0.2"/>
      <rect x="96" y="99" width="60" height="8" rx="1" fill="white" fillOpacity="0.35"/>

      {/* FLAG line */}
      <rect x="24" y="117" width="12" height="9" rx="1" fill="white" fillOpacity="0.2"/>
      <rect x="40" y="117" width="36" height="9" rx="1" fill="#a78bfa" fillOpacity="0.7"/>
      <rect x="80" y="117" width="8" height="9" rx="1" fill="white" fillOpacity="0.2"/>
      <rect x="92" y="117" width="52" height="9" rx="1" fill="#a78bfa" fillOpacity="0.45"/>
      <rect x="148" y="117" width="8" height="9" rx="1" fill="white" fillOpacity="0.2"/>
      {/* Cursor blink */}
      <rect x="160" y="117" width="8" height="9" rx="1" fill="white" fillOpacity="0.8">
        <animate attributeName="opacity" values="0.8;0;0.8" dur="1.1s" repeatCount="indefinite"/>
      </rect>

      {/* Shield overlay — far right, semi-transparent */}
      <path
        d="M222 44 L238 50 L238 80 C238 94 230 103 222 108 C214 103 206 94 206 80 L206 50 Z"
        stroke="white" strokeOpacity="0.12" strokeWidth="1.5" fill="white" fillOpacity="0.04"
      />
      <circle cx="222" cy="77" r="7" stroke="white" strokeOpacity="0.18" strokeWidth="1.5"/>
      <rect x="219" y="77" width="6" height="7" rx="1" stroke="white" strokeOpacity="0.18" strokeWidth="1"/>
    </svg>
  );
}

function WebIllustration() {
  return (
    <svg viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full">
      {/* Browser frame */}
      <rect x="12" y="8" width="236" height="144" rx="8" stroke="white" strokeOpacity="0.18" strokeWidth="1.2"/>
      <rect x="12" y="8" width="236" height="30" rx="8" fill="white" fillOpacity="0.07"/>
      <line x1="12" y1="38" x2="248" y2="38" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
      {/* Window dots */}
      <circle cx="28" cy="23" r="4" fill="white" fillOpacity="0.25"/>
      <circle cx="42" cy="23" r="4" fill="white" fillOpacity="0.25"/>
      <circle cx="56" cy="23" r="4" fill="white" fillOpacity="0.25"/>
      {/* URL bar */}
      <rect x="70" y="14" width="120" height="18" rx="4" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="white" fillOpacity="0.06"/>
      <circle cx="81" cy="23" r="3" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
      <rect x="88" y="20" width="60" height="6" rx="1" fill="white" fillOpacity="0.18"/>

      {/* Split: code left, preview right */}
      <line x1="140" y1="38" x2="140" y2="152" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>

      {/* Code side — left */}
      {/* HTML tag tokens */}
      <rect x="22" y="50" width="14" height="8" rx="1" fill="#f472b6" fillOpacity="0.7"/>
      <rect x="40" y="50" width="28" height="8" rx="1" fill="white" fillOpacity="0.45"/>
      <rect x="72" y="50" width="14" height="8" rx="1" fill="#f472b6" fillOpacity="0.55"/>

      <rect x="28" y="64" width="14" height="8" rx="1" fill="#60a5fa" fillOpacity="0.7"/>
      <rect x="46" y="64" width="48" height="8" rx="1" fill="white" fillOpacity="0.3"/>
      <rect x="98" y="64" width="14" height="8" rx="1" fill="#60a5fa" fillOpacity="0.55"/>

      <rect x="28" y="78" width="14" height="8" rx="1" fill="#34d399" fillOpacity="0.7"/>
      <rect x="46" y="78" width="32" height="8" rx="1" fill="white" fillOpacity="0.25"/>
      <rect x="82" y="78" width="8" height="8" rx="1" fill="white" fillOpacity="0.15"/>

      <rect x="28" y="92" width="50" height="8" rx="1" fill="#fbbf24" fillOpacity="0.6"/>
      <rect x="82" y="92" width="20" height="8" rx="1" fill="white" fillOpacity="0.3"/>

      <rect x="28" y="106" width="14" height="8" rx="1" fill="#60a5fa" fillOpacity="0.7"/>
      <rect x="46" y="106" width="36" height="8" rx="1" fill="white" fillOpacity="0.25"/>
      <rect x="86" y="106" width="14" height="8" rx="1" fill="#60a5fa" fillOpacity="0.55"/>

      <rect x="22" y="120" width="14" height="8" rx="1" fill="#f472b6" fillOpacity="0.7"/>
      <rect x="40" y="120" width="8" height="8" rx="1" fill="white" fillOpacity="0.2"/>

      {/* Cursor */}
      <rect x="34" y="134" width="6" height="8" rx="1" fill="white" fillOpacity="0.7">
        <animate attributeName="opacity" values="0.7;0;0.7" dur="1s" repeatCount="indefinite"/>
      </rect>

      {/* Preview side — right */}
      {/* Navbar strip */}
      <rect x="148" y="46" width="92" height="14" rx="2" fill="white" fillOpacity="0.09"/>
      <rect x="154" y="50" width="20" height="6" rx="1" fill="white" fillOpacity="0.3"/>
      <rect x="210" y="50" width="12" height="6" rx="1" fill="white" fillOpacity="0.2"/>
      <rect x="226" y="50" width="8" height="6" rx="1" fill="white" fillOpacity="0.2"/>

      {/* Hero block */}
      <rect x="148" y="66" width="92" height="30" rx="2" fill="white" fillOpacity="0.06"/>
      <rect x="154" y="72" width="50" height="8" rx="1" fill="white" fillOpacity="0.3"/>
      <rect x="154" y="84" width="36" height="6" rx="1" fill="white" fillOpacity="0.15"/>

      {/* CTA button */}
      <rect x="154" y="104" width="36" height="12" rx="3" fill="white" fillOpacity="0.2"/>
      <rect x="160" y="107" width="24" height="6" rx="1" fill="white" fillOpacity="0.4"/>

      {/* Card grid */}
      <rect x="148" y="122" width="42" height="22" rx="2" fill="white" fillOpacity="0.06"/>
      <rect x="196" y="122" width="44" height="22" rx="2" fill="white" fillOpacity="0.06"/>
    </svg>
  );
}

function IoTIllustration() {
  return (
    <svg viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full">
      {/* Central hub circle */}
      <circle cx="130" cy="80" r="24" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" fill="white" fillOpacity="0.05"/>
      <circle cx="130" cy="80" r="16" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
      {/* Cloud icon in center */}
      <path d="M120 83 Q118 77 124 76 Q125 71 131 71 Q137 71 138 76 Q143 75 143 81 Q143 86 138 86 L122 86 Q118 87 120 83Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" fill="white" fillOpacity="0.1"/>

      {/* Spoke lines */}
      <line x1="130" y1="56" x2="130" y2="28" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="152" y1="63" x2="210" y2="38" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="152" y1="95" x2="210" y2="122" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="130" y1="104" x2="130" y2="132" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="108" y1="95" x2="50" y2="122" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3"/>
      <line x1="108" y1="63" x2="50" y2="38" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3"/>

      {/* Satellite nodes */}
      {/* Top */}
      <circle cx="130" cy="20" r="12" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" fill="white" fillOpacity="0.06"/>
      <path d="M125 17 L135 17 M125 21 L135 21 M128 14 L128 24" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>

      {/* Top-right */}
      <circle cx="218" cy="32" r="12" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" fill="white" fillOpacity="0.06"/>
      <rect x="212" y="27" width="12" height="10" rx="1" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      <rect x="215" y="37" width="6" height="3" rx="0.5" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>

      {/* Bottom-right */}
      <circle cx="218" cy="128" r="12" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" fill="white" fillOpacity="0.06"/>
      <rect x="212" y="122" width="12" height="12" rx="2" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      <circle cx="218" cy="128" r="3" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>

      {/* Bottom */}
      <circle cx="130" cy="140" r="12" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" fill="white" fillOpacity="0.06"/>
      <path d="M126 136 L134 136 M126 140 L134 140 M126 144 L134 144" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>

      {/* Bottom-left */}
      <circle cx="42" cy="128" r="12" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" fill="white" fillOpacity="0.06"/>
      <circle cx="42" cy="126" r="4" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      <line x1="42" y1="130" x2="42" y2="136" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>
      <line x1="38" y1="136" x2="46" y2="136" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>

      {/* Top-left */}
      <circle cx="42" cy="32" r="12" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" fill="white" fillOpacity="0.06"/>
      <rect x="37" y="27" width="10" height="8" rx="1" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      <path d="M38 36 L36 40 L48 40 L46 36" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>

      {/* Signal rings from center */}
      <circle cx="130" cy="80" r="36" stroke="white" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="2 4"/>
      <circle cx="130" cy="80" r="48" stroke="white" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="2 6"/>

      {/* Moving dot on spoke */}
      <circle cx="130" cy="44" r="2.5" fill="white" fillOpacity="0.6">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,-8; 0,0" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="180" cy="61" r="2.5" fill="white" fillOpacity="0.6">
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 4,-3; 0,0" dur="2.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.4s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

function SumoBotIllustration() {
  return (
    <svg viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full">
      {/* Arena outer ring */}
      <circle cx="130" cy="82" r="68" stroke="white" strokeOpacity="0.12" strokeWidth="1.5"/>
      {/* Arena inner ring */}
      <circle cx="130" cy="82" r="56" stroke="white" strokeOpacity="0.18" strokeWidth="1"/>
      {/* Center divider line */}
      <line x1="130" y1="26" x2="130" y2="138" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>

      {/* Left robot */}
      {/* Body */}
      <rect x="64" y="66" width="34" height="32" rx="4" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" fill="white" fillOpacity="0.06"/>
      {/* Head */}
      <rect x="70" y="54" width="22" height="16" rx="3" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" fill="white" fillOpacity="0.05"/>
      {/* Eyes */}
      <circle cx="77" cy="62" r="3.5" fill="white" fillOpacity="0.5"/>
      <circle cx="85" cy="62" r="3.5" fill="white" fillOpacity="0.5"/>
      <circle cx="78" cy="62" r="1.5" fill="white" fillOpacity="0.9"/>
      <circle cx="86" cy="62" r="1.5" fill="white" fillOpacity="0.9"/>
      {/* Wheels */}
      <circle cx="70" cy="100" r="5" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
      <circle cx="92" cy="100" r="5" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
      {/* Scoop/blade facing right */}
      <path d="M98 76 L108 70 L108 98 L98 92 Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" fill="white" fillOpacity="0.08"/>
      {/* Antenna */}
      <line x1="81" y1="54" x2="81" y2="44" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>
      <circle cx="81" cy="43" r="2" fill="white" fillOpacity="0.4">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite"/>
      </circle>

      {/* Right robot — mirrored, facing left */}
      {/* Body */}
      <rect x="162" y="66" width="34" height="32" rx="4" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" fill="white" fillOpacity="0.06"/>
      {/* Head */}
      <rect x="168" y="54" width="22" height="16" rx="3" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" fill="white" fillOpacity="0.05"/>
      {/* Eyes */}
      <circle cx="175" cy="62" r="3.5" fill="white" fillOpacity="0.5"/>
      <circle cx="183" cy="62" r="3.5" fill="white" fillOpacity="0.5"/>
      <circle cx="176" cy="62" r="1.5" fill="white" fillOpacity="0.9"/>
      <circle cx="184" cy="62" r="1.5" fill="white" fillOpacity="0.9"/>
      {/* Wheels */}
      <circle cx="168" cy="100" r="5" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
      <circle cx="190" cy="100" r="5" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
      {/* Scoop/blade facing left */}
      <path d="M162 76 L152 70 L152 98 L162 92 Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" fill="white" fillOpacity="0.08"/>
      {/* Antenna */}
      <line x1="179" y1="54" x2="179" y2="44" stroke="white" strokeOpacity="0.35" strokeWidth="1"/>
      <circle cx="179" cy="43" r="2" fill="white" fillOpacity="0.4">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" repeatCount="indefinite"/>
      </circle>

      {/* VS badge center */}
      <circle cx="130" cy="82" r="13" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
      {/* VS text as rectangles */}
      <rect x="121" y="78" width="7" height="3" rx="0.5" fill="white" fillOpacity="0.5"/>
      <rect x="121" y="83" width="7" height="3" rx="0.5" fill="white" fillOpacity="0.35"/>
      <rect x="132" y="77" width="7" height="8" rx="0.5" fill="white" fillOpacity="0.5"/>

      {/* Gear decoration — top */}
      <circle cx="130" cy="14" r="8" stroke="white" strokeOpacity="0.15" strokeWidth="1.2"/>
      <circle cx="130" cy="14" r="4" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 130 + Math.cos(rad) * 8;
        const y1 = 14 + Math.sin(rad) * 8;
        const x2 = 130 + Math.cos(rad) * 11;
        const y2 = 14 + Math.sin(rad) * 11;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeOpacity="0.2" strokeWidth="2"/>;
      })}

      {/* Score ticks */}
      <rect x="20" y="78" width="16" height="8" rx="2" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
      <rect x="224" y="78" width="16" height="8" rx="2" stroke="white" strokeOpacity="0.15" strokeWidth="1"/>
    </svg>
  );
}

export default function BranchIllustration({ slug }: { slug: string }) {
  const map: Record<string, React.ReactNode> = {
    "cyber-security":     <CyberIllustration />,
    "web-programming":    <WebIllustration />,
    "internet-of-things": <IoTIllustration />,
    "sumo-bot-rc-1kg":    <SumoBotIllustration />,
  };

  const art = map[slug];
  if (!art) return null;

  return (
    <div className="mt-8 rounded-xl border border-white/10 overflow-hidden bg-white/[0.03]">
      {art}
    </div>
  );
}
