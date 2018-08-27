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
  },
  //新增用户
  addAccount(data: any) {
    return axios.post(`/api/a/backstageUsers`, data);
  },
  //编辑账户
  editAccount(id: number, data: any) {
    return axios.put(`/api/a/backstageUser/${id}`, data);
  },
  //根据单个ID获取用户的账号的手机号
  getUserMsg(id: string) {
    return axios.get(`/api/a/backstageUser/${id}`);
  }
};
