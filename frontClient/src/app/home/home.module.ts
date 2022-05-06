import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeHeaderComponent } from './home-header/home-header.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeBodyComponent,
    HomeHeaderComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
