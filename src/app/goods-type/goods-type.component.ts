import { Component, OnInit, SimpleChanges } from '@angular/core';
import {AppComponent} from '../app.component';
import {GoodsTypeService} from './goods-type.service';

declare var $:any;
declare var BootstrapDialog:any;
@Component({
  selector: 'app-goods-type',
  templateUrl: './goods-type.component.html',
  styleUrls: ['./goods-type.component.css']
})
export class GoodsTypeComponent implements OnInit {

  constructor(private appComponent:AppComponent,private goodsTypeService:GoodsTypeService) { }
  goodsTypelist:GoodsType[];
  public pageNum:number = 1;
  public tzpageNum: number = 1;//点击要跳转的页
  public totalNum:number=0;
  public pageSize:number=10;//每页显示的条数
  public iscanadd:boolean=true;
  ngOnInit() {
    $(".nav_left li").removeClass("active");
    $(".nav_left").find('li').eq(3).addClass("active");
    if(!window['tzInfo'])window['tzInfo']=new Map();
    window['tzInfo'].set(location.href,"1");
    this.showlist();
  }
  changePageNum(pageChange: number) {
    if (this.tzpageNum != pageChange) {
      this.tzpageNum = pageChange;
      this.pageNum= pageChange;
      this.showlist();
    }
  }
  // ngOnDestroy(){
  //   debugger;
  //   window['tzInfo'].set(location.href,"1");
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   window['tzInfo'].set(location.href,"1");
  //   this.ngOnInit();
  // }
  showlist(){
    this.goodsTypeService.goodstypeGetList({page:this.pageNum,pageSize:10}).subscribe(data=>{
      if(data.code==0){
        this.goodsTypelist=data.data;
        this.totalNum = data.total;
      }else{
        this.showtoast(data.msg);
      }

    })
  }
  addgoodstype(){
  //  dialog
    let self=this;
    BootstrapDialog.show({
      title: '新增品类',
      message: '  <input type="text" class="form-control" placeholder="请输入品类名称">',
      onhide: function(dialogRef){
        self.iscanadd=true;
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
          if(self.iscanadd){
            self.iscanadd=false;
            var name = dialogRef.getModalBody().find('input').val().trim();
            if(name==""){
              self.showtoast("品类名称不可为空！")
            }else if(name.length>16){
              self.showtoast("品类名称最多为16个字！")
            }else{
              self.goodsTypeService.goodstypeAdd(name).subscribe(data=>{
                self.iscanadd=true;
                if(data.code==0){
                  self.showtoast("添加成功！");
                  dialogRef.close();
                  self.pageNum=1;
                  self.showlist();
                }else{
                  self.showtoast(data.msg)
                }
              })
            }
          }
        }
      }]
    });




  }
  updatastatus(id,status){
  // status 当前状态
    let self=this;
    let params="0";
    let statusname="禁用";
    let comfirmtxt="确认禁用该品类吗？";
    if(status==0){
      params="1";
      statusname="启用";
      comfirmtxt="确认启用该品类吗？";
    }
    BootstrapDialog.confirm({
      title: '提示信息',
      message: comfirmtxt,
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
          self.goodsTypeService.GoodstypeUpdateStatus(id,params).subscribe(data=>{
            if(data.code==0){
              self.showtoast(statusname+"成功");
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
  del(id){
    let self=this;
    BootstrapDialog.confirm({
      title: '提示信息',
      message: "确认删除该品类吗？",
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
          self.goodsTypeService.goodstypeDel(id).subscribe(data=>{
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
  showtoast(msg:string){
    this.appComponent.showToast(msg);
  }

}
export class GoodsType {
  constructor(
              public id: number,
              public name: string,
              public status: number,
              public userId:number
  ) {
  }
}

