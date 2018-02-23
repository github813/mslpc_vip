import { Component, OnInit } from '@angular/core';
import { getTime } from '../common/getTime';
import { InfoStatisticalService } from '../info-statistical/info-statistical.service';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public data1=[];
  public data2 = [];
  public yesterdayNum = 0;
  public todayNum = 0;
  public yesterdayFreight = 0.00;
  public todayFreight = 0.00;
  constructor(
    public service: InfoStatisticalService
  ) { }

  ngOnInit() {
    let time = new getTime();
    let todayStartTime = time.time().slice(0, 10) + " " + "00:00:00";
    let todayEndTime = time.time();
    let yesterdayStartTime = time.seconds().slice(0, 10) + " " + "00:00:00";
    let yesterdayEndTime = time.seconds().slice(0, 10) + " " + "23:59:59";
    let fristTime = { startTime: yesterdayStartTime, endTime: yesterdayEndTime, pageNum: 1, pageSize: 1000 };
    let details = { startTime: todayStartTime, endTime: todayEndTime, pageNum: 1, pageSize:1000 };
    //昨日订单数据
    this.service.statistics(fristTime).subscribe(data => {
      this.data1 = data.data.list;
      var sum1 = 0;
      var freight1 = 0;
      this.data1.forEach(function (val, index, arr) {
        sum1 += val.normalCount;
        freight1 += val.freightTotal;
      })
      this.yesterdayNum =sum1;
      this.yesterdayFreight = freight1;
      console.log(data.data);
    })
     //今日订单数据
    this.service.statistics(details).subscribe(data => {
      this.data2 = data.data.list;
      var sum2 = 0;
      var freight2 = 0;
      this.data2.forEach(function (val, index, arr) {
        sum2 += val.normalCount;
        freight2 += val.freightTotal;
      })
      this.todayNum = sum2;
      this.todayFreight = freight2;
      console.log(data.data);
    })
  }
}
