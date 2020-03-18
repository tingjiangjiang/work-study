1.zgtop 代码逻辑，运行，部署，打包形成文档。行情代码逻辑，运行，部署，打包，新加对接行情步骤，修改行情权重步骤形成文档。

# zgtop-web

[toc]

## 项目目录

├─app
│ └─dist
│ ├─assets
│ ├─css //页面样式文件夹
│ ├─file
│ ├─fonts //字体文件夹
│ ├─images //页面图片资源文件夹
│ └─js 页面 //JS 逻辑
├─conf //各种配置文件
│ └─cert
├─logs //日志目录
├─lua //lua 脚本
│ ├─tpl //页面 html 模板
│ └─web //页面跳转脚本
├─lualib //lua 库文件
│ ├─ngx
│ ├─rds
│ ├─redis

## 如何运行

### 本地运行

```bash
  npm install   #安装依赖
  .\nginx.exe   #执行根目录下文件
```

浏览器打开 `localhost:9998` 即可看到效果

> 本地运行时，必须在根目录建立 log 文件夹接受日志，否则跑不起来。 默认端口可在`conf/nginx.conf`中更改。

### 提交测试

在 vscode 中利用 ftpkr 插件把更新后的代码提交到服务器。

在 ftp-kr.josn 中进行上传的配置

右击需要上传的文件夹或文件，点击 `Upload This` 即可

## 业务逻辑

### 访问拦截

> 某些页面是需要登陆才能访问的，如果没登陆访问回直接跳转到登陆页面。

这可以在 `lua/auth.lua` 文件中进行配置，把需要的拦截的 uri 加入

```lua
-- 对其中的uri进行拦截判断，只有登陆了才能访问
local intercept_uri = {
    '/account',
    '/finance',
}
```

### 语言切换

- 利用了 i18n 插件进行动态切换语言包的国际化处理。
  在 `common.js` 中利用了 jQuery 处理事件

### 首页

- 轮播图
  1. 请求轮播图片接口
  2. 对图片进行分组排序，过滤出 web 端的图片 条件为 每一个图片项中的 key 值存在 `index_web` 字符串。
  3. 渲染轮播图，这里代码中固定死了两页轮播，这样肯定是不好的。
- 主流币行情
  1. 方法：getMaincoin() ，接口： `/api/v2/market/currency`
- 三条公告
  1. 方法：getArticles() ，接口：`/api/v1/articleList?page=1&pageSize=3&type=1`
  ```js
    page: 1,  // 页数
    pageSize: 3, //每页的数量
    type: 1     // 1 为公告
  ```
- 币种行情数据
  1. 这里可以设置自选市场，会把选择的币种存到 cookie 中，交易取的自选和这里是同样的功能。
     这里有一个小 bug，当前如果选中自选标签的话，在数据重新刷新的时候自选区会显示出所有的币
     种。
  2. 方法：loadCoins()，请求接口: `/v2/market/coins`,参数：无

### 登陆

- 需要验证码登陆

  1. 点击登陆后，根据返回的 `code` 的值进行判断是否需要验证码登陆，代码中表示为当返回的 `code` 为 6 || 7 || 8 的时候需要手机验证码或者 Google 验证码登陆。

- 不需要验证码登陆

  1. 登陆成功后直接返回主页

### 得到用户信息

- 在非常多的页面都进行了当前是否登陆的判断，请求的接口为：`/api/v1/session?${Date.now()}`，Date.now() 为当前的时间戳，如已登录则会得到用户信息。

### 账户资产

- 币币资产数据列表，方法 `loadBalances()`，接口：`/v1/account/balances`

- 计算总资产折合，方法 `estimate()` ，其中包括了法币资产

- 币币资产折合，方法 `calcValuaction()`，遍历币币资产

### 安全中心

- 双重身份认证

  - 邮箱验证：根据用户信息判断显示是否绑定了邮箱，可点击绑定邮箱出现模态框，请求接口：`/api/v2/binding/email` 参数：

  ```js
    email: String,      // 邮箱
    telCode: String,    // 手机验证码
    emailCode: String,  // 邮箱验证码
  ```

  - 手机验证

    - 绑定手机：请求接口 `/api/v2/binding/telehphone` 参数：
      ```js
      telephone: String, // 手机号
      emailCode: String, // 邮箱验证码
      telCode:   String  // 手机验证码
      ```
    - 换绑手机号：请求接口 `/api/v2/validation/change-telephone` 参数：
      ```js
      newTelephone: String, // 新手机号
      oldTelCode: String,   // 旧手机验证码
      newTelCode: String,   // 新手机验证码
      emailCode: String     // 邮箱验证码（非必选）
      ```
  
  - 谷歌验证

- 安全密码设置

  - 修改登陆密码：请求接口 `/api/v2/account/modPassWord` 参数

    ```js
    oldPwd: String,     // 旧密码
    pwd: String,        // 新密码
    telCode: String,    // 手机验证码
    emailCode: String,  // 手机验证码（非必选）
    code: String,       // 邮箱验证码（非必选）
    ```

  - 修改交易密码：请求接口 `/api/v2/account/modSafeWord` 参数
    ```js
    pwd: String,     // 交易密码
    telCode: String, // 手机验证码（非必选）
    emailCode: String,// 邮箱验证码（非必选）
    code: String      // 谷歌验证码（非必选）
    ```

* 其他设置

- 提交申请我们的 API：方法 ==submitApi()==请求接口 `/v1/account/apply_api` 参数

```js
name: String,  // 标签
passwrod: String, // 交易密码
type: String,     // 权限类型
```


### 交易中心

- main-aside左边币种列表

  - 点击每一项可以切换当前的交易对，方法 `setPair()`

- K线区

  - 当前的最新价格以及行情K线图和深度图的切换（暂无）


- 买卖操作区

  - 买入

  - 卖出


- 盘口

  - 点击每一项会把相关数据显示到买卖操作区


- 最新价格

  - 当前的最新价格，以及当前的涨跌比


- 最新成交

  - 最新成交的情况

- 委托

  - 我的当前委托

  - 我的历史委托


