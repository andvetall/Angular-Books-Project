 
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service'

@Injectable()
export class UserGuard implements CanActivate {

    constructor(public router: Router, public authService: AuthService) { }
    lo
    canActivate(): boolean {
      let admin = this.authService.getUserStaroge().permission
      if(admin  == "user"){
          return true
      }else{
          this.router.navigate(['management/books-admin'])
        return false 
      } 
    }
}