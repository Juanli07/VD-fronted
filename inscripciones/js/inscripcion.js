let carreras;
let idpart;

function inscripcion() {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    axios.post(`${path}/participante`, {
        email: $('#email').val(),
        nombre: $('#firstName').val()+' '+$('#lastName').val(),
        cel: $('#cel').val(),
        fecha_nacimiento: $('#borndate').val(),
        genero: $('input:radio[name="group"]:checked').val(),
        club: $('#club').val(),
        ref_ce: $('#ce').val()
    }, config).then(res => {
        idpart = res.data.participante.id
        console.log(idpart)
    }).catch(err => {
        console.log(err)
    })
    axios.post(`${path}/insertins`, {
        id_convocatoria: $('#conv').val(),
        id_usuario: idpart,
        modalidad: $('#categoria').val(),
        numero_participante: $('#numpart').val()
    }).then( res => {
        location.href = "../inscripciones/inscripciones.html"
    }).catch(err => {

    })
}
function showMsg(msg) {
    $('#msg').attr('hidden', false);
    setTimeout(() => {
        $('#msg').html(msg)
        $('#msg').attr('hidden', true);
    }, 2000);
}
function setCarreras(){
    axios.get(`${path}/convocatorias`).then( res => {
        let options = '<option value="-1">Seleccione una carrera</option>'
        res.data.data.forEach( item => options+=`<option value="${item.id}">${item.titulo}</option>`)
        $('#conv').html(options)
        carreras = res.data.data
    })
}
function setCategorias(){
    let modalidades;
    carreras.forEach( item => {
        if(item.id == $('#conv').val()){
            modalidades = item.ref_modalidad
        }
    })
    modalidades = modalidades.split(',')
    let options = '<option value="-1">Seleccione una categoria</option>'
    modalidades.forEach( item => options+= `<option value="${item}">${item}</option>`)
    $('#categoria').html(options)
}   
function setData(){
    let name = localStorage.getItem('user').split(" ")
    $('#email').val(localStorage.getItem('email'))
    if(name.length == 4){
        $('#firstName').val(name[0]+' '+name[1])
        $('#lastName').val(name[2]+' '+name[3])
    }else{
        $('#firstName').val(name[0])
        $('#lastName').val(name[1]+' '+name[2])
    }
    $('#cel').val(localStorage.getItem('cel'))
}
function setCe(){
    axios.post(`${path}/insertcont`, {
        nombre: $('#firstNamem').val() + ' '+ $('#lastNamem').val(),
        email: $('#emailm').val(),
        cel: $('#celm').val()
    }).then( res => {
        $('#ce').val(res.data.cont.id)
        $('.lead').html(res.data.cont.nombre)
    }).catch( err => {
        $('.lead').html('No se pudo agregar el contacto; intente de nuevo.')
    })
}
$(document).ready( () => {
    checkAccess()
    setName()
    setCarreras()
    setData()
})