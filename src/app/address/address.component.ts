import { Component, OnInit } from '@angular/core';
import {AddressService} from './address.service';
import {AppComponent} from '../app.component';
import {Addresslist} from './address.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

declare var BootstrapDialog:any;
declare  var $:any;
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  type:number=1;
  addressList:Addresslist[];
  constructor(private  service:AddressService,private appComponent:AppComponent,public router: Router) { }

  ngOnInit() {
    $(".nav_left li").removeClass("active");
    $(".nav_left").find('li').eq(5).addClass("active");
    let sesstype=sessionStorage.getItem("type");
    if(sesstype){
      this.type=parseInt(sesstype) ;
    }
    this.addressFindList();
  }
  ngOnDestroy(){
    if(location.href.indexOf("address")<0){
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("address");
    }
  }
  tabnav(type:number){
    this.type=type;
    this.addressFindList();
  }
  addressFindList(){
    this.service.addressFindList(this.type)
      .subscribe(
        data => {
          if(data.code==0){//成功
            this.addressList=data.data;
          }else{
            if(data.msg =="没有登录"){
              this.router.navigateByUrl("login");
              window.location.reload();
            }else{
              this.showtoast(data.msg);
            }
          }
        }
      )
  }
  addressAdd(){
    sessionStorage.setItem("type",this.type.toString());
    sessionStorage.removeItem("address");
    this.router.navigateByUrl("/content/address/map");
  }
  edit(index){
    // console.log(this.addressList[index])
    sessionStorage.setItem("type",this.type.toString());
    sessionStorage.setItem("address",JSON.stringify(this.addressList[index]));
    this.router.navigateByUrl("/content/address/map");
  }
  viewAddress(id){
    sessionStorage.setItem("type",this.type.toString());
    this.router.navigateByUrl('/content/address/view?id='+id+"&type="+this.type)
  }
  comfirm(type,index) {
    //  type==1 删除提示  2 设为默认提示
    let comtxt = "确认删除吗？";
    if (type == 2) {
      comtxt = "确认设置为默认吗？";
    }
    let self = this;
    BootstrapDialog.confirm({
      title: '提示信息',
      message: comtxt,
      // type: BootstrapDialog.SIZE_SMALL, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
      size:BootstrapDialog.SIZE_SMALL,
      closable: true, // <-- Default value is false
      draggable: true, // <-- Default value is false
      btnCancelLabel: '取消', // <-- Default value is 'Cancel',
      btnOKLabel: '确认', // <-- Default value is 'OK',
      btnOKClass: 'btn_success', // <-- If you didn't specify it, dialog type will be used,
      callback: function(result) {
        if(result) {
          if(type==1){
            self.remove(index);
          }else{
            self.setDefaultAddress(index);
          }
        }else {
          return;
        }
      }
    });

  }
  remove(index){
    this.service.deleteAddress(this.addressList[index].id)
      .subscribe(
        data => {
          if(data.code==0){
            this.showtoast("删除成功");
            this.addressFindList();
          }else{
            this.showtoast(data.msg);
          }
        });

  }

  setDefaultAddress(index){
    let id=this.addressList[index].id;
    this.service.addressSetDefault(id,this.type).subscribe(
      data => {
        if(data.code==0){
          this.showtoast("设置默认成功");
          this.addressFindList();

        }else{//设置默认收发货地址没有成功
          this.showtoast(data.msg);

        }
      });
  }
  showtoast(msg:string){
    this.appComponent.showToast(msg);
  }
}

