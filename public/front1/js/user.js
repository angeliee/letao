$(function () {
   $.ajax({
      type: 'get',
      url: '/user/queryUserMessage',
      dataType: 'json',
      success: function (info) {
         console.log(info)
         if (info.error === 400) {
            // 拦截到登录页
            location.href = "login.html"
            return
         }
         // 已登录, 返回了用户信息
         var htmlStr = template("userTpl", info);
         $('#userInfo').html(htmlStr)
      }
   })

   // 退出功能
   $('#logout').on('click', function () {
      $.ajax({
         type: 'get',
         url: '/user/logout',
         dataType: 'json',
         success: function (info) {
            console.log(info)
            if ( info.success ) {
               location.href = "login.html"
            } 
         }
      })
   })
})