$(document).ready( () => {
    checkAccess()
    setName()
    $('#users').DataTable();
    $('.dataTables_length').addClass('bs-select');
})