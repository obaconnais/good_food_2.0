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
  }
}
