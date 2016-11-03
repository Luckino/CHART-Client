$(document).ready(function() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback();
});

$('#ver').click(ver);

$('#n').change(function() {
  $('#ver').removeAttr('disabled');
  $('#i').empty();
  for (var i = 0; i < $('#n').val(); i++) {
    $('#i').append('<div class="col-xs-12"><div class="input-group"><span class="input-group-addon">Nombre</span><input type="text" class="form-control col-xs-3" id="v'+(i+1)+'" placeholder="Ejemplo: Y'+(i+1)+'"><span class="input-group-addon">Función</span><input type="text" class="form-control col-xs-9" id="f'+(i+1)+'" placeholder="Ejemplo: 2*x+2"></div><br></div>');
  }
});

$(window).resize(function() {
  if(!$('#g').is(':empty')) drawChart();
});

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  var t='<thead><tr><th>X</th>';
  for (var i = 0; i < $('#n').val(); i++) {
    data.addColumn('number', $('#v'+(i+1)).val());
    t+='<th>'+$('#v'+(i+1)).val()+'</th>';
  }
  t+='</tr></thead><tbody>';
  
  var a=[];
  var x=parseInt($('#desde').val()?$('#desde').val():-10);
  var hasta=parseInt($('#valores').val()?$('#valores').val():20);
  for (var i = 0; i <= hasta; i++) {
    a.push([]);
    a[i].push(x);
    t+='<tr><td>'+x+'</td>';
    for (var j = 0; j < $('#n').val(); j++) {
      a[i].push(parseFloat(eval($('#f'+(j+1)).val()).toFixed(3)));
      t+='<td>'+eval($('#f'+(j+1)).val()).toFixed(3).replace('.',',')+'</td>';
    }
    t+='</tr>';
    x++;
  }
  t+='</tr></tbody>';
  data.addRows(a);
  $('#datos table').empty().append(t);

  var options = {
    curveType: 'function',
    legend: {position: 'top'},
    chartArea: {left: '5%', top: '5%', width: '90%', height: '90%'},
    width: $('#g').width(),
    height: ($('#g').width()*2/3)
  };

  var chart = new google.visualization.LineChart(document.getElementById('g'));

  google.visualization.events.addListener(chart, 'ready', function () {
    $uri=chart.getImageURI();
  });

  chart.draw(data, options);

}

function ver() {
  $('#ver').blur();
  $('.alert').remove();
  $('#g').empty();
  if ($('#f1').val()==='') $('#i').append('<div class="alert alert-danger col-xs-12 text-center">No hay ninguna funcion que ejecutar <i class="fa fa-frown-o" aria-hidden="true"></i></div>');
  else {
    var x=$('#desde').val()?$('#desde').val():-10;
    try {
      eval($('#f1').val());
      if($.type(eval($('#f1').val()))==='number') drawChart();
      $('#descargar,#tabla').css('display', 'inline');
      $('#descargar').attr('href', $uri);
      $('#export').click(function() {
        return ExcellentExport.csv(this,datatable,';');
      });
    } catch(e) {
      $('#i').append('<div class="alert alert-danger col-xs-12 text-center">La función está mal escrita <i class="fa fa-frown-o" aria-hidden="true"></i></div>');
    }
  }
}