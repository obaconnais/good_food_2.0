import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeHeaderComponent } from '../_template/home-header/home-header.component';
import { HomeFooterComponent } from '../_template/home-footer/home-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeFranchiseComponent } from './home-franchise/home-franchise.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeAboutusComponent } from './home-aboutus/home-aboutus.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './home-cart/home-cart.component';
import { HomeMyaccountComponent } from './home-myaccount/home-myaccount.component';
import { HomePromotionsComponent } from './home-promotions/home-promotions.component';
import { HomeMycommandsComponent } from './home-mycommands/home-mycommands.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBodyComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeFranchiseComponent,
    HomeMenuComponent,
    HomeAboutusComponent,
    CartComponent,
    HomeMyaccountComponent,
    HomePromotionsComponent,
    HomeMycommandsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
