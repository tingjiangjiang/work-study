1.zgtop 代码逻辑，运行，部署，打包形成文档。行情代码逻辑，运行，部署，打包，新加对接行情步骤，修改行情权重步骤形成文档。
[toc]

# MarketQuery

## 项目描述

对接其他平台的行情数据，提供给我们的机器人进行计算

## 开发环境

```vim
  nodejs   13.6.0
  pm2      4.2.3
  redis    2.8.0
```

## 如何运行

`npm install` 安装所需依赖

### 本地测试

执行对应的 js 文件，然后看控制台打印的输出即可 `node ./huobi/ws.js`

## 代码逻辑

`ecosystem.config.js` 这个文件同时也是整个项目的入口，在服务端执行这个文件就可以跑起所有服务，`pm2 start /home/server/node_server/ecosystem.config.js`。

#### 对接新行情

在 `ecosystem.config.js` 中导出的记录中添加一条记录：

```js
module.exports = {
  apps: [
    {
      name: "binance", // 要启动的进程名，也是新平台名
      script: "/home/server/node_server/src/binance/ws.js", // 要启动的脚本文件
      max_memory_restart: "100M", // 分配最大内存
      autorestart: true, // 自动重启
      max_restarts: 5 // 最大自动重启次数
    }
  ]
};
```

然后利用 pm2，执行 `pm2 restart all` 就可以将新添加的行情跑起来了。

#### 计算各个平台的权重

在 `/server/outputSocketServer/cmputedFinalMarket.js` 中修改参数

```js
let exchangePercent = {
  // 各大平台的权重
  binance: 0.5,
  huobi: 0.5,
  okex: 0
};
```

同时这个文件被 `pm2` 管理

代码中开启了一个定时器不断的对拿到后的数据进行按照权重进行值的修改，计算最终的价格并设置回 **redis** 中

```js
setInterval(() => {
  Object.keys(sysmbolAllowRange).forEach(symbol => {
    clientRead.hgetall(symbol, (err, playload) => {
      executeValue(symbol, playload);
    });
  });
}, 2000);
```

#### 得到某个平台行情细则

根据需要需要得到的平台官网 API 文档可知详细 API 使用规则
如有 `WebSocket` 连接的 api 则用 socket 实现服务端推送消息
否则 则使用 定时器进行轮询请求数据，写入 redis 中

- 如 src/zgt/index.js 为例：

  1. 首先定义了一些变量

  ```js
  const Client = require("node-rest-client").Client; // 发请求用的库
  const { setData } = require("../data.js"); // 导入写入redis中的方法
  const API_QUERY_URL = "https://zg.top/API/api/v1/ticker?symbol="; // 接口api
  let apiIndex = 0; // 超时次数
  let count = 0; // 请求错误次数
  let client = new Client(); // 实例化
  let newCny = 7.05; // 一个usdt的人名币价格
  //zgt 133
  let coins = [133]; // 币种数组，目前只有 zgt id为 133
  ```

  2. 开启定时器进行轮询请求

  ```js
  setInterval(function() {
    // 遍历数组中的所有币种
    coins.forEach(coin => {
      /** 发起请求，得到请求对象 */
      let request = client.get(API_QUERY_URL + `${coin}`, (data, res) => {
        if (data) {
          console.log(data.data.last);
          // 根据对应的币名，写入到redis中
          if (coin === 133) {
            setData("zg", "ZGTCNC", data.data.last * newCny);
          }
        }
      });
      // 监听请求请求超时
      request.on("requestTimeout", function(req) {
        console.log("request has expired");
        apiIndex++;
        if (apiIndex === 3) apiIndex = 0;
        req.abort();
      });
      // 监听相应超时
      request.on("responseTimeout", function(res) {
        console.log("response has expired");
        apiIndex++;
        if (apiIndex === 3) apiIndex = 0;
      });
      // 监听请求错误
      request.on("error", err => {
        if (count === 20) throw new Error("要重启了");
        else {
          count++;
          console.log("request err");
        }
      });
    });
  }, 4000);
  ```

  > 代码中发现，当币名为 BTC/USDT 或 ETHUSDT 或 EOSUSDT 时，需要使用 `setHashData()` 而不是 `setData()`

## 部署

利用 **xftp** 上传文件，利用 **xshell** 在服务器进行重启进程

```bash
pm2 restart all
```
