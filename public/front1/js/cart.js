$(function () {
   // 一进页面就进行购物车渲染
   render()

   // 发送ajax请求,获取数据,渲染
   function render() {
      $.ajax({
         type: 'get',
         url: '/cart/queryCart',
         dataType: 'json',
         success: function (info) {
            // console.log(info)
            if (info.error === 400) {
               // 说明未登录,拦截到登录页
               location.href = 'login.html?retUrl=' + location.href
               return
            }
            // 说明已登录,完成渲染即可,注意返回的是数组
            var htmlStr = template('cartTpl', {
               list: info
            })
            $('#cartList').html(htmlStr)
         }
      })
   }

   // 删除功能
   // 1. 给删除按钮注册点击事件
   // 2. 获取当前的 id, 发送删除请求
   // 3. 重新渲染
   $('.lt_main').on('click', '.btn_delete', function () {
      var id = $(this).data('id')

      $.ajax({
         type: "get",
         url: "/cart/deleteCart",
         data: {
            id: [id]
         },
         dataType: "json",
         success: function (info) {
            // console.log(info) 
            // 重新渲染
            render()
         }
      })
   })
})