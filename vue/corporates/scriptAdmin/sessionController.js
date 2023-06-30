window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    if(localStorage.SESSION_TRANSPORT){
        const donneesLocal=JSON.parse(localStorage.SESSION_TRANSPORT);
        const today=new Date();
        const expiredDate=new Date(donneesLocal.exprire);
        if(today-expiredDate>5*60*60*1000){
            if(donneesLocal.body.user.code.includes('ADMI')){
                localStorage.removeItem('SESSION_TRANSPORT');
                if(location.href.includes('corporates')){
                    location.href='./login.html';
                }else{
                    location.href='./corporates/login.html';
                }
            }else if(donneesLocal.body.user.code.includes('PASSAG')){
                localStorage.removeItem('SESSION_TRANSPORT');
                if(location.href.includes('corporates/')){
                    location.href='./login3.html';
                }else{
                    location.href='./corporates/login3.html';
                }
            }else{
                localStorage.removeItem('SESSION_TRANSPORT');
                if(location.href.includes('corporates/')){
                    location.href='./login2.html';
                }else{
                    location.href='./corporates/login2.html';
                } 
            }
        }
    }

    if(document.getElementById('deconnexion')){
        const donneesLocal=JSON.parse(localStorage.SESSION_TRANSPORT);
        $('#deconnexion').click(event=>{
            event.preventDefault();
            if(confirm('Vous êtes sur le point de fermer votre session')){
                if(donneesLocal.body.user.code.includes('ADMI')){
                    localStorage.removeItem('SESSION_TRANSPORT');
                    if(location.href.includes('corporates')){
                        location.href='./login.html';
                    }else{
                        location.href='./corporates/login.html';
                    }
                }else if(donneesLocal.body.user.code.includes('PASSAG')){
                    localStorage.removeItem('SESSION_TRANSPORT');
                    if(location.href.includes('corporates/')){
                        location.href='./login3.html';
                    }else{
                        location.href='./corporates/login3.html';
                    }
                }else{
                    localStorage.removeItem('SESSION_TRANSPORT');
                    if(location.href.includes('corporates/')){
                        location.href='./login2.html';
                    }else{
                        location.href='./corporates/login2.html';
                    } 
                }
            }
        })
    }
})