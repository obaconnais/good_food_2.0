import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRestaurant } from 'src/app/_interface/restaurant';
import { InterComponentCommunicationsService } from 'src/app/_service/inter-component-communications.service';

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
  @Input() restaurants:any;

  rest:any
  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public messageService: InterComponentCommunicationsService
  ) { }

  ngOnInit(): void {
  }

  onClick(restaurant:IRestaurant):void{
    this.activeModal.close('Close click')
    this.messageService.sendMessage(restaurant)
  }
}
