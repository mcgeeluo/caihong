import axios from 'axios'
import qs from 'qs'
const Axios = axios.create({
  baseURL: "/",
  timeout: 10000,
  responseType: "json",
  withCredentials: true
});
Axios.interceptors.request.use(
  config => {
    if(config.method === "post") {
      config['data'] = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    //。。
    // 添加全局错误处理 ....

    return Promise.reject(error.data.error.data);
  }
);
Axios.interceptors.response.use(
  res => {
    if(!res.data) return false;
    //对响应数据做些事
    if (res.data.code!="0") {
      // 错误处理逻辑
      // 。。。。
      return Promise.reject(res.data);
    }

    return res.data.data;
  },
  error => {
    if (!window.localStorage.getItem("loginStatus")) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页

    }
    // else {
    //   if (error.response.status === 403) {
    //     router.push({
    //       path: "/error/403"
    //     });
    //   }
    // }
    // 返回 response 里的错误信息
    console.log('请求进入error')
    return Promise.reject(error.data);
  }
);
export default Axios;
