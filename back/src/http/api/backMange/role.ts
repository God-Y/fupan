import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //后台用户管理相关的模块
  getRole(page: any = 1): any {
    return axios.get(`/api/a/roles`, {
      params: {
        pageNum: page
      }
    });
  }
};
