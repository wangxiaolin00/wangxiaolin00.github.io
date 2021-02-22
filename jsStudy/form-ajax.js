const net = require('net')
const querystring = require('querystring')
const server = net.createServer()
const arr = []
server.on('connection', conn => {
  conn.on('data', data => {
    let header = data.toString()
    console.log('------------------------------------------------------------')
    console.log(header);
    console.log('-------------------------------------------------------------');
    let lines = header.split('\r\n')
    let firstline = lines.shift()
    console.log(firstline)
    let [method, path] = firstline.split(' ')
    if (method == 'GET' && path == '/') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type:text/html;charset="UTF-8"\r\n')
      conn.write('\r\n')
      conn.write(`
       <form method="POST" action="/" onsubmit="postMessage()">
       用户名:<input type="text" name="name"><br/>
       信息:<input type="text" name="msg"><br/>
       <button>submit</button>
       </form>
       <script>
       function postMessage() {
         debugger
         event.preventDefault()
         var name=encodeURIComponent(document.querySelector('input[name="name"]').value)
         var msg=encodeURIComponent(document.querySelector('input[name="msg"]').value)
         var xhr=new XMLHttpRequest()
         xhr.open('POST','/')
         xhr.onload=function() {
            var arr=JSON.parse(xhr.responseText)
            conmmbox.innerHTML=""
            for(let key of arr) {
              var fieldset=document.createElement('fieldset')
              fieldset.innerHTML=\`<legend>\${key.name}</legend><small>\${key.msg}</small><p>\${key.time}</p>\`
              conmmbox.append(fieldset)
            }
           
            
         }
         xhr.send('name='+name+'&msg='+msg)
       }
       </script>
      `)
      conn.write('<div id="conmmbox">')
      for (let key of arr) {
        conn.write(`
      <fieldset>
      <legend>${key.name}</legend>
      <small>${key.msg}</small>
      <p>${key.time}</p>
      </fieldset>
     `)
      }
      conn.write('</div>')
      conn.end()
    }
    if (method == "POST" && path == "/") {
      var lastline = lines.pop()
      console.log(lastline);
      var lastobj = querystring.parse(lastline)
      lastobj.time = new Date().toString()
      arr.unshift(lastobj)
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type:text/html;charset="UTF-8"\r\n')
      conn.write('\r\n')
      conn.write(JSON.stringify(arr))
      conn.end()
    }

  })
})
server.listen(8082, '127.0.0.1', dd => {
  console.log('成功监听');
})
// var http = require('http');
// http.createServer(function (request, response) {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Hello World');
// }).listen(8081);

// console.log('Server running at http://127.0.0.1:8082/');
