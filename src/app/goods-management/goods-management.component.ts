import { Component, OnInit, SimpleChanges } from '@angular/core';
import { getTime } from '../common/getTime';
import { GoodsManagementService } from './goods-management.service';
import { Router } from '@angular/router';
import { SessionStorage } from '../common/session_storage';
import { AppComponent } from '../app.component';
declare var $:any;

@Component({
  selector: 'app-goods-management',
  templateUrl: './goods-management.component.html',
  styleUrls: ['./goods-management.component.css']
})
export class GoodsManagementComponent implements OnInit {
  public data;
  public templateNo;
  public brokers;//信息部列表
  public brokerAll;//全部信息部列表
  public brokerId;//信息部id
  public brokerName;
  public addressList;//发货地址
  public recaddressList;//收货地址
  public goodsTypelist;//品类
  public pageNum: number = 1;
  public tzpageNum: number = 1;//点击要跳转的页
  public totalNum;//总页数
  public todayStartTime;
  public todayEndTime;
  public num:number =1;
  constructor(
    public service: GoodsManagementService,
    public sessionStorage: SessionStorage,
    public router: Router,
    private appComponent: AppComponent,
  ) { }

  ngOnInit() {
    $(".nav_left li").removeClass("active");
    $(".nav_left").find('li').eq(2).addClass("active");
    $(".date").datetimepicker({
      format: "yyyy-mm-dd hh:ii:ss",
      autoclose: true,
      // todayBtn: true,
      clearBtn: true,  //添加清除按钮，可选值：true/false
      todayHighlight: true,
      showMeridian: true,
      pickerPosition: "bottom-left",
      language: 'zh-CN',//中文，需要引用zh-CN.js包
      startView: 4,//视图
      minView: 0,//日期时间选择器所能够提供的最精确的时间选择视图
    });
    let nowTime = new getTime();
    this.todayStartTime = nowTime.time().slice(0, 10) + " " + "00:00:00";
    this.todayEndTime = nowTime.time();
    $("#startTime").val(this.todayStartTime);
    $("#endTime").val(this.todayEndTime);
    this.search();
    this.searchBrokerAll();
    this.showlist();
    this.addressFindList();
    this.address();
  }
  changePageNum(pageChange: number) {
    if (this.tzpageNum != pageChange) {
      this.tzpageNum = pageChange;
      this.pageNum = pageChange;
      this.search();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
  search() {
    // console.log($('#brokerId option:selected').val())
    let details = new Details();
    details.beginCreateTime = $("#startTime").val() == '' ? this.todayStartTime : $("#startTime").val()// 起始日期
    details.endCreateTime = $("#endTime").val() == '' ? this.todayEndTime : $("#endTime").val()//结束日期
    details.sendAddressId = $("#sendId").val() || '';//发货地址id
    details.receiveAddressId = $("#receiveId").val() || '';//收货地址id
    details.brokerId = $("#brokerId").val() || '';//信息部id
    details.goodsTypeId = $("#goodsTypeId").val() || '';//货源品类id
    details.page = this.pageNum;//页码
    details.pageSize = 10  //页容量
    details.userId = this.sessionStorage.getObject("data").userId;
    this.service.getOrderTemplateListByParam(details).subscribe(data => {
      this.data = data.data;
      this.pageNum = data.data.pageNum;
      console.log(data.data)
      this.totalNum = data.total;
    })
  }
  goodsInfo(id) {
    this.router.navigateByUrl("content/goodsManagement/goodsInfo?id=" + id)
  }
  showBg(id) {
    $(".cancel").attr("data-toggle", "modal");
    $(".cancel").attr("data-target", "#myModal");
    this.templateNo = id;
    this.searchBroker();
  }
  searchAll(){
    this.num = 1;
  }
  //查询接单信息部
  searchBroker(){
    this.num = 2;
    this.service.getOrderBrokerByTemplateNo(this.templateNo).subscribe(data => {
      if (data.code == 0) {
        this.brokers = data.data;
        console.log(this.brokers)
      } else {
        this.showtoast(data.msg);
      }
    })
  }
  //查询全部信息部
  searchBrokerAll() {
    this.service.brokerGetList({page:1,pageSize:1000}).subscribe(data => {
      if (data.code == 0) {
        this.brokerAll = data.data;
        console.log(this.brokerAll)
      } else {
        this.showtoast(data.msg);
      }
    })
  }
  //发货地址
  addressFindList() {
    this.service.addressFindList('1')
      .subscribe(
      data => {
        if (data.code == 0) {//成功
          this.addressList = data.data;
          console.log(data);
        } else {
          this.showtoast(data.msg);
      }
    })
  }
  //收货地址
  address() {
    this.service.addressFindList('2')
      .subscribe(
      data => {
        if (data.code == 0) {//成功
          this.recaddressList = data.data;
          console.log(data);
        } else {
          this.showtoast(data.msg);
        }
      })
  }
  //品类查询
  showlist() {
    this.service.goodstypeGetList({ page:1, pageSize: 1000 }).subscribe(data => {
      if (data.code == 0) {
        this.goodsTypelist = data.data;
      } else {
        this.showtoast(data.msg);
      }

    })
  }
  checkBroker(brokerId, brokerName){
    this.brokerId = brokerId;
    this.brokerName = brokerName;
  }
  //取消
  cancel(num) {
    if(num==1){
      this.service.cancelAll(this.templateNo).subscribe(data => {
        if (data.code == 0) {
          this.search();
          this.searchBroker();
          this.showtoast("取消全部信息部成功");
        } else {
          this.showtoast(data.msg);
        }
      })
    }
    if(num==2){
      if (!this.brokerId ){
        this.showtoast("请选择需要取消的信息部");
        return
      }
      this.service.cancelBroker(this.templateNo, this.brokerId).subscribe(data => {
        if (data.code == 0) {
          this.search();
          this.searchBroker();
          if (this.brokerId) {
            this.showtoast(`取消${this.brokerName}信息部成功`)
          }
          this.brokerId = '';
        } else {
          this.showtoast(data.msg);
        }
      })
    }  
  }
  //获取订单状态
  //主单状态
  getStatus(status: number) {
    switch (status) {
      case 1:
        return "已发布";
      case 2:
        return "取消";
      case 3:
        return "完成";
    }
    return "异常";
  }
  showtoast(msg: string) {
    this.appComponent.showToast(msg);
  }
}

export class Details {

  public beginCreateTime: string;// 起始日期

  public endCreateTime: string;//结束日期

  public sendAddressId: string;//发货地址id

  public receiveAddressId: string;//收货地址id

  public brokerId: number;//信息部id

  public goodsTypeId: string;//货源品类id

  public page: number;//页码

  public pageSize: number;//页容量

  public status:number;

  public userId:string;
}
