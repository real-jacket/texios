import texios from '../../src'

// texios({
//   method: 'get',
//   url: '/extend/get'
// })

// texios.request({
//   method: 'get',
//   url: '/extend/get'
// })

// texios.get('/extend/get', {
//   params: {
//     a: 1,
//     b: 2
//   }
// })

// texios.head('/extend/head')

// texios.delete('/extend/delete')

// texios.options('/extend/options')

// texios.post('/extend/post', { msg: 'hello post' })

// texios.put('/extend/put', { msg: 'hello put' })

// texios.patch('/extend/patch', { msg: 'hello patch' })

// texios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello ---- post'
//   }
// })

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return texios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
