$(function () {
   // 一加载页面就发送ajax请求,渲染左侧导航
   $.ajax({
      type: 'get',
      url: '/category/queryTopCategory',
      dataType: 'json',
      success: function (info) {
         // console.log(info)
         var htmlStr = template('navTpl', info)
         $('.lt_nav ul').html(htmlStr)

         // 默认渲染左侧第一个分类对应的右侧内容
         renderById(info.rows[0].id)
      }
   })

   // 2. 给左侧导航中所有a注册点击事件
   //    点击切换current类
   //    右侧对应展示二级分类
   $('.lt_nav').on('click', 'a', function () {
      $('.lt_nav a').removeClass('current')
      $(this).addClass('current')

      var id = $(this).data('id')
      renderById(id)
   })


   // 钢筋左侧导航id,右侧发送ajax,获取数据封装
   function renderById(id) {
      $.ajax({
         type: 'get',
         url: '/category/querySecondCategory',
         dataType: 'json',
         data: {
            id: id
         },
         success: function (info) {
            // console.log(info)
            var htmlStr = template('conTpl', info)
            $('.lt_content ul').html(htmlStr)
         }
      })
   }
})