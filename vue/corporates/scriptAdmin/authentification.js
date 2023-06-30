window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    if(location.href.includes('login.html')){
        if(localStorage.getItem('SESSION_TRANSPORT')){
            location.href=`./dashboard.html`;
        }else{
            const registers=document.getElementById('registers');
            registers.style.cursor='pointer';
            const alerter=document.getElementById('alert');
            alerter.role="alert";
            registers.addEventListener('click', e=>{location.href='./register.html'});
            $('#formulaireAdd').submit(async event=>{
                event.preventDefault();
                alerter.textContent='';
                const formulaire=document.getElementById('formulaireAdd');
                const formData=new FormData(formulaire);
                const data=new URLSearchParams(formData);
                await fetch(`${urlApi}loginAdmin`, {
                    method:'POST',
                    body:data
                })
                .then(res=>res.json())
                .then(succes=>{
                    if(succes.user){
                        const localData={body:succes, exprire: new Date()}
                        localStorage.setItem("SESSION_TRANSPORT", JSON.stringify(localData));
                        document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                        let compteur=3;
                        const intervalle=setInterval(() => {
                            alerter.className='alert alert-success';
                            alerter.textContent=`Enrégistrement effectué avec succès. ${compteur} minute(s).`;
                            if(compteur==0){
                                alerter.textContent=``;
                                document.getElementById('alerter').hidden=true;
                                clearInterval(intervalle);
                                location.href="./dashboard.html";
                            }
                            compteur--;
                        }, 800);
                    }else{
                        alerter.className='alert alert-danger';
                        alerter.textContent=`Email ou mot de passe érronné.`;
                    }
                })
                .catch(error=>{
                    alerter.className='alert alert-danger';
                    alerter.textContent=`Connexion échouée, réessayez plus tart !`;
                })
            })
        }
    }


    if(location.href.includes('login2.html')){
        if(localStorage.getItem('SESSION_TRANSPORT')){
            location.href=`./profile.html`;
        }else{
            const registers=document.getElementById('registers');
            registers.style.cursor='pointer';
            const alerter=document.getElementById('alert');
            alerter.role="alert";
            registers.addEventListener('click', e=>{location.href='./register2.html'});
            $('#formulaireAdd').submit(async event=>{
                event.preventDefault();
                alerter.textContent='';
                const formulaire=document.getElementById('formulaireAdd');
                const formData=new FormData(formulaire);
                const data=new URLSearchParams(formData);
                await fetch(`${urlApi}loginMachiniste`, {
                    method:'POST',
                    body:data
                })
                .then(res=>res.json())
                .then(succes=>{
                    if(succes.user){
                        const localData={body:succes, exprire: new Date()}
                        localStorage.setItem("SESSION_TRANSPORT", JSON.stringify(localData));
                        document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                        let compteur=3;
                        const intervalle=setInterval(() => {
                            alerter.className='alert alert-success';
                            alerter.textContent=`Enrégistrement effectué avec succès. ${compteur} minute(s).`;
                            if(compteur==0){
                                alerter.textContent=``;
                                document.getElementById('alerter').hidden=true;
                                clearInterval(intervalle);
                                location.href="./profile.html";
                            }
                            compteur--;
                        }, 800);
                    }else{
                        alerter.className='alert alert-danger';
                        alerter.textContent=`Email ou mot de passe érronné.`;
                    }
                })
                .catch(error=>{
                    alerter.className='alert alert-danger';
                    alerter.textContent=`Connexion échouée, réessayez plus tart !`;
                })
            })
        }
    }


    if(location.href.includes('login3.html')){
        
        if(localStorage.getItem('SESSION_TRANSPORT')){
            location.href=`./profile.html`;
        }else{
            const registers=document.getElementById('registers');
            registers.style.cursor='pointer';
            const alerter=document.getElementById('alert');
            alerter.role="alert";
            registers.addEventListener('click', e=>{location.href='./register3.html'});
            $('#formulaireAdd').submit(async event=>{
                event.preventDefault();
                alerter.textContent='';
                const formulaire=document.getElementById('formulaireAdd');
                const formData=new FormData(formulaire);
                const data=new URLSearchParams(formData);
                console.log(data)
                // await fetch(`${urlApi}loginPassager`, {
                await fetch(`http://localhost:3000/api/loginPassager`, {
                    method:'POST',
                    body:data
                })
                .then(res=>res.json())
                .then(succes=>{
                    if(succes.user){
                        const localData={body:succes, exprire: new Date()}
                        localStorage.setItem("SESSION_TRANSPORT", JSON.stringify(localData));
                        document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
                        let compteur=3;
                        const intervalle=setInterval(() => {
                            alerter.className='alert alert-success';
                            alerter.textContent=`Enrégistrement effectué avec succès. ${compteur} minute(s).`;
                            if(compteur==0){
                                alert.textContent=``;
                                document.getElementById('alerter').hidden=true;
                                clearInterval(intervalle);
                                location.href="./profile.html";
                            }
                            compteur--;
                        }, 800);
                    }else{
                        alerter.className='alert alert-danger';
                        alerter.textContent=`Email ou mot de passe érronné.`;
                    }
                })
                .catch(error=>{
                    alerter.className='alert alert-danger';
                    alerter.textContent=`Connexion échouée, réessayez plus tart !`;
                })
            })
        }
    }
})