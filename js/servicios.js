$(document).ready( () => {
    checkAccess()
    setName()
    set()
})
function set(){
    if(localStorage.getItem('isAdmin') == 1){
        $('#card2').attr('hidden', true);
        $('#card3').attr('hidden', true);
        $('#card4').attr('hidden', true);
        $('#admi').attr('hidden', true);
    }
    console.log(localStorage.getItem('isAdmin'))
    if(localStorage.getItem('isAdmin') == 2){
        $('#card2').attr('hidden', true);
        $('#admi').attr('hidden', true);
    }
    if(localStorage.getItem('isAdmin') == 3){
        $('#admi').attr('hidden', true);
    }
}
