import {Api} from '../api';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import {Ajax} from '../ajax';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class OrderTemplateService{
  constructor(
    public ajax: Ajax,
    public http: Http
  ) {

  }

  //获取用户品类
  public goodstypeGetList(params): Observable<any> {
    return this.ajax.getByParams(Api.GoodstypeGetList,params);
  }
  //获取用户信息部
  public brokerGetList(params): Observable<any> {
    return this.ajax.getByParams(Api.brokerGetList,params);
  }
  // POST /order-service/order/template/submitOrderTemplate
  public submitOrderTemplate (params): Observable<any> {
    return this.ajax.myPost(Api.submitOrderTemplate,params);
  }
}

