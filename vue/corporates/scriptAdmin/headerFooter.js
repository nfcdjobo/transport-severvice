window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    function headerFooter(url){
        try {
            
            fetch(url)
            .then(res=>res.json())
            .then(succes=>{
                const data=succes.data
                const localisation=document.getElementById('localisation');
                const phoneAdress=document.getElementById('phoneAdress');
                const emailAdress=document.getElementById('emailAdress');
                const UrgencePhone=document.getElementById('UrgencePhone');
                const copyright=document.getElementById('copyright');
                const phtoUser=document.getElementById('phto-user');
                const adminName=document.querySelector('.admin-name');

                if(data.length>0){
                    const compagie=data[0];
                    if(localisation){
                        localisation.textContent="Abidjan (Côte d'Ivoire)";
                        phoneAdress.textContent='(+225) '+compagie.telephone;
                        emailAdress.textContent=compagie.email;
                        UrgencePhone.textContent='(+225) '+compagie.telephone;
                    }
                   
                    copyright.innerHTML=compagie.copyright;
                    
                    let imgPath= location.href.includes('views/index.html')? '../logics/':'./../../logics/';
                     document.getElementById('favicon').href=imgPath+compagie.photo
                    document.querySelectorAll('img[logo=my-logo]').forEach(item=>item.src=imgPath+compagie.photo);
                    phtoUser.src=imgPath+JSON.parse(localStorage.SESSION_TRANSPORT).body.user.photo;
                    adminName.textContent=JSON.parse(localStorage.SESSION_TRANSPORT).body.user.nomPrenom.split(' ').slice(0, 2);
                }
                
                
                console.log('succes',succes);
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