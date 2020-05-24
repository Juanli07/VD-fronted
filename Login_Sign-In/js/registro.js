function registro(){
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    axios.post(`${path}/user`, {
        email: $('#emailsi').val(), nombre: $('#firstName' + ' ' + '#lastName').val(), 
        contrasena: $('#pass').val(), cel: $('0').val(), isAdmin: $(' ').val(), salario: $(0).val(), ref_ce: $('0').val()}, config).then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.user)
        location.href = "../Servicios/servicios.html"
                    
            
        console.log(res.data)
    }).catch(err => {
        console.log(err['message'])
        showMsg(err)
    })
}
function showMsg(msg) {
    $('#msg').attr('hidden', false);
    setTimeout(() => {
        $('#msg').html(msg)
        $('#msg').attr('hidden', true);
    }, 2000);
}

$(document).ready(() => {
    if (localStorage.getItem('token')) {
        location.href = "#"
    }
})