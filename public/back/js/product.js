$(function () {

   // 1. 一进入页面,发送ajax请求,获取数据,渲染页面
   var currentPage = 1
   var pageSize = 3

   // 图片数组,用于存储商品页面提交的图片对象
   var picArr = []

   render()

   function render() {
      $.ajax({
         type: 'get',
         url: '/product/queryProductDetailList',
         dataType: 'json',
         data: {
            page: currentPage,
            pageSize: pageSize
         },
         success: function (res) {
            // console.log(res)
            var htmlstr = template('productTpl', res)
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
      $('#productModal').modal('show')

      // 点击分类按钮,就发送ajax请求,获取数据,用于下拉列表的渲染
      $.ajax({
         type: 'get',
         url: '/category/querySecondCategoryPaging',
         dataType: 'json',
         data: {
            page: 1,
            pageSize: 100
         },
         success: function (res) {
            // console.log(res) 
            var htmlstr = template('dropdownTpl', res)
            $('.dropdown-menu').html(htmlstr)
         }
      })
   })

   // 3. 给下拉列表中的a 注册点击事件(利用事件委托)
   $('.dropdown-menu').on('click', 'a', function () {
      // 获取a中文本赋值给下拉按钮的文本
      var txt = $(this).text()
      $('.dropdownText').text(txt)
      // 获取a存储在自定义属性中的id,赋值给隐藏域
      var id = $(this).data('id')
      $('[name="brandId"]').val(id)

      // 更新校验状态为成功
      $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
   })

   // 4. 进行文件上传初始化
   $('#fileupload').fileupload({
      // 返回的数据类型
      dataType: 'json',
      done: function (e, data) {
         // console.log(data) 
         var picObj = data.result
         picArr.unshift(picObj)

         // 存储图片地址
         var picUrl = picObj.picAddr
         // 将新得到的图片,添加到结构最前面
         $('#imgBox').prepend('<img src="' + picUrl + '" alt="" style="width: 100px">')

         // 限制只能上传3张
         if (picArr.length > 3) {
            // 移除最后一项
            picArr.pop()
            // 同时更新页面结构,找到最后一个img类型的元素,并且删除
            $('#imgBox img:last-of-type').remove()
         }

         // 当上传3张图片时,满足条件,校验成功
         if (picArr.length === 3) {
            // 更新图片校验状态为成功
            $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
         }

      }
   })

   // 5. 给调用表单校验插件,完成校验
   $('#form').bootstrapValidator({
      // 配置排除项,因为对隐藏域也要进行校验
      // 默认为[':disabled', ':hidden', ':not(:visible)'],
      excluded: [],
      // 配置图标
      feedbackIcons: {
         valid: 'glyphicon glyphicon-ok', // 校验成功
         invalid: 'glyphicon glyphicon-remove', // 校验失败
         validating: 'glyphicon glyphicon-refresh' // 校验中
      },
      // 校验字段
      fields: {
         brandId: {
            // 校验规则
            validators: {
               // 不能为空
               notEmpty: {
                  message: "请选择二级分类"
               }
            }
         },
         proName: {
            validators: {
               notEmpty: {
                  message: '请输入商品名称'
               }
            }
         },
         proDesc: {
            validators: {
               notEmpty: {
                  message: '请输入商品描述'
               }
            }
         },
         num: {
            validators: {
               notEmpty: {
                  message: '请输入商品库存'
               },
               //正则校验
               regexp: {
                  regexp: /^[1-9]\d*$/,
                  message: '商品库存格式, 必须是非零开头的数字'
               }
            }
         },
         size: {
            validators: {
               notEmpty: {
                  message: '请输入商品尺码'
               },
               regexp: {
                  regexp: /^\d{2}-\d{2}$/,
                  message: '尺码格式, 必须是 xx-xx'
               }
            }
         },
         oldPrice: {
            validators: {
               notEmpty: {
                  message: '请输入商品原价'
               }
            }
         },
         price: {
            validators: {
               notEmpty: {
                  message: '请输入商品现价'
               }
            }
         },
         picStatus: {
            validators: {
               notEmpty: {
                  message: '请上传3张图片'
               }
            }
         }
      }
   })

   // 6. 阻止表单默认提交,通过ajax发送请求
   $('#form').on('success.form.bv', function (e) {
      // 阻止默认的提交
      e.preventDefault()

      // picArr: JSON.stringify后的数组字符串
      // 格式如下:
      // picArr: '[{"picName":"xxx.jpg","picAddr":"/upload/product/xx.jpg"},
      //           {"picName":"xxx.jpg","picAddr":"/upload/product/xx.jpg"},
      //           {"picName":"xxx.jpg","picAddr":"/upload/product/xx.jpg"}]'

      // paramsStr存储后台要求传递的参数
      var paramsStr = $('#form').serialize()
      paramsStr += "&picArr=" + JSON.stringify(picArr)

      // 发送ajax
      $.ajax({
         type: 'post',
         url: '/product/addProduct',
         dataType: 'json',
         data: paramsStr,
         success: function (res) {
            // console.log(res)
            // 发送成功
            // 关闭模态框
            $('#productModal').modal('hide')
            // 渲染第一页
            currentPage = 1
            render()
            // 重置表单内容
            // resetForm(true)  表示内容和状态都重置
            // resetForm()      只重置状态
            $('#form').data('bootstrapValidator').resetForm(true)

            // 下拉按钮不是表单元素,需要手动重置
            $('.dropdownText').text('请选择二级分类')

            // 图片不是表单元素,需要手动重置
            $('#imgBox img').remove()
            
            // 置空存储图片对象的数组
            picArr = []
         }
      })
   })

})