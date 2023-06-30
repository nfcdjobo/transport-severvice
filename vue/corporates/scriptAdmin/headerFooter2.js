window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    function headerFooter(url){
        try {
            fetch(url)
            .then(res=>res.json())
            .then(succes=>{
                const data=succes.data;
                const myLogo=document.querySelectorAll('img[logo=my-logo]');
                const phtoUser=document.getElementById('phto-user');
                const copyright=document.getElementById('copyright');
                const adminName=document.getElementById('admin-name')
                if(data.length>0){
                    const compagie=data[0];
                    copyright.innerHTML=compagie.copyright;
                    let imgPath= './../../logics/';
                    myLogo.forEach(item=>item.src=imgPath+compagie.photo);
                    phtoUser.src=imgPath+JSON.parse(localStorage.SESSION_TRANSPORT).body.user.photo;
                    adminName.textContent=JSON.parse(localStorage.SESSION_TRANSPORT).body.user.nomPrenom.split(' ').slice(0, 2)[0]+" "+ JSON.parse(localStorage.SESSION_TRANSPORT).body.user.nomPrenom.split(' ').slice(0, 2)[1];
                }
            })
            .catch(fail=>{
                console.log('fail', fail)
            })
        } catch (error) {
            console.log('error', error)
        }
    }
    headerFooter(urlApi+'getAllCompagny')
})