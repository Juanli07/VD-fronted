$(document).ready( () => {
    checkAccess()
    setName()
    $('#users').DataTable();
    $('.dataTables_length').addClass('bs-select');
    setUsers()
    setnavbar()
})

function setUsers(){
    let rows = ''
    let rowsd = ''
    let userType = ['Usuario', 'Punto de venta', 'Master cliente', 'Master organizador']
    axios.get(`${path}/`).then( users => {
        users.data.user.forEach(item => {
            if(item.active){
                rows += `<tr><th>${item.nombre}</th><th>${userType[item.isAdmin-1]}</th><th><a data-toggle="modal" data-target="#modal" onclick="$('#id').val(${item.id})"><i class="fas fa-user-edit fa-lg"></i></a><a onclick="del(${item.id})" style="color: red"><i class="fas fa-user-times fa-lg"></i></a></i></th></tr>`
            }else{
                rows += `<tr><th>${item.nombre}</th><th>Inactivo</th><th><a onclick="rec(${item.id})" style="color: orange"><i class="fas fa-arrow-circle-up fa-lg"></i></a></i></th></tr>`
            }
        });
        $('tbody').html(rows)
    }).catch( err => {
        console.log(err)
    })
}

function update(id){
    axios.put(`${path}/isAdmin`, {id: $('#id').val(), isAdmin: $('#lvl').val()}).then( data => {
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