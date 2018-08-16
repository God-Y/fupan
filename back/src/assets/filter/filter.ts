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
    console.log(date);
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
  }
};

export default filtersObj;
