$(document).on('click', '#del', function (event) {
    event.preventDefault();
    $(this).closest('tr').remove();
});

function add(){
    let row;
    let selectSize = '<div class="md-form"><input type="number" id="size" min="24" value="24" class="form-control"><label for="size">Talla</label></div>'
    let sleectAmount = '<div class="md-form"><input type="number" id="amount" min="1" value="1" class="form-control"><label for="amount">Cantidad</label></div>'
    let del = '<div class="md-form"><a href="" id="del"><i class="fas fa-minus-circle"></i></a></div>'
    row = `<tr><td><div class="md-form">Playera</div></td><td>${selectSize}</td><td>${sleectAmount}</td><td><div class="md-form">Carrera 2</div></td><td>${del}</td></tr>`
    $('.table tbody').append(row)
}