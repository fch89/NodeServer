# NodeServer

### Express 集成 Mock 实现Api服务器
#### 项目结构
<img src="./img/1.png" height="234"/>  <br />

文件  <br />
* mock
* --userData.js
* pubilc
* --holle.txt
* routers
* --index.js
* --user.js
* index.js
* package.json

#### 本地需安装node环境
查看node环境是否已经安装
```
$ node -v 
```
<img src="./img/2.png" width="360" />  <br />

#### mockjs wiki
* mockjs 的wiki https://github.com/nuysoft/Mock/wiki

### index.js
```
'use strict'
// 引入modules
const express = require("express")
const apicache = require("apicache")
const path = require("path")
const cache = apicache.middleware
// 引入路由
const routes = require('./routers')
//实例化
const app = express()

// 跨域设置
app.all("*", function (req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true)
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("Content-Type", "application/json;charset=utf-8")
  }
  next()
})

//
const onlyStatus200 = (req, res) => res.statusCode === 200
//API缓存中间件
app.use(cache("2 minutes", onlyStatus200))
//静态目录
app.use('/static', express.static(path.resolve(__dirname, "public")))

//注册路由配置
app.use(routes)

//启动监听端口 
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log('┌───────────────────────────────────────────────┐');
  console.log('│                                               │');
  console.log('│   Serving!                                    │');
  console.log('│                                               │');
  console.log('│   - Local:            http://localhost:' + app.get('port') + '   │');
  console.log('│   - On Your Network:  http://127.0.0.1:' + app.get('port') + '   │');
  console.log('│                                               │');
  console.log('│   Express server listening on:                │');
  console.log('│                                               │');
  console.log('│   - port:               ' + server.address().port + '                  │');
  console.log('│                                               │');
  console.log('└───────────────────────────────────────────────┘');
})
```
### routers/index.js
路由配置
```
// 引入modules
const express = require('express')
//
const router = express.Router()
//引入user router
const user =require('./user.js')(router)

router.get('/', (req, res, next) => {
  res.json({
    status: '0',
    title: 'Demo',
    msg: 'api server',
    result: 'success'
  })
})
//
module.exports =router;
```

### package.json
可以参考配置scripts
```
{
  "name": "node-server",
  "version": "1.0.0",
  "description": "This is a simple Node (Mock API) server",
  "main": "index.js",
  "scripts": {
    "startServer": "node index",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Poorboy007/NodeServer"
  },
  "keywords": [
    "node",
    "mock",
    "node-api",
    "node-server",
    "NodeServer"
  ],
  "author": "LiuFch <332197723@qq.com>",
  "license": "ISC",
  "dependencies": {
    "apicache": "^1.5.3",
    "express": "^4.17.1",
    "mockjs": "^1.1.0"
  }
}

```

如果不想增加更多配置, 可以命令行 node index 不用配置package.json
###  使用示例
#### 安装
```
$ npm install
```
#### 启动
```
$ npm run startServer //启动server
```
<img src="./img/3.png" width="396" />  <br />
浏览器直接访问 http://localhost:3000 可以直接看到response返回数据  <br /><br />
<img src="./img/4.png" width="396" />  <br />

### 静态访问

* http://localhost:3000/static/holle.txt

<img src="./img/5.png" width="396" />  <br />

### User 测试数据访问

* http://localhost:3000/api/user

<img src="./img/6.png" width="396" />  <br />