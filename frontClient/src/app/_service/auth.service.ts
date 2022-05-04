import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ICredential } from '../_interface/credential';
import { Observable } from 'rxjs';
import { IToken } from '../_interface/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  login(credential:ICredential):Observable<IToken>{
    return this.http.post<IToken>('http://localhost:5001/auth',credential)
  }
}
