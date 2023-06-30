window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    if(!localStorage.SESSION_TRANSPORT && !location.href.includes('login.html') && !location.href.includes('register.html')){
        location.href='./login.html';
    }else{
        if(document.getElementById('deconnexion')){
            $('#deconnexion').click(event=>{
                event.preventDefault();
                event.stopPropagation();
                if(confirm('Vous êtes sur le point de fermer votre session')){
                    localStorage.removeItem('SESSION_TRANSPORT');
                    location.href='./login.html';
                }
            })
        }

        const imgPath='../../logics/';
        if(location.href.includes('administrateurs.html')){
            function editeLigne(event){location.href=`./editeAdministrateurs.html#${event.target.id}`}
            function deleteLigne(event){
                if(confirm(`Êtes-vous sûre de vouloir supprimer cet utilisateur ?`)){
                    $.ajax({
                        type:`POST`,
                        url:`${urlApi}deleteAdmin`,
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


            $.ajax({
                type:`GET`,
                url:`${urlApi}getAllAdmin`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .done(response=>{
                const admin=response.data;
                console.log(response)
                afficherAdministrateur(admin);

                const edited=document.querySelectorAll(`button[reference='edited']`);
                edited.forEach(element=>element.addEventListener(`click`, editeLigne));
                const deleted=document.querySelectorAll(`button[reference='deleted']`);
                deleted.forEach(element=>element.addEventListener(`click`, deleteLigne));
            })
        }

        function afficherAdministrateur(donnees){
            const my_tbody = document.getElementById('my-tbody');
            donnees.forEach((element, key) => {
                my_tbody.innerHTML+=
                `<tr data-index="${key+1}" id="tr-${element._id}">
                    <td class="bs-checkbox"><input data-index="${key}" name="btSelectItem" type="checkbox"></td>
                    <td style>${key+1}</td>
                    <td><a href="javascript:void(0)" data-name="Nom & Prénom" data-pk="nomPrenom" data-value="Web Development" class="editable editable-click">${element.nomPrenom}</a></td>
                    <td><a href="javascript:void(0)" data-name="Email" data-pk="undefined" data-value="${element.email}" class="editable editable-click">${element.email}</a></td>
                    <td><a href="javascript:void(0)" data-name="Téléphone" data-pk="undefined" data-value="${element.telephone}" class="editable editable-click">${element.telephone}</a></td>
                    <td class="datatable-ct"><a href="javascript:void(0)" data-name="role" data-pk="undefined" data-value="Admin" class="editable editable-click">Administrateur</a></td>
                    <td class="datatable-ct"><img src="${imgPath+element.photo}" data-name="role" data-pk="undefined" data-value="${element.photo}" class="editable editable-click" style="width:100px; height:30px"/></td>

                    <td>${new Date(element.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                    <td class="datatable-ct">${new Date(element.updatedAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
                    <td class="datatable-ct"><button type="button" reference="edited" class="btn btn-primary" id="${element._id}"><i class="fa fa-pencil-square-o" aria-hidden="true" id="${element._id}"></i></button></td>
                    <td class="datatable-ct"><button type="button" reference="deleted" class="btn btn-danger" id="${element._id}"><i class="fa fa-trash-o" aria-hidden="true" id="${element._id}"></i></button></td>
                </tr>`
            });
        }


        if(location.href.includes(`editeAdministrateurs.html`)){
            $(`#retour`).click((event=>{
                event.preventDefault();
                if(location.href.includes(`editeAdministrateurs`) || location.href.includes(`addAdministrateurs`)) location.href=`./administrateurs.html`;
                if(location.href.includes(`editdeConducteur`) || location.href.includes(`addConducteur`)) location.href=`./machinistes.html`;
            }));
            $(`#photo`).change(function(event){
                const photoAdmin=document.getElementById('photoResponsive');
                const photo = $(`#photo`)[0].files[0]; // Ici photo va prendre deux valeur. undefind si l'input file n'est pas chargé sinon un objet qui contient toutes les informations sur l'image
                if(photo) photoAdmin.src=URL.createObjectURL(photo); // On récupère le path de l'image qui est une chaine de caractère chargé et on met dans une variale
            });
            $.ajax({
                type:`GET`,
                url:`${urlApi}getByIdAdmin/${location.href.split('#')[1]}`,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(response=>{
                const admins=response.data;
                document.getElementById('nomPrenom').value=admins.nomPrenom;
                document.getElementById('email').value=admins.email;
                document.getElementById('telephone').value=admins.telephone;
                document.getElementById('photoResponsive').value=admins.photo;
                const selectRole=document.getElementById("selectRole");

                $.ajax({
                    type:`GET`,
                    url:`${urlApi}getAllRole`,
                    headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
                })
                .done(res=>{
                    const roles=res.data;
                    if(roles){
                        roles.forEach(item=>{
                            const option=document.createElement('option'); option.value=item._id; option.textContent=item.libelle; selectRole.append(option);
                            if(item._id===response.data.role[0]){option.selected=true;}
                        })
                    }else{const option=document.createElement('option'); option.value=""; option.textContent="No role"; selectRole.append(option);}
                })
                document.getElementById('id').value=admins._id;
                document.getElementById('photoResponsive').src=imgPath+admins.photo;
            })

            $(`#formulaireAdd`).submit(async event=>{
                event.preventDefault();
                let formData=new FormData();
                let nomPrenom=$(`#nomPrenom`).val();
                let email=$(`#email`).val();
                let telephone=$(`#telephone`).val();
                let role=$(`#role`).val();
                let photo=$(`#photo`).get(0).files[0];
                let id=$(`#id`).val();
                formData.append('nomPrenom', nomPrenom);
                formData.append('email', email);
                formData.append('telephone', telephone);
                formData.append('role', role);
                if(photo){formData.append('photo', photo)}
                formData.append('id', id);
                let all= await fetch(`${urlApi}updateAdmin`, {
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