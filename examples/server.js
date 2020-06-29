const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

require('./server2')

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

app.use(express.static(__dirname, {
  setHeaders: function (res) {
    res.set('XSRF-TOKEN-D', 'abcd123');
  }
}))

app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()
app.use(router)

router.get('/simple/get', function(req, res) {
  res.json('hello world')
})

registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()
registerCancelRouter()
registerMoreRouter()

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

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      method: req.method,
      msg: `hello world`
    })
  })
  router.head('/extend/head', function(req, res) {
    res.json({
      method: req.method,
      msg: `hello world`
    })
  })
  router.options('/extend/options', function(req, res) {
    res.json({
      method: req.method,
      msg: `hello world`
    })
  })
  router.delete('/extend/delete', function(req, res) {
    res.json({
      method: req.method,
      msg: `hello world`
    })
  })
  router.post('/extend/post', function(req, res) {
    res.json({
      method: req.method,
      body: req.body
    })
  })
  router.put('/extend/put', function(req, res) {
    res.json({
      method: req.method,
      body: req.body
    })
  })
  router.patch('/extend/patch', function(req, res) {
    res.json({
      method: req.method,
      body: req.body
    })
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 100,
      result: {
        name: 'jack',
        age: 15
      },
      message: 'success'
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.json('interceptor')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json('hello cancel')
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    res.json(req.body)
  })
}


function registerMoreRouter() {
  router.get('/more/get', function (req, res) {
    res.json(req.cookies)
  })
}
