import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //用户列表接口，包括查询
  getList(data: any, page: any = 1): any {
    data.pageNum = page;
    return axios.get(`/api/a/list/user-verification`, {
      params: data
    });
  },
  checkRealName(id: any, data: object) {
    return axios.put(`/api/a/user-verification/${id}`, data);
  },
  //取消实名接口
  verificationCancel(id: any) {
    return axios.put(`/api/a/user-verification-cancel/${id}`);
  },
  //查看详情接口
  checkDetial(id: number) {
    return axios.get(`/api/a/user-verification/${id}`);
  }
};
