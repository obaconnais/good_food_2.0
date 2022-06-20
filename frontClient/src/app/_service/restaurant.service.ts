import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRestaurants } from '../_interface/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) {}

  /**
   *
   * method for get all restaurant from DB
   * return an Observale of Irestaurants
   *
   */
  getRestaurant():Observable<IRestaurants>{
    return this.http.get<IRestaurants>('http://localhost:5001/restaurant/all')
  }

  /**
   *
   * method to get the restaurant from zipCodes
   * param: an Object with the searched zipCodes (Array)
   * return: an Observable of Object{found:, data}
   *
   */
  getRestaurantCities({ zipCodes }: { zipCodes: any; }):Observable<{found:boolean,data:Object[]}>{
    return this.http.post<{found:boolean,data:Object[]}>('http://localhost:5001/restaurant/zipCode',zipCodes)
  }
}
