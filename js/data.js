$(document).ready(function() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback();
});

$('#ver').click(ver);

$(window).resize(function(event) {
  drawChart();
});

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Y');
  var a=[];
  var x=-10;
  for (var i = 0; i <= 20; i++) {
    a.push([x,eval($('#f').val())]);
    x++;
  }
  data.addRows(a);

  var options = {
    chart: {
      title: 'Línea de la función',
      subtitle: 'x (-10, 10)'
    },
    curveType: 'function',
    legend: {position: 'none'},
    //hAxis: {gridlines: {count: -1}},
    //vAxis: {gridlines: {count: -1}},
    height: ($(window).height()-150)
  };

  var chart = new google.visualization.LineChart(document.getElementById('g'));

  chart.draw(data, options);
}

function ver() {
  $('.alert').remove();
  $('#g').empty();
  if ($('#f').val()==='') $('.row').append('<div class="alert alert-danger col-xs-12 text-center">No hay ninguna funcion que ejecutar <i class="fa fa-frown-o" aria-hidden="true"></i></div>');
  else {
    var x=-10;
    try {
      eval($('#f').val());
      if($.type(eval($('#f').val()))==='number') drawChart();
    } catch(e) {
      $('.row').append('<div class="alert alert-danger col-xs-12 text-center">La función está mal escrita <i class="fa fa-frown-o" aria-hidden="true"></i></div>');
    }
  }
}