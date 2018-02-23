import {Api} from '../api';
import { Http,Jsonp,URLSearchParams,Headers,Response } from '@angular/http';
import {Ajax} from '../ajax';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class AddressService{

  userId:number;
  userName:string;
  constructor(
    public ajax: Ajax,
    public http: Http
  ) {
    this.userId = JSON.parse(sessionStorage["data"]).userId ;

  }
  public addressFindList(type): Observable<any> {
    return this.ajax.myget(Api.addreFindList + "?userId=" + this.userId+ "&type=" + type+ "&pageSize=50")
  }
  public deleteAddress(id): Observable<any> {
    return this.ajax.myDelete(Api.deleteAddres + "?userId=" + this.userId + "&id=" + id);
  }
  public addressSetDefault(id, type): Observable<any> {
    let params = new URLSearchParams();
    params.set("userId", this.userId.toString());
    params.set("id", id);//地址ID
    params.set("type", type);  //1发货  2收货
    return this.ajax.myPut(Api.addreSetDefault, params);
  }
//添加收/发货地址{新 by xwx 2017-08-22}
  public addAddress(address,contactList): Observable<any> {
    address.userId = JSON.parse(sessionStorage["data"]).userId;
    let saveDTO = {
      "contactList":contactList,
      "ownerAddress":address
    }
    console.log(saveDTO)
    return this.ajax.myPost(Api.putAddres, saveDTO);
  }
  //查询收发货人列表
  public contactLists(id,type):Observable<any> {
    return  this.ajax.myget(Api.contactLists + "?addressId=" + id + "&type=" + type)
  }
  //根据id查询收/发货地址
  public getAddres(id): Observable<any> {
    let userId = JSON.parse(sessionStorage["data"]).userId + "";
    return this.ajax.myget(Api.getAddres + "?id=" + id)
  }
  //修改收/发货地址
  public putAddress(address,aa): Observable<any> {
    console.log(address)
    return this.ajax.myPut(Api.putAdd, address);
  }
  //添加联系人
  public saveContact(addressId,addressType,name,phone,main):Observable<any>{
    let addPresonDTO ={
      "addressId":addressId,
      "type":addressType,
      "name":name,
      "phone":phone,
      "main":main
    }
    return this.ajax.myPost(Api.saveContact, addPresonDTO);
  }
  //删除联系人
  public  deleteContact(id):Observable<any>{
    return this.ajax.myDelete(Api.deleteContact+"?id="+id)
  }
  //设为主联系人
  public setMain(addressId,id):Observable<any>{
    let params = new URLSearchParams();
    params.set("addressId", addressId);
    params.set("id", id);
    return this.ajax.myPost(Api.setMain, params);
  }
  //修改订单的收获地址
  public updateReceiveOrderInfoByOrderNo(address): Observable<any> {
    return this.ajax.myPost(Api.updateReceiveOrderInfoByOrderNo, address);
  }
  //修改订单的发货地址
  public updateSendOrderInfoByOrderNo(address): Observable<any> {
    return this.ajax.myPost(Api.updateSendOrderInfoByOrderNo, address);
  }
  //默认收发货地址
  public findDefault() {
    let userId = JSON.parse(sessionStorage["data"]).userId + "";
    // this.local_Storage=this.localStorage.getObject("data").userId;
    //console.log(this.sessionStorage.getObject("data"));
    return this.ajax.myget(Api.findDefault + "?userId=" + userId)
  }


 }
export class Addresslist {
  constructor(
    public id: number,
    public userId: number,
    public systemAddressId: number,
    public handlerId: number,
    public type: number,
    public def: number,
    public name: string,
    public phone: string,
    public company: string,
    public province: string,
    public city: string,
    public  county: string,
    public town: string,
    public street: string,
    public address: string,
    public longitude: number,
    public latitude: number,
    public isUsed: number,
    public createTime: string,
    public modifiedTime: string

  ) {
  }
}
