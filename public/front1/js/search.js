$(function () {
  /**
   * 由于整个页面, 要进行大量的历史记录存储操作, 约定一个键名: search_list
     功能分析:
     功能1: 历史记录渲染
     功能2: 清空所有历史记录
     功能3: 点击删除单个历史
     功能4: 点击搜索, 添加搜索历史


    // 以下三句话,放在控制台执行,专门用来添加假数据
    // var arr = ['阿迪达斯','匡威','耐克','彪马','万斯','小白鞋']
    // var jsonStr = JSON.stringify(arr)
    // localStorage.setItem('search_list',jsonStr)

   */

  // 功能1: 历史记录渲染
  render()


  // 功能2: 清空所有历史记录
  $('.lt_history').on('click', '.clearAll', function () {
    mui.confirm('你确定要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        // 说明 确认
        // 清空本地记录
        localStorage.removeItem('search_list')

        // 重新渲染页面
        render()
      }
    })
  })


  // 功能3: 点击删除单个历史
  $('.lt_history').on('click', '.btn_delete', function () {
    mui.confirm('你确定删除该条记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        var index = $(this).data('index')
        var arr = getHistory()
        arr.splice(index, 1)
        localStorage.setItem('search_list', JSON.stringify(arr))
        render()
      }
    })
  })


  // 功能4: 点击搜索, 添加搜索历史
  $('.lt_search button').on('click', function () {
    // 获取搜索关键字
    var key = $('.lt_search input').val().trim()

    // 判断key是否为空,为空,提示用户
    if (key === '') {
      mui.toast('请输入搜索关键字')
      return
    }

    // 获取本地数据
    var arr = getHistory()

    // 判断,当前输入key,是否与之前的记录重复,重复保留最新的,删除旧的
    var index = arr.indexOf(key)
    if (index != -1) {
      arr.splice(index, 1)
    }

    // 如果存储本地记录的数组长度大于10,则保留最新一条,删除最后一条
    if (arr.length >= 10) {
      arr.pop()
    }

    // 将当前搜索插入数组最前面
    arr.unshift(key)

    // 将数组转成json字符串存到本地
    localStorage.setItem('search_list', JSON.stringify(arr))

    // 清空输入框内容
    $('.lt_search input').val('')

    // 重新渲染
    render()

    location.href = 'searchList.html?key=' + key
  })




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
    var jsonStr = localStorage.getItem('search_list') || '[]'
    return JSON.parse(jsonStr)
  }

})