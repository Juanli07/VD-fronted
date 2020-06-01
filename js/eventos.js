$(document).ready( () => {
    if(localStorage.getItem('token')){
        $('#top').html('Servicios')
    }else{
        $('#top').html('Ingresar')
    }
})