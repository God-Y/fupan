import axios from "@/http/http2"; //导入创建好的axios实例

export default {
  uploadPicture(data: any, config: any) {
    return axios.post(`/api/a/upload-picture`, data, config);
  }
};
