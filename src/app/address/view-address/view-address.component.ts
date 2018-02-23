import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {AddressService} from '../address.service';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.css']
})
export class ViewAddressComponent implements OnInit {
  public id :any;//地址id
  public type: any;//收货/发货
  public data: any;//地址数据
  public ContactPerson: any;//联系人
  public QueryData: any;//质检员
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public service: AddressService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.type = this.activatedRoute.snapshot.queryParams['type'];
    this.service.getAddres(this.id)//查询地址数据
      .subscribe(data =>{
        this.data = data.data;
        console.log(this.data);
      })
    if(this.type==1) {
      this.service.contactLists(this.id, 1)//查询发货联系人
        .subscribe(data => {
          this.ContactPerson = data.data;
        })
    }
    if(this.type==2) {
      this.service.contactLists(this.id, 2)//查询收货联系人
        .subscribe(data => {
          this.ContactPerson = data.data;
        })
      this.service.contactLists(this.id, 3)//查询收货质检员
        .subscribe(data => {
          this.QueryData = data.data;
        })
    }
  }
  //返回上一页
  back() {
    window.history.go(-1);
  }
}
