import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import {FormControl} from "@angular/forms";
declare var SessionStorage;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges{
  @Input()
  currentPage:number = 1;//当前是第几页
  totalPage:number;//总页数
  isShowNext:boolean = false;//显示下一页
  isShowPrev:boolean = false;//显示上一页
  arrPage:number[] = [];
  btnNum:number = 7;//最多显示的数字按钮数

  pageInput:FormControl = new FormControl();

  @Input()
  totalNum:number;//总条数
  @Input()
  pageSize:number=10;//当前页显示条数
  // @Input()
  // totalPage:number;//总页数
  @Output()
  pageChange:EventEmitter<number> =  new EventEmitter<number>();

  constructor() { }
  selectPage(i:number){
    this.currentPage = i;
   // console.log(this.currentPage)
    this.pageChange.emit(this.currentPage);
    this.showBtn();
  }
  firstPage(){
    this.currentPage=1;
    this.pageChange.emit(this.currentPage);
    this.showBtn();
  }
  endPage(){
    this.currentPage=this.totalPage;
    this.pageChange.emit(this.currentPage);
    this.showBtn();
  }
  //下一页
  next(){
    if(this.totalPage > this.currentPage){
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
      this.showBtn();
    }
  }
  //上一页
  prev(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
      this.showBtn();
    }
  }
  ngOnInit() {
    //console.log('Pagination OnInit');
    if(!window['tzInfo'])window['tzInfo']=new Map();
    this.currentPage = window['tzInfo'].get(location.href) || 1;
   
    if(this.totalNum>-1){
      this.totalPage = Math.floor(this.totalNum/this.pageSize);
      if(this.totalNum % this.pageSize > 0){
        this.totalPage++;
      }
    }
    this.pageChange.emit(this.currentPage);
    this.showBtn();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log('Pagination OnChanges',changes);
    this.ngOnInit();
  }

  ngOnDestroy(){
    //window['tzInfo'].set(location.href,this.currentPage);
  }
  //总页数和当前页数比较
  showBtn(){
    window['tzInfo'].set(location.href,this.currentPage);
    if(this.totalPage > this.currentPage){
      this.isShowNext = true;
    }else{
      this.isShowNext = false;
    }
    if(this.currentPage > 1){
      this.isShowPrev = true;
    }else{
      this.isShowPrev = false;
    }

    let begin=1;
    let end=1;
    let half = Math.floor(this.btnNum/2);
    if(this.totalPage < this.btnNum){
      end = this.totalPage;
    }else{
      begin = this.currentPage - half;
      end = this.currentPage + half;
      if(this.currentPage-half < 1){
        begin = 1;
        end = this.btnNum;
      }
      if(this.currentPage+half > this.totalPage){
        begin = this.totalPage - this.btnNum+1;
        end = this.totalPage;
      }
    }
    this.arrPage=[];
    for(; begin<=end; begin++){
      this.arrPage.push(begin);
    }
  }
  goPage(){
    let i = this.pageInput.value *1;
    if(i<1 || i > this.totalPage){
      return;
    }
    this.selectPage(i);

  }

}
