$(function () {
   // 1. 发送ajax,渲染页面
   var currentPage = 1
   var pageSize = 5

   render()

   function render() {
      $.ajax({
         type: 'get',
         url: '/category/querySecondCategoryPaging',
         dataType: 'json',
         data: {
            page: currentPage,
            pageSize: pageSize
         },
         success: function (res) {
            // console.log(res);
            var htmlstr = template('secondTpl', res)
            $('tbody').html(htmlstr)

            // 根据数据,渲染分页插件
            $('#paginator').bootstrapPaginator({
               bootstrapMajorVersion: 3,
               currentPage: res.page,
               totalPages: Math.ceil(res.total / res.size),
               onPageClicked: function (a, b, c, page) {
                  // 更新到page页
                  currentPage = page
                  render()
               }
            })
         }
      })
   }

   // 点击添加分类按钮,显示模态框
   // 显示模态框, 就立刻发送ajax请求, 请求一级分类的全部数据, 渲染下拉列表
   // 通过 page: 1, pageSize: 100, 获取数据, 模拟获取全部数据的接口
   $('#addBtn').on('click', function () {
      $('#secondModal').modal('show')

      $.ajax({
         type: 'get',
         url: '/category/queryTopCategoryPaging',
         dataType: 'json',
         data: {
            page: 1,
            pageSize: 100
         },
         success: function (res) {
            // console.log(res);
            var htmlstr = template('dropdownTpl', res)
            $('.dropdown-menu').html(htmlstr)
         }
      })
   })

   // 给下拉列表中的a注册点击事件,让下拉列表可选(通过委托事件注册)
   $('.dropdown-menu').on('click', 'a', function () {
      // 获取a中文本
      var txt = $(this).text()
      // 获取categoryId
      var id = $(this).data('id')
      // 将a中文本赋值给按钮文本 + name
      $('.first').text(txt)
      $('[name="categoryId"]').val(id)

      // 重置校验状态
      $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
   })


   // 调用fileupload方法完成文件上传初始化
   $("#fileupload").fileupload({
      dataType: "json",
      // e：事件对象
      // data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done: function (e, data) {
         // console.log(data)
         var result = data.result // 后台返回的对象
         var picUrl = result.picAddr // 图片路径

         // 将图片路径赋值给img的src
         $('#imgBox img').attr('src', picUrl)

         // 将图片地址 存到隐藏域中
         $('[name="brandLogo"]').val(picUrl)

         // 重置校验状态
         $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
      }
   });


   // 给调用表单校验插件,完成校验
   $('#form').bootstrapValidator({

      // 将默认的排除项 重置掉 (默认会对: hidden, :disabled等 进行排除)
      excluded: [],

      // 配置图标
      feedbackIcons: {
         valid: 'glyphicon glyphicon-ok', // 校验成功
         invalid: 'glyphicon glyphicon-remove', // 校验失败
         validating: 'glyphicon glyphicon-refresh' // 校验中
      },
      // 校验字段
      fields: {
         // 二级分类字段
         brandName: {
            validators: {
               notEmpty: {
                  message: '请输入二级分类名称'
               }
            }
         },
         // 下拉框校验
         categoryId: {
            validators: {
               notEmpty: {
                  message: '请选择一级分类'
               }
            }
         },
         // 上传图片 校验
         brandLogo: {
            validators: {
               notEmpty: {
                  message: '请上传图片'
               }
            }
         }
      }
   })


   // 注册校验成功事件,阻止表单默认提交,采用ajax
   $('#form').on('success.form.bv', function (e) {
      e.preventDefault()

      $.ajax({
         type: 'post',
         url: '/category/addSecondCategory',
         dataType: 'json',
         data: $('#form').serialize(),
         success: function (res) {
            // console.log(res)
            if (res.success) {
               // 关闭模态框
               $('#secondModal').modal('hide')
               // 重置表单
               $('#form').data('bootstrapValidator').resetForm(true)
               // 重置下拉菜单按钮文本
               $('.first').text('请选择一级分类')
               // 重置图片
               $('#imgBox img').attr('src','./images/none.png')
               // 重新渲染第一页
               currentPage = 1
               render()
            }
         }
      })
   })

})