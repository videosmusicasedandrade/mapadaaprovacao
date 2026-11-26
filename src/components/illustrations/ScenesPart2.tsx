import React from 'react';

export function renderScenePart2(questionId: number): React.ReactNode {
  switch (questionId) {
    // Q17: Distância na chuva
    case 17:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Dois carros sob chuva intensa mantendo distância de segurança">
          <rect width="480" height="240" fill="#94A3B8" />
          {/* Wet highway */}
          <polygon points="154,110 326,110 470,240 10,240" fill="#475569" />
          <line x1="240" y1="110" x2="240" y2="240" stroke="#E2E8F0" strokeWidth="4" strokeDasharray="12 10" />
          {/* Front silver car */}
          <g transform="translate(264,104)">
            <rect x="6" y="14" width="60" height="24" rx="7" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
            <path d="M14 14 L22 2 H50 L58 14 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="10" y="21" width="10" height="6" rx="2" fill="#EF4444" />
            <rect x="52" y="21" width="10" height="6" rx="2" fill="#EF4444" />
            {/* Wet reflection */}
            <rect x="10" y="42" width="10" height="16" rx="3" fill="#EF4444" opacity="0.4" />
            <rect x="52" y="42" width="10" height="16" rx="3" fill="#EF4444" opacity="0.4" />
          </g>
          {/* Rear blue car keeping distance */}
          <g transform="translate(64,132)">
            <rect x="10" y="24" width="128" height="48" rx="12" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.5" />
            <path d="M26 24 L42 4 H108 L122 24 Z" fill="#60A5FA" stroke="#1E3A8A" strokeWidth="2.5" />
            <rect x="44" y="8" width="60" height="14" rx="3" fill="#93C5FD" />
            <rect x="16" y="38" width="24" height="10" rx="3" fill="#EF4444" />
            <rect x="108" y="38" width="24" height="10" rx="3" fill="#EF4444" />
            <rect x="22" y="70" width="22" height="16" rx="4" fill="#0F172A" />
            <rect x="104" y="70" width="22" height="16" rx="4" fill="#0F172A" />
          </g>
          {/* Distance indicator */}
          <line x1="210" y1="168" x2="262" y2="146" stroke="#FACC15" strokeWidth="3.5" strokeDasharray="6 4" />
          {/* Raindrops */}
          {[40, 90, 140, 190, 240, 290, 340, 390, 440].map((x, idx) => (
            <g key={x} stroke="#E0F2FE" strokeWidth="2" opacity="0.8">
              <line x1={x} y1={14 + (idx % 3) * 18} x2={x - 10} y2={42 + (idx % 3) * 18} />
              <line x1={x + 18} y1={72 + (idx % 2) * 22} x2={x + 8} y2={102 + (idx % 2) * 22} />
            </g>
          ))}
          <rect x="16" y="16" width="150" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.92" stroke="#CBD5E1" />
          <text x="91" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Chuva · Piso molhado</text>
        </svg>
      );

    // Q18: Aquaplanagem
    case 18:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Carro passando por lâmina de água sofrendo aquaplanagem com placa de pista escorregadia">
          <rect width="480" height="240" fill="#CBD5E1" />
          {/* Road with large puddle */}
          <rect x="0" y="128" width="480" height="112" fill="#475569" />
          <ellipse cx="220" cy="196" rx="180" ry="30" fill="#38BDF8" opacity="0.65" />
          {/* Slippery road warning diamond sign */}
          <rect x="412" y="102" width="6" height="58" fill="#334155" />
          <g transform="translate(415,66) rotate(45)">
            <rect x="-30" y="-30" width="60" height="60" rx="5" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
          </g>
          <rect x="403" y="48" width="24" height="14" rx="3" fill="#0F172A" />
          <path d="M407 66 Q400 74 409 82 M423 66 Q416 74 425 82" fill="none" stroke="#0F172A" strokeWidth="2.5" />
          {/* Splashing water arcs */}
          <path d="M108 188 Q74 166 56 190 M322 188 Q356 166 376 190" fill="none" stroke="#E0F2FE" strokeWidth="6" strokeLinecap="round" />
          {/* Blue car aquaplaning */}
          <g transform="translate(114,96)">
            <rect x="12" y="36" width="188" height="52" rx="14" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2.5" />
            <path d="M36 36 L58 6 H154 L176 36 Z" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="2.5" />
            <rect x="58" y="12" width="96" height="20" rx="4" fill="#E0F2FE" />
            <ellipse cx="36" cy="58" rx="16" ry="9" fill="#FEF08A" />
            <ellipse cx="176" cy="58" rx="16" ry="9" fill="#FEF08A" />
            <rect x="28" y="84" width="26" height="18" rx="4" fill="#0F172A" />
            <rect x="158" y="84" width="26" height="18" rx="4" fill="#0F172A" />
          </g>
          <rect x="16" y="16" width="154" height="28" rx="8" fill="#FFFFFF" fillOpacity="0.92" stroke="#CBD5E1" />
          <text x="93" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Aquaplanagem · Ação suave</text>
        </svg>
      );

    // Q19: Ponto cego no retrovisor (moto)
    case 19:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Retrovisor lateral do carro mostrando moto entrando no ponto cego">
          <rect width="480" height="240" fill="#DBEAFE" />
          {/* Road outside car window */}
          <polygon points="0,126 480,126 480,240 0,240" fill="#64748B" />
          {/* Car door window pillar */}
          <polygon points="0,0 96,0 52,240 0,240" fill="#334155" />
          <rect x="0" y="182" width="184" height="58" fill="#475569" />
          {/* Side mirror frame */}
          <rect x="132" y="36" width="228" height="148" rx="42" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          {/* Mirror glass reflection */}
          <rect x="148" y="50" width="196" height="120" rx="32" fill="#E0F2FE" />
          <path d="M148 118 H344 V142 Q344 170 316 170 H176 Q148 170 148 142 Z" fill="#64748B" />
          <line x1="252" y1="118" x2="296" y2="170" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 6" />
          {/* Car side visible in mirror */}
          <path d="M148 68 Q186 84 198 170 H148 Z" fill="#E2E8F0" stroke="#334155" strokeWidth="2" />
          {/* Motorcyclist in mirror */}
          <g transform="translate(248,74)">
            <circle cx="24" cy="14" r="11" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
            <rect x="16" y="10" width="16" height="7" rx="3" fill="#1E293B" />
            <rect x="10" y="26" width="28" height="26" rx="7" fill="#334155" />
            <rect x="12" y="48" width="24" height="22" rx="5" fill="#EA580C" stroke="#7C2D12" strokeWidth="1.5" />
            <circle cx="24" cy="56" r="6" fill="#FEF08A" />
            <rect x="19" y="68" width="10" height="18" rx="3" fill="#0F172A" />
          </g>
          {/* Alert strokes */}
          <path d="M372 48 L390 36 M378 66 L398 62 M374 84 L392 92" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <rect x="336" y="196" width="128" height="28" rx="8" fill="#FEF3C7" stroke="#F59E0B" />
          <text x="400" y="214" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400E">Ponto cego · Verificar</text>
        </svg>
      );

    // Q20: Pedestre já atravessando na faixa
    case 20:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Pedestre atravessando na faixa enquanto carro cede passagem">
          <rect width="480" height="240" fill="#E0F2FE" />
          {/* Background trees */}
          <circle cx="80" cy="96" r="36" fill="#22C55E" />
          <circle cx="246" cy="108" r="28" fill="#16A34A" />
          {/* Street & zebra crosswalk */}
          <rect x="0" y="132" width="480" height="108" fill="#64748B" />
          {[150, 212, 274, 336].map((x) => (
            <rect key={x} x={x} y="152" width="40" height="68" rx="2" fill="#FFFFFF" />
          ))}
          {/* Yellow diamond crosswalk sign */}
          <rect x="416" y="102" width="6" height="58" fill="#475569" />
          <g transform="translate(419,64) rotate(45)">
            <rect x="-28" y="-28" width="56" height="56" rx="5" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
          </g>
          <circle cx="419" cy="52" r="4.5" fill="#0F172A" />
          <path d="M419 57 V74 M419 62 L412 69 M419 62 L426 69 M419 74 L413 83 M419 74 L425 83" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Pedestrian walking across */}
          <g transform="translate(262,64)">
            <circle cx="24" cy="18" r="13" fill="#FDBA74" stroke="#0F172A" strokeWidth="2" />
            <rect x="14" y="34" width="22" height="38" rx="7" fill="#FB7185" stroke="#881337" strokeWidth="2" />
            <path d="M20 72 L10 114 M30 72 L42 114" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
          </g>
          {/* Car front-left yielding */}
          <g transform="translate(0,96)">
            <path d="M0 16 H108 L156 82 V144 H0 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.5" />
            <polygon points="10,28 96,28 134,76 10,76" fill="#BAE6FD" stroke="#1E3A8A" strokeWidth="2" />
            <circle cx="56" cy="54" r="14" fill="#FDBA74" />
          </g>
        </svg>
      );

    // Q21: Curva com visibilidade limitada
    case 21:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Estrada sinuosa com curva à direita de visibilidade limitada e placa amarela">
          <rect width="480" height="240" fill="#DBEAFE" />
          {/* Distant hills */}
          <path d="M0 112 Q100 60 220 96 T480 80 V240 H0 Z" fill="#86EFAC" />
          {/* Right rocky embankment blocking visibility */}
          <path d="M294 240 Q312 118 480 70 V240 Z" fill="#B45309" opacity="0.82" />
          <circle cx="380" cy="68" r="46" fill="#15803D" />
          <circle cx="440" cy="56" r="44" fill="#16A34A" />
          {/* Curving road */}
          <path d="M40 240 Q120 144 334 128 L352 150 Q218 172 254 240 Z" fill="#475569" />
          <path d="M150 240 Q176 158 342 138" fill="none" stroke="#FACC15" strokeWidth="4" />
          {/* Yellow right-curve warning sign */}
          <rect x="412" y="130" width="6" height="66" fill="#475569" />
          <g transform="translate(415,98) rotate(45)">
            <rect x="-30" y="-30" width="60" height="60" rx="5" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
          </g>
          <path d="M408 114 V96 Q408 86 420 86 H426" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <polygon points="424,78 436,86 424,94" fill="#0F172A" />
          {/* Silver car reducing speed before curve */}
          <g transform="translate(86,136)">
            <rect x="8" y="20" width="96" height="36" rx="10" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
            <path d="M20 20 L32 4 H82 L94 20 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
            <rect x="34" y="8" width="46" height="10" rx="2" fill="#64748B" />
            <rect x="14" y="30" width="18" height="8" rx="2" fill="#EF4444" />
            <rect x="80" y="30" width="18" height="8" rx="2" fill="#EF4444" />
            <rect x="18" y="54" width="16" height="12" rx="3" fill="#0F172A" />
            <rect x="78" y="54" width="16" height="12" rx="3" fill="#0F172A" />
          </g>
        </svg>
      );

    // Q22: Vítima presa no veículo
    case 22:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Veículo sinistrado com cone de segurança e ícones de socorro especializado">
          <rect width="480" height="240" fill="#F1F5F9" />
          <rect x="0" y="168" width="480" height="72" fill="#64748B" />
          {/* Rescue service emblems left */}
          <circle cx="64" cy="64" r="34" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
          <rect x="44" y="52" width="40" height="24" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
          <path d="M64 57 V71 M57 64 H71" stroke="#DC2626" strokeWidth="4" />
          <circle cx="144" cy="64" r="34" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <path d="M126 68 Q144 42 162 68 Z" fill="#FACC15" stroke="#78350F" strokeWidth="2" />
          <rect x="120" y="68" width="48" height="7" rx="3" fill="#F59E0B" />
          {/* Damaged car right */}
          <g transform="translate(204,76)">
            <path d="M18 52 L64 12 H188 L224 52 V102 H12 L22 72 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" />
            {/* Crumpled hood */}
            <path d="M14 54 L36 44 L54 58 L76 42 L94 56" fill="none" stroke="#475569" strokeWidth="3" />
            <rect x="108" y="22" width="76" height="36" rx="6" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2" />
            {/* Seated victim inside */}
            <circle cx="146" cy="40" r="12" fill="#FDBA74" />
            <circle cx="66" cy="102" r="18" fill="#0F172A" />
            <circle cx="188" cy="102" r="18" fill="#0F172A" />
          </g>
          {/* Safety Cone */}
          <polygon points="340,148 358,214 322,214" fill="#F97316" stroke="#7C2D12" strokeWidth="2" />
          <rect x="331" y="176" width="18" height="10" fill="#FFFFFF" />
          <rect x="18" y="114" width="154" height="32" rx="8" fill="#FEF3C7" stroke="#F59E0B" />
          <text x="95" y="134" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400E">Não movimentar · Chamar 193</text>
        </svg>
      );

    // Q23: Acionamento do socorro (local, vítimas e riscos)
    case 23:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Sinistro rodoviário com ícones de local, vítimas e riscos para acionar socorro">
          <rect width="480" height="240" fill="#E0F2FE" />
          <rect x="0" y="156" width="480" height="84" fill="#64748B" />
          {/* 3 info bubbles: Local, Vítimas, Riscos */}
          <g transform="translate(88,24)">
            <rect width="84" height="56" rx="14" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" />
            <circle cx="42" cy="24" r="9" fill="#DC2626" />
            <text x="42" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#166534">Local</text>
          </g>
          <g transform="translate(198,24)">
            <rect width="84" height="56" rx="14" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
            <circle cx="34" cy="22" r="6" fill="#1D4ED8" />
            <circle cx="50" cy="22" r="6" fill="#1D4ED8" />
            <text x="42" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1E40AF">Vítimas</text>
          </g>
          <g transform="translate(308,24)">
            <rect width="84" height="56" rx="14" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
            <polygon points="42,10 30,32 54,32" fill="#F59E0B" />
            <text x="42" y="29" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFFFFF">!</text>
            <text x="42" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400E">Riscos</text>
          </g>
          {/* Warning triangle left */}
          <polygon points="74,142 36,210 112,210" fill="#FFFFFF" stroke="#DC2626" strokeWidth="8" strokeLinejoin="round" />
          {/* Two collided cars */}
          <g transform="translate(180,122)">
            <rect x="0" y="22" width="104" height="38" rx="10" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
            <path d="M14 22 L28 4 H78 L92 22 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
            <circle cx="24" cy="60" r="12" fill="#0F172A" />
            <circle cx="82" cy="60" r="12" fill="#0F172A" />
          </g>
          <g transform="translate(294,122)">
            <rect x="0" y="22" width="114" height="38" rx="10" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
            <path d="M22 22 L38 4 H96 L110 22 Z" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="2" />
            <circle cx="28" cy="60" r="12" fill="#0F172A" />
            <circle cx="88" cy="60" r="12" fill="#0F172A" />
          </g>
          {/* Impact star */}
          <path d="M286 124 L290 112 L296 124 L306 118 L298 130" fill="none" stroke="#F59E0B" strokeWidth="3" />
        </svg>
      );

    // Q24: Segurança da cena / sinalizar sem se expor
    case 24:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Sinalização segura com triângulo e cones em via após sinistro">
          <rect width="480" height="240" fill="#E0F2FE" />
          <path d="M0 132 Q140 86 280 124 T480 106 V240 H0 Z" fill="#86EFAC" />
          {/* Road */}
          <polygon points="0,156 480,126 480,240 0,240" fill="#64748B" />
          <line x1="20" y1="196" x2="460" y2="162" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="16 12" />
          {/* Prominent red safety triangle */}
          <polygon points="94,114 38,212 150,212" fill="#FFFFFF" stroke="#DC2626" strokeWidth="11" strokeLinejoin="round" />
          {/* Cones */}
          <polygon points="248,162 264,212 232,212" fill="#F97316" stroke="#7C2D12" strokeWidth="2" />
          <rect x="240" y="184" width="16" height="8" fill="#FFFFFF" />
          <polygon points="318,144 330,180 306,180" fill="#F97316" stroke="#7C2D12" strokeWidth="2" />
          {/* Ambulance arriving */}
          <g transform="translate(342,84)">
            <rect width="106" height="58" rx="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <rect x="6" y="10" width="32" height="22" rx="4" fill="#93C5FD" />
            <rect x="0" y="38" width="106" height="6" fill="#EF4444" />
            <path d="M72 14 V34 M62 24 H82" stroke="#DC2626" strokeWidth="6" />
            <rect x="34" y="-8" width="24" height="8" rx="3" fill="#EF4444" />
            <circle cx="24" cy="58" r="11" fill="#0F172A" />
            <circle cx="84" cy="58" r="11" fill="#0F172A" />
          </g>
          <rect x="16" y="16" width="174" height="28" rx="8" fill="#DCFCE7" stroke="#86EFAC" />
          <text x="103" y="34" textAnchor="middle" fontSize="11" fontWeight="800" fill="#15803D">Sinalizar sem se expor</text>
        </svg>
      );

    // Q25: Engasgo consciente com tosse forte
    case 25:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Pessoa consciente tossindo com força e números de emergência 192, 193 e 190">
          <rect width="480" height="240" fill="#F8FAFC" />
          {/* Emergency numbers column */}
          {[
            {y: 26, num: '192', label: 'SAMU', bg: '#DCFCE7', stroke: '#15803D', text: '#166534'},
            {y: 94, num: '193', label: 'Bombeiros', bg: '#FEE2E2', stroke: '#DC2626', text: '#991B1B'},
            {y: 162, num: '190', label: 'Polícia', bg: '#DBEAFE', stroke: '#1D4ED8', text: '#1E40AF'},
          ].map((item) => (
            <g key={item.num} transform={`translate(24,${item.y})`}>
              <rect width="128" height="50" rx="12" fill={item.bg} stroke={item.stroke} strokeWidth="2" />
              <text x="20" y="33" fontSize="20" fontWeight="800" fill={item.text}>{item.num}</text>
              <text x="114" y="31" textAnchor="end" fontSize="11" fontWeight="700" fill={item.text}>{item.label}</text>
            </g>
          ))}
          {/* Person coughing strongly */}
          <g transform="translate(212,26)">
            <circle cx="86" cy="54" r="34" fill="#FDBA74" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M52 48 Q86 10 120 44 Q110 22 86 20 Q62 22 52 48 Z" fill="#78350F" />
            {/* Closed eyes / open coughing mouth */}
            <path d="M72 48 L80 52 M96 52 L104 48" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="94" cy="68" rx="9" ry="7" fill="#7F1D1D" />
            {/* Shirt */}
            <path d="M34 196 Q40 104 86 104 Q132 104 138 196 Z" fill="#15803D" stroke="#0F172A" strokeWidth="2.5" />
            {/* Cough air bursts */}
            <path d="M126 60 L158 46 M130 72 L166 72 M126 84 L158 96" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          </g>
          <rect x="334" y="168" width="128" height="44" rx="10" fill="#FEF3C7" stroke="#F59E0B" />
          <text x="398" y="187" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400E">Tosse eficaz</text>
          <text x="398" y="203" textAnchor="middle" fontSize="10" fontWeight="600" fill="#B45309">Incentivar e observar</text>
        </svg>
      );

    // Q26: Vítima consciente sem perigo imediato
    case 26:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Socorrista com colete reflexivo acalmando vítima consciente no acostamento">
          <rect width="480" height="240" fill="#E0F2FE" />
          <rect x="0" y="156" width="480" height="84" fill="#DCFCE7" />
          <polygon points="310,156 480,156 480,240 240,240" fill="#64748B" />
          {/* Helper in reflective vest */}
          <g transform="translate(104,68)">
            <circle cx="48" cy="24" r="18" fill="#FDBA74" stroke="#0F172A" strokeWidth="2" />
            <rect x="24" y="46" width="48" height="62" rx="10" fill="#BEF264" stroke="#1E293B" strokeWidth="2" />
            <rect x="24" y="64" width="48" height="10" fill="#FFFFFF" />
            <path d="M72 62 L114 78" stroke="#1D4ED8" strokeWidth="14" strokeLinecap="round" />
            <rect x="26" y="106" width="44" height="36" rx="8" fill="#1E3A8A" />
          </g>
          {/* Seated calm victim */}
          <g transform="translate(214,84)">
            <circle cx="44" cy="24" r="18" fill="#FDBA74" stroke="#0F172A" strokeWidth="2" />
            <path d="M36 28 Q44 34 52 28" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <rect x="22" y="46" width="44" height="58" rx="12" fill="#FB7185" stroke="#881337" strokeWidth="2" />
            <rect x="18" y="96" width="66" height="32" rx="10" fill="#1D4ED8" />
          </g>
          {/* Calm speech lines */}
          <path d="M180 80 Q196 68 210 80" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <rect x="16" y="16" width="194" height="30" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="113" y="35" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">Acalmar e aguardar o socorro</text>
        </svg>
      );

    // Q27: Escapamento furado no elevador da oficina
    case 27:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Mecânico inspecionando escapamento danificado sob o veículo">
          <rect width="480" height="240" fill="#F1F5F9" />
          {/* Hydraulic lift posts */}
          <rect x="34" y="36" width="22" height="204" fill="#2563EB" />
          <rect x="424" y="36" width="22" height="204" fill="#2563EB" />
          <rect x="34" y="114" width="412" height="14" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
          {/* Underside of car */}
          <rect x="64" y="18" width="352" height="94" rx="22" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="80" y="76" width="54" height="44" rx="8" fill="#0F172A" />
          <rect x="346" y="76" width="54" height="44" rx="8" fill="#0F172A" />
          {/* Exhaust pipe + damaged rusted muffler */}
          <path d="M120 82 H214" stroke="#94A3B8" strokeWidth="10" />
          <rect x="212" y="62" width="112" height="40" rx="14" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          {/* Jagged hole in muffler */}
          <polygon points="256,82 268,72 280,80 274,94 260,92" fill="#0F172A" />
          {/* Escaping gas puffs */}
          <circle cx="272" cy="112" r="10" fill="#94A3B8" opacity="0.7" />
          <circle cx="290" cy="126" r="14" fill="#94A3B8" opacity="0.55" />
          <circle cx="316" cy="122" r="11" fill="#CBD5E1" opacity="0.65" />
          {/* Mechanic inspecting with flashlight */}
          <g transform="translate(132,126)">
            <circle cx="44" cy="28" r="18" fill="#FDBA74" stroke="#1E293B" strokeWidth="2" />
            <path d="M26 22 Q44 6 64 20 Z" fill="#1D4ED8" />
            <rect x="20" y="50" width="54" height="64" rx="10" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
            {/* Flashlight beam */}
            <polygon points="88,44 134,-24 160,-10 98,52" fill="#FEF08A" opacity="0.5" />
          </g>
          <rect x="284" y="182" width="168" height="36" rx="8" fill="#FEE2E2" stroke="#FCA5A5" />
          <text x="368" y="204" textAnchor="middle" fontSize="11" fontWeight="800" fill="#B91C1C">Mais ruído + gases</text>
        </svg>
      );

    // Q28: Calibragem com pneus frios
    case 28:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Calibragem de pneu frio com manômetro">
          <rect width="480" height="240" fill="#E0F2FE" />
          <rect x="0" y="176" width="480" height="64" fill="#CBD5E1" />
          {/* Car fender & tire */}
          <path d="M0 16 H204 Q240 16 254 114 V178 H0 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
          <circle cx="146" cy="144" r="76" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
          <circle cx="146" cy="144" r="46" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
          <circle cx="146" cy="144" r="14" fill="#64748B" />
          {/* Pressure gauge */}
          <path d="M186 154 Q238 192 288 134" fill="none" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          <circle cx="304" cy="108" r="36" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="5" />
          <line x1="304" y1="108" x2="324" y2="90" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <circle cx="304" cy="108" r="5" fill="#0F172A" />
          {/* Cold snowflake badge */}
          <rect x="356" y="26" width="104" height="72" rx="12" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
          <text x="408" y="56" textAnchor="middle" fontSize="22" fontWeight="700" fill="#1D4ED8">❄</text>
          <text x="408" y="82" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1E40AF">Pneus frios</text>
        </svg>
      );

    // Q29: Condução econômica (menor consumo)
    case 29:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Carro em condução suave e econômica em rodovia com sinalização ecológica">
          <rect width="480" height="240" fill="#DBEAFE" />
          <path d="M0 128 Q140 84 280 116 T480 96 V240 H0 Z" fill="#86EFAC" />
          {/* Highway */}
          <polygon points="154,122 332,122 470,240 20,240" fill="#64748B" />
          <line x1="244" y1="122" x2="244" y2="240" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="14 10" />
          {/* Green leaf eco sign */}
          <rect x="46" y="102" width="6" height="64" fill="#475569" />
          <rect x="18" y="42" width="66" height="62" rx="10" fill="#15803D" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M36 82 Q52 54 68 62 Q64 84 36 82 Z" fill="#BBF7D0" />
          {/* Eco gauge meter top right */}
          <rect x="336" y="20" width="124" height="68" rx="12" fill="#FFFFFF" stroke="#86EFAC" strokeWidth="2" />
          <path d="M358 68 A40 40 0 0 1 438 68" fill="none" stroke="#15803D" strokeWidth="8" strokeLinecap="round" />
          <line x1="398" y1="68" x2="378" y2="44" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <text x="398" y="82" textAnchor="middle" fontSize="10" fontWeight="800" fill="#15803D">Condução suave</text>
          {/* Smooth car */}
          <g transform="translate(154,132)">
            <rect x="8" y="24" width="122" height="44" rx="12" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M24 24 L38 4 H100 L114 24 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" />
            <rect x="40" y="9" width="58" height="12" rx="3" fill="#64748B" />
            <rect x="14" y="36" width="22" height="9" rx="3" fill="#EF4444" />
            <rect x="102" y="36" width="22" height="9" rx="3" fill="#EF4444" />
            <rect x="20" y="66" width="20" height="14" rx="4" fill="#0F172A" />
            <rect x="98" y="66" width="20" height="14" rx="4" fill="#0F172A" />
          </g>
        </svg>
      );

    // Q30: Ponto de coleta de pneus usados
    case 30:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Ponto de coleta coberto com pneus usados empilhados corretamente">
          <rect width="480" height="240" fill="#E0F2FE" />
          <rect x="0" y="182" width="480" height="58" fill="#DCFCE7" />
          {/* Covered collection shelter */}
          <polygon points="74,64 406,64 426,84 54,84" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          <rect x="86" y="84" width="14" height="118" fill="#1D4ED8" />
          <rect x="380" y="84" width="14" height="118" fill="#1D4ED8" />
          <rect x="84" y="188" width="312" height="18" rx="4" fill="#CBD5E1" />
          {/* Stacks of used tires */}
          {[132, 208, 286].map((x) => (
            <g key={x}>
              {[168, 148, 128, 108].map((y) => (
                <rect key={y} x={x} y={y} width="64" height="18" rx="7" fill="#334155" stroke="#0F172A" strokeWidth="2" />
              ))}
            </g>
          ))}
          {/* Recycling badge on shelter */}
          <rect x="180" y="22" width="120" height="34" rx="8" fill="#15803D" />
          <text x="240" y="43" textAnchor="middle" fontSize="12" fontWeight="800" fill="#FFFFFF">♻ Coleta de Pneus</text>
        </svg>
      );

    // Q31: Limpador de para-brisa sob chuva
    case 31:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Para-brisa sob chuva com palhetas limpadoras em bom estado">
          <rect width="480" height="240" fill="#334155" />
          {/* Windshield frame */}
          <polygon points="48,22 432,22 464,174 16,174" fill="#93C5FD" stroke="#0F172A" strokeWidth="4" />
          {/* Road seen through glass */}
          <polygon points="196,120 284,120 364,174 116,174" fill="#64748B" />
          <line x1="240" y1="120" x2="240" y2="174" stroke="#FACC15" strokeWidth="3" strokeDasharray="8 6" />
          {/* Cleared wiper arcs */}
          <path d="M92 174 A110 110 0 0 1 256 96 L204 174 Z" fill="#E0F2FE" opacity="0.65" />
          <path d="M236 174 A110 110 0 0 1 404 96 L354 174 Z" fill="#E0F2FE" opacity="0.65" />
          {/* Wiper blades */}
          <line x1="176" y1="174" x2="254" y2="100" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
          <line x1="326" y1="174" x2="404" y2="100" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
          {/* Rain streaks */}
          {[74, 120, 168, 224, 290, 344, 408].map((x) => (
            <line key={x} x1={x} y1="34" x2={x - 8} y2="66" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.75" />
          ))}
          {/* Dashboard & steering wheel */}
          <rect x="0" y="174" width="480" height="66" fill="#1E293B" />
          <circle cx="146" cy="236" r="52" fill="none" stroke="#0F172A" strokeWidth="14" />
          <rect x="210" y="18" width="60" height="16" rx="4" fill="#1E293B" />
        </svg>
      );

    // Q32: Óleo lubrificante usado -> coleta autorizada
    case 32:
      return (
        <svg viewBox="0 0 480 240" className="w-full h-full" role="img" aria-label="Oficina com galão de óleo lubrificante usado destinado à coleta autorizada">
          <rect width="480" height="240" fill="#F1F5F9" />
          {/* Workshop wall stripe */}
          <rect x="0" y="114" width="480" height="22" fill="#BFDBFE" />
          {/* Green recycling collection drum */}
          <rect x="342" y="112" width="96" height="114" rx="10" fill="#15803D" stroke="#14532D" strokeWidth="2.5" />
          <rect x="338" y="138" width="104" height="8" fill="#166534" />
          <rect x="338" y="180" width="104" height="8" fill="#166534" />
          <text x="390" y="168" textAnchor="middle" fontSize="22" fontWeight="700" fill="#FFFFFF">♻</text>
          {/* Recycling wall poster */}
          <rect x="346" y="22" width="88" height="72" rx="10" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.5" />
          <text x="390" y="54" textAnchor="middle" fontSize="11" fontWeight="800" fill="#15803D">COLETA</text>
          <text x="390" y="72" textAnchor="middle" fontSize="11" fontWeight="800" fill="#15803D">AUTORIZADA</text>
          {/* Mechanic holding used oil container */}
          <g transform="translate(86,28)">
            <circle cx="72" cy="36" r="24" fill="#FDBA74" stroke="#1E293B" strokeWidth="2" />
            <path d="M46 28 Q72 4 98 28 Z" fill="#1D4ED8" />
            <rect x="32" y="64" width="80" height="148" rx="14" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
          </g>
          {/* Used oil jug */}
          <g transform="translate(194,70)">
            <rect x="0" y="20" width="102" height="118" rx="14" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
            <rect x="18" y="4" width="26" height="18" rx="4" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
            <rect x="14" y="42" width="74" height="76" rx="8" fill="#FEF08A" />
            <text x="51" y="74" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0F172A">ÓLEO</text>
            <text x="51" y="90" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0F172A">LUBRIFICANTE</text>
            <text x="51" y="106" textAnchor="middle" fontSize="11" fontWeight="800" fill="#B45309">USADO</text>
          </g>
        </svg>
      );

    default:
      return null;
  }
}
