// 配置禁用小圆环
NProgress.configure({
   showSpinner: false
})

/**
 * 1. 进度条
 *    (1) 发送ajax时开启进度条
 *    (2) 所有的ajax发送完成时关闭进度条
 */
$(document).ajaxStart(function () {
   NProgress.start()
})
$(document).ajaxStop(function () {
   setTimeout(function () {
      NProgress.done()
   }, 500)
})



$(function () {
   /**
    * 2. 二级菜单切换
    *    点击分类管理,动画展示二级菜单
    */
   $('.category').on('click', function () {
      $('.child').stop().slideToggle()
   })

   /**
    * 3. 头部菜单栏切换显示功能
    *    已经设置了一个hidemenu类
    *    点击按钮,切换hidemenu类
    */
   $('.icon_menu').on('click', function () {
      $('.lt_aside').toggleClass('hidemenu')
      $('.lt_major').toggleClass('hidemenu')
      $('.lt_topbar').toggleClass('hidemenu')
   })
})