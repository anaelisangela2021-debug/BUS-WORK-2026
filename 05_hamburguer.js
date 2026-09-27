document.addEventListener('DOMContentLoaded', () => {

  // 1. DADOS DE PERFIL
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const menuUserName = document.getElementById('menuUserName');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');

  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');
  const nomeUsuario = savedUserData.nome || 'Usuário';

  if (userNameDisplay) userNameDisplay.textContent = nomeUsuario;
  if (menuUserName) menuUserName.textContent = nomeUsuario;

  if (savedUserData.fotoUrl) {
    const avatarImg = `<img src="${savedUserData.fotoUrl}" alt="Foto" class="w-full h-full object-cover">`;
    if (userAvatarContainer) userAvatarContainer.innerHTML = avatarImg;
    if (menuAvatarPreview) menuAvatarPreview.innerHTML = avatarImg;
  }

  // 2. MENU HAMBÚRGUER
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const drawerContainer = document.getElementById('drawerContainer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerPanel = document.getElementById('drawerPanel');

  function openDrawer() {
    drawerContainer.classList.remove('pointer-events-none', 'opacity-0');
    drawerContainer.classList.add('opacity-100');
    drawerPanel.classList.remove('-translate-x-full');
    drawerPanel.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
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

  // 3. ILUSTRAÇÕES VETORIAIS (VETORES SVG KAWAII)
  const MASCOT_SVGS = {
    blue_dot: `
      <div class="relative flex items-center justify-center">
        <div class="w-20 h-20 rounded-full bg-blue-500/30 animate-ping absolute"></div>
        <div class="w-20 h-20 rounded-full bg-blue-600 border-4 border-white shadow-[0_0_25px_rgba(37,99,235,0.9)] flex items-center justify-center relative z-10">
          <div class="w-6 h-6 bg-white rounded-full shadow-inner"></div>
        </div>
      </div>
    `,
    gato: `
      <svg class="w-44 h-44" viewBox="0 0 100 100">
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
      </svg>
    `,
    cachorro: `
      <svg class="w-44 h-44" viewBox="0 0 100 100">
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
      </svg>
    `,
    elefante: `
      <svg class="w-44 h-44" viewBox="0 0 100 100">
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
      </svg>
    `,
    girafa: `
      <svg class="w-44 h-44" viewBox="0 0 100 100">
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
      </svg>
    `,
    leao: `
      <svg class="w-44 h-44" viewBox="0 0 100 100">
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
      </svg>
    `,
    onca: `
      <svg class="w-44 h-44" viewBox="0 0 100 100">
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
      </svg>
    `,
    pneu: `
      <!-- PNEU MASCOTE ULTRA FOFINHO KAWAII -->
      <svg class="w-44 h-44" viewBox="0 0 100 100">
        <!-- Borracha do Pneu Externa -->
        <circle cx="50" cy="50" r="42" fill="#27272A" stroke="#18181B" stroke-width="3.5"/>
        <!-- Ranhuras do Pneu fofinhas -->
        <path d="M50 10 L50 15 M50 85 L50 90 M10 50 L15 50 M85 50 L90 50 M22 22 L26 26 M74 74 L78 78 M22 78 L26 74 M74 22 L78 26" stroke="#52525B" stroke-width="3" stroke-linecap="round"/>
        <!-- Rodinha Amarela Bus Work (Aresta Interna) -->
        <circle cx="50" cy="50" r="28" fill="#FFD600" stroke="#18181B" stroke-width="3"/>
        <circle cx="50" cy="50" r="21" fill="#FEF08A"/>
        
        <!-- Olhos Grandes e Brilhantes Kawaii -->
        <circle cx="41" cy="46" r="5.5" fill="#18181B"/>
        <circle cx="59" cy="46" r="5.5" fill="#18181B"/>
        <circle cx="39" cy="44" r="2" fill="#FFFFFF"/>
        <circle cx="57" cy="44" r="2" fill="#FFFFFF"/>
        <circle cx="42.5" cy="47.5" r="0.8" fill="#FFFFFF"/>
        <circle cx="60.5" cy="47.5" r="0.8" fill="#FFFFFF"/>

        <!-- Bochechinhas Rosadas -->
        <ellipse cx="35" cy="52" rx="4" ry="2.5" fill="#F472B6" opacity="0.8"/>
        <ellipse cx="65" cy="52" rx="4" ry="2.5" fill="#F472B6" opacity="0.8"/>

        <!-- Sorriso Fofo -->
        <path d="M46 51 Q50 56 54 51" fill="none" stroke="#18181B" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Língua fofa -->
        <path d="M48 53 Q50 56 52 53" fill="#EF4444"/>
      </svg>
    `
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

  // 4. MAPA DE ACESSÓRIOS DIVERGENTES (SOBREPOSIÇÃO)
  const ACCESSORY_RENDER = {
    hat: {
      none: '',
      cap: `<div class="text-4xl transform -translate-y-2">🧢</div>`,
      crown: `<div class="text-4xl transform -translate-y-3">👑</div>`,
      party: `<div class="text-4xl transform -translate-y-3">🥳</div>`
    },
    glasses: {
      none: '',
      sun: `<div class="text-3xl transform translate-y-1">🕶️</div>`,
      read: `<div class="text-3xl transform translate-y-1">👓</div>`
    },
    clothes: {
      none: '',
      tie: `<div class="text-3xl transform translate-y-3">👔</div>`,
      bow: `<div class="text-3xl transform translate-y-2">🎀</div>`,
      shirt: `<div class="text-3xl transform translate-y-4">👕</div>`
    }
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

  const hatOverlay = document.getElementById('hatOverlay');
  const glassesOverlay = document.getElementById('glassesOverlay');
  const clothesOverlay = document.getElementById('clothesOverlay');

  // RENDERIZA A TELA E O PALCO DE PREVIEW
  function renderScreen() {
    const petKey = currentSelection.pet || 'gato';

    // 1. Atualiza SVG e Textos
    if (mascotSvgLayer) mascotSvgLayer.innerHTML = MASCOT_SVGS[petKey] || MASCOT_SVGS.gato;
    if (mascotNameTag) mascotNameTag.textContent = NAMES_MAP[petKey]?.name || "Mascote";
    if (mascotSubtitle) mascotSubtitle.textContent = NAMES_MAP[petKey]?.sub || "Ícone no mapa";

    // 2. Destaca o Mascote Selecionado na Grade com borda e fundo amarelado
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

    // 3. Regra para Bolinha Azul vs Mascotes com Acessórios
    if (petKey === 'blue_dot') {
      if (accessoriesSection) accessoriesSection.classList.add('hidden');
      if (floorShadow) floorShadow.classList.add('hidden');
      if (hatOverlay) hatOverlay.innerHTML = '';
      if (glassesOverlay) glassesOverlay.innerHTML = '';
      if (clothesOverlay) clothesOverlay.innerHTML = '';
    } else {
      if (accessoriesSection) accessoriesSection.classList.remove('hidden');
      if (floorShadow) floorShadow.classList.remove('hidden');

      // Aplica Acessórios
      if (hatOverlay) hatOverlay.innerHTML = ACCESSORY_RENDER.hat[currentSelection.hat] || '';
      if (glassesOverlay) glassesOverlay.innerHTML = ACCESSORY_RENDER.glasses[currentSelection.glasses] || '';
      if (clothesOverlay) clothesOverlay.innerHTML = ACCESSORY_RENDER.clothes[currentSelection.clothes] || '';

      // Atualiza destaques dos botões de acessórios
      updateAccHighlight('#hatOptions', 'data-hat', currentSelection.hat);
      updateAccHighlight('#glassesOptions', 'data-glasses', currentSelection.glasses);
      updateAccHighlight('#clothesOptions', 'data-clothes', currentSelection.clothes);
    }
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

  // CLIQUES NA GRADE DE MASCOTES
  document.querySelectorAll('.pet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSelection.pet = btn.getAttribute('data-pet');
      renderScreen();
    });
  });

  // CLIQUES NOS ACESSÓRIOS
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

  // BOTÃO DE SALVAR
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
            const city = data.address.city || data.address.town || data.address.village || "Campo Mourão";
            const state = data.address.state_code ? data.address.state_code.toUpperCase() : "PR";
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