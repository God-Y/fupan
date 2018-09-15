import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //获取列表
  sendData(data: any): any {
    return axios.put(`/api/a/system-param`, {
      params: data
    });
  }
};
