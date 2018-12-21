$(function () {
   // 一进页面,根据搜索框文本,发送ajax,获取数据,渲染页面

   // 解析地址栏参数,获取搜索关键字
   var key = getSearch('key')

   // 1. 将地址栏参数 赋值给 input
   $('.lt_search input').val(key)

   // 2. 渲染页面
   render()

   // 3. 点击搜索按钮,重新发送请求,渲染页面
   $('.lt_search button').on('click', function () {
      render()
   })

   // 4. 点击排序
   //    (1) 如果有current类,切换箭头方向(改变箭头类名)
   //    (2) 如果没有current类,添加current类,并且做排他处理
   $('.lt_sort a[data-type]').on('click', function () {
      if ($(this).hasClass('current')) {
         // 有 current 类, 切换箭头 切换的类名  fa-angle-down   fa-angle-up
         $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
      } else {
         // 没有, 添加上类, 并排他
         $(this).addClass('current').siblings().removeClass('current')
      }
      // 重新渲染
      render()
   })

   // 发送ajax,获取数据,渲染页面封装
   function render() {

      // 让loading展示,加载中的效果
      $('.lt_product').html('<div class="loading"></div>')

      // 将所需参数存到对象中
      var paramsObj = {}
      paramsObj.proName = $('.lt_search input').val()
      paramsObj.page = 1
      paramsObj.pageSize = 100

      // 还有两个可选参数 price价格  num库存
      // 根据是否有高亮的a 来决定是否需要传参(排序)
      var $current = $('.lt_sort a.current')

      if ($current.length === 1) {
         // 说明有高亮的 a ,需要排序
         // console.log('需要排序') 
         // 给后台传的键,从自定义属性中获取
         var sortName = $current.data('type')
         
         // 给后台传排序的值,由箭头方向决定:   fa-angle-down -> 2  fa-angle-up -> 1
         // （1升序，2降序）
         var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1

         // 将参数拼接到对象中
         paramsObj[sortName] = sortValue
      }

      console.log( paramsObj )

      setTimeout(function () {
         $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            dataType: 'json',
            data: paramsObj,
            success: function (info) {
               // console.log(info)
               var htmlStr = template('listTpl', info)
               $('.lt_product').html(htmlStr)
            }
         })
      }, 1000)
   }

})