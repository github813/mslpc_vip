import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import {noUndefined} from "@angular/compiler/src/util";
import { GoodsManagementService } from '../goods-management.service';
import { getTime } from '../../common/getTime';
declare var layui:any;
declare var layer:any;
declare var $:any;

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit{
  public datas=[];
  public dbState:string;
  public pageSize:number=5;//每页显示的条数
  public pageNum:number;//当前第几页
  public totalNum:number=0;//记录总条数
  public totalPage:number;//总页数
  public tzpageNum:number=1;//点击要跳转的页
  public childStatus:number;//状态码
  public title:string = "接单历史";
  AdditionalTip = [];//取消原因显示
  public dataRefuse=[];//取消原因
  public myMoney;
  public orderNo;
  public adress;
  public time1:string;
  public time2:string;
  public value={};
  public loadingIndex: number;
  public todayStartTime;
  public todayEndTime;
  constructor(
     private activatedRoute: ActivatedRoute,
    public service: GoodsManagementService,
     public router:Router
  ) { }
  
  changePageNum(pageChange:number){
    if(this.tzpageNum != pageChange){
      this.tzpageNum = pageChange;
      this.pageNum = pageChange;
      this.finds();
    }
  }
  ngOnInit() {
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
    // let nowTime = new getTime();
    // this.todayStartTime = nowTime.time().slice(0, 10) + " " + "00:00:00";
    // this.todayEndTime = nowTime.time();
    // $("#startTime").val(this.todayStartTime);
    // $("#endTime").val(this.todayEndTime);
    this.orderNo = this.activatedRoute.snapshot.queryParams["orderNo"];
    this.finds();
    }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.ngOnInit();
  // }
  //查询方法
  finds(){
      let details = new Details();
      details.childStatus = 107;
      details.page=this.tzpageNum;
      details.orderNo = this.orderNo;
      details.startTime = $("#startTime").val()|| '' ;// 起始日期
      details.endTime = $("#endTime").val() ||''; //结束日期
      console.log(details);
      this.service.getOrderDetailListByParam(details)
        .subscribe(
          data =>{
            if(data.code==0){
              this.datas = data.data;
              this.totalNum=data.total;//记录总条数
              this.pageNum=data.pageNum;//当前处在的页数
            }else{
              alert(data.msg)
                  if(data.msg =="没有登录"){
                  this.router.navigateByUrl("login");
                  window.location.reload();
                  }
                }
             })
              }
  //筛选
    // form(value){
    //   let details = new Details();
    //   details.childStatus=107;
    //   details.page = 1;
    //   details.childNo = $("#childNo").val()||"";
    //   details.truckNo = $("#truckNo").val()||"";
    //   details.startTime =  $("#startTime").val()||"";
    //   details.endTime =  $("#endTime").val()||"";
    //   this.service.getOrderDetailListByParam(details).subscribe(
    //     data =>{
    //       if(data.code==0){
    //          this.datas = data.data;
    //          this.totalNum=data.total;//记录总条数
    //          this.pageNum=data.pageNum;//当前处在的页数
    //          for(var i=0;i<data.data.length;i++){
    //          this.adress=data.data[i].receiveCity+data.data[i].receiveAddress;
    //          this.adress=this.adress.substr(0,12)+"...";
    //          }
    //       }else{
    //         alert(data.msg)
    //           }
    //         }
    //       )}
  }
 export  class Details{
    public childStatus:number;
    public pageSize:number;
    public page:number;
    public receiveId:number;
    public childNo:number;
    public truckNo:number;
    public sendCity;
    public receiveCity;
    public receiveCompany;
    public startTime;
    public endTime;
    public insurance;
    public orderNo;
  }
