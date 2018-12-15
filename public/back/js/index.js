$(function () {
   // 基于准备好的dom，初始化echarts实例
   var echarts1 = echarts.init(document.querySelector('.echarts_1'));
   var echarts2 = echarts.init(document.querySelector('.echarts_2'));

   // 指定图表的配置项和数据
   var option1 = {
      // 大标题
      title: {
         text: '2018注册人数'
      },
      // 提示框组件
      tooltip: {},
      // 图例
      legend: {
         data: ['人数', '销量']
      },
      // x轴的数据
      xAxis: {
         data: ["1月", "2月", "3月", "4月", "5月", "6月"]
      },
      // y轴的刻度,根据数据自动生成比较合适
      yAxis: {},
      // 数据
      series: [{
         name: '人数',
         // bar表示柱状图  line表示折线图  pie表示饼图
         type: 'bar',
         data: [900, 1500, 1800, 1200, 1000, 500]
      }, {
         name: '销量',
         type: 'line',
         data: [1100, 1200, 1100, 1900, 1700, 900]
      }]
   };

   var option2 = {
      title: {
         text: '热门品牌销售',
         // 子标题
         subtext: '2018年12月',
         // 水平居中
         x: 'center'
      },
      tooltip: {
         trigger: 'item',
         formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // 图例
      legend: {
         // 垂直排列
         orient: 'vertical',
         // 居左显示
         left: 'left',
         data: ['耐克', '阿迪', '万斯', '新百伦', '匡威']
      },
      series: [{
         name: '品牌',
         type: 'pie',
         radius: '55%',
         center: ['50%', '60%'],
         data: [{
               value: 335,
               name: '耐克'
            },
            {
               value: 310,
               name: '阿迪'
            },
            {
               value: 234,
               name: '万斯'
            },
            {
               value: 135,
               name: '新百伦'
            },
            {
               value: 1548,
               name: '匡威'
            }
         ],
         itemStyle: {
            emphasis: {
               shadowBlur: 10,
               shadowOffsetX: 0,
               shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
         }
      }]
   }

   // 使用刚指定的配置项和数据显示图表。
   echarts1.setOption(option1);
   echarts2.setOption(option2);
})