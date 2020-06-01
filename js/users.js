$(document).ready( () => {
    checkAccess()
    setName()
    $('#users').DataTable();
    $('.dataTables_length').addClass('bs-select');
    setUsers()
})

function setUsers(){
    let rows = ''
    let rowsd = ''
    axios.get(`${path}/`).then( users => {
        users.data.user.forEach(item => {
            if(item.active){
                rows += `<tr><th>${item.nombre}</th><th>${item.isAdmin ? 'Administrador': 'Usuario'}</th><th><a onclick="update(${item.id}, ${item.isAdmin})"><i class="fas fa-user-edit fa-lg"></i></a><a onclick="del(${item.id})" style="color: red"><i class="fas fa-user-times fa-lg"></i></a></i></th></tr>`
            }else{
                rows += `<tr><th>${item.nombre}</th><th>Inactivo</th><th><a onclick="rec(${item.id})" style="color: orange"><i class="fas fa-arrow-circle-up fa-lg"></i></a></i></th></tr>`
            }
        });
        $('tbody').html(rows)
    }).catch( err => {
        console.log(err)
    })
}

function update(id, isAdmin){
    axios.put(`${path}/isAdmin`, {id, isAdmin}).then( data => {
        toastr.success('Permisos actualizados correctamente');
        setUsers()
    }).catch( err => {
        toastr.error('¡Vaya!, algo ha sucedido.');
    } )
}
function del(id){
    axios.put(`${path}/changestate`, {id, active: false}).then( data => {
        toastr.success('Se realizo correctamente');
        setUsers()
    }).catch( err => {
        toastr.error('¡Vaya!, algo ha sucedido.');
    } )
}
function rec(id){
    axios.put(`${path}/changestate`, {id, active: true}).then( data => {
        toastr.success('Se realizo correctamente');
        setUsers()
    }).catch( err => {
        toastr.error('¡Vaya!, algo ha sucedido.');
    } )
}