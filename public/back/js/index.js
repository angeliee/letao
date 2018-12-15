$(function(){
   var $echart1 = $('.echarts_1')[0]
   var $echart2 = $('.echarts_2')[0]

   var myChart = echarts.init($echart1);
   var app = {};
   option = null;
   option = {
      xAxis: {
         type: 'category',
         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
         type: 'value'
      },
      series: [{
         data: [120, 200, 150, 80, 70, 110, 130],
         type: 'bar'
      }]
   };;
   if (option && typeof option === "object") {
      myChart.setOption(option, true);
   }
})