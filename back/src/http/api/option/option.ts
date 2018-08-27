import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //获取意见
  getList(data: any, page: any = 1): any {
    data.pageNum = page;
    return axios.get(`/api/a/list/proposal`, {
      params: data
    });
  },
  //单个产品销量统计列表接口，包括查询
  delete(id: any): any {
    return axios.delete(`/api/a/proposal/${id}`);
  },
  check(id: any) {
    return axios.get(`/api/a/proposal/${id}`);
  }
};
