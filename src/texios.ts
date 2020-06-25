import { TexiosInstance } from './types'
import Texios from './core/Texios'
import { extend } from './helpers/util'

function createInstance(): TexiosInstance {
  const context = new Texios()
  const instance = Texios.prototype.request.bind(context)

  extend(instance, context)
  return instance as TexiosInstance
}

const texios = createInstance()

export default texios
