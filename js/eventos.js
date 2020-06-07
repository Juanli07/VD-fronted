let empresas
$(document).ready( () => {
    if(localStorage.getItem('token')){
        $('#top').html('Servicios')
    }else{
        $('#top').html('Ingresar')
    }
    setEvents()
})

function setEvents(){
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    axios.get(`${path}/findAll/empresa`).then( res => {
        empresas = res.data
    })
    axios.get(`${path}/convocatorias`).then( data => {
        let card = ''
        console.log(data.data.data);
        data.data.data.forEach( (item, index) => {
            card += `<div class="col-12 col-md-6 col-xl-4 mb-4"> <div class="card hoverable mb-4"> <div class="card-body d-flex flex-row"> <div> <h4 class="card-title font-weight-bold mb-2">${item.titulo}</h4> <p class="card-text"><i class="far fa-clock pr-2"></i>${setDate(item.fecha)}</p></div></div><div class="view overlay"> <img class="card-img-top rounded-0" src="${item.banner}" alt="Card image cap"> <a href="#!"> <div class="mask rgba-white-slight"></div></a> </div><div class="card-body"> <div class="collapse-content"> <p class="card-text collapse" id="collapseContent${index}">No se incluyó descripción.</p><p class="card-text collapse" id="collapseContent${index}">Contacto: 999115643826</p><p class="card-text collapse" id="collapseContent${index}">Categorias: ${item.ref_modalidad}</p><p class="card-text collapse" id="collapseContent${index}">Patrocinador: ${returEmpresas(item.id)} </p><p class="card-text collapse " id="collapseContent${index}${index}"> <a href="./inscripciones.html"> Inscribirse</a> </p><button type="button" class="btn btn-sm btn-danger rendondo float-right p-1 my-1 mr-0 mml-1 collapsed" data-toggle="collapse" href="#collapseContent${index}" aria-expanded="false" aria-controls="collapseContent${index}">Leer más</button> </div></div></div></div>`
        })
        $('.row').append(card);
    }).catch( err => console.log(err))
}
 function setDate(date){
    var fecha = new Date(date);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return fecha.toLocaleDateString("es-ES", options)
 }

 function returEmpresas(id){
     let nombre;
    empresas.forEach( item => {
        if(item.id == id){
            nombre = item.nombre;
        }
    })
    return nombre
 }
