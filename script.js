function enviarAlerta() {
     if (!navigator.geolocation) {
         alert("❌ GPS não disponível");
         return;
     }
     navigator.geolocation.getCurrentPosition(pos => {
         const lat = pos.coords.latitude.toFixed(6);
         const lon = pos.coords.longitude.toFixed(6);
         const msg = `🚨 PRECISO DE AJUDA! Minha localização: https://www.google.com/maps?q=${lat},${lon}`;
         window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
     });
 }
 let palavra = null;
 function verificarPalavra() {
     const p = document.getElementById('palavraChave').value.trim();
     if (p.length < 2) {
         alert("⚠️ Digite uma palavra válida");
         return;
     }
     palavra = p.toLowerCase();
     alert(`✅ Palavra confirmada: "${p}"`);
 }
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
