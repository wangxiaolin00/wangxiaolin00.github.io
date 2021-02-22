const express = require('express')
const app = express()
const port = 9000

app.get('/home', (req, res) => {
  //响应一个页面
  res.sendFile(__dirname + '/same.html')
})
app.get('/data', (req, res) => {
  // const a = {
  //   name: '提莫',
  //   age: 6
  // }
  res.send('用户数据')//send参数只能接受字符串或者 二进制数据 buffer数据
})
app.listen(port, () => console.log(`Example app listening on ${port}端口!`))