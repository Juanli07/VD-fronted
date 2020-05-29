toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


function evento (){ 
    var   datostxt = new Array();
    var datosvalue = new Array();
    $('#multiselect option:selected').each(function () {
        datostxt.push($(this).text());
        datosvalue.push($(this).val());
    });             
     
    axios.post(`${path}/insertconv`,{        
        id_empresa: $('#emp').val(),
        titulo: $('#evento').val(),
        banner: $('#imgInp').val(),
        costo: $('#costoeven').val(),
        fecha: $('#borndate').val(),
        ref_modalidad: datostxt.toString() ,
        precio: $('#preciopar').val(),
        num_participantes: $('#numpar').val()
    }).then((data) => {
        toastr.success('Evento creado satisfactoriamente');
    }).catch(error => {
        console.log(error)
        toastr.error('Error al crear evento');
    })
    }


$(document).ready(() => {
    checkAccess()
    setName()
})