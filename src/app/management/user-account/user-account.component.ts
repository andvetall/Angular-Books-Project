//Vendors
import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/shared/services/books.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'user-account-page',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  formEditUser: FormGroup
  public userData: any = {}
  constructor(
    private _authServise: AuthService,
    private _userServise: UsersService,
    private _snackBar: MatSnackBar,
    private _router: Router
    ) {}


  ngOnInit() {
   this.userData = localStorage.getItem("userUpdated") ? 
      Object.assign(JSON.parse(localStorage.getItem('userUpdated')), {_id: this._authServise.getUserStaroge()._id})  : 
          this._authServise.getUserStaroge()
   this._createForm()
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private _createForm():void{
    this.formEditUser = new FormGroup({
      email: new FormControl(''),
      login: new FormControl(''),
      userImg: new FormControl(''),
      website: new FormControl(''),
      mobile: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
      house: new FormControl(''),
      appartment: new FormControl(''),
    });
  }
  getBase64(file) {
    let imgToShow: any = document.querySelector('.image-input')
    let form: any = this.formEditUser
    var reader = new FileReader();
    if(file){
      reader.readAsDataURL(file);
      reader.onload = function () {
        form.patchValue({userImg: reader.result })
        imgToShow.src = reader.result
      };
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 updateUser(id){
  for(let x in this.formEditUser.value){ 
    if(!this.formEditUser.value[x]) {
      this.formEditUser.patchValue({[x]: this.userData[x]})
    } 
  }
  localStorage.setItem("userUpdated", JSON.stringify(this.formEditUser.value))
  this._userServise.updateUser(id, this.formEditUser.value).subscribe((a:any) => {
    if(a.success) {
      this.openSnackBar(`${a.message}`, 'Close')
      this._router.navigate(['management/books'])
    }else {
      this.openSnackBar(`Error: "${a.statusText}"`, 'Close')
    } 
  })
 }
}
