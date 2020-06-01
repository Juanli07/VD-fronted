$(document).ready( function(){
    checkAccess()
    setName()
    $('#tablexd').DataTable();
    $('.dataTable_length').addClass('bs-select')
})

$('#event').change( () => {
    if($('#event').val() > 0){
        $('#download').attr('disabled', false)
    }else{
        $('#download').attr('disabled', true)
    }
})