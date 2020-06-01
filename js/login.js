function login(){
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    axios.post(`${path}/login`, {email: $('#email').val(), contrasena: $('#password').val()}, config).then( res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.user.nombre)
        localStorage.setItem('email', res.data.user.email)
        localStorage.setItem('cel', res.data.user.cel)
        localStorage.setItem('isAdmin', res.data.user.isAdmin)
        location.href="../servicios.html"
    }).catch( err => {
        console.log(err['message'])
        showMsg(err)
    })
}
function showMsg(msg){
    $('#msg').attr('hidden', false);
        setTimeout( () => {
            $('#msg').html(msg)
            $('#msg').attr('hidden', true);
    },2000);
}

$(document).ready( () => {
    if(localStorage.getItem('token')){
        location.href ="../servicios.html"
    }
})