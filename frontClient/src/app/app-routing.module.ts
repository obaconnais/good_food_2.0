import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path:"", component: WelcomeComponent
  },
  {
    path:"login", component: LoginComponent
  },
  {
    path:"home", loadChildren: () =>import("./home/home.module")
      .then(module=> module.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
