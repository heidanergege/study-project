const express = require('express')
const compression = require('compression')
const http = require('https')
const fs = require('fs')
const app = express()

// const options = {
//   cert: fs.readFileSync('./full_chain.pem'),
//   key: fs.readFileSync('./private.key')
// }

// 一定要先写这一行代码，写到静态托管之前
app.use(compression())
app.use(express.static('./dist'))

app.listen(80, () => {
  console.log('Express server running at http://127.0.0.1');
})

// https.createSrever(options, app).listen(443)