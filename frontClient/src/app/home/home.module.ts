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
import { MyAccountComponent } from './home-myaccount/home-myaccount.component';
import { MyCommandsComponent } from './home-mycommands/home-mycommands.component';
import { PromotionsComponent } from './home-promotions/home-promotions.component';
import { StoreModule } from '@ngrx/store';
import { HomeContactUsComponent } from './home-contact-us/home-contact-us.component';
import { recipeReducer, _RecipeReduceur } from '../_reducer/test.reducer';

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
    MyAccountComponent,
    MyCommandsComponent,
    PromotionsComponent,
    HomeContactUsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    StoreModule.forRoot({recipe: _RecipeReduceur})
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
