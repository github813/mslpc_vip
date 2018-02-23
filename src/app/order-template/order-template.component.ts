import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {AddressService} from '../address/address.service';
import {OrderTemplateService} from './order-template.service';
import {GoodsType} from '../goods-type/goods-type.component';
import {AppComponent} from '../app.component';
import {log} from 'util';
declare let $:any;
@Component({
  selector: 'app-order-template',
  templateUrl: './order-template.component.html',
  styleUrls: ['./order-template.component.css']
})
export class OrderTemplateComponent implements OnInit {
  goodstypelist:GoodsType[];
  receiveAddress=[];
  sendAddress=[];
  BrokerDTOList=[];//储存发货选择的信息部
  brokerslist=[];
  addretype:number;
  addressList=[];
  receiveAddresslist=[];
  sendAddresslist=[];
  iscansumbit:boolean=true;
  constructor(private service:OrderTemplateService,private addressService:AddressService,private  appComponent:AppComponent,public router: Router,) { }

  ngOnInit() {
    let self=this;
    this.service.goodstypeGetList({page:1,pageSize:500,status:1}).subscribe(data=>{
      if(data.code==0){
        this.goodstypelist=data.data;
      }else{
        this.showtoast(data.msg);
      }
    });
    $(".date").datetimepicker({
      format: "yyyy-mm-dd hh:ii:ss",
      autoclose: true,
      clearBtn: true,
      // todayBtn: true,
      todayHighlight: true,
      showMeridian: true,
      pickerPosition: "bottom-left",
      language: 'zh-CN',//中文，需要引用zh-CN.js包
      startView: 4,//月视图
      minView: 0//日期时间选择器所能够提供的最精确的时间选择视图
    });
    this.findDefault();
    this.brokerGetList()
    this.getaddresslist(1);
    this.getaddresslist(2);
    $(".freightPrice").on("keyup",function(){
      var price=$(this).val();
      price=price.replace(/[^0-9.]/g,"");
      if(price.indexOf(".")>0){
        if(price.split(".")[1].length>2){
          price=price.substring(0,price.length-1);
        }
      }
      $(this).val(price);
    });
    $(".remark").on("keyup",function(){
      if($(this).val().length>200){
        self.showtoast("备注最多可以输入200个")
        $(this).val($(this).val().substring(0,200));
      }

    })
  }
  //获取信息部
  brokerGetList(){
    this.service.brokerGetList({page:1,pageSize:500}).subscribe(data=>{
      if(data.code==0){
        this.brokerslist=data.data;
      }else{
        this.showtoast(data.msg);
      }

    })
  }
  selectroker(){
    if(this.BrokerDTOList.length==0){
      $('input[type="checkbox"]').attr("checked",false);
    }
  }

  sumbitbroker(){
    let self=this;
    self.BrokerDTOList=[];
    $('input[type="checkbox"]:checked').each(
      function() {
          let value=$(this).val();
          let checkedbroker=self.brokerslist[value];
          let broker={brokerMobile:checkedbroker.brokerMobile,brokerName:checkedbroker.brokerName,brokerId:checkedbroker.brokeId};
          self.BrokerDTOList.push(broker);
      }
    );
  }


  //默认地址
  findDefault(){
    this.addressService.findDefault().subscribe(data => {
      data.data.forEach((data) => {
        if (data.type === 1) {
          let d = data;
          this.sendAddress=[d];
        } else {
          let d = data;
          this.receiveAddress=[d];
        }
      })
    });
  }
  getaddresslist(type){
    let self=this;
    this.addressService.addressFindList(type)
      .subscribe(
        data => {
          if(data.code==0){//成功
            this.addressList=data.data;
            if(this.addressList.length>0){
              type==1?this.sendAddresslist=data.data:this.receiveAddresslist=data.data;

            }
          }else{
            this.showtoast(data.msg);
          }
        }
      )
  }
  // 选择地址
  addressFindList(type){
    this.addretype=type;
    let self=this;
    if((type==1&&this.sendAddresslist.length==0)||(type==2&&this.receiveAddresslist.length==0)){
      this.addressService.addressFindList(type)
        .subscribe(
          data => {
            if(data.code==0){//成功
              this.addressList=data.data;
              if(this.addressList.length>0){
                type==1?this.sendAddresslist=data.data:this.receiveAddresslist=data.data;
                setTimeout(function () {
                  let value;
                  self.addretype==1?value=self.sendAddress[0]["id"]:value=self.receiveAddress[0]["id"];
                  $("input[name='radioName'][value="+value+"]").attr("checked",true);
                },100)
              }
            }else{
              this.showtoast(data.msg);
              if(data.msg =="没有登录"){
                // this.router.navigateByUrl("login");
                // window.location.reload();
              }
            }
          }
        )
    }else{
      type==1?this.addressList=this.sendAddresslist:this.addressList=this.receiveAddresslist;
      setTimeout(function () {
        let value;
        self.addretype==1?value=self.sendAddress[0]["id"]:value=self.receiveAddress[0]["id"];
        $("input[name='radioName'][value="+value+"]").attr("checked",true);
      },100)
    }
  }
  gotoadd(type){
    if(type==1||type==2){
      $('#myModal').modal('hide');
      sessionStorage.setItem("leftnav","5");
      sessionStorage.setItem("type",type);
      this.router.navigateByUrl("content/address" );

    }else{
      $('#brokerModal').modal('hide');
      sessionStorage.setItem("leftnav","4");
      this.router.navigateByUrl("content/broker" );

    }

  }
  checkaddre(index:number){
    let self=this;
    let send=self.addressList[index];
    if(self.addretype==1){
      self.sendAddress=[send];
    }else{
      self.receiveAddress=[send];
    }
    $('.modal-backdrop').remove();
    $('#myModal').modal('hide');
  }
  sumbitorder(){
    if(this.iscansumbit){
      this.iscansumbit=false;
      let self=this;
      let iserror=false;
      let ordertemplateDTO=new orderTemplateDTO();
      // let params = {};
      $('[name]').each((index, val) => {
        if(iserror){
          return;
        }
        if(val['value']){
          ordertemplateDTO[val['name']] = val['value'];
        }else{
           if(val['name']=="goodsTypeId"){
             iserror=true;
             self.showtoast("请选择品类名称");
             self.iscansumbit=true;
             return;
           }else if(val['name']=="freightPrice"){
             iserror=true;
             self.showtoast("请填写货物运费");
             self.iscansumbit=true;
             return;
           }else if(val['name']=="endTime"){
             iserror=true;
             self.showtoast("请填写最晚接单时间");
             self.iscansumbit=true;
             return;
           }else if(val['name']=="latestArrivalTime"){
             iserror=true;
             self.showtoast("请填写最晚装货时间");
             self.iscansumbit=true;
             return;
           }
        }
      });
      if(!iserror){
        if(self.sendAddress.length==0||self.receiveAddress.length==0||self.BrokerDTOList.length==0){
          if(self.sendAddress.length==0){
            self.showtoast("请选择发货地址");
          }else if(self.receiveAddress.length==0){
            self.showtoast("请选择收货地址");
          }else if(self.BrokerDTOList.length==0){
            self.showtoast("请选择信息部");
          }
          self.iscansumbit=true;
          return;
        }else{
          self.goodstypelist.forEach((goodstype) => {
            if(goodstype.id==ordertemplateDTO.goodsTypeId){
              ordertemplateDTO.goodsType=goodstype.name;
              return;
            }
          })

          let receivelist=self.receiveAddress;
          let sendlist=self.sendAddress;

          ordertemplateDTO.receiveStreet= receivelist[0].street;
          ordertemplateDTO.receiveAddress= receivelist[0].address ;
          ordertemplateDTO.receiveCity= receivelist[0].city ;
          ordertemplateDTO.receiveCompany= receivelist[0].company ;
          ordertemplateDTO.receiveCounty= receivelist[0].county ;
          ordertemplateDTO.receiveId= receivelist[0].handlerId ;
          ordertemplateDTO.receiveLatitude= receivelist[0].latitude ;
          ordertemplateDTO.receiveLongitude= receivelist[0].longitude;
          ordertemplateDTO.receiveName= receivelist[0].name ;
          ordertemplateDTO.receivePhone= receivelist[0].phone ;
          ordertemplateDTO.receiveProvince= receivelist[0].province ;
          ordertemplateDTO.receiveTown= receivelist[0].town ;
          ordertemplateDTO.receiveAddressId=receivelist[0].id;

          ordertemplateDTO.sendStreet= sendlist[0].street ;
          ordertemplateDTO.sendAddress= sendlist[0].address ;
          ordertemplateDTO.sendCity= sendlist[0].city ;
          ordertemplateDTO.sendCompany= sendlist[0].company ;
          ordertemplateDTO.sendCounty= sendlist[0].county ;
          ordertemplateDTO.sendId= sendlist[0].handlerId ;
          ordertemplateDTO.sendLongitude= sendlist[0].longitude ;
          ordertemplateDTO.sendLatitude= sendlist[0].latitude ;
          ordertemplateDTO.sendName= sendlist[0].name ;
          ordertemplateDTO.sendPhone= sendlist[0].phone ;
          ordertemplateDTO.sendProvince= sendlist[0].province;
          ordertemplateDTO.sendTown= sendlist[0].town;
          ordertemplateDTO.sendAddressId=sendlist[0].id ;
          ordertemplateDTO.userId= JSON.parse(sessionStorage["data"]).userId;
          ordertemplateDTO.orderTemplateBrokerDTOList=self.BrokerDTOList;
          console.log(ordertemplateDTO);
          self.service.submitOrderTemplate(ordertemplateDTO).subscribe(data=>{
            if(data.code==0){
              self.showtoast("发货成功");
              sessionStorage.setItem("leftnav","2");
              self.router.navigateByUrl("content/goodsManagement" );
            }else{
              self.showtoast(data.msg);
              self.iscansumbit=true;
            }
          })


        }

      }else{
        return;
      }
    }
  }
  showtoast(msg:string){
    this.appComponent.showToast(msg);
  }

}
export class orderbroker {
  constructor(
    public brokerMobile:string,
    public brokerName : string,
    public brokerId :number,

  ) {
  }
}
export class broker {
  constructor(
    public brokerMobile:string,
    public brokerName : string,
    public remark : string,
    public id :number,
    public brokeId:number,
    public userId:number,
    public userName:string
  ) {
  }
}
export class orderTemplateDTO{
  public endTime: string;
  public freightPrice: string;
  public goodsType: string;
  public goodsTypeId: number;
  public latestArrivalTime: string;
  public orderTemplateBrokerDTOList: broker[];
  public receiveAddress: string;
  public receiveAddressId: number;
  public receiveCity: string;
  public receiveCompany: string;
  public receiveCounty: string;
  public receiveId: number;
  public receiveLatitude: string;
  public receiveLongitude: string;
  public receiveName: string;
  public  receivePhone: string;
  public receiveProvince: string;
  public receiveStreet: string;
  public receiveTown: string;
  public remark: string;
  public sendAddress: string;
  public sendAddressId: number;
  public sendCity: string;
  public sendCompany: string;
  public sendCounty: string;
  public sendId: number;
  public sendLatitude: string;
  public sendLongitude: string;
  public sendName: string;
  public sendPhone: string;
  public  sendProvince: string;
  public sendStreet: string;
  public sendTown: string;
  public userId: number
}
