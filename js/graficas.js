var datostxt = new Array();   

function genrep() {             
    $('#conv option:selected').each(function () {
        datostxt.push($(this).text());        
    });   
    
    var lineDiv = document.getElementById('plotlyChart');
    var data = [
            {
                //nombre de las carreras
                x: ['Carrera 1', 'Carrera 2', 'Carrera 3', 'Carrera 4'], 
                //datos numericos de los participantes
                y: [60, 24, 53, 16],
            type: 'bar'
            }
        ];
    var layout = {
        title: 'Participantes/carrera'
    };

    Plotly.newPlot(lineDiv, data, layout);    

    var lineDiv2 = document.getElementById('plotlyChart2');
    var data2 = [{
        values: [19, 26, 55],
        labels: ['Faltante', 'Hombres', 'Mujeres'],
        type: 'pie'
    }];

    var layout2 = {
        title: datostxt.toString(),    
    };

    Plotly.newPlot(lineDiv2, data2, layout2);
}    
 


  
    
