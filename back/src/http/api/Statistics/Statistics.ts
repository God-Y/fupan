import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //销量统计列表接口，包括查询
  getList(data: any, page: any = 1): any {
    data.pageNum = page;
    return axios.get(`/api/a/investment-count`, {
      params: data
    });
  },
  //单个产品销量统计列表接口，包括查询
  getProduction(data: any, id: any, page: any = 1): any {
    data.pageNum = page;
    return axios.get(`/api/a/list/investment-detail/${id}`, {
      params: data
    });
  }
};
