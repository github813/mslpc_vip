import {environment} from '../environments/environment';
export class Api {

  public static messageService = "/message-service";
  public static walletService = "/payment-service";
  public static userService = "/user-service";
  public static orderService = "/order-service";
  public static traceService = "/trace-service";
  public static creditService = "/credit-service";


  //获取图形验证码
  public static captchaImg =  environment.apiHost + Api.userService + "/owner/user/captchaImg";
  //登录
  public static login = environment.apiHost + Api.userService + "/owner/user/login";
  //退出登录
  public static logout = environment.apiHost + Api.userService + "/owner/user/logout";
  //找回密码中的验证码获取
  public static captcha = environment.apiHost + Api.userService + "/owner/user/captcha";
  //找回密码
  public static resetPwd = environment.apiHost + Api.userService + "/owner/user/resetPwd";
  //信息统计
  public static statistics = environment.apiHost + Api.orderService + "/order/template/statistics";
  //货源列表
  public static getOrderTemplateListByParam = environment.apiHost + Api.orderService + "/order/template/getOrderTemplateListByParam";












//  品类管理
  //  品类列表
  public static GoodstypeGetList = environment.apiHost + Api.userService + "/vip/goodsType/list";
  //  添加
  public static GoodstypeAdd= environment.apiHost + Api.userService + "/vip/goodsType";
  //  删除
  public static GoodstypeDel= environment.apiHost + Api.userService + "/vip/goodsType";
  //  修改状态
  public static GoodstypeUpdate= environment.apiHost + Api.userService + "/vip/goodsType/updateStatus";
  // 信息部
  // 信息部列表
  public static brokerGetList = environment.apiHost + Api.userService + "/vip/broker/list";
  //通过手机号获取信息部
  public static checkMobile = environment.apiHost + Api.userService + "/owner/user/checkMobile";
  //添加信息部
  public static brokerAdd = environment.apiHost + Api.userService + "/vip/broker";
  //删除信息部
  public static brokerDel = environment.apiHost + Api.userService + "/vip/broker";
  /**
   * 地址管理
   * */
   //查询收/发货地址
  public static addreFindList = environment.apiHost + Api.userService + "/owner/address/findList";
  //设置默认收/发货地址
  public static addreSetDefault = environment.apiHost + Api.userService + "/owner/address/setDefault";
  //删除收/发货地址
  public static deleteAddres = environment.apiHost + Api.userService + "/owner/address";
  //根据ID查询地址
  public static getAddres = environment.apiHost + Api.userService + "/owner/address";
  //修改收/发货地址
  public static putAddres = environment.apiHost + Api.userService + "/owner/address/saveDTO";
  public static putAdd = environment.apiHost + Api.userService + "/owner/address";
  //查询默认收发货地址
  public static findDefault = environment.apiHost + Api.userService + "/owner/address/findDefault";
  //修改订单的收获地址
  public static updateReceiveOrderInfoByOrderNo = environment.apiHost + Api.orderService + "/order/info/updateReceiveOrderInfoByOrderNo";
  //修改订单的发获地址
  public static updateSendOrderInfoByOrderNo = environment.apiHost + Api.orderService + "/order/info/updateSendOrderInfoByOrderNo";
  //联系人列表
  public static contactLists = environment.apiHost + Api.userService + "/owner/address/contactList";
  //添加联系人
  public static saveContact =  environment.apiHost + Api.userService + "/owner/address/saveContact";
  //设为主联系人
  public static setMain =  environment.apiHost + Api.userService + "/owner/address/setMain";
  //删除联系人
  public static  deleteContact =  environment.apiHost + Api.userService +"/owner/address/deleteContact";
  //order-service/order/template/submitOrderTemplate
  public static  submitOrderTemplate =  environment.apiHost + Api.orderService +"/order/template/submitOrderTemplate";












  //根据大货主订单编码查询信息部货源信息
  public static getOrderInfoListByTemplateNo = environment.apiHost + Api.orderService +"/order/info/getOrderInfoListByTemplateNo"
  //取消全部http://192.168.1.60:8101/order-service/order/template/cancelAll/43433443
  public static cancelAll = environment.apiHost + Api.orderService + "/order/template/cancelAll/";
  //取消一部分http://192.168.1.60:8101/order-service/order/template/cancelBroker/11111111?brokerId=11
  public static cancelBroker = environment.apiHost + Api.orderService + "/order/template/cancelBroker/"
  //http://192.168.1.60:8101/order-service/order/template/getOrderBrokerByTemplateNo
  public static getOrderBrokerByTemplateNo = environment.apiHost + Api.orderService + "/order/template/getOrderBrokerByTemplateNo"
  //查询全部接单历史，根据不同条件查看子单列表
  public static getOrderDetailListByParam = environment.apiHost + Api.orderService + "/order/child/getOrderDetailListByParam";
  //导出表格
  public static excel = environment.apiHost + Api.orderService + '/orderTemplate/statement/excel';
}
