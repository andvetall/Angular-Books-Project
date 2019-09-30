 
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(public router: Router) { }

    canActivate(): boolean {
      let storage = localStorage.getItem("user")
      if(!storage){
          return true
      }else{
          this.router.navigate(['management'])
        return false 
      } 
    }
}