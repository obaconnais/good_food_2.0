import { Component, OnInit } from '@angular/core';
import { ICredential } from '../_interface/credential';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  user={
    mail:'',
    password:''
  }
  image= "../assets/images/login.jpg"
  leftArrow= "../assets/images/left_arrow.png"

  onClick():void{
    
  }
}
