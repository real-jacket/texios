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
  url: string
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
