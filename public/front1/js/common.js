// 区域滚动: 初始化scrool控件
/* 常用配置项:
   options = {
      scrollY: true, //是否竖向滚动
      scrollX: false, //是否横向滚动
      startX: 0, //初始化时滚动至x
      startY: 0, //初始化时滚动至y
      indicators: true, //是否显示滚动条
      deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
      bounce: true //是否启用回弹
   }
*/
mui('.mui-scroll-wrapper').scroll({
   deceleration: 0.0007, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
   // 去除滚动条
   indicators: false
});


// 解析地址栏参数:
// 传递参数的键名,返回对应参数值
function getSearch(k) {
   // 拿到的是地址栏编码过的字符串
   var str = location.search

   // 解码成中文
   str = decodeURI(str)

   // 去掉 ?
   // str.splice(start,end)
   // 包括start 不包括end, 不写end,表示从start截取到最后
   str = str.slice(1)

   // split: 将字符串分割成数组
   var arr = str.split('&')

   // 用来存储传过来的键值对
   var obj = {}

   // 遍历数组,获取键值,对应存储
   arr.forEach(function (v, i) {
      var key = v.split('=')[0]
      var value = v.split('=')[1]
      obj[ key ] = value
   })

   // 将对象返回出去
   return obj[k]

}