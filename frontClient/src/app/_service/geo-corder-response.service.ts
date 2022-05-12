import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoCorderResponseService {

  constructor(private http:HttpClient) { }
  getLocation(add:string):Observable<any>{
    const url = `http://api.positionstack.com/v1/forward?access_key=${environment.apikey}&query=${add}&output=json&limit=1`;
    return this.http.get<any>(url);
  }
}
