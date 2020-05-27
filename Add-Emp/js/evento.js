function evento (){
    let config = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    axios.post(`${path}/insertconv`),{
        id: $().val(),
        id_empresa: $(),
        titulo: $('#evento').val(),
        banner: $('#imgInp').val(),
        costo: $('#costoeven').val(),
        fecha: $('#borndate').val(),
        ref_modalidad: $('#multiselect').val(),
        precio: $('#preciopar').val(),
        num_participantes: $('#numpar').val()
    }


}