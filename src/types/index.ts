export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface TexiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface TexiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: TexiosRequestConfig
  request: any
}

export interface TexiosPromise extends Promise<TexiosResponse> {}

export interface TexiosError extends Error {
  isTexiosError: boolean
  config: TexiosRequestConfig
  code?: string | null
  request?: any
  response?: TexiosResponse
}

export interface Texios {
  request(config: TexiosRequestConfig): TexiosPromise

  get(url: string, config?: TexiosRequestConfig): TexiosPromise

  delete(url: string, config?: TexiosRequestConfig): TexiosPromise

  head(url: string, config?: TexiosRequestConfig): TexiosPromise

  options(url: string, config?: TexiosRequestConfig): TexiosPromise

  post(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise

  put(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise

  patch(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise
}

export interface TexiosInstance extends Texios {
  (config: TexiosRequestConfig): TexiosPromise
}
