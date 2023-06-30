window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    if(document.getElementById('colonneDelete')){
        document.getElementById('colonneDelete').remove();
    }

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
        if(location.href.includes('lignes.html')){
            function editeLigne(event){location.href=`./editeLigne.html#${event.target.id}`}
            function deleteLigne(event){
                if(confirm(`Êtes-vous sûre de vouloir supprimer cet utilisateur ?`)){
                    $.ajax({
                        type:`POST`,
                        url:`${urlApi}deleteLigne`,
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
                    .fail(error=>{responseJSON
                        document.getElementById(`tr-${event.target.id}`).className="alert alert-info";
                        document.getElementById(`tr-${event.target.id}`).role="alert";
                    })
                }
            }


            $.ajax({
                type:`GET`,
                url:`${urlApi}getAllLigne`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .done(response=>{
                const car=response.data;
                console.log(response)
                afficherCar(car);

                const edited=document.querySelectorAll(`button[reference='edited']`);
                edited.forEach(element=>element.addEventListener(`click`, editeLigne));
                const deleted=document.querySelectorAll(`button[reference='deleted']`);
                deleted.forEach(element=>element.addEventListener(`click`, deleteLigne));
            })
        }

        function afficherCar(personnel){
            const my_tbody = document.getElementById('my-tbody');
            personnel.forEach((element, key) => {
                my_tbody.innerHTML+=
                `<tr data-index="${key+1}" id="tr-${element._id}">
                    <td class="bs-checkbox"><input data-index="${key}" name="btSelectItem" type="checkbox"></td>
                    <td style>${key+1}</td>
                    <td><a href="javascript:void(0)" data-name="villeA" data-pk="${element._id}" data-value="${element.villeA}" class="editable editable-click">${element.villeA}</a></td>
                    <td><a href="javascript:void(0)" data-name="villeB" data-pk="${element._id}" data-value="${element.villeB}" class="editable editable-click">${element.villeB}</a></td>
                    <td><a href="javascript:void(0)" data-name="distance" data-pk="${element._id}" data-value="${element.distance}" class="editable editable-click">${element.distance} km</a></td>
                    <td><a href="javascript:void(0)" data-name="montant" data-pk="${element._id}" data-value="${element.montant}" class="editable editable-click">${element.montant} FCFA</a></td>
                    <td><img data-name="photo" data-pk="${element._id}" data-value="${element.photo}" src="${imgPath+element.photo}" style="width:30px; height:30px"/></td>
                    <td>${new Date(element.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                    <td class="datatable-ct">${new Date(element.updatedAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                    <td class="datatable-ct"><button type="button" reference="edited" class="btn btn-primary" id="${element._id}"><i class="fa fa-pencil-square-o" aria-hidden="true" id="${element._id}"></i></button></td>
                    <td class="datatable-ct"><button type="button" reference="deleted" class="btn btn-danger" id="${element._id}"><i class="fa fa-trash-o" aria-hidden="true" id="${element._id}"></i></button></td>
                </tr>`;
            });
        }
        
        if(location.href.includes(`editeLigne.html`)){
            $(`#photo`).change(function(event){
                const photoAdmin=document.getElementById('photoResponsive');
                const photo = $(`#photo`)[0].files[0]; // Ici photo va prendre deux valeur. undefind si l'input file n'est pas chargé sinon un objet qui contient toutes les informations sur l'image
                if(photo) photoAdmin.src=URL.createObjectURL(photo); // On récupère le path de l'image qui est une chaine de caractère chargé et on met dans une variale
            })

            $.ajax({
                type:`GET`,
                url:`${urlApi}getByIdLigne/${location.href.split('#')[1]}`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(response=>{
                const ligne=response.data;
                document.getElementById('villeA').value=ligne.villeA;
                document.getElementById('villeB').value=ligne.villeB;
                document.getElementById('distance').value=ligne.distance;
                document.getElementById('montant').value=ligne.montant;
                document.getElementById('id').value=ligne._id;
                document.getElementById('photoResponsive').src=imgPath+ligne.photo;
            })

            $(`#formulaireAdd`).submit(async event=>{
                event.preventDefault();
                let formData=new FormData();
                let villeA=$(`#villeA`).val();
                let villeB=$(`#villeB`).val();
                let distance=$(`#distance`).val();
                let montant=$(`#montant`).val();
                let photo=$(`#photo`).get(0).files[0];
                let id=$(`#id`).val();
                console.log('(-(-(---(',id)

                formData.append('villeA', villeA);
                formData.append('villeB', villeB);
                formData.append('distance', distance);
                formData.append('montant', montant);
                if(photo){formData.append('photo', photo)}
                formData.append('id', id);
                console.log(JSON.parse(localStorage.SESSION_TRANSPORT))
                let all= await fetch(urlApi+'updateLigne', {
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
                    document.getElementById('alert').textContent=error;
                    document.getElementById('alert').className='alert alert-danger';
                })
            })
        }

        if(location.href.includes('addLigne.html')){
            $(`#photo`).change(function(event){
                const photoAdmin=document.getElementById('photoResponsive');
                const photo = $(`#photo`)[0].files[0]; // Ici photo va prendre deux valeur. undefind si l'input file n'est pas chargé sinon un objet qui contient toutes les informations sur l'image
                if(photo) photoAdmin.src=URL.createObjectURL(photo); // On récupère le path de l'image qui est une chaine de caractère chargé et on met dans une variale
            })

            $(`#formulaireAdd`).submit(async event=>{
                document.getElementById('alerter').hidden=true;
                event.preventDefault();
                let formData=new FormData();
                let villeA=$(`#villeA`).val();
                let villeB=$(`#villeB`).val();
                let distance=$(`#distance`).val();
                let montant=$(`#montant`).val();
                let photo=$(`#photo`).get(0).files[0];
                formData.append('villeA', villeA);
                formData.append('villeB', villeB);
                formData.append('distance', distance);
                formData.append('montant', montant);
                formData.append('photo', photo);
                let all= await fetch(urlApi+'saveLigne', {
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
        }
    }
})


