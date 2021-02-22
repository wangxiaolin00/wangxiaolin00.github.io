const net = require('net')
const server = net.createServer()//创建TCP服务
server.on('connection', conn => {
  console.log(conn.remoteAddress, 'connected');
  conn.on('data', data => {//连接上发来的数据时回调
    var headers = data.toString()
    var lines = headers.split('\r\n')
    var firstLine = lines.shift()
    var [method, path] = firstLine.split(' ')
    console.log(method, path);
    if (path == '/') {
      conn.write('HTTP/1.1 200 OK\r\n')//向浏览器写回数据
      conn.write('Content-Type:text/html;charset=UTF-8\r\n')
      conn.write('\r\n')
      conn.write(`
      <link rel="stylesheet" href="a.css" />
      <h1>hello</h1>
      `)
      conn.end()


    }
    if (path == '/a.css') {
      conn.write('HTTP/1.1 200 OK\r\n')//向浏览器写回数据
      conn.write('Content-Type:text/html;charset=UTF-8\r\n')
      conn.write('\r\n')
      conn.write(`
      h1{
        color:red;
      }
      `)
      conn.end()
    }

  })

})
// var http = require('http');
// http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello World');
// }).listen(8081);

// console.log('Server running at http://127.0.0.1:8081/');