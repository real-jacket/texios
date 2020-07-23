import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge,
  flattenHeaders
} from '../../src/helpers/util'

describe('helpers: util', () => {
  describe('isXXX', () => {
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('should validate PlainObject', () => {
      expect(isPlainObject(new Date())).toBeFalsy()
      expect(isPlainObject(null)).toBeFalsy()
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject({ a: 11, b: { a: 11 } })).toBeTruthy()
    })

    test('should validate FormData', () => {
      expect(isFormData(new FormData())).toBeTruthy()
      expect(isFormData({})).toBeFalsy()
    })

    test('should validate URLSearchParams', () => {
      expect(isURLSearchParams(new URLSearchParams())).toBeTruthy()
      expect(isURLSearchParams({})).toBeFalsy()
      expect(isURLSearchParams('foo=1&bar=2')).toBeFalsy()
    })
  })

  describe('extend', () => {
    test('should be mutable', () => {
      const a = Object.create(null)
      const b = { foo: 123 }

      extend(a, b)

      expect(a.foo).toBe(123)
    })

    test('should extend properties', () => {
      const a = { foo: 123, bar: 456 }
      const b = { bar: 789, demo: 888 }
      const c = extend(a, b)

      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
      expect(c.demo).toBe(888)
    })
  })

  describe('deepMerge', () => {
    test('should be immutable', () => {
      const a = Object.create(null)
      const b: any = { foo: 123 }
      const c: any = { bar: 456 }

      deepMerge(a, b, c)

      expect(a.foo).toBe(undefined)
      expect(a.bar).toBe(undefined)
      expect(b.foo).toBe(123)
      expect(a.bar).toBe(undefined)
      expect(c.foo).toBe(undefined)
      expect(c.bar).toBe(456)
    })

    test('should deepMerge properties', () => {
      const a = { foo: 123 }
      const b = { bar: 456 }
      const c = { foo: 789 }
      const d = deepMerge(a, b, c)

      expect(d.foo).toBe(789)
      expect(d.bar).toBe(456)
    })

    test('should deepMerge recursively', () => {
      const a = { foo: { bar: 123, foo: 123 } }
      const b = { foo: { baz: 456, bar: '1234' }, bar: { qux: 789 } }
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: '1234',
          baz: 456,
          foo: 123
        },
        bar: {
          qux: 789
        }
      })
    })

    test('should remove all references from nested objects', () => {
      const a = { foo: { bar: 123 } }
      const b = {}
      const c = deepMerge(a, b)

      expect(c).toEqual({
        foo: {
          bar: 123
        }
      })

      expect(c.foo).not.toBe(a.foo)
    })

    test('should handle null and undefined arguments', () => {
      expect(deepMerge(undefined, undefined)).toEqual({})
      expect(deepMerge(undefined, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, undefined)).toEqual({ foo: 123 })

      expect(deepMerge(null, null)).toEqual({})
      expect(deepMerge(null, { foo: 123 })).toEqual({ foo: 123 })
      expect(deepMerge({ foo: 123 }, null)).toEqual({ foo: 123 })
    })
  })

  describe('flattenHeaders', () => {
    test('handle null and undefined arguments', () => {
      expect(flattenHeaders(null, 'get')).toBe(null)
      expect(flattenHeaders(undefined, 'post')).toBe(undefined)
    })

    test('should merge methods', () => {
      const headers = {
        common: {
          'X-TOKEN': 'abcd'
        },
        get: {
          way: 'isGet'
        },
        post: {
          pway: 'isPost'
        },
        token: 1234567
      }

      const _headers = flattenHeaders(headers, 'get')

      expect(_headers).toEqual({
        'X-TOKEN': 'abcd',
        way: 'isGet',
        token: 1234567
      })
    })
  })
})
