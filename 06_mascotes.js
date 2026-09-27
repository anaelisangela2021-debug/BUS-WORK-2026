document.addEventListener('DOMContentLoaded', () => {

  // 1. DADOS DE PERFIL DO UTILIZADOR
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const menuUserName = document.getElementById('menuUserName');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');

  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');

  // Prioriza o apelido; se não existir, utiliza o primeiro nome do nome completo
  const apelidoUsuario = savedUserData.apelido || 
                        (savedUserData.nome ? savedUserData.nome.split(' ')[0] : 'Usuário');

  if (userNameDisplay) userNameDisplay.textContent = apelidoUsuario;
  if (menuUserName) menuUserName.textContent = apelidoUsuario;

  if (savedUserData.fotoUrl) {
    const avatarImg = `<img src="${savedUserData.fotoUrl}" alt="Foto" class="w-full h-full object-cover">`;
    if (userAvatarContainer) userAvatarContainer.innerHTML = avatarImg;
    if (menuAvatarPreview) menuAvatarPreview.innerHTML = avatarImg;
  }

  // 2. MENU HAMBÚRGUER (DRAWER)
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const drawerContainer = document.getElementById('drawerContainer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerPanel = document.getElementById('drawerPanel');

  function openDrawer() {
    if (!drawerContainer || !drawerPanel) return;
    drawerContainer.classList.remove('pointer-events-none', 'opacity-0');
    drawerContainer.classList.add('opacity-100');
    drawerPanel.classList.remove('-translate-x-full');
    drawerPanel.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawerContainer || !drawerPanel) return;
    drawerPanel.classList.remove('translate-x-0');
    drawerPanel.classList.add('-translate-x-full');
    drawerContainer.classList.remove('opacity-100');
    drawerContainer.classList.add('opacity-0');
    setTimeout(() => {
      drawerContainer.classList.add('pointer-events-none');
      document.body.style.overflow = '';
    }, 300);
  }

  if (openMenuBtn) openMenuBtn.addEventListener('click', openDrawer);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // 3. BASE DOS MASCOTES VETORIAIS (PADRONIZADO EM VIEWBOX 0 0 100 100)
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

  // 4. ELEMENTOS VETORIAIS DOS ACESSÓRIOS
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

  // 5. ANCORAGEM ANATÔMICA POR MASCOTE
  const PET_ANCHORS = {
    gato:     { hatY: 20, hatScale: 1.0,  glassY: 42, glassScale: 1.0,  clothY: 66, clothScale: 1.0 },
    cachorro: { hatY: 20, hatScale: 1.0,  glassY: 40, glassScale: 1.0,  clothY: 66, clothScale: 1.0 },
    elefante: { hatY: 21, hatScale: 1.15, glassY: 40, glassScale: 1.15, clothY: 66, clothScale: 1.1 },
    girafa:   { hatY: 12, hatScale: 0.85, glassY: 32, glassScale: 0.85, clothY: 66, clothScale: 0.9 },
    leao:     { hatY: 12, hatScale: 1.1,  glassY: 42, glassScale: 1.1,  clothY: 66, clothScale: 1.05 },
    onca:     { hatY: 20, hatScale: 1.0,  glassY: 42, glassScale: 1.0,  clothY: 66, clothScale: 1.0 },
    pneu:     { hatY: 8,  hatScale: 1.15, glassY: 46, glassScale: 1.25, clothY: 68, clothScale: 1.1 }
  };

  const NAMES_MAP = {
    blue_dot: { name: "Bolinha Azul Tradicional", sub: "Ícone oficial do GPS do mapa" },
    gato: { name: "Gatinho Fofo", sub: "Mascote personalizável do mapa" },
    cachorro: { name: "Cãozinho Fofo", sub: "Mascote personalizável do mapa" },
    elefante: { name: "Elefantinho Fofo", sub: "Mascote personalizável do mapa" },
    girafa: { name: "Girafinha Fofa", sub: "Mascote personalizável do mapa" },
    leao: { name: "Leãozinho Fofo", sub: "Mascote personalizável do mapa" },
    onca: { name: "Oncinha Pintada", sub: "Mascote personalizável do mapa" },
    pneu: { name: "Pneu BUS Fofinho", sub: "Mascote oficial do aplicativo" }
  };

  // ESTADO DA SELEÇÃO
  let currentSelection = JSON.parse(localStorage.getItem('buswork_user_mascot') || JSON.stringify({
    pet: 'gato',
    hat: 'none',
    glasses: 'none',
    clothes: 'none'
  }));

  const mascotSvgLayer = document.getElementById('mascotSvgLayer');
  const mascotNameTag = document.getElementById('mascotNameTag');
  const mascotSubtitle = document.getElementById('mascotSubtitle');
  const accessoriesSection = document.getElementById('accessoriesSection');
  const floorShadow = document.getElementById('floorShadow');

  // FUNÇÃO DE RENDERIZAÇÃO
  function renderScreen() {
    const petKey = currentSelection.pet || 'gato';

    // 1. Atualiza Nome e Subtítulo
    if (mascotNameTag) mascotNameTag.textContent = NAMES_MAP[petKey]?.name || "Mascote";
    if (mascotSubtitle) mascotSubtitle.textContent = NAMES_MAP[petKey]?.sub || "Ícone no mapa";

    // 2. Trata Bolinha Azul vs Mascotes Animados
    if (petKey === 'blue_dot') {
      if (accessoriesSection) accessoriesSection.classList.add('hidden');
      if (floorShadow) floorShadow.classList.add('hidden');

      if (mascotSvgLayer) {
        mascotSvgLayer.innerHTML = `
          <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${MASCOT_SVGS.blue_dot}
          </svg>
        `;
      }
    } else {
      if (accessoriesSection) accessoriesSection.classList.remove('hidden');
      if (floorShadow) floorShadow.classList.remove('hidden');

      const anchor = PET_ANCHORS[petKey] || PET_ANCHORS.gato;

      const hatSvg = ACCESSORY_SVG_ITEMS.hat[currentSelection.hat] ? `
        <g transform="translate(50, ${anchor.hatY}) scale(${anchor.hatScale}) translate(-50, -20)">
          ${ACCESSORY_SVG_ITEMS.hat[currentSelection.hat]}
        </g>
      ` : '';

      const glassesSvg = ACCESSORY_SVG_ITEMS.glasses[currentSelection.glasses] ? `
        <g transform="translate(50, ${anchor.glassY}) scale(${anchor.glassScale}) translate(-50, -42)">
          ${ACCESSORY_SVG_ITEMS.glasses[currentSelection.glasses]}
        </g>
      ` : '';

      const clothesSvg = ACCESSORY_SVG_ITEMS.clothes[currentSelection.clothes] ? `
        <g transform="translate(50, ${anchor.clothY}) scale(${anchor.clothScale}) translate(-50, -66)">
          ${ACCESSORY_SVG_ITEMS.clothes[currentSelection.clothes]}
        </g>
      ` : '';

      if (mascotSvgLayer) {
        mascotSvgLayer.innerHTML = `
          <svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            ${MASCOT_SVGS[petKey] || MASCOT_SVGS.gato}
            ${clothesSvg}
            ${glassesSvg}
            ${hatSvg}
          </svg>
        `;
      }

      updateAccHighlight('#hatOptions', 'data-hat', currentSelection.hat);
      updateAccHighlight('#glassesOptions', 'data-glasses', currentSelection.glasses);
      updateAccHighlight('#clothesOptions', 'data-clothes', currentSelection.clothes);
    }

    // 3. Destaque do Botão Selecionado
    document.querySelectorAll('.pet-btn').forEach(btn => {
      const isSelected = btn.getAttribute('data-pet') === petKey;
      if (isSelected) {
        btn.classList.add('border-[#FFD600]', 'bg-[#FFD600]/10', 'shadow-[0_0_15px_rgba(255,214,0,0.25)]');
        btn.classList.remove('border-gray-800');
      } else {
        btn.classList.remove('border-[#FFD600]', 'bg-[#FFD600]/10', 'shadow-[0_0_15px_rgba(255,214,0,0.25)]');
        btn.classList.add('border-gray-800');
      }
    });
  }

  function updateAccHighlight(containerId, attr, selectedValue) {
    document.querySelectorAll(`${containerId} .acc-btn`).forEach(btn => {
      if (btn.getAttribute(attr) === selectedValue) {
        btn.classList.add('bg-[#FFD600]', 'text-black', 'border-[#FFD600]');
        btn.classList.remove('bg-gray-800', 'text-white');
      } else {
        btn.classList.remove('bg-[#FFD600]', 'text-black', 'border-[#FFD600]');
        btn.classList.add('bg-gray-800', 'text-white');
      }
    });
  }

  // EVENTOS DE CLIQUE NOS MASCOTES
  document.querySelectorAll('.pet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSelection.pet = btn.getAttribute('data-pet');
      renderScreen();
    });
  });

  // EVENTOS DE CLIQUE NOS ACESSÓRIOS
  document.querySelectorAll('#hatOptions .acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSelection.hat = btn.getAttribute('data-hat');
      renderScreen();
    });
  });

  document.querySelectorAll('#glassesOptions .acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSelection.glasses = btn.getAttribute('data-glasses');
      renderScreen();
    });
  });

  document.querySelectorAll('#clothesOptions .acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSelection.clothes = btn.getAttribute('data-clothes');
      renderScreen();
    });
  });

  // BOTÃO SALVAR
  const saveMascotBtn = document.getElementById('saveMascotBtn');
  if (saveMascotBtn) {
    saveMascotBtn.addEventListener('click', () => {
      localStorage.setItem('buswork_user_mascot', JSON.stringify(currentSelection));

      saveMascotBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Salvo com Sucesso!</span>
      `;
      saveMascotBtn.classList.remove('bg-[#FFD600]');
      saveMascotBtn.classList.add('bg-emerald-500', 'text-white');

      setTimeout(() => {
        saveMascotBtn.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          <span>Salvar Seleção do Mapa</span>
        `;
        saveMascotBtn.classList.remove('bg-emerald-500', 'text-white');
        saveMascotBtn.classList.add('bg-[#FFD600]', 'text-black');
      }, 2000);
    });
  }

  // GEOLOCALIZAÇÃO
  const userCityDisplay = document.getElementById('userCityDisplay');
  const menuCityDisplay = document.getElementById('menuCityDisplay');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
          .then(res => res.json())
          .then(data => {
            const city = data.address?.city || data.address?.town || data.address?.village || "Campo Mourão";
            const state = data.address?.state_code ? data.address.state_code.toUpperCase() : "PR";
            const cityText = `${city} - ${state}`;
            if (userCityDisplay) userCityDisplay.textContent = cityText;
            if (menuCityDisplay) menuCityDisplay.textContent = cityText;
          })
          .catch(() => {
            if (userCityDisplay) userCityDisplay.textContent = "Campo Mourão - PR";
          });
      },
      () => {
        if (userCityDisplay) userCityDisplay.textContent = "Campo Mourão - PR";
      },
      { timeout: 5000 }
    );
  }

  // RENDERIZAÇÃO INICIAL
  renderScreen();

});