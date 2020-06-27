import InterceptorManager from '../core/interceptorManager'

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
  transformRequest?: TexiosTransformer | TexiosTransformer[]
  transformResponse?: TexiosTransformer | TexiosTransformer[]

  [propName: string]: any
}

export interface TexiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: TexiosRequestConfig
  request: any
}

export interface TexiosPromise<T = any> extends Promise<TexiosResponse<T>> {}

export interface TexiosError extends Error {
  isTexiosError: boolean
  config: TexiosRequestConfig
  code?: string | null
  request?: any
  response?: TexiosResponse
}

export interface Texios {
  defaults: TexiosRequestConfig
  interceptors: {
    request: InterceptorManager<TexiosRequestConfig>
    response: InterceptorManager<TexiosResponse>
  }

  request<T = any>(config: TexiosRequestConfig): TexiosPromise<T>

  get<T = any>(url: string, config?: TexiosRequestConfig): TexiosPromise<T>

  delete<T = any>(url: string, config?: TexiosRequestConfig): TexiosPromise<T>

  head<T = any>(url: string, config?: TexiosRequestConfig): TexiosPromise<T>

  options<T = any>(url: string, config?: TexiosRequestConfig): TexiosPromise<T>

  post<T = any>(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise<T>

  put<T = any>(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: TexiosRequestConfig): TexiosPromise<T>
}

export interface TexiosInstance extends Texios {
  <T = any>(config: TexiosRequestConfig): TexiosPromise<T>

  <T = any>(url: string, config?: TexiosRequestConfig): TexiosPromise<T>
}

export interface TexiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, reject: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface TexiosTransformer {
  (data: any, headers?: any): any
}
