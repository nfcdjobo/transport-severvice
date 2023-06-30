window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    let smallSlider=document.getElementById('smallSlider');
    const imgPath='../logics/';
    $.ajax({
        type:`GET`,
        url:`${urlApi}getLigne`
    })
    .done(response=>{
        let ligne=response.data;
        console.log(ligne)
        smallSlider.textContent='';
        console.log('ligne.slice(0,4)',ligne.slice(0,4))
        ligne.slice(0,4).forEach(element => {
            smallSlider.innerHTML+=`
            <!-- edupit_image_box_01-->
			<div class="col-lg-3">
                <div class="card">
                <a href="corporates/lignes2.html" title='Vous les autres lignes ?'><img src="${imgPath+element.photo}" class="card-img-top" alt="..." style="width:100%; height:200px"></a>
                <div class="card-body">
                    <strong class="card-title"><a href="corporates/reservate.html#${element._id}" title='Soumettre une réservation ?'>${element.villeA}<=>${element.villeB}</a></strong>
                    <h2 style="color:orange;"> ${element.distance} Km </h2>
                    <p class="card-text"></p>
                </div>
                </div>
            </div>`
        });
        
    })
    .fail(error=>{
        console.log(error)
    })
})
