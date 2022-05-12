import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
