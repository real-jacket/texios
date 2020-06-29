import texios from '../../src'

texios.get('/more/get')

texios.post(
  'http://localhost:8088/more/server2',
  {},
  {
    withCredentials: true
  }
)
