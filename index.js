var http = require('http')

var server = http.createServer()
var port = '8080'
var address = 'http://localhost:' + port

server.on('request', function(req, res) {
  var method = req.method
  var endpoint = req.url
  var headers = req.headers
  var body = []

  req.on('data', function(chunk) {
    body.push(chunk)
    console.log(chunk)
  })

  req.on('error', function(err) {
    console.log(err.stack)
  })

  req.on('end', function() {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    
    res.on('error' , function(err) {
      res.statusCode = 500
      res.end('Error: ', err)
    })

    var responseBody = {
      headers: headers,
      method: method,
      url: endpoint,
      body: body
    }

    res.write(JSON.stringify(responseBody))
    res.end()

  })


})

server.listen(port)
console.log('Server listening on ' + address)