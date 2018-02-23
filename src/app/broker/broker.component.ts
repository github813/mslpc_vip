
import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AppComponent} from '../app.component';
import {BrokerService} from './broker.service';

declare var $:any;
declare var BootstrapDialog:any;
@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit {
  public brokers:brokers[];
  public pageNum:number = 1;
  public tzpageNum: number = 1;//点击要跳转的页
  public totalNum:number=0;
  public pageSize:number=10;//每页显示的条数
  iscanadd:boolean=true;
  brokerMobile:string;
  brokerName:string;
  brokeId:number;
  checkphoneres:string;
  constructor(private appComponent:AppComponent,private brokerService:BrokerService) { }

  ngOnInit() {
    $(".nav_left li").removeClass("active");
    $(".nav_left").find('li').eq(4).addClass("active");
    if(!window['tzInfo'])window['tzInfo']=new Map();
    window['tzInfo'].set(location.href,"1");
    this.showlist();
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   // this.ngOnInit();
  //   window['tzInfo'].set(location.href,"1");
  //   this.ngOnInit();
  // }

  showlist(){
    this.brokerService.brokerGetList({page:this.pageNum,pageSize:10}).subscribe(data=>{
      if(data.code==0){
        this.brokers=data.data;
        this.totalNum = data.total;
      }else{
        this.showtoast(data.msg);
      }

    })
  }
  addbroker(){
    let self=this;
    var dialog = new BootstrapDialog({
      title: '新增信息部',
      message: function(dialogRef){
        var $txt = $('<div><div class="checknodata"></div></div>');
        var $message = $(' <input type="text" class="form-control"  onkeyup="value=value.replace(/[^\\d]/g,\'\') " maxlength="11" placeholder="请输入信息部手机号">');
        $txt.prepend($message );
        // $message.append($txt);
        $message.on('keyup', {dialogRef: dialogRef}, function(event){
          var mobile =  event.data.dialogRef.getModalBody().find('input').val().trim();
          if(mobile.length==11){
            let  adddisabled=false;
            self.brokerService.checkMobile(mobile).subscribe(data=>{
              if(data.code==0){
                if(data.data.authed==2){
                  self.brokerMobile=mobile;
                  self.brokerName=data.data.name;
                  self.brokeId=data.data.userId;
                  event.data.dialogRef.getModalBody().find('.checknodata').html("信息部名称："+data.data.name);
                  adddisabled=false;
                }else {
                  self.brokerMobile="";
                  self.brokerName="";
                  event.data.dialogRef.getModalBody().find('.checknodata').html("需该信息部认证通过后才可添加");
                  adddisabled=true;
                }

              }else if(data.code==4008){
                event.data.dialogRef.getModalBody().find('.checknodata').html("手机号尚未注册");
                self.brokerMobile="";
                self.brokerName="";
                adddisabled=true;

              }else{
                self.showtoast(data.msg);
                adddisabled=true;
              }
              $(".modal-dialog .btn_success").attr("disabled",adddisabled)
            })

            // disabled="true"
          }else{
            event.data.dialogRef.getModalBody().find('.checknodata').html("");
            $(".modal-dialog .btn_success").attr("disabled",true)
          }
        });


        return $txt;
      },
      buttons: [{
        label: '取消',
        action: function(dialogRef) {
          dialogRef.close();
        }
      },{
        label: '确认',
        cssClass: 'btn_success',
        action: function(dialogRef) {
          if (self.iscanadd) {
              if(self.brokerMobile){
                self.brokerService.brokerAdd(self.brokeId,self.brokerMobile,self.brokerName).subscribe(data=>{
                  if(data.code==0){
                    self.showtoast("添加成功");
                    dialogRef.close();
                    self.pageNum=1;
                    self.showlist();
                  }else{
                    self.showtoast(data.msg);
                  }
                })
              }else{
                self.showtoast("请输入正确的手机号！")
              }
          }
        }
      }]
    });

    dialog.open();
  }

  del(id){
    let self=this;
    BootstrapDialog.confirm({
      title: '提示信息',
      message: "确认删除该信息部吗？",
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
          self.brokerService.brokerDel(id).subscribe(data=>{
            if(data.code==0){
              self.showtoast("删除成功");
              self.pageNum=1;
              self.showlist();

            }else{
              self.showtoast(data.msg);
            }
          })
          // sessionStorage.removeItem('data');
          // self.router.navigateByUrl("");
        }else {
          return;
        }
      }
    });
  }
  changePageNum(pageChange: number) {
    if (this.tzpageNum != pageChange) {
      this.tzpageNum = pageChange;
      this.pageNum=pageChange;
      this.showlist();
    }
  }
  showtoast(msg:string){
    this.appComponent.showToast(msg);
  }
}
export class brokers {
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
