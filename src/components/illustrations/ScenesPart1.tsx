import React from 'react';

export function renderScenePart1(questionId: number): React.ReactNode {
  switch (questionId) {
    // Q01: Via local sem sinalização de velocidade (bairro residencial)
    case 1:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Via local residencial tranquila sem placa de velocidade">
          <defs>
            <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>
          <rect width="480" height="240" fill="url(#sky1)" />
          <ellipse cx="220" cy="48" rx="34" ry="12" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="250" cy="44" rx="22" ry="9" fill="#FFFFFF" opacity="0.9" />
          {/* Background hills */}
          <path d="M0 142 Q120 112 240 132 T480 126 V240 H0 Z" fill="#BBF7D0" />
          {/* Road perspective */}
          <polygon points="186,132 294,132 420,240 60,240" fill="#64748B" />
          <polygon points="172,132 186,132 60,240 0,240" fill="#E2E8F0" />
          <polygon points="294,132 308,132 480,240 420,240" fill="#E2E8F0" />
          <line x1="186" y1="132" x2="60" y2="240" stroke="#94A3B8" strokeWidth="3" />
          <line x1="294" y1="132" x2="420" y2="240" stroke="#94A3B8" strokeWidth="3" />
          {/* Left house */}
          <polygon points="12,110 126,110 140,86 24,86" fill="#EA580C" stroke="#1E293B" strokeWidth="2" />
          <rect x="18" y="110" width="104" height="92" fill="#FDE047" stroke="#1E293B" strokeWidth="2" />
          <rect x="34" y="132" width="28" height="68" fill="#1D4ED8" stroke="#1E293B" strokeWidth="2" />
          <rect x="76" y="136" width="32" height="28" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          {/* Mid house */}
          <rect x="128" y="118" width="54" height="58" fill="#FFF7ED" stroke="#1E293B" strokeWidth="1.5" />
          <polygon points="124,118 186,118 178,104 132,104" fill="#FB923C" stroke="#1E293B" strokeWidth="1.5" />
          {/* Right house */}
          <rect x="396" y="102" width="84" height="106" fill="#FCA5A5" stroke="#1E293B" strokeWidth="2" />
          <rect x="424" y="128" width="34" height="36" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2" />
          {/* Lush street tree on right */}
          <rect x="366" y="120" width="18" height="86" fill="#78350F" />
          <circle cx="352" cy="88" r="36" fill="#16A34A" />
          <circle cx="394" cy="84" r="40" fill="#15803D" />
          <circle cx="372" cy="64" r="32" fill="#22C55E" />
          {/* Street light pole without speed sign */}
          <line x1="168" y1="68" x2="168" y2="162" stroke="#475569" strokeWidth="4" />
          <path d="M168 74 Q192 66 206 72" fill="none" stroke="#475569" strokeWidth="3" />
          {/* Parked silver hatchback */}
          <g transform="translate(278,150)">
            <rect x="8" y="20" width="70" height="28" rx="8" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
            <path d="M16 20 L24 6 H62 L70 20 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
            <rect x="25" y="10" width="36" height="10" rx="2" fill="#93C5FD" />
            <rect x="12" y="28" width="12" height="7" rx="2" fill="#EF4444" />
            <rect x="62" y="28" width="12" height="7" rx="2" fill="#EF4444" />
            <rect x="14" y="46" width="12" height="10" rx="3" fill="#1E293B" />
            <rect x="60" y="46" width="12" height="10" rx="3" fill="#1E293B" />
          </g>
          {/* Subtle "sem placa" tag */}
          <rect x="18" y="18" width="144" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.92" stroke="#CBD5E1" />
          <text x="90" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Via local · Sem placa</text>
        </svg>
      );

    // Q02: Via arterial movimentada sem sinalização
    case 2:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Via arterial larga com ônibus, carros e moto">
          <rect width="480" height="240" fill="#DBEAFE" />
          {/* Skyline */}
          <rect x="330" y="34" width="52" height="114" fill="#93C5FD" stroke="#334155" strokeWidth="1.5" />
          <rect x="388" y="16" width="66" height="132" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
          <rect x="260" y="72" width="44" height="76" fill="#BFDBFE" stroke="#334155" strokeWidth="1.5" />
          <rect x="92" y="68" width="40" height="80" fill="#BFDBFE" stroke="#334155" strokeWidth="1.5" />
          {/* Trees along left median */}
          <circle cx="48" cy="112" r="34" fill="#16A34A" />
          <circle cx="90" cy="122" r="24" fill="#22C55E" />
          {/* Multi-lane Arterial Road */}
          <polygon points="150,140 330,140 475,240 5,240" fill="#475569" />
          <line x1="195" y1="140" x2="122" y2="240" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 10" />
          <line x1="240" y1="140" x2="240" y2="240" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 10" />
          <line x1="285" y1="140" x2="358" y2="240" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 10" />
          {/* Bus right lane */}
          <g transform="translate(274,110)">
            <rect width="58" height="48" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <rect x="6" y="8" width="46" height="18" rx="3" fill="#60A5FA" />
            <rect x="6" y="34" width="10" height="6" rx="2" fill="#EF4444" />
            <rect x="42" y="34" width="10" height="6" rx="2" fill="#EF4444" />
            <rect x="0" y="28" width="58" height="4" fill="#1D4ED8" />
          </g>
          {/* Center white car */}
          <g transform="translate(194,162)">
            <rect x="6" y="18" width="80" height="32" rx="9" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" />
            <path d="M16 18 L26 4 H66 L76 18 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
            <rect x="26" y="8" width="40" height="10" rx="2" fill="#64748B" />
            <rect x="10" y="26" width="14" height="8" rx="2" fill="#EF4444" />
            <rect x="68" y="26" width="14" height="8" rx="2" fill="#EF4444" />
            <rect x="14" y="48" width="14" height="10" rx="3" fill="#0F172A" />
            <rect x="64" y="48" width="14" height="10" rx="3" fill="#0F172A" />
          </g>
          {/* Blue car right */}
          <g transform="translate(324,164)">
            <rect x="6" y="16" width="70" height="28" rx="8" fill="#1D4ED8" stroke="#0F172A" strokeWidth="2" />
            <path d="M16 16 L24 4 H58 L66 16 Z" fill="#3B82F6" stroke="#0F172A" strokeWidth="2" />
            <rect x="10" y="23" width="12" height="6" rx="2" fill="#FCA5A5" />
            <rect x="60" y="23" width="12" height="6" rx="2" fill="#FCA5A5" />
          </g>
          {/* Motorcycle left */}
          <g transform="translate(116,158)">
            <circle cx="18" cy="14" r="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <rect x="8" y="23" width="20" height="22" rx="6" fill="#334155" />
            <rect x="14" y="42" width="8" height="18" rx="3" fill="#0F172A" />
          </g>
          <rect x="16" y="16" width="152" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.92" stroke="#CBD5E1" />
          <text x="92" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Via arterial · Sem placa</text>
        </svg>
      );

    // Q03: Cruzamento sem sinalização
    case 3:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Cruzamento de ruas comuns sem sinalização com dois carros">
          <rect width="480" height="240" fill="#DCFCE7" />
          {/* Roads */}
          <rect x="176" y="0" width="128" height="240" fill="#64748B" />
          <rect x="0" y="72" width="480" height="96" fill="#64748B" />
          {/* Sidewalk curbs */}
          <path d="M0 72 H164 Q176 72 176 60 V0" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <path d="M480 72 H316 Q304 72 304 60 V0" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <path d="M0 168 H164 Q176 168 176 180 V240" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <path d="M480 168 H316 Q304 168 304 180 V240" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          {/* Center dashed lines */}
          <line x1="240" y1="8" x2="240" y2="62" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="10 8" />
          <line x1="240" y1="178" x2="240" y2="232" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="10 8" />
          <line x1="12" y1="120" x2="162" y2="120" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="10 8" />
          <line x1="318" y1="120" x2="468" y2="120" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="10 8" />
          {/* Houses / bushes corners */}
          <rect x="18" y="14" width="76" height="40" rx="4" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
          <rect x="378" y="14" width="84" height="40" rx="4" fill="#FED7AA" stroke="#78350F" strokeWidth="2" />
          <circle cx="116" cy="204" r="22" fill="#16A34A" />
          <circle cx="380" cy="204" r="24" fill="#22C55E" />
          {/* Red car heading UP */}
          <g transform="translate(248,162)">
            <rect width="38" height="62" rx="10" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
            <rect x="6" y="12" width="26" height="14" rx="4" fill="#BAE6FD" />
            <rect x="6" y="42" width="26" height="10" rx="3" fill="#FCA5A5" />
          </g>
          {/* Blue car coming from RIGHT */}
          <g transform="translate(332,80)">
            <rect width="64" height="36" rx="10" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
            <rect x="14" y="6" width="16" height="24" rx="4" fill="#BAE6FD" />
            <rect x="44" y="6" width="10" height="24" rx="3" fill="#93C5FD" />
          </g>
          {/* Directional arrows */}
          <path d="M324 98 H282" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
          <polygon points="282,91 268,98 282,105" fill="#FACC15" />
          <path d="M267 156 V126" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 5" />
          <rect x="14" y="188" width="128" height="34" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="78" y="209" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Sem placa · Direita</text>
        </svg>
      );

    // Q04: Limite de PBT categoria B (carro + balança 3.500 kg)
    case 4:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Veículo categoria B sobre plataforma de pesagem de PBT">
          <rect width="480" height="240" fill="#F1F5F9" />
          {/* Warehouse backdrop */}
          <rect x="230" y="28" width="224" height="146" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <rect x="276" y="54" width="150" height="94" fill="#334155" />
          {/* Cargo boxes */}
          <rect x="304" y="96" width="44" height="44" fill="#D97706" stroke="#78350F" strokeWidth="2" />
          <rect x="352" y="104" width="38" height="36" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          <rect x="322" y="62" width="40" height="34" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
          {/* Ground */}
          <rect x="0" y="174" width="480" height="66" fill="#CBD5E1" />
          {/* Scale platform */}
          <rect x="44" y="178" width="212" height="16" rx="4" fill="#1D4ED8" />
          <rect x="108" y="196" width="84" height="32" rx="6" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2.5" />
          <text x="150" y="216" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1D4ED8">PBT (kg)</text>
          {/* Hatchback car on scale */}
          <g transform="translate(56,104)">
            <path d="M18 42 L42 12 H126 L158 40 L176 46 V68 H10 V48 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M48 18 H84 V38 H28 Z" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
            <path d="M90 18 H122 L144 38 H90 Z" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="48" cy="68" r="16" fill="#1E293B" />
            <circle cx="48" cy="68" r="7" fill="#CBD5E1" />
            <circle cx="144" cy="68" r="16" fill="#1E293B" />
            <circle cx="144" cy="68" r="7" fill="#CBD5E1" />
          </g>
          {/* CNH Cat B badge */}
          <rect x="24" y="22" width="132" height="52" rx="10" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" />
          <text x="90" y="44" textAnchor="middle" fontSize="12" fontWeight="800" fill="#15803D">CNH · CAT. B</text>
          <text x="90" y="61" textAnchor="middle" fontSize="11" fontWeight="600" fill="#166534">Veículo + Carga</text>
        </svg>
      );

    // Q05: Lotação máxima categoria B (interior do veículo com assentos)
    case 5:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Interior de veículo com bancos de passageiros e motorista">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* Vehicle cutaway shell */}
          <path d="M36 220 L74 44 Q86 24 120 24 H390 Q426 24 444 74 L462 220 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="3" />
          {/* Windows */}
          <path d="M96 42 H222 V120 H76 Z" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <path d="M242 42 H396 L416 120 H242 Z" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          {/* Cabin interior */}
          <rect x="64" y="120" width="374" height="96" fill="#F1F5F9" />
          {/* Steering wheel */}
          <ellipse cx="102" cy="128" rx="10" ry="24" fill="none" stroke="#0F172A" strokeWidth="5" />
          {/* Driver seat (highlighted separately) */}
          <rect x="134" y="102" width="44" height="84" rx="10" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
          <rect x="142" y="76" width="28" height="24" rx="6" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          {/* Passenger seats */}
          {[220, 282, 344].map((x, idx) => (
            <g key={idx} transform={`translate(${x},100)`}>
              <rect width="48" height="86" rx="10" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
              <rect x="10" y="-24" width="28" height="22" rx="6" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
              <line x1="8" y1="8" x2="38" y2="74" stroke="#334155" strokeWidth="4" />
              <rect x="34" y="68" width="10" height="10" rx="2" fill="#EF4444" />
            </g>
          ))}
          <rect x="116" y="190" width="96" height="24" rx="6" fill="#FEF3C7" stroke="#B45309" />
          <text x="164" y="206" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E">Motorista (fora)</text>
          <rect x="230" y="190" width="176" height="24" rx="6" fill="#DCFCE7" stroke="#15803D" />
          <text x="318" y="206" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803D">Assentos de passageiros</text>
        </svg>
      );

    // Q06: Conversão à direita com ciclista
    case 6:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Motorista fazendo conversão à direita enquanto ciclista segue na pista">
          <rect width="480" height="240" fill="#DBEAFE" />
          {/* Buildings & trees */}
          <rect x="14" y="34" width="110" height="104" fill="#E2E8F0" stroke="#64748B" />
          <circle cx="144" cy="96" r="28" fill="#22C55E" />
          <circle cx="384" cy="86" r="34" fill="#16A34A" />
          {/* Road & bike lane */}
          <polygon points="150,126 340,126 470,240 20,240" fill="#64748B" />
          <polygon points="310,126 350,126 470,240 400,240" fill="#DC2626" opacity="0.72" />
          {/* Right turn white arrow */}
          <path d="M220 198 V164 Q220 150 238 150 H282" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <polygon points="278,138 300,150 278,162" fill="#FFFFFF" />
          {/* Cyclist on right */}
          <g transform="translate(332,90)">
            <circle cx="24" cy="14" r="10" fill="#1D4ED8" stroke="#0F172A" strokeWidth="2" />
            <rect x="14" y="25" width="20" height="26" rx="6" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
            <rect x="18" y="52" width="12" height="36" rx="4" fill="#0F172A" />
            <line x1="6" y1="34" x2="42" y2="34" stroke="#0F172A" strokeWidth="3" />
          </g>
          {/* Dashboard & steering wheel POV */}
          <path d="M0 194 Q240 164 480 194 V240 H0 Z" fill="#334155" />
          <circle cx="164" cy="222" r="54" fill="none" stroke="#0F172A" strokeWidth="14" />
          {/* Hands on wheel */}
          <ellipse cx="116" cy="206" rx="14" ry="11" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2" />
          <ellipse cx="212" cy="206" rx="14" ry="11" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2" />
          {/* Blinking right turn signal indicator */}
          <polygon points="282,208 298,218 282,228" fill="#FACC15" />
        </svg>
      );

    // Q07: Agente manda avançar + semáforo vermelho
    case 7:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Agente de trânsito mandando avançar enquanto semáforo está vermelho">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* City road */}
          <polygon points="120,148 360,148 480,240 0,240" fill="#64748B" />
          {/* Crosswalk stripes */}
          {[70, 140, 210, 280, 350].map((x) => (
            <rect key={x} x={x} y="190" width="42" height="16" fill="#FFFFFF" opacity="0.9" />
          ))}
          {/* Traffic light pole with RED active */}
          <path d="M402 220 V52 H348" fill="none" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
          <rect x="326" y="34" width="44" height="94" rx="10" fill="#1E293B" />
          <circle cx="348" cy="56" r="12" fill="#EF4444" stroke="#FCA5A5" strokeWidth="3" />
          <circle cx="348" cy="82" r="10" fill="#475569" />
          <circle cx="348" cy="108" r="10" fill="#475569" />
          {/* Traffic Agent gesturing ADVANCE */}
          <g transform="translate(174,56)">
            {/* Head + white cap */}
            <circle cx="48" cy="34" r="18" fill="#FDBA74" stroke="#1E293B" strokeWidth="2" />
            <path d="M28 24 Q48 8 68 24 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <rect x="26" y="22" width="44" height="6" rx="2" fill="#1E293B" />
            {/* Torso + reflective vest */}
            <rect x="22" y="54" width="52" height="68" rx="10" fill="#1E3A8A" stroke="#0F172A" strokeWidth="2" />
            <rect x="24" y="58" width="48" height="58" rx="6" fill="#BEF264" />
            <rect x="24" y="76" width="48" height="10" fill="#E2E8F0" />
            <rect x="24" y="96" width="48" height="10" fill="#E2E8F0" />
            {/* Extended gesturing arm */}
            <path d="M22 68 L-34 58" stroke="#1E3A8A" strokeWidth="14" strokeLinecap="round" />
            <circle cx="-40" cy="56" r="9" fill="#FDBA74" stroke="#1E293B" strokeWidth="2" />
            {/* Motion lines */}
            <path d="M-54 44 L-66 40 M-56 58 L-68 58 M-54 72 L-64 76" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
          </g>
          <rect x="16" y="16" width="166" height="30" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="99" y="35" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Agente: Avance · Sinal: Vermelho</text>
        </svg>
      );

    // Q08: Placa de indicação de destinos (rodovia + pórtico verde)
    case 8:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Rodovia com bifurcação e placa de indicação de destinos">
          <rect width="480" height="240" fill="#DBEAFE" />
          {/* Hills */}
          <path d="M0 132 Q120 76 260 112 T480 96 V240 H0 Z" fill="#86EFAC" />
          {/* Highway split */}
          <polygon points="170,126 250,126 290,240 40,240" fill="#475569" />
          <polygon points="240,126 294,126 465,240 300,240" fill="#64748B" />
          <line x1="186" y1="150" x2="152" y2="232" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="10 8" />
          {/* Gantry overhead sign */}
          <rect x="86" y="42" width="10" height="106" fill="#94A3B8" />
          <rect x="382" y="42" width="10" height="106" fill="#94A3B8" />
          <rect x="86" y="54" width="306" height="10" fill="#94A3B8" />
          {/* Green Destination Sign */}
          <rect x="134" y="24" width="212" height="68" rx="8" fill="#15803D" stroke="#FFFFFF" strokeWidth="3" />
          <text x="154" y="52" fontSize="14" fontWeight="700" fill="#FFFFFF">Centro</text>
          <text x="154" y="74" fontSize="14" fontWeight="700" fill="#FFFFFF">Cidade A</text>
          <path d="M294 58 H326 M316 48 L328 58 L316 68" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Car approaching */}
          <g transform="translate(152,166)">
            <rect x="4" y="14" width="62" height="26" rx="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <path d="M12 14 L20 2 H50 L58 14 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
            <rect x="8" y="21" width="10" height="6" rx="2" fill="#EF4444" />
            <rect x="52" y="21" width="10" height="6" rx="2" fill="#EF4444" />
          </g>
        </svg>
      );

    // Q09: Placa PARE em esquina urbana
    case 9:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Esquina urbana com placa octogonal vermelha PARE e faixa de retenção">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* Houses */}
          <rect x="16" y="78" width="94" height="90" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
          <polygon points="10,78 116,78 104,58 22,58" fill="#EA580C" />
          <rect x="386" y="72" width="94" height="114" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
          {/* Road & stop line */}
          <polygon points="140,148 310,148 430,240 20,240" fill="#64748B" />
          <rect x="88" y="196" width="232" height="14" fill="#FFFFFF" />
          {/* Sidewalk */}
          <path d="M310 148 Q336 168 358 240 H480 V184 Z" fill="#E2E8F0" />
          {/* Post + Octagonal PARE sign */}
          <rect x="328" y="114" width="10" height="110" fill="#64748B" />
          <polygon
            points="306,24 360,24 390,54 390,108 360,138 306,138 276,108 276,54"
            fill="#DC2626"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          <polygon
            points="309,30 357,30 384,57 384,105 357,132 309,132 282,105 282,57"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <text x="333" y="92" textAnchor="middle" fontSize="29" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
            PARE
          </text>
          {/* Car stopped behind line */}
          <g transform="translate(154,144)">
            <rect x="6" y="14" width="66" height="26" rx="7" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
            <path d="M14 14 L22 2 H56 L64 14 Z" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="2" />
            <rect x="10" y="21" width="11" height="6" rx="2" fill="#EF4444" />
            <rect x="57" y="21" width="11" height="6" rx="2" fill="#EF4444" />
          </g>
        </svg>
      );

    // Q10: Área Escolar
    case 10:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Entrada de escola com estudantes e placa amarela de Área Escolar">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* School building */}
          <rect x="116" y="54" width="224" height="106" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
          <rect x="180" y="42" width="96" height="32" rx="4" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
          <text x="228" y="63" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1E293B">ESCOLA</text>
          <rect x="196" y="88" width="64" height="72" fill="#1D4ED8" opacity="0.2" stroke="#1D4ED8" strokeWidth="2" />
          {/* Sidewalk & street with crosswalk */}
          <rect x="0" y="160" width="480" height="24" fill="#E2E8F0" />
          <rect x="0" y="184" width="480" height="56" fill="#64748B" />
          {[140, 198, 256, 314].map((x) => (
            <rect key={x} x={x} y="194" width="38" height="36" fill="#FFFFFF" />
          ))}
          {/* Students walking with backpacks */}
          <g transform="translate(86,110)">
            <circle cx="14" cy="12" r="9" fill="#FDBA74" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="6" y="22" width="16" height="26" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="0" y="24" width="8" height="18" rx="3" fill="#2563EB" />
            <line x1="11" y1="48" x2="8" y2="70" stroke="#1E3A8A" strokeWidth="4" />
            <line x1="17" y1="48" x2="21" y2="70" stroke="#1E3A8A" strokeWidth="4" />
          </g>
          <g transform="translate(128,118)">
            <circle cx="12" cy="10" r="8" fill="#FDBA74" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="5" y="19" width="14" height="22" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="0" y="21" width="7" height="15" rx="3" fill="#F97316" />
            <line x1="9" y1="41" x2="7" y2="62" stroke="#1E3A8A" strokeWidth="3.5" />
            <line x1="15" y1="41" x2="18" y2="62" stroke="#1E3A8A" strokeWidth="3.5" />
          </g>
          {/* Yellow Diamond School Zone Warning Sign */}
          <rect x="404" y="116" width="8" height="72" fill="#475569" />
          <g transform="translate(408,76) rotate(45)">
            <rect x="-34" y="-34" width="68" height="68" rx="6" fill="#FACC15" stroke="#0F172A" strokeWidth="3.5" />
          </g>
          {/* Pictogram inside diamond */}
          <circle cx="400" cy="60" r="5" fill="#0F172A" />
          <path d="M400 66 V84 M400 72 L391 80 M400 72 L408 77 M400 84 L394 96 M400 84 L406 96" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="416" cy="68" r="4" fill="#0F172A" />
          <path d="M416 73 V86 M416 77 L408 77 M416 86 L412 96 M416 86 L420 96" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // Q11: Motorista segurando celular ao volante
    case 11:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Motorista segurando celular enquanto dirige na via">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* Windshield view */}
          <polygon points="140,126 376,126 480,192 90,192" fill="#64748B" />
          <line x1="258" y1="126" x2="292" y2="192" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="10 8" />
          {/* Dashboard */}
          <path d="M0 164 H480 V240 H0 Z" fill="#334155" />
          {/* Steering wheel */}
          <circle cx="240" cy="204" r="66" fill="none" stroke="#0F172A" strokeWidth="14" />
          {/* Left hand on wheel */}
          <ellipse cx="182" cy="176" rx="18" ry="12" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2" />
          {/* Right hand holding smartphone */}
          <g transform="translate(268,128) rotate(12)">
            <rect width="44" height="74" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <rect x="5" y="8" width="34" height="54" rx="4" fill="#DBEAFE" />
            <rect x="10" y="16" width="24" height="6" rx="2" fill="#3B82F6" />
            <rect x="10" y="28" width="18" height="6" rx="2" fill="#93C5FD" />
            <ellipse cx="38" cy="48" rx="14" ry="18" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2" />
          </g>
          {/* Prohibition symbol */}
          <circle cx="382" cy="74" r="34" fill="#FEE2E2" stroke="#DC2626" strokeWidth="5" />
          <line x1="358" y1="50" x2="406" y2="98" stroke="#DC2626" strokeWidth="5" />
          <rect x="373" y="57" width="18" height="32" rx="3" fill="#0F172A" />
          <rect x="18" y="18" width="166" height="30" rx="8" fill="#FEE2E2" stroke="#FCA5A5" />
          <text x="101" y="37" textAnchor="middle" fontSize="11" fontWeight="800" fill="#B91C1C">Segurar celular · CTB 252</text>
        </svg>
      );

    // Q12: PPD (Permissão para Dirigir)
    case 12:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Documento Permissão para Dirigir ao lado de automóvel">
          <rect width="480" height="240" fill="#F1F5F9" />
          {/* Road floor */}
          <rect x="0" y="178" width="480" height="62" fill="#E2E8F0" />
          {/* PPD Card */}
          <g transform="translate(26,32) rotate(-3)">
            <rect width="236" height="154" rx="14" fill="#ECFDF5" stroke="#15803D" strokeWidth="3" />
            <rect x="14" y="14" width="208" height="32" rx="6" fill="#DCFCE7" />
            <text x="118" y="34" textAnchor="middle" fontSize="12" fontWeight="800" fill="#166534">PERMISSÃO PARA DIRIGIR</text>
            {/* Photo avatar */}
            <rect x="18" y="58" width="64" height="78" rx="8" fill="#FFFFFF" stroke="#86EFAC" strokeWidth="2" />
            <circle cx="50" cy="84" r="14" fill="#FDBA74" />
            <path d="M30 124 Q50 102 70 124 Z" fill="#1D4ED8" />
            {/* Info lines */}
            <rect x="96" y="64" width="116" height="14" rx="4" fill="#BBF7D0" />
            <rect x="96" y="88" width="90" height="12" rx="4" fill="#BBF7D0" />
            <rect x="96" y="110" width="108" height="22" rx="6" fill="#FEF3C7" stroke="#F59E0B" />
            <text x="150" y="125" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400E">1 ANO · PROVISÓRIA</text>
          </g>
          {/* Blue car right */}
          <g transform="translate(284,102)">
            <path d="M16 42 L38 14 H116 L144 40 L166 46 V72 H8 V48 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.5" />
            <path d="M44 20 H112 L134 38 H32 Z" fill="#BAE6FD" stroke="#1E3A8A" strokeWidth="1.5" />
            <circle cx="44" cy="72" r="16" fill="#0F172A" />
            <circle cx="44" cy="72" r="7" fill="#CBD5E1" />
            <circle cx="136" cy="72" r="16" fill="#0F172A" />
            <circle cx="136" cy="72" r="7" fill="#CBD5E1" />
          </g>
        </svg>
      );

    // Q13: Cinto de segurança
    case 13:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Passageiro usando cinto de segurança com destaque para a fivela">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* Car back seat interior */}
          <rect x="174" y="34" width="286" height="186" rx="18" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
          <rect x="206" y="64" width="98" height="136" rx="12" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          <rect x="322" y="64" width="110" height="136" rx="12" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          {/* Passenger seated */}
          <g transform="translate(256,34)">
            <circle cx="52" cy="40" r="24" fill="#FDBA74" stroke="#0F172A" strokeWidth="2" />
            <path d="M28 36 Q52 10 76 34 Q70 18 52 16 Q34 18 28 36 Z" fill="#1E293B" />
            <rect x="18" y="68" width="68" height="114" rx="16" fill="#F97316" stroke="#7C2D12" strokeWidth="2" />
            {/* Diagonal seatbelt */}
            <path d="M84 68 L22 174" stroke="#1E293B" strokeWidth="14" strokeLinecap="round" />
            <path d="M84 68 L22 174" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          </g>
          {/* Zoomed buckle callout circle */}
          <circle cx="106" cy="118" r="74" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="4" />
          {/* Metal tongue */}
          <g transform="translate(106,118) rotate(-40)">
            <rect x="-16" y="-62" width="32" height="44" rx="4" fill="#334155" />
            <rect x="-12" y="-20" width="24" height="22" rx="3" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
            <rect x="-5" y="-14" width="10" height="8" rx="1" fill="#FFFFFF" />
            {/* Receiver with red button */}
            <rect x="-18" y="12" width="36" height="44" rx="6" fill="#1E293B" />
            <rect x="-11" y="20" width="22" height="14" rx="3" fill="#EF4444" />
          </g>
          <path d="M174 148 L244 176" stroke="#1D4ED8" strokeWidth="3" strokeDasharray="6 5" />
        </svg>
      );

    // Q14: Pontuação das infrações (prancheta 4 níveis)
    case 14:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Prancheta comparando os quatro níveis de infrações de trânsito">
          <rect width="480" height="240" fill="#F8FAFC" />
          {/* Clipboard */}
          <rect x="118" y="24" width="244" height="200" rx="16" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
          <rect x="192" y="10" width="96" height="26" rx="8" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          <circle cx="240" cy="22" r="5" fill="#F8FAFC" />
          {/* 4 Severity rows */}
          {[
            {y: 52, label: 'Leve', bg: '#DCFCE7', stroke: '#15803D', text: '#166534', pts: '3 pts'},
            {y: 92, label: 'Média', bg: '#E0F2FE', stroke: '#0369A1', text: '#075985', pts: '4 pts'},
            {y: 132, label: 'Grave', bg: '#FEF3C7', stroke: '#B45309', text: '#92400E', pts: '5 pts'},
            {y: 172, label: 'Gravíssima', bg: '#FEE2E2', stroke: '#B91C1C', text: '#991B1B', pts: '? pts'},
          ].map((row) => (
            <g key={row.label}>
              <rect x="138" y={row.y} width="204" height="32" rx="8" fill={row.bg} stroke={row.stroke} strokeWidth="1.5" />
              <polygon points={`158,${row.y + 7} 148,${row.y + 24} 168,${row.y + 24}`} fill="#FFFFFF" stroke={row.stroke} strokeWidth="2" />
              <text x="158" y={row.y + 22} textAnchor="middle" fontSize="11" fontWeight="800" fill={row.stroke}>!</text>
              <text x="180" y={row.y + 21} fontSize="13" fontWeight="700" fill={row.text}>{row.label}</text>
              <text x="328" y={row.y + 21} textAnchor="end" fontSize="12" fontWeight="800" fill={row.text}>{row.pts}</text>
            </g>
          ))}
        </svg>
      );

    // Q15: Estacionamento em fila dupla
    case 15:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Carro vermelho estacionado em fila dupla ao lado de carro estacionado no meio-fio">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* Sidewalk left */}
          <polygon points="0,84 116,84 54,240 0,240" fill="#E2E8F0" />
          {/* Road */}
          <polygon points="116,84 480,84 480,240 54,240" fill="#64748B" />
          <line x1="242" y1="84" x2="218" y2="240" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="14 10" />
          <line x1="378" y1="84" x2="432" y2="240" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="14 10" />
          {/* Curb parked blue car */}
          <g transform="translate(88,100)">
            <rect x="8" y="34" width="112" height="58" rx="14" fill="#60A5FA" stroke="#1E3A8A" strokeWidth="2.5" />
            <path d="M22 34 L34 6 H94 L106 34 Z" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="2.5" />
            <rect x="36" y="12" width="56" height="18" rx="4" fill="#DBEAFE" />
            <rect x="16" y="54" width="22" height="12" rx="4" fill="#FEF08A" />
            <rect x="90" y="54" width="22" height="12" rx="4" fill="#FEF08A" />
            <rect x="18" y="90" width="20" height="16" rx="4" fill="#0F172A" />
            <rect x="90" y="90" width="20" height="16" rx="4" fill="#0F172A" />
          </g>
          {/* Double-parked red car blocking lane */}
          <g transform="translate(234,96)">
            <rect x="8" y="34" width="122" height="60" rx="14" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
            <path d="M22 34 L36 6 H102 L116 34 Z" fill="#FCA5A5" stroke="#7F1D1D" strokeWidth="2.5" />
            <rect x="38" y="12" width="62" height="18" rx="4" fill="#FEE2E2" />
            {/* Blinking hazard lights */}
            <rect x="16" y="54" width="24" height="12" rx="4" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
            <rect x="98" y="54" width="24" height="12" rx="4" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
            <rect x="18" y="92" width="22" height="16" rx="4" fill="#0F172A" />
            <rect x="98" y="92" width="22" height="16" rx="4" fill="#0F172A" />
          </g>
          <rect x="242" y="20" width="142" height="30" rx="8" fill="#FEE2E2" stroke="#FCA5A5" />
          <text x="313" y="39" textAnchor="middle" fontSize="11" fontWeight="800" fill="#B91C1C">Fila dupla · Proibido</text>
        </svg>
      );

    // Q16: Neblina intensa
    case 16:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Estrada com neblina intensa e carro utilizando farol baixo">
          <defs>
            <linearGradient id="fog16" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="55%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
          <rect width="480" height="240" fill="url(#fog16)" />
          {/* Misty road */}
          <polygon points="186,118 294,118 450,240 30,240" fill="#64748B" />
          <line x1="240" y1="118" x2="240" y2="240" stroke="#FACC15" strokeWidth="4" />
          <line x1="248" y1="118" x2="252" y2="240" stroke="#FACC15" strokeWidth="4" />
          {/* Guardrail right */}
          <path d="M312 140 L470 198" stroke="#CBD5E1" strokeWidth="8" />
          {/* Misty trees left */}
          <circle cx="48" cy="96" r="44" fill="#94A3B8" opacity="0.55" />
          <circle cx="94" cy="112" r="32" fill="#94A3B8" opacity="0.45" />
          {/* Car with LOW BEAM headlights glowing downward */}
          <g transform="translate(152,98)">
            <ellipse cx="26" cy="82" rx="34" ry="14" fill="#FEF08A" opacity="0.55" />
            <ellipse cx="106" cy="82" rx="34" ry="14" fill="#FEF08A" opacity="0.55" />
            <rect x="8" y="34" width="116" height="44" rx="12" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
            <path d="M22 34 L34 10 H98 L110 34 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
            <rect x="34" y="16" width="64" height="16" rx="4" fill="#CBD5E1" />
            <ellipse cx="26" cy="56" rx="12" ry="7" fill="#FEF08A" />
            <ellipse cx="106" cy="56" rx="12" ry="7" fill="#FEF08A" />
            <rect x="18" y="76" width="18" height="14" rx="3" fill="#0F172A" />
            <rect x="96" y="76" width="18" height="14" rx="3" fill="#0F172A" />
          </g>
          {/* Fog bank ribbons */}
          <ellipse cx="110" cy="70" rx="90" ry="20" fill="#FFFFFF" opacity="0.55" />
          <ellipse cx="364" cy="82" rx="100" ry="24" fill="#FFFFFF" opacity="0.6" />
          <rect x="16" y="16" width="142" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.92" stroke="#CBD5E1" />
          <text x="87" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Neblina intensa</text>
        </svg>
      );

    default:
      return null;
  }
}
