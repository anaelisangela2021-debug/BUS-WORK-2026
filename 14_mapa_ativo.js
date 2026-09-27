document.addEventListener('DOMContentLoaded', () => {

  // 1. DADOS DO USUÁRIO E PONTOS
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const menuUserName = document.getElementById('menuUserName');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');
  const userPointsDisplay = document.getElementById('userPointsDisplay');

  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');
  const nomeExibicao = savedUserData.apelido || savedUserData.nome || 'Usuário';

  if (userNameDisplay) userNameDisplay.textContent = nomeExibicao;
  if (menuUserName) menuUserName.textContent = nomeExibicao;

  if (savedUserData.fotoUrl) {
    const avatarImg = `<img src="${savedUserData.fotoUrl}" alt="Foto" class="w-full h-full object-cover">`;
    if (userAvatarContainer) userAvatarContainer.innerHTML = avatarImg;
    if (menuAvatarPreview) menuAvatarPreview.innerHTML = avatarImg;
  }

  let totalPontos = parseInt(localStorage.getItem('buswork_points') || '150');
  function atualizarPontosUI() {
    if (userPointsDisplay) userPointsDisplay.textContent = `${totalPontos} pts`;
  }
  atualizarPontosUI();

  // 2. CONFIGURAR DRAWER LATERAL
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
  }

  function closeDrawer() {
    drawerPanel.classList.remove('translate-x-0');
    drawerPanel.classList.add('-translate-x-full');
    drawerContainer.classList.remove('opacity-100');
    drawerContainer.classList.add('opacity-0');
    setTimeout(() => {
      drawerContainer.classList.add('pointer-events-none');
    }, 300);
  }

  if (openMenuBtn) openMenuBtn.addEventListener('click', openDrawer);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.menu-option').forEach(option => {
    if (option.getAttribute('data-page') === '14_mapa_ativo.html') {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-black text-sm bg-[#FFD600] text-black shadow-lg transition-all duration-200";
    } else {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-gray-800 hover:text-[#FFD600] transition-all duration-200";
    }
  });

  // 3. RECUPERAR MASCOTE
  const activeMascot = JSON.parse(localStorage.getItem('buswork_mascot') || '{}');
  const mascotName = activeMascot.nome || 'Seu Mascote';
  const mascotImgUrl = activeMascot.imagem || 
                        activeMascot.fotoUrl || 
                        activeMascot.avatar || 
                        activeMascot.foto || 
                        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&q=80';

  // 4. CONFIGURAÇÃO DAS COORDENADAS E INICIALIZAÇÃO DO MAPA
  const activeRouteRaw = localStorage.getItem('buswork_active_route');
  let activeRoute = null;
  if (activeRouteRaw) {
    try { activeRoute = JSON.parse(activeRouteRaw); } catch (e) {}
  }

  // Coordenadas padrão (Campo Mourão - PR)
  let userLat = activeRoute?.origem?.lat || -24.0435;
  let userLng = activeRoute?.origem?.lon || -52.3787;

  let busLat = userLat + 0.0025;
  let busLng = userLng - 0.0020;

  let destLat = activeRoute?.destino?.lat || (userLat + 0.0120);
  let destLng = activeRoute?.destino?.lon || (userLng + 0.0090);

  // Inicializa o mapa com o zoom correto
  const map = L.map('map', { zoomControl: false }).setView([userLat, userLng], 14);

  // CAMADA DE MAPA OFICIAL OPENSTREETMAP (100% Estável)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  L.control.zoom({ position: 'topright' }).addTo(map);

  // Força o ajuste do tamanho do mapa após o carregamento da página
  setTimeout(() => {
    map.invalidateSize();
  }, 300);

  // ÍCONES PERSONALIZADOS
  const mascotIcon = L.divIcon({
    className: 'custom-mascot-wrapper',
    html: `
      <div class="mascot-pin-container" title="${mascotName}">
        <div class="mascot-pulse-ring"></div>
        <img src="${mascotImgUrl}" class="mascot-marker-img" alt="${mascotName}">
      </div>
    `,
    iconSize: [64, 64],
    iconAnchor: [32, 32]
  });

  const busIcon = L.divIcon({
    className: 'custom-bus-wrapper',
    html: `
      <div class="bus-marker-box bg-[#FFD600] text-black w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl border-2 border-black shadow-lg">
        🚌
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  const destinationIcon = L.divIcon({
    className: 'custom-dest-wrapper',
    html: `
      <div class="bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-black border-2 border-white shadow-xl">
        📍
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  // MARCADORES NO MAPA
  const userMarker = L.marker([userLat, userLng], { icon: mascotIcon }).addTo(map)
    .bindPopup(`<b>${nomeExibicao} e ${mascotName}!</b><br>Sua Localização.`);

  const busMarker = L.marker([busLat, busLng], { icon: busIcon }).addTo(map)
    .bindPopup('<b>Ônibus Linha 06</b><br>Em deslocamento');

  let destMarker = L.marker([destLat, destLng], { icon: destinationIcon }).addTo(map)
    .bindPopup('<b>Destino Final</b>');

  let routePolyline = null;

  // 5. CÁLCULO DE ROTA REAL VIA API OSRM (OPENSTREETMAP ROUTING)
  async function calcularRota(startLat, startLng, endLat, endLng) {
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);

        if (routePolyline) map.removeLayer(routePolyline);

        routePolyline = L.polyline(coordinates, {
          color: '#2563EB', // Azul destaque para combinar com o mapa OpenStreetMap
          weight: 6,
          opacity: 0.85,
          lineCap: 'round'
        }).addTo(map);

        map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
      }
    } catch (error) {
      console.error("Erro ao calcular rota OSRM:", error);
      // Fallback em linha reta caso ocorra lentidão na API OSRM
      if (routePolyline) map.removeLayer(routePolyline);
      routePolyline = L.polyline([[startLat, startLng], [endLat, endLng]], {
        color: '#2563EB', weight: 5, opacity: 0.8, dashArray: '8,8'
      }).addTo(map);
    }
  }

  // Traçar rota inicial
  calcularRota(userLat, userLng, destLat, destLng);

  // 6. BUSCA DE ENDEREÇO COM NOMINATIM (OPENSTREETMAP)
  const addressInput = document.getElementById('addressInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');
  const origemTextDisplay = document.getElementById('origemTextDisplay');
  const destinoTextDisplay = document.getElementById('destinoTextDisplay');

  if (origemTextDisplay) origemTextDisplay.textContent = activeRoute?.origem?.textoFormatado || "Sua posição";
  if (destinoTextDisplay) destinoTextDisplay.textContent = activeRoute?.destino?.textoFormatado || "Campus Universitário";

  async function pesquisarEnderecoNominatim(query) {
    if (!query || query.trim().length < 3) return;

    searchResults.innerHTML = '<div class="p-3 text-gray-400">Buscando endereço...</div>';
    searchResults.classList.remove('hidden');

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;

    try {
      const response = await fetch(url, { headers: { 'Accept-Language': 'pt-BR' } });
      const data = await response.json();

      if (!data || data.length === 0) {
        searchResults.innerHTML = '<div class="p-3 text-gray-400">Nenhum endereço encontrado.</div>';
        return;
      }

      searchResults.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-3 hover:bg-[#161B22] border-b border-gray-800/60 cursor-pointer text-gray-200 transition';
        div.innerHTML = `<strong class="text-[#FFD600] block text-xs">${item.display_name.split(',')[0]}</strong>
                         <span class="text-[10px] text-gray-400 truncate block">${item.display_name}</span>`;

        div.addEventListener('click', () => {
          const newLat = parseFloat(item.lat);
          const newLon = parseFloat(item.lon);

          destLat = newLat;
          destLng = newLon;

          // Atualizar marcador de destino
          destMarker.setLatLng([destLat, destLng]);
          destMarker.bindPopup(`<b>${item.display_name.split(',')[0]}</b>`).openPopup();

          // Atualizar texto no painel inferior
          if (destinoTextDisplay) destinoTextDisplay.textContent = item.display_name.split(',')[0];

          // Recalcular rota no mapa
          calcularRota(userLat, userLng, destLat, destLng);

          // Esconder menu de sugestões
          searchResults.classList.add('hidden');
          addressInput.value = item.display_name.split(',')[0];
        });

        searchResults.appendChild(div);
      });
    } catch (err) {
      console.error("Erro na busca do Nominatim:", err);
      searchResults.innerHTML = '<div class="p-3 text-red-400">Erro ao buscar endereço.</div>';
    }
  }

  let timerDebounce = null;
  if (addressInput) {
    addressInput.addEventListener('input', (e) => {
      clearTimeout(timerDebounce);
      timerDebounce = setTimeout(() => {
        pesquisarEnderecoNominatim(e.target.value);
      }, 500);
    });

    addressInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(timerDebounce);
        pesquisarEnderecoNominatim(addressInput.value);
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      pesquisarEnderecoNominatim(addressInput.value);
    });
  }

  document.addEventListener('click', (e) => {
    if (!addressInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });

  // 7. SIMULAÇÃO DE MOVIMENTO DO ÔNIBUS
  let step = 0;
  const interval = setInterval(() => {
    step += 0.05;
    const currentLat = busLat + (userLat - busLat) * Math.min(step, 1);
    const currentLng = busLng + (userLng - busLng) * Math.min(step, 1);
    
    busMarker.setLatLng([currentLat, currentLng]);

    if (step >= 1) {
      const busLocationStatus = document.getElementById('busLocationStatus');
      const etaTimeDisplay = document.getElementById('etaTimeDisplay');
      
      if (busLocationStatus) busLocationStatus.textContent = "O ônibus acabou de chegar ao seu ponto!";
      if (etaTimeDisplay) etaTimeDisplay.textContent = "Chegou!";
      clearInterval(interval);
    }
  }, 3000);

  // 8. PESQUISA DE LOTAÇÃO (+50 PONTOS)
  const btnAbrirPesquisaLotacao = document.getElementById('btnAbrirPesquisaLotacao');
  const modalLotacao = document.getElementById('modalLotacao');
  const modalLotacaoCard = document.getElementById('modalLotacaoCard');
  const btnFecharModalLotacao = document.getElementById('btnFecharModalLotacao');
  const toastPontos = document.getElementById('toastPontos');
  const toastPontosTexto = document.getElementById('toastPontosTexto');

  function openModal() {
    modalLotacao.classList.remove('opacity-0', 'pointer-events-none');
    modalLotacao.classList.add('opacity-100');
    modalLotacaoCard.classList.remove('scale-95');
    modalLotacaoCard.classList.add('scale-100');
  }

  function closeModal() {
    modalLotacaoCard.classList.remove('scale-100');
    modalLotacaoCard.classList.add('scale-95');
    modalLotacao.classList.remove('opacity-100');
    modalLotacao.classList.add('opacity-0');
    setTimeout(() => {
      modalLotacao.classList.add('pointer-events-none');
    }, 300);
  }

  if (btnAbrirPesquisaLotacao) btnAbrirPesquisaLotacao.addEventListener('click', openModal);
  if (btnFecharModalLotacao) btnFecharModalLotacao.addEventListener('click', closeModal);

  document.querySelectorAll('.btn-op-lotacao').forEach(btn => {
    btn.addEventListener('click', () => {
      const crowdType = btn.getAttribute('data-crowd');
      const crowdStatusText = document.getElementById('crowdStatusText');
      const crowdIndicatorDot = document.getElementById('crowdIndicatorDot');

      if (crowdType === 'tranquilo') {
        crowdStatusText.textContent = "Tranquilo (Vários assentos)";
        crowdStatusText.className = "text-xs font-bold text-green-400";
        crowdIndicatorDot.className = "w-3.5 h-3.5 rounded-full bg-green-500 animate-pulse shrink-0";
      } else if (crowdType === 'moderado') {
        crowdStatusText.textContent = "Moderado (Poucos assentos)";
        crowdStatusText.className = "text-xs font-bold text-yellow-400";
        crowdIndicatorDot.className = "w-3.5 h-3.5 rounded-full bg-yellow-500 animate-pulse shrink-0";
      } else if (crowdType === 'lotado') {
        crowdStatusText.textContent = "Muito Lotado (Cheio)";
        crowdStatusText.className = "text-xs font-bold text-red-400";
        crowdIndicatorDot.className = "w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse shrink-0";
      }

      totalPontos += 50;
      localStorage.setItem('buswork_points', totalPontos.toString());
      atualizarPontosUI();

      closeModal();
      showToastPontos("+50 Pontos adicionados à sua conta!");
    });
  });

  function showToastPontos(mensagem) {
    if (toastPontosTexto) toastPontosTexto.textContent = mensagem;
    toastPontos.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
    toastPontos.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toastPontos.classList.remove('opacity-100', 'translate-y-0');
      toastPontos.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
    }, 3500);
  }

});