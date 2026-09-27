document.addEventListener('DOMContentLoaded', () => {

  // 1. CARREGAR DADOS DO USUÁRIO
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const menuUserName = document.getElementById('menuUserName');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');

  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');
  const nomeExibicao = savedUserData.apelido || savedUserData.nome || 'Usuário';

  if (userNameDisplay) userNameDisplay.textContent = nomeExibicao;
  if (menuUserName) menuUserName.textContent = nomeExibicao;

  if (savedUserData.fotoUrl) {
    const avatarImg = `<img src="${savedUserData.fotoUrl}" alt="Foto do Usuário" class="w-full h-full object-cover">`;
    if (userAvatarContainer) userAvatarContainer.innerHTML = avatarImg;
    if (menuAvatarPreview) menuAvatarPreview.innerHTML = avatarImg;
  }

  // 2. CONTROLE DO DRAWER LATERAL (ABRIR / FECHAR)
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

  // 3. DESTAQUE DA TELA ATIVA NO MENU
  const currentPath = window.location.pathname.split('/').pop() || '11_configuracoes.html';
  const menuOptions = document.querySelectorAll('.menu-option');

  menuOptions.forEach(option => {
    const pageAttr = option.getAttribute('data-page');

    if (pageAttr === currentPath) {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-black text-sm bg-[#FFD600] text-black shadow-lg transition-all duration-200";
    } else {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-gray-800 hover:text-[#FFD600] transition-all duration-200";
    }
  });

  // 4. GEOLOCALIZAÇÃO
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

  // 5. CARREGAR E SALVAR CONFIGURAÇÕES NO LOCALSTORAGE
  const cfgArrivalAlerts = document.getElementById('cfgArrivalAlerts');
  const cfgPromoAlerts = document.getElementById('cfgPromoAlerts');
  const cfgGpsActive = document.getElementById('cfgGpsActive');
  const cfgSaveHistory = document.getElementById('cfgSaveHistory');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');

  // Carregar preferências salvas
  const savedSettings = JSON.parse(localStorage.getItem('buswork_settings') || '{}');
  if (cfgArrivalAlerts) cfgArrivalAlerts.checked = savedSettings.arrivalAlerts !== false;
  if (cfgPromoAlerts) cfgPromoAlerts.checked = savedSettings.promoAlerts !== false;
  if (cfgGpsActive) cfgGpsActive.checked = savedSettings.gpsActive !== false;
  if (cfgSaveHistory) cfgSaveHistory.checked = savedSettings.saveHistory !== false;

  // Salvar preferências
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const newSettings = {
        arrivalAlerts: cfgArrivalAlerts.checked,
        promoAlerts: cfgPromoAlerts.checked,
        gpsActive: cfgGpsActive.checked,
        saveHistory: cfgSaveHistory.checked
      };

      localStorage.setItem('buswork_settings', JSON.stringify(newSettings));

      // Feedback visual
      saveSettingsBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Guardado com Sucesso!</span>
      `;
      saveSettingsBtn.classList.remove('bg-[#FFD600]');
      saveSettingsBtn.classList.add('bg-emerald-500', 'text-white');

      setTimeout(() => {
        saveSettingsBtn.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          <span>Salvar Preferências</span>
        `;
        saveSettingsBtn.classList.remove('bg-emerald-500', 'text-white');
        saveSettingsBtn.classList.add('bg-[#FFD600]', 'text-black');
      }, 2000);
    });
  }

});