window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    const [myPhoto, myName, myEmail, myTelephone, myRole, myPhotoProfil, adminName]=[
        document.getElementById('my-photo'),
        document.getElementById('my-name'),
        document.getElementById('my-email'),
        document.getElementById('my-telephone'),
        document.getElementById('my-role'),
        document.getElementById('phto-user'),
        document.getElementById('admin-name')
    ];
    const code=JSON.parse(localStorage.SESSION_TRANSPORT).body.user.code;
    
    const user=JSON.parse(localStorage.SESSION_TRANSPORT).body.user;
    const imgPath='./../../logics/';
    myPhoto.src=imgPath+user.photo;
    myName.textContent=user.nomPrenom;
    myEmail.textContent=user.email;
    myTelephone.textContent=user.telephone;
    myRole.textContent=user.role;
    myPhotoProfil.src=imgPath+user.photo;
    adminName.textContent=[...user.nomPrenom.split(' ').slice(0, 2)];
    const alerter=document.getElementById('alerter');

    document.getElementById('nomPrenom').value=user.nomPrenom;
    document.getElementById('email').value=user.email;
    document.getElementById('telephone').value=user.telephone;
    document.getElementById('id').value=user._id;
    const avatar=document.getElementById('photo');
    avatar.addEventListener('change', event=>{
        const photo=$('#photo').get(0).files[0];
        if(photo){
            myPhoto.src=URL.createObjectURL(photo);
        }
    });

    const formulaire=$('#formulaire');
    formulaire.submit(event=>{
        event.preventDefault();
        const nomPrenom=$('#nomPrenom').val();
        const email=$('#email').val();
        const telephone=$('#telephone').val();
        const id=$('#id').val();
        const photo=$('#photo').get(0).files[0];
        const formData=new FormData();
        formData.append('id', id)
        formData.append('nomPrenom', nomPrenom);
        formData.append('email', email);
        if(photo){formData.append('photo', photo)};
        if(code.includes("ADMIN")){
            fetch(urlApi+'updateAdmin', {
                method:'POST',
                body:formData,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(res=>res.json())
            .then(async succes=>{
                const dataLocalStrogage= await JSON.parse(localStorage.SESSION_TRANSPORT);
                dataLocalStrogage.body.user=succes.admin;
                localStorage.setItem('SESSION_TRANSPORT',JSON.stringify(dataLocalStrogage));
                alerter.className='alert alert-info';
                alerter.textContent=succes.msg;
            })
            .catch(error=>{
                alerter.className='alert alert-danger';
                alerter.textContent="Une erreur s'est produite lors de la modification des données.";
            })
        }
        else if(code.includes("PASSAG")){
            fetch(urlApi+'updatePassager2', {
                method:'POST',
                body:formData,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(res=>res.json())
            .then(async succes=>{
                const dataLocalStrogage= await JSON.parse(localStorage.SESSION_TRANSPORT);
                dataLocalStrogage.body.user=succes.data;
                localStorage.setItem('SESSION_TRANSPORT', JSON.stringify(dataLocalStrogage));
                alerter.className='alert alert-info';
                alerter.textContent=succes.msg;
            })
            .catch(error=>{
                alerter.className='alert alert-danger';
                alerter.textContent="Une erreur s'est produite lors de la modification des données.";
            })
        }
        else{
            fetch(urlApi+'updateMachiniste2', {
                method:'POST',
                body:formData,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(res=>res.json())
            .then(async succes=>{
                const dataLocalStrogage= await JSON.parse(localStorage.SESSION_TRANSPORT);
                dataLocalStrogage.body.user=succes.admin;
                localStorage.setItem('SESSION_TRANSPORT', JSON.stringify(dataLocalStrogage));
                alerter.className='alert alert-info';
                alerter.textContent=succes.msg;
            })
            .catch(error=>{
                alerter.className='alert alert-danger';
                alerter.textContent="Une erreur s'est produite lors de la modification des données.";
            })
        }
    });

    
    $('#formPassword').submit(event=>{
        event.preventDefault();
        const ancienPassword=document.getElementById('ancienPassword').value;
        const password=document.getElementById('password').value;
        const confirmPassword=document.getElementById('confirmPassword').value;
        const msg=document.getElementById('msg');
        const msgAncien=document.getElementById('msg-ancien');
        const alerterPass=document.getElementById('alerterPass');
        alerterPass.textContent='';
        alerterPass.className='';

        if(password.replaceAll(' ', '').length<4 || password!=confirmPassword){
            msg.textContent='Mot de passe incorrect ou court !';
            msg.style.color='red';
            document.getElementById('confirmPassword').focus();
            document.getElementById('confirmPassword');
            document.getElementById('confirmPassword').addEventListener('input', ()=>msg.textContent='')
            return
        }
        const formPassword=document.getElementById('formPassword');
        const formData=new FormData(formPassword);
        formData.append('email', JSON.parse(localStorage.SESSION_TRANSPORT).body.user.email)
        const data=new URLSearchParams(formData)
        console.log(data)
        
        if(code.includes('ADMIN')){
            fetch(urlApi+'updatedAdmin', {
                method:'POST',
                body: data
            })
            .then(res=>res.json())
            .then(succes=>{
                if(succes.msg.includes('ancien mot de passe')){
                    msgAncien.textContent="Ce mot de passe ne correspond pas à l'ancien.";
                    msgAncien.style.color='red';
                    document.getElementById('ancienPassword').focus();
                    document.getElementById('ancienPassword').addEventListener('input', ()=>{
                        msgAncien.textContent='';
                    });
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else if(succes.msg.includes('Modification')){
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else if(succes.msg.includes("compte n'existe pas")){
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else{
                    alerterPass.className='alert alert-info';
                    alerterPass.textContent=succes.msg;
                    document.getElementById('ancienPassword').value='';
                    document.getElementById('password').value='';
                    document.getElementById('confirmPassword').value='';
                }
            })
        }
        else if(code.includes('MACHIN')){
            fetch(urlApi+'updatedMachiniste', {
                method:'POST',
                body: data
            })
            .then(res=>res.json())
            .then(succes=>{
                if(succes.msg.includes('ancien mot de passe')){
                    msgAncien.textContent="Ce mot de passe ne correspond pas à l'ancien.";
                    msgAncien.style.color='red';
                    document.getElementById('ancienPassword').focus();
                    document.getElementById('ancienPassword').addEventListener('input', ()=>{
                        msgAncien.textContent='';
                    });
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else if(succes.msg.includes('Modification')){
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else if(succes.msg.includes("compte n'existe pas")){
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else{
                    alerterPass.className='alert alert-info';
                    alerterPass.textContent=succes.msg;
                    document.getElementById('ancienPassword').value='';
                    document.getElementById('password').value='';
                    document.getElementById('confirmPassword').value='';
                }
            })
            
        }else if(code.includes('PASSAG')){
            fetch(urlApi+'updatedPassager', {
                method:'POST',
                body: data
            })
            .then(res=>res.json())
            .then(succes=>{
                if(succes.msg.includes('ancien mot de passe')){
                    msgAncien.textContent="Ce mot de passe ne correspond pas à l'ancien.";
                    msgAncien.style.color='red';
                    document.getElementById('ancienPassword').focus();
                    document.getElementById('ancienPassword').addEventListener('input', ()=>{
                        msgAncien.textContent='';
                    });
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else if(succes.msg.includes('Modification')){
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else if(succes.msg.includes("compte n'existe pas")){
                    alerterPass.className='alert alert-danger';
                    alerterPass.textContent=succes.msg;
                }else{
                    alerterPass.className='alert alert-info';
                    alerterPass.textContent=succes.msg;
                    document.getElementById('ancienPassword').value='';
                    document.getElementById('password').value='';
                    document.getElementById('confirmPassword').value='';
                }
            })
        }
    })


})