import {
  TexiosRequestConfig,
  TexiosPromise,
  Method,
  TexiosResponse,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<TexiosRequestConfig>
  response: InterceptorManager<TexiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: TexiosRequestConfig) => TexiosPromise)
  rejected?: RejectedFn
}

export default class Texios {
  defaults: TexiosRequestConfig
  interceptors: Interceptors

  constructor(initialConfig: TexiosRequestConfig) {
    this.defaults = initialConfig
    this.interceptors = {
      request: new InterceptorManager<TexiosRequestConfig>(),
      response: new InterceptorManager<TexiosResponse>()
    }
  }

  request(url: string | TexiosRequestConfig, config?: TexiosRequestConfig): TexiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise as TexiosPromise
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
