document.addEventListener('DOMContentLoaded', () => {

  // 1. DADOS DO USUÁRIO
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

  // 2. DRAWER LATERAL (MENU)
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const drawerContainer = document.getElementById('drawerContainer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerPanel = document.getElementById('drawerPanel');

  function openDrawer() {
    drawerContainer?.classList.remove('pointer-events-none', 'opacity-0');
    drawerContainer?.classList.add('opacity-100');
    drawerPanel?.classList.remove('-translate-x-full');
    drawerPanel?.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawerPanel?.classList.remove('translate-x-0');
    drawerPanel?.classList.add('-translate-x-full');
    drawerContainer?.classList.remove('opacity-100');
    drawerContainer?.classList.add('opacity-0');
    setTimeout(() => {
      drawerContainer?.classList.add('pointer-events-none');
      document.body.style.overflow = '';
    }, 300);
  }

  if (openMenuBtn) openMenuBtn.addEventListener('click', openDrawer);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  const currentPath = window.location.pathname.split('/').pop() || '12_endereco.html';
  document.querySelectorAll('.menu-option').forEach(option => {
    if (option.getAttribute('data-page') === currentPath) {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-black text-sm bg-[#FFD600] text-black shadow-lg transition-all duration-200";
    } else {
      option.className = "menu-option flex items-center px-3.5 py-3 rounded-xl font-bold text-sm text-gray-300 hover:bg-gray-800 hover:text-[#FFD600] transition-all duration-200";
    }
  });

  // 3. ELEMENTOS DE ENTRADA
  const origemCepInput = document.getElementById('origemCepInput');
  const origemNumeroInput = document.getElementById('origemNumeroInput');
  const origemEnderecoCompleto = document.getElementById('origemEnderecoCompleto');

  const destinoCepInput = document.getElementById('destinoCepInput');
  const destinoNumeroInput = document.getElementById('destinoNumeroInput');
  const destinoEnderecoCompleto = document.getElementById('destinoEnderecoCompleto');

  const btnGpsOrigem = document.getElementById('btnGpsOrigem');
  const btnIniciarRota = document.getElementById('btnIniciarRota');
  const statusMsg = document.getElementById('statusMsg');
  const locationBadgeText = document.getElementById('locationBadgeText');
  const btnRequestLocation = document.getElementById('btnRequestLocation');

  let deviceLocation = null;
  let dadosOrigem = null;
  let dadosDestino = null;

  // 4. CONSULTA DE CEP VIA BRASILAPI
  async function buscarEnderecoBrasilAPI(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return null;

    try {
      const resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepLimpo}`);
      if (!resposta.ok) throw new Error('CEP não encontrado');
      const dados = await resposta.json();

      return {
        rua: dados.street || '',
        bairro: dados.neighborhood || '',
        cidade: dados.city || 'Campo Mourão',
        estado: dados.state || 'PR',
        cep: dados.cep || cepLimpo
      };
    } catch (erro) {
      console.warn("BrasilAPI:", erro.message);
      return null;
    }
  }

  // 5. MONITORAMENTO E PREVIEW DOS CAMPOS
  function bindCepListener(cepInput, numeroInput, previewEl, onSuccess) {
    let debounceTimer = null;
    let ultimoCepBuscado = '';
    let infoCepCache = null;

    async function processInput() {
      const val = cepInput.value.trim();
      const num = numeroInput ? numeroInput.value.trim() : '';
      const cepLimpo = val.replace(/\D/g, '');

      // Se for digitado um CEP com 8 números
      if (cepLimpo.length === 8) {
        if (cepLimpo !== ultimoCepBuscado) {
          previewEl.textContent = 'Procurando CEP...';
          infoCepCache = await buscarEnderecoBrasilAPI(cepLimpo);
          ultimoCepBuscado = cepLimpo;
        }

        if (infoCepCache) {
          const numTexto = num ? `, ${num}` : '';
          const textoFormatado = `${infoCepCache.rua}${numTexto} - ${infoCepCache.bairro}, ${infoCepCache.cidade}/${infoCepCache.estado}`;
          previewEl.textContent = `📍 ${textoFormatado}`;
          previewEl.classList.remove('text-red-400');
          previewEl.classList.add('text-[#FFD600]');

          onSuccess({ ...infoCepCache, numero: num, textoFormatado });
          return;
        } else {
          previewEl.textContent = '❌ CEP não encontrado.';
          previewEl.classList.remove('text-[#FFD600]');
          previewEl.classList.add('text-red-400');
          onSuccess(null);
          return;
        }
      }

      // Se for digitado o nome da rua por extenso
      if (val.length > 2) {
        const numTexto = num ? `, ${num}` : '';
        const textoFormatado = `${val}${numTexto}, Campo Mourão - PR`;
        previewEl.textContent = `📍 ${textoFormatado}`;
        previewEl.classList.remove('text-red-400');
        previewEl.classList.add('text-[#FFD600]');

        onSuccess({ rua: val, numero: num, cidade: 'Campo Mourão', estado: 'PR', textoFormatado });
      } else if (val.length === 0) {
        previewEl.textContent = '';
        onSuccess(null);
      }
    }

    cepInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(processInput, 300);
    });

    if (numeroInput) {
      numeroInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(processInput, 150);
      });
    }
  }

  if (origemCepInput && origemEnderecoCompleto) {
    bindCepListener(origemCepInput, origemNumeroInput, origemEnderecoCompleto, (res) => {
      dadosOrigem = res;
    });
  }

  if (destinoCepInput && destinoEnderecoCompleto) {
    bindCepListener(destinoCepInput, destinoNumeroInput, destinoEnderecoCompleto, (res) => {
      dadosDestino = res;
    });
  }

  // 6. OBTENÇÃO DE LOCALIZAÇÃO GPS
  function solicitarGPS() {
    if (!navigator.geolocation) {
      if (locationBadgeText) locationBadgeText.textContent = "📍 Navegador sem suporte a GPS.";
      return;
    }

    if (locationBadgeText) locationBadgeText.textContent = "📍 Solicitando GPS...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        deviceLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };

        if (locationBadgeText) locationBadgeText.textContent = "📍 GPS ativado!";
        if (btnRequestLocation) btnRequestLocation.classList.add('hidden');
      },
      (error) => {
        console.warn('GPS indisponível:', error);
        if (locationBadgeText) locationBadgeText.textContent = "⚠️ Permissão de GPS pendente.";
        if (btnRequestLocation) btnRequestLocation.classList.remove('hidden');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  solicitarGPS();

  if (btnRequestLocation) {
    btnRequestLocation.addEventListener('click', solicitarGPS);
  }

  if (btnGpsOrigem) {
    btnGpsOrigem.addEventListener('click', () => {
      if (deviceLocation) {
        origemCepInput.value = "Minha Localização GPS";
        if (origemNumeroInput) origemNumeroInput.value = "";
        origemEnderecoCompleto.textContent = "📍 Coordenadas de GPS obtidas";
        dadosOrigem = {
          lat: deviceLocation.lat,
          lon: deviceLocation.lon,
          isGps: true,
          textoFormatado: "Minha Localização Atual (GPS)"
        };
        showStatus("Origem definida pelo GPS!", "#22c55e");
      } else {
        solicitarGPS();
      }
    });
  }

  // 7. DISPARO E PROCESSAMENTO DA ROTA
  if (btnIniciarRota) {
    btnIniciarRota.addEventListener('click', () => {
      const valOrigem = origemCepInput ? origemCepInput.value.trim() : '';
      const valDestino = destinoCepInput ? destinoCepInput.value.trim() : '';

      if (!dadosOrigem && !valOrigem) {
        showStatus("Informe uma origem válida.", "#ef4444");
        return;
      }

      if (!dadosDestino && !valDestino) {
        showStatus("Informe um destino válido.", "#ef4444");
        return;
      }

      btnIniciarRota.disabled = true;
      showStatus("Gerando mapa...", "#FFD600");

      const numOrigem = origemNumeroInput ? origemNumeroInput.value.trim() : '';
      const numDestino = destinoNumeroInput ? destinoNumeroInput.value.trim() : '';

      const finalOrigem = dadosOrigem || { rua: valOrigem, numero: numOrigem, cidade: 'Campo Mourão', estado: 'PR', textoFormatado: `${valOrigem}${numOrigem ? ', ' + numOrigem : ''}, Campo Mourão - PR` };
      const finalDestino = dadosDestino || { rua: valDestino, numero: numDestino, cidade: 'Campo Mourão', estado: 'PR', textoFormatado: `${valDestino}${numDestino ? ', ' + numDestino : ''}, Campo Mourão - PR` };

      const rotaData = {
        origem: finalOrigem,
        destino: finalDestino,
        timestamp: Date.now()
      };

      localStorage.setItem('trajeto_iniciado', 'true');
      localStorage.setItem('buswork_active_route', JSON.stringify(rotaData));

      showStatus("Redirecionando...", "#22c55e");

      setTimeout(() => {
        window.location.href = '14_mapa_ativo.html';
      }, 200);
    });
  }

  function showStatus(msg, color = '#ef4444') {
    if (statusMsg) {
      statusMsg.style.color = color;
      statusMsg.textContent = msg;
    }
  }

});