
const calendrier=document.getElementById('calendrier');
setInterval(() => {
    const data=new Date();
    calendrier.textContent=data.toLocaleString('fr-FR', { timeZone: 'UTC' });
}, 1000);