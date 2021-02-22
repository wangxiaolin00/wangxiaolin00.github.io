const net = require('net')
const querystring = require('querystring')
const server = net.createServer()
const arr = []
server.on('connection', conn => {
  conn.on('data', data => {

    var header = data.toString()
    console.log('-----------------------------------------------');
    console.log(header);
    console.log('-----------------------------------------------');
    var lines = header.split('\r\n')
    var firstline = lines.shift()
    var [method, path] = firstline.split(' ')

    if (method == 'GET' && path == '/') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('\r\n')
      conn.write(`
       <form action="/" method="POST">
       user:<input type="text" name="name" /><br />
       Message:<input type="text" name="msg" /><br />
       <button>Sumbmit</button>-----
       </form>
      `)
      conn.end()
    }
    if (method == 'POST' && path == '/') {
      var lastline = lines.pop()
      var superobj = querystring.parse(lastline)
      superobj.time = new Date().toString()
      arr.unshift(superobj)
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('\r\n')
      conn.write(`
       <form action="/" method="POST">
       user:<input type="text" name="name" /><br />
       Message:<input type="text" name="msg" /><br />
       <button>Sumbmit</button>
       </form>
      `)
      for (let key of arr) {
        conn.write(`
        <fieldset>
          <legend>${key.name}</legend>
          <small>${key.msg}</small>
          <p>${key.time}</p>
        </fieldset>
        `)
      }
      conn.end()

    }

  })
})
server.listen(8083, '127.0.0.1', dd => {
  console.log('成功');
})
// var http = require('http');
// http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello World');
// }).listen(8081);

// console.log('Server running at http://127.0.0.1:8083/');
