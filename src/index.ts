import { TexiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'

function texios(config: TexiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

// 处理 config
function processConfig(config: TexiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformData(config)
  config.headers = transformHeaders(config)
}

// 转化 url
function transformURL(config: TexiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

// 处理 body data
function transformData(config: TexiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理 headers
function transformHeaders(config: TexiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default texios
