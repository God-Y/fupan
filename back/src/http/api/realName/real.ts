import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //用户列表接口，包括查询
  getList(data: any, id: any = 1): any {
    data.pageNum = id;
    return axios.get(`/api/a/list/user-verification`, {
      params: data
    });
  },
  modifyRealName(id: any, data: object) {
    return axios.put(`/api/a/user-verification/${id}`, data);
  }
};
