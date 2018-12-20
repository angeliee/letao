$(function () {
   /**
    * 1. 一进入分类页面,就发送ajax请求,获取左侧一级分类数据
    */
   $.ajax({
      type: 'get',
      url: '/category/queryTopCategory',
      dataType: 'json',
      success: function (res) {
         console.log(res)
         var htmlstr = template('topTpl', res)
         $('.lt_nav ul').html(htmlstr)

         // 调用方法,默认渲染第一个一级分类对应的二级分类
         renderById(res.rows[0].id)
      }
   })

   // 1. 给左侧一级分类导航所有的a注册点击事件
   $('.lt_nav ul').on('click', 'a', function () {
      // 1. 切换效果, 给自己加上 current 类, 移除其他 a 的current类
      $('.lt_nav ul a').removeClass('current')
      $(this).addClass('current')

      // 渲染二级分类(二级联动)
      var id = $(this).data('id')
      renderById(id)
   })


   // 根据左侧导航id,发送ajax,获取二级导航内容并渲染,封装成函数
   function renderById(id) {
      // 发送 ajax, 获取二级分类数据, 进行模板渲染
      $.ajax({
         type: 'get',
         url: '/category/querySecondCategory',
         dataType: 'json',
         data: {
            id: id
         },
         success: function (res) {
            // console.log(res)
            var htmlstr = template('secondTpl', res)
            $('.lt_content ul').html(htmlstr)
         }
      })
   }
})