# windows打印

[客户端源码](https://github.com/BINGWU2003/print-project-vue.git)

[服务端源码](https://github.com/BINGWU2003/print-serve.git)

实时通讯:[Socket.IO](https://socket.io/zh-CN/)

## 客户端项目

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

## 服务端项目

安装依赖

```bash
npm install
```

运行项目

```bash
node socketio
```

## 打印状态反馈

[使用socketio内置的心跳机制处理](####心跳机制)

![image-20240627171226304](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627171226304.png?imageSlim)

## 多台客户端模拟

![image-20240627181550772](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181550772.png?imageSlim)

运行服务端

```bash
node socketio
```

运行前端

```
pnpm dev
```

浏览器访问http://localhost:5173/test

每台客户端通过clientId做区分

每启动一台客户端就触发register事件,在服务端注册一台客户端:

客户端

```javascript
// 连接成功触发的事件
socket.on('connect', () => {
    console.log('连接成功')
    // 客户端加入到服务端
    socket.emit('register', clientId)
})
```

服务端

```javascript
// 监听客户端在register事件发送标识
socket.on('register', (clientId) => {
    clients[clientId] = {
        socket: socket,
        connected: true,
    }
	console.log(`连接上服务端的客户端的id是: ${clientId}`)
})
```

启动三台客户端

![image-20240627181711526](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181711526.png?imageSlim)

服务端控制台输出每台客户端的clientId

![image-20240627181921521](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181921521.png?imageSlim)

获取一下所有客户端的状态

url:http://localhost:3000/getStatus

![image-20240627181948913](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181948913.png?imageSlim)

模拟断开一台客户端

![image-20240627182105455](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182105455.png?imageSlim)

一台客户端已断开

![image-20240627182129413](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182129413.png?imageSlim)

重新获取所有客户端服务的状态

url:http://localhost:3000/getStatus

![image-20240627182208873](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182208873.png?imageSlim)

## 打印交互流程

![image-20240702114637901](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702114637901.png?imageSlim)

服务端和客户端需要提前约定好一个事件,用来处理打印

例子:

以print事件来处理打印

![image-20240702111245289](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702111245289.png?imageSlim)

1.先返回所有的客户端

获取所有的客户端的状态url:http://localhost:3000/getStatus

响应示例:

```json
{
	"data": [
		{
			"clientId": "123", // 客户端id
			"connected": false, // 客户端的在线状态
			"socketId": "S9NaDWsGfsdKaorIAAAH" // 客户端socketid
		}
	]
}
```

服务端:

```javascript
app.get("/getStatus", express.json(), (req, res) => {
  const data = []
  for (const clientId in clients) {
    const client = clients[clientId]
    data.push({
      clientId,
      connected: client.connected,
      socketId: client.socket.id
    })
  }
  res.json({
    data
  })
})
```

2.用户选择在线的客户端后执行打印操作

打印请求的url:http://localhost:3000/startPrint

- clientId:''xxxx"(客户端的id,用户提前选择好的在线的客户端)
- printData:"xxxx"

客户端代码:

```javascript
// 客户端接收服务端发送的打印消息
socket.on('print', (printData) => {
// printData 就是服务端发送的消息
console.log('在这台客户端上打印,打印数据是', printData)
})
```

客户端开始处理打印相关操作

服务端代码:

```javascript
app.get("/startPrint", express.json(), (req, res) => {
  const { clientId, printData } = req.query // 存储用户参数
  const targetClient = clients[clientId]
  // 如果客户端存在
  if (targetClient) {
    // 且客户端在线
    if (targetClient.connected) {
      // 收到参数后再返回给客户端
      targetClient.socket.emit('print', {printData})
      res.send({ message: "参数已接收" })
    } else {
      res.send({ message: "客户端离线" })
    }
  } else {
    res.send({ message: "客户端不存在" })
  }
})
```

把**参数已接受**反馈给用户,代表开始执行打印

### 客户端在线

用户发送打印请求

![image-20240702103258287](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702103258287.png?imageSlim)

客户端接收到数据

![image-20240702103331639](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702103331639.png?imageSlim)

![image-20240702103347387](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702103347387.png?imageSlim)

### 客户端掉线

#### 断线触发的事件

服务端触发的断开连接的事件:

```javascript
socket.on('disconnect', () => {
    console.log('一台客户端端断开了服务端,socket的id是:', socket.id)
    for (let clientId in clients) {
      if (clients[clientId].socket.id === socket.id) {
        // 把客户端的连接状态置为false
        clients[clientId].connected = false
        console.log(`断开服务端连接的客户端的id是 ${clientId}`)
        break
      }
    }
  })
```

客户端断开连接的事件:

```javascript
// 关闭连接触发的函数（触发这个函数的时候，说明服务已经断开了）
socket.on('disconnect', (reason) => {
	console.log('关闭连接', reason)
})
```

reason可能的值

- **transport close**：传输层关闭。这是一个通用的断开原因，表示连接因传输层问题（例如WebSocket或HTTP长轮询）而关闭。

- **transport error**：传输层错误。表示在传输过程中发生错误，导致连接关闭。

- **ping timeout**：心跳超时。表示在指定的时间内没有收到服务器的心跳包响应，因此客户端断开连接。

- **io server disconnect**：服务器主动断开连接。服务器端通过 `socket.disconnect()` 方法主动断开客户端连接。

- **io client disconnect**：客户端主动断开连接。客户端通过 `socket.disconnect()` 方法主动断开连接。

- **namespace disconnect**：命名空间断开。表示客户端离开特定的命名空间（namespace）。

#### 心跳机制

客户端心跳机制的配置项:

```javascript
const socket = io('http://localhost', {
  pingInterval: 15000, // 每15秒发送一次心跳包
  pingTimeout: 10000 // 如果10秒内未收到心跳包的响应，则断开连接
});
```

![image-20240702111650633](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702111650633.png?imageSlim)

服务端心跳机制的配置项:

```javascript
const io = require('socket.io')(httpServer, {
  pingInterval: 10000, // 每10秒发送一次心跳包
  pingTimeout: 5000 // 如果5秒内未收到心跳包的响应，则断开连接
});
```

![image-20240702111602576](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702111602576.png?imageSlim)

客户端会和服务端建立心跳,客户端和服务端会互相发送数据来确定是否是双向连接的

绿色箭头代表客户端发送的,红色箭头代表是服务端发送的

![image-20240702103521436](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702103521436.png?imageSlim)

控制台关闭网络,一段时间后收不到服务端的心跳,代表心跳断开

![image-20240702145602562](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702145602562.png?imageSlim)

此时服务端把客户端的连接状态置为false

```javascript
// 客户端断开连接
  socket.on('disconnect', () => {
    console.log('一台客户端端断开了服务端,socket的id是:', socket.id)
    for (let clientId in clients) {
      if (clients[clientId].socket.id === socket.id) {
        clients[clientId].connected = false
        console.log(`断开服务端连接的客户端的id是 ${clientId}`)
        break
      }
    }
  })
```

心跳未触发

![image-20240702115748320](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702115748320.png?imageSlim)

#### 重连

**触发条件:客户端和服务端心跳断开后** 

客户端的重连的配置项

```javascript
const socket = io('http://localhost:3000', {
    reconnection: true, // 开启断线重连
    reconnectionAttempts: 5, // 重试次数
    reconnectionDelay: 1000, // 重连间隔时间（毫秒）
    reconnectionDelayMax: 5000 // 最大重连间隔时间（毫秒）
 })
```

![image-20240701174539016](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240701174539016.png?imageSlim)

##### 模拟断线

重连相关的事件"reconnect","reconnect_failed"等

客户端的重连:

```javascript
// 重新连接成功事件
socket.on("reconnect", (attemptNumber) => {
	console.log(`重连成功,次数为: ${attemptNumber}`)
})

// 重新连接失败事件
socket.on("reconnect_failed", () => {
	console.log("重连失败")
})
```

**备注:**浏览器控制台模拟的离线无法触发客户端的重连事件

自己用浏览器控制台测试了很久,还是触发不了重连相关的事件

AI的回答

![image-20240702104351947](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702104351947.png?imageSlim)

断开客户端

![image-20240702104617581](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702104617581.png?imageSlim)

服务端控制台输出掉线

![image-20240702104712922](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702104712922.png?imageSlim)

此时一直在重连,浏览器控制台一直在输出get请求

每一个get请求代表一次重连

![image-20240702104750168](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702104750168.png?imageSlim)

我这边配置的重连次数是5次

![image-20240702104835235](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702104835235.png?imageSlim)

重连期间获取所有客户端状态

connectd为false

![image-20240702105050040](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702105050040.png?imageSlim)

执行打印

![image-20240702105115342](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702105115342.png?imageSlim)

##### 客户端和服务端断开后重连成功

即重连次数小于自己配置的重连次数

通过控制台断开客户端网络,等待客户端重连两次,再打开浏览器控制台的网络连接,客户端重连成功

![image-20240702105434072](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702105434072.png?imageSlim)

客户端重连后触发connect事件,此时再重新连接服务端

客户端:

```javascript
// 连接成功触发的事件
socket.on('connect', () => {
    console.log('连接成功')
    // 客户端加入到服务端
    socket.emit('register', clientId)
})
```

服务端:

服务端重新把客户端标记为连接状态

```javascript
// 监听客户端在register事件发送标识
socket.on('register', (clientId) => {
    clients[clientId] = {
        socket: socket,
        connected: true,
    }
	console.log(`连接上服务端的客户端的id是: ${clientId}`)
})
```

服务端控制台的输出

![image-20240702105633498](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702105633498.png?imageSlim)

重新获取一下所有客户端状态

![image-20240702105711468](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702105711468.png?imageSlim)

数据和控制台输出的一样

##### 客户端和服务端断开后重连失败

即重连次数大于自己的配置重连次数

![image-20240702110109722](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702110109722.png?imageSlim)

服务端的控制台也没有触发连接成功

![image-20240702110155488](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702110155488.png?imageSlim)

获取所有客户端状态

![image-20240702112110454](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240702112110454.png?imageSlim)

此时客户端完全与服务端断开连接,只有刷新页面重启客户端才能重新连接上

