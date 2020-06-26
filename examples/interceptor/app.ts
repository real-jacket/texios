import texios from '../../src'

texios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

texios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
texios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

texios.interceptors.response.use(res => {
  res.data += '1'
  return res
})

let interceptor = texios.interceptors.response.use(res => {
  res.data += '2'
  return res
})

texios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

texios.interceptors.response.eject(interceptor)

texios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(err => console.log(err))
