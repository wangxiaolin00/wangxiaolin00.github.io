# HTTP
Http(Hypertext transprot protocol) 协议 超文本传输协议,协议详细规定了浏览器和万维网服务器之间的互相通信的规则.
## 请求报文
  重点是格式与参数
```
行   GET/s?ie=utf-8  HTTP/1.1
头    Host:atguigu.com
      Cookie:name=hhhh
      Content-type:application/x-www-form-urlencoded
      
空行
体    User-agent:chrme 83
``` 

## 响应报文
```
行   HTTP/1.1 200 OK
 
头   Conetent-Type:text/html;charset=utf-8
Conetent-lengeth:gzip
空行
体    <html>
        <head>
```
1:计算机网络体系结构分为3种:OSI体系结构 
2:TCP协议
3:UDP协议  用户数据报协议  
         属于传输层通信协议
         基于UDP的应用层协议有TFFP SNMP DNS
         特点: 1无连接 不可靠 面向报文
4:HTTP协议 超文本传输协议
5:Socket  接口 是应用层与Tcp/ip协议族通信的中间软件抽象层,表现为一个封装一个TCP/IP协议族的编程接口
其他知识 : 在浏览器中输入URL地址->>显示主页的过程
ip地址 (ipv4)
ICMP协议
ping的过程
         分组网间探测
路由器与交换机的区别 
Cookie Session Token 

