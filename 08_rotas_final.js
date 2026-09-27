// Base de dados completa com as 13 linhas
const rotasData = [
  {
    id: "01",
    name: "Pq. Industrial / SESI / Integrado (Campus Araucárias)",
    type: "university",
    typeLabel: "Universitária / Industrial",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Capitão Indio Bandeira ➔ Pq. Industrial ➔ SESI/SENAI ➔ Campus Integrado (Araucárias) ➔ Jd. Ana Rosa ➔ BR-158 ➔ Terminal Urbano",
    obs: "Atende estudantes do SESI/SENAI, do Centro Universitário Integrado (Campus Araucárias) e trabalhadores do Parque Industrial.",
    keywords: "01 parque industrial sesi senai integrado campus araucarias faculdade jardim ana rosa terminal universitario expressa",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["05:35", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:45", "10:35", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "15:35", "16:30", "17:00", "17:30", "18:00", "18:30", "19:30", "20:40", "21:50", "23:15"],
        saida2Label: "Saída SESI / Integrado",
        saida2: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:10", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "16:00", "17:00", "17:30", "18:00", "18:30", "19:00", "20:00", "21:10", "22:20", "23:45"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["05:35", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "17:30", "19:00", "20:35", "21:30"],
        saida2Label: "Saída SESI / Integrado",
        saida2: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "18:00", "19:30", "21:05", "22:00"]
      },
      domingos: {
        saida1Label: "Saída Terminal",
        saida1: ["07:10", "08:20", "10:00", "11:30", "13:00", "14:30", "16:00", "18:00", "19:05", "20:30"],
        saida2Label: "Saída SESI / Integrado",
        saida2: ["07:35", "08:50", "10:30", "12:00", "13:30", "15:00", "16:30", "18:30", "19:35", "21:00"]
      }
    }
  },
  {
    id: "02",
    name: "UTFPR / Campus Universitário",
    type: "university",
    typeLabel: "Universitária",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Goioerê ➔ Unespar (Campus Center) ➔ BR-369 ➔ UTFPR ➔ Terminal Urbano",
    obs: "Atendimento estendido aos blocos acadêmicos da UTFPR e conexão direta com a Unespar.",
    keywords: "02 utfpr campus universitario faculdade unespar terminal universitaria",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:45", "07:15", "07:45", "08:15", "11:15", "12:15", "13:15", "17:15", "18:15", "19:00", "20:30", "22:15"],
        saida2Label: "Saída UTFPR",
        saida2: ["07:10", "07:40", "08:10", "08:40", "11:40", "12:40", "13:40", "17:40", "18:40", "19:25", "21:00", "22:45"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:45", "07:15", "11:15", "12:15"],
        saida2Label: "Saída UTFPR",
        saida2: ["07:10", "07:40", "11:40", "12:40"]
      },
      domingos: null
    }
  },
  {
    id: "03",
    name: "Lar Paraná / Centro",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Capitão Indio Bandeira ➔ Av. Presidente John Kennedy ➔ Praça do Lar Paraná ➔ Jd. Cidade Nova",
    obs: "Linha principal de integração da região sul da cidade.",
    keywords: "03 lar parana centro terminal bairro john kennedy",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "06:30", "07:00", "07:30", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "17:30", "18:00", "18:30", "19:30", "20:30", "21:30", "22:30"],
        saida2Label: "Saída Lar Paraná",
        saida2: ["06:20", "06:50", "07:20", "07:50", "08:20", "09:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "17:50", "18:20", "18:50", "19:50", "20:50", "21:50", "22:50"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "07:00", "08:00", "09:00", "11:00", "12:00", "13:00", "15:00", "17:00", "19:00"],
        saida2Label: "Saída Lar Paraná",
        saida2: ["06:20", "07:20", "08:20", "09:20", "11:20", "12:20", "13:20", "15:20", "17:20", "19:20"]
      },
      domingos: {
        saida1Label: "Saída Terminal",
        saida1: ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
        saida2Label: "Saída Lar Paraná",
        saida2: ["07:20", "09:20", "11:20", "13:20", "15:20", "17:20", "19:20"]
      }
    }
  },
  {
    id: "04",
    name: "Jd. Tropical / Pq. das Aclimações",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Rua Harrison José Borges ➔ Jd. Tropical ➔ Pq. das Aclimações ➔ Posto de Saúde",
    obs: "Atende à UBS do Jardim Tropical e escolas estaduais da região.",
    keywords: "04 jardim tropical aclimacoes terminal bairro ubs",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:15", "07:15", "08:15", "11:15", "12:15", "13:15", "17:15", "18:15", "19:15"],
        saida2Label: "Saída Jd. Tropical",
        saida2: ["06:40", "07:40", "08:40", "11:40", "12:40", "13:40", "17:40", "18:40", "19:40"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:15", "07:15", "11:15", "12:15", "17:15"],
        saida2Label: "Saída Jd. Tropical",
        saida2: ["06:40", "07:40", "11:40", "12:40", "17:40"]
      },
      domingos: null
    }
  },
  {
    id: "05",
    name: "Asa Branca / Jd. Conrado",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Irmãos Pereira ➔ Asa Branca ➔ Jd. Conrado ➔ Centro",
    obs: "Rota com passagens próximas ao Parque Integrado e do Fórum.",
    keywords: "05 asa branca jardim conrado terminal bairro forum",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:05", "07:05", "08:05", "11:20", "12:20", "13:20", "17:20", "18:20"],
        saida2Label: "Saída Asa Branca",
        saida2: ["06:30", "07:30", "08:30", "11:45", "12:45", "13:45", "17:45", "18:45"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:05", "07:05", "11:20", "12:20"],
        saida2Label: "Saída Asa Branca",
        saida2: ["06:30", "07:30", "11:45", "12:45"]
      },
      domingos: null
    }
  },
  {
    id: "06",
    name: "Fortunato Perdoncini / Centro",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Capitão Indio Bandeira ➔ Res. Fortunato Perdoncini ➔ CMEI e Escola Municipal",
    obs: "Conexão garantida nos horários escolares da comunidade Perdoncini.",
    keywords: "06 fortunato perdoncini centro terminal bairro residencial",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "06:45", "07:30", "08:15", "11:00", "11:45", "12:30", "13:15", "17:00", "17:45", "18:30", "19:15", "20:30"],
        saida2Label: "Saída Perdoncini",
        saida2: ["06:20", "07:05", "07:50", "08:35", "11:20", "12:05", "12:50", "13:35", "17:20", "18:05", "18:50", "19:35", "20:50"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "07:00", "08:00", "11:00", "12:00", "13:00", "17:00", "18:00"],
        saida2Label: "Saída Perdoncini",
        saida2: ["06:20", "07:20", "08:20", "11:20", "12:20", "13:20", "17:20", "18:20"]
      },
      domingos: {
        saida1Label: "Saída Terminal",
        saida1: ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
        saida2Label: "Saída Perdoncini",
        saida2: ["06:20", "09:20", "11:20", "13:20", "15:20", "17:20", "19:20"]
      }
    }
  },
  {
    id: "07",
    name: "Ilha Bela / Jd. Modelo",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Armelindo Trombini ➔ Jd. Modelo ➔ Res. Ilha Bela ➔ Centro",
    obs: "Atende diretamente aos moradores dos residenciais Ilha Bela I e II.",
    keywords: "07 ilha bela jardim modelo terminal bairro armelindo trombini",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:10", "07:10", "08:10", "11:10", "12:10", "13:10", "17:10", "18:10", "19:10"],
        saida2Label: "Saída Ilha Bela",
        saida2: ["06:35", "07:35", "08:35", "11:35", "12:35", "13:35", "17:35", "18:35", "19:35"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:10", "07:10", "11:10", "12:10", "17:10"],
        saida2Label: "Saída Ilha Bela",
        saida2: ["06:35", "07:35", "11:35", "12:35", "17:35"]
      },
      domingos: null
    }
  },
  {
    id: "08",
    name: "Cidade Nova / Jd. Copacabana",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Rua Comendador Norberto Marcondes ➔ Cidade Nova ➔ Jd. Copacabana",
    obs: "Passagem pelo CIAC e Unidade Básica de Saúde Copacabana.",
    keywords: "08 cidade nova jardim copacabana terminal bairro ciac",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:20", "07:20", "08:20", "11:20", "12:20", "13:20", "17:20", "18:20"],
        saida2Label: "Saída Copacabana",
        saida2: ["06:45", "07:45", "08:45", "11:45", "12:45", "13:45", "17:45", "18:45"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:20", "07:20", "11:20", "12:20"],
        saida2Label: "Saída Copacabana",
        saida2: ["06:45", "07:45", "11:45", "12:45"]
      },
      domingos: null
    }
  },
  {
    id: "09",
    name: "Jd. Albuquerque / Santa Nilce",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. José Custódio de Oliveira ➔ Jd. Albuquerque ➔ Santa Nilce I e II",
    obs: "Conecta os loteamentos do setor leste ao centro comercial.",
    keywords: "09 jardim albuquerque santa nilce terminal bairro",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:15", "07:15", "08:15", "11:15", "12:15", "13:15", "17:15", "18:15"],
        saida2Label: "Saída Albuquerque",
        saida2: ["06:35", "07:35", "08:35", "11:35", "12:35", "13:35", "17:35", "18:35"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:15", "07:15", "11:15", "12:15"],
        saida2Label: "Saída Albuquerque",
        saida2: ["06:35", "07:35", "11:35", "12:35"]
      },
      domingos: null
    }
  },
  {
    id: "10",
    name: "Jd. Santa Cruz / Pq. do Lago",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Bento Munhoz da Rocha Neto ➔ Parque do Lago ➔ Jd. Santa Cruz",
    obs: "Rota turística e comunitária com parada na entrada do Parque do Lago.",
    keywords: "10 jardim santa cruz parque do lago terminal bairro lago lazer",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "07:00", "08:00", "11:00", "12:00", "13:00", "17:00", "18:00", "19:00"],
        saida2Label: "Saída Santa Cruz",
        saida2: ["06:25", "07:25", "08:25", "11:25", "12:25", "13:25", "17:25", "18:25", "19:25"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "07:00", "11:00", "12:00", "17:00"],
        saida2Label: "Saída Santa Cruz",
        saida2: ["06:25", "07:25", "11:25", "12:25", "17:25"]
      },
      domingos: null
    }
  },
  {
    id: "11",
    name: "Jd. Damasco / Piacentini",
    type: "neighborhood",
    typeLabel: "Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Rua Miguel Gualberto ➔ Jd. Damasco ➔ Res. Dr. Piacentini ➔ Centro",
    obs: "Atende ao conjunto Dr. Piacentini e arredores.",
    keywords: "11 jardim damasco piacentini terminal bairro dr piacentini",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:10", "07:10", "08:10", "11:10", "12:10", "13:10", "17:10", "18:10", "19:10"],
        saida2Label: "Saída Piacentini",
        saida2: ["06:35", "07:35", "08:35", "11:35", "12:35", "13:35", "17:35", "18:35", "19:35"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:10", "07:10", "11:10", "12:10", "17:10"],
        saida2Label: "Saída Piacentini",
        saida2: ["06:35", "07:35", "11:35", "12:35", "17:35"]
      },
      domingos: null
    }
  },
  {
    id: "12",
    name: "San Fernando / Integrado (Unidade Centro) / Jd. Guarujá",
    type: "university",
    typeLabel: "Universitária / Bairro",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. Guilherme de Paula Xavier ➔ Res. San Fernando ➔ Integrado (Unidade Centro) ➔ Jd. Guarujá",
    obs: "Passagem pelo Centro Universitário Integrado (Unidade Centro) e Posto de Saúde San Fernando.",
    keywords: "12 san fernando jardim guaruja terminal urbano bairro integrado centro faculdade universidade",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "07:00", "08:00", "11:15", "12:15", "13:15", "17:15", "18:15", "19:15"],
        saida2Label: "Saída San Fernando",
        saida2: ["06:25", "07:25", "08:25", "11:40", "12:40", "13:40", "17:40", "18:40", "19:40"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:00", "07:00", "11:15", "12:15", "17:15"],
        saida2Label: "Saída San Fernando",
        saida2: ["06:25", "07:25", "11:40", "12:40", "17:40"]
      },
      domingos: null
    }
  },
  {
    id: "13",
    name: "Centro / Jd. Flora / Expresso Lar Paraná",
    type: "express",
    typeLabel: "Expressa / Rápida",
    company: "Viação Mourãoense / Melissatur",
    itinerary: "Terminal Urbano ➔ Av. John Kennedy ➔ Expresso Jd. Flora ➔ Praça Lar Paraná (Direto)",
    obs: "Linha semi-direta sem paradas intermediárias na Av. Indio Bandeira.",
    keywords: "13 centro jardim flora lar parana expresso terminal semidireto expressa",
    schedule: {
      uteis: {
        saida1Label: "Saída Terminal",
        saida1: ["06:15", "07:15", "11:30", "12:30", "17:30", "18:30"],
        saida2Label: "Saída Jd. Flora",
        saida2: ["06:40", "07:40", "11:55", "12:55", "17:55", "18:55"]
      },
      sabados: {
        saida1Label: "Saída Terminal",
        saida1: ["06:15", "11:30", "12:30"],
        saida2Label: "Saída Jd. Flora",
        saida2: ["06:40", "11:55", "12:55"]
      },
      domingos: null
    }
  }
];

// Helper de badge por categoria
function getCategoryBadge(type, label) {
  let badgeStyle = "bg-gray-800 text-gray-300 border-gray-700";
  if (type === "express") badgeStyle = "bg-amber-500/10 text-amber-400 border-amber-500/30";
  if (type === "university") badgeStyle = "bg-blue-500/10 text-blue-400 border-blue-500/30";
  if (type === "neighborhood") badgeStyle = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

  return `<span class="text-[10px] font-bold px-2.5 py-1 rounded-lg border ${badgeStyle}">${label}</span>`;
}

// Renderizar chips de horários
function renderTimeChips(times) {
  if (!times || times.length === 0) return '<span class="text-gray-500 italic">Sem horários</span>';
  return times.map(t => `<span class="time-chip font-mono bg-black/40 border border-gray-800 text-yellow-400 px-2 py-0.5 rounded text-xs inline-block">${t}</span>`).join('');
}

// Renderizar bloco de horários por dia
function renderDayBlock(title, tagText, tagClass, saida1Label, saida1, saida2Label, saida2) {
  if (!saida1 && !saida2) {
    return `
      <div class="bg-[#161B22] p-4 rounded-2xl border border-gray-800 flex flex-col justify-between">
        <div class="flex items-center justify-between border-b border-gray-800 pb-2">
          <h4 class="font-bold text-[#FFD600] text-xs sm:text-sm">${title}</h4>
          <span class="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-semibold">Sem Operação</span>
        </div>
        <div class="py-6 text-center">
          <p class="text-red-400 font-semibold text-xs bg-red-500/10 p-3 rounded-xl border border-red-500/20">
            ⚠️ Esta linha não opera neste dia.
          </p>
        </div>
      </div>
    `;
  }

  return `
    <div class="bg-[#161B22] p-4 rounded-2xl border border-gray-800 space-y-3">
      <div class="flex items-center justify-between border-b border-gray-800 pb-2">
        <h4 class="font-bold text-[#FFD600] text-xs sm:text-sm">${title}</h4>
        <span class="text-[10px] ${tagClass} px-2 py-0.5 rounded-full font-semibold">${tagText}</span>
      </div>
      <div class="space-y-1.5">
        <strong class="text-gray-300 text-[11px] uppercase tracking-wider block">${saida1Label}</strong>
        <div class="flex flex-wrap gap-1">${renderTimeChips(saida1)}</div>
      </div>
      <div class="space-y-1.5 pt-2 border-t border-gray-800/50">
        <strong class="text-gray-300 text-[11px] uppercase tracking-wider block">${saida2Label}</strong>
        <div class="flex flex-wrap gap-1">${renderTimeChips(saida2)}</div>
      </div>
    </div>
  `;
}

// Alternar visualização dos horários de um cartão específico
function toggleSingleSchedule(routeId) {
  const container = document.getElementById(`schedule-container-${routeId}`);
  const btnText = document.getElementById(`btn-text-${routeId}`);
  const icon = document.getElementById(`btn-icon-${routeId}`);

  if (!container) return;

  const isHidden = container.classList.contains('hidden');
  if (isHidden) {
    container.classList.remove('hidden');
    if (btnText) btnText.textContent = "Esconder Horários";
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    container.classList.add('hidden');
    if (btnText) btnText.textContent = "Mostrar Horários";
    if (icon) icon.style.transform = "rotate(180deg)";
  }
}

// Exportar linha individual para PDF com jsPDF & autoTable
function exportSingleRoutePDF(routeId) {
  const rota = rotasData.find(r => r.id === routeId);
  if (!rota) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Cabeçalho PDF
  doc.setFillColor(255, 214, 0); // Amarelo BUS WORK
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`BUS WORK - Linha ${rota.id}: ${rota.name}`, 10, 15);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Itinerário: ${rota.itinerary}`, 10, 32, { maxWidth: 190 });

  let startY = 45;

  const days = [
    { key: 'uteis', label: 'Dias Úteis (Segunda a Sexta)' },
    { key: 'sabados', label: 'Sábados' },
    { key: 'domingos', label: 'Domingos e Feriados' }
  ];

  days.forEach(day => {
    const sch = rota.schedule[day.key];
    if (sch) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(day.label, 10, startY);
      
      const head = [[sch.saida1Label || 'Saída 1', sch.saida2Label || 'Saída 2']];
      const s1 = sch.saida1 || [];
      const s2 = sch.saida2 || [];
      const maxRows = Math.max(s1.length, s2.length);
      const rows = [];

      for (let i = 0; i < maxRows; i++) {
        rows.push([s1[i] || '-', s2[i] || '-']);
      }

      doc.autoTable({
        startY: startY + 3,
        head: head,
        body: rows,
        theme: 'grid',
        headStyles: { fillStyle: [220, 220, 220], textColor: [0, 0, 0], fontStyle: 'bold' },
        styles: { fontSize: 9 }
      });

      startY = doc.lastAutoTable.finalY + 10;
    }
  });

  doc.save(`Linha_${rota.id}_BUS_WORK.pdf`);
}

// Exportar PDF completo com todas as 13 linhas
function exportAllRoutesPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(255, 214, 0);
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text("BUS WORK - Tabela Oficial de Linhas e Horários", 10, 16);

  let startY = 32;

  rotasData.forEach((rota, idx) => {
    if (startY > 250) {
      doc.addPage();
      startY = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Linha ${rota.id}: ${rota.name}`, 10, startY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(`Itinerário: ${rota.itinerary}`, 10, startY + 5, { maxWidth: 190 });

    const tableData = [];
    const u = rota.schedule.uteis;
    const s = rota.schedule.sabados;
    const d = rota.schedule.domingos;

    tableData.push([
      "Dias Úteis",
      u ? `${u.saida1Label}: ${u.saida1.join(', ')}\n${u.saida2Label}: ${u.saida2.join(', ')}` : "Sem Operação"
    ]);

    tableData.push([
      "Sábados",
      s ? `${s.saida1Label}: ${s.saida1.join(', ')}\n${s.saida2Label}: ${s.saida2.join(', ')}` : "Sem Operação"
    ]);

    tableData.push([
      "Dom / Fer",
      d ? `${d.saida1Label}: ${d.saida1.join(', ')}\n${d.saida2Label}: ${d.saida2.join(', ')}` : "Sem Operação"
    ]);

    doc.autoTable({
      startY: startY + 8,
      head: [["Dia", "Horários de Saída"]],
      body: tableData,
      theme: 'plain',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 0: { cellWidth: 25, fontStyle: 'bold' }, 1: { cellWidth: 165 } }
    });

    startY = doc.lastAutoTable.finalY + 8;
  });

  doc.save("Linhas_E_Horarios_BUS_WORK.pdf");
}

// Renderizar todas as 13 linhas no DOM
function renderAllRoutes() {
  const container = document.getElementById('routesContainer');
  if (!container) return;

  container.innerHTML = rotasData.map(rota => {
    const u = rota.schedule.uteis;
    const s = rota.schedule.sabados;
    const d = rota.schedule.domingos;

    return `
      <article class="route-card bg-[#0D1117] border border-gray-800 rounded-2xl p-4 sm:p-5 hover:border-[#FFD600]/50 transition group space-y-4" data-type="${rota.type}" data-search="${rota.keywords} ${rota.name.toLowerCase()}">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-800 pb-3">
          <div class="flex items-center space-x-3">
            <span class="w-10 h-10 rounded-xl bg-[#FFD600] text-black font-black text-lg flex items-center justify-center shrink-0 shadow-md">
              ${rota.id}
            </span>
            <div>
              <h3 class="font-bold text-sm sm:text-base text-white group-hover:text-[#FFD600] transition">${rota.name}</h3>
              <p class="text-xs text-gray-400 font-medium">${rota.company}</p>
            </div>
          </div>

          <div class="flex items-center space-x-2 self-end md:self-auto">
            ${getCategoryBadge(rota.type, rota.typeLabel)}

            <!-- BOTÃO PDF INDIVIDUAL DA LINHA -->
            <button onclick="exportSingleRoutePDF('${rota.id}')" type="button" class="p-2 bg-[#161B22] border border-gray-800 hover:border-[#FFD600] hover:text-[#FFD600] text-gray-300 rounded-xl transition cursor-pointer" title="Baixar PDF desta Linha">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>

            <!-- BOTÃO MOSTRAR / ESCONDER HORÁRIOS DA LINHA -->
            <button onclick="toggleSingleSchedule('${rota.id}')" type="button" class="flex items-center space-x-1 px-3 py-1.5 bg-[#161B22] border border-gray-800 hover:border-[#FFD600] text-gray-300 hover:text-white rounded-xl transition cursor-pointer text-xs font-semibold">
              <span id="btn-text-${rota.id}">Esconder Horários</span>
              <svg id="btn-icon-${rota.id}" class="w-3.5 h-3.5 text-[#FFD600] transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>

        <div class="text-xs space-y-1 bg-[#161B22] p-3 rounded-xl border border-gray-800">
          <p class="text-gray-300"><strong class="text-[#FFD600]">Itinerário:</strong> ${rota.itinerary}</p>
          ${rota.obs ? `<p class="text-gray-400"><strong class="text-gray-300">Obs:</strong> ${rota.obs}</p>` : ''}
        </div>

        <!-- RECIPIENTE DOS HORÁRIOS DA LINHA (OCULTÁVEL) -->
        <div id="schedule-container-${rota.id}" class="grid grid-cols-1 md:grid-cols-3 gap-3 transition-all duration-300">
          ${renderDayBlock("Dias Úteis", "Seg a Sex", "bg-emerald-500/10 text-emerald-400", u.saida1Label, u.saida1, u.saida2Label, u.saida2)}
          ${renderDayBlock("Sábados", "Sábados", "bg-amber-500/10 text-amber-400", s.saida1Label, s.saida1, s.saida2Label, s.saida2)}
          ${renderDayBlock("Domingos e Feriados", "Dom/Fer", "bg-blue-500/10 text-blue-400", d ? d.saida1Label : "", d ? d.saida1 : null, d ? d.saida2Label : "", d ? d.saida2 : null)}
        </div>
      </article>
    `;
  }).join('');
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {

  // 1. CARREGAR PERFIL DE UTILIZADOR
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

  // 2. GERENCIAMENTO DO MENU HAMBÚRGUER (DRAWER)
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

  // 3. GEOLOCALIZAÇÃO
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

  // 4. RENDERIZAR ROTAS E CONFIGURAR EVENTOS
  renderAllRoutes();

  // Evento para baixar o PDF completo
  const downloadAllPdfBtn = document.getElementById('downloadAllPdfBtn');
  if (downloadAllPdfBtn) {
    downloadAllPdfBtn.addEventListener('click', exportAllRoutesPDF);
  }

  // Evento para alternar TODOS os horários de uma só vez
  const toggleAllSchedulesBtn = document.getElementById('toggleAllSchedulesBtn');
  const toggleAllBtnText = document.getElementById('toggleAllBtnText');
  let allHidden = false;

  if (toggleAllSchedulesBtn) {
    toggleAllSchedulesBtn.addEventListener('click', () => {
      allHidden = !allHidden;
      rotasData.forEach(r => {
        const container = document.getElementById(`schedule-container-${r.id}`);
        const btnText = document.getElementById(`btn-text-${r.id}`);
        const icon = document.getElementById(`btn-icon-${r.id}`);

        if (container) {
          if (allHidden) {
            container.classList.add('hidden');
            if (btnText) btnText.textContent = "Mostrar Horários";
            if (icon) icon.style.transform = "rotate(180deg)";
          } else {
            container.classList.remove('hidden');
            if (btnText) btnText.textContent = "Esconder Horários";
            if (icon) icon.style.transform = "rotate(0deg)";
          }
        }
      });

      if (toggleAllBtnText) {
        toggleAllBtnText.textContent = allHidden ? "Mostrar Todos Horários" : "Esconder Todos Horários";
      }
    });
  }

  // Filtros e Pesquisa
  const searchInput = document.getElementById('routeSearchInput');
  const filterBtns = document.querySelectorAll('.route-filter-btn');
  const countDisplay = document.getElementById('routeCountDisplay');

  let currentFilter = 'all';

  function filterRoutes() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.route-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const type = card.getAttribute('data-type');
      const searchData = card.getAttribute('data-search') || '';

      const matchesFilter = (currentFilter === 'all') || (type === currentFilter);
      const matchesSearch = query === '' || searchData.includes(query);

      if (matchesFilter && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countDisplay) countDisplay.textContent = visibleCount;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-[#FFD600]', 'text-black');
        b.classList.add('bg-[#161B22]', 'text-gray-300');
      });

      btn.classList.add('active', 'bg-[#FFD600]', 'text-black');
      btn.classList.remove('bg-[#161B22]', 'text-gray-300');

      currentFilter = btn.getAttribute('data-filter') || 'all';
      filterRoutes();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterRoutes);
  }

});