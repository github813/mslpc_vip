import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from '../app.service';
import {ComponentEvent} from '../app.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  toast: any = {isShow: false, isIn: false, msg: ""};
  constructor(public router: Router, public appService: AppService){
    this.appService.addListenEvent("AppComponent",(event:ComponentEvent) =>{
      // if(event.name =="showAlert"){
      //   this.showAlert(event.data.msg,event.data.css);
      // }
      if(event.name =="showToast"){
        this.showToast(event.data);
      }
    });
    
    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) => {
        // this.checkUrl(event.url);
      });
  }
  ngOnInit() {
  }
  showToast(msg:string){//*ngIf="toast.isShow"
    this.toast.isShow = true;
    this.toast.msg = msg;

    setTimeout(() => this.toast.isIn = true,100);
    setTimeout(() => this.toast.isIn = false, 4000);
    setTimeout(() => this.toast.isShow = false, 4400);
  }
}
