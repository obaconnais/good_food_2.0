import { Injectable } from '@angular/core';
import { Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) { }

  saveToken(token: string):void{
    localStorage.setItem('token',token)
    this.router.navigate(['home'])
  }

  isLogged():boolean{
    const token = localStorage.getItem('token')
    return !!token
  }

  clearToken():void{
    localStorage.removeItem('token')
  }

  getToken(){
    const token = localStorage.getItem('token')
    return !!token ? token : null
  }
}

