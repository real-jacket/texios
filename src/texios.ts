import { TexiosInstance, TexiosRequestConfig, TexiosStatic } from './types'
import Texios from './core/Texios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: TexiosRequestConfig): TexiosStatic {
  const context = new Texios(config)
  const instance = Texios.prototype.request.bind(context)

  extend(instance, context)
  return instance as TexiosStatic
}

const texios = createInstance(defaults)

texios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default texios
