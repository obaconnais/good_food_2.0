import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { UpdateStore } from 'src/app/_actions/test.action';
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
    public messageService: InterComponentCommunicationsService,
    public store:Store<{restaurant:string}>
  ) { }

  ngOnInit(): void {
  }

  /**
   * Click on the button, it close the modal
   * Send the restaurant to Menu component
   * update the store with the restaurant name chosen
   * parameter: the restaurnant chosen
   */
  onClick(restaurant:IRestaurant):void{
    this.activeModal.close('Close click')
    this.messageService.sendMessage(restaurant)
    this.store.dispatch(UpdateStore({restaurant: restaurant.name}))
  }
}
