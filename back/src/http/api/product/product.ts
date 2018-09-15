import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  //增加产品
  addProduct(data: any) {
    return axios.post(`/api/a/investment-product`, data);
  },

  //获取产品信息
  productInfo(id: any) {
    return axios.get(`/api/a/product-info/${id}`);
  },

  //编辑产品
  editProduct(id: any, data: any) {
    return axios.put(`/api/a/product-info/${id}`, data);
  }
};
