<!--
 * @Author: BINGWU
 * @Date: 2024-06-27 14:10:29
 * @LastEditors: hujiacheng hujiacheng@iipcloud.com
 * @LastEditTime: 2024-07-02 10:00:52
 * @FilePath: \print-project-vue\src\views\TestView.vue
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
-->
<template>
  <div>
    test
    <button @click="handleReconnect">重连</button>

  </div>
</template>

<script setup>
import socketIoConnect from '@/utils/socketIo'
import { onMounted } from 'vue'
let currentSocket = null
let currentClientId = ''

const handleClick = () => {
  // 给客户端发消息
  // socket.emit('message', {
  //   clientId,
  //   msg: 'hello 你好'
  // })
}
const handleReconnect = () => {
  console.log('点击按钮触发重连')
  currentSocket.connect()
}
onMounted(() => {
  const { socket, clientId } = socketIoConnect()
  currentClientId = clientId
  currentSocket = socket
})
</script>

<style lang="scss" scoped></style>