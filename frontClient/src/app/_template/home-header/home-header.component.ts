import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  isLogged: boolean | undefined;
  restaurant_id: string | undefined
  restaurant_name: string | undefined
  restaurant_store:Observable<string>

  constructor(
    store:Store<{restaurant:string}>
  ) {
    this.restaurant_store = store.select((state)=>state.restaurant)
   }

  ngOnInit(): void {
    this.isLogged = true
    this.restaurant_id = "123456"
    this.restaurant_name = "Restaurant name"
    console.log(this.isLogged)
    this.restaurant_store.subscribe(res=>{
      console.log("restaurant name")
      console.log(res)
    })
  }
}
