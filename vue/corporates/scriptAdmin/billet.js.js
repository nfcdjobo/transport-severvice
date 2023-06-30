window.addEventListener(`DOMContentLoaded`, (e)=>{
    const imgPath='../../logics/';
    const urlApi="https://transport-severvice.onrender.com/api/";
    let tot_do_list_tikect=document.getElementById('tot-do-list-tikect');
    let printed="";
        fetch(`${urlApi}getAllReservation`)
        .then(res=>res.json())
        .then(succes=>{
            
            const reservate=succes.reservation;
            reservate.forEach(reservation => {
                fetch(`${urlApi}getByIdPassager/${reservation.passage_id[0]}`,{
                    method:'GET',
                    headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
                })
                .then(pas=>pas.json())
                .then(pass=>{
                    const passager=pass.data;
                    fetch(`${urlApi}getByIdLigne/${reservation.ligne_id[0]}`, {
                        method:'GET',
                        headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
                    })
                    .then(ln=>ln.json())
                    .then(lig=>{
                        const ligne=lig.data;
                        tot_do_list_tikect.innerHTML+=`
                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" ref="printed">
                            <div class="card courses-inner res-mg-b-30">
                                <p><span><i class="fa fa-clock"></i></span> <b>N°</b> <i id="number-${reservation.code}"> ${reservation._id.toUpperCase()}</i> </p>
                                <div class="courses-title">
                                    <a href="#"><img src="${passager.photo?imgPath+passager.photo:''}" alt="" id="photo-conserne-${reservation.code}" style="width:100%; max-height:7rem"></a>
                                    <h4 id="conserne-${reservation.code}"> ${passager.nomPrenom}</h4>
                                </div>
                                <div class="courses-alaltic">
                                    <p><span><i class="fa fa-clock"></i></span> <b>Prix unitaire:</b> <i id="montant-ligne-${reservation.code}"> ${ligne.montant} FCFA</i> </p>
                                    <span class="cr-ic-r"><span class="course-icon"><i class="fa fa-clock"></i><span id="n-reservation-${reservation.code}"> ${reservation.nombre_place} Place(s)</span>
                                    <span class="cr-ic-r"><span class="course-icon"></i></span> || </span>
                                    <span class="cr-ic-r"><span class="course-icon"><i class=""></i><span id="montant-${reservation.code}"> ${reservation.sommetTotale} FCFA</span>
                                    <i hidden id="emailPassager">${passager.email}</i>
                                    <i hidden id="telephonePassager">${passager.telephone}</i>
                                </div>
                                <div class="course-des">
                                    <p><span><i class="fa fa-clock"></i></span> <b>Ligne:</b> <i id="ligne-${reservation.code}"> ${ligne.villeA}<=>${ligne.villeB}</i> </p>
                                    <p><span><i class="fa fa-clock"></i></span> <b>Payé le </b> <i id="date-r-${reservation.code}"> ${new Date(reservation.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</i></p>
                                    <p><span><i class="fa fa-clock"></i></span> <b>Départ le </b> <i id="date-${reservation.code}"> ${new Date(reservation.date).toLocaleString('fr-FR', { timeZone: 'UTC' })}</i></p>
                                    <p><span><i class="fa fa-clock"></i></span> <b>Véhicule cimatisé</b> <i id="climatisation-${reservation.code}"> ${reservation.climatisation?'Oui':'Non'}</i></p>
                                </div>
                                <div class="product-buttons">
                                    <button type="button" id="-${reservation.code}" ref="pdf-print" onCkick="generatePDF()" class="button-default cart-btn">Imprimer</button>
                                </div>
                            </div>
                        </div>`;
                        printed=document.querySelectorAll('button[ref=pdf-print]');
                        printed.forEach(element=>element.addEventListener('click', generatePDF))
                    })
                    .catch(error=>{
                        console.log('error', error)
                        return error;
                        
                    })
                })
            });

            function generatePDF(event){
                const id=event.target.id;
                fetch(`${urlApi}getAllCompagny`)
                .then(res=>res.json())
                .then(succes=>{
                    const compagny=succes.data[0]
                    const numero=document.getElementById('number'+id).textContent;
                    const photo=document.getElementById('photo-conserne'+id).src;
                    const clientName=document.getElementById('conserne'+id).textContent;
                    const montantLigne=document.getElementById('montant-ligne'+id).textContent;

                    const nReservation=document.getElementById('n-reservation'+id).textContent;
                    const montant=document.getElementById('montant'+id).textContent;
                    const ligne=document.getElementById('ligne'+id).textContent;
                    const dateR=document.getElementById('date-r'+id).textContent;
                    const date=document.getElementById('date'+id).textContent;
                    const climatisation=document.getElementById('climatisation'+id).textContent;
                    const telephonePassager=document.getElementById('telephonePassager').textContent;
                    const emailPassager=document.getElementById('emailPassager').textContent;
                   
                    let props = {
                        outputType: jsPDFInvoiceTemplate.OutputType.Save,
                        returnJsPDFDocObject: true,
                        fileName: "Invoice 2021",
                        orientationLandscape: true,
                        compress: true,
                        logo: {
                            src: "https://nfcdjobo.github.io/parejo-transport/logo/org.png",
                            // src: `${imgPath+compagny.photo}`,
                            type: 'JPG', //optional, when src= data:uri (nodejs case)
                            width: 50, //aspect ratio = width/height
                            height: 20,
                            margin: {
                                top: 0, //negative or positive num, from the current position
                                left: 0 //negative or positive num, from the current position
                            }
                        },
                        stamp: {
                            inAllPages: true, //by default = false, just in the last page
                            src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
                            type: 'JPG', //optional, when src= data:uri (nodejs case)
                            width: 20, //aspect ratio = width/height
                            height: 20,
                            margin: {
                                top: 0, //negative or positive num, from the current position
                                left: 0 //negative or positive num, from the current position
                            }
                        },
                        business: {
                            name: compagny.raisonSociale,
                            address: "Abidjan (Côte d'Ivoire)",
                            phone: '(+225) '+compagny.telephone,
                            email: compagny.email,
                            email_1: "nfcdjobo@gmail.com",
                            website: "www.example.al",
                        },
                        contact: {
                            label: "Facture émise pour:",
                            name: clientName,
                            address: 'Abidjan',
                            phone: telephonePassager,
                            email: emailPassager
                        },
                        invoice: {
                            label: `N° `,
                            num: numero,
                            invDate: `Payé le: ${dateR}`,
                            invGenDate: `Départ: ${date}`,
                            headerBorder: false,
                            tableBodyBorder: false,
                            header: [
                            {
                                title: "N°", 
                                // style: { 
                                // width: 10 
                                // } 
                            }, 
                            { 
                                title: "Ligne",
                                // style: {
                                // width: 60
                                // } 
                            }, 
                            { 
                                title: "Nom et Prénom(s)",
                                // style: {
                                // width: 60
                                // } 
                            }, 
                            { 
                                title: "Climatisation"
                            }, 
                            { title: "Prix/Place"},
                            { title: "Place"},
                            // { title: "Unité"},
                            { title: "Total" }
                        ],
                            table: Array.from(Array(1), (item, index)=>([
                                numero,
                                ligne,
                                clientName,
                                climatisation,
                                montantLigne,
                                nReservation,
                                montant
                            ])),
                            additionalRows: [{
                                col1: 'Total:',
                                col2: '145,250.50',
                                col3: 'ALL',
                                style: {
                                    fontSize: 14 //optional, default 12
                                }
                            },
                            {
                                col1: 'VAT:',
                                col2: '20',
                                col3: '%',
                                style: {
                                    fontSize: 10 //optional, default 12
                                }
                            },
                            {
                                col1: 'SubTotal:',
                                col2: '116,199.90',
                                col3: 'ALL',
                                style: {
                                    fontSize: 10 //optional, default 12
                                }
                            }],
                            invDescLabel: "Pour plus de sécurité",
                            invDesc: "Nous vous prions de conserver votre billet jusqu'à la destination.",
                        },
                        footer: {
                            text: compagny.slogan,
                        },
                        pageEnable: true,
                        pageLabel: "",
                        // pageLabel: "Page ",
                    };
                     var pdfObject = jsPDFInvoiceTemplate.default(props);
                     console.log('objet creer', pdfObject)
                })
                .catch(ror=>{
                    console.log(ror)
                })
            }
        })
})

