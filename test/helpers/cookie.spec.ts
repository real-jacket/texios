import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
  test('should read cookie', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
    expect(cookie.read('foo')).not.toBe('foo')
  })

  test('should return null if cookie is not exist', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
