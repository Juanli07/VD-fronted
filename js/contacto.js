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

function contacto() {
    axios.post(`${path}/insertcont`,{        
        email: $('#emailm').val(),
        nombre: $('#firstNamem').val() + ' ' + $('#lastNamem').val(),
        direccion: $('#direm').val(),
        cel: $('#celm').val()
    }).then((data) => {
        toastr.success('Contacto añadido');
    }).catch(error => {
        console.log(error)
        toastr.error('Error de contacto');
    })    
}

$(document).ready(() => {
    checkAccess()
    setName()
})