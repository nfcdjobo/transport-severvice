window.addEventListener(`DOMContentLoaded`, (e)=>{
    
    const dashboard=document.querySelectorAll('.dashboard');
    if(localStorage.SESSION_TRANSPORT){
        const userCode=JSON.parse(localStorage.SESSION_TRANSPORT).body.user.code;
        if(location.href.includes('index.html') || location.href.split('/')[location.href.split('/').length-1]==''){
            
            if(userCode.includes('ADMIN') || userCode.includes('PASSA')){
               
                dashboard.forEach(item=>{
                    item.textContent='Dashboard';
                    item.href='corporates/dashboard.html';
                })
            }else{
                dashboard.forEach(item=>{
                    item.textContent='Accueil';
                    item.href='../index.html';
                })
            }
        }else{
            if(userCode.includes('ADMIN') || userCode.includes('PASSA')){
                dashboard.forEach(item=>{
                    item.textContent='Accueil';
                    item.href='../index.html';
                })
            }else{
                dashboard.forEach(item=>{
                    item.textContent='Accueil';
                    item.href='../index.html';
                })
            }
        }
    }
})
