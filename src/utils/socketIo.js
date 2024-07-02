/*
 * @Author: BINGWU
 * @Date: 2024-06-27 14:29:09
 * @LastEditors: hujiacheng hujiacheng@iipcloud.com
 * @LastEditTime: 2024-07-02 09:55:06
 * @FilePath: \print-project-vue\src\utils\socketIo.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import { io } from "socket.io-client"

import generateFixedLengthRandomString from "./id"
const clientId = '123'
export default function socketIoConnect() {
  // 初始化 socket.io
  const socket = io('http://localhost:3000', {
    reconnection: true, // 开启断线重连
    reconnectionAttempts: 5, // 重试次数
    reconnectionDelay: 1000, // 重连间隔时间（毫秒）
    reconnectionDelayMax: 5000 // 最大重连间隔时间（毫秒）
  })

  // 连接成功触发的事件
  socket.on('connect', () => {
    console.log('连接成功')
    // 客户端加入到服务端
    socket.emit('register', clientId)
  })
  // 客户端接收服务端发送的打印消息
  socket.on('print', (printData) => {
    // msg 就是后端发送的消息
    console.log('在这台打印机上打印,打印数据是', printData)
  })
  socket.on('error', () => {
    console.log('客户端发送消息失败')
  })
  // 关闭连接触发的函数（触发这个函数的时候，说明服务已经断开了）
  socket.on('disconnect', (reason) => {
    console.log('关闭连接', reason)
  })

  // 重新连接成功事件
  socket.on("reconnect", (attemptNumber) => {
    console.log(`重连成功,次数为: ${attemptNumber}`)
  })

  // 重新连接失败事件
  socket.on("reconnect_failed", () => {
    console.log("重连失败")
  })
  return { socket, clientId }
}


