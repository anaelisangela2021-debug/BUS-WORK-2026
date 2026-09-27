// Estado do Sistema de Pontos
let pointsData = {
  totalPoints: 320,
  history: [
    { type: 'earn', pts: 20, title: 'Resposta de Lotação do Ônibus (Moderado)', date: 'Hoje às 09:15' },
    { type: 'earn', pts: 100, title: 'Participação em Evento Comprovada', date: 'Hoje às 08:30' },
    { type: 'earn', pts: 200, title: 'Bônus de Cadastro BUS WORK', date: 'Ontem às 14:00' }
  ]
};

// Carregar pontos do localStorage
function loadPointsFromStorage() {
  const saved = localStorage.getItem('buswork_points_data');
  if (saved) {
    try {
      pointsData = JSON.parse(saved);
    } catch(e) {
      console.error('Erro ao ler pontos:', e);
    }
  }
}

// Salvar pontos no localStorage
function savePointsToStorage() {
  localStorage.setItem('buswork_points_data', JSON.stringify(pointsData));
}

// Atualizar interface do saldo de pontos
function updatePointsUI() {
  const display = document.getElementById('userPointsDisplay');
  if (display) display.textContent = pointsData.totalPoints;
  renderPointsHistory();
}

// Renderizar Histórico de Pontos
function renderPointsHistory() {
  const container = document.getElementById('pointsHistoryList');
  if (!container) return;

  if (!pointsData.history || pointsData.history.length === 0) {
    container.innerHTML = '<p class="text-xs text-gray-500 italic py-2">Nenhuma atividade registrada ainda.</p>';
    return;
  }

  container.innerHTML = pointsData.history.slice(0, 5).map(item => {
    const isEarn = item.type === 'earn';
    const sign = isEarn ? '+' : '-';
    const colorClass = isEarn ? 'text-emerald-400' : 'text-red-400';
    const bgBadge = isEarn ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20';

    return `
      <div class="bg-[#0D1117] border border-gray-800/80 p-3 rounded-2xl flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="p-2 rounded-xl ${bgBadge} border shrink-0">
            ${isEarn ? 
              `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` : 
              `<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`
            }
          </div>
          <div>
            <h4 class="text-xs font-bold text-white">${item.title}</h4>
            <p class="text-[10px] text-gray-400">${item.date}</p>
          </div>
        </div>
        <div class="text-right">
          <span class="block text-xs font-black ${colorClass}">${sign}${item.pts} PTS</span>
        </div>
      </div>
    `;
  }).join('');
}

// Resgatar Recompensa
function handleRedeemReward(rewardId, cost, rewardName) {
  if (pointsData.totalPoints < cost) {
    alert(`Ops! Você precisa de ${cost} PTS para resgatar "${rewardName}". Seu saldo atual é de ${pointsData.totalPoints} PTS.`);
    return;
  }

  const confirmRedeem = confirm(`Deseja confirmar o resgate de "${rewardName}" por ${cost} PTS?`);
  if (!confirmRedeem) return;

  // Subtrair pontos
  pointsData.totalPoints -= cost;

  // Adicionar ao histórico
  pointsData.history.unshift({
    type: 'spend',
    pts: cost,
    title: `Resgate: ${rewardName}`,
    date: 'Agora mesmo'
  });

  // Se o prêmio for passagem de ônibus, injetar no saldo da Carteira
  if (rewardId === 'ticket' || rewardId === 'ticket_pack') {
    const ticketsToAdd = rewardId === 'ticket_pack' ? 3 : 1;
    let walletData = { tickets: 0, transactions: [] };
    
    try {
      const savedWallet = localStorage.getItem('buswork_wallet_data');
      if (savedWallet) walletData = JSON.parse(savedWallet);
    } catch(e) {}

    walletData.tickets += ticketsToAdd;
    walletData.transactions.unshift({
      type: 'recharge',
      qty: ticketsToAdd,
      amount: 0.00,
      tariff: 'comum',
      method: 'Pontos Resgatados',
      date: 'Agora mesmo'
    });

    localStorage.setItem('buswork_wallet_data', JSON.stringify(walletData));
    alert(`Sucesso! ${ticketsToAdd} passagem(ns) adicionada(s) à sua Carteira Digital.`);
  } else {
    alert(`Parabéns! Seu voucher para "${rewardName}" foi gerado com sucesso!`);
  }

  savePointsToStorage();
  updatePointsUI();
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {

  loadPointsFromStorage();
  updatePointsUI();

  // 1. CARREGAR PERFIL DO USUÁRIO (Prioriza apelido caso exista)
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

  // 2. MODAL DE INICIAR TRAJETO: PONTUA EXCLUSIVAMENTE PELA AVALIAÇÃO DE LOTAÇÃO (+20 PTS)
  const openStartTripModalBtn = document.getElementById('openStartTripModalBtn');
  const closeStartTripModalBtn = document.getElementById('closeStartTripModalBtn');
  const startTripModal = document.getElementById('startTripModal');
  const occupancySelectBtns = document.querySelectorAll('.occupancy-select-btn');
  const confirmTripStartBtn = document.getElementById('confirmTripStartBtn');

  let selectedOccupancyStatus = null;

  if (openStartTripModalBtn && startTripModal) {
    openStartTripModalBtn.addEventListener('click', () => {
      startTripModal.classList.remove('hidden');
    });
  }

  if (closeStartTripModalBtn && startTripModal) {
    closeStartTripModalBtn.addEventListener('click', () => {
      startTripModal.classList.add('hidden');
    });
  }

  occupancySelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover seleção anterior
      occupancySelectBtns.forEach(b => b.classList.remove('border-[#FFD600]', 'bg-[#FFD600]/10'));

      // Destacar selecionado
      btn.classList.add('border-[#FFD600]', 'bg-[#FFD600]/10');
      selectedOccupancyStatus = btn.getAttribute('data-status');

      // Habilitar botão de confirmação
      if (confirmTripStartBtn) {
        confirmTripStartBtn.disabled = false;
        confirmTripStartBtn.className = "w-full bg-[#FFD600] text-black font-black py-3.5 rounded-2xl hover:bg-yellow-400 transition cursor-pointer text-xs sm:text-sm";
        confirmTripStartBtn.textContent = `Enviar Resposta (${selectedOccupancyStatus}) e Ganhar +20 PTS`;
      }
    });
  });

  if (confirmTripStartBtn) {
    confirmTripStartBtn.addEventListener('click', () => {
      if (!selectedOccupancyStatus) return;

      // Adicionar Apenas +20 Pontos (Pela resposta de lotação)
      pointsData.totalPoints += 20;
      pointsData.history.unshift({
        type: 'earn',
        pts: 20,
        title: `Lotação do Ônibus Informada (${selectedOccupancyStatus})`,
        date: 'Agora mesmo'
      });

      savePointsToStorage();
      updatePointsUI();

      if (startTripModal) startTripModal.classList.add('hidden');
      alert(`Boa viagem! Obrigado por colaborar informando a lotação (${selectedOccupancyStatus}). Você ganhou +20 PONTOS!`);

      // Resetar estado do modal
      selectedOccupancyStatus = null;
      occupancySelectBtns.forEach(b => b.classList.remove('border-[#FFD600]', 'bg-[#FFD600]/10'));
      confirmTripStartBtn.disabled = true;
      confirmTripStartBtn.className = "w-full bg-gray-700 text-gray-400 font-black py-3.5 rounded-2xl transition cursor-not-allowed text-xs sm:text-sm";
      confirmTripStartBtn.textContent = "Selecione a lotação para ganhar +20 PTS";
    });
  }

  // 3. BOTÕES DE RESGATE DE RECOMPENSAS
  const redeemBtns = document.querySelectorAll('.redeem-btn');
  redeemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const rewardId = btn.getAttribute('data-id');
      const cost = parseInt(btn.getAttribute('data-cost') || '0', 10);
      const name = btn.getAttribute('data-name') || 'Recompensa';
      handleRedeemReward(rewardId, cost, name);
    });
  });

  // 4. MODAL DE COMPROVAÇÃO DE EVENTO (+100 PTS)
  const openPhotoProofBtn = document.getElementById('openPhotoProofBtn');
  const closePhotoModalBtn = document.getElementById('closePhotoModalBtn');
  const photoProofModal = document.getElementById('photoProofModal');
  const uploadBox = document.getElementById('uploadBox');
  const photoFileInput = document.getElementById('photoFileInput');
  const photoPreviewContainer = document.getElementById('photoPreviewContainer');
  const photoPreviewImg = document.getElementById('photoPreviewImg');
  const submitPhotoProofBtn = document.getElementById('submitPhotoProofBtn');

  if (openPhotoProofBtn && photoProofModal) {
    openPhotoProofBtn.addEventListener('click', () => photoProofModal.classList.remove('hidden'));
  }

  if (closePhotoModalBtn && photoProofModal) {
    closePhotoModalBtn.addEventListener('click', () => {
      photoProofModal.classList.add('hidden');
    });
  }

  if (uploadBox && photoFileInput) {
    uploadBox.addEventListener('click', () => photoFileInput.click());

    photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          if (photoPreviewImg) photoPreviewImg.src = event.target.result;
          if (photoPreviewContainer) photoPreviewContainer.classList.remove('hidden');
          if (submitPhotoProofBtn) {
            submitPhotoProofBtn.disabled = false;
            submitPhotoProofBtn.className = "w-full bg-[#FFD600] text-black font-black py-3 rounded-xl hover:bg-yellow-400 transition cursor-pointer text-xs sm:text-sm";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (submitPhotoProofBtn) {
    submitPhotoProofBtn.addEventListener('click', () => {
      // Viagem de evento aprovada (+100 Pontos)
      pointsData.totalPoints += 100;
      pointsData.history.unshift({
        type: 'earn',
        pts: 100,
        title: 'Participação em Evento Comprovada',
        date: 'Agora mesmo'
      });

      savePointsToStorage();
      updatePointsUI();

      if (photoProofModal) photoProofModal.classList.add('hidden');
      alert("Comprovação de evento aprovada! Você acumulou +100 PONTOS!");

      // Resetar Modal
      if (photoFileInput) photoFileInput.value = '';
      if (photoPreviewContainer) photoPreviewContainer.classList.add('hidden');
      submitPhotoProofBtn.disabled = true;
      submitPhotoProofBtn.className = "w-full bg-gray-700 text-gray-400 font-black py-3 rounded-xl transition cursor-not-allowed text-xs sm:text-sm";
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

  // 6. GEOLOCALIZAÇÃO
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