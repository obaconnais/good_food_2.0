import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeHeaderComponent } from '../_template/home-header/home-header.component';
import { HomeFooterComponent } from '../_template/home-footer/home-footer.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeFranchiseComponent } from './home-franchise/home-franchise.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeBodyComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeFranchiseComponent,
    HomeMenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
