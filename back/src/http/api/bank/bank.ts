import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //获取列表
  getList(data: any): any {
    return axios.get(`/api/a/list/bank`, {
      params: data
    });
  }

  //更改状态
  // changeStatu(id: any, type: any) {
  //   return axios.put(`/api/a/content-status/${id}`, {
  //     params: type
  //   });
  // },

  // //新增 上线
  // launch(data: any): any {
  //   return axios.post(`/api/a/content`, {
  //     params: data
  //   });
  // },

  // //编辑 获取详情
  // editDateiled(id: any) {
  //   return axios.get(`/api/a/content-info/${id}`);
  // },

  // //编辑 修改内容
  // editChange(id: any, data: any): any {
  //   return axios.put(`/api/a/content/${id}`, {
  //     params: data
  //   });
  // }
};
