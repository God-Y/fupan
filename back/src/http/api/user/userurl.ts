import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //用户列表接口，包括查询
  list(data: any, id: any = 1): any {
    data.pageNum = id;
    return axios.get(`/api/a/list/user`, {
      params: data
    });
  },
  //改变用户状态
  changeStatus(id: number, data: any): any {
    return axios.put(`/api/a/user-status/${id}`, {
      status:data
    });
  },
  //查看用户详情
  getMsg(id: number) {
    return axios.get(`/api/a/user/${id}`);
  },
  //修改用户的手机号
  changePhone(id: number, phone: string): any {
    return axios.put(`/api/a/user/${id}`, {
      phone: phone
    });
  },
  //修改用户的工号
  changeManage(id: string, manage: string) {
    return axios.put(`/api/a/user/${id}`, {
      managerNumber: manage
    });
  },
  //解绑银行卡
  deleteCard(id: number, cardNumber: string | number) {
    return axios.delete(`/api/a/user-bank/${id}`, {
      params: {
        cardNumber: cardNumber
      }
    });
  },
  //修改实名认证状态
  changeVerification(id: number,  refusal: string) {
    return axios.put(`/api/a/user-verification-cancel/${id}`);
  },
  //获取交易数据
  getDeal(id: number, data: any, pages: string = "1") {
    data.pageNum = pages;
    return axios.get(`/api/a/list/trading-flow/${id}`, {
      params: data
    });
  },
  //获取用户投资
  getPay(id: number, data: any, pages: string = "1") {
    data.pageNum = pages;
    return axios.get(`/api/a/list/investment-user/${id}`, {
      params: data
    });
  },
  //用户列表接口，包括查询
  Contract (data: any, id: any = 1): any {
    data.pageNum = id;
    return axios.get(`/api/a/list/user`, {
      params: data
    });
  },
  login(data:any){
    return axios.post(`/api/backstageLogin`, data);
  }
};
