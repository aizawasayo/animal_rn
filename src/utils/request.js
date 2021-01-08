import axios from 'axios'
import { getToken } from '@utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: "http://192.168.31.168:1016", // url = base url + request url
  // baseURL: "http://192.168.0.105:1016", // 武康
  baseURL: "http://106.54.168.208:1016", // 买的服务器
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // 请根据实际情况进行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.warn(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
      const res = response.data
      // if the custom code is not 200, it is judged as an error.
      if (res.code !== 200) {
        console.warn(res.message)
        
        // 508: Illegal token 非法token; 512: Other clients logged in 其他客户端登陆了; 514: Token expired Token 过期了;
        if (res.code === 508 || res.code === 512 || res.code === 514) {
          // to re-login
          // if (await this.$root.$confirm('提示', '你已经登出了账户, 你可以关闭这个页面，或者重新登录', {
          //     color: 'warning',
          //     agreeText: '重新登录'
          //   })) {
          //   await this.$store.dispatch('user/resetToken').then(() => {
          //     this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          //   })
          // }
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error => {
      console.warn('err' + error) // for debug
      return Promise.reject(error)
    }
)

export default service