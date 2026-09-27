// Estrutura de Gerenciamento de Pontos do Usuário
let userPointsState = {
  totalPoints: 320,
  history: []
};

// Carregar pontos e histórico do localStorage
function loadUserPoints() {
  const saved = localStorage.getItem('buswork_points_data');
  if (saved) {
    try {
      userPointsState = JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao ler dados de pontos:', e);
    }
  }
}

// Salvar pontos no localStorage
function saveUserPoints() {
  localStorage.setItem('buswork_points_data', JSON.stringify(userPointsState));
}

// Adicionar pontos e histórico
function awardPoints(pts, description) {
  userPointsState.totalPoints += pts;
  userPointsState.history.unshift({
    type: 'earn',
    pts: pts,
    title: description,
    date: 'Agora mesmo'
  });
  saveUserPoints();
}

document.addEventListener('DOMContentLoaded', () => {
  loadUserPoints();

  // 1. DADOS DO PERFIL DO USUÁRIO (Prioriza apelido caso exista)
  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');
  const nomeUsuario = savedUserData.apelido || savedUserData.nome || 'Usuário';

  const userNameDisplay = document.getElementById('userNameDisplay');
  const menuUserName = document.getElementById('menuUserName');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');

  if (userNameDisplay) userNameDisplay.textContent = nomeUsuario;
  if (menuUserName) menuUserName.textContent = nomeUsuario;

  if (savedUserData.fotoUrl) {
    const avatarImg = `<img src="${savedUserData.fotoUrl}" alt="Foto" class="w-full h-full object-cover">`;
    if (userAvatarContainer) userAvatarContainer.innerHTML = avatarImg;
    if (menuAvatarPreview) menuAvatarPreview.innerHTML = avatarImg;
  }

  // 2. FILTRO DE CATEGORIAS DOS EVENTOS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualizar classe ativa
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#FFD600]', 'text-black', 'font-extrabold');
        b.classList.add('bg-[#161B22]', 'text-gray-300', 'font-bold');
      });

      btn.classList.add('active', 'bg-[#FFD600]', 'text-black', 'font-extrabold');
      btn.classList.remove('bg-[#161B22]', 'text-gray-300');

      const category = btn.getAttribute('data-category');

      eventCards.forEach(card => {
        if (category === 'todos' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 3. MODAL 1: INICIAR TRAJETO PARA O EVENTO
  const eventTripModal = document.getElementById('eventTripModal');
  const closeEventTripModalBtn = document.getElementById('closeEventTripModalBtn');
  const startEventTripBtns = document.querySelectorAll('.start-event-trip-btn');
  const modalEventTripTitle = document.getElementById('modalEventTripTitle');
  const modalEventTripPoints = document.getElementById('modalEventTripPoints');
  const confirmEventTripBtn = document.getElementById('confirmEventTripBtn');

  let activeEventForTrip = { title: '', points: 0 };

  startEventTripBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-event-title') || 'Evento';
      const points = parseInt(btn.getAttribute('data-points') || '40', 10);

      activeEventForTrip = { title, points };

      if (modalEventTripTitle) modalEventTripTitle.textContent = `Viagem para: ${title}`;
      if (modalEventTripPoints) modalEventTripPoints.textContent = `+${points} PTS`;

      if (eventTripModal) eventTripModal.classList.remove('hidden');
    });
  });

  if (closeEventTripModalBtn && eventTripModal) {
    closeEventTripModalBtn.addEventListener('click', () => eventTripModal.classList.add('hidden'));
  }

  if (confirmEventTripBtn) {
    confirmEventTripBtn.addEventListener('click', () => {
      if (!activeEventForTrip.title) return;

      awardPoints(
        activeEventForTrip.points,
        `Trajeto Iniciado: ${activeEventForTrip.title}`
      );

      if (eventTripModal) eventTripModal.classList.add('hidden');
      alert(`Viagem iniciada com sucesso! Você ganhou +${activeEventForTrip.points} PONTOS por se deslocar até o evento "${activeEventForTrip.title}".`);
    });
  }

  // 4. MODAL 2: ENVIAR FOTO DE COMPROVAÇÃO DO EVENTO
  const eventPhotoModal = document.getElementById('eventPhotoModal');
  const closeEventPhotoModalBtn = document.getElementById('closeEventPhotoModalBtn');
  const sendEventPhotoBtns = document.querySelectorAll('.send-event-photo-btn');
  const modalEventPhotoTitle = document.getElementById('modalEventPhotoTitle');
  const modalEventPhotoPoints = document.getElementById('modalEventPhotoPoints');
  const eventUploadBox = document.getElementById('eventUploadBox');
  const eventPhotoInput = document.getElementById('eventPhotoInput');
  const eventPhotoPreviewContainer = document.getElementById('eventPhotoPreviewContainer');
  const eventPhotoPreviewImg = document.getElementById('eventPhotoPreviewImg');
  const submitEventPhotoBtn = document.getElementById('submitEventPhotoBtn');

  let activeEventForPhoto = { title: '', points: 100 };

  sendEventPhotoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-event-title') || 'Evento';
      const points = parseInt(btn.getAttribute('data-points') || '100', 10);

      activeEventForPhoto = { title, points };

      if (modalEventPhotoTitle) modalEventPhotoTitle.textContent = `Foto: ${title}`;
      if (modalEventPhotoPoints) modalEventPhotoPoints.textContent = `+${points} PTS`;

      if (eventPhotoModal) eventPhotoModal.classList.remove('hidden');
    });
  });

  if (closeEventPhotoModalBtn && eventPhotoModal) {
    closeEventPhotoModalBtn.addEventListener('click', () => {
      eventPhotoModal.classList.add('hidden');
    });
  }

  if (eventUploadBox && eventPhotoInput) {
    eventUploadBox.addEventListener('click', () => eventPhotoInput.click());

    eventPhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          if (eventPhotoPreviewImg) eventPhotoPreviewImg.src = event.target.result;
          if (eventPhotoPreviewContainer) eventPhotoPreviewContainer.classList.remove('hidden');
          if (submitEventPhotoBtn) {
            submitEventPhotoBtn.disabled = false;
            submitEventPhotoBtn.className = "w-full bg-[#FFD600] text-black font-black py-3 rounded-xl hover:bg-yellow-400 transition cursor-pointer text-xs sm:text-sm";
            submitEventPhotoBtn.textContent = `Confirmar e Resgatar +${activeEventForPhoto.points} PTS`;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (submitEventPhotoBtn) {
    submitEventPhotoBtn.addEventListener('click', () => {
      if (!activeEventForPhoto.title) return;

      awardPoints(
        activeEventForPhoto.points,
        `Foto Comprovada: ${activeEventForPhoto.title}`
      );

      if (eventPhotoModal) eventPhotoModal.classList.add('hidden');
      alert(`Excelente! Sua presença no evento "${activeEventForPhoto.title}" foi comprovada. Você ganhou +${activeEventForPhoto.points} PONTOS!`);

      // Resetar Modal de Foto
      if (eventPhotoInput) eventPhotoInput.value = '';
      if (eventPhotoPreviewContainer) eventPhotoPreviewContainer.classList.add('hidden');
      submitEventPhotoBtn.disabled = true;
      submitEventPhotoBtn.className = "w-full bg-gray-700 text-gray-400 font-black py-3 rounded-xl transition cursor-not-allowed text-xs sm:text-sm";
      submitEventPhotoBtn.textContent = "Anexe uma foto para prosseguir";
    });
  }

  // 5. DRAWER DO MENU HAMBÚRGUER
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

  // 6. LOCALIZAÇÃO GEOGRÁFICA
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

});