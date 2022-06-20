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
  /**
  * useful to log on database
  * return 400 if mail or password is null
  * return 400 if user doesn't exist
  * return 401 if password is wrong
  * return a token after verification
  */
  login(credential:ICredential):Observable<IToken>{
    return this.http.post<IToken>('http://localhost:5001/auth',credential)
  }

}
