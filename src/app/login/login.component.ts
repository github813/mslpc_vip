import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {ValidateMessage} from '../common/validateMessage';
import {Api} from '../api';
import {AppComponent} from '../app.component';
import {LoginService} from './login.service';
import {SessionStorage} from '../common/session_storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  captchaUrl:string;
  isgetcaptchaUrl:boolean=false;
  validateMessage:any=new ValidateMessage();
  constructor(private formBuilder:FormBuilder,private appComponent:AppComponent,private  service:LoginService,private router:Router,private sessionStorage:SessionStorage) {

    this.formModel = formBuilder.group({
      captcha:["",[Validators.required]],
      mobile:["",[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      platform:[4,[Validators.required]],
      pwd:["",[Validators.required]]
    });
  }

  ngOnInit() {

  }
  getcaptchaImg(myForm){
    var resulst=this.validateMessage.validateMobile(myForm.phone);
    if(resulst.code==1){
      this.captchaUrl=Api.captchaImg+"?moblie="+myForm.phone+"&math="+Math.random();
      this.isgetcaptchaUrl=true;
    }else{
       this.showtoast(resulst.msg);
    }

  }
  login(myForm){
    // this.loadingIndex = layer.load(3, {
    //   shade: [0.1, '#fff'] //0.1透明度的白色背景
    // });
    let validateMobile=this.validateMessage.validateMobile(myForm.phone);
    let validatePsd=this.validateMessage.validatePsd(myForm.password);
    if(validateMobile.code==1){
      if(validatePsd.code==1){
        if(myForm.yzm1){
          this.service.login(myForm).subscribe(
            data=>{
              // 写入sessionStorage
              if(data.code==0){
                sessionStorage.removeItem("leftnav");
                this.sessionStorage.setObject("data",data.data) ;
                this.router.navigateByUrl("content");
                window.location.reload();
              }else{
                this.showtoast(data.msg)
              }

            })
        }else{
          this.showtoast("验证码为空");
        }

      }else{
        this.showtoast(validatePsd.msg);
      }
    }else{
      this.showtoast(validateMobile.msg);
    }

  }
  showtoast(msg:string){
    this.appComponent.showToast(msg);
  }

}
