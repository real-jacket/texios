import { TexiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'

function texios(config: TexiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

// 处理 config
function processConfig(config: TexiosRequestConfig): void {
  config.url = transformURL(config)
}

// 转化 url
function transformURL(config: TexiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

export default texios
