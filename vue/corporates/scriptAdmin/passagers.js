window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    if(!localStorage.SESSION_TRANSPORT){
        location.href='./login3.html';
    }else{
        if(document.getElementById('deconnexion')){
            $('#deconnexion').click(event=>{
                event.preventDefault();
                if(confirm('Vous êtes sur le point de fermer votre session')){
                    localStorage.removeItem('SESSION_TRANSPORT');
                    location.href='./login3.html';
                }
            })
        }

        const imgPath='../../logics/';
        if(location.href.includes('passagers.html')){
            function edite(event){location.href=`./editePassagers.html#${event.target.id}`}
            function deletde(event){
                if(confirm(`Êtes-vous sûre de vouloir supprimer cet utilisateur ?`)){
                    $.ajax({
                        type:`POST`,
                        url:`${urlApi}deletePassager`,
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
                url:`${urlApi}getAllPassager`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .done(response=>{
                const machiniste=response.data;
                afficher(machiniste);
                const edited=document.querySelectorAll(`button[reference='edited']`);
                edited.forEach(element=>element.addEventListener(`click`, edite));
                const deleted=document.querySelectorAll(`button[reference='deleted']`);
                deleted.forEach(element=>element.addEventListener(`click`, deletde));
            })
        }

        function afficher(donnees){
            const my_tbody = document.getElementById('my-tbody');
            donnees.forEach((element, key) => {
                my_tbody.innerHTML+=
                `<tr data-index="${key+1}" id="tr-${element._id}">
                    <td class="bs-checkbox"><input data-index="${key}" name="btSelectItem" type="checkbox"></td>
                    <td style>${key+1}</td>
                    <td><a href="javascript:void(0)" data-name="Nom & Prénom" data-pk="nomPrenom" data-value="${element.nomPrenom}" class="editable editable-click">${element.nomPrenom}</a></td>
                    <td><a href="javascript:void(0)" data-name="Email" data-pk="undefined" data-value="${element.email}" class="editable editable-click">${element.email}</a></td>
                    <td><a href="javascript:void(0)" data-name="Téléphone" data-pk="undefined" data-value="${element.telephone}" class="editable editable-click">${element.telephone}</a></td>
                    <td><img data-name="photo" data-pk="${element._id}" data-value="${element.photo}" src="${imgPath+element.photo}" style="width:100px; height:40px"/></td>
                    <td>${new Date(element.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                    <td class="datatable-ct">${new Date(element.updatedAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                    <td class="datatable-ct"><button type="button" reference="edited" class="btn btn-primary" id="${element._id}"><i class="fa fa-pencil-square-o" aria-hidden="true" id="${element._id}"></i></button></td>
                    <td class="datatable-ct"><button type="button" reference="deleted" class="btn btn-danger" id="${element._id}"><i class="fa fa-trash-o" aria-hidden="true" id="${element._id}"></i></button></td>
                </tr>`
            });
        }
        

        

        if(location.href.includes(`editePassagers.html`)){
            
            $(`#retour`).click((event=>{
                event.preventDefault();
                if(location.href.includes(`editePassagers`) || location.href.includes(`addPassagers`)) location.href=`./Passagers.html`;
            }));
            $(`#photo`).change(function(event){
                const photomachiniste=document.getElementById('photoResponsive');
                const photo = $(`#photo`)[0].files[0]; // Ici photo va prendre deux valeur. undefind si l'input file n'est pas chargé sinon un objet qui contient toutes les informations sur l'image
                if(photo) photomachiniste.src=URL.createObjectURL(photo); // On récupère le path de l'image qui est une chaine de caractère chargé et on met dans une variale
            });
            $.ajax({
                type:`GET`,
                url:`${urlApi}getByIdPassager/${location.href.split('#')[1]}`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(response=>{
                const passager=response.data;
                console.log('passager', passager)
                document.getElementById('nomPrenom').value=passager.nomPrenom;
                document.getElementById('email').value=passager.email;
                document.getElementById('telephone').value=passager.telephone;
                document.getElementById('photoResponsive').value=passager.photo;
                document.getElementById('id').value=passager._id;
                document.getElementById('photoResponsive').src=imgPath+passager.photo;
            })

            $(`#formulaireAdd`).submit(async event=>{
                event.preventDefault();
                let formData=new FormData();
                let nomPrenom=$(`#nomPrenom`).val();
                let email=$(`#email`).val();
                let telephone=$(`#telephone`).val();
                let photo=$(`#photo`).get(0).files[0];
                let id=$(`#id`).val();
                formData.append('nomPrenom', nomPrenom);
                formData.append('email', email);
                formData.append('telephone', telephone);
                if(photo){formData.append('photo', photo)}
                formData.append('id', id);
                let all= await fetch(urlApi+'updatePassager', {
                    method: 'POST',
                    body: formData,
                    headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
                })
                .then(response=> {
                    document.getElementById('alerter').hidden=false;
                    document.getElementById('alert').textContent="Enrégistrement effectué avec succès.";
                    document.getElementById('alert').className='alert alert-info';
                    document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                })
                .catch(error=>{
                    document.getElementById('alerter').hidden=false;
                    document.getElementById('alert').textContent=error;
                    document.getElementById('alert').className='alert alert-danger';
                })
            })
        }
    }
})