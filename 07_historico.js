document.addEventListener('DOMContentLoaded', () => {

  // 1. DADOS DE PERFIL E LOCALSTORAGE
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

  // 3. DADOS INICIAIS MOCKADOS SE NÃO HOUVER HISTÓRICO NO LOCALSTORAGE
  const DEFAULT_HISTORY = [
    {
      id: 1,
      type: 'trip',
      title: 'Linha 10 - Lar Paraná',
      origin: 'Terminal Urbano Central',
      destination: 'Av. Capitão Índio Bandeira',
      date: '26/09/2026 - 08:15',
      pointsEarned: 0,
      tripIndex: 19
    },
    {
      id: 2,
      type: 'event',
      title: 'Feira da Tecnologia & Inovação',
      location: 'Parque de Exposições - Campo Mourão',
      date: '22/09/2026 - 14:00',
      pointsEarned: 250,
      badge: 'Presença Confirmada'
    },
    {
      id: 3,
      type: 'trip',
      title: 'Linha 05 - Jardim Tropical',
      origin: 'Rua Brasil',
      destination: 'Terminal Urbano Central',
      date: '20/09/2026 - 17:40',
      pointsEarned: 0,
      tripIndex: 18
    },
    {
      id: 4,
      type: 'event',
      title: 'Mutirão de Acessibilidade Urbana',
      location: 'Praça São José',
      date: '15/09/2026 - 09:30',
      pointsEarned: 150,
      badge: 'Presença Confirmada'
    },
    {
      id: 5,
      type: 'trip',
      title: 'Linha 10 - Lar Paraná',
      origin: 'Av. Goioerê',
      destination: 'Terminal Urbano Central',
      date: '12/09/2026 - 07:50',
      pointsEarned: 500, // Recompensa atingida na 20ª viagem anterior
      tripIndex: 20,
      isMilestone: true
    }
  ];

  let historyData = JSON.parse(localStorage.getItem('buswork_history_data')) || DEFAULT_HISTORY;
  if (!localStorage.getItem('buswork_history_data')) {
    localStorage.setItem('buswork_history_data', JSON.stringify(DEFAULT_HISTORY));
  }

  // 4. LÓGICA DE REGRA DE PONTOS (20 VIAGENS OU EVENTO)
  function calculateTotalPointsAndTrips() {
    let totalPoints = 0;
    let tripCount = 0;

    historyData.forEach(item => {
      if (item.type === 'trip') {
        tripCount++;
      }
      if (item.pointsEarned) {
        totalPoints += item.pointsEarned;
      }
    });

    // Salva ou atualiza os pontos globais no aplicativo
    localStorage.setItem('buswork_user_points', totalPoints.toString());

    // Atualiza medidor na tela
    const currentProgressInCycle = tripCount % 20; // Progresso do ciclo atual de 20
    const percentage = Math.min((currentProgressInCycle / 20) * 100, 100);

    const tripProgressBar = document.getElementById('tripProgressBar');
    const tripProgressText = document.getElementById('tripProgressText');
    const tripStatusSubtext = document.getElementById('tripStatusSubtext');
    const totalPointsBadge = document.getElementById('totalPointsBadge');

    if (tripProgressBar) tripProgressBar.style.width = `${percentage}%`;
    if (tripProgressText) tripProgressText.textContent = `${currentProgressInCycle} / 20`;
    
    if (tripStatusSubtext) {
      const remaining = 20 - currentProgressInCycle;
      if (remaining === 0) {
        tripStatusSubtext.textContent = '🎉 Parabéns! Você atingiu a meta e ganhou +500 pontos!';
      } else {
        tripStatusSubtext.textContent = `Faltam ${remaining} ${remaining === 1 ? 'viagem' : 'viagens'} para resgatar +500 pontos!`;
      }
    }

    if (totalPointsBadge) totalPointsBadge.textContent = `${totalPoints} pts`;
  }

  // 5. RENDERIZAÇÃO DA LISTA DE HISTÓRICO
  const historyListContainer = document.getElementById('historyListContainer');
  let currentFilter = 'all';

  function renderHistoryList() {
    if (!historyListContainer) return;

    const filtered = historyData.filter(item => {
      if (currentFilter === 'trips') return item.type === 'trip';
      if (currentFilter === 'events') return item.type === 'event';
      return true;
    });

    if (filtered.length === 0) {
      historyListContainer.innerHTML = `
        <div class="bg-[#161B22] border border-gray-800 rounded-2xl p-8 text-center space-y-2">
          <p class="text-3xl">📜</p>
          <h3 class="font-bold text-white text-sm">Nenhum registro encontrado</h3>
          <p class="text-xs text-gray-400">Suas futuras viagens e participações em eventos aparecerão aqui.</p>
        </div>
      `;
      return;
    }

    historyListContainer.innerHTML = filtered.map(item => {
      if (item.type === 'trip') {
        const isMilestone = item.isMilestone || item.pointsEarned > 0;
        return `
          <div class="bg-[#161B22] border ${isMilestone ? 'border-[#FFD600]/60' : 'border-gray-800'} rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gray-700 transition">
            <div class="flex items-start space-x-3">
              <div class="p-3 bg-blue-500/10 text-blue-400 rounded-xl shrink-0 mt-0.5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 17v2"/><path d="M17 17v2"/><circle cx="7.5" cy="13.5" r="1.5"/><circle cx="16.5" cy="13.5" r="1.5"/><path d="M3 10h18"/></svg>
              </div>
              <div class="space-y-1">
                <div class="flex items-center space-x-2 flex-wrap">
                  <h4 class="font-bold text-sm text-white">${item.title}</h4>
                  <span class="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-md font-semibold">Viagem #${item.tripIndex || '1'}</span>
                </div>
                <p class="text-xs text-gray-400">${item.origin} → ${item.destination}</p>
                <p class="text-[11px] text-gray-500">${item.date}</p>
              </div>
            </div>

            <div class="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-gray-800 pt-2 sm:pt-0">
              ${isMilestone ? `
                <span class="px-2.5 py-1 bg-[#FFD600] text-black font-black text-xs rounded-lg flex items-center shadow-md">
                  ⭐ +${item.pointsEarned} pts (Meta 20x)
                </span>
              ` : `
                <span class="text-xs text-gray-400 font-medium flex items-center">
                  <svg class="w-3.5 h-3.5 mr-1 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                  Conta para o bônus
                </span>
              `}
            </div>
          </div>
        `;
      } else {
        return `
          <div class="bg-[#161B22] border border-purple-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-500/60 transition">
            <div class="flex items-start space-x-3">
              <div class="p-3 bg-purple-500/10 text-purple-400 rounded-xl shrink-0 mt-0.5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div class="space-y-1">
                <div class="flex items-center space-x-2 flex-wrap">
                  <h4 class="font-bold text-sm text-white">${item.title}</h4>
                  <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-md font-semibold">Evento</span>
                </div>
                <p class="text-xs text-gray-400">📍 ${item.location}</p>
                <p class="text-[11px] text-gray-500">${item.date}</p>
              </div>
            </div>

            <div class="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-gray-800 pt-2 sm:pt-0">
              <span class="px-2.5 py-1 bg-purple-600 text-white font-black text-xs rounded-lg flex items-center shadow-md">
                🎉 +${item.pointsEarned} pts
              </span>
            </div>
          </div>
        `;
      }
    }).join('');
  }

  // 6. FILTRAGEM
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-[#FFD600]', 'text-black');
        b.classList.add('bg-[#161B22]', 'text-gray-400');
      });

      btn.classList.remove('bg-[#161B22]', 'text-gray-400');
      btn.classList.add('bg-[#FFD600]', 'text-black');

      currentFilter = btn.getAttribute('data-filter');
      renderHistoryList();
    });
  });

  // 7. GEOLOCALIZAÇÃO
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

  // EXECUÇÃO INICIAL
  calculateTotalPointsAndTrips();
  renderHistoryList();

});