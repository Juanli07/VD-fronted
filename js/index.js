const path = "https://vd-0.herokuapp.com/vd"
function logout(){
    localStorage.clear();
    location.href ='../login.html'
}
function setName(){
    $('.name').html(localStorage.getItem('user'))
}

function checkAccess(){
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    axios.get(`${path}/auth`, config).then( data => {
    }).catch(err => {
        console.log(err)
        localStorage.clear();
        location.href="../login.html"
    })
}
$(document).ready( () => {
    if(localStorage.getItem('token')){
        $('#top').html('Servicios')
    }else{
        $('#top').html('Ingresar')
    }
})