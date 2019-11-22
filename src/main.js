import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.config.productionTip = false
App.mpType = 'app'

// const service = axios.create({
//   baseURL: 'http://192.168.168.137:7002', // api 的 base_url
//   withCredentials: true, // 允许携带cookie
//   timeout: 5000 // 请求超时时间
// })
axios.defaults.headers.post['content-type'] = 'application/json'

axios.defaults.baseURL = 'http://sky.chinasky.net:7002'
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000
axios.defaults.transformRequest = [function (data) {
  // 对 data 进行任意转换处理
  return data
}]
axios.interceptors.request.use(
  function (config) {
    if (config.url.indexOf('memberAddress') !== -1) {
      config.headers.authorization = wx.getStorageSync('token')
      return config
    }
    if (config.url.indexOf('member') !== -1) {
      config.headers.authorization = wx.getStorageSync('token')
      return config
    }
    if (config.url.indexOf('order') !== -1) {
      config.headers.authorization = wx.getStorageSync('token')
      return config
    }
    if (config.url.indexOf('returnApply') !== -1) {
      config.headers.authorization = wx.getStorageSync('token')
      return config
    }
    if (config.url.indexOf('upload') !== -1) {
      config.headers.authorization = wx.getStorageSync('token')
      return config
    }
    if (config.url.indexOf('update') !== -1) {
      config.headers.authorization = wx.getStorageSync('token')
      return config
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.defaults.adapter = function (config) {
  mpvue.showLoading({
    title: '正在拼命加载中...',
    mask: true
  })
  return new Promise((resolve, reject) => {
    // mpvue === wx
    let data = config.method === 'get' ? config.params : JSON.stringify(config.data)
    mpvue.request({
      url: config.url,
      data: data,
      method: config.method,
      header: config.headers,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        mpvue.hideLoading()
      }
    })
  })
}
Vue.prototype.$axios = axios
const app = new Vue(App)
app.$mount()
