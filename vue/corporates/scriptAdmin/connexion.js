window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    const formulure=document.getElementById('formulaireAdd');
    formulure.addEventListener('submit', event=>{
        event.preventDefault();
        console.log(event.target)
        const formData=new FormData(event.target);
        const data=new URLSearchParams(formData);
        fetch(urlApi+'sendDemande', {
            method:'POST',
            body:data
        })
        .then(res=>res.json())
        .then(succes=>{
            console.log(succes)
        })
        .catch(error=>{
            console.log(error)
        })
    })
})