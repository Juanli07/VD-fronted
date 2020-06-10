let idt;
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
$(document).ready( function(){
    checkAccess()
    setName()
    setnavbar()
})

$('#event').change( () => {
    if($('#event').val() > 0){
        $('#download').attr('disabled', false)
    }else{
        $('#download').attr('disabled', true)
    }
})

function setreporte(){
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    let row = ""
    axios.post(`${path}/report`, {id_convocatoria: $('#conv').val()}, config).then( res => {
        let ins = res.data.inscripcion
        let participante = res.data.part
        for(let i = 0; i < participante.length; i++){
            kitState = ins[i].kitState.split('|')
            row += `<tr><td>${participante[i].nombre}</td><td>${ins[i].modalidad}</td><td>${kitState[0] != 0 ? 'Playera': ''} ${kitState[1] != 0 ? 'Mochila': ''} ${kitState[2] != 0 ? 'Numero': ''}</td><td><a type="button" data-toggle="modal" onclick="setmodal(${ins[i].id}, '${ins[i].kitState}')" data-target="#basicExampleModal"><i class="fas fa-chevron-circle-up"></i></a></td></tr>`
        }
        $('.bd').html(row);

    }).catch( err => console.log(err))
}

function dwlreporte(){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById('articles');
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = `${$('#conv')}.xls`;
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }

}

function setmodal(id, kitState){
    idt = id
    let kits = kitState.split('|')
    let row = `<input value="1" id="cbx1" type="checkbox" ${kits[0] != 0 ? 'checked disabled': ''} > Playera <input value="1" id="cbx2" type="checkbox" ${kits[1] != 0 ? 'checked disabled': ''} > Mochila <input value="1" id="cbx3" type="checkbox" ${kits[2] != 0 ? 'checked disabled': ''} > Numero`
    $('.modal-body').html(row)
}
function changeStatus(){
    kitState = ''
    for(let i = 1; i < 4; i++){
        if($(`#cbx${i}`).is(':checked')){
            kitState += '1|'
        }else{
            kitState += '0|'
        }
    }
    axios.post(`${path}/kit`, {id: idt, kitState}).then( data => {
        toastr.success('Actualizado correctamente');
        genrep()
    }).catch(err => {
        toastr.error('¡Vaya!, algo ha sucedido.');
    })
}
function setDoc(){
    setTimeout( () => {
        alert('Archivo subido con éxito'); 
        $('#customFileLang').attr('disabled', true)
    }, 3000);
}
function setCorte(){
    $('#corte').html('');
    let total = 500;
    toastr.success('El corte de caja ha sido realizado');
    $('.modal-title').html('');
    $('.modal-body').html(`<h1>Corte de caja</h1><br><h3>${setDate(new Date())}</h3><br><p> Total del dia: $ ${total}.00`)
    $('#br').attr('onclick', false);
}

function setDate(date){
    var fecha = new Date(date);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return fecha.toLocaleDateString("es-ES", options)
 }

$('#customFileLang').change( ( ) => {
    $('#sends').attr('disabled', false);
})