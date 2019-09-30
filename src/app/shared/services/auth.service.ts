import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { User } from '../models';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private _httpClient : HttpClient) { }
  regiterUser(user) : Observable<any>{
   return this._httpClient.post(`${environment.apiUrl}users/register`,user)
  }
  loginUser(user) : Observable<any>{
    return this._httpClient.post(`${environment.apiUrl}login`,user)
  }
  getUserStaroge(){
    let userToken :any = JSON.parse(localStorage.getItem("user"))
    if(userToken){
      return helper.decodeToken(userToken.token)
    }else return null
  }

}
