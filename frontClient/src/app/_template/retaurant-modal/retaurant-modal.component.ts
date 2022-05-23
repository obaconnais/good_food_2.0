import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-retaurant-modal',
  templateUrl: './retaurant-modal.component.html',
  styleUrls: ['./retaurant-modal.component.css']
})
export class RetaurantModalComponent implements OnInit {
  @Input() my_modal_title: any;
  @Input() my_modal_content: any;
  @Input() my_modal_style: any;
  @Input() my_modal_failed:boolean=false;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
