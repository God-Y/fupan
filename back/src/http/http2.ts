//引入axios
import axios from "axios";
import router from "../router";
import { Message } from "element-ui";

//防止发送多次请求
let CancelToken = axios.CancelToken; //取消请求
let cancelFlag = true;
//设置错误消息
const tip = (msg: string) => {
  Message({
    message: msg,
    type: "error"
  });
};

//返回登录页
const toLogin = () => {
  router.push("/");
};

//请求失败后错误统一处理
const errorHandle = (status: number, other: any) => {
  // 状态码判断
  switch (status) {
    case 400:
      tip("错误请求");
      break;
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 1s后跳转回登录页
    case 403:
      tip("登录过期，请重新登录");
      //  localStorage.removeItem('token');
      //  store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip("请求的资源不存在");
      break;
    case 500:
      tip("服务器端出错");
      break;
    case 501:
      tip("网络未实现");
      break;
    case 502:
      tip("网络错误");
      break;
    case 503:
      tip("服务不可用");
      break;
    case 504:
      tip("网络超时");
      break;
    case 505:
      tip("http版本不支持该请求");
      break;
    default:
      tip(`连接错误,状态码${status}`);
  }
};
// 创建axios实例,设定超时时间是12s
var instance = axios.create({ timeout: 1000 * 12 });
//请求拦截器
//每次请求前，如果存在token则在请求头中携带token

instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
    //  const token = store.state.token;
    //  token && (config.headers.Authorization = token);
    //这里token是放在cookie中的，所以我们不需要担心token的
    //需要避免重复发送请求
    if (cancelFlag) {
      cancelFlag = false;
    } else {
      //重复发送请求,就会取消请求
      let cancel: any;
      let cancelToken: any;
      cancelToken = new CancelToken(c => {
        cancel = c;
      });
      cancel(); //取消请求
    }
    return config;
  },
  error => Promise.reject(error)
);
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    cancelFlag = true; //得到请求时，设置cancelFlag为true
    return res.status === 200 ? Promise.resolve(res) : Promise.reject(res);
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围，调用错误处理函数
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
    // else {
    //     // 处理断网的情况,暂时不需要
    //     // eg:请求超时或断网时，更新state的network状态
    //     // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //     // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //     store.commit('changeNetwork', false);
    // }
  }
);
export default instance;
