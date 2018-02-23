import {Api} from '../api';
import {SessionStorage} from '../common/session_storage';
import {Ajax} from '../ajax';
import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class InfoStatisticalService {
    constructor(
        public sessionStorage: SessionStorage,
        public ajax: Ajax,
        public http: Http
    ) {
    }
    //查询统计
    public statistics(params): Observable<any> {
        return this.ajax.getByParams(Api.statistics,params);
    }
    //导出表格
    public excel(params) {
        console.log(params)
        let url = '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
        var link = document.createElement("a");
        this.ajax.getBlob(Api.excel + url, null).subscribe(data => {
            console.log(data);
            link.setAttribute("href", window.URL.createObjectURL(data));
            link.setAttribute("download", "报表" + Date.now() + ".xls");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }
}
