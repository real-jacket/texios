import { TexiosRequestConfig, TexiosStatic } from './types'
import Texios from './core/Texios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

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

texios.CancelToken = CancelToken
texios.Cancel = Cancel
texios.isCancel = isCancel

export default texios
