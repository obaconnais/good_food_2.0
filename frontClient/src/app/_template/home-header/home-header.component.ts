import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../_service/token.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  isLogged: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    this.isLogged = TokenService.isLogged()
  }

}
