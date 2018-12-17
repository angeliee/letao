$(function () {
   // 1. 一进入页面,发送ajax请求,获取数据,渲染页面
   var currentPage = 1
   var pageSize = 5

   render()

   function render() {
      $.ajax({
         type: 'get',
         url: '/category/queryTopCategoryPaging',
         dataType: 'json',
         data: {
            page: currentPage,
            pageSize: pageSize
         },
         success: function (res) {
            // console.log(res) 
            var htmlstr = template('tmp', res)
            $('tbody').html(htmlstr)

            // 获取数据,渲染分页插件
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

   // 2. 添加分类按钮,注册点击事件,展示模态层
   $('#addBtn').on('click', function () {
      $('#firstModal').modal('show')
   })

   // 3. 给调用表单校验插件,完成校验
   $('#form').bootstrapValidator({
      // 配置图标
      feedbackIcons: {
         valid: 'glyphicon glyphicon-ok', // 校验成功
         invalid: 'glyphicon glyphicon-remove', // 校验失败
         validating: 'glyphicon glyphicon-refresh' // 校验中
      },
      // 校验字段
      fields: {
         categoryName: {
            // 校验规则
            validators: {
               // 不能为空
               notEmpty: {
                  message: "请输入一级分类名称"
               }
            }
         }
      }
   })

   // 4. 阻止表单默认提交,通过ajax发送请求
   $('#form').on('success.form.bv', function (e) {
      // 阻止默认的提交
      e.preventDefault()

      // 发送ajax
      $.ajax({
         type: 'post',
         url: '/category/addTopCategory',
         dataType: 'json',
         data: $('#form').serialize(),
         success: function (res) {
            // console.log(res)
            // 关闭模态框
            $('#firstModal').modal('hide')
            // 渲染第一页
            currentPage = 1
            render()
            // 重置表单内容
            // resetForm(true)  表示内容和状态都重置
            // resetForm()      只重置状态
            $('form').data('bootstrapValidator').resetForm(true)
         }
      })
   })

})