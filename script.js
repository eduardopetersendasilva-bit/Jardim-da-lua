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
 // ===== FUNÇÃO — ENVIAR ALERTA =====
 function enviarAlerta() {
     if (!navigator.geolocation) {
         alert("❌ GPS não disponível");
         return;
     }
     navigator.geolocation.getCurrentPosition(async pos => {
         const lat = pos.coords.latitude.toFixed(6);
         const lon = pos.coords.longitude.toFixed(6);
         const localizacao = `https://www.google.com/maps?q=${lat},${lon}`;
         
         // Salva no Firebase!
         try {
             await db.collection("alertas").add({
                 latitude: lat,
                 longitude: lon,
                 localizacao: localizacao,
                 data: firebase.firestore.FieldValue.serverTimestamp()
             });
             console.log("✅ Alerta salvo no banco!");
         } catch (erro) {
             console.log("❌ Erro ao salvar:", erro);
         }
         
         const msg = `🚨 PRECISO DE AJUDA! Minha localização: ${localizacao}`;
         window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
     });
 }
 // ===== FUNÇÃO — PALAVRA-CHAVE =====
 let palavra = null;
 async function verificarPalavra() {
     const p = document.getElementById('palavraChave').value.trim();
     if (p.length < 2) {
         alert("⚠️ Digite uma palavra válida");
         return;
     }
     palavra = p.toLowerCase();
     
     // Salva a palavra-chave no Firebase
     try {
         await db.collection("configuracoes").doc("palavraChave").set({
             palavra: palavra,
             data: firebase.firestore.FieldValue.serverTimestamp()
         });
     } catch (erro) {
         console.log("❌ Erro ao salvar palavra:", erro);
     }
     
     alert(`✅ Palavra confirmada: "${p}"`);
 }
 // ===== FUNÇÃO — MODO DISCRETO =====
 let discreto = false;
 function modoDiscreto() {
     if (!discreto) {
         document.body.style.background = '#fff';
         document.body.style.color = '#000';
         document.querySelector('header').style.background = '#f0f0f0';
         document.querySelector('header').style.color = '#333';
         document.querySelector('header h1').textContent = 'Calculadora';
         discreto = true;
     } else {
         location.reload();
     }
 }
