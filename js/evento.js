let b64;
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
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    console.log(b64)
    axios.post(`${path}/insertconv`,{        
        id_empresa: $('#emp').val(),
        titulo: $('#evento').val(),
        banner: b64,
        costo: $('#costoeven').val(),
        fecha: $('#borndate').val(),
        ref_modalidad: datostxt.toString(),
        precio: $('#preciopar').val(),
        num_participantes: $('#numpar').val()
    }, config).then((data) => {
        toastr.success('Evento creado satisfactoriamente');
    }).catch(error => {
        console.log(error)
        toastr.error('Error al crear evento');
    })
    }
$(document).ready(function () {
    checkAccess()
    setName()
    setnavbar()
});
$('#imgInp').change( (e) => {
    returnB64()
})

async function returnB64(){
    const file = document.querySelector('#imgInp').files[0];
    b64 = await toBase64(file);
}
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});