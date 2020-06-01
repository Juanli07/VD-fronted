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
function postEmp(){
    axios.post(`${path}/empresa`, {
        nombre: $('#nomemp').val(),
        tel: $('#diremp').val(),
        nombre_repe: $('#nomrep').val(),
        direccion: $('#diremp').val()
    }).then( (data) => {
        toastr.success('Empresa añadida');
    }).catch(error => {
        console.log(error)
        toastr.error('No se ha añadido la empresa');
    })
}

$(document).ready( () => {
    checkAccess()
    setName()
})