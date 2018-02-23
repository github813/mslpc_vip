
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {ContentComponent} from './content/content.component';
import {ResetPwdComponent} from './login/reset-pwd/reset-pwd.component';

export const AppRoutes = [
  {
    path:'',
    redirectTo:"login",
    pathMatch:'full'
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: 'resetpwd',
    component: ResetPwdComponent
  },
];
