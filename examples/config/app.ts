import texios, { TexiosTransformer } from '../../src'
import qs from 'qs'

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

texios.defaults.headers.common['test2'] = 123

texios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1111
  }),
  headers: {
    test: 123
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })

// texios({
//   transformRequest: [
//     function(data) {
//       return qs.stringify(data)
//     },
//     ...(texios.defaults.transformRequest as TexiosTransformer[])
//   ],
//   transformResponse: [
//     ...(texios.defaults.transformResponse as TexiosTransformer[]),
//     function(data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     }
//   ],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1345
//   }
// })
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(err => {
//     console.log(err)
//   })

request({
  url: '/config/post',
  method: 'post',
  data: {
    a: 12
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })
