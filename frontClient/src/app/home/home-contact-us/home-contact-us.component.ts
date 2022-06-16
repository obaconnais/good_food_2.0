import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-contact-us',
  templateUrl: './home-contact-us.component.html',
  styleUrls: ['./home-contact-us.component.css']
})
export class HomeContactUsComponent implements OnInit {
  private image= "../assets/images/cuisine.jpeg"
  constructor() { }

  ngOnInit(): void {
  }

  getImg():string{
    return this.image
  }

  setImg(newUrl:string):void{
    this.image = newUrl
  }
}
