$(function () {
   // 1. 获取地址栏中产品id
   var str = location.search
   // 去掉 ?
   str = str.slice(1)
   var id = str.split('=')[1]

   // 2. 发送ajax,获取数据,渲染页面
   $.ajax({
      type: 'get',
      url: '/product/queryProductDetail',
      dataType: 'json',
      data: {
         id: id
      },
      success: function (info) {
         // console.log(info)
         var htmlStr = template('productTpl', info)
         $('.lt_main .mui-scroll').html(htmlStr)

         // 轮播图动态渲染完成后,需要手动初始化
         //获得slider插件对象
         var gallery = mui('.mui-slider');
         gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
         });

         // 数字框手动初始化
         mui('.mui-numbox').numbox()
      }
   })

   // 3. 给尺码添加可选功能
   $('.lt_main .mui-scroll').on('click', '.lt_size span', function () {
      $(this).addClass('current').siblings().removeClass('current')
   })

   // 4. 加入购物车功能
   // (1) 如果未登录,后台返回error,拦截到登录页
   // (1) 如果已登录,后台返回加入购物车的结果
   $('#addCart').on('click', function () {
      // 获取尺码和库存
      var size = $('.lt_size span.current').text()
      var num = $('.mui-numbox input').text()
      console.log(size, num, id)

      $.ajax({
         type: 'post',
         url: '/cart/addCart',
         dataType: 'json',
         data: {
            num: num,
            productId: id,
            size: size
         },
         success: function (info) {
            // console.log(info)
            if (info.error === 400) {
               // 说明未登录,拦截到登录页
               location.href = 'login.html?retUrl=' + location.href
               return
            }
            if (info.success) {
               // 加入成功,显示确认框
               mui.confirm('添加成功', '温馨提示', ['去购物车', '继续浏览'], function (e) {
                  if (e.index === 0) {
                     location.href = 'cart.html'
                  }
               })
            }
         }
      })
   })
})