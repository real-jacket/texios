import texios from '../../src'
import qs from 'qs'

texios.defaults.headers.common['test2'] = 123

texios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
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
