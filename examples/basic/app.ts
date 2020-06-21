import texios from '../../src/index'

texios({
  method: 'get',
  url: 'simple/get',
  params: {
    a: 1,
    b: 2
  }
})
