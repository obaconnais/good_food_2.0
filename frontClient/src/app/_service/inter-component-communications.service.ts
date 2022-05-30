import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { IRestaurant } from '../_interface/restaurant';

@Injectable({
  providedIn: 'root'
})
export class InterComponentCommunicationsService {
  public subject = new BehaviorSubject<any>('')

  constructor() {}

  sendMessage(message: IRestaurant) {
    this.subject.next(message);
  }

  getMessage(): Observable<IRestaurant> {
      return this.subject;
  }
}
