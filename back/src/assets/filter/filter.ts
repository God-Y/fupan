import message from '@/http/api/message/message';

//定义filter的接口
//这里为了方便没有去定义date函数的接口
//其余的过滤器并没有强制的定义类型
interface date {
  (date: number): string;
}
interface status {
  (date: number): string;
}

interface Filters {
  time?: date;
  status?: status;
  [propName: string]: any;
}

let filtersObj: Filters = {
  //时间过滤，
  time: function(date: number): string {
    let value = new Date(date);
    let year = value.getFullYear();
    let month = value.getMonth() + 1; //getMonth是从0开始，所以加+
    let day = value.getDate();
    return year + "-" + month + "-" + day;
  },
  //查看状态
  status: function(value: number): string {
    return value === 10 ? "正常" : "冻结";
  },
  //解冻还是冻结
  handleStatus: function(value: number): string {
    return value === 10 ? "冻结" : "解冻";
  },
  //实名状态
  realState: function(value: number): any {
    switch (value) {
      case 10:
        return "未认证";
      case 20:
        return "已认证";
      case 30:
        return "已拒绝";
      case 40:
        return "再申请";
      case 50:
        return "已取消";
    }
  },
  //操作状态
  realModifyState: function(value: number): any {
    switch (value) {
      case 20:
        return "取消实名";
      default:
        return "审核";
    }
  },

  // 产品列表年化收益率
  annualized: function(value: number): string {
    return value * 100 + "%";
  },

  // 产品列表 起息日期
  valueDate: function(value: number): any {
    switch (value) {
      case 10:
        return "T+0";
      case 20:
        return "T+1";
      case 30:
        return "T+2";
    }
  },

  // 产品列表 推荐
  reconmend: function(value: number) {
    switch (value) {
      case 0:
        return "不推荐";
      case 1:
        return "推荐";
    }
  },

  // 产品列表 状态判断
  statu: function(value: number) {
    switch (value) {
      case 0:
        return "在售";
      case 1:
        return "停售";
    }
  },

  // 产品列表 上下架
  shelf: function(value: number) {
    switch (value) {
      case 0:
        return "下架";
      case 1:
        return "上架";
    }
  },

  // 债权列表出借日期转换
  dateString: function(value: string) {
    let temple = value.replace(/(.{4})/, "$1-");
    return temple.replace(/(.{7})/, "$1-");
  },

  // 债权列表状态判断
  creditorStatu: function(value: number) {
    return value == 0 ? "未使用" : value == 1 ? "使用中" : "已到期";
  },

  matchRate: function(value: number) {
    if (value == 1) {
      return "匹配完成";
    } else if (value === 0) {
      return "尚未匹配";
    } else {
      return "匹配未全";
    }
  },
  /* 债权列表操作判断 */

  amount: function(val: any) {
    if (val) {
      return Number(val)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
  } /* 债权列表出借金额 */,

  //内容管理状态
  contentStatu: function(val: any) {
    switch (val) {
      case 10:
        return "已上线";
      case 20:
        return "草稿";
    }
  },
  //内容管理 操作 状态
  oprateStatu: function(val: any) {
    switch (val) {
      case 10:
        return "下线";
      case 20:
        return "上线";
    }
  },

  //内容管理 类型
  contentType: function(val: any) {
    switch (val) {
      case 10:
        return "推荐页banner";
      case 20:
        return "帮助中心";
      case 30:
        return "关于我们";
    }
  },

  //消息管理 人群
  messageCrowd: function(val: any) {
    switch (val) {
      case 10:
        return "认证投资人";
      case 20:
        return "所有人";
    }
  },
  //消息管理 状态
  messageStatu: function(val: any) {
    switch (val) {
      case 0:
       return "草稿";
      case 10:
        return "已上线";
      case 20:
        return "等待发送中";
    }
  }
};

export default filtersObj;
