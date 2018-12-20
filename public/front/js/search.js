$(function () {
   // localStorage
   // 1. 本地存储,操作历史记录,不用发请求,即可使用,对服务器压力更小
   // 2. 如果在服务器进行存储每个用户对应的数据,是需要用户登录的,而搜索功能,不登录也能使用

   // 以下三句话,放在控制台执行,专门用来添加假数据
   // var arr = ['阿迪达斯','匡威','耐克','彪马','万斯','小白鞋']
   // var jsonStr = JSON.stringify(arr)
   // localStorage.setItem('search_list',jsonStr)


   // 由于整个页面,要进行大量的历史记录存储操作,约定一个键名: search_list
   // 功能分析: 
   // 功能1: 历史记录渲染
   // 功能2: 清空所有历史记录
   // 功能3: 点击删除单条历史记录
   // 功能4: 点击搜索,添加搜索记录

   /**
    * 功能1: 历史记录渲染
    * (1) 从本地存储获取搜索历史
    * (2) 取出来的是jsonStr, 转成数组
    * (3) 利用模板引擎渲染(将数组包装成对象)
    */
   render()


   /**
    * 功能2: 清空历史记录
    * (1) 给清空按钮注册点击事件(事件委托绑定)
    * (2) 利用removeItem() 清空历史
    * (3) 重新渲染
    */
   $('.lt_history').on('click', '.history_empty', function () {
      // 弹出提示框 .confirm( message, title, btnValue, callback [, type] )
      mui.confirm('你确定要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
         // console.log(e) 
         // {index: 1, value: ""}   确认
         // {index: 0, value: ""}   取消

         if (e.index === 1) {
            // 清空历史
            localStorage.removeItem('search_list')
            // 重新渲染
            render()
         }
      })
   })


   /**
    * 功能3: 点击删除单条历史记录
    * (1) 给所有删除按钮,添加点击事件(事件委托绑定)
    * (2) 获取下标,删除数组的对应项, splice(start,deleteCount,replace1,replace2,...)
    * (3) 将数组转成jsonStr,存储到本地历史中
    * (4) 重新渲染
    */
   $('.lt_history').on('click', '.btn_delete', function () {

      // 将this保存到that中
      var that = this

      mui.confirm('你确定要删除该条记录吗?', '温馨提示', ['取消', '确认'], function (e) {
         if (e.index === 1) {
            // 说明点击了确认
            // 获取当前准备删除记录的下标
            var index = $(that).data('index')
            // 获取本地历史记录数组
            var arr = getHistory()
            // 移除当前条
            arr.splice(index, 1)
            // 将数组转成json字符串,重新保存到本地
            var jsonStr = JSON.stringify(arr)
            localStorage.setItem('search_list', jsonStr)

            // 重新渲染页面
            render()
         }
      })
   })


   /**
    * 功能4: 点击搜索, 添加搜索历史
    * (1) 给搜索按钮,添加点击事件
    * (2) 获取搜索关键字,添加到数组的最前面 unshift
    * (3) 转成jonStr, 存储到本地
    * (4) 清空搜索框,重新渲染
    */
   $('.lt_search button').on('click', function () {
      // 获取搜索框内容
      var key = $('.lt_search input').val().trim()
      // 如果未输入有效文本,提示用户
      if (key === '') {
         // 提示消息框: mui.toast('提示内容')
         mui.toast('请输入搜索关键字')
         return
      }

      // 获取数组
      var arr = getHistory()

      // 将最新搜索添加到数组最前面
      // 判断一下,如果有重复的要删除,保留最新的
      var index = arr.indexOf(key)
      if (index !== -1) {
         // 说明重复了,删除对应项
         arr.splice(index, 1)
      }

      // 判断一下,数组长度最大:10, 超过就删除最后一项
      if (arr.length >= 10) {
         arr.pop()
      }

      // 最新搜索添加到数组最前面
      arr.unshift(key)

      // 转成jsonStr,存储到本地
      localStorage.setItem('search_list', JSON.stringify(arr))

      // 清空搜索框
      $('.lt_search input').val('')

      // 重新渲染
      render()

      // 搜索完成,跳转到搜索列表,并将搜索关键字传递过去
      location.href = "searchList.html?key=" + key
   })



   // 读取本地历史,根据数组,完成模板渲染
   function render() {
      var arr = getHistory()
      var htmlStr = template('searchTpl', {
         arr: arr
      })
      $('.lt_history').html(htmlStr)
   }

   // 专门用于获取本地历史,返回一个数组
   function getHistory() {
      var jsonStr = localStorage.getItem('search_list') || '[]'
      var arr = JSON.parse(jsonStr)
      return arr
   }

})