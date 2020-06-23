const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
app.use(router)

router.get('/simple/get', function(req, res) {
  res.json('hello world')
})

registerBaseRouter()

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}, Ctrl+C to stop`)
})

// base 目录的请求
function registerBaseRouter() {
  // get 请求
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  // post 请求
  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  // post buffer
  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}
