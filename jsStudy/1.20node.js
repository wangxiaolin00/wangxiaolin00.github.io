let server = net.createServer({ allowHalfOpen: true })//创建tcp服务器端口

server.on('connection', conn => {// 有客户端连接成功时触发这个事件,传入的是表示这个连接的对象
  console.log(conn.remoteAddress, 'connected')// remoteAddress指远程ip地址，remotePort指远程端口
  var i = 0

  setInterval(() => {
    conn.write('' + (i++))// 往远程发送数据
  }, 1000)

  conn.on('data', data => {// 收到远程发来的数据时触发，传入表示数据的内存片段
    console.log(conn.remoteAddress, 'says', data.toString().slice(0, 10))
  })

  conn.on('error', () => { })
})

server.listen(10110, '0.0.0.0')//让服务器在10110端口监听


// 以上为服务器代码
// 以下为客户端代码


let conn = net.connect(10110, '10.3.3.3')

conn.on('data', data => {//收到数据时触发
  console.log(data.toString())
})

conn.write('woiejfoweijf')//向对方发送数据
conn.end()
console.log('hello')
