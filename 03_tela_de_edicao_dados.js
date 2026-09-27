// FORMATADORES E MÁSCARAS
function formatCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')     .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14);
}

function formatCEP(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 9);
}

document.addEventListener('DOMContentLoaded', () => {

  // ELEMENTOS DO FORMULÁRIO E TELA
  const profileForm = document.getElementById('profileForm');
  const avatarUploadArea = document.getElementById('avatarUploadArea');
  const avatarFileInput = document.getElementById('avatarFileInput');
  const avatarImagePreview = document.getElementById('avatarImagePreview');
  const userAvatarHeader = document.getElementById('userAvatarHeader');
  const menuAvatarPreview = document.getElementById('menuAvatarPreview');

  const nicknameInput = document.getElementById('nicknameInput');
  const fullNameInput = document.getElementById('fullNameInput');
  const cpfInput = document.getElementById('cpfInput');
  const cepInput = document.getElementById('cepInput');

  const userNameDisplay = document.getElementById('userNameDisplay');
  const menuUserName = document.getElementById('menuUserName');
  const cpfStatusBadge = document.getElementById('cpfStatusBadge');
  const cpfHelpText = document.getElementById('cpfHelpText');

  let currentFotoBase64 = '';

  // 1. CARREGAR DADOS EXISTENTES DO LOCALSTORAGE
  const savedUserData = JSON.parse(localStorage.getItem('buswork_user_data') || '{}');

  // Define o nome de exibição priorizando SEMPRE o apelido
  const displayName = savedUserData.apelido || savedUserData.nome || 'Usuário';

  if (userNameDisplay) userNameDisplay.textContent = displayName;
  if (menuUserName) menuUserName.textContent = displayName;

  if (savedUserData.apelido) {
    nicknameInput.value = savedUserData.apelido;
  }

  if (savedUserData.nome) {
    fullNameInput.value = savedUserData.nome;
  }

  if (savedUserData.fotoUrl) {
    currentFotoBase64 = savedUserData.fotoUrl;
    const imgHTML = `<img src="${currentFotoBase64}" alt="Foto Perfil" class="w-full h-full object-cover">`;
    if (avatarImagePreview) avatarImagePreview.innerHTML = imgHTML;
    if (userAvatarHeader) userAvatarHeader.innerHTML = imgHTML;
    if (menuAvatarPreview) menuAvatarPreview.innerHTML = imgHTML;
  }

  if (savedUserData.cep) {
    cepInput.value = formatCEP(savedUserData.cep);
  }

  // LÓGICA DE CPF BLOQUEADO SE JÁ SALVO UMA VEZ
  if (savedUserData.cpf) {
    cpfInput.value = formatCPF(savedUserData.cpf);
    cpfInput.disabled = true;
    if (cpfStatusBadge) cpfStatusBadge.classList.remove('hidden');
    if (cpfHelpText) {
      cpfHelpText.textContent = "Este CPF foi validado e vinculado à sua conta permanentemente.";
      cpfHelpText.classList.add('text-amber-400');
    }
  }

  // 2. MÁSCARAS EM TEMPO REAL
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      e.target.value = formatCPF(e.target.value);
    });
  }

  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      e.target.value = formatCEP(e.target.value);
    });
  }

  // 3. SELEÇÃO E PRÉ-VISUALIZAÇÃO DA FOTO
  if (avatarUploadArea && avatarFileInput) {
    avatarUploadArea.addEventListener('click', () => avatarFileInput.click());

    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          currentFotoBase64 = event.target.result;
          const imgHTML = `<img src="${currentFotoBase64}" alt="Foto Perfil" class="w-full h-full object-cover">`;
          
          if (avatarImagePreview) avatarImagePreview.innerHTML = imgHTML;
          if (userAvatarHeader) userAvatarHeader.innerHTML = imgHTML;
          if (menuAvatarPreview) menuAvatarPreview.innerHTML = imgHTML;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 4. SUBMISSÃO E SALVAMENTO NO LOCALSTORAGE
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const apelidoVal = nicknameInput.value.trim();
      const nomeVal = fullNameInput.value.trim();
      const cpfVal = cpfInput.value.trim();
      const cepVal = cepInput.value.trim();

      if (!apelidoVal || !nomeVal) {
        alert("Por favor, preencha o apelido e o nome completo.");
        return;
      }

      if (!savedUserData.cpf && cpfVal.length < 14) {
        alert("Por favor, informe um CPF válido completo.");
        return;
      }

      const updatedUserData = {
        ...savedUserData,
        nome: nomeVal,
        apelido: apelidoVal,
        cpf: savedUserData.cpf || cpfVal,
        cep: cepVal,
        fotoUrl: currentFotoBase64
      };

      // Salva os dados atualizados
      localStorage.setItem('buswork_user_data', JSON.stringify(updatedUserData));

      // Atualiza o topo e menu imediatamente com o APELIDO
      if (userNameDisplay) userNameDisplay.textContent = apelidoVal;
      if (menuUserName) menuUserName.textContent = apelidoVal;

      cpfInput.disabled = true;
      if (cpfStatusBadge) cpfStatusBadge.classList.remove('hidden');

      alert("Perfil atualizado com sucesso!");
      window.location.href = "02_tela_inicial.html";
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