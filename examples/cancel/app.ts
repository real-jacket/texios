import texios, { Canceler } from '../../src'

const CancelToken = texios.CancelToken
const source = CancelToken.source()

texios
  .get('/cancel/get', {
    cancelToken: source.token
  })
  .catch(function(e) {
    if (texios.isCancel(e)) {
      console.log('Request canceled....', e.message)
    }
  })

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  texios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (texios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

texios
  .get('/cancel/get', {
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
  .catch(function(e) {
    if (texios.isCancel(e)) {
      console.log('Request Canceled')
    }
  })

setTimeout(() => {
  cancel()
}, 100)
