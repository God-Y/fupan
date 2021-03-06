import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  // 债权管理列表请求, 查询
  getCreditor(data: any): any {
    return axios.get("/api/a/list/claim-info", {
      params: data
    });
  },

  // 获取编辑的数据
  getAddData(data: any): any {
    return axios.get(`/api/a/claim-info/${data}`);
  },

  //新增债权列表
  addCreditor(data: any): any {
    return axios.post(`/api/a/claim-info`, data);
  },

  //获取匹配列表
  getMatchList(id: any, data: any, pages: any): any {
    data.pageNum = pages;
    console.log(id,data);
    console.log(`/api/a/list/claim-match/${id}`);
    return axios.get(`/api/a/list/claim-match/${id}`,{
      params: data
    });
  },

  //匹配 查找
  // matchSearch(id: any, data: any): any {
  //   return axios.get(`/api/a/list/claim-match/${id}`, {
  //     params: data
  //   });
  // },

  //获取匹配详情
  getMatchDetailed(id: any): any {
    return axios.get(`/api/a/claim-info/${id}`);
  },

  //获取推荐匹配
  getCommend(id: any): any {
    return axios.get(`/api/a/list/investment-match-claim/${id}`);
  },

  //更改债权匹配
  changeCommend(data: any) {
    return axios.put(`/api/a/investment-credit`,  data);
  }
};
