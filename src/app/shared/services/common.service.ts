import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';



interface LoginRequest {
   data: Object
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private registerSource = new Subject<any>();

    register$ = this.registerSource.asObservable();

   
    registerToLogin(loginData: any) {
        this.registerSource.next(loginData)
    }
}

export class CommonService {
    invokeEvent: Subject<any> = new Subject(); 

    callMethodOfSecondComponent() {
      this.invokeEvent.next(true)      
    }
  }