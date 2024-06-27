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
import socketIoConnect from '@/utils/socketIo';
const socket =  socketIoConnect()
const handleClick = ()=>{
  // 客户端 发消息
  console.log('send',socket)
  socket.emit('message', '吃饭吃饭')
}
</script>

<style lang="scss" scoped>

</style>