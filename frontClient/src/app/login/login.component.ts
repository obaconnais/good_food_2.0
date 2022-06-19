import { Component, OnInit } from '@angular/core';
import { TokenService } from '../_service/token.service';
import { AuthService } from '../_service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginTemplateComponent } from '../_template/login-template/login-template.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'appBootstrap';
  closeResult: string = '';

  constructor(
    private tokenServ: TokenService,
    private authServ: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  user = {
    mail: '',
    password: ''
  }
  image = "../assets/images/login.jpg"
  leftArrow = "../assets/images/left_arrow.png"

  onClick(): void {
    this.authServ.login(this.user).subscribe(
      data => {
        console.log(data)
        this.tokenServ.saveToken(data.acces_token)
      },
      err => {
        /**
         * if failed, modal appear.
         */
        const modalRef = this.modalService.open(LoginTemplateComponent, { centered: true })
        /**
         * text of the modal
         */
        modalRef.componentInstance.my_modal_content = "login/password wrong!"
        /**
         * title of the modal
         */
        modalRef.componentInstance.my_modal_title = "Authentication failed"
        /**
         * style of the modal
         */
        modalRef.componentInstance.my_modal_style = {
          'font-style': 'italic',
          'text-align': 'center'
        }
        this.user.password=''
        this.user.mail=''
      }
    )
  }
}
