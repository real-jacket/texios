import texios from '../../src'

texios.get('/more/get')

texios.post(
  'http://localhost:8088/more/server2',
  {},
  {
    withCredentials: true
  }
)

const server = texios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'XSRD-TOKEN-D'
})

server.get('/more/get')
