var http = require('http')

http.createServer(function(req, res){
  res.end("Hello World! Wecome to my website")
}).listen(8080)

console.log('Run server')
