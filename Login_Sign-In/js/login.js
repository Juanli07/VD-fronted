function login(){
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    axios.post('http://localhost:3000/vd/login', {email: $('#email').val(), contrasena: $('#password').val()}, config).then( res => {
        console.log(res.data.token)
    }).catch( err => {
        console.log(err)
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