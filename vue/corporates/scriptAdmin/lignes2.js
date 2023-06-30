window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi="https://transport-severvice.onrender.com/api/";
    const breadcumbArea=document.querySelector('.breadcumb-area');
    console.log(breadcumbArea)
    breadcumbArea.style.backgroundImage="url('./image/ligne.jpg')";

    fetch(urlApi+'getAllLigne')
    .then(res=>res.json())
    .then(succes=>{
        const data=succes.data
        let imgPath='./../../logics/';
        const ligneFetch=document.getElementById('ligne-fetch');
        data.forEach(ligne => {
            ligneFetch.innerHTML+=`<!-- edupit_image_box_01-->
			<div class="col-lg-4 col-md-6 col-sm-12">
				<div class="service-item all_color_service text-center ">
					<div class="service_top_image">
						<img src="${imgPath+ligne.photo}" alt="" style="height:150px; width: 100%;">
					</div>
					<div class="text_box all_icon_color">
						<h3><a href="reservate.html#${ligne._id}">${ligne.villeA}<=>${ligne.villeB}</a></h3>
						<strong>${ligne.distance} Km</strong>	
                        <h5>${ligne.montant} FCFA</h5>
						<div class="service-btn service_btn2">
							<a href="reservate.html#${ligne._id}">Faites une réservation<span class="ti-arrow-right"></span></a>
						</div>
					</div>							
				</div>
			</div>`
        });
    })
    .catch(error=>{
        console.log(error)
    })
})