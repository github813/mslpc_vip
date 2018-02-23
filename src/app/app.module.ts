import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import {Ajax} from './ajax';
import {LocationStrategy} from '@angular/common';
import {HashLocationStrategy} from '@angular/common';

import {AppService} from '../app.service';
import {LoginService} from './login/login.service';
import {SessionStorage} from './common/session_storage';

import { ContentModule } from './content/content.module';
import { HomeComponent } from './home/home.component';
import { ResetPwdComponent } from './login/reset-pwd/reset-pwd.component';
import { InfoStatisticalService } from './info-statistical/info-statistical.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ResetPwdComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, ReactiveFormsModule, ContentModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [AppService,InfoStatisticalService,LoginService,SessionStorage,Ajax,{provide: LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
