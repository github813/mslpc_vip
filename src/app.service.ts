import {Injectable} from '@angular/core';
import {Api} from './app/api';
import {Ajax} from "./app/ajax";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {

  listenerArray:EventListener[];
  constructor(public ajax:Ajax) {
    this.listenerArray =new Array<EventListener>();
  }
  /**
   * 添加时间监听 在组件的构造函数中手动执行
   * @param componentName
   * @param call
   */
  addListenEvent(componentName:string,call:(event:ComponentEvent)=>void){

    let listener = this.listenerArray.find(val =>{
      if(val.name == componentName){
        return true;
      }
      return false;
    });
    if(listener == null){
      listener = new EventListener(componentName,call);
      this.listenerArray.push(listener);
    }
  }

  /**
   * 发送事件
   * @param componentEvent
   */
  sendEvent(componentEvent:ComponentEvent){
    let listener = this.listenerArray.find(val =>{
      if(val.name == componentEvent.to){
        return true;
      }
      return false;
    });
    if(listener == null )return;
    listener.call(componentEvent);
  }

  /**
   * 删除事件监听 需在组件销毁时手动执行
   * @param componentName
   */
  removeListenEvent(componentName:string){
    let index:number = -1;
    this.listenerArray.find((val,i) =>{
      if(val && val.name == componentName){
        index = i;
        return true;
      }
      return false;
    });
    if(index > -1){
      this.listenerArray.splice(index);
    }
  }


}

export class EventListener {
  constructor(public name:string,public call:(event:ComponentEvent)=>void) {}
}
export class ComponentEvent {
  constructor(public from:any,public to:string, public name:string, public data?:any) {}
}




