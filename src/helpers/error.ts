import { TexiosRequestConfig, TexiosResponse } from '../types'

export class TexiosError extends Error {
  isTexiosError: boolean
  config: TexiosRequestConfig
  code?: string | null
  request?: any
  response?: TexiosResponse

  constructor(
    message: string,
    config: TexiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: TexiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isTexiosError = true

    Object.setPrototypeOf(this, TexiosError.prototype)
  }
}

export function createError(
  message: string,
  config: TexiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: TexiosResponse
) {
  const error = new TexiosError(message, config, code, request, response)
  return error
}
