let carreras;
let idpart;
let costof;
let convf;
function inscripcion() {
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    axios.post(`${path}/participante`, {
        email: $('#email').val(),
        nombre: $('#firstName').val()+' '+$('#lastName').val(),
        cel: $('#cel').val(),
        fecha_nacimiento: $('#borndate').val(),
        genero: $('input:radio[name="group"]:checked').val(),
        club: $('#club').val(),
        ref_ce: $('#ce').val()
    }, config).then(res => {
        $('#id_usuario').val(res.data.participante.id)
        // console.log(idpart)
    }).catch(err => {
        console.log(err)
    })
    $('#spin').attr('hidden', false);
    setTimeout( ()=>{
        axios.post(`${path}/insertins`, {
            id_convocatoria: $('#conv').val(),
            id_usuario: $('#id_usuario').val(),
            modalidad: $('#categoria').val(),
            numero_participante: $('#numpart').val()
        }).then(res => {
            setTimeout( () => {
                location.href = "../inscripciones.html"
            },8000)
            toastr.success('Inscripción realizada');
        }).catch(err => {
            toastr.error('¡Vaya!, algo ha sucedido.');
        })
        $('#spin').atrr('hidden', false);
    }, 8000)
    console.log($('#id_usuario').val())    
  
}
function showMsg(msg) {
    $('#msg').attr('hidden', false);
    setTimeout(() => {
        $('#msg').html(msg)
        $('#msg').attr('hidden', true);
    }, 2000);
}
function setCarreras(){
    axios.get(`${path}/convocatorias`).then( res => {
        let options = '<option value="-1">Seleccione una carrera</option>'        
        res.data.data.forEach( item => options+=`<option data-cost="${item.precio}" value="${item.id}">${item.titulo}</option>`)
        $('#conv').html(options)     
        carreras = res.data.data;        
    })    
}
function setCategorias(){
    let modalidades;   
    carreras.forEach( item => {
        if(item.id == $('#conv').val()){
            modalidades = item.ref_modalidad
            $('#costoin').html('Costo: $'+item.precio+'.00')      
            costof = item.precio;
        }
    })
    modalidades = modalidades.split(',')
    let options = '<option value="-1">Seleccione una categoria</option>'
    modalidades.forEach( item => options+= `<option value="${item}">${item}</option>`)
    $('#categoria').html(options)
}   
function setData(){
    if(localStorage.getItem('isAdmin') == 1){
        let name = localStorage.getItem('user').split(" ")
        $('#email').val(localStorage.getItem('email'))
        if(name.length == 4){
            $('#firstName').val(name[0]+' '+name[1])
            $('#lastName').val(name[2]+' '+name[3])
        }else if(name.length == 3){
            $('#firstName').val(name[0])
            $('#lastName').val(name[1]+' '+name[2])
        }else if(name.length == 2){
            $('#firstName').val(name[0]);
            $('#laststName').val(name[1]);
        }
        $('#cel').val(localStorage.getItem('cel'))
    }
}
function setCe(){
    axios.post(`${path}/insertcont`, {
        nombre: $('#firstNamem').val() + ' '+ $('#lastNamem').val(),
        email: $('#emailm').val(),
        cel: $('#celm').val()
    }).then( res => {
        $('#ce').val(res.data.cont.id)
        $('.lead').html(res.data.cont.nombre)
    }).catch( err => {
        $('.lead').html('No se pudo agregar el contacto; intente de nuevo.')
    })
}

function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

//Función de ayuda: reúne los datos a exportar en un solo objeto
function obtenerDatos() { 
    var combo = document.getElementById('conv');
    var selected = combo.options[combo.selectedIndex].text;
    return {
        nombre: document.getElementById('firstName').value,
        apellido: document.getElementById('lastName').value,
        convocatoria: selected,
        modalidad:document.getElementById('categoria').value,
        numero: document.getElementById('numpart').value,
        costo: costof,
        fecha: (new Date()).toLocaleDateString()
    };
};

//Función de ayuda: "escapa" las entidades XML necesarias
//para los valores (y atributos) del archivo XML
function escaparXML(cadena) {
    if (typeof cadena !== 'string') {
        return '';
    };
    cadena = cadena.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;');
    return cadena;
};

var num = Math.floor(Math.random() * 90000) + 10000;

//Genera un objeto Blob con los datos en un archivo TXT
function generarTexto(datos) {    
    var texto = [];
texto.push('                Vive Deporte Mx \n');
texto.push('        Pago de inscripcion a carrera/evento\n');    
    texto.push('    Folio: ');
    texto.push('    #'+ num);
    texto.push('\n');
    texto.push('    Referencia: 6936 3209 9051 2016');    
    texto.push('\n');
    texto.push('Datos generales: \n');    
    texto.push('    Nombre: ');
    texto.push('    '+datos.nombre + ' ' + datos.apellido);      
    texto.push('\n');
    texto.push('    Carrera: ');
    texto.push('    '+datos.convocatoria);
    texto.push('\n');
    texto.push('    Modalidad: ');
    texto.push('    '+datos.modalidad);
    texto.push('\n');
    texto.push('    Numero elegido: ');
    texto.push('    '+datos.numero);
    texto.push('\n');
    texto.push('    Costo del evento: ');
    texto.push('    '+datos.costo);
    texto.push('\n');
    texto.push('    Fecha de expedición: ');
    texto.push('    '+datos.fecha);
    texto.push('\n');
    
    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    return new Blob(texto, {
        type: 'text/plain'
    });
};

document.getElementById('boton-txt').addEventListener('click', function () {
    var datos = obtenerDatos();
    descargarArchivo(generarTexto(datos), 'Factura_inscripción.txt');
}, false);


$(document).ready( () => {
    checkAccess()
    setName()
    setCarreras()
    setData()
    setnavbar()
})