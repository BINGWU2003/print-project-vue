# print-project-vue

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

## 打印状态反馈

![image-20240627171226304](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627171226304.png?imageSlim)

### 多台打印服务模拟

![image-20240627181550772](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181550772.png?imageSlim)

启动三台打印服务

![image-20240627181711526](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181711526.png?imageSlim)

每台打印机的clientId

![image-20240627181921521](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181921521.png?imageSlim)

获取一下打印服务的状态

![image-20240627181948913](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627181948913.png?imageSlim)

模拟断开一台打印服务

![image-20240627182105455](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182105455.png?imageSlim)

一台打印机已断开

![image-20240627182129413](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182129413.png?imageSlim)

重新获取打印机服务的状态

![image-20240627182208873](https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/typora/image-20240627182208873.png?imageSlim)
