// 测试进度条方法
// 开启进度条
// NProgress.start()
// setTimeout(function(){
//    // 结束进度条
//    NProgress.done()
// },2000)

/**
 * 需求: 在第一个ajax发送的时候,开启进度条
 *       在全部的ajax回来的时候,关闭进度条
 * 
 * ajax全局事件:
 *    .ajaxComplete()   当每个ajax完成时,调用   (不管成功/失败)
 *    .ajaxSuccess()    当ajax返回成功时,调用
 *    .ajaxError()      当ajax返回失败时,调用
 *    .ajaxSend()       当ajax发送前,调用
 * 
 *    .ajaxStart()      当第一个ajax发送时,调用
 *    .ajaxStop()       当全部的ajax请求完成时,调用
 */
$(document).ajaxStart(function () {
   // 第一个ajax发送时,开启进度条
   // console.log(1) 
   NProgress.start()
})

$(document).ajaxStop(function () {
   // 模拟网络延迟
   setTimeout(function () {
      // 所有的ajax发送完成时,关闭进度条
      NProgress.done()
   }, 500)
})


$(function () {

   // 功能1: 点击分类栏切换二级菜单
   $('.lt_aside .category').on('click', function () {
      $('.lt_aside .nav .child').stop().slideToggle()
   })

   // 功能2: 左侧菜单切换效果
   $('.icon_menu').on('click', function () {
      $('.lt_aside').toggleClass('hidebox')
      $('.lt_main').toggleClass('hidebox')
      $('.lt_topbar').toggleClass('hidebox')
   })


   // 功能3: 退出功能
   $('.icon_logout').on('click', function () {
      $('#logoutModal').modal("show")
   })

   // 退出两种方式:
   // 1. 发ajax让后台, 销毁当前用户的登录状态, 实现退出   (推荐)
   // 2. 清除浏览器缓存, 将cookie清空, 本地存储的 sessionId 也没了
   // 给退出按钮, 添加点击事件, 需要在退出时, 销毁当前用户的登录状态
   $('#logoutBtn').on('click', function () {
      $.ajax({
         type: 'get',
         url: '/employee/employeeLogout',
         dataType: 'json',
         success: function (res) {
            console.log(res)
            if (res.success) {
               // 销毁登录状态成功
               location.href = 'login.html'
            }
         }
      })
   })

})