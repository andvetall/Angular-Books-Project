 
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service'

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(public router: Router, public authService: AuthService) { }
    canActivate(): boolean {
      let admin = this.authService.getUserStaroge().permission
      if(admin  == "admin"){
          return true
      }else{
          this.router.navigate(['management/books-admin'])
        return false 
      } 
    }
}