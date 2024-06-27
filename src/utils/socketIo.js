/*
 * @Author: BINGWU
 * @Date: 2024-06-27 14:29:09
 * @LastEditors: hujiacheng hujiacheng@iipcloud.com
 * @LastEditTime: 2024-06-27 14:31:52
 * @FilePath: \print-project-vue\src\utils\socketIo.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import io from 'socket.io';

// 初始化 socket.io
const socket = io('服务器地址');

// 连接成功触发的事件
socket.on('content', () => {
    console.log('连接成功');
});

// 客户端 发消息
socket.emit('前后端约定的事件名称', '要发送的消息');

// 客户端接收服务端发送的消息
socket.on('前后端约定的事件名称', (msg) => {
    // msg 就是后端发送的消息
    console.log(msg);
});

// 关闭连接
socket.close();

// 关闭连接触发的函数（触发这个函数的时候，说明服务已经断开了）
socket.on('disconnect', () => {
    console.log('关闭连接');
});
