
export class getTime{
    constructor(){

    }
    /**
 * 
 * 获取当前时间
 */

p(s) {
    return s < 10 ? '0' + s : s;
}
time(){
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    var now = year + '-' + this.p(month) + "-" + this.p(date) + " " + this.p(h) + ':' + this.p(m) + ":" + this.p(s);
    return now;
}
seconds(){
    var date = new Date(); //时间对象
    var preDate = new Date(date.getTime() - 24 * 60 * 60 * 1000); //前一天
    //获取当前年
    var year = preDate.getFullYear();
    //获取当前月
    var month = preDate.getMonth()+1;
    //获取当前日
    var date1 = preDate.getDate();
    var h = preDate.getHours();       //获取当前小时数(0-23)
    var m = preDate.getMinutes();     //获取当前分钟数(0-59)
    var s = preDate.getSeconds();
    var now1 = year + '-' + this.p(month) + "-" + this.p(date1) + " " + this.p(h) + ':' + this.p(m) + ":" + this.p(s);
    return now1;
}
}