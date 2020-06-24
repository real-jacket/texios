import texios, { TexiosError } from '../../src/index'

texios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

texios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch((e: TexiosError) => {
    console.log(e.message)
  })

setTimeout(() => {
  texios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch((e: TexiosError) => {
      console.log(e.message)
    })
}, 5000)

texios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: TexiosError) => {
    console.log('message:', e.message)
    console.log('code:', e.code)
    console.log('config:', e.config)
    console.log('response:', e.response)
    console.log('isTexiosError:', e.isTexiosError)
  })
