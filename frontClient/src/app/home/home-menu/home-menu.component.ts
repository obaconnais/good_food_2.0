import { Component, OnInit } from '@angular/core';
import { IRestaurant } from 'src/app/_interface/restaurant';
import { InterComponentCommunicationsService } from 'src/app/_service/inter-component-communications.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  test:IRestaurant = {
    id:"",
    name:"",
    address:{street:'',postCode:'',city:'',country:''},
    phone:"",
    mail:"",
    franchisedGroup:"",
    schedule:{}
  }
  constructor(public messageService:InterComponentCommunicationsService) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(msg=>{
      this.test=msg
    })
  }
}
