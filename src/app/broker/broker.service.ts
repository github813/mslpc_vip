import {Api} from '../api';
import {SessionStorage} from '../common/session_storage';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import {Ajax} from '../ajax';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class BrokerService{
  local_Storage: any;
  userId:number;
  userName:string;
  constructor(
    public sessionStorage: SessionStorage,
    public ajax: Ajax,
    public http: Http
  ) {
    this.local_Storage = this.sessionStorage.getObject("data");
     this.userId=this.local_Storage.userId;
     this.userName=this.local_Storage.name;
  }
//获取用户信息部
  public brokerGetList(params): Observable<any> {
    return this.ajax.getByParams(Api.brokerGetList,params);
  }
  public  checkMobile(mobile:string): Observable<any> {
    return this.ajax.myget(Api.checkMobile+"?mobile="+mobile );
  }
  public brokerAdd(brokeId:number,brokerMobile:string,brokerName:string): Observable<any> {
    let params={
      "brokeId": brokeId,
      "brokerMobile": brokerMobile,
      "brokerName": brokerName,
      "userId": this.userId,
      "userName": this.userName
    }
    return this.ajax.myPost(Api.brokerAdd,params);
  }
  public brokerDel(id:number): Observable<any> {

    return this.ajax.myDelete(Api.brokerDel+"?id="+id);
  }
}
