import axios from 'axios'
import { Toast } from  'mint-ui'

// 创建axios实例
const service = axios.create({
  baseURL: '/', //process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  console.log(error); // for debug
  return Promise.reject(error)
});

service.interceptors.response.use(
  response =>  response,
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
);

export default service;
