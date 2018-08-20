export default {
  alertMsg: function(msg: string, successMsg: string, callback: any): void {
    (this as any)
      .$confirm(msg, "操作提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
        dangerouslyUseHTMLString: true
      })
      .then(() => {
        callback().them(() => {
          (this as any).$message({
            type: "success",
            message: successMsg
          })
        })
      })
      //请求成功后刷新本页面,或者从新调用search方法
      .catch(() => {
        (this as any).$message({
          type: "info",
          message: "取消操作"
        });
      });
  }
};
