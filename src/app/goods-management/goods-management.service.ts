import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { SessionStorage } from '../common/session_storage';
import { Ajax } from '../ajax';
import { Api } from '../api';
declare var md5: any;
declare var layer: any;

@Injectable()
export class GoodsManagementService {
    constructor(
        public sessionStorage: SessionStorage,
        public ajax: Ajax,
        public http: Http
    ) {
    }
    public getOrderTemplateListByParam(params) :Observable<any> {
        return this.ajax.myPost(Api.getOrderTemplateListByParam,params)
    }
    public getOrderInfoListByTemplateNo(templateNo,page) :Observable<any> {
        return this.ajax.myget(Api.getOrderInfoListByTemplateNo + "?templateNo=" + templateNo + "&page=" + page+"&pageSize=10")
    }
    //取消全部
    public cancelAll(templateNo):Observable<any> {
        return this.ajax.myPut(Api.cancelAll+templateNo,"")
    }
    //取消一个信息部
    public cancelBroker(templateNo,brokerId): Observable<any> {
        return this.ajax.myPut(Api.cancelBroker + templateNo +"?brokerId="+brokerId, "")
    }
    //获取信息部
    public getOrderBrokerByTemplateNo(templateNo): Observable<any> {
        return this.ajax.myget(Api.getOrderBrokerByTemplateNo + "?templateNo=" + templateNo + "&page=1&pageSize=160");
    }
    //获取信息部全部
    public brokerGetList(params): Observable<any> {
        return this.ajax.getByParams(Api.brokerGetList, params);
    }
    //查询收/发货地址
    public addressFindList(type): Observable<any> {
        let userId = JSON.parse(sessionStorage["data"]).userId + "";
        return this.ajax.myget(Api.addreFindList + "?userId=" + userId + "&type=" + type + "&pageSize=50")
    }
    //获取用户品类
    public goodstypeGetList(params): Observable<any> {
        return this.ajax.getByParams(Api.GoodstypeGetList, params);
    }
    //子单收货历史
    public getOrderDetailListByParam(details): Observable<any> {
        //console.log(details.childStatus);
        let orderInfoTermDTO = {
            childStatus: details.childStatus,
            page: details.page,//调转到第几页
            pageSize: 10,
            orderNo: details.orderNo,
            // ownerId: this.sessionStorage.getObject("data").userId,
            //childNo: details.childNo,
            // truckNo: details.truckNo,
            beginTime: details.startTime,
            endTime: details.endTime
        }
        return this.ajax.myPost(Api.getOrderDetailListByParam, orderInfoTermDTO)
            .map((res: Response) => res);
    }
    //超期未完成的子单
    public getOverOrderChildListParam(beginTime, endTime, status, page) {
      let DTO = {
        "ownerId": this.sessionStorage.getObject("data").userId,
        "beginTime": beginTime,
        "endTime": endTime,
        "childStatus": status,
        "page": page,
        "pageSize": 10
      }
    }
}
