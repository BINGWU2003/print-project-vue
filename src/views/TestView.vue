<!--
 * @Author: BINGWU
 * @Date: 2024-06-27 14:10:29
 * @LastEditors: hujiacheng hujiacheng@iipcloud.com
 * @LastEditTime: 2024-06-27 14:51:06
 * @FilePath: \print-project-vue\src\views\TestView.vue
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
-->
<template>
  <div>
    test
    <button @click="handleClick">button</button>
  </div>
</template>

<script setup>
import socketIoConnect from '@/utils/socketIo'
const { socket, clientId } = socketIoConnect()
const handleClick = () => {
  // 给客户端发消息
  socket.emit('message', {
    clientId,
    msg: 'hello 你好'
  })
}
</script>

<style lang="scss" scoped></style>