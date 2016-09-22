NProgress.start();
setTimeout(function() {
    $('#page-wrapper').show();
    $('#overlay').hide();
    NProgress.done();

    $('.fade').removeClass('out');

}, 200);

function showSuccessMsg(text) {
    if(text){
        successMsg.find('.msg-text').text(text);
    }
    $('#page-wrapper').append(successMsg);
    $('.success-msg').show().delay(3000).fadeOut(400);
}

function showErrorMsg() {
    $('.error-msg').show().delay(3000).fadeOut(400);
}

function showErrorOverlay() {
    $('#page-wrapper').hide();
    $('#overlay').show();
}

function hideErrorOverlay() {
    $('#overlay').hide();
    $('#page-wrapper').show();
}

$('.menu-items').find("li.active").css("background-color", "#000").parent().addClass("in");
$('.menu-items').find("li.active>a").css("color", "#fff");



var successMsg = $('<div class="panel panel-green success-msg"><div class="panel-heading"><div class="row"><div' +
    ' class="col-xs-3"><i class="fa fa-check fa-3x"></i></div><div class="col-xs-9"><div class="col-xs-9 msg-text">Success Action text</div></div></div></div></div>');



//draw pie chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPieChart);
function drawPieChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Verified',     30],
    ['Not Verified',      20],
    ['Missing Info',  22]
  ]);

  var options = {
    legend: {position: 'top', alignment: 'center', textStyle: {color: 'gray', fontSize: 12}},
    height: 350,
    colors: ['#188ec5', '#54b23b', '#eb5729']
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

//draw line chart
function drawLineChartHander() {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawLineChart);
  function drawLineChart() {
    var data = new google.visualization.DataTable();
        data.addColumn('date', 'Month');
        data.addColumn('number', "Avg. Session Duration");
        data.addColumn('number', "Pages / Sessions");

        data.addRows([
          [new Date(2016, 7), 10.3, 16.6],
          [new Date(2016, 7), 10.3, 16.6],
          [new Date(2016, 8),  7.4, 13.3],
          [new Date(2016, 9),  4.4,  9.9],
          [new Date(2016, 10), 1.1,  6.6],
        ]);
   var options = {
     legend: {position: 'top', alignment: 'left', textStyle: {color: 'gray', fontSize: 12}},
     colors: ['#1885c5', '#15A0C8'],
     pointSize: 8,
     height: 350,
     pointShape: { type: 'circle', rotation: 180 }
   };

   var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
   chart.draw(data, options);
  }
}

drawLineChartHander();

function onResize() {
  drawLineChartHander()
}

$(window).resize( $.debounce( 250, onResize) );

$('#ranger').daterangepicker({
    locale: {
      format: 'MMM DD, YYYY'
    }
});

