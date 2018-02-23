import { Component, OnInit } from '@angular/core';
import { SessionStorage } from '../common/session_storage';
import { InfoStatisticalService } from './info-statistical.service';
import { getTime } from '../common/getTime';
import { GoodsManagementService } from '../goods-management/goods-management.service';
declare var $:any;

@Component({
  selector: 'app-info-statistical',
  templateUrl: './info-statistical.component.html',
  styleUrls: ['./info-statistical.component.css']
})
export class InfoStatisticalComponent implements OnInit {
  public data;
  public pageNum:number = 1;
  public tzpageNum: number = 1;//点击要跳转的页
  public totalNum;
  public brokerAll;//全部信息部列表
  public brokerId;//信息部id
  public addressList;//发货地址
  public recaddressList;//收货地址
  public goodsTypelist;//品类
  public todayStartTime;
  public todayEndTime
  constructor(
    public sessionStorage: SessionStorage,
    public service : InfoStatisticalService,
    public goodsManagementService: GoodsManagementService
  ) { 
  
  }

  ngOnInit() {
    $(".date").datetimepicker({
      format: "yyyy-mm-dd hh:ii:ss",
      autoclose: true,
      clearBtn: true,  
      todayHighlight: true,
      showMeridian: true,
      pickerPosition: "bottom-left",
      language: 'zh-CN',//中文，需要引用zh-CN.js包
      startView: 4,//月视图
      minView: 0//日期时间选择器所能够提供的最精确的时间选择视图
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
  search() {
    let details = new Details();
    details.userId = this.sessionStorage.getObject("data").userId;
    details.userType = "owner";
    details.startTime = $("#startTime").val() == '' ? this.todayStartTime : $("#startTime").val()// 起始日期
    details.endTime = $("#endTime").val() == '' ? this.todayEndTime : $("#endTime").val()//结束日期
    details.sendAddressId = $("#sendId").val()||'';//发货地址id
    details.receiveAddressId = $("#receiveId").val()||'';//收货地址id
    details.templateNo = $("#templateNo").val()|| '';//货源模板号
    details.brokerId = $("#brokerId").val()||'';//信息部id
    details.goodsTypeId = $("#goodsTypeId").val()||'';//货源品类id
    details.pageNum=this.pageNum;//页码
    details.pageSize = 10  //页容量
    console.log(details);
    this.service.statistics(details).subscribe(data => {
      if(data.code==0){
        this.data = data.data.list;
        this.pageNum = data.data.pageNum;
        console.log(data.data)
        this.totalNum = data.data.total;
      }else{
        alert(data.msg);
      }
    })
  }
  //查询全部信息部
  searchBrokerAll() {
    this.goodsManagementService.brokerGetList({ page: 1, pageSize: 1000 }).subscribe(data => {
      if (data.code == 0) {
        this.brokerAll = data.data;
        console.log(this.brokerAll)
      } else {
        alert(data.msg);
      }
    })
  }
  //发货地址
  addressFindList() {
    this.goodsManagementService.addressFindList('1')
      .subscribe(
      data => {
        if (data.code == 0) {//成功
          this.addressList = data.data;
          console.log(data);
        } else {
          alert(data.msg);
        }
      })
  }
  //收货地址
  address() {
    this.goodsManagementService.addressFindList('2')
      .subscribe(
      data => {
        if (data.code == 0) {//成功
          this.recaddressList = data.data;
          console.log(data);
        } else {
          alert(data.msg);
        }
      })
  }
  //品类查询
  showlist() {
    this.goodsManagementService.goodstypeGetList({ page: 1, pageSize: 1000 }).subscribe(data => {
      if (data.code == 0) {
        this.goodsTypelist = data.data;
      } else {
        alert(data.msg);
      }

    })
  }
  //导出表格
  
  excel() {
    let startTime = new Date(Date.parse($('#startTime').val().replace(/-/g, "/"))).getTime();
    let endTime = new Date(Date.parse($('#endTime').val().replace(/-/g, "/"))).getTime();
    let dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
    if (dates > 31) {
      alert("导出报表的间隔时间不能超过一个月");
      return
    }
    let details = new Details();
    details.userId = this.sessionStorage.getObject("data").userId;
    details.userType = "owner";
    details.startTime = $("#startTime").val() == '' ? this.todayStartTime : $("#startTime").val()// 起始日期
    details.endTime = $("#endTime").val() == '' ? this.todayEndTime : $("#endTime").val()//结束日期
    details.sendAddressId = $("#sendId").val() || '';//发货地址id
    details.receiveAddressId = $("#receiveId").val() || '';//收货地址id
    details.templateNo = $("#templateNo").val() || '';//货源模板号
    details.brokerId = $("#brokerId").val() || '';//信息部id
    details.goodsTypeId = $("#goodsTypeId").val() || '';//货源品类id
    details.pageNum = this.pageNum;//页码
    details.pageSize = 10  //页容量
    console.log(details);
    this.service.excel(details);
  }
}
export class Details {

  public userId:number;//用户id
  
  public userType:string;//用户类型owner
 
  public startTime:string;// 起始日期

  public endTime:string;//结束日期
 
  public sendAddressId:string;//发货地址id

  public receiveAddressId:string;//收货地址id
 
  public templateNo:number;//货源模板号

  public brokerId:number;//信息部id

  public goodsTypeId:string;//货源品类id
 
  public pageNum:number;//页码

  public pageSize:number;//页容量
}