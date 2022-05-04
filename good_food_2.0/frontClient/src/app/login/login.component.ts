import { Component, OnInit } from '@angular/core';
import { TokenService } from '../_service/token.service';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private tokenServ:TokenService,
    private authServ:AuthService
  ) { }

  ngOnInit(): void {
  }
  user={
    mail:'',
    password:''
  }
  image= "../assets/images/login.jpg"
  leftArrow= "../assets/images/left_arrow.png"

  onClick():void{
    console.log(this.user)
    this.authServ.login(this.user).subscribe(
      data=>{
        console.log(data)
        this.tokenServ.saveToken(data.acces_token)
      },
      err=>console.log(err)
    )
  }
}
