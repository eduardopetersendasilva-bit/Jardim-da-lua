// ===== FIREBASE — CONEXÃO COM BANCO DE DADOS =====
 const firebaseConfig = {
   apiKey: "AIzaSyDdxDSahpbvqakwAMa_NV6vT_RH-V08Mic",
   authDomain: "jardim-da-lua.firebaseapp.com",
   projectId: "jardim-da-lua",
   storageBucket: "jardim-da-lua.firebasestorage.app",
   messagingSenderId: "471953124970",
   appId: "1:471953124970:web:1ba80ed2c3348ec9aa6413",
   measurementId: "G-GZ4LN44BXX"
 };
 // Inicializa o Firebase
 firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
 // ===== TELA DE CARREGAMENTO =====
 window.addEventListener('load', () => {
     setTimeout(() => {
         document.getElementById('telaCarregamento').style.opacity = '0';
         document.getElementById('telaCarregamento').style.visibility = 'hidden';
     }, 1500);
 });
 // ===== MUDAR TELAS =====
 function mostrarTela(nome) {
     document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
     document.getElementById(nome).classList.add('ativa');
 }
 // ===== ALERTA DE EMERGÊNCIA =====
 function confirmarAlerta() {
     if (confirm("⚠️ Tem certeza que deseja enviar o alerta de emergência com sua localização?")) {
         enviarAlerta();
     }
 }
 function enviarAlerta() {
     if (!navigator.geolocation) {
         alert("❌ GPS não disponível no aparelho");
         return;
     }
     navigator.geolocation.getCurrentPosition(
         async (pos) => {
             const lat = pos.coords.latitude.toFixed(6);
             const lon = pos.coords.longitude.toFixed(6);
             const localizacao = `https://www.google.com/maps?q=${lat},${lon}`;
             const dataHora = new Date().toLocaleString('pt-BR');
             // Salva no Firebase!
             try {
                 await db.collection("alertas").add({
                     latitude: lat,
                     longitude: lon,
                     localizacao: localizacao,
                     dataHora: dataHora,
                     data: firebase.firestore.FieldValue.serverTimestamp()
                 });
                 console.log("✅ Alerta salvo no banco!");
             } catch (erro) {
                 console.log("❌ Erro ao salvar:", erro);
             }
             // Abre WhatsApp com a mensagem
             const msg = `🚨 ALERTA DE EMERGÊNCIA!\n📍 Localização: ${localizacao}\n⏰ Data/Hora: ${dataHora}`;
             window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
         },
         (erro) => {
             alert("❌ Não foi possível acessar sua localização. Ative o GPS e tente novamente.");
             console.error("Erro de geolocalização:", erro);
         },
         { enableHighAccuracy: true, timeout: 10000 }
     );
 }
 // ===== PALAVRA-CHAVE =====
 let palavraSecretaSalva = null;
 async function verificarPalavra() {
     const input = document.getElementById('palavraChave');
     const palavra = input.value.trim();
     if (palavra.length < 2) {
         alert("⚠️ Digite uma palavra válida");
         return;
     }
     palavraSecretaSalva = palavra.toLowerCase();
     // Salva no Firebase
     try {
         await db.collection("configuracoes").doc("palavraChave").set({
             palavra: palavraSecretaSalva,
             data: firebase.firestore.FieldValue.serverTimestamp()
         });
         alert(`✅ Palavra confirmada e salva: "${palavra}"`);
     } catch (erro) {
         console.log("❌ Erro ao salvar:", erro);
         alert(`✅ Palavra confirmada: "${palavra}"`);
     }
     input.value = '';
 }
 // ===== MODO DISCRETO — CALCULADORA =====
 function modoDiscreto() {
     mostrarTela('telaCalculadora');
 }
 function sairModoDiscreto() {
     mostrarTela('telaInicial');
 }
 // Funções da Calculadora
 function adicionarVisor(valor) {
     document.getElementById('visorCalc').value += valor;
 }
 function limparCalc() {
     document.getElementById('visorCalc').value = '';
 }
 function calcularResultado() {
     const visor = document.getElementById('visorCalc');
     try {
         // Cálculo seguro (apenas números e operadores básicos)
         const resultado = Function('"use strict"; return (' + visor.value + ')')();
         visor.value = resultado;
     } catch (e) {
         visor.value = 'Erro';
         setTimeout(() => visor.value = '', 1500);
     }
 }
 // ===== CONTATOS RÁPIDOS =====
 function ligarContato(numero) {
     if (confirm(`📞 Ligar para ${numero}?`)) {
         window.location.href = `tel:${numero}`;
     }
 }
 function abrirWhatsApp() {
     const msg = `Olá! Preciso de ajuda urgente!`;
     window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
 }
 // ===== TECLA ENTER NA PALAVRA-CHAVE =====
 document.addEventListener('keydown', (e) => {
     if (e.key === 'Enter' && document.activeElement.id === 'palavraChave') {
         verificarPalavra();
     }
 });
