window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    if(!localStorage.SESSION_TRANSPORT){
        location.href='./login.html';
    }else{
        
        const allAdmin = document.getElementById('allAdmin')
        const allAdminPercent = document.getElementById('allAdminPercent');
        const allAdminProgestion = document.getElementById('allAdminProgestion');

        const machiniste = document.getElementById('machiniste')
        const machinistePercent = document.getElementById('machinistePercent');
        const machinisteProgestion = document.getElementById('machinisteProgestion');

        const allCar = document.getElementById('car')
        const carPercent = document.getElementById('carPercent');
        const carProgestion = document.getElementById('carProgestion');
        $.ajax({
            type:`GET`,
            url:`${urlApi}getAllAdmin`,
            headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
        })
        .then(response=>{
            const admins = response.data;
            allAdmin.textContent=admins.length;
            allAdminPercent.textContent=`${(admins.length*100)/admins.length}%`;
            allAdminProgestion.setAttribute('style', `width:${(admins.length*100)/admins.length}%;`) 
            
        })

        $.ajax({
            type:`GET`,
            url:`${urlApi}getAllMachiniste`,
            headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
        })
        .then(response=>{
            const machinistre = response.data;
            machiniste.textContent=machinistre.length;
            machinistePercent.textContent=`${(machinistre.length*100)/machinistre.length}%`;
            machinisteProgestion.setAttribute('style', `width:${(machinistre.length*100)/machinistre.length}%;`) 
        })

        $.ajax({
            type:`GET`,
            url:`${urlApi}getAllCare`,
            headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
        })
        .then(response=>{
            const car = response.data;
            allCar.textContent=car.length;
            carPercent.textContent=`${(car.length*100)/car.length}%`;
            carProgestion.setAttribute('style', `width:${(car.length*100)/car.length}%;`) 
        })
    }
})