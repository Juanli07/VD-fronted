const path = "http://localhost:3000/vd"
function logout(){
    localStorage.clear();
    location.href='/index.html'
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
        location.href="../Login_Sign-In/login.html"
    })
}