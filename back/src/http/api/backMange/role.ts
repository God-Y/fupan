import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //后台用户管理相关的模块
  getRole(page: any = 1): any {
    return axios.get(`/api/a/list/roles`, {
      params: {
        pageNum: page
      }
    });
  },
  //获取所有角色
  all() {
    return axios.get(`/api/a/roles`);
  },
  //删除角色
  delete(id: any) {
    return axios.delete(`/api/a/role/${id}`);
  },
  //根据ID获取角色信息
  getRoleMsg(id: any) {
    return axios.get(`/api/a/rolePermission/${id}`);
  },
  //新增角色
  addRole(data: any) {
    return axios.post(`/api/a/roles`, data);
  },
  //编辑角色
  editRole(id: string, data: any) {
    return axios.put(`/api/a/roles/${id}`, data);
  },
  //获取所有模块
  getAllRole() {
    return axios.get(`/api/a/permission`);
  }
};
