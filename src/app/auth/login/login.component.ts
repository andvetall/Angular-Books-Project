import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/common.service';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formRegistation: FormGroup;
  constructor(
    private _authService : AuthService, 
    private _commonService: LoginService, 
    private _router : Router,
  ) { }

  ngOnInit() {
    this._createForm()
  }
  private _createForm(){
    this.formRegistation = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submitForm(){
    this._authService.loginUser(this.formRegistation.value).subscribe(a => {
      localStorage.setItem('user', JSON.stringify(a))
      this._commonService.registerToLogin(a)
      this._router.navigate(['management/books'])
    })
    
  }
}
