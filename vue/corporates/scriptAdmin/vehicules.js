window.addEventListener(`DOMContentLoaded`, (e)=>{
    if(!localStorage.SESSION_TRANSPORT){
        location.href='./login.html';
    }else{
        if(document.getElementById('deconnexion')){
            $('#deconnexion').click(event=>{
                event.preventDefault();
                if(confirm('Vous êtes sur le point de fermer votre session')){
                    localStorage.removeItem('SESSION_TRANSPORT');
                    location.href='./login.html';
                }
            })
        }
        

    const imgPath='../../logics/';
    if(location.href.includes('vehicules.html')){
        function editeVehicule(event){location.href=`./editeVehicule.html#${event.target.id}`}
        function deleteVehicule(event){
            if(confirm(`Êtes-vous sûre de vouloir supprimer les données de cette voiture ?`)){
                $.ajax({
                    type:`POST`,
                    url:`${urlApi}deleteCar`,
                    data:`id=${event.target.id}`,
                    headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
                })
                .done(response=>{
                    document.getElementById(`tr-${event.target.id}`).className="alert alert-danger";
                    document.getElementById(`tr-${event.target.id}`).role="alert";
                    let compte = 0;
                    let intervalle = setInterval(()=>{
                        compte+=0.5;
                        if(compte==1){
                            document.getElementById(`tr-${event.target.id}`).remove();
                            clearInterval(intervalle);
                        }
                    },600);
                })
                .fail(error=>{
                    document.getElementById(`tr-${event.target.id}`).className="alert alert-info";
                    document.getElementById(`tr-${event.target.id}`).role="alert";
                })
            }
        }

        let allVehicules=[];

        $.ajax({
            type:`GET`,
            url:`${urlApi}getAllCar`,
            headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
        })
        .done(response=>{
            const vehicule=response.data;
            $.ajax({
                type:`GET`,
                url:`${urlApi}getAllLigne`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .done(res=>{
                afficherVehicule(response.data, res.data);
                const edited=document.querySelectorAll(`button[reference='edited']`);
                edited.forEach(element=>element.addEventListener(`click`, editeVehicule));
                const deleted=document.querySelectorAll(`button[reference='deleted']`);
                deleted.forEach(element=>element.addEventListener(`click`, deleteVehicule));
            })

            
        })
    }
    

    function afficherVehicule(params, other){
        
        
        const my_tbody = document.getElementById('my-tbody');
        let climatisation = "NON"
        params.forEach((element, key) => {
            const my_ligne=other.filter(item=>item._id==element.ligne_id[0])[0];
            if(element) climatisation = "OUI";
            my_tbody.innerHTML+=
            `<tr data-index="${key+1}" id="tr-${element._id}">
                <td class="bs-checkbox"><input data-index="${key}" name="btSelectItem" type="checkbox"></td>
                <td style>${key+1}</td>
                <td><a href="javascript:void(0)" data-name="marque" data-pk="${element._id}" data-value="${element.marque}" class="editable editable-click">${element.marque}</a></td>
                <td><a href="javascript:void(0)" data-name="place" data-pk="${element._id}" data-value="${element.place}" class="editable editable-click">${element.place}</a></td>
                <td><a href="javascript:void(0)" data-name="climatisation" data-pk="${element._id}" data-value="${climatisation}" class="editable editable-click">${climatisation}</a></td>
                <td><a href="javascript:void(0)" data-name="Ligne" data-pk="${element._id}" data-value="${my_ligne? my_ligne.villeA+'<=>'+my_ligne.villeB: 'Ligne non définie'}" class="editable editable-click">${my_ligne? my_ligne.villeA+'<=>'+my_ligne.villeB: 'Ligne non définie'}</a></td>
                <td><img data-name="photo" data-pk="${element._id}" data-value="${element.photo}" src="${imgPath+element.photo}" style="width:200px; height:30px"/></td>
                <td>${new Date(element.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                <td class="datatable-ct">${new Date(element.updatedAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                <td class="datatable-ct"><button type="button" reference="edited" class="btn btn-primary" id="${element._id}"><i class="fa fa-pencil-square-o" aria-hidden="true" id="${element._id}"></i></button></td>
                <td class="datatable-ct"><button type="button" reference="deleted" class="btn btn-danger" id="${element._id}"><i class="fa fa-trash-o" aria-hidden="true" id="${element._id}"></i></button></td>
            </tr>`;
        });
    }
    
    if(location.href.includes(`editeVehicule.html`)){
        const climatisation=document.getElementById('climatisation');
        $(`#photo`).change(function(event){
            const photoAdmin=document.getElementById('photoResponsive');
            const photo = $(`#photo`)[0].files[0]; // Ici photo va prendre deux valeur. undefind si l'input file n'est pas chargé sinon un objet qui contient toutes les informations sur l'image
            if(photo) photoAdmin.src=URL.createObjectURL(photo); // On récupère le path de l'image qui est une chaine de caractère chargé et on met dans une variale
        })
        
        $.ajax({
            type:`GET`,
            url:`${urlApi}getByIdCar/${location.href.split('#')[1]}`,
            headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
        })
        .then(response=>{
            const car=response.data;
            document.getElementById('marque').value=car.marque;
            document.getElementById('place').value=car.place;
            if(car.climatisation){
                const option=document.createElement('option'); option.value="1"; option.textContent="Oui"; option.selected=true; climatisation.append(option);
                const option1=document.createElement('option'); option1.value="0"; option1.textContent="Non"; climatisation.append(option1);
            }else{
                const option=document.createElement('option'); option.value="1"; option.textContent="Oui"; climatisation.append(option);
                const option1=document.createElement('option'); option1.value="0"; option1.selected=true; option1.textContent="Non"; climatisation.append(option1);
            }
            
            document.getElementById('id').value=car._id;
            document.getElementById('photoResponsive').src=imgPath+car.photo;
            
            $.ajax({
                type:'GET',
                url:`${urlApi}getAllLigne`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .done(res=>{
                const ligne_id=document.getElementById('ligne_id');
                const ln=res.data;
                ln.forEach(element=>{
                    const otherFlow=document.createElement('option'); otherFlow.value=element._id; otherFlow.textContent=element.villeA+" <=> "+element.villeB; ligne_id.append(otherFlow);
                    if(element._id===car.ligne_id[0]){
                        otherFlow.selected=true;
                    }
                })
            })
        });

        $(`#formulaireAdd`).submit(async event=>{
            event.preventDefault();
            let formData=new FormData();
            let marque=$(`#marque`).val();
            let place=$(`#place`).val();
            let climatisation=$(`#climatisation`).val();
            if(climatisation==="1"){
                climatisation=true
            }else{
                climatisation=false;
            }
            let photo=$(`#photo`).get(0).files[0];
            let ligne_id=$(`#ligne_id`).val();
            let id=$(`#id`).val();
            formData.append('marque', marque);
            formData.append('place', place);
            formData.append('climatisation', climatisation);
            formData.append('ligne_id', ligne_id);
            if(photo){formData.append('photo', photo)}
            formData.append('id', id);
            let all= await fetch(urlApi+'updateCar', {
                method: 'POST',
                body: formData,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(response=> {
                if(response.ok){
                    document.getElementById('alerter').hidden=false;
                    document.getElementById('alert').textContent="Enrégistrement effectué avec succès.";
                    document.getElementById('alert').className='alert alert-info';
                    document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                }else{
                    document.getElementById('alerter').hidden=false;
                    document.getElementById('alert').textContent=response.statusText;
                    document.getElementById('alert').className='alert alert-danger';
                }
            })
            .catch(error=>{
                document.getElementById('alerter').hidden=false;
                document.getElementById('alert').textContent=error;
                document.getElementById('alert').className='alert alert-danger';
            })
        })
    }


    if(location.href.includes(`addVehicules.html`)){
        $(`#photo`).change(function(event){
            const photoAdmin=document.getElementById('photoResponsive');
            const photo = $(`#photo`)[0].files[0]; // Ici photo va prendre deux valeur. undefind si l'input file n'est pas chargé sinon un objet qui contient toutes les informations sur l'image
            if(photo) photoAdmin.src=URL.createObjectURL(photo); // On récupère le path de l'image qui est une chaine de caractère chargé et on met dans une variale
        })

        $(`#formulaireAdd`).submit(async event=>{
            event.preventDefault();
            let formData=new FormData();
            let marque=$(`#marque`).val();
            let place=$(`#place`).val();
            let climatisation=$(`#climatisation`).val();
            let photo=$(`#photo`).get(0).files[0];
            let ligne_id=$('#ligne_id').val();


            formData.append('marque', marque);
            formData.append('place', place);
            formData.append('climatisation', climatisation);
            formData.append('photo', photo);
            formData.append('ligne_id', ligne_id);
            let all= await fetch(urlApi+'saveCar', {
                method: 'POST',
                body: formData,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(response=> {
                console.log(response)
                if(response.ok && response.status===200){
                    document.getElementById('alerter').hidden=false;
                    document.getElementById('alert').textContent="Enrégistrement effectué avec succès.";
                    document.getElementById('alert').className='alert alert-info';
                    document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                }else{
                    document.getElementById('alerter').hidden=false;
                    document.getElementById('alert').textContent=response.statusText;
                    document.getElementById('alert').className='alert alert-danger';
                }
            })
            .catch(error=>{
                console.log(error);
                document.getElementById('alerter').hidden=false;
                document.getElementById('alert').textContent="Une error est survenue lors du chargememnt du formulaire !";
                document.getElementById('alert').className='alert alert-danger';
            })
        })


        $.ajax({
            type:`GET`,
            url:`${urlApi}getAllLigne`,
            headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
        })
        .done(response=>{
            const ligne=response.data;
            const ligne_id=document.getElementById('ligne_id');
            ligne.forEach(element=>{
                const option=document.createElement('option'); option.value=element._id; option.textContent=`${element.villeA} <=> ${element.villeB}`; ligne_id.append(option)
            })
        })
        .fail(error=>{
            console.log(error)
            document.getElementById('alerter').hidden=false;
            document.getElementById('alert').textContent=error.msg;
            document.getElementById('alert').className='alert alert-danger';
        })
    }
}
})


