import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //后台用户管理相关的模块
  getList(data: any, page: any = 1): any {
    data.pageNum = page;
    return axios.get(`/api/a/list/backstageUsers`, {
      params: data
    });
  },
  //后台用户删除
  delete(id: any) {
    return axios.delete(`/api/a/backstageUser/${id}`);
  },
  //修改密码
  modifyPwd(data: any) {
    return axios.put(`/api/a/backstageUser/password`, data);
  }
};
