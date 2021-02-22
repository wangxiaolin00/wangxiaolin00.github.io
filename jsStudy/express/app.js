//引入 express
const express = require('express')
const app = express()
const port = 8001

app.get('/server', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(1);
  res.send('Hello World!GET')
})
//jquery服务
app.all('/jquery-server', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  console.log(1);
  const a = {
    name: '蛮族之王'
  }
  res.send(JSON.stringify(a))
})
//fetch函数
app.all('/fetch-server', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  console.log(1);
  const a = {
    name: '蛮族之王'
  }
  res.send(JSON.stringify(a))
})
//axios服务
app.all('/axios-server', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  console.log(1);
  const a = {
    name: '蛮族之王'
  }
  res.send(JSON.stringify(a))
})

app.post('/jquery-server', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(1);
  res.send('Hello World!POST,jQuery')
})
//延时响应
app.get('/delay', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(6);
  const val = {
    name: '蛮王',
    age: 20
  }
  setTimeout(() => {
    res.send(JSON.stringify(val))
  }, 3000)
})
//IE缓存
app.get('/ie', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(4);
  res.send('Hello ie5')
})

//app.all('/server)//all表示接收任意类型的请求
app.post('/server', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Headers', '*')前端自定义请求头 服务器端需要加上
  console.log(2);
  res.send('Hello World!POST')
})
//JSON响应
app.all('/json.server', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Headers', '*')前端自定义请求头 服务器端需要加上
  console.log(3);
  const data = {
    name: '张三',
    age: '20'
  }
  //将data转化为字符串
  var str = JSON.stringify(data)//将对象转化为JSON格式的字符串
  res.send(str)//send方法的的参数只能是字符串和buffer
  //Buffer 缓冲区 存储二进制数据的

})
app.post('/re', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Access-Control-Allow-Headers', '*')前端自定义请求头 服务器端需要加上
  console.log(2);
  res.send('Hello World!POST')
})
app.listen(port, () => console.log(`成功监听咋${port}端口!`))