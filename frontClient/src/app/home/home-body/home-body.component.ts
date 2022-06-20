import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from 'src/app/_service/restaurant.service';
import { GeoCorderResponseService } from 'src/app/_service/geo-corder-response.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginTemplateComponent } from 'src/app/_template/login-template/login-template.component';
import { ICountry } from 'src/app/_interface/country';
import { RetaurantModalComponent } from 'src/app/_template/retaurant-modal/retaurant-modal.component';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})

export class HomeBodyComponent implements OnInit {
  constructor(
    //useful for Carousel
    private ngbConfig: NgbCarouselConfig,
    //useful to get information about restaurant
    private restaurants:RestaurantService,
    //useful to convert and get any information about position
    private geoService:GeoCorderResponseService,
    //useful to open the chosen feature modal
    private modalService: NgbModal,
    ) {
    //mask the barr in the carrousel
    ngbConfig.showNavigationIndicators = false;
  }

  ngOnInit(): void {
  }
  //variable to store zipcode fill in by the user
  postCode:string='';
  //variable to store country where user are
  country:string=''
  //variable to store all countries
  countries:ICountry[]=this.geoService.getCountries()
  //array to store all url of carousel pictures
  images = ["../assets/images/tartare.jpeg", "../assets/images/pickles.jpeg", "../assets/images/gateau.jpeg"]

  onClick(){
      let test = parseInt(this.postCode)
      let countryCode = this.getGeo().getCountryCode(this.country)
      //if zipCode fill in by user are empty or different from a number
      if(!this.postCode || !test){
        const modalRef = this.getNgb().open(LoginTemplateComponent,{centered:true})
        modalRef.componentInstance.my_modal_content="zip code is required, please fill in it"
        modalRef.componentInstance.my_modal_title="No Zip Code!"
        modalRef.componentInstance.my_modal_style={
          'font-style':'italic',
          'text-align':'center'
        }
        this.postCode = ''
      }
      else{
        this.getGeo().getAroundPostCode(this.postCode, "5", countryCode).subscribe(res=>{
          let zipCodeObjectTab = res.results
          let zipCodeSet = new Set()
          for(const obj of zipCodeObjectTab){
            zipCodeSet.add(obj.code.toString())
          }
          this.getRes().getRestaurantCities({ zipCodes: Array.from(zipCodeSet) }).subscribe(r=>{
            if(r.data.length == 0){
              const modalRef = this.getNgb().open(RetaurantModalComponent,{centered:true})
              modalRef.componentInstance.my_modal_content= "Sorry, no restaurant in this area"
              modalRef.componentInstance.my_modal_title="No new experience available !"
              modalRef.componentInstance.my_modal_failed =false
              this.postCode=''
            }
            else{
              const modalRef = this.getNgb().open(RetaurantModalComponent,{centered:true})
              modalRef.componentInstance.my_modal_content= "good"
              modalRef.componentInstance.my_modal_title="Wich restaurant do you prefer? "
              modalRef.componentInstance.my_modal_failed=true
              modalRef.componentInstance.restaurants = r.data
            }
          })
        })
      }
  }

  getNgb(){
    return this.modalService
  }

  getGeo(){
    return this.geoService
  }

  getRes(){
    return this.restaurants
  }

  getPostCode(){
    return this.postCode
  }

  setPostCode(zipCode:string){
    this.postCode = zipCode
  }

  getCountry(){
    return this.country
  }

  setCountry(country:string){
    this.country = country
  }
}
