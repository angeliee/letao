$(function () {
   /*
    * 1. 进行表单校验配置
    *    校验要求:
    *        (1) 用户名不能为空, 长度为2-6位
    *        (2) 密码不能为空, 长度为6-12位
    * */
   $('#form').bootstrapValidator({
 
      // 指定校验时的图标显示
      feedbackIcons: {
         valid: 'glyphicon glyphicon-ok', // 校验成功
         invalid: 'glyphicon glyphicon-remove', // 校验失败
         validating: 'glyphicon glyphicon-refresh' // 校验中
      },
      // 指定字段校验
      fields: {
         username: {
            validators: {
               // 不能为空
               notEmpty: {
                  message: '用户名不能为空'
               },
               // 长度2-6位
               stringLength: {
                  min: 2,
                  max: 6,
                  message: '用户名长度必须为2-6位'
               },
               callback: {
                  message: '用户名不存在'
               }
            }
         },
         password: {
            validators: {
               notEmpty: {
                  message: '密码不能为空'
               },
               stringLength: {
                  min: 6,
                  max: 12,
                  message: '密码必须为6-12位'
               },
               callback: {
                  message: '密码错误'
               }
            }
         }
      }
   });

   /**
    * 2. 重置表单
    */
   $('[type="reset"]').on('click',function(){
      $('#form').data('bootstrapValidator').resetForm()
   })


   /**
    * 3. 禁止表单的自动提交,使用ajax发送请求
    *    (1) 禁止默认表单提交
    *    (2) 发送ajax提交
    */
   $('#form').on('success.form.bv',function(e){
      e.preventDefault()

      // 发送ajax
      $.ajax({
         type: 'post',
         url: '/employee/employeeLogin',
         dataType: 'json',
         data: $('#form').serialize(),
         success: function(info){
            // console.log(info) 
            if (info.error === 1000) {
               // console.log('用户名不存在') 
               $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
            }
            if (info.error === 1001) {
               // console.log('密码错误') 
               $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
            }
            if (info.success) {
               // console.log('登录成功') 
               location.href = 'index.html'
            }
         }
      })
   })
});