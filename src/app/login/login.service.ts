import { Injectable } from '@angular/core';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import { RouterModule,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx'
import { Api } from '../api'
import { Ajax } from '../ajax';
declare var md5:any;

@Injectable()
export class LoginService{
  public userId;
  public ajax: Ajax;
  constructor(
    public router: Router,
    public http:Http
  ){
    // this.ajax = new Ajax(this.http);
  }
  //用户找回密码
  public resetPwd(user):Observable<any>{
    user.pwd=md5(user.pwd);//加密
    let params = new URLSearchParams();
    params.set("captcha",user.captcha);
    params.set("mobile",user.mobile);
    params.set("pwd",user.pwd);
    params.set("platform","4");
    //user.openid=this.localStorage.getObject("data").openid ;//openid
    return this.http.post(Api.resetPwd,params);
  }
  //用户登录
  public login(user):Observable<any>{
    console.log(user.phone);
    console.log(user.password);
    let login={
      "captcha": user.yzm1,
      "mobile": user.phone,
      "platform": 6,
      "pwd": md5(user.password),
    }
    return this.http.post(Api.login,login).map((res: Response) => res.json());
  }
  //用户注册验证码
  public captcha(mobile):Observable<any>{
    let params = new URLSearchParams();
    params.set("mobile",mobile);
    return this.http.post(Api.captcha,params)
      .map((res: Response) => res.json());
  }
}
