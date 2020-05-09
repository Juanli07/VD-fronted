function login(){
    if($('#email').val() != 'admin@' && $('#password').val() != "password"){
        $('#msg').attr('hidden', false);
        setTimeout( () => {
            $('#msg').attr('hidden', true);
        },2000);
    }
}