import { TexiosRequestConfig } from './types'
import xhr from './xhr'

function texios(config: TexiosRequestConfig) {
  xhr(config)
}

export default texios
