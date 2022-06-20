import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAboutusComponent } from './home-aboutus/home-aboutus.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeFranchiseComponent } from './home-franchise/home-franchise.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './home-cart/home-cart.component';
import { MyAccountComponent } from './home-myaccount/home-myaccount.component';
import { MyCommandsComponent } from './home-mycommands/home-mycommands.component';
import { PromotionsComponent } from './home-promotions/home-promotions.component';
import { HomeContactUsComponent } from './home-contact-us/home-contact-us.component';
import { HomeFAQComponent } from './home-faq/home-faq.component';

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
      },
      {
        path: "myaccount", component: MyAccountComponent
      },
      {
        path: "promotions", component: PromotionsComponent
      },
      {
        path: "mycommands", component: MyCommandsComponent
      },
      {
        path: "contactus", component: HomeContactUsComponent
      },
      {
        path: "faq", component: HomeFAQComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
