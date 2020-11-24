# Texios [![codecov](https://codecov.io/gh/real-jacket/texios/branch/master/graph/badge.svg)](https://codecov.io/gh/real-jacket/texios) <a href="https://badge.fury.io/js/texios"> <img src="https://badge.fury.io/js/texios.svg" alt="npm version"></a> <img alt="GitHub" src="https://img.shields.io/github/license/real-jacket/texios?color=brightgreen">

基于 typescript 实现的 axios

## 基本使用

### 安装

```npm
$ npm install texios

// or

$ yarn add texios
```

### Example

建议使用 ES 模块

```javascript
import texios from 'texios'

texios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
```

支持使用 api 的方式

```javascript
texios.request({
  method: 'get',
  url: '/extend/get'
})

texios.get('/more/get')

texios.post('/extend/post', { msg: 'hello post' })
```

## 相关 API

### 支持拦截器

```javascript
// 请求拦截
texios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

texios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
// 响应拦截
texios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

texios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
```

### 支持配置化

```javascript
import texios, { TexiosTransformer } from 'texios'
import qs from 'qs'

// 对请求、响应做一个处理
const request = texios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(texios.defaults.transformRequest as TexiosTransformer[])
  ],
  transformResponse: [
    ...(texios.defaults.transformResponse as TexiosTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  headers: {
    demo: 'test-xxx'
  }
})

request({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })

```
