import { Component, OnInit } from '@angular/core';
import * as L from "leaflet"
import { IRestaurants } from 'src/app/_interface/restaurant';
import { RestaurantService } from 'src/app/_service/restaurant.service';
import { GeoCorderResponseService } from 'src/app/_service/geo-corder-response.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-home-franchise',
  templateUrl: './home-franchise.component.html',
  styleUrls: ['./home-franchise.component.css']
})
export class HomeFranchiseComponent implements OnInit {
  constructor(
    private restaurants:RestaurantService,
    private geoService:GeoCorderResponseService
  ) { }


  ngOnInit(): void{
    //get addresse from database and convert it into coordinate
    this.restaurants.getRestaurant().subscribe(rest=>{
      rest.data.forEach(restaurant=>{
        this.geoService.getLocation(restaurant.address).subscribe(coord=>{
          console.log()
          const myIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
          });
          L.marker([coord.data[0].latitude, coord.data[0].longitude], {icon: myIcon}).bindPopup(`${restaurant.name}`).addTo(myMap).openPopup();
        })
      })
    })


    const myMap = L.map('map').setView([46.990896, 3.162845], 5)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'myMap'
    }).addTo(myMap)


  }

}
