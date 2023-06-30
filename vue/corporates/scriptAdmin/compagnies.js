window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    if(!localStorage.SESSION_TRANSPORT){
        location.href='./login.html';
    }else{

        const intervalle=setInterval(() => {
            $(`#photo`).change(function(event){
                appLogo.hidden=false;
                const photoAdmin=document.getElementById('app-');
                const photo = $(`#photo`)[0].files[0]; // Ici photo va prendre deux valeur. undefind si l'input file n'est pas chargé sinon un objet qui contient toutes les informations sur l'image
                if(photo) photoAdmin.src=URL.createObjectURL(photo); // On récupère le path de l'image qui est une chaine de caractère chargé et on met dans une variale
            });
            const actionOne=document.getElementById('actionOne');
            const raisSoc=document.getElementById('raisonSociale').value;
            const actionTwo=document.getElementById('actionTwo');
            const appLogo=document.getElementById('app-logo');
            const rowSubmit=document.getElementById('row-submit');
            if(raisSoc===''){
                appLogo.hidden=true;
                actionOne.textContent='Ajouter Informations Compagnie';
                actionTwo.hidden=true;
                const demo1Upload=document.getElementById('demo1-upload');
                demo1Upload.addEventListener('submit', async  event=>{
                    event.preventDefault();
                    let telephone=document.getElementById('telephone');
                    if(telephone.value.length >=10 && telephone.value.split('').every(item=>'0123456789'.includes(item))){
                        let formData=new FormData();

                        let raisonSociale=$('#raisonSociale').val();
                        let acronyme=$('#acronyme').val();
                        let slogan=$('#slogan').val();
                        let photo=$('#photo').get(0).files[0];
                        let dateCreation=new Date($('#dateCreation').val());
                        let email=$('#email').val();
                        let telephone=$('#telephone').val();
                        let copyright=$('#copyright').val();
                        console.log('photo', photo)

                        formData.append('raisonSociale', raisonSociale);
                        formData.append('acronyme', acronyme);
                        formData.append('slogan', slogan);

                        formData.append('photo', photo);
                        formData.append('dateCreation', dateCreation);
                        formData.append('email', email);
                        formData.append('telephone', telephone);
                        formData.append('copyright', copyright);

                        let all = await fetch(`${urlApi}saveCompagny`, {
                            method:'POST',
                            body:formData,
                            headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
                        })
                        .then(res=>res.json())
                        .then(resopnse=>{
                            console.log(resopnse)
                        })
                        .catch(er=>er.json())
                        .catch(error=>{
                            console.log(error)
                        })
                    }else{
                        telephone.focus();
                    }
                });
            }else{
                rowSubmit.hidden=true;
                actionOne.textContent='Informations de la Compagnie';
                actionTwo.hidden=false;
                const input=document.getElementById('demo1-upload').querySelectorAll('input');
                input.forEach(element=>element.disabled=true);
                document.getElementById('demo1-upload').id='demo2-upload';
                actionTwo.addEventListener('click', event=>{
                    input.forEach(element=>element.disabled=false);
                    rowSubmit.hidden=false;
                });
                actionOne.addEventListener('click', event=>{
                    input.forEach(element=>element.disabled=true);
                    rowSubmit.hidden=true;
                });

                const demo2Upload=document.getElementById('demo2-upload');
                demo2Upload.addEventListener('submit', async  event=>{
                    event.preventDefault();
                    let telephone=document.getElementById('telephone');
                    if(telephone.value.length >=10 && telephone.value.split('').every(item=>'0123456789'.includes(item))){
                        let formData=new FormData();

                        let raisonSociale=$('#raisonSociale').val();
                        let acronyme=$('#acronyme').val();
                        let slogan=$('#slogan').val();
                        let photo=$('#photo').get(0).files[0];
                        let dateCreation=new Date($('#dateCreation').val());
                        let email=$('#email').val();
                        let telephone=$('#telephone').val();
                        let copyright=$('#copyright').val();
                        let id=$('#id').val();

                        formData.append('raisonSociale', raisonSociale);
                        formData.append('acronyme', acronyme);
                        formData.append('slogan', slogan);
                        if(photo){formData.append('photo', photo)}
                        formData.append('dateCreation', dateCreation);
                        formData.append('email', email);
                        formData.append('telephone', telephone);
                        formData.append('copyright', copyright);
                        formData.append('id', id);

                        let all = await fetch(urlApi+'updateCompagny', {
                            method:'POST',
                            body:formData,
                            headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
                        })
                        .then(res=>res.json())
                        .then(resopnse=>{
                            console.log(resopnse)
                        })
                        .catch(er=>er.json())
                        .catch(error=>{
                            console.log(error)
                        })
                    }else{
                        telephone.focus();
                    }
                });

            }
            clearInterval(intervalle)
        }, 2500);
        

        fetch(urlApi+'getAllCompagny', {
            method:'GET',
            headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
        })
        .then(res=>res.json())
        .then(succes=>{
            if(succes.data.length>0){
                const imgPath='../../logics/';
                const myLogo=document.querySelectorAll('img[logo=my-logo]');
                console.log(myLogo)
                succes.data.forEach(element => {
                    document.getElementById('raisonSociale').value=element.raisonSociale;
                    document.getElementById('acronyme').value=element.acronyme;
                    document.getElementById('slogan').value=element.slogan;
                    const date=new Date(element.dateCreation).toLocaleDateString("en-GB").split('/');
                    document.getElementById('dateCreation').value=`${date[date.length-1]}-${date[1]}-${date[0]}`;
                    document.getElementById('email').value=element.email;
                    document.getElementById('telephone').value=element.telephone;
                    document.getElementById('app-').src=imgPath+element.photo;
                    myLogo.forEach(item=>item.src=imgPath+element.photo);
                    document.getElementById('copyright').value=element.copyright;
                    document.querySelector('.copyright').innerHTML=element.copyright;

                    const divId=document.getElementById('div-id');
                    const id=document.createElement('input'); id.value=element._id; id.id='id'; id.name='id'; divId.append(id);  id.hidden=true;
                });
                
            }
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
})