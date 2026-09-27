document.addEventListener("DOMContentLoaded", () => {
    
    // Tempo que a tela de splash vai durar em milissegundos (3000ms = 3 segundos)
    const splashDuration = 3000;

    setTimeout(() => {
        // Seleciona o container principal
        const splashScreen = document.querySelector('.splash-container');
        
        // Adiciona a classe que faz a tela desaparecer suavemente
        splashScreen.classList.add('fade-out');

        // Após a animação de desaparecimento terminar (800ms)
        setTimeout(() => {
            
            // LÓGICA DE REDIRECIONAMENTO INTELIGENTE:
            // O localStorage simula se o usuário já está logado no navegador
            const usuarioLogado = localStorage.getItem("buswork_logado");

            if (usuarioLogado === "true") {
                // Se já estiver logado, vai direto para o sistema (Home/Dashboard)
                // Usaremos o prefixo 05 para a próxima tela
                window.location.href = "02_tela_inicial.html"; 
            } else {
                // Se NÃO estiver logado, vai para a tela de login
                window.location.href = "02.tela_de_login.html";
            }
            
        }, 800); 

    }, splashDuration);

});