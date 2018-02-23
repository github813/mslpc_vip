import { Component, OnInit, SimpleChanges } from '@angular/core';
import { GoodsManagementService } from '../goods-management.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-goods-info',
  templateUrl: './goods-info.component.html',
  styleUrls: ['./goods-info.component.css']
})
export class GoodsInfoComponent implements OnInit {
  public data;
  public templateNo;
  public pageNum: number = 1;
  public tzpageNum: number = 1;//点击要跳转的页
  public totalNum;//总页数
  constructor(
    public service :GoodsManagementService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }
  changePageNum(pageChange: number) {
    if (this.tzpageNum != pageChange) {
      this.tzpageNum = pageChange;
      this.pageNum = pageChange;
      this.search();
    }
  } 
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.ngOnInit();
  // }
  ngOnInit() {
    this.templateNo = this.activatedRoute.snapshot.queryParams["id"];
    console.log(this.templateNo);
    this.search();
  }
  search() {
    this.service.getOrderInfoListByTemplateNo(this.templateNo,this.pageNum).subscribe(data => {
      this.data = data.data;
      this.pageNum = data.data.pageNum;
      console.log(data.data);
      this.totalNum = data.total;
    })
  }
  driverInfo(orderNo) {
    this.router.navigateByUrl("content/goodsManagement/invoiceDetails?orderNo="+orderNo)
  }
  //主单状态
  getOrderStatus(status: number) {
    switch (status) {
      case 1:
        return "未发布";
      case 2:
        return "已发布";
      case 10:
        return "运输中";
      case 11:
        return "已暂停";
      case 20:
        return "支付中";
      case 30:
        return "已完成";
      case 40:
        return "已取消";
      case 50:
        return "系统取消";
      case 60:
        return "支付失败";
    }
    return "异常";
  }
}
