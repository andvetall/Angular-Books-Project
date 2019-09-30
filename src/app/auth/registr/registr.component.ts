//Vendors
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss']
})
export class RegistrComponent implements OnInit {
  formRegistation: FormGroup
  constructor(private _authService : AuthService,private _commonServise : LoginService, private _router : Router) { }

  ngOnInit() {
    this._createForm()
  }
  private data: Object ={
      country: "no data yet",
      city: "no data yet",
      street: "no data yet",
      house: "no data yet",
      appartment: "no data yet",  
      mobile: "no data yet",
      website: "no data yet",
      userImg: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
  }
  private _createForm() : void{
    this.formRegistation = new FormGroup({
      login: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  
  submitForm() : void{
    let dataComplete = Object.assign(this.data, this.formRegistation.value)
    this._authService.regiterUser(dataComplete).subscribe((a : {success : string}) => a.success ? this._router.navigate(['/auth/login']) : null)
}
}
