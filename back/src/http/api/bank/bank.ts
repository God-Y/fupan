import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //获取列表
  getList(data: any): any {
    return axios.get(`/api/a/list/bank`, {
      params: data
    });
  },

  // //新增 上线
  launch(data: any): any {
    return axios.post(`/api/a/bank`, {
      params: data
    });
  },

  //编辑 获取详情
  editDateiled(id: any) {
    return axios.get(`/api/a/bank/${id}`);
  },

  // //编辑 修改内容
  editChange(id: any, data: any): any {
    return axios.put(`/api/a/bank/${id}`, {
      params: data
    });
  }
};
