window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    const breadcumbArea=document.querySelector('.breadcumb-area');
    breadcumbArea.style.backgroundImage="url('./image/revervate.jpg')";

    const nomPrenom=document.getElementById('nomPrenom');
    const email=document.getElementById('email');
    const telephone=document.getElementById('telephone');
    const ligneSelect=document.getElementById('ligne');
    const car=document.getElementById('car');
    const nombre_place=document.getElementById('nombre_place');
    const climatisation=document.getElementById('climatisation');
    const sommetTotale=document.getElementById('sommetTotale');

    const divNom=document.getElementById('divNom');
    const divEmail=document.getElementById('divEmail');
    const divPhone=document.getElementById('divPhone');
    const somme=document.getElementById('somme');
    const alerter=document.getElementById('alerter');
    const alert=document.getElementById('alert');

    if(localStorage.SESSION_TRANSPORT && JSON.parse(localStorage.SESSION_TRANSPORT).body.user.code.includes('PASSAGER')){
        divNom.hidden=true;
        divEmail.hidden=true;
        divPhone.hidden=true;
        const user=JSON.parse(localStorage.SESSION_TRANSPORT).body.user;
        nomPrenom.value=user._id+'#'+user.nomPrenom;
        email.value=user.email;
        telephone.value=user.telephone;
    }
    // else if(localStorage.SESSION_TRANSPORT || JSON.parse(localStorage.SESSION_TRANSPORT).body.user.code.includes('PASSAGER') || JSON.parse(localStorage.SESSION_TRANSPORT).body.user.code.includes('ADMIN')){
    //     location.href='profile2.html'
    // }

    fetch(urlApi+'getAllLigne')
    .then(res=>res.json())
    .then(succes=>{
        const data=succes.data;
        const ligneId= location.href.split('#')[location.href.split('#').length-1];
        nombre_place.addEventListener('input', event=>{
            if(document.getElementById('climatisation').value==="1"){
                sommetTotale.value=Number(document.getElementById('ligne').value.split('#')[1])*Number(event.target.value)+Number(document.getElementById('ligne').value.split('#')[1])*Number(event.target.value)*0.1;
            }else{
                sommetTotale.value=Number(document.getElementById('ligne').value.split('#')[1])*Number(event.target.value);
            }
            somme.textContent=sommetTotale.value;
        });

        ligneSelect.addEventListener('change', event=>{

            if(document.getElementById('climatisation').value==="1"){
                sommetTotale.value=Number(event.target.value.split('#')[1])*Number(document.getElementById('nombre_place').value)+Number(event.target.value.split('#')[1])*Number(document.getElementById('nombre_place').value)*0.1;
            }else{
                sommetTotale.value=Number(event.target.value.split('#')[1])*Number(document.getElementById('nombre_place').value);
            }
            somme.textContent=sommetTotale.value;
        });

        climatisation.addEventListener('change', event=>{
            if(event.target.value==="1"){
                sommetTotale.value=Number(document.getElementById('ligne').value.split('#')[1])*Number(document.getElementById('nombre_place').value)+Number(document.getElementById('ligne').value.split('#')[1])*Number(document.getElementById('nombre_place').value)*0.1;
            }else{
                sommetTotale.value=Number(document.getElementById('sommetTotale').value)-Number(document.getElementById('ligne').value.split('#')[1])*Number(document.getElementById('nombre_place').value)*0.1;
            }
            somme.textContent=sommetTotale.value;
        });
        
        data.forEach(ligne => {
            const option=document.createElement('option');
            option.value=ligne._id+'#'+ligne.montant;
            option.textContent=ligne.villeA+'<=>'+ligne.villeB;
            ligneSelect.append(option);
            if(ligneId==ligne._id){
                option.selected=true;
                sommetTotale.value=ligne.montant;
                somme.textContent=ligne.montant;
            }
        });
    })
    .catch(error=>{
        console.log(error)
    })


    $('#formulaireAdd').submit( async event=>{
        alerter.hidden=true;
        alert.className="";
        alert.textContent=""
        event.preventDefault();
        const formulaire=document.getElementById('formulaireAdd');
        const formData=new FormData(formulaire);
        const data=new URLSearchParams(formData);
        await fetch(urlApi+"saveReservation", {
            method:'POST',
            body:data
        })
        .then(res=>res.json())
        .then(succes=>{
            document.querySelectorAll('#formulaireAdd input').forEach(item=>item.value="");
            alerter.hidden=false;
            alert.className="alert alert-info";
            alert.textContent="Votre réservation a bien été prise en compte.";
            if(localStorage.SESSION_TRANSPORT && JSON.parse(localStorage.SESSION_TRANSPORT).body.user.code.includes('PASSAGER')){
                if(!localStorage.SESSION_TRANSPORT){
                    const body={user:succes.user}
                    const localData={
                        body:body,
                        exprire: new Date()
                    }
                    localStorage.setItem('SESSION_TRANSPORT', JSON.stringify(localData));
                }
                localStorage.setItem('INFOS_RESERVATION_TRANSPORT', JSON.stringify(succes.reservate))
            }
            
        })
        .catch(error=>{
            console.log(error);
            alerter.hidden=false;
            alert.className="alert alert-danger";
            alert.textContent="Réservation annuler"
        })
        
    })
})