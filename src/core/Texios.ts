import { TexiosRequestConfig, TexiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Texios {
  request(config: TexiosRequestConfig): TexiosPromise {
    return dispatchRequest(config)
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: TexiosRequestConfig
  ): TexiosPromise {
    return this.request(Object.assign(config || {}, { method, url }))
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: TexiosRequestConfig
  ): TexiosPromise {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }

  get(url: string, config?: TexiosRequestConfig): TexiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: TexiosRequestConfig): TexiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: TexiosRequestConfig): TexiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: TexiosRequestConfig): TexiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
}
