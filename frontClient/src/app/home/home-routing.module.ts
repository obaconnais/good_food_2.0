import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAboutusComponent } from './home-aboutus/home-aboutus.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeFranchiseComponent } from './home-franchise/home-franchise.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './home-cart/home-cart.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: "", component: HomeBodyComponent
      },
      {
        path: "franchise", component: HomeFranchiseComponent
      },
      {
        path: "menu", component: HomeMenuComponent
      },
      {
        path: "aboutus", component: HomeAboutusComponent
      },
      {
        path: "body", component: HomeBodyComponent
      },
      {
        path: "cart", component: CartComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
