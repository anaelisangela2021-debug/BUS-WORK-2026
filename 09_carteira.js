// Tabela de Preços de Passagens
const TARIFF_RATES = {
  comum: 5.00,
  estudante: 2.50
};

// Estado Padrão da Carteira
const DEFAULT_WALLET_DATA = {
  tickets: 12,
  tariffType: 'comum', // 'comum' ou 'estudante'
  transactions: [
    { type: 'recharge', qty: 10, amount: 25.00, tariff: 'estudante', method: 'PIX', date: 'Hoje às 08:30' },
    { type: 'use', qty: 1, amount: 2.50, tariff: 'estudante', route: 'Linha 01 - SESI / Integrado', date: 'Ontem às 17:45' },
    { type: 'use', qty: 1, amount: 5.00, tariff: 'comum', route: 'Linha 03 - Lar Paraná', date: 'Ontem às 07:15' }
  ]
};

let walletData = { ...DEFAULT_WALLET_DATA };
let selectedTariff = 'comum';
let selectedQty = 5;
let selectedMethod = 'pix'; // 'pix', 'credit', 'debit'

// Carregar dados salvos do localStorage com fallback seguro
function loadWalletFromStorage() {
  const saved = localStorage.getItem ? localStorage.getItem('buswork_wallet_data') : null;
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      walletData = { ...DEFAULT_WALLET_DATA, ...parsed };
      if (!Array.isArray(walletData.transactions)) {
        walletData.transactions = [];
      }
      if (walletData.tariffType) {
        selectedTariff = walletData.tariffType;
      }
    } catch(e) {
      console.error('Erro ao ler carteira:', e);
      walletData = { ...DEFAULT_WALLET_DATA };
    }
  }

  // Sincronizar saldo de passagens com a chave global
  const savedTickets = localStorage.getItem('buswork_tickets');
  if (savedTickets !== null && !isNaN(parseInt(savedTickets, 10))) {
    walletData.tickets = parseInt(savedTickets, 10);
  }
}

// Salvar carteira no localStorage e atualizar chave global de passagens
function saveWalletToStorage() {
  walletData.tariffType = selectedTariff;
  localStorage.setItem('buswork_wallet_data', JSON.stringify(walletData));
  localStorage.setItem('buswork_tickets', walletData.tickets.toString());
}

// Obter preço unitário atual baseado na tarifa selecionada
function getCurrentUnitPrice() {
  return TARIFF_RATES[selectedTariff] || 5.00;
}

// Atualizar interface do saldo
function updateWalletUI() {
  const ticketCountDisplay = document.getElementById('ticketCountDisplay');
  const balanceMoneyDisplay = document.getElementById('balanceMoneyDisplay');
  const currentTariffNote = document.getElementById('currentTariffNote');

  const unitPrice = getCurrentUnitPrice();
  const moneyVal = walletData.tickets * unitPrice;

  if (ticketCountDisplay) ticketCountDisplay.textContent = walletData.tickets;
  if (balanceMoneyDisplay) balanceMoneyDisplay.textContent = `R$ ${moneyVal.toFixed(2).replace('.', ',')}`;
  
  if (currentTariffNote) {
    const label = selectedTariff === 'estudante' ? 'Estudante' : 'Comum';
    currentTariffNote.textContent = `(Tarifa ${label}: R$ ${unitPrice.toFixed(2).replace('.', ',')}/passagem)`;
  }

  renderTransactionHistory();
}

// Atualizar textos de preços nos botões de quantidade
function updateQtyButtonsText() {
  const unitPrice = getCurrentUnitPrice();
  const qtyBtns = document.querySelectorAll('.qty-btn');

  qtyBtns.forEach(btn => {
    const qty = parseInt(btn.getAttribute('data-qty') || '0', 10);
    const subtextSpan = btn.querySelector('.btn-price-subtext');
    if (subtextSpan && qty > 0) {
      const total = qty * unitPrice;
      subtextSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  });
}

// Atualizar resumo da recarga selecionada
function updateRechargeSummary() {
  const totalPayDisplay = document.getElementById('totalPayDisplay');
  const totalTicketsSelectedDisplay = document.getElementById('totalTicketsSelectedDisplay');
  const selectedTariffBadge = document.getElementById('selectedTariffBadge');

  const unitPrice = getCurrentUnitPrice();
  const totalValue = selectedQty * unitPrice;

  if (totalPayDisplay) {
    totalPayDisplay.textContent = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
  }
  if (totalTicketsSelectedDisplay) {
    totalTicketsSelectedDisplay.textContent = `${selectedQty} ${selectedQty === 1 ? 'Passagem' : 'Passagens'}`;
  }
  if (selectedTariffBadge) {
    selectedTariffBadge.textContent = selectedTariff === 'estudante' ? 'Tarifa Estudante (R$ 2,50)' : 'Tarifa Comum (R$ 5,00)';
  }
}

// Renderizar o formulário dinâmico conforme a forma de pagamento
function renderPaymentForm() {
  const container = document.getElementById('paymentFormContainer');
  if (!container) return;

  if (selectedMethod === 'pix') {
    container.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center justify-between text-xs text-gray-300">
          <span class="font-bold text-white">Pagamento via PIX QR Code</span>
          <span class="text-emerald-400 font-semibold">Sem taxas</span>
        </div>
        <p class="text-xs text-gray-400">Ao clicar em confirmar, um código PIX Copia e Cola será gerado instantaneamente para o seu banco.</p>
        <div class="bg-[#161B22] p-3 rounded-xl border border-gray-800 text-xs text-gray-400 flex items-center justify-between">
          <span>Chave PIX Oficial BUS WORK:</span>
          <strong class="text-white font-mono">financeiro@buswork.com.br</strong>
        </div>
      </div>
    `;
  } else if (selectedMethod === 'credit' || selectedMethod === 'debit') {
    const isCredit = selectedMethod === 'credit';
    container.innerHTML = `
      <div class="space-y-3">
        <div class="text-xs font-bold text-white uppercase tracking-wider mb-2">
          Dados do Cartão de ${isCredit ? 'Crédito' : 'Débito'}
        </div>
        <div>
          <label class="block text-[11px] text-gray-400 mb-1">Número do Cartão</label>
          <input type="text" placeholder="0000 0000 0000 0000" maxlength="19" class="w-full bg-[#161B22] border border-gray-800 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#FFD600]">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] text-gray-400 mb-1">Validade</label>
            <input type="text" placeholder="MM/AA" maxlength="5" class="w-full bg-[#161B22] border border-gray-800 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#FFD600]">
          </div>
          <div>
            <label class="block text-[11px] text-gray-400 mb-1">CVV</label>
            <input type="password" placeholder="123" maxlength="4" class="w-full bg-[#161B22] border border-gray-800 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#FFD600]">
          </div>
        </div>
        <div>
          <label class="block text-[11px] text-gray-400 mb-1">Nome no Cartão</label>
          <input type="text" placeholder="Como impresso no cartão" class="w-full bg-[#161B22] border border-gray-800 text-white text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#FFD600]">
        </div>
      </div>
    `;
  }
}

// Renderizar Histórico da Carteira
function renderTransactionHistory() {
  const container = document.getElementById('transactionHistoryList');
  if (!container) return;

  if (!walletData.transactions || walletData.transactions.length === 0) {
    container.innerHTML = '<p class="text-xs text-gray-500 italic py-2">Nenhuma transação registrada ainda.</p>';
    return;
  }

  container.innerHTML = walletData.transactions.slice(0, 5).map(tx => {
    const isRecharge = tx.type === 'recharge';
    const sign = isRecharge ? '+' : '-';
    const colorClass = isRecharge ? 'text-emerald-400' : 'text-red-400';
    const bgBadge = isRecharge ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20';
    const tariffLabel = tx.tariff === 'estudante' ? 'Estudante' : 'Comum';

    return `
      <div class="bg-[#0D1117] border border-gray-800/80 p-3 rounded-2xl flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="p-2 rounded-xl ${bgBadge} border shrink-0">
            ${isRecharge ? 
              `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>` : 
              `<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>`
            }
          </div>
          <div>
            <h4 class="text-xs font-bold text-white">${isRecharge ? `Recarga (${tariffLabel})` : tx.route || 'Uso de Passagem'}</h4>
            <p class="text-[10px] text-gray-400">${tx.date} ${tx.method ? `• ${tx.method}` : ''}</p>
          </div>
        </div>
        <div class="text-right">
          <span class="block text-xs font-black ${colorClass}">${sign}${tx.qty} ${tx.qty === 1 ? 'passagem' : 'passagens'}</span>
          <span class="text-[10px] text-gray-400">R$ ${tx.amount.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Processar a recarga efetuada pelo usuário
function processRecharge() {
  if (selectedQty <= 0) {
    alert("Por favor, selecione ao menos 1 passagem.");
    return;
  }

  const unitPrice = getCurrentUnitPrice();
  const amount = selectedQty * unitPrice;
  const methodLabel = selectedMethod === 'pix' ? 'PIX' : (selectedMethod === 'credit' ? 'Crédito' : 'Débito');
  const tariffLabel = selectedTariff === 'estudante' ? 'Estudante (R$ 2,50)' : 'Comum (R$ 5,00)';

  // Adicionar ao saldo
  walletData.tickets += selectedQty;

  // Registrar histórico
  walletData.transactions.unshift({
    type: 'recharge',
    qty: selectedQty,
    amount: amount,
    tariff: selectedTariff,
    method: methodLabel,
    date: 'Agora mesmo'
  });

  saveWalletToStorage();
  updateWalletUI();

  alert(`Recarga de ${selectedQty} passagens [${tariffLabel}] no valor de R$ ${amount.toFixed(2).replace('.', ',')} realizada com sucesso via ${methodLabel}!`);
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {

  loadWalletFromStorage();
  updateQtyButtonsText();
  updateWalletUI();
  updateRechargeSummary();
  renderPaymentForm();

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

  // 2. CONTROLE DA SELEÇÃO DE TARIFA (COMUM / ESTUDANTE)
  const tariffBtns = document.querySelectorAll('.tariff-type-btn');

  tariffBtns.forEach(btn => {
    const t = btn.getAttribute('data-tariff');
    if (t === selectedTariff) {
      btn.classList.add('active', 'border-[#FFD600]');
      btn.classList.remove('border-gray-800');
    } else {
      btn.classList.remove('active', 'border-[#FFD600]');
      btn.classList.add('border-gray-800');
    }

    btn.addEventListener('click', () => {
      tariffBtns.forEach(b => {
        b.classList.remove('active', 'border-[#FFD600]');
        b.classList.add('border-gray-800');
      });

      btn.classList.add('active', 'border-[#FFD600]');
      btn.classList.remove('border-gray-800');

      selectedTariff = btn.getAttribute('data-tariff') || 'comum';

      saveWalletToStorage();
      updateQtyButtonsText();
      updateRechargeSummary();
      updateWalletUI();
    });
  });

  // 3. CONTROLE DO MENU HAMBÚRGUER (DRAWER)
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

  // 5. SELEÇÃO DE QUANTIDADE DE PASSAGENS
  const qtyBtns = document.querySelectorAll('.qty-btn');
  const customQtyInput = document.getElementById('customQtyInput');

  qtyBtns.forEach(btn => {
    const qty = parseInt(btn.getAttribute('data-qty') || '0', 10);
    const countSpan = btn.querySelector('span:first-child');

    if (qty === selectedQty) {
      btn.classList.remove('border-gray-800');
      btn.classList.add('border-[#FFD600]');
      if (countSpan) countSpan.className = 'block text-xl font-black text-[#FFD600]';
    } else {
      btn.classList.remove('border-[#FFD600]');
      btn.classList.add('border-gray-800');
      if (countSpan) countSpan.className = 'block text-xl font-black text-white';
    }

    btn.addEventListener('click', () => {
      qtyBtns.forEach(b => {
        b.classList.remove('border-[#FFD600]');
        b.classList.add('border-gray-800');
        const cSpan = b.querySelector('span:first-child');
        if (cSpan) cSpan.className = 'block text-xl font-black text-white';
      });

      btn.classList.remove('border-gray-800');
      btn.classList.add('border-[#FFD600]');
      if (countSpan) countSpan.className = 'block text-xl font-black text-[#FFD600]';

      selectedQty = parseInt(btn.getAttribute('data-qty') || '5', 10);
      if (customQtyInput) customQtyInput.value = '';
      updateRechargeSummary();
    });
  });

  if (customQtyInput) {
    customQtyInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val > 0) {
        selectedQty = val;
        qtyBtns.forEach(b => {
          b.classList.remove('border-[#FFD600]');
          b.classList.add('border-gray-800');
          const countSpan = b.querySelector('span:first-child');
          if (countSpan) countSpan.className = 'block text-xl font-black text-white';
        });
        updateRechargeSummary();
      }
    });
  }

  // 6. SELEÇÃO DE FORMA DE PAGAMENTO
  const payBtns = document.querySelectorAll('.pay-method-btn');

  payBtns.forEach(btn => {
    const method = btn.getAttribute('data-method');
    if (method === selectedMethod) {
      btn.classList.add('active', 'border-[#FFD600]');
      btn.classList.remove('border-gray-800');
    } else {
      btn.classList.remove('active', 'border-[#FFD600]');
      btn.classList.add('border-gray-800');
    }

    btn.addEventListener('click', () => {
      payBtns.forEach(b => {
        b.classList.remove('active', 'border-[#FFD600]');
        b.classList.add('border-gray-800');
      });

      btn.classList.add('active', 'border-[#FFD600]');
      btn.classList.remove('border-gray-800');

      selectedMethod = btn.getAttribute('data-method') || 'pix';
      renderPaymentForm();
    });
  });

  // 7. BOTÃO DE CONFIRMAR RECARGA
  const processRechargeBtn = document.getElementById('processRechargeBtn');
  if (processRechargeBtn) {
    processRechargeBtn.addEventListener('click', processRecharge);
  }

  // 8. MODAL DE QR CODE
  const showQrBtn = document.getElementById('showQrBtn');
  const closeQrBtn = document.getElementById('closeQrBtn');
  const qrModal = document.getElementById('qrModal');

  if (showQrBtn && qrModal) {
    showQrBtn.addEventListener('click', () => qrModal.classList.remove('hidden'));
  }

  if (closeQrBtn && qrModal) {
    closeQrBtn.addEventListener('click', () => qrModal.classList.add('hidden'));
  }

});