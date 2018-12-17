$(function () {
   // 一进入页面就发送ajax请求,请求数据,通过模板引擎完成渲染
   // 记录当前页
   var currentPage = 1
   // 记录每页条数
   var pageSize = 5

   // 记录id
   var currentId
   // 记录状态
   var isDelete

   render()

   function render() {
      $.ajax({
         type: 'get',
         url: '/user/queryUser',
         dataType: 'json',
         data: {
            page: currentPage,
            pageSize: pageSize
         },
         success: function (res) {
            // console.log(res)
            var htmlstr = template('tmp', res)
            $('tbody').html(htmlstr)

            // 根据返回的数据,动态渲染分页插件
            $('#paginator').bootstrapPaginator({
               // 版本号
               bootstrapMajorVersion: 3,
               // 当前页
               currentPage: res.page,
               // 总页数
               totalPages: Math.ceil( res.total / res.size ),
               // 设置控件的显示大小
               // size: 'large',

               // 为按钮绑定点击事件
               onPageClicked: function (a, b, c, page) {
                  // 更新到page页
                  currentPage = page
                  // 渲染
                  render()
               }
            })
         }
      })
   }

   // 给所有操作按钮,添加点击按钮(通过事件委托注册)
   $('tbody').on('click', '.btn', function () {
      // 点击显示模态框
      $('#userModal').modal('show')

      // 获取存储的id
      currentId = $(this).parent().data('id')

      // 1 启用状态, 0 禁用状态, 给后台传几, 就是将用户改成对应状态
      // 禁用按钮 ? 0 : 1
      isDelete = $(this).hasClass('btn-success') ? 1 : 0


      // 点击确定按钮,发送ajax请求,更新数据
      $('#submitBtn').on('click', function () {
         $.ajax({
            type: 'post',
            url: '/user/updateUser',
            dataType: 'json',
            data: {
               id: currentId,
               isDelete: isDelete
            },
            success: function (res) {
               // console.log(res)
               if (res.success) {
                  // 成功发送
                  // 1.关闭模态框
                  $('#userModal').modal('hide')

                  // 2.重新渲染页面
                  render()
               }
            }
         })
      })
   })
})