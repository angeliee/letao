$(function () {
   // 点击登录,发送ajax请求
   $('#loginBtn').on('click', function () {

      // 获取用户名,密码
      var username = $('#username').val()
      var password = $('#password').val()
      
      if (username === '') {
         mui.toast('请输入用户名')
         return
      }
      if (password === '') {
         mui.toast('请输入密码')
         return
      }
   
      $.ajax({
         type: 'post',
         url: '/user/login',
         dataType: 'json',
         data: {
            username: username,
            password: password
         },
         success: function (info) {
            console.log(info)
            if (info.error === 403) {
               mui.toast('用户名或密码错误')
               return
            }
            if (info.success) {
               if (getSearch('retUrl')) {
                  var url = location.search.replace('?retUrl=','')
                  location.href = url
               } else{
                  location.href = 'user.html'
               }
            }
         }
      })
   })
})