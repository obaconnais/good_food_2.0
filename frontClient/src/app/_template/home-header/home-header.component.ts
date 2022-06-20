import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  isLogged$:Observable<boolean>
  _isLogged:boolean = false
  restaurant_id: string | undefined
  restaurant_name: string | undefined
  restaurant_store:Observable<string>

  constructor(
    store:Store<{restaurant:string}>,
    store2:Store<{isLogged:boolean}>
  ){
    this.restaurant_store = store.select((state)=>state.restaurant)
    this.isLogged$ = store2.select((state)=>state.isLogged)
  }

  ngOnInit(): void {
    this.isLogged$.subscribe(res=>this._isLogged=res)
  }
}
