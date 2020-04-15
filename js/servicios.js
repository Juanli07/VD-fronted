
function mostrarForm(evt, estado) {
    var i, tabcontent, servicio;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    servicio = document.getElementsByClassName("servicio");
    for (i = 0; i < servicio.length; i++) {
        servicio[i].className = servicio[i].className.replace(" active", "");
    }
    document.getElementById(estado).style.display = "block";
    evt.currentTarget.className += " active";
}



   