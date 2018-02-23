import {Http, Jsonp, URLSearchParams, Headers, Response, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import  'rxjs/Rx';
import {SessionStorage} from './common/session_storage';
import {Injectable} from "@angular/core";


declare var mui: any;
declare var $: any;
@Injectable()
export class Ajax {
  local_Storage: any;
  headers: Headers;
  public sessionStorage: SessionStorage;

  constructor(public http: Http) {
    this.sessionStorage = new SessionStorage();
    this.headers = new Headers();
    this.local_Storage = this.sessionStorage.getObject("data");
    this.headers.append("userId", this.local_Storage.userId);
    this.headers.append("userType", "owner");
    this.headers.append("accessToken", this.local_Storage.accessToken);
  }
  public getBlob(url: string, params): any {
    return this.http.get(url, {
      headers: this.headers,
      params: params,
      responseType: ResponseContentType.Blob
    }).map((res: Response) => new Blob([res.blob()], {type: 'application/octet-stream'}));
  }

  // get
  public myget(url: string): Observable<any> {
    return this.http.get(url, {headers: this.headers}).map((res: Response) => res.json());
  }

  //get带参数
  public getByParams(url: string, params): Observable<any> {
    return this.http.get(url, {headers: this.headers, params: params})
      .map((res: Response) => res.json());
  }

  // post
  public myPost(url: string, params): Observable<any> {

    return this.http.post(url, params, {headers: this.headers}).map((res: Response) => res.json());

    //return this.showLoading(this.http.post(url,params,{headers:this.headers})).map((res: Response) => res.json());

  }

  // put
  public myPut(url: string, params): Observable<any> {
    //return this.showLoading( this.http.put(url,params,{headers:this.headers}) ).map((res: Response) => res.json());
    return this.http.put(url, params, {headers: this.headers}).map((res: Response) => res.json());
  }
  // delete
  public myDelete(url: string): Observable<any> {

    //return this.showLoading( this.http.delete(url,{headers:this.headers}) ).map((res: Response) => res.json());
    return this.http.delete(url, {headers: this.headers}).map((res: Response) => res.json());
  }
}
