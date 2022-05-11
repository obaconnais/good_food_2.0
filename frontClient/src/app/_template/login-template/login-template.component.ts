import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.css']
})
export class LoginTemplateComponent implements OnInit {
  @Input() my_modal_title: any;
  @Input() my_modal_content: any;
  @Input() my_modal_style: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
