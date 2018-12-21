$(function () {
   // 获取地址栏中产品id
   var str = location.search
   // 去掉 ?
   str = str.slice(1)
   var id = str.split('=')[1]

   // 发送ajax,获取数据,渲染页面
   $.ajax({
      type: 'get',
      url: '/product/queryProductDetail',
      dataType: 'json',
      data: {
         id: id
      },
      success: function (info) {
         console.log(info)
         var htmlStr = template('productTpl', info)
         $('.lt_main .mui-scroll').html(htmlStr)

         // 轮播图动态渲染完成后,需要手动初始化
         //获得slider插件对象
         var gallery = mui('.mui-slider');
         gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
         });
      }
   })
})