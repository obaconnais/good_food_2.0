import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeBodyComponent } from '../home/home-body/home-body.component';
import { IRestaurants } from '../_interface/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) {
   }

  getRestaurant():Observable<IRestaurants>{
    return this.http.get<IRestaurants>('http://localhost:5001/restaurant/all')
  }

  getRestaurantCities({ zipCodes }: { zipCodes: any; }):Observable<{found:boolean,data:Object[]}>{
    return this.http.post<{found:boolean,data:Object[]}>('http://localhost:5001/restaurant/zipCode',zipCodes)
  }
}
