import texios from '../../src'
import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import { TexiosError } from '../../src/helpers/error'

import qs from 'qs'

// texios.get('/more/get')

// texios.post(
//   'http://localhost:8088/more/server2',
//   {},
//   {
//     withCredentials: true
//   }
// )

// const server = texios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'XSRD-TOKEN-D'
// })

// server.get('/more/get')

// const server = texios.create()

// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }

// function loadProgress() {
//   const setupStartProgress = () => {
//     server.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }

//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }

//     server.defaults.onDownloadProgress = update
//     server.defaults.onUploadProgress = update
//   }

//   const setupStopProgress = () => {
//     server.interceptors.response.use(
//       response => {
//         NProgress.done()
//         return response
//       },
//       err => {
//         NProgress.done()
//         return Promise.reject(err)
//       }
//     )
//   }

//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }

// loadProgress()

// const downloadEl = document.getElementById('download')

// downloadEl.addEventListener('click', e => {
//   server.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
// })

// const uploadEl = document.getElementById('upload')

// uploadEl.addEventListener('click', e => {
//   const data = new FormData()

//   const fileEl = document.getElementById('file') as HTMLInputElement

//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])

//     server.post('/more/upload', data)
//   }
// })

// texios
//   .post(
//     '/more/post',
//     {
//       a: 1
//     },
//     {
//       auth: {
//         username: 'yee',
//         password: '123456'
//       }
//     }
//   )
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// texios
//   .get('/more/304', {
//     validateStatus(status: number) {
//       return status >= 200 && status < 400
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch((err: TexiosError) => {
//     console.log(err.message)
//   })

// texios
//   .get('/more/304')
//   .then(res => {
//     console.log(res)
//   })
//   .catch((err: TexiosError) => {
//     console.log('error:', err.message)
//   })

// texios
//   .get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// texios
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// texios
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     },
//     paramsSerializer(params) {
//       return qs.stringify(params, { arrayFormat: 'brackets' })
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.log(err)
//   })

const server = texios.create({
  baseURL: 'https://img.mukewang.com'
})

server.get('5cc01a7b0001a33718720632.jpg')

server.get('5cc01a7b0001a33718720632.jpg', {
  baseURL: 'http://img.abcd.com'
})

server.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')

texios.get('/more/get')
