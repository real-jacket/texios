import { TexiosInstance, TexiosRequestConfig } from './types'
import Texios from './core/Texios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: TexiosRequestConfig): TexiosInstance {
  const context = new Texios(config)
  const instance = Texios.prototype.request.bind(context)

  extend(instance, context)
  return instance as TexiosInstance
}

const texios = createInstance(defaults)

export default texios
