window.addEventListener(`DOMContentLoaded`, (e)=>{
    const deconnexionConnexion=document.getElementById('deconnexionConnexion');
    const deconnexionConnexionRef=document.querySelectorAll("li[ref='deconnexionConnexion']");
    // const loginLi=document.getElementById('loginLi');
    deconnexionConnexion.addEventListener('click', action);

    function action(event){
        event.preventDefault()
        if(localStorage.SESSION_TRANSPORT){
            const local=JSON.parse(localStorage.SESSION_TRANSPORT).body.user.code;
            if(confirm('Êtes-vous sûre de vouloir fermer votre session ?')){
                 localStorage.removeItem('SESSION_TRANSPORT');
                if(location.href.includes('index.html')){
                    if(local.includes('ADMIN')){
                        location.href='corporates/login.html';
                    }else if(local.includes('PASSA')){
                        location.href='corporates/login2.html';
                    }else{
                        location.href='corporates/login3.html';
                    }
                }else{
                    if(local.includes('ADMIN')){
                        location.href='login.html';
                    }else if(local.includes('PASSA')){
                        location.href='login2.html';
                    }else{
                        location.href='login3.html';
                    }
                }
            }
        }
    }


    if(!localStorage.SESSION_TRANSPORT){
        if(location.href.includes('index.html')){
            deconnexionConnexionRef.forEach(item=>item.innerHTML=`<a href="#">Se connecter</a>
            <ul class="sub-menu">
                <li><a href="corporates/login.html">Administrateur</a></li>
                <li><a href="corporates/login2.html">Conducteur</a></li>
                <li><a href="corporates/login3.html">Client</a></li>
            </ul>`);
        }else{
            deconnexionConnexionRef.forEach(item=>item.innerHTML=`<a href="#">Se connecter</a>
            <ul class="sub-menu">
                <li><a href="login.html">Administrateur</a></li>
                <li><a href="login2.html">Conducteur</a></li>
                <li><a href="login3.html">Client</a></li>
            </ul>`);
        }

    }else{
        deconnexionConnexion.id='deconnexionConnexion';
        deconnexionConnexion.innerHTML=` Déconnexion`;
        deconnexionConnexion.addEventListener('click', action);
    }
        
})