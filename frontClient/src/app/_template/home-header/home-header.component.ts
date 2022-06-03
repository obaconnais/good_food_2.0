import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../_service/token.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  isLogged: boolean | undefined;
  restaurant_id: string | undefined
  restaurant_name: string | undefined

  constructor() { }

  ngOnInit(): void {
    this.isLogged = true
    this.restaurant_id = "123456"
    this.restaurant_name = "Restaurant name"
    console.log(this.isLogged)
  }
}
