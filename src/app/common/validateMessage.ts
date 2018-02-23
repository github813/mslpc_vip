import{ FormControl }from'@angular/forms';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import {Result} from './dto';


export class ValidateMessage{

  constructor(

  ){

  }
  //验证手机号码 1 成功  2失败
  public validateMobile(mobile):Result{

    if(mobile){//手机号码不为空
      if(mobile.length<11){
        return {code:2,msg:"请填写正确的手机号码"};
      }else if(mobile.length==11){
        let MOBILE_REGEXP =/^1[3|5|6|7|8]{1}[0-9]{9}$/;//手机正则
        let flag=MOBILE_REGEXP.test(mobile) ?1: 2;
        if(flag==1){
          return {code:1,msg:"success"};
        }else{
          return {code:2,msg:"请填写正确的手机号码"};
        }
      }

    }
    else{
      return {code:2,msg:"手机号码不能为空，请填写正确的手机号码"};
    }
  }
  //验证验证码 1 成功  2失败
  public validateCaptchaReg(captcha):Result{
    if(captcha){//验证码 不为空
      if(captcha.length<4){
        return {code:2,msg:"请填写正确验证码"};
      }else if(captcha.length==4){
        let MOBILE_REGEXP =/^[0-9]\d*$/;//验证码正则
        let flag=MOBILE_REGEXP.test(captcha) ?1: 2;
        if(flag==1){
          return {code:1,msg:"success"};
        }else{

          return {code:2,msg:"验证码不符合规则，请填写正确的验证码"};
        }
      }
    }
    else{
      return {code:2,msg:"验证码不能为空，请填写验证码"};
    }

  }
  //验证密码1 成功  2失败
  public validatePsd(psd):Result{
    if(psd){//密码不为空
      if(psd.length<6){
        return {code:2,msg:"请填写正确密码"};
      }else if(psd.length>=6){
        let MOBILE_REGEXP =/^[a-zA-Z0-9_\.]+$/;//密码正则
        let flag=MOBILE_REGEXP.test(psd) ?1: 2;
        if(flag==1){
          return {code:1,msg:"success"};
        }else{
          return {code:2,msg:"密码不符合规则，请填写规则的密码"};
        }
      }
    }
    else{
      return {code:2,msg:"密码不能为空，请填写密码"};
    }

  }
  //验证姓名 1 成功  2失败
  public validateName(name):Result{
    if(name){//姓名不为空
      if(name.length<2){
        return {code:2,msg:"请填写正确姓名"};
      }else if(name.length>=2){
        let MOBILE_REGEXP =/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;//姓名正则
        let flag=MOBILE_REGEXP.test(name) ?1: 2;
        if(flag==1){
          var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
          var rs = "";
          for (var i = 0; i < name.length; i++) {
            if(pattern.test(name)){
              return {code:2,msg:"含有非法字符"};
            }else{
              // return 1;
              return {code:1,msg:"success"};
            }
          }
        }else{
          return {code:2,msg:"姓名不符合规则，请填写真正的姓名"};
        }
      }
    }
    else{//验证码为空
      return {code:2,msg:"姓名不能为空，请填写姓名"};
    }

  }
  //验证身份证号码1 成功  2失败
  public validateCardNo(cardNo):Result{
    if(cardNo){//身份证号码不为空
      if(cardNo.length<18){
        return {code:2,msg:"请填写正确身份证号码"};
      }else if(cardNo.length==18){
        let MOBILE_REGEXP =/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//身份证号码正则
        let flag=MOBILE_REGEXP.test(cardNo) ?1: 2;
        if(flag==1){

          return {code:1,msg:"success"};
        }else{
          return {code:2,msg:"身份证号码不符合规则，请填写身份证号码"};
        }
      }
    }
    else{
      return {code:2,msg:"身份证号码不能为空，请填写身份证号码"};
    }
  }
  //验证统一信息代码 1 成功  2失败 [1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}
  public creditCode(groupCode):Result{
    if(groupCode){//公司统一社会信用代码
      if(groupCode.length<18){
        return {code:2,msg:"请输入正确公司统一社会信用代码"};
      }else if(groupCode.length==18){
        let MOBILE_REGEXP =/^[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/;//验证统一信息代码
        let flag=MOBILE_REGEXP.test(groupCode) ?1: 2;
        if(flag==1){
          return {code:1,msg:"success"};
        }else{
          return {code:2,msg:"公司统一社会信用代码不符合规则，请填写公司统一社会信用代码"};
        }
      }
    }
    else{//公司统一社会信用代码
      return {code:2,msg:"公司统一社会信用代码不符合规则，请填写公司统一社会信用代码"};
    }
  }
  //验证6位密码 1 成功  2失败 ^[0-9]{6}$
  public validePsd(psd):Result{
    if(psd){//验证6位密码
      if(psd.length<6){
        return {code:2,msg:"请输入6-12位数字或字母"};
      }else if(psd.length==6){
        let MOBILE_REGEXP =/^[0-9]{6}$/;//验证6位密码
        let flag=MOBILE_REGEXP.test(psd) ?1: 2;
        if(flag==1){
          return {code:1,msg:"success"};
        }else{
          return {code:2,msg:"请填写正确密码"};
        }
      }
    }
    else{
      return {code:2,msg:"密码不能为空，请输入密码"};
    }
  }

  public ValidateMessageurl="http://clx-dev.oss-cn-beijing.aliyuncs.com/";
}

