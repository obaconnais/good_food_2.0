import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from 'src/app/_service/restaurant.service';
import { GeoCorderResponseService } from 'src/app/_service/geo-corder-response.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginTemplateComponent } from 'src/app/_template/login-template/login-template.component';
import { ICountry } from 'src/app/_interface/country';
import { RetaurantModalComponent } from 'src/app/_template/retaurant-modal/retaurant-modal.component';
import { Store } from '@ngrx/store';
import { UpdateStore } from 'src/app/_actions/test.action';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent implements OnInit {
  constructor(
    private ngbConfig: NgbCarouselConfig,
    private restaurants:RestaurantService,
    private geoService:GeoCorderResponseService,
    private modalService: NgbModal,
    ) {
    //mask the barr in the carrousel
    ngbConfig.showNavigationIndicators = false;
  }

  ngOnInit(): void {
  }
  //variable to store post code fill in by the user
  postCode:string='';
  //variable to store country where user are
  country:string=''
  //variable to store all countries
  countries:ICountry[]=this.geoService.getCountries()

  images = ["../assets/images/tartare.jpeg", "../assets/images/pickles.jpeg", "../assets/images/gateau.jpeg"]

  onClick(){
      let test = parseInt(this.postCode)
      let countryCode = this.geoService.getCountryCode(this.country)
      if(!this.postCode || !test){
        const modalRef = this.modalService.open(LoginTemplateComponent,{centered:true})
        modalRef.componentInstance.my_modal_content="zip code is required, please fill in it"
        modalRef.componentInstance.my_modal_title="No Zip Code!"
        modalRef.componentInstance.my_modal_style={
          'font-style':'italic',
          'text-align':'center'
        }
        this.postCode = ''
      }
      else{
        this.geoService.getAroundPostCode(this.postCode, "5", countryCode).subscribe(res=>{
          let zipCodeObjectTab = res.results
          let zipCodeSet = new Set()
          for(const obj of zipCodeObjectTab){
            zipCodeSet.add(obj.code.toString())
          }
          this.restaurants.getRestaurantCities({ zipCodes: Array.from(zipCodeSet) }).subscribe(r=>{
            if(r.data.length == 0){
              const modalRef = this.modalService.open(RetaurantModalComponent,{centered:true})
              modalRef.componentInstance.my_modal_content= "Sorry, no restaurant in this area"
              modalRef.componentInstance.my_modal_title="No new experience available !"
              modalRef.componentInstance.my_modal_failed =false
            }
            else{
              const modalRef = this.modalService.open(RetaurantModalComponent,{centered:true})
              modalRef.componentInstance.my_modal_content= "good"
              modalRef.componentInstance.my_modal_title="Wich restaurant do you prefer? "
              modalRef.componentInstance.my_modal_failed=true
              modalRef.componentInstance.restaurants = r.data
            }
          })
        })
      }
  }
}
