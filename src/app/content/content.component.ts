import {Router} from '@angular/router';
import { Component, OnInit ,SimpleChanges} from '@angular/core';
import {SessionStorage} from '../common/session_storage';


declare var $:any;
declare var BootstrapDialog:any;
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  name:string;
  years:string;
  constructor(private sessionStorage:SessionStorage,public router:Router ) {
    this.name=this.sessionStorage.getObject("data").name;
    var myDate = new Date();
    this.years=myDate.getFullYear().toString();
  }  
  ngOnInit() {
    let leftnav=sessionStorage.getItem("leftnav");
    if(!leftnav){
      leftnav="0";
    }
    $(".nav_left li").removeClass("active");
    $(".nav_left").find('li').eq(leftnav).addClass("active");
    $(".nav_left li").click(function () {
      if(!$(this).hasClass("iconli")){
        $(".nav_left li").removeClass("active");
        $(this).addClass("active");
        sessionStorage.setItem("leftnav",$(this).index());
      }
    })

  }
  logout(){
    let self=this;
    BootstrapDialog.confirm({
      title: '提示信息',
      message: '确认退出登录吗？',
      // type: BootstrapDialog.SIZE_SMALL, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
      size:BootstrapDialog.SIZE_SMALL,
      closable: true, // <-- Default value is false
      draggable: true, // <-- Default value is false
      btnCancelLabel: '取消', // <-- Default value is 'Cancel',
      btnOKLabel: '确认', // <-- Default value is 'OK',
      btnOKClass: 'btn_success', // <-- If you didn't specify it, dialog type will be used,
      callback: function(result) {
        // result will be true if button was click, while it will be false if users close the dialog directly.
        if(result) {
            sessionStorage.removeItem('data');
            self.router.navigateByUrl("");
        }else {
          return;
        }
      }
    });
    // BootstrapDialog.confirm({ title: "提示信息", message: "确认退出登录吗？" }).on(function (e) {
    //   if (!e) {
    //     return;
    //   }
    //   sessionStorage.removeItem('data');
    //   self.router.navigateByUrl("");
    // });
  }
  home(){
    this.router.navigateByUrl('content/home')
  }
  goodsManagement(){
    this.router.navigateByUrl('content/goodsManagement')
  }
  infoStatistical(){
    this.router.navigateByUrl('content/infoStatistical')
  }
}
