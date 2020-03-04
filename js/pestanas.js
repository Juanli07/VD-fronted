
function abrirPestana(evt, estado) {
  var i, tabcontent, pestanas;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  pestanas = document.getElementsByClassName("pestanas");
  for (i = 0; i < pestanas.length; i++) {
    pestanas[i].className = pestanas[i].className.replace(" active", "");
  }
  document.getElementById(estado).style.display = "block";
    evt.currentTarget.className += " active";    
}
