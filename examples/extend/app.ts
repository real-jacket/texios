import texios from '../../src'

texios({
  method: 'get',
  url: '/extend/get'
})

texios.request({
  method: 'get',
  url: '/extend/get'
})

texios.get('/extend/get', {
  params: {
    a: 1,
    b: 2
  }
})

texios.head('/extend/head')

texios.delete('/extend/delete')

texios.options('/extend/options')

texios.post('/extend/post', { msg: 'hello post' })

texios.put('/extend/put', { msg: 'hello put' })

texios.patch('/extend/patch', { msg: 'hello patch' })
