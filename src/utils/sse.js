/*
 * @Author: BINGWU
 * @Date: 2024-06-24 15:04:10
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2024-06-24 15:10:28
 * @FilePath: \print-project-vue\src\utils\SSE.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
//判断当前浏览器是否支持SSE

export function doPrint(callback) {
  let source = ''
  if (!!window.EventSource) {
    source = new EventSource('http://localhost:8088/sse/')
  } else {
    throw new Error("当前浏览器不支持SSE")
  }

  //对于建立链接的监听
  source.onopen = function (event) {
    console.log('连接成功')
  }

  //对服务端消息的监听
  source.onmessage = function (event) {
    callback(JSON.parse(event.data))
  }

  //对断开链接的监听
  source.onerror = function (event) {
    console.log(source.readyState)
    console.log("长连接中断")
  }
}



