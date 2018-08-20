import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //用户列表接口，包括查询
  list(data: any): any {
    return axios.get(`/api/a/list/user`, {
      params: data
    });
  },
  //改变用户状态
  changeStatus(id: number, data: any): any {
    return axios.put(`/api/a/user-status/${id}`, data);
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
  changeManage(id: number, manage: string) {
    return axios.put(`/api/a/user/${id}`, {
      managerNumber: manage
    });
  },
  //解绑银行卡
  deleteCard(id: number, cardNumber: string | number) {
    return axios.delete(`/api/a/user/${id}`, {
      params: {
        cardNumber: cardNumber
      }
    });
  },
  //修改实名认证状态
  changeVerification(id: number, idAuthentication: string, refusal: string) {
    return axios.put(`/api/a/user-verification/${id}`, {
      idAuthentication: idAuthentication,
      refusal: refusal
    });
  },
  // 债权管理列表请求, 查询
  getCreditor(data: any): any {
    return axios.get("/api/a/list/claim-info", data);
  }
};
