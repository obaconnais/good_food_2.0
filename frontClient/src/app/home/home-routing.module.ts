import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFranchiseComponent } from './home-franchise/home-franchise.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: []
  },
  {
    path:"home/franchise",component:HomeFranchiseComponent,children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
