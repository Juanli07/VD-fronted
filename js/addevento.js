$(document).ready(function () {
    checkAccess()
    setName()
    setEmpresas()
    setnavbar()
});

function setEmpresas(){
    axios.get(`${path}/findAll/empresa`).then( res => {
        let options = '<option value="-1">- - -Empresa- - -</option>'
        res.data.forEach( item => options+=`<option value="${item.id}">${item.nombre}</option>`)
        $('#emp').html(options)
    })
}
