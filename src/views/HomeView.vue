<template>
  <div class="home">
    home
    <button @click="handlePrint">打印</button>
    <button @click="handlePreview">预览</button>
    <button @click="sendMsg">发送信息</button>
  </div>
</template>


<script setup>
import { getLodop } from '@/utils/LodopFuncs'
import textTemplate from '@/templates/textTemplate'
import qrTemplate from '@/templates/qrTemplate'
import htmlTemplate from '@/templates/htmlTemplate'
import websocketConnect from '@/utils/websocket'
let LODOP = null

const callback = (params) => {
  // if (params.printData) {
  //   console.log('print')
  //   handlePrint()
  // }
  console.log('params', params)
}

const ws = websocketConnect(callback)
const sendMsg = () => {
  ws.send('客户端发来信息:hello')
}
const myTemplaate = () => {
  LODOP.SET_PRINT_STYLE("FontColor", 16711680)
  LODOP.SET_PRINT_STYLEA(2, "FontName", "隶书")
  LODOP.SET_PRINT_STYLEA(2, "FontSize", 11)
  LODOP.SET_PRINT_STYLEA(2, "FontColor", 0)
  // 内容的总高度 225 - 15 = 210px
  LODOP.ADD_PRINT_TEXT(15, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(25, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(35, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(45, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(55, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(65, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(75, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(85, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(95, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(105, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(115, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(125, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(135, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(145, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(155, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(165, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(175, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(185, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(195, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(205, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(215, 2, 100, 20, "2008年11月9日")
  LODOP.ADD_PRINT_TEXT(225, 2, 100, 20, "2008年11月9日")
  // 页面旋转180度
  LODOP.SET_PRINT_STYLEA(0, "AngleOfPageInside", 180)
}

const handlePrint = () => {
  LODOP = getLodop()
  LODOP.PRINT_INIT("")
  LODOP.SET_PRINT_PAGESIZE(1, 400, 800, "CreateCustomPage")
  myTemplaate()
  LODOP.PRINT()
}

const handlePreview = () => {
  LODOP = getLodop()
  LODOP.PRINT_INITA(0, 0, 522, 333, "打印控件功能演示_Lodop功能_自定义纸张4")
  LODOP.SET_PRINT_PAGESIZE(1, 400, 800, "CreateCustomPage")
  // myTemplaate()
  htmlTemplate(LODOP)
  LODOP.PREVIEW()
}
console.log('abc')
</script>
