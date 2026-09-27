document.addEventListener('DOMContentLoaded', () => {

  // 1. DADOS INICIAIS DE NOTIFICAÇÕES PADRÃO (SE NÃO EXISTIR NO LOCALSTORAGE)
  const defaultNotifications = [
    {
      id: "notif_1",
      type: "photo_approved",
      category: "photos",
      title: "Foto do Local Aprovada! 📸",
      message: "A foto que enviou do ponto <strong>Praça Getúlio Vargas</strong> foi verificada e confirmada para este local. Adicionámos <strong>+50 pontos</strong> à sua conta!",
      locationName: "Praça Getúlio Vargas - Campo Mourão",
      time: "Há 10 minutos",
      unread: true,
      link: "meus_pontos.html"
    },
    {
      id: "notif_2",
      type: "new_event",
      category: "events",
      title: "Novo Evento na Cidade! 🎉",
      message: "Surgiu um novo evento: <strong>Feira Cultural e Tecnológica 2026</strong>. Rotas de autocarro especiais já estão disponíveis no app.",
      locationName: "Parque do Lago",
      time: "Há 2 horas",
      unread: true,
      link: "10_eventos.html"
    },
    {
      id: "notif_3",
      type: "photo_approved",
      category: "photos",
      title: "Confirmação de Paragem Válida ✅",
      message: "A foto enviada no <strong>Terminal Urbano Central</strong> foi validada pela equipa BUS WORK.",
      locationName: "Terminal Urbano Central",
      time: "Ontem",
      unread: false,
      link: "meus_pontos.html"
    },
    {
      id: "notif_4",
      type: "system",
      category: "system",
      title: "Recompensa de Mascote Desbloqueada 🐾",
      message: "A sua mascote ganhou um novo acessório graças às suas viagens registadas nesta semana!",
      locationName: null,
      time: "Há 2 dias",
      unread: false,
      link: "06_mascotes.html"
    }
  ];

  // Carregar do localStorage ou gravar as padrão
  let notifications = JSON.parse(localStorage.getItem('buswork_notifications') || 'null');
  if (!notifications) {
    notifications = defaultNotifications;
    localStorage.setItem('buswork_notifications', JSON.stringify(notifications));
  }

  // 2. CARREGAR PERFIL E GEOLOCALIZAÇÃO
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const menuUserName = document.getElementById('menuUserName');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');

  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');
  const nomeExibicao = savedUserData.apelido || savedUserData.nome || 'Usuário';

  if (userNameDisplay) userNameDisplay.textContent = nomeExibicao;
  if (menuUserName) menuUserName.textContent = nomeExibicao;

  if (savedUserData.fotoUrl) {
    const avatarImg = `<img src="${savedUserData.fotoUrl}" alt="Foto" class="w-full h-full object-cover">`;
    if (userAvatarContainer) userAvatarContainer.innerHTML = avatarImg;
    if (menuAvatarPreview) menuAvatarPreview.innerHTML = avatarImg;
  }

  // 3. CONTROLE DO DRAWER LATERAL
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

  // Destaque de menu
  const currentPath = window.location.pathname.split('/').pop() || '04_sininho.html';
  document.querySelectorAll('.menu-option').forEach(option => {
    if (option.getAttribute('data-page') === currentPath) {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-black text-sm bg-[#FFD600] text-black shadow-lg transition-all duration-200";
    } else {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-gray-800 hover:text-[#FFD600] transition-all duration-200";
    }
  });

  // Geolocalização
  const userCityDisplay = document.getElementById('userCityDisplay');
  const menuCityDisplay = document.getElementById('menuCityDisplay');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
          .then(r => r.json())
          .then(data => {
            const city = data.address.city || data.address.town || "Campo Mourão";
            const state = data.address.state_code ? data.address.state_code.toUpperCase() : "PR";
            const txt = `${city} - ${state}`;
            if (userCityDisplay) userCityDisplay.textContent = txt;
            if (menuCityDisplay) menuCityDisplay.textContent = txt;
          })
          .catch(() => { if (userCityDisplay) userCityDisplay.textContent = "Campo Mourão - PR"; });
      },
      () => { if (userCityDisplay) userCityDisplay.textContent = "Campo Mourão - PR"; }
    );
  }

  // 4. RENDERIZAR NOTIFICAÇÕES E FILTROS
  const container = document.getElementById('notificationsContainer');
  const emptyState = document.getElementById('emptyState');
  const headerBadge = document.getElementById('headerBadge');
  const countAll = document.getElementById('countAll');
  const countUnread = document.getElementById('countUnread');

  let currentFilter = 'all';

  function saveNotifications() {
    localStorage.setItem('buswork_notifications', JSON.stringify(notifications));
  }

  function getIconForType(type) {
    if (type === 'photo_approved') {
      return `<div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/><path d="M16 11l2 2 4-4"/></svg>
      </div>`;
    }
    if (type === 'new_event') {
      return `<div class="w-10 h-10 rounded-xl bg-[#FFD600]/20 text-[#FFD600] border border-[#FFD600]/30 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M12 14l2 2 4-4"/></svg>
      </div>`;
    }
    return `<div class="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    </div>`;
  }

  function renderNotifications() {
    const unreadList = notifications.filter(n => n.unread);
    
    // Atualiza badges
    if (countAll) countAll.textContent = notifications.length;
    if (countUnread) countUnread.textContent = unreadList.length;

    if (headerBadge) {
      if (unreadList.length > 0) {
        headerBadge.classList.remove('hidden');
      } else {
        headerBadge.classList.add('hidden');
      }
    }

    // Filtrar lista
    let filtered = notifications;
    if (currentFilter === 'unread') filtered = notifications.filter(n => n.unread);
    if (currentFilter === 'events') filtered = notifications.filter(n => n.category === 'events');
    if (currentFilter === 'photos') filtered = notifications.filter(n => n.category === 'photos');

    container.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    } else {
      emptyState.classList.add('hidden');
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `notif-card p-4 rounded-2xl border border-gray-800 flex items-start justify-between gap-3 ${item.unread ? 'notif-unread' : 'notif-read'}`;

      card.innerHTML = `
        <div class="flex items-start space-x-3.5 flex-1">
          ${getIconForType(item.type)}
          <div class="space-y-1 flex-1">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-white leading-tight">${item.title}</h3>
              <span class="text-[10px] text-gray-400 font-medium">${item.time}</span>
            </div>
            <p class="text-xs text-gray-300 leading-relaxed">${item.message}</p>
            ${item.locationName ? `<p class="text-[11px] font-semibold text-[#FFD600] flex items-center pt-0.5"><svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${item.locationName}</p>` : ''}
            
            <div class="pt-2 flex items-center space-x-3">
              ${item.link ? `<a href="${item.link}" class="text-xs font-bold text-[#FFD600] hover:underline flex items-center">Acessar <svg class="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></a>` : ''}
              ${item.unread ? `<button data-action="read" data-id="${item.id}" class="text-[11px] text-gray-400 hover:text-white transition cursor-pointer">Marcar como lida</button>` : ''}
            </div>
          </div>
        </div>

        <button data-action="delete" data-id="${item.id}" class="text-gray-500 hover:text-red-400 p-1 rounded-lg transition shrink-0" title="Excluir notificação">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;

      container.appendChild(card);
    });

    // Clique em ações dentro dos cards
    container.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');

        if (action === 'read') {
          const item = notifications.find(n => n.id === id);
          if (item) item.unread = false;
        } else if (action === 'delete') {
          notifications = notifications.filter(n => n.id !== id);
        }
        
        saveNotifications();
        renderNotifications();
      });
    });
  }

  // 5. EVENTOS DOS BOTÕES DE FILTRO E AÇÕES GERAIS
  const filterAll = document.getElementById('filterAll');
  const filterUnread = document.getElementById('filterUnread');
  const filterEvents = document.getElementById('filterEvents');
  const filterPhotos = document.getElementById('filterPhotos');

  function updateFilterUI(activeBtn) {
    [filterAll, filterUnread, filterEvents, filterPhotos].forEach(btn => {
      if (btn === activeBtn) {
        btn.className = "px-3.5 py-1.5 rounded-full bg-[#FFD600] text-black font-bold transition shrink-0";
      } else {
        btn.className = "px-3.5 py-1.5 rounded-full bg-gray-800 text-gray-300 font-bold hover:text-white transition shrink-0";
      }
    });
  }

  if (filterAll) filterAll.addEventListener('click', () => { currentFilter = 'all'; updateFilterUI(filterAll); renderNotifications(); });
  if (filterUnread) filterUnread.addEventListener('click', () => { currentFilter = 'unread'; updateFilterUI(filterUnread); renderNotifications(); });
  if (filterEvents) filterEvents.addEventListener('click', () => { currentFilter = 'events'; updateFilterUI(filterEvents); renderNotifications(); });
  if (filterPhotos) filterPhotos.addEventListener('click', () => { currentFilter = 'photos'; updateFilterUI(filterPhotos); renderNotifications(); });

  const markAllReadBtn = document.getElementById('markAllReadBtn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      notifications.forEach(n => n.unread = false);
      saveNotifications();
      renderNotifications();
    });
  }

  const clearAllBtn = document.getElementById('clearAllBtn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      notifications = [];
      saveNotifications();
      renderNotifications();
    });
  }

  // Inicialização
  renderNotifications();

});