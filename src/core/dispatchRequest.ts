import { TexiosRequestConfig, TexiosPromise, TexiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
// import { transformRequest, transformResponse } from '../helpers/data'
// import { processHeaders } from '../helpers/header'
import { flattenHeaders } from '../helpers/util'
import transform from './transform'

function dispatchRequest(config: TexiosRequestConfig): TexiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理 config
function processConfig(config: TexiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 转化 url
function transformURL(config: TexiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

// // 处理 body data
// function transformData(config: TexiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// // 处理 headers
// function transformHeaders(config: TexiosRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: TexiosResponse): TexiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

export default dispatchRequest
