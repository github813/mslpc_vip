import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {ValidateMessage} from '../../common/validateMessage';
import {Api} from '../../api';
import {AppComponent} from '../../app.component';
import {LoginService} from '../login.service';
import {SessionStorage} from '../../common/session_storage';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['../login.component.css']
})
export class ResetPwdComponent implements OnInit {
  formModel: FormGroup;
  iscanclick:boolean=true;
  yzm:string="获取验证码";
  resetpwd:resetPwd;
  btntxt:string="完 成";
  resetresult:boolean=false;
  validateMessage:any=new ValidateMessage();
  constructor(private formBuilder:FormBuilder,private appComponent:AppComponent,private  service:LoginService,private router:Router,private sessionStorage:SessionStorage) {
    this.formModel = formBuilder.group({
      captcha:["",[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
      mobile:["",[Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      platform:[4,[Validators.required]],
      pwd:["",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]],
      refpwd:["",[Validators.required,Validators.minLength(6),Validators.maxLength(12)]]
    });

  }

  ngOnInit() {

  }
  captchaReg(){

      var resulst = this.validateMessage.validateMobile(this.formModel.get("mobile").value);
      if (resulst.code == 1) {
        if (this.iscanclick) {
          this.service.captcha(this.formModel.get("mobile").value)
            .subscribe(
              data => {
                if (data.code == 0) {
                  this.iscanclick = false;
                  let countdown = 60
                  let timer = setInterval(() => {
                    if (countdown == 0) {
                      this.yzm = "获取验证码";
                      countdown = 60;
                      this.iscanclick = true;
                      clearInterval(timer);
                    } else {
                      this.yzm = "重新发送(" + countdown + ")";
                      countdown--;
                      return false;
                    }
                  }, 1000);
                  // layer.msg("验证码已发送到您的手机,请注意查收");
                } else {
                  this.iscanclick = true;
                  this.showtoast(data.msg);
                }
              }
            );
        }
      } else {
        this.showtoast(resulst.msg);
      }


  }
  submitForm(){
    if(!this.resetresult){


      var result=this.validateMessage.validateMobile(this.formModel.get("mobile").value);
      if(result.code==1){
        // this.resetpwd.pwd=this.formModel.get("mobile").value;
        var result1=this.validateMessage.validatePsd(this.formModel.get("pwd").value);
        if(result1.code==1){
          if(this.formModel.get("refpwd").value){
            if(this.formModel.get("pwd").value==this.formModel.get("refpwd").value){
              // this.resetpwd.pwd=this.formModel.get("pwd").value;
              var result2=this.validateMessage.validateCaptchaReg(this.formModel.get('captcha').value);
              if(result2.code==1){
                // this.resetpwd.captcha=this.formModel.get('captcha').value;
                this.resetpwd=this.formModel.value;
                console.log(this.resetpwd);
                this.service.resetPwd(this.resetpwd).subscribe(data=>{
                  // this.submitlag=false;
                  if(data.json().code==0){
                    // this.router.navigateByUrl("prompt");
                    this.btntxt="马上登录";
                    this.resetresult=true;
                  }else{
                    this.showtoast(data.json().msg )
                  }
                });

              }else{
                this.showtoast(result2.msg)
              }
            }else{
              this.showtoast('两次密码不一致，请确认密码');
            }
          }else{
            this.showtoast('请再次输入密码');
          }
        }else{
          this.showtoast(result1.msg);
        }
      }else {
        this.showtoast(result.msg);
      }

    }else {
      this.router.navigateByUrl('login')
    }
  }
  showtoast(msg:string){
    this.appComponent.showToast(msg);
  }
}
export class resetPwd {
  public captcha: string;
  public mobile: string;
  public platform: number;
  public pwd: string;
}
