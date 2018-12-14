$(function () {
   /*
    * 1. 进行表单校验配置
    *    校验要求:
    *        (1) 用户名不能为空, 长度为2-6位
    *        (2) 密码不能为空, 长度为6-12位
    * */

   $('#form').bootstrapValidator({

      // 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
         valid: 'glyphicon glyphicon-ok', // 校验成功
         invalid: 'glyphicon glyphicon-remove', // 校验失败
         validating: 'glyphicon glyphicon-refresh' // 检验中
      },

      //  配置校验字段  需要先给input框配置 name
      fields: {
         username: {
            // 配置校验规则
            validators: {
               // 配置一个非空
               notEmpty: {
                  message: "用户名不能为空"
               },
               // 长度校验
               stringLength: {
                  min: 2,
                  max: 6,
                  message: "用户名长度必须为2-6位"
               },
               callback: {
                  message: '用户名不存在'
               }
            }
         },
         password: {
            validators: {
               notEmpty: {
                  message: "密码不能为空"
               },
               stringLength: {
                  max: 12,
                  min: 6,
                  message: "密码长度必须为6-12位"
               },
               callback: {
                  message: '密码错误'
               }
            }
         }
      }

   })


   // 禁止表单的自动提交,成功就发送ajax请求
   $('#form').on('success.form.bv', function (e) {
      e.preventDefault();

      // 成功的话发送ajax请求给后台
      $.ajax({
         type: 'post',
         url: '/employee/employeeLogin',
         dataType: 'json',
         data: $('#form').serialize(),
         success: function (res) {
            // console.log(res)
            if (res.success) {
               // 说明登录成功
               console.log("登录成功")

               location.href = 'index.html'
            }

            if (res.error == 1000) {
               // 说明用户名不存在
               // console.log('用户名不存在')
               // updateStatus
               // 参数1: 字段名称
               // 参数2: 校验状态
               // 参数3: 校验规则,可以设置提示文本
               $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
            }

            if (res.error == 1001) {
               // 说明密码错误
               // console.log('密码错误')
               $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
            }
         }
      })
   })


   // 重置表单功能
   $('[type="reset"]').on('click', function () {
      console.log(1)
      // 重置表单中设置过校验的内容，并且将隐藏所有错误提示和图标
      $('#form').data('bootstrapValidator').resetForm()
   })





   // $('#form').bootstrapValidator({
   //    // 1. 配置校验字段   首先需要给input框配置name
   //    fields: {
   //       username: {
   //          // 配置校验规则
   //          validators: {
   //             // 用户名不能为空
   //             notEmpty: {
   //                message: "用户名不能为空"
   //             },
   //             // 长度为2-6位
   //             stringLength: {
   //                min: 2,
   //                max: 6,
   //                message: "用户名长度必须为2-6位"
   //             }
   //          }
   //       },
   //       password: {
   //          // 配置校验规则
   //          validators: {
   //             // 密码不能为空, 长度为6-12位
   //             notEmpty: {
   //                message: "密码不能为空"
   //             },
   //             stringLength: {
   //                min: 6,
   //                max: 12,
   //                message: "密码长度必须为6-12位"
   //             }
   //          }
   //       }
   //    },

   //    // 2. 指定校验时的图标显示
   //    feedbackIcons: {
   //       valid: 'glyphicon glyphicon-ok-circle', // 校验成功
   //       invalid: 'glyphicon glyphicon-remove-circle', // 校验失败
   //       validating: 'glyphicon glyphicon-refresh' // 校验中
   //    }
   // })
})