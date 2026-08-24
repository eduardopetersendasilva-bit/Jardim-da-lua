// ==============================================
 // 🌙 JARDIM DA LUA — CÓDIGO FUNCIONAL
 // ==============================================
 // 🔴 BOTÃO DE EMERGÊNCIA — pega localização e gera mensagem no WhatsApp
 function enviarAlerta() {
     if (!navigator.geolocation) {
         alert("❌ Seu navegador não suporta localização.");
         return;
     }
     navigator.geolocation.getCurrentPosition(
         function(posicao) {
             const lat = posicao.coords.latitude.toFixed(6);
             const lon = posicao.coords.longitude.toFixed(6);
             const linkMaps = `https://www.google.com/maps?q=${lat},${lon}`;
             
             const mensagem = `🚨 PRECISO DE AJUDA! Estou em situação de risco.\n\n📍 Minha localização: ${linkMaps}\n\n⚠️ Por favor, venha me buscar ou ligue para 190.`;
             
             // Abre WhatsApp com mensagem pronta
             const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
             window.open(urlWhatsApp, '_blank');
         },
         function(erro) {
             alert("⚠️ Não foi possível pegar sua localização. Verifique as permissões de GPS.");
             console.log("Erro de localização:", erro);
         },
         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
     );
 }
 // 🕵️ MODO DISCRETO — esconde tudo rapidamente
 let modoDiscretoAtivo = false;
 function modoDiscreto() {
     const body = document.body;
     const titulo = document.querySelector('header h1');
     const subtitulo = document.querySelector('header p');
     
     if (!modoDiscretoAtivo) {
         // Ativa modo discreto
         body.style.background = "#FFFFFF";
         body.style.color = "#000000";
         document.querySelector('header').style.background = "#f0f0f0";
         document.querySelector('header').style.color = "#333333";
         titulo.textContent = "Calculadora";
         subtitulo.textContent = "Uso rápido e prático";
         document.title = "Calculadora";
         modoDiscretoAtivo = true;
         alert("✅ Modo discreto ativado. Toque no botão ⚡ novamente para voltar.");
     } else {
         // Desativa modo discreto
         body.style.background = "";
         body.style.color = "";
         document.querySelector('header').style.background = "";
         document.querySelector('header').style.color = "";
         titulo.textContent = "🌙 Jardim da Lua";
         subtitulo.textContent = "Seu escudo, sua história. Juntas, somos mais fortes.";
         document.title = "Jardim da Lua — Seu Escudo, Sua História";
         modoDiscretoAtivo = false;
     }
 }
 // 🔒 PALAVRA-CHAVE — verifica e aciona alerta
 let palavraConfirmada = null;
 function verificarPalavra() {
     const input = document.getElementById('palavraChave');
     const palavra = input.value.trim();
     
     if (palavra.length < 2) {
         alert("⚠️ Digite uma palavra com pelo menos 2 letras.");
         return;
     }
     
     palavraConfirmada = palavra.toLowerCase();
     alert(`✅ Palavra-chave confirmada: "${palavra}".\n\nQuando precisar, digite essa palavra no campo e toque em Confirmar para acionar o alerta.`);
     
     // Se a palavra for digitada NOVAMENTE = aciona alerta
     input.value = "";
     input.placeholder = "Digite a palavra para ACIONAR...";
     input.onkeydown = function(e) {
         if (e.key === 'Enter') {
             const digitada = input.value.trim().toLowerCase();
             if (digitada === palavraConfirmada) {
                 enviarAlerta();
                 input.value = "";
             }
         }
     };
 }
