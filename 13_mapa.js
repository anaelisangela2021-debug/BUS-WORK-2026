document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. INJEÇÃO DE ESTILOS CSS PARA OS ÍCONES
  // ==========================================
  const customMapStyles = document.createElement('style');
  customMapStyles.innerHTML = `
    .custom-leaflet-icon {
      background: transparent !important;
      border: none !important;
    }
    .user-mascot-pin {
      position: relative;
      width: 54px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-mascot-badge {
      width: 50px;
      height: 50px;
      filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.4));
      transition: transform 0.2s ease;
    }
    .user-mascot-badge:hover {
      transform: scale(1.1);
    }
    .bus-stop-marker {
      width: 14px;
      height: 14px;
      background-color: #3B82F6;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(0,0,0,0.5);
    }
    .destination-flag-marker {
      font-size: 24px;
      line-height: 1;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    .bus-live-marker {
      font-size: 28px;
      line-height: 1;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
    }
  `;
  document.head.appendChild(customMapStyles);

  // ==========================================
  // 1. DICIONÁRIO VETORIAL DOS MASCOTES E ACESSÓRIOS
  // ==========================================
  const MASCOT_SVGS = {
    blue_dot: `
      <g id="mascot-blue-dot">
        <circle cx="50" cy="50" r="32" fill="#2563EB" opacity="0.35">
          <animate attributeName="r" values="24;38;24" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="50" r="22" fill="#2563EB" stroke="#FFFFFF" stroke-width="3"/>
        <circle cx="50" cy="50" r="7" fill="#FFFFFF"/>
      </g>
    `,
    gato: `
      <g id="mascot-body">
        <path d="M25 35 L15 15 L38 25 Z" fill="#71717A" stroke="#18181B" stroke-width="3"/>
        <path d="M75 35 L85 15 L62 25 Z" fill="#71717A" stroke="#18181B" stroke-width="3"/>
        <path d="M22 30 L17 18 L32 24 Z" fill="#F472B6"/>
        <path d="M78 30 L83 18 L68 24 Z" fill="#F472B6"/>
        <ellipse cx="50" cy="72" rx="24" ry="20" fill="#A1A1AA" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="45" rx="32" ry="26" fill="#A1A1AA" stroke="#18181B" stroke-width="3"/>
        <circle cx="38" cy="42" r="6" fill="#18181B"/>
        <circle cx="62" cy="42" r="6" fill="#18181B"/>
        <circle cx="36" cy="40" r="2" fill="#FFFFFF"/>
        <circle cx="60" cy="40" r="2" fill="#FFFFFF"/>
        <ellipse cx="32" cy="48" rx="4" ry="2.5" fill="#F472B6" opacity="0.7"/>
        <ellipse cx="68" cy="48" rx="4" ry="2.5" fill="#F472B6" opacity="0.7"/>
        <polygon points="50,47 47,45 53,45" fill="#F472B6"/>
        <path d="M47 50 Q50 53 53 50" fill="none" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="40" cy="88" rx="6" ry="4" fill="#E4E4E7" stroke="#18181B" stroke-width="2"/>
        <ellipse cx="60" cy="88" rx="6" ry="4" fill="#E4E4E7" stroke="#18181B" stroke-width="2"/>
      </g>
    `,
    cachorro: `
      <g id="mascot-body">
        <path d="M15 30 Q10 55 22 55 Q28 45 25 32 Z" fill="#D97706" stroke="#18181B" stroke-width="3"/>
        <path d="M85 30 Q90 55 78 55 Q72 45 75 32 Z" fill="#D97706" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="72" rx="24" ry="20" fill="#F59E0B" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="45" rx="30" ry="25" fill="#F59E0B" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="50" rx="14" ry="10" fill="#FEF3C7"/>
        <circle cx="38" cy="40" r="5.5" fill="#18181B"/>
        <circle cx="62" cy="40" r="5.5" fill="#18181B"/>
        <circle cx="36" cy="38" r="2" fill="#FFFFFF"/>
        <circle cx="60" cy="38" r="2" fill="#FFFFFF"/>
        <ellipse cx="32" cy="46" rx="4" ry="2.5" fill="#F472B6" opacity="0.6"/>
        <ellipse cx="68" cy="46" rx="4" ry="2.5" fill="#F472B6" opacity="0.6"/>
        <ellipse cx="50" cy="46" rx="4" ry="3" fill="#18181B"/>
        <path d="M46 51 Q50 55 54 51" fill="none" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="40" cy="88" rx="6" ry="4" fill="#FEF3C7" stroke="#18181B" stroke-width="2"/>
        <ellipse cx="60" cy="88" rx="6" ry="4" fill="#FEF3C7" stroke="#18181B" stroke-width="2"/>
      </g>
    `,
    elefante: `
      <g id="mascot-body">
        <circle cx="22" cy="42" r="18" fill="#60A5FA" stroke="#18181B" stroke-width="3"/>
        <circle cx="78" cy="42" r="18" fill="#60A5FA" stroke="#18181B" stroke-width="3"/>
        <circle cx="22" cy="42" r="11" fill="#93C5FD"/>
        <circle cx="78" cy="42" r="11" fill="#93C5FD"/>
        <ellipse cx="50" cy="72" rx="25" ry="20" fill="#93C5FD" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="45" rx="28" ry="24" fill="#93C5FD" stroke="#18181B" stroke-width="3"/>
        <circle cx="38" cy="40" r="5" fill="#18181B"/>
        <circle cx="62" cy="40" r="5" fill="#18181B"/>
        <circle cx="36" cy="38" r="1.8" fill="#FFFFFF"/>
        <circle cx="60" cy="38" r="1.8" fill="#FFFFFF"/>
        <path d="M50 46 Q50 62 58 58 Q62 55 58 52" fill="none" stroke="#60A5FA" stroke-width="7" stroke-linecap="round"/>
        <path d="M50 46 Q50 62 58 58 Q62 55 58 52" fill="none" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="38" cy="88" rx="6" ry="4" fill="#BFDBFE" stroke="#18181B" stroke-width="2"/>
        <ellipse cx="62" cy="88" rx="6" ry="4" fill="#BFDBFE" stroke="#18181B" stroke-width="2"/>
      </g>
    `,
    girafa: `
      <g id="mascot-body">
        <line x1="42" y1="22" x2="42" y2="12" stroke="#18181B" stroke-width="3"/>
        <line x1="58" y1="22" x2="58" y2="12" stroke="#18181B" stroke-width="3"/>
        <circle cx="42" cy="11" r="3.5" fill="#D97706"/>
        <circle cx="58" cy="11" r="3.5" fill="#D97706"/>
        <ellipse cx="50" cy="75" rx="22" ry="18" fill="#FBBF24" stroke="#18181B" stroke-width="3"/>
        <path d="M42 50 L42 70 L58 70 L58 50 Z" fill="#FBBF24" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="36" rx="24" ry="20" fill="#FBBF24" stroke="#18181B" stroke-width="3"/>
        <circle cx="48" cy="60" r="3" fill="#B45309"/>
        <circle cx="54" cy="65" r="2.5" fill="#B45309"/>
        <circle cx="50" cy="22" r="3" fill="#B45309"/>
        <ellipse cx="50" cy="42" rx="12" ry="8" fill="#FEF3C7" stroke="#18181B" stroke-width="2"/>
        <circle cx="38" cy="32" r="5" fill="#18181B"/>
        <circle cx="62" cy="32" r="5" fill="#18181B"/>
        <circle cx="36" cy="30" r="1.8" fill="#FFFFFF"/>
        <circle cx="60" cy="30" r="1.8" fill="#FFFFFF"/>
      </g>
    `,
    leao: `
      <g id="mascot-body">
        <circle cx="50" cy="45" r="36" fill="#B45309" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="72" rx="22" ry="18" fill="#FBBF24" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="45" rx="26" ry="22" fill="#FBBF24" stroke="#18181B" stroke-width="3"/>
        <circle cx="38" cy="42" r="5" fill="#18181B"/>
        <circle cx="62" cy="42" r="5" fill="#18181B"/>
        <circle cx="36" cy="40" r="1.8" fill="#FFFFFF"/>
        <circle cx="60" cy="40" r="1.8" fill="#FFFFFF"/>
        <polygon points="50,47 46,44 54,44" fill="#B45309"/>
        <path d="M46 50 Q50 54 54 50" fill="none" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="32" cy="48" rx="4" ry="2.5" fill="#F472B6" opacity="0.6"/>
        <ellipse cx="68" cy="48" rx="4" ry="2.5" fill="#F472B6" opacity="0.6"/>
      </g>
    `,
    onca: `
      <g id="mascot-body">
        <path d="M25 30 L18 15 L35 22 Z" fill="#F59E0B" stroke="#18181B" stroke-width="3"/>
        <path d="M75 30 L82 15 L65 22 Z" fill="#F59E0B" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="72" rx="22" ry="18" fill="#FBBF24" stroke="#18181B" stroke-width="3"/>
        <ellipse cx="50" cy="45" rx="28" ry="23" fill="#FBBF24" stroke="#18181B" stroke-width="3"/>
        <circle cx="32" cy="30" r="2" fill="#78350F"/>
        <circle cx="68" cy="30" r="2" fill="#78350F"/>
        <circle cx="50" cy="26" r="2.5" fill="#78350F"/>
        <circle cx="30" cy="68" r="2" fill="#78350F"/>
        <circle cx="70" cy="68" r="2" fill="#78350F"/>
        <circle cx="38" cy="42" r="5" fill="#18181B"/>
        <circle cx="62" cy="42" r="5" fill="#18181B"/>
        <circle cx="36" cy="40" r="1.8" fill="#FFFFFF"/>
        <circle cx="60" cy="40" r="1.8" fill="#FFFFFF"/>
        <ellipse cx="50" cy="48" rx="8" ry="5" fill="#FEF3C7"/>
        <polygon points="50,47 47,45 53,45" fill="#78350F"/>
      </g>
    `,
    pneu: `
      <g id="mascot-body">
        <circle cx="50" cy="50" r="42" fill="#27272A" stroke="#18181B" stroke-width="3.5"/>
        <path d="M50 10 L50 15 M50 85 L50 90 M10 50 L15 50 M85 50 L90 50 M22 22 L26 26 M74 74 L78 78 M22 78 L26 74 M74 22 L78 26" stroke="#52525B" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="28" fill="#FFD600" stroke="#18181B" stroke-width="3"/>
        <circle cx="50" cy="50" r="21" fill="#FEF08A"/>
        <circle cx="41" cy="46" r="5.5" fill="#18181B"/>
        <circle cx="59" cy="46" r="5.5" fill="#18181B"/>
        <circle cx="39" cy="44" r="2" fill="#FFFFFF"/>
        <circle cx="57" cy="44" r="2" fill="#FFFFFF"/>
        <circle cx="42.5" cy="47.5" r="0.8" fill="#FFFFFF"/>
        <circle cx="60.5" cy="47.5" r="0.8" fill="#FFFFFF"/>
        <ellipse cx="35" cy="52" rx="4" ry="2.5" fill="#F472B6" opacity="0.8"/>
        <ellipse cx="65" cy="52" rx="4" ry="2.5" fill="#F472B6" opacity="0.8"/>
        <path d="M46 51 Q50 56 54 51" fill="none" stroke="#18181B" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M48 53 Q50 56 52 53" fill="#EF4444"/>
      </g>
    `
  };

  const ACCESSORY_SVG_ITEMS = {
    glasses: {
      none: '',
      sun: `
        <g id="acc-glasses-sun">
          <rect x="25" y="36" width="22" height="13" rx="3" fill="#111827" stroke="#1F2937" stroke-width="1.5"/>
          <rect x="53" y="36" width="22" height="13" rx="3" fill="#111827" stroke="#1F2937" stroke-width="1.5"/>
          <line x1="47" y1="40" x2="53" y2="40" stroke="#111827" stroke-width="2.5"/>
          <line x1="28" y1="38" x2="36" y2="38" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
          <line x1="56" y1="38" x2="64" y2="38" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
        </g>
      `,
      read: `
        <g id="acc-glasses-read">
          <circle cx="36" cy="41" r="9" fill="#FFFFFF" fill-opacity="0.2" stroke="#D97706" stroke-width="2.2"/>
          <circle cx="64" cy="41" r="9" fill="#FFFFFF" fill-opacity="0.2" stroke="#D97706" stroke-width="2.2"/>
          <line x1="45" y1="41" x2="55" y2="41" stroke="#D97706" stroke-width="2.2"/>
        </g>
      `
    },
    hat: {
      none: '',
      cap: `
        <g id="acc-hat-cap">
          <path d="M 32 20 A 18 14 0 0 1 68 20 Z" fill="#EF4444" stroke="#18181B" stroke-width="2"/>
          <ellipse cx="64" cy="21" rx="14" ry="4" fill="#DC2626" stroke="#18181B" stroke-width="2"/>
          <circle cx="50" cy="7" r="2.5" fill="#FFD600" stroke="#18181B" stroke-width="1"/>
        </g>
      `,
      crown: `
        <g id="acc-hat-crown">
          <polygon points="30,22 34,7 42,14 50,5 58,14 66,7 70,22" fill="#FFD600" stroke="#18181B" stroke-width="2"/>
          <circle cx="34" cy="7" r="2" fill="#EF4444"/>
          <circle cx="50" cy="5" r="2.5" fill="#3B82F6"/>
          <circle cx="66" cy="7" r="2" fill="#EF4444"/>
        </g>
      `,
      party: `
        <g id="acc-hat-party">
          <polygon points="50,2 34,22 66,22" fill="#EC4899" stroke="#18181B" stroke-width="2"/>
          <path d="M 39,16 L 61,16" stroke="#FFD600" stroke-width="2.5"/>
          <path d="M 43,10 L 57,10" stroke="#60A5FA" stroke-width="2.5"/>
          <circle cx="50" cy="2" r="3.5" fill="#FFD600" stroke="#18181B" stroke-width="1"/>
        </g>
      `
    },
    clothes: {
      none: '',
      tie: `
        <g id="acc-clothes-tie">
          <polygon points="46,64 54,64 52,67 48,67" fill="#18181B"/>
          <polygon points="47,67 53,67 55,80 50,85 45,80" fill="#DC2626" stroke="#18181B" stroke-width="1.5"/>
        </g>
      `,
      bow: `
        <g id="acc-clothes-bow">
          <polygon points="50,66 37,60 37,72" fill="#F472B6" stroke="#18181B" stroke-width="1.5"/>
          <polygon points="50,66 63,60 63,72" fill="#F472B6" stroke="#18181B" stroke-width="1.5"/>
          <circle cx="50" cy="66" r="3.5" fill="#EC4899" stroke="#18181B" stroke-width="1.5"/>
        </g>
      `,
      shirt: `
        <g id="acc-clothes-shirt">
          <path d="M34 68 L42 63 L58 63 L66 68 L62 83 L38 83 Z" fill="#2563EB" stroke="#18181B" stroke-width="2"/>
          <path d="M46 63 C48 66 52 66 54 63" fill="none" stroke="#18181B" stroke-width="2"/>
          <text x="50" y="76" font-family="'Arial Black', sans-serif" font-weight="900" font-size="5" fill="#FFD600" text-anchor="middle">BUS</text>
        </g>
      `
    }
  };

  const PET_ANCHORS = {
    gato:     { hatY: 20, hatScale: 1.0,  glassY: 42, glassScale: 1.0,  clothY: 66, clothScale: 1.0 },
    cachorro: { hatY: 20, hatScale: 1.0,  glassY: 40, glassScale: 1.0,  clothY: 66, clothScale: 1.0 },
    elefante: { hatY: 21, hatScale: 1.15, glassY: 40, glassScale: 1.15, clothY: 66, clothScale: 1.1 },
    girafa:   { hatY: 12, hatScale: 0.85, glassY: 32, glassScale: 0.85, clothY: 66, clothScale: 0.9 },
    leao:     { hatY: 12, hatScale: 1.1,  glassY: 42, glassScale: 1.1,  clothY: 66, clothScale: 1.05 },
    onca:     { hatY: 20, hatScale: 1.0,  glassY: 42, glassScale: 1.0,  clothY: 66, clothScale: 1.0 },
    pneu:     { hatY: 8,  hatScale: 1.15, glassY: 46, glassScale: 1.25, clothY: 68, clothScale: 1.1 }
  };

  // ==========================================
  // 2. CONSTRUTOR DO HTML DO MASCOTE SELECIONADO
  // ==========================================
  function generateUserMascotHTML() {
    let mascotConfig = {};
    try {
      mascotConfig = JSON.parse(localStorage.getItem('buswork_user_mascot') || '{}');
    } catch (e) {
      console.warn('Erro ao ler configuração do mascote:', e);
    }

    const petKey = mascotConfig.pet || 'gato';

    // Se for a bolinha azul simples
    if (petKey === 'blue_dot') {
      return `
        <div class="user-mascot-pin">
          <div class="user-mascot-badge">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              ${MASCOT_SVGS.blue_dot}
            </svg>
          </div>
        </div>
      `;
    }

    // Se for mascote com acessórios
    const anchor = PET_ANCHORS[petKey] || PET_ANCHORS.gato;

    const hatSvg = (mascotConfig.hat && ACCESSORY_SVG_ITEMS.hat[mascotConfig.hat]) ? `
      <g transform="translate(50, ${anchor.hatY}) scale(${anchor.hatScale}) translate(-50, -20)">
        ${ACCESSORY_SVG_ITEMS.hat[mascotConfig.hat]}
      </g>
    ` : '';

    const glassesSvg = (mascotConfig.glasses && ACCESSORY_SVG_ITEMS.glasses[mascotConfig.glasses]) ? `
      <g transform="translate(50, ${anchor.glassY}) scale(${anchor.glassScale}) translate(-50, -42)">
        ${ACCESSORY_SVG_ITEMS.glasses[mascotConfig.glasses]}
      </g>
    ` : '';

    const clothesSvg = (mascotConfig.clothes && ACCESSORY_SVG_ITEMS.clothes[mascotConfig.clothes]) ? `
      <g transform="translate(50, ${anchor.clothY}) scale(${anchor.clothScale}) translate(-50, -66)">
        ${ACCESSORY_SVG_ITEMS.clothes[mascotConfig.clothes]}
      </g>
    ` : '';

    const bodySvg = MASCOT_SVGS[petKey] || MASCOT_SVGS.gato;

    return `
      <div class="user-mascot-pin">
        <div class="user-mascot-badge">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${bodySvg}
            ${clothesSvg}
            ${glassesSvg}
            ${hatSvg}
          </svg>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 3. INICIALIZAÇÃO DO MAPA LEAFLET (CAMADA TRANSPORT MAP)
  // ==========================================
  const defaultCoords = [-24.04619, -52.40178]; 
  
  const map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView(defaultCoords, 14);

  // TileLayer do OpenStreetMap Transport Map (ÖPNVkarte)
  L.tileLayer('https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // ==========================================
  // 4. GEOLOCALIZAÇÃO EM TEMPO REAL DO USUÁRIO
  // ==========================================
  let userLatLng = defaultCoords;
  let userMarker = null;
  let isFirstFix = true;

  const userMascotIcon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: generateUserMascotHTML(),
    iconSize: [54, 54],
    iconAnchor: [27, 27]
  });

  function updateUserPosition(coords) {
    userLatLng = coords;

    if (userMarker) {
      userMarker.setLatLng(coords);
    } else {
      userMarker = L.marker(coords, { icon: userMascotIcon }).addTo(map);
      userMarker.bindPopup('<b>Você está aqui</b>');
    }

    if (isFirstFix) {
      map.setView(coords, 16);
      isFirstFix = false;
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const liveCoords = [pos.coords.latitude, pos.coords.longitude];
        updateUserPosition(liveCoords);
      },
      (err) => {
        console.warn('Erro ao obter GPS do dispositivo:', err.message);
        updateUserPosition(defaultCoords);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  } else {
    updateUserPosition(defaultCoords);
  }

  // Botão Recentralizar (se houver na interface)
  const recenterBtn = document.getElementById('recenterBtn');
  if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
      map.flyTo(userLatLng, 17, { duration: 1.2 });
    });
  }

  // ==========================================
  // 5. CHECAGEM DE TRAJETO ATIVO
  // ==========================================
  function isRouteActive() {
    const trajetoIniciado = localStorage.getItem('trajeto_iniciado') === 'true';
    const activeRouteData = localStorage.getItem('buswork_active_route');
    return trajetoIniciado || Boolean(activeRouteData);
  }

  function renderActiveRoute() {
    const startPos = [-24.0431, -52.3787];
    const busStopBoarding = [-24.0450, -52.3760];
    const busStopAlighting = [-24.0520, -52.3680];
    const finalDestination = [-24.0535, -52.3665];

    // Caminhada Inicial (Pontilhado Azul)
    const walkToBusPolyline = L.polyline([startPos, busStopBoarding], {
      color: '#3B82F6',
      weight: 4,
      dashArray: '6, 8',
      opacity: 0.9
    }).addTo(map);

    // Linha de Ônibus (Amarelo)
    const busRouteCoords = [
      busStopBoarding,
      [-24.0470, -52.3730],
      [-24.0495, -52.3705],
      busStopAlighting
    ];

    const busLinePolyline = L.polyline(busRouteCoords, {
      color: '#FFD600',
      weight: 6,
      opacity: 0.95
    }).addTo(map);

    // Caminhada Final (Pontilhado Azul)
    const walkToDestPolyline = L.polyline([busStopAlighting, finalDestination], {
      color: '#3B82F6',
      weight: 4,
      dashArray: '6, 8',
      opacity: 0.9
    }).addTo(map);

    // Marcadores dos Pontos de Ônibus
    L.marker(busStopBoarding, {
      icon: L.divIcon({
        className: 'custom-leaflet-icon',
        html: `<div class="bus-stop-marker"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      })
    }).addTo(map).bindPopup('<b>Ponto de Embarque</b>');

    L.marker(busStopAlighting, {
      icon: L.divIcon({
        className: 'custom-leaflet-icon',
        html: `<div class="bus-stop-marker"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      })
    }).addTo(map).bindPopup('<b>Ponto de Desembarque</b>');

    L.marker(finalDestination, {
      icon: L.divIcon({
        className: 'custom-leaflet-icon',
        html: `<div class="destination-flag-marker">🏁</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      })
    }).addTo(map).bindPopup('<b>Destino Final</b>');

    // Ônibus em Movimento
    let busStep = 0;
    const liveBusMarker = L.marker(busRouteCoords[0], {
      icon: L.divIcon({
        className: 'custom-leaflet-icon',
        html: `<div class="bus-live-marker">🚌</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      })
    }).addTo(map);

    setInterval(() => {
      busStep = (busStep + 1) % busRouteCoords.length;
      liveBusMarker.setLatLng(busRouteCoords[busStep]);
    }, 4000);

    // Ajusta o zoom do mapa para mostrar toda a rota
    const routeBounds = L.featureGroup([walkToBusPolyline, busLinePolyline, walkToDestPolyline]);
    map.fitBounds(routeBounds.getBounds(), { padding: [40, 40] });
  }

  if (isRouteActive()) {
    renderActiveRoute();
  }

});