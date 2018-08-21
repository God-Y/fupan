import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  // 债权管理列表请求, 查询
  getCreditor(data: any): any {
    return axios.get("/api/a/list/claim-info", {
      params: data
    });
  }
};
