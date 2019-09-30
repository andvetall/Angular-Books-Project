import { Injectable } from '@angular/core';
import { Observable, Subject, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private _httpClient : HttpClient) { }

  getUsers() : Observable<any>{
    return this._httpClient.get(`${environment.apiUrl}users`)
  }
  updateUser(id:any, body:any) : Observable<any>{
    return this._httpClient.put(`${environment.apiUrl}users/${id}`, body)
  }
  moveUser(id) : Observable<any>{
    return this._httpClient.delete(`${environment.apiUrl}users/${id}`)
  }
}
