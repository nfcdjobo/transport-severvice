window.addEventListener(`DOMContentLoaded`, (e)=>{
    if(!localStorage.SESSION_TRANSPORT){
        document.querySelectorAll('li[ref=profile-li]').forEach(item=>item.remove());
    }
})