/*
 * @Author: BINGWU
 * @Date: 2024-06-27 11:09:38
 * @LastEditors: hujiacheng hujiacheng@iipcloud.com
 * @LastEditTime: 2024-06-27 11:09:43
 * @FilePath: \electron-desktop-tool\src\utils\websokect.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */

export default function websocketConnect(callback) {
  // 创建ws连接
  const ws = new WebSocket('ws://localhost:3200')
  ws.onopen = function () {
    console.log('WebSocket 连接已经建立。')
    ws.send('客户端发来信息:客户端连接到了服务端')
  }
  ws.onmessage = function (event) {
    console.log('收到服务器消息：', event.data)
    callback(event.data)
  }
  ws.onerror = function (event) {
    console.error('WebSocket 连接出现错误：', event)
  }
  ws.onclose = function () {
    console.log('WebSocket 连接已经关闭。')
  }
  return ws
}