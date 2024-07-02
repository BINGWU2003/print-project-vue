# windows打印

[前端源码](https://github.com/BINGWU2003/print-project-vue.git)

[后端源码](https://github.com/BINGWU2003/print-serve.git)

实时通讯:[Socket.IO](https://socket.io/zh-CN/)

## 前端项目

安装依赖

```sh
pnpm install
```

运行项目

```sh
pnpm dev
```

打包

```sh
pnpm build
```

## 后端项目

安装依赖

```bash
npm install
```

运行项目

```bash
node socketio
```

## 打印状态反馈

![image-20240627171226304](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627171226304.png?imageSlim)

### 多台打印服务模拟

![image-20240627181550772](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181550772.png?imageSlim)

运行后端

```
node socketio
```

运行前端

```
pnpm dev
```

浏览器访问http://localhost:5173/test

启动三台打印服务

![image-20240627181711526](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181711526.png?imageSlim)

后端控制台输出每台打印机的clientId

![image-20240627181921521](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181921521.png?imageSlim)

获取一下打印服务的状态

url:http://localhost:3000/getStatus

![image-20240627181948913](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181948913.png?imageSlim)

模拟断开一台打印服务

![image-20240627182105455](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182105455.png?imageSlim)

一台打印机已断开

![image-20240627182129413](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182129413.png?imageSlim)

重新获取打印机服务的状态

url:http://localhost:3000/getStatus

![image-20240627182208873](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182208873.png?imageSlim)

## 模拟用户给服务端发送数据

url:http://localhost:3000/startPrint

- clientId:''xxxx"
- name:"xxxx"(相对于打印数据,字段不一定为name)

必须携带服务端的id

### 客户端在线

发送请求

![image-20240701091524649](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701091524649.png?imageSlim)

客户端接收到数据

![image-20240701091549627](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701091549627.png?imageSlim)

### 客户端掉线

#### 心跳机制

客户端会和服务端建立心跳,来确保客户端和服务端是双向连接

前端的重连的配置项

![image-20240701174539016](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701174539016.png?imageSlim)

如果客户端断线,在配置的重连的规则里一直没有重连到服务端,那客户端和服务端将双向断开,需要重新启动客户端来连接上服务端

#### 客户端和服务端断开后未重连成功

断开客户端

![image-20240701172253314](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701172253314.png?imageSlim)

此时在重连规则内没有重连到服务端,服务端控制台输出断开连接

后端控制台输出掉线

![image-20240701173759203](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701173759203.png?imageSlim)

获取打印机状态

connectd为false

![image-20240701174857599](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701174857599.png?imageSlim)

执行打印

![image-20240701174911253](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701174911253.png?imageSlim)

刷新页面重新启动客户端

客户端连接上服务端

![image-20240701175013336](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701175013336.png?imageSlim)

获取打印机状态

![image-20240701175243491](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701175243491.png?imageSlim)

#### 客户端和服务端断开后重连成功

断开客户端

![image-20240701175848084](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701175848084.png?imageSlim)

马上重连

![image-20240701175910737](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701175910737.png?imageSlim)

服务端控制台没有输出断开连接,说明重连成功

![image-20240701180048712](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701180048712.png?imageSlim)

发送打印请求

![image-20240701180110551](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701180110551.png?imageSlim)

客户端拿到了数据

![image-20240701180148079](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701180148079.png?imageSlim)

获取客户端状态

![image-20240701180232798](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701180232798.png?imageSlim)
