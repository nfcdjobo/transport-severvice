window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    const logins=document.getElementById('logins');
    logins.style.cursor='pointer';
    if(location.href.includes(`register.html`)){
        if(localStorage.getItem('SESSION_TRANSPORT')){
            location.href=`./dashboard.html`;
        }else{
            logins.addEventListener('click', e=>{location.href='./login.html'});
            $(`#formulaireAdd`).submit(async event=>{
                event.preventDefault();
                let formData=new FormData();
                let nomPrenom=$(`#nomPrenom`).val();
                let email=$(`#email`).val();
                let telephone=$(`#telephone`).val();
                let photo=$(`#photo`).get(0).files[0];
                let password=$('#password').val();
                
                formData.append('nomPrenom', nomPrenom);
                formData.append('email', email);
                formData.append('telephone', telephone);
                formData.append('password', password)
                if(photo){formData.append('photo', photo)}
                let all= await fetch(urlApi+'saveAdmin', {
                    method:'POST',
                    body: formData
                })
                .then(response=> {
                    if(response.ok){
                        document.getElementById('alerter').hidden=false;
                        document.getElementById('alert').className='btn btn-success';
                        document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                        document.getElementById('alert').textContent=`Enrégistrement effectué avec succès.`;
                        const intervalle=setInterval(()=>{
                            location.href="login.html";
                            clearInterval(intervalle)
                        }, 2000)
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
    }

    if(location.href.includes(`register2.html`)){
        if(localStorage.getItem('SESSION_TRANSPORT')){
            location.href=`./profile.html`;
        }else{
            logins.addEventListener('click', e=>{location.href='./login2.html'});
            $(`#formulaireAdd`).submit(async event=>{
                event.preventDefault();
                let formData=new FormData();
                let nomPrenom=$(`#nomPrenom`).val();
                let email=$(`#email`).val();
                let telephone=$(`#telephone`).val();
                let photo=$(`#photo`).get(0).files[0];
                let password=$('#password').val();
                
                formData.append('nomPrenom', nomPrenom);
                formData.append('email', email);
                formData.append('telephone', telephone);
                formData.append('password', password)
                if(photo){formData.append('photo', photo)}
                let all= await fetch(urlApi+'saveMachiniste', {
                    method:'POST',
                    body: formData
                })
                .then(response=> {
                    if(response.ok){
                        document.getElementById('alerter').hidden=false;
                        document.getElementById('alert').className='btn btn-success';
                        document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                        document.getElementById('alert').textContent=`Enrégistrement effectué avec succès.`;
                        const intervalle=setInterval(()=>{
                            location.href="login2.html";
                            clearInterval(intervalle)
                        }, 2000)
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
    }


    if(location.href.includes(`register3.html`)){
        if(localStorage.getItem('SESSION_TRANSPORT')){
            location.href=`./profile.html`;
        }else{
            logins.addEventListener('click', e=>{location.href='./login2.html'});
            $(`#formulaireAdd`).submit(async event=>{
                event.preventDefault();
                let formData=new FormData();
                let nomPrenom=$(`#nomPrenom`).val();
                let email=$(`#email`).val();
                let telephone=$(`#telephone`).val();
                let photo=$(`#photo`).get(0).files[0];
                let password=$('#password').val();
                
                formData.append('nomPrenom', nomPrenom);
                formData.append('email', email);
                formData.append('telephone', telephone);
                formData.append('password', password)
                if(photo){formData.append('photo', photo)}
                let all= await fetch(urlApi+'savePassager', {
                    method:'POST',
                    body: formData
                })
                .then(response=> {
                    if(response.ok){
                        document.getElementById('alerter').hidden=false;
                        document.getElementById('alert').className='btn btn-success';
                        document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                        document.getElementById('alert').textContent=`Enrégistrement effectué avec succès.`;
                        const intervalle=setInterval(()=>{
                            location.href="login3.html";
                            clearInterval(intervalle)
                        }, 2000)
                    }else{
                        document.getElementById('alerter').hidden=false;
                        document.getElementById('alert').textContent=response.statusText;
                        document.getElementById('alert').className='alert alert-danger';
                    }
                })
                .catch(error=>{
                    document.getElementById('alerter').hidden=false;
                    document.getElementById('alert').textContent="Une erreur s'est produite, réessayez plus tart";
                    document.getElementById('alert').className='alert alert-danger';
                })
            })    
        }    
    }
})