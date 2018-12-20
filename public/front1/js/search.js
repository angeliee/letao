$(function () {
   /**
    * 由于整个页面, 要进行大量的历史记录存储操作, 约定一个键名: search_list
      功能分析:
      功能1: 历史记录渲染
      功能2: 清空所有历史记录
      功能3: 点击删除单个历史
      功能4: 点击搜索, 添加搜索历史
    */

   // 功能1: 历史记录渲染
   render()


   // 读取本地数据,根据数组,完成模板渲染
   function render() {
      var arr = getHistory()
      var htmlStr = template('historyTpl', {
         arr: arr
      })
      $('.lt_history').html(htmlStr)
   }

   //  获取本地搜索记录,转换成数组 封装成函数
   function getHistory() {
      var jsonStr = localStorage.getItem('search_list')
      return JSON.parse(jsonStr)
   }
})