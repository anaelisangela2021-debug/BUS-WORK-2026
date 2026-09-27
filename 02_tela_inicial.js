document.addEventListener('DOMContentLoaded', () => {

  // 1. CARREGAR DADOS DO USUÁRIO (PRIORIZANDO O APELIDO)
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const userAvatarHeader = document.getElementById('userAvatarHeader');
  const menuUserName = document.getElementById('menuUserName');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');

  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');
  
  // Prioriza o apelido. Se não houver, usa o nome completo; caso contrário, 'Usuário'
  const nomeExibicao = savedUserData.apelido || savedUserData.nome || 'Usuário';

  if (userNameDisplay) userNameDisplay.textContent = nomeExibicao;
  if (menuUserName) menuUserName.textContent = nomeExibicao;

  if (savedUserData.fotoUrl) {
    const avatarImg = `<img src="${savedUserData.fotoUrl}" alt="Foto do Usuário" class="w-full h-full object-cover">`;
    if (userAvatarContainer) userAvatarContainer.innerHTML = avatarImg;
    if (userAvatarHeader) userAvatarHeader.innerHTML = avatarImg;
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
    document.body.style.overflow = 'hidden'; // Impede rolagem ao fundo
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

  // 3. DESTAQUE DA TELA ATIVA NO MENU (FUNDO AMARELO, TEXTO PRETO)
  const currentPath = window.location.pathname.split('/').pop() || '02_tela_inicial.html';
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

  // 5. PESQUISA DE EVENTOS
  const eventSearchInput = document.getElementById('eventSearchInput');
  const eventCards = document.querySelectorAll('.event-card');

  if (eventSearchInput) {
    eventSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      eventCards.forEach(card => {
        const titleData = card.getAttribute('data-title').toLowerCase();
        if (titleData.includes(searchTerm)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

});